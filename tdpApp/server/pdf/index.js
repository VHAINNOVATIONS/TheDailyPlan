'use strict';

var fs = require('fs');
var path = require('path');

var moment = require('moment');

var PdfMake = require('pdfmake');

var sections = require('./sections');

var fonts = {
    Roboto: {
        normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, 'fonts/Roboto-Italic.ttf')
    }
};

var allergies = {
    "status": 1,
    "allergies": [
        {
            "allergenName": "ASPIRIN/METHOCARBAMOL",
            "allergenType": "D",
            "reaction": "ANXIETY"
        },
        {
            "allergenName": "PEANUTS",
            "allergenType": "D",
            "reaction": "DROWSINESS; HIVES; DRY MOUTH; DRY NOSE; RASH"
        },
        {
            "allergenName": "CASHEWS",
            "allergenType": "F",
            "reaction": "NAUSEA,VOMITING; DIARRHEA"
        }
    ]
};

var allergies2 = {
    "status": 1,
    "allergies": [
        {
            "allergenName": "ASPIRIN/METHOCARBAMOL",
            "allergenType": "D",
            "reaction": "ANXIETY"
        },
        {
            "allergenName": "PEANUTS",
            "allergenType": "D",
            "reaction": "DROWSINESS; HIVES; DRY MOUTH; DRY NOSE; RASH"
        },
        {
            "allergenName": "CASHEWS",
            "allergenType": "F",
            "reaction": "NAUSEA,VOMITING; DIARRHEA"
        },
        {
            "allergenName": "PEANUTS",
            "allergenType": "D",
            "reaction": "DROWSINESS; HIVES; DRY MOUTH; DRY NOSE; RASH"
        },
        {
            "allergenName": "CASHEWS",
            "allergenType": "F",
            "reaction": "NAUSEA,VOMITING; DIARRHEA"
        }
    ]
};

var demographics = {
    name: 'John Doe',
    DOB: '01/12/1975',
    location: {
        name: 'The Cardioofy'
    }
};

var demographics2 = {
    name: 'Jane Doe',
    DOB: '05/21/1985'
};

var headerText = "The Daily Plan represents current hospital activity and it is NOT a full list of everything that takes place during your hospital stay.  Your medications, treatments, appointments, etc. may change at discharge.  Please keep your personal information out of sight by storing this folder in a private place, such as a night stand drawer or bedside cabinet.";

exports.generatePDF = function(patientIds, templateId) {
    var content = [{
        columns: [{
            image: path.join(__dirname, 'images', 'dailyPlanLogo.jpg')
        }, {
            text: headerText,
            width: '50%'
        }],
        margin: [0, 0, 0, 10]
    }];

    var m = moment();

    var demographicsTableContent = {
        headerRows: 0,
        widths: ['15%', '35%', '15%', '35%'],
        body: [
            [{
                text: 'Name:',
                alignment: 'right',
                fontSize: 18
            }, {
                text: demographics.name,
                alignment: 'left',
                bold: true,
                fontSize: 18
            }, {
                text: 'Date:',
                alignment: 'right',
                fontSize: 18
            }, {
                text: m.format('MM/DD/YYYY'),
                alignment: 'left',
                fontSize: 18
            }],
            [{
                text: 'DOB:',
                alignment: 'right',
                fontSize: 18
            }, {
                text: demographics.DOB,
                alignment: 'left',
                fontSize: 18
            }, {
                text: 'Time:',
                alignment: 'right',
                fontSize: 18
            }, {
                text: m.format('HH:mm'),
                alignment: 'left',
                fontSize: 18
            }]
        ]
    };
    var locationName = demographics.location && demographics.location.name;
    if (locationName) {
        demographicsTableContent.body.push([{
            text: 'Location:',
            alignment: 'right',
            fontSize: 18
        }, {
            text: locationName,
            alignment: 'left',
            fontSize: 18
        }, {
            text: '',
            alignment: 'left',
            fontSize: 18
        }, {
            text: '',
            alignment: 'left',
            fontSize: 18
        }]);
    }

    content.push({
        table: demographicsTableContent,
        margin: [5, 0, 0, 20],
        layout: 'noBorders'
    });

    for (var i=0; i<4; ++i) {
        var allergiesSection = sections.getSectionContent('Allergies', allergies)
        var emptySection = sections.getSectionContent('Allergies', {
            status: 1
        });
        var allergiesSection2 = sections.getSectionContent('Allergies', allergies2)

        Array.prototype.push.apply(content, allergiesSection);
        Array.prototype.push.apply(content, emptySection);
        Array.prototype.push.apply(content, allergiesSection2);
    }

    return {
        content: content,
        pageSize: 'A4',
        styles: {
            demographics: {
                fontSize: 18,
                color: 'black'
            },
            tableTitle: {
                bold: true,
                alignment: 'center',
                fontSize: 17,
                color: 'black'
            },
            tableHeader: {
                bold: true,
                alignment: 'center',
                fontSize: 13,
                color: 'black'
            },
            tableEmpty: {
                alignment: 'center'
            }
        }
    }
};

exports.run = function(patientId, templateId, callback) {
    var printer = new PdfMake(fonts);

    var pdoc = exports.generatePDF(patientId, templateId)

    var doc = printer.createPdfKitDocument(pdoc);
    var target = fs.createWriteStream('/Work/sandbox/tdp.pdf');
    target.on('finish', function() {
        callback(null);
    }).on('error', function(err) {
        callback(err);
    });

    doc.pipe(target);
    doc.end();
};

exports.run(null, null, function(err, result) {
    if (err) {
        console.log('error');
        console.log(err);
    } else {
        console.log('success');
    }
});
