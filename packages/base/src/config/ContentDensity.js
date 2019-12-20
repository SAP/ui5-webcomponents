import { getContentDensity as getConfiguredContentDensity } from "../InitialConfiguration.js";

const contentDensity = getConfiguredContentDensity();

const getContentDensity = () => {
	return contentDensity;
};

export { getContentDensity }; // eslint-disable-line
