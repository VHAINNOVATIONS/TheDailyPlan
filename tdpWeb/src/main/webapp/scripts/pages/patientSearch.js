var PatientSearch = {
	context: {},
	selected: {},
	find_within: ['search_ward', 'search_team'],
	defaults: {},
	patientList: {},

	bindActions: function() {
		
		// Tab select behavior
		$j("a.tab").bind("click", function(){
			PatientSearch.selectTab(this);
		});
		
		// Select default
		if (PatientSearch.defaults.tab != '') {
			// Not working in IE7 8-(
			//$j("#search_tab_row #"+PatientSearch.defaults.tab+" a.tab").trigger("click");
			PatientSearch.selectTab($j("#"+PatientSearch.defaults.tab+" a.tab"));
		}
		else {
			// Select the first one
			$j("a.tab").first().trigger("click");
		}
		
//		$j('#search_unit_list a').bind("click", function(){
//			$j('#search_unit_list a').removeClass('selected');
//			$j(this).addClass('selected');
//			$j('#search_find_loc').text(this.text+':');
//			var url = PatientSearch.context+'/services/rest/vista/unitPatients/unit/' + this.id;
//			PatientSearch.patientRequest(url);
//		});
		
		$j('#search_ward_list a').bind("click", function(){
			$j('#search_ward_list a').removeClass('selected');
			$j(this).addClass('selected');
			$j('#search_find_loc').text(this.text+':');
			var url = PatientSearch.context+'/services/rest/vista/wardPatients/ward/' + this.id;
			PatientSearch.patientRequest(url);
		});
		
		$j("#search_match input[type=button]").bind("click", function(e){
			PatientSearch.lookupPatient();
		});
 		$j("#search_match input[type=text]").bind("keyup", function(e){
 			var code = (e.keyCode ? e.keyCode : e.which);
 			if(code == 13) { //Enter keycode
 				PatientSearch.lookupPatient();
 			}
		});
 		
 		$j('#search_find_controls input').focus(function() {
 			$j(this).attr('value','');
 		}).blur(function() {
 			var jthis = $j(this);
 			jthis.attr('value', jthis.attr('default'));
 		});
 		
 		$j('#print_selected').bind("click", function(){
			var patQuery = '?patient=';
			var fontQuery = '&font=';
			var tplQuery = '&template=';
			var patients = PatientSearch.patientList.fnGetNodes();
			$j('input:checked', patients).each(function(i){
				var patId = this.value;
				patQuery += patId + ',';
				var font = $j('tbody select[name="fonts"] option:selected')[i].value;
				fontQuery += font.substring(font.indexOf(':')+1,font.length) + ',';
				tplQuery += $j('#defaultTemplate').attr('value') + ',';
			});
			var pdfTarget = PatientSearch.context + "/PdfServlet" + patQuery.substring(0, patQuery.length - 1) + fontQuery.substring(0, fontQuery.length - 1) + tplQuery.substring(0, tplQuery.length - 1);
			window.open(pdfTarget, 'allPatients', 'titlebar=no,toolbar=no,menubar=no,top=0,left=0,width=1000');
 			
			return false;
 		});
 		
 		$j("form").submit(function() {
			var patients = PatientSearch.patientList.fnGetNodes();
			if ($j("input:checked",patients).length == 0) {
				alert("Please Select at least one patient to continue");
				return false;
			}
			// Animate the panel hide
			$j('#search_results').slideUp('slow',function(){
				// Patients hidden
				$j("#preview_spinner").css({'display' : 'block','float' : 'right'});
				$j('#preview_pending').slideDown('slow',function(){	});
			});
			
			$j('#patient_list').replaceWith(patients);
			
			return true;
 		});
 		
 		PatientSearch.patientList = $j('#patient_table').dataTable( {
 			"sDom": '<"toolbar">lfrtip',
 			"bProcessing": false,
 			"sPaginationType": "full_numbers",
	        "fnRowCallback": function( nRow, aData, iDisplayIndex ) {
				/* Post-process each row by inserting the select checkbox and Font size selection
				 * There may be a better way to handle the hidden Patient ID */
 				var pid = $j('td:eq(7)', nRow).html();
				// Default Template
				td = $j('td:eq(8)', nRow);
				if (td[0].children.length == 0) {
					var defTplId = pid + ':' + $j('td:eq(8)', nRow).html();
					var input = document.createElement('input');
					input.setAttribute('name', 'defaultTemplates');
					input.setAttribute('value', defTplId);
					$j('td:eq(8)', nRow).html(input);
				}
				// Checkbox
				var td = $j('td:eq(0)', nRow);
 				if (td[0].children.length == 0) {
					var check = document.createElement('input');
					check.setAttribute('name', 'selected');
					check.setAttribute('type', 'checkbox');
					check.setAttribute('value', pid);
					$j('td:eq(0)', nRow).html(check);
					$j(check).bind("click", PatientSearch.selectPatient);
 				}
				// Font Size
				td = $j('td:eq(1)', nRow);
				if (td[0].children.length == 0) {
					$j("#search_match select").clone().appendTo(td);
					$j(td[0].childNodes[0]).children().each(function(index) {
						this.value = pid + ':' + this.value;
					});
				}

				return nRow;
			},
 			"aoColumns": [ 
 			               { "sSortDataType": "dom-checkbox", "sType": "dom-checkbox", "sClass": "result" },
 			 			   { "sSortDataType": "dom-select", "sType": "dom-select", "sClass": "result" },
 			 			   { "sClass": "resultLeft" },
 			 			   { "sClass": "result" },
 			 			   { "sClass": "result" },
 			 			   { "sClass": "result" },
 			 			   { "sClass": "result" },
			 			   { "sClass": "hidden" },
 			 			   { "sClass": "hidden" }
  				        ]

	 	});
 		PatientSearch.patientList.fnSortListener( document.getElementById('sorter'), 2, function(){
 			
 		});
 		
 		$j("div.toolbar").html('Select All Patients: <input type="checkbox" id="selectAll">');
 		$j('#selectAll').bind("click", function(){
 			if ($j('#selectAll:checked')[0])
 				$j('tbody input:checkbox').each(function(){
 					if (!$j(this).attr('checked'))
 						$(this).click();
 				});
 			else
 				$j('tbody input:checkbox').each(function(){
 					if ($j(this).attr('checked'))
 						$(this).click();
 				});
 		});
 		
	},
	
	lookupPatient: function() {
		if ($j("#search_criteria input#name").val() == '') {
			alert('Please enter a name or SSN');
			return false;
		}
		
		var url = PatientSearch.context+'/services/rest/vista/match/' + $j("#search_criteria input#name").val() + '/from/0/count/8/';
		PatientSearch.patientRequest(url);

	},
	
	patientRequest: function(url) {
		PatientSearch.startLookup();
		$j.ajax({
			  url: url,
			  dataType: 'json',
			  timeout: 30000,
			  success: PatientSearch.ajaxSuccess,
			  error: PatientSearch.ajaxError
		});
		
	},
	
	selectTab: function(tab) {
				
		var classes;
		if (tab.length == 0)
			classes = '';
		else
			classes = $j(tab).attr("class");
		
		// Ignore if already selected
		if (classes.indexOf('selected') > -1) {
			return false;
		}
		
		$j("a.tab").removeClass('selected');
		$j("div.tab_content").css('display', 'none');
		$j(tab).addClass('selected');
		
		var content = $j(tab).attr('rel');
		PatientSearch.selected = content;
		$j('#'+content).css('display', 'block');
		$j("#search_results_group").css('display', 'none');
		
		if (content == 'search_match') {
			$j('input#name').focus();
		}
		else if (content == 'search_team') {
			var url = PatientSearch.context+'/services/rest/vista/teamPatients/team/' + $j('#search_team_id').attr('rel');
			PatientSearch.patientRequest(url);
		}
	},
	
	startLookup: function() {
		$j('#search_results_empty').hide();
//		$j('#search_unit_list').css('opacity','.5');
//		$j('#spinner').clone().appendTo('#search_unit_list').attr('id','unit_spinner');
		$j('#search_ward_list').css('opacity','.5');
		$j('#spinner').clone().appendTo('#search_ward_list').attr('id','ward_spinner');
		$j(".spinner").css({'display' : 'inline-block','float' : 'left'});
		$j('#unit_spinner').css({'position' : 'absolute','left' : '50%','top' : '50%'});
		$j('#ward_spinner').css({'position' : 'absolute','left' : '50%','top' : '50%'});
		if (PatientSearch.patientList)
			PatientSearch.patientList.fnClearTable();
	},
	
	endLookup: function() {
//		$j('#search_unit_list').css('opacity','1');
		$j('#search_ward_list').css('opacity','1');
		$j(".spinner").css("display", "none");
		$j('#unit_spinner').remove();
		$j('#ward_spinner').remove();
	},

	ajaxSuccess: function(data, textStatus, XMLHttpRequest) {
		$j("#patient_list").empty();
		$j('#search_criteria .fieldError').remove();
		
		if (data.errorMessage) {
			var error = document.createElement('span');
			error.className = 'fieldError';
			var img = document.createElement('img');
			img.className = 'icon';
			img.setAttribute('alt', 'Validation Error');
			img.setAttribute('src',PatientSearch.context+'/images/iconWarning.gif');
			error.appendChild(img);
			error.appendChild(document.createTextNode(data.errorMessage));
			$j('#search_criteria_controls input').before(error);
		}
		else if (data.patients[0]) {
			
			PatientSearch.loadPatients(data.patients);
			
			if (PatientSearch.find_within.toString().indexOf(PatientSearch.selected) > -1)
				$j("#search_find").css('display','block');
			else
				$j("#search_find").css('display','none');
			$j("#search_results").css('display','block');
			$j("#search_results_group").css('display','block');
			$j("#search_buttons").css('display','none');
// Was hoping for a font selection to auto-select the patient, but alas, no-go in IE.  Maybe will debug later
//	 		$j('#patient_list select[name="fonts"]').change(function(event){
//	 			$j(this.parentNode.previousSibling.firstChild).click();
//	 			$j("#search_buttons").slideDown('slow',function(){
//					// Buttons displayed
//				});
//	 		});

		}
		else {
			$j('#search_results_empty').show();
		}

		PatientSearch.endLookup();
	},
	
	ajaxError: function(XMLHttpRequest, textStatus, errorThrown) {
		PatientSearch.endLookup();
		var url = PatientSearch.context+'/logout.jsp';
		window.location.href = url;
	},
	
	loadPatients: function(patients) {
		for (var i=0, j=patients.length; i < j; i++) {
			var patient = patients[i];
			var templateId = $j('#defaultTemplate').val();
			PatientSearch.patientList.fnAddData( [
			         0,  
			         '',
			         patient.name,
			         patient.ssn,
			         patient.dob.substr(4,2)+'-'+patient.dob.substr(6,2)+'-'+patient.dob.substr(0,4),
			         patient.gender,
			         patient.location.display,
			         patient.localPid,
			         templateId
			] );
		}
		PatientSearch.patientList.fnSort( [ [6,'asc'] ] );
		$j('#patient_table').css('width', '100%');
	},
	
	selectPatient: function() {
		if ($j(this).is(":checked")) {
			$j(this).parentsUntil('tbody').map(function(){
				if(this.tagName == 'TR') {
					$j(this).addClass('highlighted');
				}
			});
			
			$j("#search_buttons").slideDown('slow',function(){
				// Buttons displayed
			});
		}
		else {
			$j(this).parentsUntil('tbody').map(function(){
				if(this.tagName == 'TR') {
					$j(this).removeClass('highlighted');
				}
			});
			
			var selected = $j("input:checked").length;
			if (selected == 0) {
				$j("#search_buttons").slideUp('slow',function(){
					// Buttons displayed
				});
			}
		}
	}

};


