// IE11 only - runtime polyfills for ES5 environments
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-promise";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-other-polyfills";
import "regenerator-runtime/runtime";

// Plus all polyfills neede for edge are also needed for IE11
import "./Edge";
