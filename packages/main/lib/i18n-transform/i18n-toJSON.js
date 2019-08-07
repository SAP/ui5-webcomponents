/*
 * NOTE: The script is not running currently, once we got the message.bundles_*,properties file we will enable it.
 * The script converts all messebindle_*.properties files to messagebundle_*.json files.
 *
 * Execution (note: the paths depends on the the execution context)
 * node i18n-toJSON.js ../../src/i18n ../../dist/generated/i18n
 * 
 * The 1st param '../../src/i18n' is the location of messagebundle_*.properties files
 * The 2nd param './../dist/generated/i18n' is where the JSON files would be written to.
 */
const path = require("path");
const glob = require("glob");
const fs = require('fs');
const messagesBundles = path.normalize(`${process.argv[2]}/messagebundle_*.properties`);
const messagesJSONDist = path.normalize(`${process.argv[3]}`);

 const convertToJSON = (file) => {
	const filename = path.basename(file, path.extname(file));
	const outputFile = path.normalize(`${messagesJSONDist}/${filename}.json`);
	const outputFileContent = {
		'_': fs.readFileSync(file).toString()
	};

 	fs.writeFileSync(outputFile, JSON.stringify(outputFileContent));
}

 glob(messagesBundles, {}, (err, files) => {
	if (err) {
		return console.log("No messagebundle files found!");
	}
	files.forEach(convertToJSON);
}); 