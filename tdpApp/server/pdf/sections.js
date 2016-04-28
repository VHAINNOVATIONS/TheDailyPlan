'use strict';

var path = require('path');

var moment = require('moment');
var _ = require('lodash');

var sectionHandlers = {};

var commonTable = function(tableData) {
    if (tableData.data && tableData.data.length) {
        var tableContent = {
            headerRows: 2,
            keepWithHeaderRows: 2
        };
        tableContent.widths =  _.map(tableData.columns, 'width');
        var titleSpec = {
            text: tableData.title,
            colSpan: tableData.columns.length,
            style: 'tableTitle',
        }
        var titleRow = [titleSpec];
        for (var i=1; i<tableData.columns.length; ++i) {
            titleRow.push({});
        }
        tableContent.body = [titleRow, tableData.columns.map(function(c) {
            return {
                text: c.header,
                style: 'tableHeader'
            }
        })];
        tableData.data.forEach(function(datum) {
            var row = tableData.columns.map(function(c) {
                var p = c.property;
                var v = datum[p];
                if (v === null || v === undefined) {
                    return {
                        text: ''
                    };
                } else {
                    return {
                        text: v
                    };
                }
            });
            tableContent.body.push(row);
        });
        return {
            table: tableContent,
            keepWithHeaderRows: true
        };
    } else {
        var emptyTableContent = {
            headerRows: 1,
            keepWithHeaderRows: 1
        };
        emptyTableContent.widths = ['100%'];
        emptyTableContent.body = [[{
            text: tableData.title,
            style: 'tableTitle'
        }], [{
            text: tableData.emptyMessage
        }]];
        return {
            table: emptyTableContent,
            style: 'tableEmpty'
        }
    }
};

sectionHandlers.Allergies = function(data) {
    var tableData = {
        title: 'Allergies',
        emptyMessage: (data.status === null) ? 'No allergy assessment' : 'No known allergies',
        columns: [{
            header: 'Name',
            property: 'allergenName',
            width: '50%'
        }, {
            header: 'Reaction',
            property: 'reaction',
            width: '50%'
        }],
        data: data.allergies
    };
    return commonTable(tableData, {
        hilite: true
    });
};

