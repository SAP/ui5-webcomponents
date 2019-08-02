const registry = new Map();

const registerIcon = (name, d, accText) => {
	registry.set(name, { d, accText });
};

const getIconData = name => {
	return registry.get(name);
};

const getRegisteredNames = () => {
	return Array.from(registry.keys());
};

export { getIconData, registerIcon, getRegisteredNames };
