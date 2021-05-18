// used in test pages
import { renderFinished } from "@ui5/webcomponents-base/Render.js";

import { getAnimationMode } from "@ui5/webcomponents-base/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/config/CalendarType.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/config/FormatSettings.js";

// Enable additional themes and i18n texts
import "./dist/Assets.js";

// Import your web components here from the dist/ directory
import "./dist/INIT_PACKAGE_VAR_CLASS_NAME.js";

window["sap-ui-webcomponents-bundle"] = {
	renderFinished,
	configuration: {
		getAnimationMode,
		getLanguage,
		getTheme,
		setTheme,
		getNoConflict,
		setNoConflict,
		getCalendarType,
		getRTL,
		getFirstDayOfWeek,
	},
};
