import "./dist/features/calendar/Buddhist.js";
import "./dist/features/calendar/Islamic.js";
import "./dist/features/calendar/Japanese.js";
import "./dist/features/calendar/Persian.js";

// ESM bundle targets Edge + browsers with native support
import "./dist/features/browsersupport/Edge.js";

// Test components
import "./dist/test-resources/elements/Generic.js";
import "./dist/test-resources/elements/NoShadowDOM.js";
import "./dist/test-resources/elements/Parent.js";
import "./dist/test-resources/elements/Child.js";
import "./dist/test-resources/elements/DensityAware.js";

// used in test pages
import RenderScheduler from "./dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "./dist/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getCompactSize, setCompactSize } from "./dist/config/CompactSize.js";
import { getRTL } from "./dist/config/RTL.js";
import { getFirstDayOfWeek } from "./dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "./dist/SVGIconRegistry.js"
window["sap-ui-webcomponents-bundle"] = {
	configuration : {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCompactSize,
		setCompactSize,
		getCalendarType,
		getRTL,
		getFirstDayOfWeek,
	},
	getIconNames,
};
