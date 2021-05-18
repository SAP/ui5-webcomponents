// ES5 bundle targets IE11 only
import "@ui5/webcomponents-ie11/dist/features/IE11.js";

import "./bundle.esm.js";

import { getAnimationMode } from "@ui5/webcomponents-base/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/config/CalendarType.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/config/FormatSettings.js";

const configuration = {
	getAnimationMode,
	getLanguage,
	getTheme,
	setTheme,
	getNoConflict,
	setNoConflict,
	getCalendarType,
	getRTL,
	getFirstDayOfWeek,
};
export default configuration;
