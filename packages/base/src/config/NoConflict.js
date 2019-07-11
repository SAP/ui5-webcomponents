import { _getWCNoConflict } from "../InitialConfiguration.js";

let noConflict = _getWCNoConflict();

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
