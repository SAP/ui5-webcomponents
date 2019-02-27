// String
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-string-methods";

// Object
import "../thirdparty/Object.assign";
import "../thirdparty/Object.entries";

// Array
import "../thirdparty/Array.from";
import "../thirdparty/Array.prototype.fill";
import "../thirdparty/Array.prototype.includes";

// Number
import "../thirdparty/Number.isInteger";
import "../thirdparty/Number.isNaN";
import "../thirdparty/Number.parseInt";

// Symbol
import "../thirdparty/Symbol";

// Element
import "../thirdparty/Element.prototype.matches";
import "../thirdparty/Element.prototype.closest";

// Promise
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-promise";

// WeakSet
import "../thirdparty/WeakSet";

// fetch
import "../thirdparty/fetch";

// template
import "../thirdparty/template";

// Various event polyfills - preventDefault, window.Event, window.CustomEvent, window.MouseEvent
import "../thirdparty/events-polyfills";

// async - await
import "regenerator-runtime/runtime";

// Plus all polyfills needed for Edge are also needed for IE11
import "./Edge";
