const getScripts = require("@ui5/webcomponents-tools/icons-collection/nps.js");

const options = {
	collectionName: "SAP-icons-TNT",
	versions: ["v2", "v3"],
	typescript: true,
};

const scripts = getScripts(options);

// no i18n in this package
scripts.build.i18n = "";
scripts.build.jsonImports = "";

module.exports = {
	scripts
};
