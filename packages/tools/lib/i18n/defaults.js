const fs = require('fs').promises;
const path = require('path');
const PropertiesReader = require('properties-reader');
const assets = require('../../assets-meta.js');

const generate = async () => {
	const defaultLanguage = assets.languages.default;

	const messageBundle = path.normalize(`${process.argv[2]}/messagebundle.properties`);
	const messageBundleDefaultLanguage = path.normalize(`${process.argv[2]}/messagebundle_${defaultLanguage}.properties`);
	const outputFile = path.normalize(`${process.argv[3]}/i18n-defaults.js`);

	if (!messageBundle || !outputFile) {
		return;
	}

	const properties = PropertiesReader(messageBundle)._properties;

	let defaultLanguageProperties;
	try {
		defaultLanguageProperties = PropertiesReader(messageBundleDefaultLanguage)._properties;
	} catch (e) {
	}


	/*
	 * Returns the single text object to enable single export.
	 *
	 * Example:
	 * const ARIA_LABEL_CARD_CONTENT = {
	 *	key: "ARIA_LABEL_CARD_CONTENT",
	 *	defaultText: "Card Content",
	 * };
	 */
	const getTextInfo = (key, value, defaultLanguageValue) => {
		let effectiveValue = defaultLanguageValue || value;
		effectiveValue = effectiveValue.replace(/\"/g, "\\\""); // escape double quotes in translations

		return `const ${key} = {key: "${key}", defaultText: "${effectiveValue}"};`;
	};

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
	const getOutputFileContent = (properties, defaultLanguageProperties) => {
		const textKeys = Object.keys(properties);
		const texts = textKeys.map(prop => getTextInfo(prop, properties[prop], defaultLanguageProperties && defaultLanguageProperties[prop])).join('');

		return `${texts}
export {${textKeys.join()}};`;
	};

	await fs.mkdir(path.dirname(outputFile), { recursive: true });
	await fs.writeFile(outputFile, getOutputFileContent(properties, defaultLanguageProperties));
};

generate().then(() => {
	console.log("i18n default file generated.");
});
