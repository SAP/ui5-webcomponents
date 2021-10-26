const roots = new Map();
let useLinks = false;

const setPackageCSSRoot = (packageName, root) => {
	roots.set(packageName, root);
};

const getUrl = (packageName, path) => {
	return `${roots.get(packageName)}${path}`;
};

const setUseLinks = use => {
	useLinks = use;
};

const shouldUseLinks = () => {
	return useLinks;
};

export {
	setPackageCSSRoot,
	getUrl,
	setUseLinks,
	shouldUseLinks,
};
