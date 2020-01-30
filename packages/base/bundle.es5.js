// ES5 bundle targets IE11 only
import "./dist/features/browsersupport/IE11.js";

import "./bundle.esm.js";

import { getAnimationMode } from "./dist/config/AnimationMode.js";
import { getLanguage } from "./dist/config/Language.js";
import { getCalendarType } from "./dist/config/CalendarType.js";
import { getTheme, setTheme } from "./dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "./dist/config/NoConflict.js";
import { getRTL } from "./dist/config/RTL.js";
import { getFirstDayOfWeek } from "./dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "./dist/SVGIconRegistry.js"
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
export {
	configuration,
	getIconNames,
};
