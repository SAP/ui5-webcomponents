// @ts-check2
import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

/**
 * @type {import("../types/AnimationMode.js").default}
 */
let curAnimationMode;

/**
 * Get the animation mode
 * @returns {import("../types/AnimationMode.js").default} the current animation mode
 */
const getAnimationMode = () => {
	if (curAnimationMode === undefined) {
		curAnimationMode = getConfiguredAnimationMode();
	}

	return curAnimationMode;
};

/**
 * Set the animation mode
 * @param {import("../types/AnimationMode.js").default} animationMode
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
