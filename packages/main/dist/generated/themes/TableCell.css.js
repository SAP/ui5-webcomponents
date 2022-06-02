import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents",fileName:"themes/TableCell.css",content:":host{display:table-cell;font-family:\"72override\",var(--sapFontFamily);font-size:.875rem;height:100%;box-sizing:border-box;overflow:hidden;color:var(--sapContent_LabelColor);word-break:break-word;vertical-align:middle}td{display:contents}:host([popined]){padding-left:0;padding-top:.25rem}::slotted([ui5-label]){color:inherit}"}