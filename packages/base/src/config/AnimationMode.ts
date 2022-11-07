// @ts-check2
import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

let curAnimationMode: AnimationMode;

/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @returns { AnimationMode }
 */
const getAnimationMode = () => {
	if (curAnimationMode === undefined) {
		curAnimationMode = getConfiguredAnimationMode();
	}

	return curAnimationMode;
};

/**
 * Sets the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @param { AnimationMode } animationMode
 */
const setAnimationMode = (animationMode: AnimationMode) => {
	if (Object.values(AnimationMode).includes(animationMode)) {
		curAnimationMode = animationMode;
	}
};

export {
	getAnimationMode,
	setAnimationMode,
};
