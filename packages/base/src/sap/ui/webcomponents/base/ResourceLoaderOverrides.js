const resources = new Map();

// date formatters from the core do not know about this new mechanism of fetching assets,
// but we can use the sap.ui.loader._.getModuleContent as a hook and provide the preloaded data,
// so that a sync request via jQuery is never triggered.
sap.ui.loader = sap.ui.loader || {};
sap.ui.loader._ = sap.ui.loader._ || {};
const getModulecontentOrig = sap.ui.loader._.getModuleContent;

sap.ui.loader._.getModuleContent = (moduleName, url) => {
	const customContent = resources.get(moduleName) || resources.get(url);

	if (customContent) {
		return customContent;
	} else if (getModulecontentOrig) {
		return getModulecontentOrig(moduleName, url);
	}

	return "";
};

const registerModuleContent = (moduleName, content) => {
	resources.set(moduleName, content);
};

export { registerModuleContent }