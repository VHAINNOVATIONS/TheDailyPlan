vista = require('./index.js')
vista.newSession(function(err, sess) {session = sess; vistaError = err;})
session.login({accessCode: 'XXXXXXXX', verifyCode: 'XXXXXXXXX'}, function(err, data) {vistaError=err; userData=data;})
session.login({accessCode: 'CPRS1234', verifyCode: 'CPRS4321$'}, function(err, data) {vistaError=err; userData=data;})
session.searchPatients({prefix: 'eig'}, function(err, data) {vistaError=err; patientList=data;})
patient = patients[37]
session.getAllergies(patient.id, {}, function(err, data) {vistaError=err; allergies=data;})
allergies
session.getProblems(patient.id, {}, function(err, data) {vistaError=err; problems=data;})
problems
