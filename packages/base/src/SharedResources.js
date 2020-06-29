import getSingletonElementInstance from "./util/getSingletonElementInstance.js";

const getSharedResourcesInstance = () => getSingletonElementInstance("ui5-shared-resources");

const getSharedResource = path => {
	const parts = path.split(".");
	let current = getSharedResourcesInstance();

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
	const parts = path.split(".");
	let current = getSharedResourcesInstance();

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
