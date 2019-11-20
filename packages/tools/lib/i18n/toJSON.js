/*
 * The script converts all messebindle_*.properties files to messagebundle_*.json files.
 *
 * Execution (note: the paths depends on the the execution context)
 * node toJSON.js ../../src/assets/i18n ../../dist/generated/assets/i18n
 * 
 * The 1st param '../../src/assets/i18n' is the location of messagebundle_*.properties files
 * The 2nd param './../dist/generated/assets/i18n' is where the JSON files would be written to.
 */
const path = require("path");
const glob = require("glob");
const PropertiesReader = require('properties-reader');
const fs = require('fs');
const messagesBundles = path.normalize(`${process.argv[2]}/messagebundle_*.properties`);
const messagesJSONDist = path.normalize(`${process.argv[3]}`);

 const convertToJSON = (file) => {
	const properties = PropertiesReader(file)._properties;
	const filename = path.basename(file, path.extname(file));
	const outputFile = path.normalize(`${messagesJSONDist}/${filename}.json`);

	fs.writeFileSync(outputFile, JSON.stringify(properties));
	console.log(`[i18n]: "${filename}.json" has been generated!`);
}

 glob(messagesBundles, {}, (err, files) => {
	if (err) {
		return console.log("No messagebundle files found!");
	}
	files.forEach(convertToJSON);
}); 