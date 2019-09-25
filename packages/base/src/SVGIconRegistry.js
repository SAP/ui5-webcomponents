const registry = new Map();

const registerIcon = (name, d, accData) => {
	registry.set(name, { d, accData });
};

const getIconData = name => {
	return registry.get(name);
};

const hasIcon = name => {
	return registry.has(name);
};

const getRegisteredNames = () => {
	return Array.from(registry.keys());
};

export { getIconData, registerIcon, getRegisteredNames, hasIcon };
