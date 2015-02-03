// Core node modules
var fs = require('fs');
var path = require('path');

// Local variables
var inputFolder = path.join(__dirname + "/input");
var outputFolder = path.join(__dirname + "/output");

// if the images contains these words they will get moved
var filter = ["red", "blue", "green"];

function moveFilesFilter(inputFolder, outputFolder, filter) {
	var filterArr = [];
	for (var i = 0; i < filter.length; i++) {
	    filterArr.push(filter[i].toLowerCase());
	}

	function getFiles(dir,files_){
	    files_ = files_ || [];
	    if (typeof files_ === 'undefined') files_=[];
	    var files = fs.readdirSync(dir);
	    for(var i in files){
	        if (!files.hasOwnProperty(i)) continue;
	        var name = dir+'/'+files[i];
	        if (fs.statSync(name).isDirectory()){
	            getFiles(name,files_);
	        } else {
	            files_.push(name);
	        }
	    }
	    return files_;
	}
	var sourceArray = getFiles(inputFolder);

	for (var i = 0; i < sourceArray.length; i++) {
		var source = sourceArray[i];
		for (var j = 0; j < filterArr.length; j++) {
			var filter = filterArr[j];
			if (source.indexOf(filter) > -1) {
				var readFile = fs.createReadStream(source);
				var fileName = source.slice(42);
				var writeFile = fs.createWriteStream(outputFolder + fileName);
				readFile.pipe(writeFile);
			}
		};
	};
};

moveFilesFilter(inputFolder, outputFolder, filter);
