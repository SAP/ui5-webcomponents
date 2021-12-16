import VersionInfo from "./generated/VersionInfo.js";
import RuntimeRegistry from "./runtime/RuntimeRegistry.js";
import getSharedResource from "./getSharedResource.js";

let currentRuntimeIndex;

/**
 * Central registry where all runtimes register themselves by pushing a Runtime instance object.
 * The index in the registry servers as an ID for the runtime.
 * @type {*}
 */
const registry = getSharedResource("Runtimes", new RuntimeRegistry());

/**
 * Returns the runtime object for a given runtime (current runtime by default)
 *
 * @param runtimeIndex the index of the runtime (current runtime if undefined)
 * @returns {*}
 */
const getRuntime = runtimeIndex => {
	if (runtimeIndex === undefined) {
		runtimeIndex = getCurrentRuntimeIndex();
	}
	return registry.getRuntime(runtimeIndex);
};

/**
 * Registers the current runtime in the shared runtimes resource registry
 */
const registerCurrentRuntime = () => {
	if (currentRuntimeIndex === undefined) {
		currentRuntimeIndex = registry.registerRuntime(VersionInfo);
	}
};

/**
 * Returns the index of the current runtime's object in the shared runtimes resource registry
 * @returns {*}
 */
const getCurrentRuntimeIndex = () => {
	if (currentRuntimeIndex === undefined) {
		registerCurrentRuntime();
	}

	return currentRuntimeIndex;
};

/**
 * Compares the current runtime's version with the version of another runtime on the same page (in the shared runtimes resource registry)
 * @param otherRuntimeIndex The index in the registry of the runtime to be compared with
 * @returns {number} Positive number if the current runtime's version is newer, 0 if equal, negative number if the current runtime's version is older
 */
const compareCurrentRuntimeWith = otherRuntimeIndex => {
	// Always consider the current runtime newer than a runtime with "undefined" index
	if (otherRuntimeIndex === undefined) {
		return 1;
	}

	const currentRuntime = getRuntime();
	const otherRuntime = getRuntime(otherRuntimeIndex);
	return currentRuntime.compareTo(otherRuntime);
};

/**
 * Returns an array with all runtimes
 * @returns {*}
 */
const getAllRuntimes = () => registry.getAllRuntimes();

/**
 * Set an alias for the the current app/library/microfrontend which will appear in debug messages and console warnings
 * @param alias
 */
const setRuntimeAlias = alias => {
	const currentRuntime = getRuntime();
	currentRuntime.alias = alias;
};

export {
	getRuntime,
	getCurrentRuntimeIndex,
	registerCurrentRuntime,
	compareCurrentRuntimeWith,
	getAllRuntimes,
	setRuntimeAlias,
};
