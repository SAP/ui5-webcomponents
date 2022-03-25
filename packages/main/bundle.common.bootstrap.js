import { setRuntimeAlias } from "@ui5/webcomponents-base/dist/Runtimes.js";
import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";

setRuntimeAlias("UI5 Web Components Playground");

setUseLinks(false); // !document.adoptedStyleSheets
setPackageCSSRoot("@ui5/webcomponents-base", "/resources/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "/resources/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "/resources/css/main/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "/css/");

// Set custom resource sharing policies
import { setSharedResourcePolicy } from "@ui5/webcomponents-base/dist/SharedResourcePolicy.js";
import SharedResourceReusePolicy from "@ui5/webcomponents-base/dist/types/SharedResourceReusePolicy.js";
import SharedResourceReuseType from "@ui5/webcomponents-base/dist/types/SharedResourceType.js";
setSharedResourcePolicy(SharedResourceReuseType.ThemeProperties, SharedResourceReusePolicy.OnlyNewer); // This is the default, but having it here makes it easier to change and test
