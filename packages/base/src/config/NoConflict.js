import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

const shouldFireOriginalEvent = eventName => {
	return excludeList.includes(eventName);
};

/* @type {Boolean | { events: Array<string> }} */
/** @typedef { Boolean | { events: Array<string> } } NoConflictType */
/** @type {NoConflictType} */
let noConflict;

const shouldNotFireOriginalEvent = eventName => {
	const nc = getNoConflict();
	// return !(nc.events && nc.events.includes && nc.events.includes(eventName));
	return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};

/**
 *
 * @returns { NoConflictType } whether the noConflict configuration is set
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
 *
 * @param {NoConflictType} noConflictData
 */
const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
	skipOriginalEvent,
};
