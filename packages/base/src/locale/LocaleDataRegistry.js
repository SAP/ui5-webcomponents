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

// Create a global LocaleDataRegistry that can be used from the "utils" package stubs
window.sap = window.sap || {};
window.sap.ui = window.sap.ui || {};
window.sap.ui._UI5WebComponents = window.sap.ui._UI5WebComponents || {};
window.sap.ui._UI5WebComponents.LocaleDataRegistry = { getModuleContent };

export {
	getModuleContent,
	registerModuleContent,
};
