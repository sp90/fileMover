// Core node modules
var fs = require('fs');
var path = require('path');
//
var input = path.join(__dirname + "/img");
var output = path.join(__dirname + "/small");

// leave first element in array as dot to move all
// var makers = ["."];
var filter = ["Alfa-Romeo","Aston-Martin","Audi","BMW","Bentley","Buick","Cadillac","Chevrolet","Chrysler","Citroën","Dacia","Daewoo","Daihatsu","Dodge","Ferrari","Fiat","Ford","Honda","Hummer","Hyundai","Infiniti","Iveco","Jaguar","Jeep","Kia","Lada","Lamborghini","Lancia","Land Rover","Lexus","Lotus","Maserati","Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan","Opel","Peugeot","Pontiac","Porsche","Renault","Rolls-Royce","Rover","Saab","Seat","Skoda","Smart","SsangYong","Subaru","Suzuki","Tesla","Toyota","Volkswagen","Volvo"];

// leave as empty string if not set
// var filter2 = "";
var filter2 = "150";

// leave as empty string if not set
// var prefix = "";
var prefix = "small-";

function moveFilesFilter(inputFolder, outputFolder, filter, filter2, prefix) {
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
				if(source.indexOf(filter2) > -1) {
					var readFile = fs.createReadStream(source);
					var fileName = source.split(/[\s\/]+/);
					if(prefix.length > 0) {
						var file = outputFolder + "/" + prefix + fileName[fileName.length-1];
					} else {
						var file = outputFolder + "/" + fileName[fileName.length-1];
					}
					var writeFile = fs.createWriteStream(file);
					readFile.pipe(writeFile);
				}
			}
		};
	};
};

moveFilesFilter(input, output, filter, filter2, prefix);
