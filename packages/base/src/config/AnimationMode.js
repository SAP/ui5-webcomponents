import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

let animationMode;

/**
 * Getter for the currently active animation mode
 * @return {"full"|"basic"|"minimal"|"none"}
 */
const getAnimationMode = () => {
	if (animationMode === undefined) {
		animationMode = getConfiguredAnimationMode();
	}

	return animationMode;
};

/**
 * Sets the animation mode
 * @param {"full"|"basic"|"minimal"|"none"} newAnimationMode
 */
const setAnimationMode = newAnimationMode => {
	if (Object.values(AnimationMode).includes(newAnimationMode)) {
		animationMode = newAnimationMode;
	}
};

export {
	getAnimationMode,
	setAnimationMode,
};
