const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const options = {
	port: 8081,
	portStep: 2,
	fioriPackage: true,
	typescript: true,
	illustrationsData: [
		{
			path: "src/illustrations",
			defaultText: true,
			illustrationsPrefix: "sapIllus",
			set: "fiori",
			destinationPath: "dist/illustrations",
		},
		{
			path: "src/illustrations/tnt",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			destinationPath: "dist/illustrations/tnt",
		},
	]
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
