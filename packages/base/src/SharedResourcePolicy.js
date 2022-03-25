import { getCurrentRuntimeIndex, compareRuntimes } from "./Runtimes.js";
import SharedResourceReusePolicy from "./types/SharedResourceReusePolicy.js";
import SharedResourceType from "./types/SharedResourceType.js";

// Default policies per resource type. Can be overridden by calling "setSharedResourcePolicy"
const policies = {};
policies[SharedResourceType.ThemeProperties] = SharedResourceReusePolicy.OnlyNewer;

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
 * Determines whether a resource of a certain type/version should be updated by the current runtime
 *
 * @param resourceType the kind of resource that is about to be updated
 * @param resourceRuntimeIndex the index of the runtime that created this resource (undefined means the runtime that created the resource did not set runtime info on it at all)
 * @returns {boolean}
 */
const shouldUpdateResource = (resourceType, resourceRuntimeIndex) => {
	const policy = getSharedResourcePolicy(resourceType);

	// Always update regardless of versions
	if (policy === SharedResourceReusePolicy.Always) {
		return true;
	}

	// Never update regardless of versions
	if (policy === SharedResourceReusePolicy.Never) {
		return false;
	}

	// Only update if the current runtime is newer
	const resourceRuntimeIsOlder = resourceRuntimeIndex === undefined; // The resource was created by a runtime before the introduction of the policies system
	const currentRuntimeIsNewer = compareRuntimes(getCurrentRuntimeIndex(), parseInt(resourceRuntimeIndex)) === 1; // 1 means the current is newer, 0 means the same, -1 means the resource's runtime is newer
	return resourceRuntimeIsOlder || currentRuntimeIsNewer;
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
	setSharedResourcePolicy,
	getSharedResourcePolicy,
	shouldUpdateResource,
};
