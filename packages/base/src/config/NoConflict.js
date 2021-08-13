import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

const shouldFireOriginalEvent = eventName => {
	return excludeList.includes(eventName);
};

let noConflict;

const shouldNotFireOriginalEvent = eventName => {
	const nc = getNoConflict();
	return !(nc.events && nc.events.includes && nc.events.includes(eventName));
};

/**
 * Returns true when events are fired in the `non-conflict` mode.
 * @return {boolean}
 */
const getNoConflict = () => {
	if (noConflict === undefined) {
		noConflict = getConfiguredNoConflict();
	}

	return noConflict;
};

const skipOriginalEvent = eventName => {
	const nc = getNoConflict();

	// Always fire these events
	if (shouldFireOriginalEvent(eventName)) {
		return false;
	}

	// Read from the configuration
	if (nc === true) {
		return true;
	}

	return !shouldNotFireOriginalEvent(eventName);
};

/**
 * Sets whether events should be fired in a non-conflict mode
 * @param {boolean} noConflictData
 */
const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
	skipOriginalEvent,
};
