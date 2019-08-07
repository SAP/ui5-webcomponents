const fs = require('fs');
const path = require('path');
const glob = require("glob");
const PropertiesReader = require('properties-reader');
const messagesBundles = path.normalize(`${process.argv[2]}/messagebundle_*.properties`);
const messagesJSONDist = path.normalize(`${process.argv[3]}`);

/*
 * Returns the single text object to enable single export.
 *
 * Example:
 * const ARIA_LABEL_CARD_CONTENT = {
 *	key: "ARIA_LABEL_CARD_CONTENT",
 *	defaultText: "Card Content",
 * };
 */
const getTextInfo = (key, value) => `const ${key} = {key: "${key}", defaultText: "${value}"};`;

/*
 * Returns the complete content of i18n-defaults.js file:
 * (1) the single text objects
 * (2) the export statement at the end of the file
 *
 * Example:
 * export {
 *	ARIA_LABEL_CARD_CONTENT,
 * }
 */
const getMessageBundleContentAsExports = (properties) => {
	const textKeys = Object.keys(properties);
	const texts = textKeys.map(prop => getTextInfo(prop, properties[prop])).join('');

	return `${texts} export {${textKeys.join()}};`;
}

const writeFile = (file, content) => {
	fs.writeFile(file, content, (err) => {
		if (err) {
			return console.log(err);
		}

		console.log(`The ${file} file has been created`);
	});
}

glob(messagesBundles, {}, (err, files) => {
	if (err) {
		return console.log("No messagebundle files found!");
	}
	files.forEach(file => {
		const properties = PropertiesReader(file)._properties;
		const filename = path.basename(file, path.extname(file));
		const outputFile = path.normalize(`${messagesJSONDist}/${filename}.js`);

		writeFile(outputFile, getMessageBundleContentAsExports(properties))
	});
});