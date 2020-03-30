const fs = require("fs");
const path = require("path");

const allThemesDefinitionFiles = [
	`sap_belize/base-parameters`,
	`sap_belize_hcb/base-parameters`,
	`sap_belize_hcw/base-parameters`,
	`sap_fiori_3/base-parameters`,
	`sap_fiori_3_dark/base-parameters`,
];

const allDefinitionFiles = [
	...allThemesDefinitionFiles
];

const extractVarsFromDefinitionFile = str => {
	const lines = str.split(`\n`);
	return lines.map(line => {
		const match = line.match(/^\s*@([a-zA-Z0-9_\-]+)\:/);
		return match ? match[1] : undefined;
	}).filter(item => !!item);
};

const extractVarsFromVarsFile = str => {
	const lines = str.split(`\n`);
	return lines.map(line => {
		const match = line.match(/^\s*--([a-zA-Z0-9_\-]+)\:/);
		return match ? match[1] : undefined;
	}).filter(item => !!item);
};

console.log(`\n1. Checking for missing variables in the *-vars.less files`);
allDefinitionFiles.forEach(name => {
	const defsFilePath = path.join(`src/themes`, `${name}.less`);
	const varsFilePath = path.join(`src/themes`, `${name}-vars.less`);

	const defsFileVars = extractVarsFromDefinitionFile(fs.readFileSync(defsFilePath).toString());
	const varsFileVars = extractVarsFromVarsFile(fs.readFileSync(varsFilePath).toString());

	// Missing definitions
	const missing = defsFileVars.filter(v => !varsFileVars.includes(v));
	if (missing.length) {
		console.log(`\nMissing variables ${varsFilePath}`);
		console.log(missing.join(`\n`));
	}

	// Extra definitions
	const extra = varsFileVars.filter(v => !defsFileVars.includes(v));
	if (extra.length) {
		console.log(`\nExtra variables in ${varsFilePath}`);
		console.log(extra.join(`\n`));
	}

});

console.log(`\n2. Checking for discrepancies between themes`);
const varArrays = allThemesDefinitionFiles.map(name => {
	const defsFilePath = path.join(`src/themes`, `${name}.less`);
	return extractVarsFromDefinitionFile(fs.readFileSync(defsFilePath).toString());
});

const missingVars = [];
for (let i = 0; i < varArrays.length; i++) {
	for (let j = 0; j < varArrays.length; j++) {
		if (i !== j) {
			const missing = varArrays[i].filter(v => !varArrays[j].includes(v));
			missing.forEach(v => {
				if (!missingVars.includes(v) && !v.startsWith("sapHC")) {
					missingVars.push(v);
				}
			})
		}
	}
}
if (missingVars.length) {
	console.log(`\nVars missing in one or more themes:`);
	console.log(missingVars.join(`\n`));
}
