import { getCompactSize as getConfiguredCompactSize } from "../InitialConfiguration.js";

const compactSize = getConfiguredCompactSize();

const getCompactSize = () => {
	return compactSize;
};

export { getCompactSize }; // eslint-disable-line
