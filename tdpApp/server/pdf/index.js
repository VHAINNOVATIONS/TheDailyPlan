'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var moment = require('moment');
var async = require('async');

var PdfMake = require('pdfmake');

var sections = require('./sections');
var patientData = require('./patient-data');
var models = require('../models');
var _ = require('lodash');

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

var headerFooterHandler = function(demographicsList) {
    var pageInfos = [];

    return {
        layoutInfoAccepter: function(pages) {
            var dindex = 0;
            var pindex = 1;
            var counts = [1]
            pages.forEach(function(page, index) {
                if (index > 0) {
                    if (page.items[0].type === 'image') {
                        dindex = dindex + 1;
                        pindex = 1;
                        counts.push(1);
                    } else {
                        ++pindex;
                        counts[dindex] = pindex;
                    }
                }
                pageInfos.push({
                    dindex: dindex,
                    pindex: pindex
                })
            });
            pageInfos.forEach(function(pageInfo, index) {
                var dindex = pageInfo.dindex;
                pageInfo.count = counts[dindex];
            });
        },
        header: function(currentPage, pageCount) {
            var pageInfo = pageInfos[currentPage-1];
            var dindex = pageInfo.dindex;
            return {
                text: 'CONFIDENTIAL ' + demographicsList[dindex].name + ' ' + moment().format('MM/DD/YYYY HH:mm'),
                bold: true,
                alignment: 'center',
                fontSize: 18
            }
        },
        footer: function(currentPage) {
            var pageInfo = pageInfos[currentPage-1];
            var pindex = pageInfo.pindex;
            var count = pageInfo.count;
            return {
                text: pindex.toString() + ' of ' + count.toString(),
                alignment: 'center'
            }
        }
    };
};


exports.generatePDF = function(reportData) {
    var content = [];

    reportData.forEach(function(patientData) {
        content.push(sections.getIntro());
        var dem = sections.getDemographicsContent(patientData.Demographics);
        content.push(dem);

        patientData.tables.forEach(function(table) {
            var sectionTable = sections.getSectionContent(table.section, table.data);
            content.push(sectionTable);
        });
    });

    return {
        content: content,
        pageSize: 'A4',
        pageMargins: [20, 40, 20, 40],
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

exports.run = function(pdoc, demographicsList, callback) {
    var printer = new PdfMake(fonts);

    var hfh = headerFooterHandler(demographicsList);
    pdoc.header = hfh.header;
    pdoc.footer = hfh.footer;

    var doc = printer.createPdfKitDocument(pdoc, {
        pagesInfoCallback: hfh.layoutInfoAccepter
    });
    var target = fs.createWriteStream('/Work/sandbox/tdp.pdf');
    target.on('finish', function() {
        callback(null);
    }).on('error', function(err) {
        callback(err);
    });

    doc.pipe(target);
    doc.end();
};

var getTemplates = function(templateIds, callback) {
    var output = 'pt.title AS section, p.id AS pid, pt."highlightPanel" AS hilite';
    var source = 'template AS t, panel AS p, panel_type AS pt, template_layout AS tl';
    var condition = 't.id = $id AND tl.template_id = t.id AND tl.panel_id = p.id AND p.panel_type_id = pt.id'
    var query = util.format('SELECT %s FROM %s WHERE %s ORDER BY tl.panel_order', output, source, condition);

    var outputDetail = 'pd.detail_value AS value, pt.setting_name AS name';
    var sourceDetail = 'panel_detail AS pd, panel_setting AS pt, panel AS p';
    var conditionDetail = 'p.id = $id AND pd.panel_id = p.id AND pd.panel_setting_id = pt.id';
    var queryDetail = util.format('SELECT %s FROM %s WHERE %s', outputDetail, sourceDetail, conditionDetail);
    models.Sequelize.Promise.map(templateIds, function(templateId) {
        return models.sequelize.query(query, {
            bind: {
                id: templateId
            },
            type: models.sequelize.QueryTypes.SELECT
        }).then(function(panels) {
            return {
                id: templateId,
                panels: panels
            }
        }).then(function(template) {
            return models.Sequelize.Promise.map(template.panels, function(panel) {
                return models.sequelize.query(queryDetail, {
                    bind: {
                        id: panel.pid
                    },
                    type: models.sequelize.QueryTypes.SELECT
                }).then(function(details) {
                    panel.details = details;
                });
            }).then(function() {
                return template
            })
        });
    }).then(function(template) {
        var result = template.reduce(function(r, t) {
            r[t.id] = t.panels;
            return r;
        }, {});
        callback(null, result, template);
    }).catch(function(err) {
        callback(err);
    });
};

exports.write = function(session, userSession, patientIds, templateIds, callback) {
    var uniqTemplateIds = _.uniq(templateIds);
    getTemplates(uniqTemplateIds, function(err, templateDict) {
        if (err) {
            return callback(err);
        }
        var input = patientIds.map(function(patientId, index) {
            var templateId = templateIds[index];
            var template = templateDict[templateId];
            return {
                session: session,
                userSession: userSession,
                patientId: patientId,
                template: template
            }
        });
        async.map(input, patientData, function(err, resultPatientData) {
            if (err) {
                return callback(err);
            }
            var result = input.map(function(p, index) {
                var sectionData = resultPatientData[index]

                var tables = p.template.map(function(panel) {
                    return {
                        section: panel.section,
                        hilite: panel.hilite,
                        data: sectionData[panel.section]
                    }
                });
                return {
                    Demographics: sectionData.Demographics,
                    tables: tables
                }
            });

            var doc = exports.generatePDF(result);

            console.log(doc);

            var demographicsList = result.map(function(r) {
                return r.Demographics;
            });
            exports.run(doc, demographicsList, callback);
        });
    });
};
