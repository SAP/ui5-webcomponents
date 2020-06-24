const namespace = "sap.ui._UI5WebComponents";

const getFullPath = path => `${namespace}.${path}`;

const getSharedResource = path => {
	const parts = getFullPath(path).split(".");
	let current = window;

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			return;
		}
		current = current[part];
	}

	return current;
};

const createSharedResource = (path, value) => {
	const parts = getFullPath(path).split(".");
	let current = window;

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const lastPart = i === parts.length - 1;
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			current[part] = lastPart ? value : {};
		}
		current = current[part];
	}

	return current;
};

const getOrCreateSharedResource = (path, initialValue) => {
	const resource = getSharedResource(path);
	if (resource !== undefined) {
		return resource;
	}

	return createSharedResource(path, initialValue);
};

export {
	getSharedResource,
	createSharedResource,
	getOrCreateSharedResource,
};
