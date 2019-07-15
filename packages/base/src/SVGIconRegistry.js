const registry = new Map();

const registerIcon = (name, viewBox, d) => {
	registry.set(name, { name, viewBox, d });
};

const getIconData = name => {
	return registry.get(name);
};

const getRegsiteredNames = () => {
	return Array.from(registry.keys());
};

export { getIconData, registerIcon, getRegsiteredNames };
