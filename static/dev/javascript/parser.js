//**development URL
function parseSetup(){

	Papa.SCRIPT_PATH = "papaparse.js";
	var _results = {};

	

	Papa.parse("https://luxsens.github.io/csv/styles.csv", {
		
		download: true,
		complete: function(results) {
			_results["styles"] = results;
			console.log("Parsing styles complete:", results);
		}
	});
	Papa.parse("https://luxsens.github.io/csv/brands.csv", {
		
		download: true,
		complete: function(results) {
			_results["brands"] = results;
			console.log("Parsing brands complete:", results);
		}
	});
	Papa.parse("https://luxsens.github.io/csv/collections.csv", {
		
		download: true,
		complete: function(results) {
			_results["collections"] = results;
			console.log("Parsing collections complete:", results);
		}
	});
	//Hierachy is a large file
	Papa.parse("https://luxsens.github.io/csv/hierachy.csv", {
		
		download: true,


		//cannot use web worker, will fixed papaparse later
		//worker: true,

		complete: function(results) {
			_results["hierachy"] = results
			console.log("All done!");
		}
	});

	return _results
}


