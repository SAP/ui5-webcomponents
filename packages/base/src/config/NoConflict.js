import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

const twoWayDataBindingEvents = [
	'value-changed'
];

let noConflict = getConfiguredNoConflict();

const getNoConflict = eventName => {
	return twoWayDataBindingEvents.includes(eventName) ? false : noConflict;
};

const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
};
