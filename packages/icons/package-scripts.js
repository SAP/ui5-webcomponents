const getScripts = require("@ui5/webcomponents-tools/icons-collection/nps.js");

const options = {
	collectionName: "SAP-icons",
	versions: ["v4", "v5"],
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
