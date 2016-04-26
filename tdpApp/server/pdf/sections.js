'use strict';

var _ = require('lodash');

var sectionHandlers = {};

var commonTable = function(tableData) {
    if (tableData.data && tableData.data.length) {
        var tableContent = {
            headerRows: 2,
            keepWithHeaderRows: 2
        };
        tableContent.widths =  _.map(tableData.columns, 'width');
        tableContent.body = [[{
            text: tableData.title,
            colSpan: tableData.columns.length,
            style: 'tableTitle'
        }, {
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
        emptyMessage: (data.status === null) ? 'No Allergy Assessment' : 'No Known Allergies',
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
    return commonTable(tableData);
};

exports.getSectionContent = function(sectionName, patientData) {
    var handler = sectionHandlers[sectionName];
    if (handler && patientData) {
        var table = handler(patientData);
        table.margin = [0, 0, 0, 20];
        var result = [table];
        return result;
    } else {
        return [];
    }
};
