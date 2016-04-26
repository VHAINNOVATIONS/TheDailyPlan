'use strict';

var fs = require('fs');
var path = require('path');

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

exports.generatePDF = function(patientIds, templateId) {
    var content = [sections.getIntro()];

    var dem = sections.getDemographicsContent(demographics);
    content.push(dem);

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

    content.push(sections.getIntro(true));
    var dem2 = sections.getDemographicsContent(demographics2);
    content.push(dem2);

    for (i=0; i<4; ++i) {
        var allergiesSection22 = sections.getSectionContent('Allergies', allergies)
        var emptySection22 = sections.getSectionContent('Allergies', {
            status: 1
        });
        var allergiesSection222 = sections.getSectionContent('Allergies', allergies2)

        Array.prototype.push.apply(content, allergiesSection22);
        Array.prototype.push.apply(content, emptySection22);
        Array.prototype.push.apply(content, allergiesSection222);
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
