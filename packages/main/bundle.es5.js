// runtime polyfills for ES5 environments
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-promise";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-other-polyfills";
import "regenerator-runtime/runtime";

import Core from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/Core";
import "./bundle.esm";

export { Core }; 