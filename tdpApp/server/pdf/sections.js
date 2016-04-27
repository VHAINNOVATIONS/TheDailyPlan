'use strict';

var path = require('path');

var moment = require('moment');
var _ = require('lodash');

var sectionHandlers = {};

var commonTable = function(tableData, options) {
    options = options || {};
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
        if (options.hilite) {
            titleSpec.color = 'white';
            titleSpec.fillColor = 'black'
        }
        tableContent.body = [[titleSpec, {
            text: 'dummy'
        }], tableData.columns.map(function(c) {
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
                    return '';
                } else {
                    return v;
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
