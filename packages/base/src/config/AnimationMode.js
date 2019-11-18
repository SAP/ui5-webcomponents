import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";

const animationMode = getConfiguredAnimationMode();

const getAnimationMode = () => {
	return animationMode;
};

export { getAnimationMode }; // eslint-disable-line
