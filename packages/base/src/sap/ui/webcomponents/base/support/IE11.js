// String
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/String.prototype.padStart";

// Object
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Object.assign";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Object.entries";

// Array
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Array.prototype.fill";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Array.from";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Array.prototype.includes";

// Number
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Number.isInteger";

// Symbol
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Symbol";

// Element
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Element.prototype.matches";
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/Element.prototype.closest";

// Promise
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/es6-promise";

// WeakSet
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/WeakSet";

// fetch
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/fetch";

// template
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/template";

// Various event polyfills - preventDefault, window.Event, window.CustomEvent, window.MouseEvent
import "@ui5/webcomponents-core/dist/sap/ui/thirdparty/events-polyfills";

// async - await
import "regenerator-runtime/runtime";

// Plus all polyfills needed for Edge are also needed for IE11
import "./Edge";
