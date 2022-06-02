import "../globalThis.js";

// CSS Custom Properties
import cssVars from "css-vars-ponyfill/dist/css-vars-ponyfill.esm.js";

// lit-html
import "lit-html/polyfill-support.js";

// String
import "../thirdparty/es6-string-methods.js";

// Object
import "../thirdparty/Object.entries.js";

// Array
import "../thirdparty/Array.prototype.fill.js";
import "../thirdparty/Array.prototype.find.js";
import "../thirdparty/Array.prototype.findIndex.js";
import "../thirdparty/Array.prototype.includes.js";

// Map
import "../thirdparty/Map.prototype.keys.js";

// Number
import "../thirdparty/Number.isInteger.js";
import "../thirdparty/Number.isNaN.js";
import "../thirdparty/Number.parseFloat.js";
import "../thirdparty/Number.parseInt.js";

// Element
import "../thirdparty/Element.prototype.matches.js";
import "../thirdparty/Element.prototype.closest.js";

// WeakSet
import "../thirdparty/WeakSet.js";

// async - await
import "regenerator-runtime/runtime.js";

// URLSearchParams
import "url-search-params-polyfill/index.js";

// "pseudo mutation observer" fix for nodeValue
import "../patchNodeValue.js";

// Hook with the framework
import "../integrate.js";

window.CSSVarsPonyfill = {
	cssVars,
};
