import { getWCNoConflict } from "../Configuration.js";

let noConflict = getWCNoConflict();

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
