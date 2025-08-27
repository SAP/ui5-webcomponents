const fs = require('fs');
const Ajv = require('ajv');
const path = require('path');

// Load your JSON schema
const externalSchema = require('./schema.json');
const internalSchema = require('./schema-internal.json');

const clearProps = (data) => {
	if (Array.isArray(data)) {
		for (let i = 0; i < data.length; i++) {
			if (typeof data[i] === "object") {
				if (["enum", "interface"].includes(data[i].kind)) {
					data.splice(i, 1);
					i--;
				} else {
					clearProps(data[i]);
				}
			}
		}
	} else if (typeof data === "object") {
		Object.keys(data).forEach(prop => {
			if (prop.startsWith("_ui5")) {
				delete data[prop];
			} else if (typeof data[prop] === "object") {
				clearProps(data[prop]);
			}
		});
	}

	return data;
};

const filterExports = (moduleDoc) => {
	moduleDoc.exports = moduleDoc.exports
		.filter(e => moduleDoc.declarations.find(d => d.name === e.declaration.name && ["class", "function", "variable", "enum"].includes(d.kind)) || e.name === "default");
};

const validateCEM = (options = {}) => {
	const {
		inputFilePath = path.join(process.cwd(), "dist/custom-elements.json"),
		devMode = "",
		writeFiles = true,
		silent = false
	} = options;

	// Load your JSON data from the input file
	const customManifest = fs.readFileSync(inputFilePath, 'utf8');
	const inputDataInternal = JSON.parse(customManifest);

	// Filter exports
	inputDataInternal.modules.forEach(filterExports);

	const ajv = new Ajv({ allowUnionTypes: true, allError: true });
	let validate = ajv.compile(internalSchema);

	// Validate the JSON data against the internal schema
	if (devMode) {
		if (validate(inputDataInternal)) {
			!silent && console.log('Internal custom element manifest is validated successfully');
		} else {
			console.log(validate.errors);
			throw new Error(`Validation of internal custom elements manifest failed: ${validate.errors}`);
		}
	}

	// Create external data by clearing internal properties
	const inputDataExternal = clearProps(JSON.parse(JSON.stringify(inputDataInternal)));
	validate = ajv.compile(externalSchema);

	// Validate the JSON data against the external schema
	if (validate(inputDataExternal)) {
		!silent && console.log('Custom element manifest is validated successfully');

		if (writeFiles) {
			fs.writeFileSync(inputFilePath, JSON.stringify(inputDataExternal, null, 2), 'utf8');
			fs.writeFileSync(inputFilePath.replace("custom-elements", "custom-elements-internal"), JSON.stringify(inputDataInternal, null, 2), 'utf8');
		}

		return {
			external: inputDataExternal,
			internal: inputDataInternal,
			valid: true
		};
	} else if (devMode) {
		throw new Error(`Validation of public custom elements manifest failed: ${validate.errors}`);
	} else {
		return {
			external: inputDataExternal,
			internal: inputDataInternal,
			valid: false,
			errors: validate.errors
		};
	}
};

// If this file is run directly (not required as a module)
if (require.main === module) {
	try {
		validateCEM();
	} catch (error) {
		console.error('Validation failed:', error.message);
		process.exit(1);
	}
}

module.exports = validateCEM;
module.exports.validateCEM = validateCEM;
module.exports.clearProps = clearProps;
module.exports.filterExports = filterExports;