import SharedResourceReusePolicy from "./types/SharedResourceReusePolicy.js";
import SharedResourceType from "./types/SharedResourceType.js";

import getSingletonElementInstance from "./util/getSingletonElementInstance.js";

const getSharedResourcesInstance = () => getSingletonElementInstance("ui5-shared-resources", document.head);

// Default policies per resource type. Can be overridden by calling "setSharedResourcePolicy"
const policies = {
	"SVGIcons": "Always",
	"ThemeProperties": "OnlyNewer",
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
const getSharedResource = (namespace, initialValue) => {
	const parts = namespace.split(".");
	let current = getSharedResourcesInstance();

	for (let i = 0; i < parts.length; i++) {
		const part = parts[i];
		const lastPart = i === parts.length - 1;
		if (!Object.prototype.hasOwnProperty.call(current, part)) {
			current[part] = lastPart ? initialValue : {};
		}
		current = current[part];
	}

	return current;
};

/**
 * Sets the shared resource policy (f.e. OnlyNewer) for the given type of shared resources (such as SVGIcons)
 *
 * @param type
 * @param policy
 */
const setSharedResourcePolicy = (type, policy) => {
	if (!SharedResourceReusePolicy[policy]) {
		throw new Error(`Unsupported resource reuse policy: ${policy}`);
	}
	if (!SharedResourceType[type]) {
		throw new Error(`Unsupported resource reuse policy type: ${type}`);
	}

	policies[type] = policy;
};

/**
 * Returns the shared resource policy for the given type of shared resources
 *
 * @param type
 * @returns {*}
 */
const getSharedResourcePolicy = type => {
	return policies[type];
};

export {
	getSharedResource,
	setSharedResourcePolicy,
	getSharedResourcePolicy,
};
