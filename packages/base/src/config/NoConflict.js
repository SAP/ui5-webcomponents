import { getNoConflict as getConfiguredNoConflict } from "../InitialConfiguration.js";

let noConflict = getConfiguredNoConflict();

const getNoConflict = () => {
	return noConflict;
};

const setNoConflict = value => {
	noConflict = value;
};

export {
	getNoConflict,
	setNoConflict,
};
