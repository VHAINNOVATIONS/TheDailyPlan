'use strict';

angular.module('tdpApp')
    .controller('PdfDownloadCtrl', function($compile, $scope, $q, $location, DTOptionsBuilder, DTColumnBuilder,PDF,Patient) {
		var self = this;
		self.dtInstance = {};

		self.newPromise = newPromise;
		self.reloadData = reloadData;
		self.refreshTable = refreshTable;
        self.genPdf = genPdf;

		
		function newPromise() {
            return $q(function(resolve, reject) {
                if (self.data) {
                    resolve(self.data);
                } else {
                	PDF.getPdfList().then( function(pdfList) {
						resolve(pdfList.data);
					});
                }
            });
        }

        function reloadData(data) {
            self.data = data;
            self.noResults = !(data.length);
            var resetPaging = true;
            self.dtInstance.reloadData(function(){}, resetPaging);
        }

        function refreshTable(){
			PDF.getPdfList().then( function(pdfList) {
				reloadData(pdfList.data);
			});
        }

        function genPdf(obj){
            obj.preventDefault();
            var target = angular.element(obj.target);
            var fileName = target.attr('data-fileName');
            var filepath = "pdfreports\\" + fileName;
            Patient.setPDFFilepath(filepath);
            $location.path('/PDFView');
        }

        self.dtOptions = DTOptionsBuilder.fromFnPromise(function() {
                //return $resource('data1.json').query().$promise;
                return newPromise();
            })
            .withOption('createdRow', function(row, data, dataIndex) {
                // Recompiling so we can bind Angular directive to the DT
                $compile(angular.element(row).contents())($scope);
            })
            .withOption('headerCallback', function(header) {
                if (!self.headerCompiled) {
                    // Use this headerCompiled field to only compile header once
                    self.headerCompiled = true;
                    $compile(angular.element(header).contents())($scope);
                }
            })
            .withPaginationType('full_numbers')
            .withOption('aaSorting', [
                [2, 'desc']
            ])
            // Active Responsive plugin
            .withOption('responsive', true);

        self.dtColumns = [
            DTColumnBuilder.newColumn(null).withTitle('File Name').renderWith(function(data, type, full){
                if(data.fileName === "ERROR" || data.fileName == null)
                    return ""
                else 
                {
                    return '<a href="_blank" ng-click="ctrl.genPdf($event)" data-fileName='+ data.fileName +' class="nameLink">'+data.fileName+'</a>';
                }
                
            }),
            DTColumnBuilder.newColumn(null).withTitle('Status').renderWith(function(data, type, full){
                var Status = "In Progress-Click refresh button above"
                if(data.fileName === "ERROR")
                {
                    Status = "Error";
                }
                else if (data.fileName != null) {
                    Status = "Complete";
                }
                return Status;
            }),
            DTColumnBuilder.newColumn('requestedDateTime').withTitle('Date Requested').withOption('type', 'date')
        ];

    });
