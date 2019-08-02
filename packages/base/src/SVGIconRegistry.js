const registry = new Map();

const registerIcon = (name, d, acc) => {
	registry.set(name, { d, acc });
};

const getIconData = name => {
	return registry.get(name);
};

const getRegisteredNames = () => {
	return Array.from(registry.keys());
};

export { getIconData, registerIcon, getRegisteredNames };
