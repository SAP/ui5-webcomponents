const registry = new Map();

const registerIcon = (name, d) => {
	registry.set(name, { name, d });
};

const getIconData = name => {
	return registry.get(name);
};

const getRegisteredNames = () => {
	return Array.from(registry.keys());
};

export { getIconData, registerIcon, getRegisteredNames };
