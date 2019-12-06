// ESM bundle targets Edge + browsers with native support
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";

// used in test pages
import RenderScheduler from "@ui5/webcomponents-base/dist/RenderScheduler.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";

/* enable additional themes */
import "./dist/json-imports/Themes.js";

/* import i18n texts */
import "./dist/json-imports/i18n.js";

/* Import your web components here from the dist/ directory */
import "./dist/INIT_PACKAGE_VAR_CLASS_NAME.js";

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
};
