import { _getCompactSize } from "../Configuration.js";

let compactSize = _getCompactSize();

const getCompactSize = () => {
	return compactSize;
};

export {
	getCompactSize,
};
