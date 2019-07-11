import { _getWCNoConflict } from "../Configuration.js";

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
