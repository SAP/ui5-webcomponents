const fs = require("fs");
const path = require("path");

const definitionFiles = [
	`base/component-derived-colors`,
	`sap_belize/base-parameters`,
	`sap_belize_hcb/base-parameters`,
	`sap_fiori_3/base-parameters`,
	`sap_fiori_3_dark/base-parameters`
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

definitionFiles.forEach(name => {
	const defsFilePath = path.join(`src/themes`, `${name}.less`);
	const varsFilePath = path.join(`src/themes`, `${name}-vars.less`);

	const defsFileVars = extractVarsFromDefinitionFile(fs.readFileSync(defsFilePath).toString());
	const varsFileVars = extractVarsFromVarsFile(fs.readFileSync(varsFilePath).toString());

	// Missing definitions
	const missing = defsFileVars.filter(v => !varsFileVars.includes(v));
	if (missing.length) {
		console.log(`\nMissing variables in ${varsFilePath}`);
		console.log(missing.join(`\n`));
	}

	// Extra definitions
	const extra = varsFileVars.filter(v => !defsFileVars.includes(v));
	if (extra.length) {
		console.log(`\nExtra variables in ${varsFilePath}`);
		console.log(extra.join(`\n`));
	}

});