sectionHandlers['Health Factors'] = function(data) {
    var tableData = {
        title: 'Health Factors',
        emptyMessage: 'No health factors found',
        columns: [{
            header: 'Date',
            property: 'date',
            width: '25%'
        }, {
            header: 'Name',
            property: 'name',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers.Immunizations = function(data) {
    var tableData = {
        title: 'Immunizations',
        emptyMessage: 'No immunizations found',
        columns: [{
            header: 'Date',
            property: 'date',
            width: '25%'
        }, {
            header: 'Immunization',
            property: 'name',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

var freeTextHandler = function(defaultTitle) {
    return function(data) {
        var tableContent = {
            headerRows: 1,
            keepWithHeaderRows: 1
        };
        tableContent.widths =  ['100%'];
        tableContent.body = [[{
            text: data.title || defaultTitle,
            style: 'tableTitle'
        }], [{
            text: data.content || ''
        }]];
        return {
            table: tableContent,
            keepWithHeaderRows: true
        };
     };
};

sectionHandlers['Free Text 1'] = freeTextHandler('Free Text 1');

sectionHandlers['Free Text 2'] = freeTextHandler('Free Text 2');

sectionHandlers['Free Text 3'] = freeTextHandler('Free Text 3');

sectionHandlers.Labs = function(data) {
    var tableData = {
        title: 'Labs',
        emptyMessage: 'No lab results found',
        columns: [{
            header: 'Date',
            property: 'date',
            width: '17%'
        }, {
            header: 'Name',
            property: 'name',
            width: '32%'
        }, {
            header: 'Value',
            property: 'value',
            width: '17%'
        }, {
            header: 'Units',
            property: 'units',
            width: '17%'
        }, {
            header: 'Range',
            property: 'refRange',
            width: '17%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['IV Medications'] = function(data) {
    var tableData = {
        title: 'IV Medications',
        emptyMessage: 'No IV medications found',
        columns: [{
            header: 'Detail',
            property: 'detail',
            width: '50%'
        }, {
            header: 'Direction',
            property: 'sig',
            width: '50%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Outpatient Medications'] = function(data) {
    var tableData = {
        title: 'Outpatient Medications',
        emptyMessage: 'No outpatient medications found',
        columns: [{
            header: 'Detail',
            property: 'detail',
            width: '50%'
        }, {
            header: 'Direction',
            property: 'sig',
            width: '50%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Inpatient Medications'] = function(data) {
    var tableData = {
        title: 'Inpatient Medications',
        emptyMessage: 'No inpatient medications found',
        columns: [{
            header: 'Name',
            property: 'name',
            width: '25%'
        }, {
            header: 'Dose',
            property: 'dose',
            width: '25%'
        }, {
            header: 'Route',
            property: 'route',
            width: '25%'
        }, {
            header: 'Schedule',
            property: 'schedule',
            width: '25%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Pending Lab Orders'] = function(data) {
    var tableData = {
        title: 'Pending Lab Orders',
        emptyMessage: 'No pending lab orders found',
        columns: [{
            header: 'Date/Time',
            property: 'start',
            width: '25%'
        }, {
            header: 'Order',
            property: 'testName',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Diet Orders'] = function(data) {
    var tableData = {
        title: 'Diet Orders',
        emptyMessage: 'No diet orders found',
        columns: [{
            header: 'Date/Time',
            property: 'start',
            width: '25%'
        }, {
            header: 'Order',
            property: 'description',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Pending Procedures'] = function(data) {
    var tableData = {
        title: 'Pending Procedures',
        emptyMessage: 'No pending procedures found',
        columns: [{
            header: 'Date/Time',
            property: 'start',
            width: '25%'
        }, {
            header: 'Order',
            property: 'name',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers['Pending Radiology Orders'] = function(data) {
    var tableData = {
        title: 'Pending Radiology Orders',
        emptyMessage: 'No pending radiology orders found',
        columns: [{
            header: 'Date/Time',
            property: 'start',
            width: '25%'
        }, {
            header: 'Order',
            property: 'testName',
            width: '75%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers.Visits = function(data) {
    var tableData = {
        title: 'Visits',
        emptyMessage: 'No current or future visits found',
        columns: [{
            header: 'Date',
            property: 'time',
            width: '33%'
        }, {
            header: 'Clinic',
            property: 'clinic',
            width: '33%'
        }, {
            header: 'Status',
            property: 'status',
            width: '34%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers.Vitals = function(data) {
    var tableData = {
        title: 'Vitals',
        emptyMessage: 'No vitals signs found',
        columns: [{
            header: 'Date/Time',
            property: 'date',
            width: '25%'
        }, {
            header: 'Type',
            property: 'type',
            width: '33%'
        }, {
            header: 'Value',
            property: 'value',
            width: '10%'
        }, {
            header: 'Unit',
            property: 'unit',
            width: '16%'
        }, {
            header: 'Qualifier',
            property: 'qualifier',
            width: '16%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers.Postings = function(data) {
    var tableData = {
        title: 'Postings',
        emptyMessage: 'No postings found',
        columns: [{
            header: 'Date',
            property: 'entryDate',
            width: '15%'
        }, {
            header: 'Type',
            property: 'type',
            width: '25%'
        }, {
            header: 'Text',
            property: 'text',
            width: '60%'
        }],
        data: data
    };
    return commonTable(tableData);
};

sectionHandlers.Providers = function(data) {
    var tableContent = {
        headerRows: 1,
        keepWithHeaderRows: 1
    };
    tableContent.widths =  ['30%', '70%'];
    var titleSpec = {
        text: 'Providers',
        colSpan: 2,
        style: 'tableTitle',
    }
    var titleRow = [titleSpec, {}];
    tableContent.body = [
        titleRow,
        [{
            text: 'Admitting Provider',
            style: 'tableHeader',
            alignment: 'left'
        }, {
            text: data.admittingProvider || ''
        }],
        [{
            text: 'Admitting Diagnosis',
            style: 'tableHeader',
            alignment: 'left'
        }, {
            text: data.admittingDiagnosis || ''
        }],
        [{
            text: 'Attending Provider',
            style: 'tableHeader',
            alignment: 'left'
        }, {
            text: data.attendingProvider || ''
        }],
        [{
            text: 'Inpatient Provider',
            style: 'tableHeader',
            alignment: 'left'
        }, {
            text: data.inpatientProvider || ''
        }]
    ];
    return {
        table: tableContent,
        keepWithHeaderRows: true
    };
};

exports.getSectionContent = function(sectionName, patientData) {
    var handler = sectionHandlers[sectionName];
    var table;
    if (handler && patientData) {
        table = handler(patientData);
    } else {
        table = commonTable({
            title: sectionName,
            emptyMessage: patientData ? 'No Handler found' : 'No Data Found',
            columns: [],
            data: []
        });
    }
    table.margin = [0, 0, 0, 20];
    var result = [table];
    return result;
};

exports.getDemographicsContent = function(demographics) {
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

    return {
        table: demographicsTableContent,
        margin: [5, 0, 0, 20],
        layout: 'noBorders'
    };
};

var headerText = "The Daily Plan represents current hospital activity and it is NOT a full list of everything that takes place during your hospital stay.  Your medications, treatments, appointments, etc. may change at discharge.  Please keep your personal information out of sight by storing this folder in a private place, such as a night stand drawer or bedside cabinet.";

exports.getIntro = function(following) {
    var result =  {
        columns: [{
            image: path.join(__dirname, 'images', 'dailyPlanLogo.jpg')
        }, {
            text: headerText,
            width: '50%'
        }],
        margin: [0, 0, 0, 10]
    };
    if (following) {
        result.pageBreak = 'before'
    }
    return result;
};
