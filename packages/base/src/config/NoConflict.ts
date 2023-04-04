import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

type NoConflictData = boolean | { events: Array<string>};

let noConflict: NoConflictData;

const shouldFireOriginalEvent = (eventName: string) => {
	return excludeList.includes(eventName);
};

const shouldNotFireOriginalEvent = (eventName: string) => {
	const nc = getNoConflict();
	// return !(nc.events && nc.events.includes && nc.events.includes(eventName));
	return !(typeof nc !== "boolean" && nc.events && nc.events.includes && nc.events.includes(eventName));
};

/**
 * Returns if the "noConflict" configuration is set.
 * @public
 * @returns { NoConflictData }
 */
const getNoConflict = (): NoConflictData => {
	if (noConflict === undefined) {
		noConflict = getConfiguredNoConflict();
	}

	return noConflict;
};

/**
 * Sets the "noConflict" mode.
 * - When "false" (default value), all custom events are fired with and without the "ui5-" prefix.
 * - When "true", all custom events are fired with the "ui5-" prefix only.
 * - When an object is supplied, just the specified events will be fired with the "ui5-" prefix.
 * @public
 * @param { NoConflictData } noConflictData
 */
const setNoConflict = (noConflictData: NoConflictData) => {
	noConflict = noConflictData;
};

const skipOriginalEvent = (eventName: string) => {
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

export {
	getNoConflict,
	setNoConflict,
	skipOriginalEvent,
};
