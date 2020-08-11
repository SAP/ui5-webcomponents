// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";

import "./bundle.scoped.esm.js";

import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js";
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
const configuration = {
	getAnimationMode,
	setAnimationMode,
	getTheme,
	setTheme,
	getLanguage,
	setLanguage,
	setNoConflict,
	getRTL,
	getFirstDayOfWeek,
};
export {
	configuration,
	getIconNames,
	applyDirection,
	ResizeHandler,
};
