import { _getCompactSize } from "../Configuration.js";

const compactSize = _getCompactSize();

const getCompactSize = () => {
	return compactSize;
};

export { getCompactSize }; // eslint-disable-line
