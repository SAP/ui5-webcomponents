const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const assets = require('@ui5/webcomponents-tools/assets-meta.js');

const fileContent = `const assetParameters = ${JSON.stringify(assets)};

const DEFAULT_THEME = assetParameters.themes.default;
const DEFAULT_LANGUAGE = assetParameters.languages.default;
const DEFAULT_LOCALE = assetParameters.locales.default;
const SUPPORTED_LOCALES = assetParameters.locales.all;

export {
	DEFAULT_THEME,
	DEFAULT_LANGUAGE,
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
};`;

mkdirp.sync("dist/generated/");
fs.writeFileSync("dist/generated/AssetParameters.js", fileContent);

