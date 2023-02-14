import getSingletonElementInstance from "./util/getSingletonElementInstance.js";

const getSharedResourcesInstance = (): Record<string, unknown> | null => {
	if (typeof document === "undefined") {
		return null;
	}
	return getSingletonElementInstance("ui5-shared-resources", document.head) as unknown as Record<string, unknown>;
};

/**
 * Use this method to initialize/get resources that you would like to be shared among UI5 Web Components runtime instances.
 * The data will be accessed via a singleton "ui5-shared-resources" HTML element in the "head" element of the page.
 *
 * @public
 * @param namespace Unique ID of the resource, may contain "." to denote hierarchy
 * @param initialValue Object or primitive that will be used as an initial value if the resource does not exist
 * @returns {*}
 */
const getSharedResource = <T>(namespace: string, initialValue: T): T => {
	const parts = namespace.split(".");
	let current = getSharedResourcesInstance() as Record<string, any>;

	if (!current) {
		return initialValue;
	}

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const lastPart = i === parts.length - 1;
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			current[part] = lastPart ? initialValue : {};
		}
		current = current[part];
	}

	return current as T;
};

export default getSharedResource;
