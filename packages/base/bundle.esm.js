// ESM bundle targets Edge + browsers with native support
import "./dist/features/browsersupport/Edge.js";

import "./dist/UI5Element.js";

// used in test pages
import RenderScheduler from "./dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "./dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { setNoConflict } from "./dist/config/NoConflict.js";
import { getCompactSize, setCompactSize } from "./dist/config/CompactSize.js";
import { getRTL } from "./dist/config/RTL.js";
import { getRegisteredNames as getIconNames } from  "./dist/SVGIconRegistry.js"
window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getAnimationMode,
		getTheme,
		setTheme,
		setNoConflict,
		getCompactSize,
		setCompactSize,
		getRTL,
	},
	getIconNames,
};
