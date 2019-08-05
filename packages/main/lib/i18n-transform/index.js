const fs = require('fs');
const path = require('path');
const PropertiesReader = require('properties-reader');
const messageBundle = path.normalize(process.argv[2]);
const outputFile = path.normalize(`${process.argv[3]}/i18n-defaults.js`);

if (!messageBundle || !outputFile) {
	return;
}

const properties = PropertiesReader(messageBundle)._properties;

/*
 * Returns the single text object to enable single export.
 *
 * Example:
 * const ARIA_LABEL_CARD_CONTENT = {
 *	key: "ARIA_LABEL_CARD_CONTENT",
 *	defaultText: "Card Content",
 * };
 */
const getTextInfo = (properties) => {
	return Object.keys(properties).map(prop => `const ${prop} = {key: "${prop}", defaultText: "${properties[prop]}"};`).join('');
}

/*
 * Returns the content of i18n-defaults.js,
 * combining the single text objects and the export statement at the end of the file.
 *
 * Example:
 * export {
 *	ARIA_LABEL_CARD_CONTENT,
 * }
 */
const getOutputFileContent = (properties) => {
	return `${getTextInfo(properties)} export {${Object.keys(properties).join()}}; //eslint-disable-line`;
}

// Writes the i18n-defaults.js
fs.writeFile(outputFile, getOutputFileContent(properties), function (err) {
	if (err) {
		return console.log(err);
	}

	console.log(`The ${outputFile} file has been created`);
});