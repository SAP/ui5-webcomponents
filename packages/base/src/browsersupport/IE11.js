// String
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-string-methods.js";

// Object
import "../thirdparty/Object.entries.js";

// Array
import "../thirdparty/Array.prototype.fill.js";
import "../thirdparty/Array.prototype.includes.js";

// Number
import "../thirdparty/Number.isInteger.js";
import "../thirdparty/Number.isNaN.js";
import "../thirdparty/Number.parseInt.js";

// Element
import "../thirdparty/Element.prototype.matches.js";
import "../thirdparty/Element.prototype.closest.js";

// WeakSet
import "../thirdparty/WeakSet.js";

// fetch
import "../thirdparty/fetch.js";

// async - await
import "regenerator-runtime/runtime";

// CSS Custom Properties polyfill
import { cssVars, resetCssVars } from "../thirdparty/css-vars-ponyfill.js";

// Plus all polyfills needed for Edge are also needed for IE11
import "./Edge.js";

window.CSSVarsPonyfill = {
	cssVars,
	resetCssVars,
};
