// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";

import "./bundle.esm.js";

import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
const configuration = {
	getTheme,
	setTheme,
	setNoConflict,
	getCompactSize,
	getRTL,
};
export {
	configuration,
};
