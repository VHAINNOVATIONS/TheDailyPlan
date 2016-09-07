require('dotenv').load();
var models = require('../models/index');
var _ = require('lodash');
var fs = require('fs');
var path = require('path');


var deleteFolderRecursive = function(rootPath) {
  if( fs.existsSync(rootPath) ) {
    fs.readdirSync(rootPath).forEach(function(file,index){
      var curPath =  path.join(rootPath, file);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
  }
}; 

exports.DeletePDF = function(rootPath){
  models.user_pdf.destroy({where: {}}).then(function()
  { 
    var pdfFolder =  path.join(rootPath, 'pdfreports');
    deleteFolderRecursive(pdfFolder);
  });
};


