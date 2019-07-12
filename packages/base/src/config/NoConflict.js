import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

let noConflict = getConfiguredNoConflict();

const getNoConflict = () => {
	return noConflict;
};

const setNoConflict = noConflictData => {
	noConflict = noConflictData;
};

export {
	getNoConflict,
	setNoConflict,
};
