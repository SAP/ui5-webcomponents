import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

const twoWayDataBindingEvents = [
	"value-changed",
];

const isTwoWayDataBindingEvent = eventName => {
	return twoWayDataBindingEvents.includes(eventName);
};

let noConflict = getConfiguredNoConflict();

const getNoConflict = eventName => {
	return isTwoWayDataBindingEvent(eventName) ? false : noConflict;
};

const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
	isTwoWayDataBindingEvent,
};
