import { getCompactSize as getConfiguredCompactSize } from "../InitialConfiguration.js";
import { _applyContentDensity } from "../ContentDensity.js";

let compactSize = getConfiguredCompactSize();

const getCompactSize = () => {
	return compactSize;
};

const setCompactSize = newCompactSize => {
	if (compactSize === newCompactSize) {
		return;
	}

	compactSize = newCompactSize;

	_applyContentDensity(compactSize ? "compact" : "cozy");
};

export {
	getCompactSize,
	setCompactSize,
};
