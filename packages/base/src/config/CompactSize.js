import { _getCompactSize } from "../InitialConfiguration.js";

const compactSize = _getCompactSize();

const getCompactSize = () => {
	return compactSize;
};

export { getCompactSize }; // eslint-disable-line
