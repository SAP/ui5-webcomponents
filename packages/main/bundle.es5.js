// ES5 bundle targets IE11 only
import "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/browsersupport/IE11";

import configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import * as Theming from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Theming";
import "./bundle.esm";

export {
	configuration,
	Theming,
};
