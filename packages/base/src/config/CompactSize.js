import { _getCompactSize } from "../Configuration.js";

const compactSize = _getCompactSize();

const getCompactSize = () => {
	return compactSize;
};

// eslint-ignore-next-line
export {
	getCompactSize,
};
