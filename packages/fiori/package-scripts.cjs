const getScripts = require("@ui5/webcomponents-tools/components-package/nps.js");

const filterOut = [
	"sapIllus-Dot",
	"sapIllus-Dialog",
	"sapIllus-Scene",
	"sapIllus-Spot",
	"tnt-Dot", 
	"tnt-Dialog", 
	"tnt-Scene", 
	"tnt-Spot", 
	"AllIllustrations",
];

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
			collection: "V4",
			destinationPath: "dist/illustrations",
			dynamicImports: {
				outputFile: "dist/generated/js-imports/Illustrations.js",
				location: '../../illustrations',
				prefix: "",
				filterOut
			}
		},
		{
			path: "src/illustrations/tnt",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V4",
			destinationPath: "dist/illustrations/tnt",
			dynamicImports: {
				outputFile: "dist/generated/js-imports/IllustrationsTNT.js",
				location: '../../illustrations/tnt',
				prefix: "Tnt",
				filterOut
			}
		},
		{
			path: "src/illustrations-v5/tnt",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V5",
			destinationPath: "dist/illustrations-v5/tnt",
			dynamicImports: {
				outputFile: "dist/generated/js-imports/IllustrationsV5TNT.js",
				location: '../../illustrations-v5/tnt',
				prefix: "Tnt",
				filterOut
			}
		},
		{
			path: "src/illustrations-v5/tnt/hc",
			defaultText: false,
			illustrationsPrefix: "tnt",
			set: "tnt",
			collection: "V5/HC",
			destinationPath: "dist/illustrations-v5/tnt/hc",
			dynamicImports: {
				outputFile: "dist/generated/js-imports/IllustrationsV5TNTHC.js",
				location: '../../illustrations-v5/tnt/hc',
				prefix: "Tnt",
				filterOut
			}
		},
	]
};

const scripts = getScripts(options);

module.exports = {
	scripts
};
