// String
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-string-methods";

// Object
import "../thirdparty/Object.entries";

// Array
import "../thirdparty/Array.prototype.fill";
import "../thirdparty/Array.prototype.includes";

// Number
import "../thirdparty/Number.isInteger";
import "../thirdparty/Number.isNaN";
import "../thirdparty/Number.parseInt";

// Element
import "../thirdparty/Element.prototype.matches";
import "../thirdparty/Element.prototype.closest";

// WeakSet
import "../thirdparty/WeakSet";

// fetch
import "../thirdparty/fetch";

// async - await
import "regenerator-runtime/runtime";


import { cssVars, resetCssVars } from "../thirdparty/css-vars-ponyfill";

// Plus all polyfills needed for Edge are also needed for IE11
import "./Edge";

window.CSSVarsPonyfill = {
	cssVars,
	resetCssVars,
};
