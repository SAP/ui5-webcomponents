import { setPackageCSSRoot, setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js";

setUseLinks(true);
setPackageCSSRoot("@ui5/webcomponents-base", "/resources/css/base/");
setPackageCSSRoot("@ui5/webcomponents-theming", "/resources/css/theming/");
setPackageCSSRoot("@ui5/webcomponents", "/css/");
setPackageCSSRoot("@ui5/webcomponents-fiori", "../../fiori/dist/css/");
