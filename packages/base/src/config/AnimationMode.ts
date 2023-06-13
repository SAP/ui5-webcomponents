import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

let curAnimationMode: `${AnimationMode}`;

/**
 * Returns the animation mode - "full", "basic", "minimal" or "none".
 * @public
 * @returns { AnimationMode }
 */
const getAnimationMode = (): `${AnimationMode}` => {
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
const setAnimationMode = (animationMode: `${AnimationMode}`) => {
	if (animationMode in AnimationMode) {
		curAnimationMode = animationMode;
	}
};

export {
	getAnimationMode,
	setAnimationMode,
};
