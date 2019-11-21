const fs = require('fs');
const path = require('path');
const PropertiesReader = require('properties-reader');
const messageBundle = path.normalize(`${process.argv[2]}/messagebundle.properties`);
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
const getOutputFileContent = (properties) => {
	const textKeys = Object.keys(properties);
	const texts = textKeys.map(prop => getTextInfo(prop, properties[prop])).join('');

	return `${texts}
export {${textKeys.join()}};`;
}

/*
 * Writes the i18n-defaults.js.
 */
const writeI18nDefaultsFile = (file, content) => {
	fs.writeFile(file, content, (err) => {
		if (err) {
			return console.log(err);
		}

		console.log(`[i18n]: "${file}" file has been created`);
	});
}

writeI18nDefaultsFile(outputFile, getOutputFileContent(properties));