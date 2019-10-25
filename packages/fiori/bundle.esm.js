import "@ui5/webcomponents-base/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-base/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-base/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-base/dist/features/calendar/Persian.js";

// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// asset helpers (needs correct json as url in rollup.config.js)
import "./dist/json-imports/Themes.js";
import "./dist/json-imports/i18n.js";
import "./dist/json-imports/LocaleData.js"

import ShellBar from "./dist/ShellBar.js";
import ShellBarItem from "./dist/ShellBarItem.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";
window.RenderScheduler = RenderScheduler;
import { isIE } from "@ui5/webcomponents-core/dist/sap/ui/Device.js";
window.isIE = isIE; // attached to the window object for testing purposes


// Note: keep in sync with rollup.config value for IIFE
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js"
window["sap-ui-webcomponents-fiori-bundle"] = {
	configuration : {
		getTheme,
		setTheme,
		setNoConflict,
		getCompactSize,
		getRTL,
		getIconNames
	}
};
