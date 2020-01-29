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
	const noConflict = getNoConflict();
	return !(noConflict.events && noConflict.events.includes && noConflict.events.includes(eventName));
};

const getNoConflict = () => {
	if (noConflict === undefined) {
		noConflict = getConfiguredNoConflict();
	}

	return noConflict;
};

const skipOriginalEvent = eventName => {
	const noConflict = getNoConflict();

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
