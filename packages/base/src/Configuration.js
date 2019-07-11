import { getTheme, setTheme } from "./config/Theme.js";
import { getNoConflict, setNoConflict } from "./config/NoConflict.js";
import { getCompactSize } from "./config/CompactSize.js";
import { getRTL } from "./config/RTL.js";
import { getLanguage, getSupportedLanguages } from "./config/Language.js";
import { getCalendarType } from "./config/CalendarType.js";

const getOriginInfo = () => {}; // needed for the shim

export {
	getTheme,
	setTheme,
	getNoConflict,
	setNoConflict,
	getCompactSize,
	getRTL,
	getLanguage,
	getSupportedLanguages,
	getCalendarType,
	getOriginInfo,
};
