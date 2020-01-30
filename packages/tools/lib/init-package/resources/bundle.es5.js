// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";

import "./bundle.esm.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";

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
