require('dotenv').load();
var models = require('../models/index');
var _ = require('lodash');
var fs = require('fs');
var pdfFolder = '..\\..\\client\\public\\pdfreports\\';

var deleteFolderRecursive = function(path) {
console.log('Delete Folder');
  if( fs.existsSync(path) ) {
    fs.readdirSync(path).forEach(function(file,index){
      var curPath = path + "\\" + file;
      console.log('CURRENT PATH:' + curPath);
      if(fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
  }
};

models.user_pdf.destroy({where: {}}).then(function()
{	
	console.log('Delete complete, Exiting process');
	deleteFolderRecursive(pdfFolder);
	process.exit();
});

