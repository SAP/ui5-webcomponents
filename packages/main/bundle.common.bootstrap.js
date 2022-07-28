import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";
import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";
import { setThemingRoot } from "@ui5/webcomponents-base/dist/Theming.js";

setRuntimeAlias("UI5 Web Components Playground");

setUseLinks(false); // !document.adoptedStyleSheets
setPackageCSSRoot("@ui5/webcomponents-base", "/resources/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "/resources/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "/resources/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "/css/");

setThemingRoot(".myMicroFrontend");
