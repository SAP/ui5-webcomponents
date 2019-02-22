// runtime polyfills for ES5 environments
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-promise";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-other-polyfills";
import "regenerator-runtime/runtime";

import * as configuration from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Configuration";
import * as Theming from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Theming";
import "./bundle.esm";

export {
	configuration,
	Theming,
};
