const registry = new Map();

const registerIcon = (name, d, accData) => {
	registry.set(name, { d, accData });
};

const getIconData = name => {
	return registry.get(name);
};

const getRegisteredNames = () => {
	return Array.from(registry.keys());
};

const isIconURI = uri => {
	return /sap-icon:\/\//.test(uri);
};

export {
	getIconData,
	registerIcon,
	getRegisteredNames,
	isIconURI,
};
