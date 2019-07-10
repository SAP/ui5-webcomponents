// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";

import * as configuration from "@ui5/webcomponents-base/dist/Configuration.js";
import * as config from "@ui5/webcomponents-base/dist/config/all.js";
import * as Theme from "@ui5/webcomponents-base/dist/config/Theme.js";
import "./bundle.esm.js";

export {
	configuration,
	config,
	Theme,
};
