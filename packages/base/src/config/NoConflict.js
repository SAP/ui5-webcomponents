import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

// Fire these events even with noConflict: true
const excludeList = [
	"value-changed",
];

const shouldFireOriginalEvent = eventName => {
	return excludeList.includes(eventName);
};

let noConflict = getConfiguredNoConflict();

const shouldNotFireOriginalEvent = eventName => {
	return !(noConflict.events && noConflict.events.includes && noConflict.events.includes(eventName));
};

const getNoConflict = () => {
	return noConflict;
};

const skipOriginalEvent = eventName => {
	// Always fire these events
	if (shouldFireOriginalEvent(eventName)) {
		return false;
	}

	// Read from the configuration
	if (noConflict === true) {
		return true;
	}

	return !shouldNotFireOriginalEvent(eventName);
};

const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
	skipOriginalEvent,
};
