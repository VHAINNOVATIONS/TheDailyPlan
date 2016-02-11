'use strict';

var vistaLib = require('VistALib');

module.exports = {
	selectPatient: function(params, session, ewd) {
		params.rpcName = 'ORWPT SELECT';
		params.rpcArgs = [{type: 'LITERAL', value: params.patientId}];

		var response = vistaLib.runRpc(params, session, ewd);
		var selectedPatient = this.toPatientFromSelect(response);

		params.selectedPatient = selectedPatient;
		return this.supplementPatient(params, session, ewd);
	},
	toPatientFromSelect: function(response) {
		if (!response.value || response.value === '') {
			throw Error('No such patient');
		}

		var result = {};
		var pieces = response.value.split('^');

		result.name = pieces[0];
		result.gender = pieces[1];
		result.dob = pieces[2];
		result.ssn = pieces[3];
		result.mpiPid = pieces[13];
		result.age = pieces[14];

		if (pieces[4] !== '' && pieces[5] !== '') {
			result.isInpatient = true;
			result.location = { id: pieces[4], name: pieces[5], room: pieces[6] };
			if (pieces[15] !== '') {
				result.location.specialty = { id: pieces[15] };
			}
		}

		result.cwad = pieces[7];
		result.isRestricted = (pieces[8] == '1');
		if (pieces[9] !== '') {
			result.admitTimestamp = pieces[9];
		}
		result.isServiceConnected = (pieces[11] == '1');
		if (pieces[12] !== '') {
			result.scPercent = pieces[12];
		}
		return result;
	},
	supplementPatient: function(params, session, ewd) {
		// refactoring MDWS selectPlus call which makes a lot of calls for various nodes of ^DPT global 
		// TODO - swap out stuff below
		params.iens = params.patientId;
		params.file = '2';
		var patientRec = vistaLib.ddrGetsEntry2(params, session, ewd);

		var patient = params.selectedPatient;
		var pieces = [];

		// node 0 section
		//var node0 = vistaLib.getVariableValue('$G(^DPT(' + params.patientId + ',0))', session, ewd);
		//var pieces = node0.split('^');
		if (patientRec.hasOwnProperty('.05')) {
			patient.maritalStatus = (patientRec['.05']['E'] !== '' ? patientRec['.05']['E'] : patientRec['.05']['I']);
		}

		if (patientRec.hasOwnProperty('.06')) {
			patient.ethnicity = patientRec['.06']['E'];
			patient.ethnicityId = patientRec['.06']['I'];
		}
		if (patientRec.hasOwnProperty('.14')) {
			patient.meansTestStatus = patientRec['.14']['E'];
			patient.needsMeansTest = (patientRec['.14']['I'] === '1');
		}		
		if (patientRec.hasOwnProperty('.6')) {
			patient.isTestPatient = (patientRec['.6'] === '1');
		}
		// end node 0

		// room bed/node .101 section
		if (patient.isInpatient && patientRec.hasOwnProperty('.101')) {
			pieces = patientRec['.101']['I'].split('-');
			if (pieces.length > 1) {
				patient.location.room = pieces[0];
				patient.location.bed = pieces[1];
			}
		}

		// end room/bed

		// insurance
		params.rpcName = 'ORVAA VAA';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var insuranceRpcResponse = vistaLib.runRpc(params, session, ewd);
		if (insuranceRpcResponse && insuranceRpcResponse.value) {
			if (insuranceRpcResponse.value.length > 0 && insuranceRpcResponse.value[0] !== '' && insuranceRpcResponse.value[0] !== '0') {
				patient.activeInsurance = insuranceRpcResponse.value;
			}
		}
		// end insurance
		// deceased
		params.rpcName = 'ORWPT DIEDON';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var deceasedRpcResponse = vistaLib.runRpc(params, session, ewd);
		if (deceasedRpcResponse && deceasedRpcResponse.value !== '' && deceasedRpcResponse.value != '0') {
			patient.deceased = deceasedRpcResponse.value;
		}
		// end desceased
		// patient type
		if (patientRec.hasOwnProperty('391')) {
			patient.type = patientRec['391']['E'];
		}
		// end patient type
		// MPI node
		if (patientRec.hasOwnProperty('991.02')) {
			patient.mpiChecksum = patientRec['991.02']['I'];
		}
		if (patientRec.hasOwnProperty('991.03')) {
			patient.cmorSiteId = patientRec['991.03']['I'];
		}
		if (patientRec.hasOwnProperty('991.04')) {
			patient.isLocallyAssignedMpiPid = (patientRec['991.04']['I'] == '1');
		}
		// end MPI
		// veteran
		if (patientRec.hasOwnProperty('1901')) {
			patient.isVeteran = (patientRec['1901']['I'] == '1');
		}
		// end veteran

		// sensitivity
		params.rpcName = 'DG SENSITIVE RECORD ACCESS';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var sensitiveResponse = vistaLib.runRpc(params, session, ewd);
		if (!sensitiveResponse || !sensitiveResponse.value || sensitiveResponse.value['1'] == '-1') {
			throw Error('Unable to get sensitivity: ' + JSON.stringify(sensitiveResponse));
		}
		var level = sensitiveResponse.value['1'];
		var sensitivityMsg = [];
		var i;
		if (sensitiveResponse.value.hasOwnProperty('2')) {
			for (i = 2; sensitiveResponse.value.hasOwnProperty(i.toString()); i++) {
				sensitivityMsg.push(sensitiveResponse.value[i.toString()]);
			}
		}
		patient.confidentiality = { tag: level, text: sensitivityMsg };
		// end sensitivity

		// patient flags
		params.rpcName = 'ORPRF HASFLG';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var flagsResponse = vistaLib.runRpc(params, session, ewd);
		patient.flags = flagsResponse.value;
		// end flags

		// remote site IDs
		params.rpcName = 'ORWCIRN FACLIST';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var remoteSitesResponse = vistaLib.runRpc(params, session, ewd);
		if (remoteSitesResponse && remoteSitesResponse.value && remoteSitesResponse.value.length > 0 && remoteSitesResponse.value[0].indexOf('-1^') !== 0) {
			patient.siteIds = [];
			for (i = 0; i < remoteSitesResponse.value.length; i++) {
				var sitePieces = remoteSitesResponse.value[i].split('^');
				patient.siteIds.push({ id: sitePieces[0], name: sitePieces[1], lastSeenDate: sitePieces[2], lastEvent: sitePieces[3] });
			}
		}
		// end remote sites

		// teams
		params.rpcName = 'ORWPT1 PRCARE';
		params.rpcArgs = [{ type: 'LITERAL', value: params.patientId }];
		var teamsResponse = vistaLib.runRpc(params, session, ewd);
		if (teamsResponse && teamsResponse.value && teamsResponse.value != '^^^') {
			var teamPieces = teamsResponse.value.split('^');
			patient.team = { name: teamPieces[0], pcpName: teamPieces[1], attendingName: teamPieces[2] }; // name^PCP name^attending name
		}
		// end teams

		// demographics
		var address = { 
			street1: patientRec.hasOwnProperty('.111') ? patientRec['.111']['I'] : '', 
			street2:  patientRec.hasOwnProperty('.112') ? patientRec['.112']['I'] : '',
			street3:  patientRec.hasOwnProperty('.113') ? patientRec['.113']['I'] : '',
			city:  patientRec.hasOwnProperty('.114') ? patientRec['.114']['I'] : '',
			state:  patientRec.hasOwnProperty('.115') ? patientRec['.115']['E'] : '',
			zipcode:  patientRec.hasOwnProperty('.116') ? patientRec['.116']['I'] : '',
			county:  patientRec.hasOwnProperty('.117') ? patientRec['.117']['I'] : '', 
		};
		patient.address = address;
		patient.phoneNumbers = [];
		if (patientRec.hasOwnProperty('.131')) {
			patient.phoneNumbers.push({ description: 'Home Phone', number: patientRec['.131']['I'] });
		}
		if (patientRec.hasOwnProperty('.132')) {
			patient.phoneNumbers.push({ description: 'Work Phone', number: patientRec['.132']['I'] });
		}
		if (patientRec.hasOwnProperty('.134')) {
			patient.phoneNumbers.push({ description: 'Cell Phone', number: patientRec['.134']['I'] });
		}

		if (patientRec.hasOwnProperty('.133')) {
			patient.email = patientRec['.133']['I'];
		}
		// end demogs

		this.putNokAndEmergencyContacts(patient, params.patientId, ewd, session);

		var adminInfo = ewd.mumps.function('ADMINFO^ZZTDP', params.patientId) ;
		if (adminInfo) {
			patient.team = patient.team	|| {};
			patient.admissionInfo = {};
			var adminInfoPieces = adminInfo.split('^');
			if (adminInfoPieces[0]) {
				patient.admissionInfo['provider'] = adminInfoPieces[0];
				patient.team.inpatientName = adminInfoPieces[0];
			}
			if (adminInfoPieces[1]) {
				patient.admissionInfo['attendingProvider'] = adminInfoPieces[1];
            }
            if (adminInfoPieces[2]) {
				patient.admissionInfo['diagnosis'] = adminInfoPieces.slice(2).join('^');
            }
        }

		return patient;
	},
	putNokAndEmergencyContacts: function(patient, patientId, ewd, session) {
        var gloRef = new ewd.mumps.GlobalNode('TMP', [process.pid]);
        gloRef._delete();
        var status = ewd.mumps.function('NKO^ZZTDP', patientId, '^TMP(' + process.pid + ')') ;
        var results = gloRef._getDocument();
        if (results) {
            ['nextOfKin', 'altNextOfKin', 'emergencyContact', 'altEmergencyContact'].forEach(function(key) {
                if (results[key]) {
                    patient[key] = results[key];
                }
            });
        }
        gloRef._delete();
	}
};
