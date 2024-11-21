const fs = require('fs');

const packages = {
	fiori: "@ui5/webcomponents-fiori",
	main: "@ui5/webcomponents",
}

const flatManifest = new Map();

Object.keys(packages).forEach((packageName) => {
	const manifest = JSON.parse(fs.readFileSync(`packages/${packageName}/dist/custom-elements-internal.json`, 'utf8'));

	manifest.modules?.forEach(_module => {
		_module.declarations?.forEach(declaration => {
			declaration._package = packages[packageName];

			if (declaration.kind === "class") {
				flatManifest.set(`${packages[packageName]}/${declaration.name}`, JSON.parse(JSON.stringify(declaration)));
			} else if (declaration.kind === "interface") {
				flatManifest.set(`${packages[packageName]}/interfaces/${declaration.name}`, JSON.parse(JSON.stringify(declaration)));
			} else if (declaration.kind === "enum") {
				flatManifest.set(`${packages[packageName]}/enums/${declaration.name}`, JSON.parse(JSON.stringify(declaration)));
			}
		})
	})
})

const resolveDeclaration = (declaration) => {
	// If already been resolved
	if (declaration._resolved) {
		return;
	}
	// Declarations different than custom element doesn't need to be resolved
	if (declaration.kind !== "class") {
		return;
	}

	// Exclude base class properties;
	if (declaration.superclass.name === "UI5Element") {
		declaration._resolved = true;
		return;
	}

	// Declarations from current package have been already resolved by CEM generation
	if (declaration.superclass.package === declaration._package) {
		declaration._resolved = true;
		return;
	}

	const parentDeclaration = flatManifest.get(`${declaration.superclass.package}/${declaration.superclass.name}`);

	if (!parentDeclaration._resolved) {
		resolveDeclaration(parentDeclaration);

		if (!parentDeclaration._resolved) {
			throw new Error("Parent declaration wasn't resolved by some reason.");
		}
	}

	const propertiesToMerge = ["members", "events", "slots", "cssParts"];

	propertiesToMerge.forEach(keyToMerge => {
		declaration[keyToMerge] = parentDeclaration[keyToMerge]?.reduce((result, parentMember) => {
			if (result.some(currentMember => currentMember.name === parentMember.name)) {
				return result;
			}

			result.push(parentMember);

			return result;
		}, declaration[keyToMerge] || []) || declaration[keyToMerge];
	})
}

Array.from(flatManifest.values()).forEach(resolveDeclaration)
const result = {};

Array.from(flatManifest.entries()).forEach(([key, value]) => {
	result[key] = JSON.parse(JSON.stringify(value));
})

let fileName = process.argv.slice(2).find(arg => arg.startsWith("--file-name="))?.replace("--file-name=", "")
console.log(fileName)

fs.writeFileSync(`${fileName}.json`, JSON.stringify(result))