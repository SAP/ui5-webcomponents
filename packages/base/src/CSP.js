const roots = new Map();
let useLinks = false;
let preloadLinks = true;

const setPackageCSSRoot = (packageName, root) => {
	roots.set(packageName, root);
};

const getUrl = (packageName, path) => {
	return `${roots.get(packageName)}${path}`;
};

const setUseLinks = use => {
	useLinks = use;
};

const setPreloadLinks = preload => {
	preloadLinks = preload;
};

const shouldUseLinks = () => {
	return useLinks;
};

const shouldPreloadLinks = () => {
	return preloadLinks;
};

export {
	setPackageCSSRoot,
	getUrl,
	setUseLinks,
	setPreloadLinks,
	shouldUseLinks,
	shouldPreloadLinks,
};
