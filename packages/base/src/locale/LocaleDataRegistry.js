const resources = new Map();

const getModuleContent = moduleName => {
	const moduleContent = resources.get(moduleName);
	if (moduleContent) {
		return moduleContent;
	}

	const missingModule = moduleName.match(/sap\/ui\/core\/cldr\/(\w+)\.json/);
	if (missingModule) {
		throw new Error(`CLDR data for locale ${missingModule[1]} is not loaded!`);
	}

	throw new Error(`Unknown module ${moduleName}`);
};

const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

export {
	getModuleContent,
	registerModuleContent,
};
