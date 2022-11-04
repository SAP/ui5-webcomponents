// @ts-check2
import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

let curAnimationMode;

/**
 * Get the animation mode
 */
const getAnimationMode = () => {
	if (curAnimationMode === undefined) {
		curAnimationMode = getConfiguredAnimationMode();
	}

	return curAnimationMode;
};

/**
 * Set the animation mode
 */
const setAnimationMode = animationMode => {
	if (Object.values(AnimationMode).includes(animationMode)) {
		curAnimationMode = animationMode;
	}
};

export {
	getAnimationMode,
	setAnimationMode,
};
