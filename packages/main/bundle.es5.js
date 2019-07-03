// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/src/features/browsersupport/IE11.js";

import * as configuration from "@ui5/webcomponents-base/src/Configuration.js";
import * as Theming from "@ui5/webcomponents-base/src/features/Theming.js";
import "./bundle.esm.js";

export {
	configuration,
	Theming,
};
