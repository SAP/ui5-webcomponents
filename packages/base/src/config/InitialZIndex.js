import { getInitialZIndex as getConfiguredInitialZIndex } from "../InitialConfiguration.js";

const getInitialZIndex = () => {
	return getConfiguredInitialZIndex();
};

export { getInitialZIndex }; // eslint-disable-line
