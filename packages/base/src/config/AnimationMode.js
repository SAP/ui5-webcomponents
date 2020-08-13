// SPDX-FileCopyrightText: SAP SE <https://sap.com>
//
// SPDX-License-Identifier: Apache-2.0

import { getAnimationMode as getConfiguredAnimationMode } from "../InitialConfiguration.js";
import AnimationMode from "../types/AnimationMode.js";

let animationMode;

const getAnimationMode = () => {
	if (animationMode === undefined) {
		animationMode = getConfiguredAnimationMode();
	}

	return animationMode;
};

const setAnimationMode = newAnimationMode => {
	if (Object.values(AnimationMode).includes(newAnimationMode)) {
		animationMode = newAnimationMode;
	}
};

export {
	getAnimationMode,
	setAnimationMode,
};
