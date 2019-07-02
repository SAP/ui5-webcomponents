const registry = new Map();

const registerIcon = (name, transform, d) => {
    registry.set(name, {name, transform, d});
};

const getIconData = (name) => {
    return registry.get(name);
};

export { getIconData, registerIcon };