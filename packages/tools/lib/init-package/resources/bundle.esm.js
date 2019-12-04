// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";

// Note: keep in sync with rollup.config value for IIFE
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getRegisteredNames as getIconNames } from "@ui5/webcomponents-base/dist/SVGIconRegistry.js";

// asset helpers (needs correct json as url in rollup.config.js)
import "./dist/json-imports/Themes.js";
import "./dist/json-imports/i18n.js";

// IMPORT YOUR UI5 WEB COMPONENTS HERE

window.RenderScheduler = RenderScheduler;
window["sap-ui-webcomponents-bundle"] = {
	configuration: {
		getAnimationMode,
		getTheme,
		setTheme,
		setNoConflict,
		getCompactSize,
		getRTL,
	},
	getIconNames,
};
