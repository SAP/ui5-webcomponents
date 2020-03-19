// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11Full.js";

import "./bundle.esm.js";

import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
import { getRegisteredNames as getIconNames } from  "@ui5/webcomponents-base/dist/SVGIconRegistry.js"
const configuration = {
	getAnimationMode,
	getTheme,
	setTheme,
	setNoConflict,
	getRTL,
	getFirstDayOfWeek,
};
export {
	configuration,
	getIconNames,
};
