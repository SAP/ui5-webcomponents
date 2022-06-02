import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents",fileName:"themes/TableColumn.css",content:":host{display:contents}th{background:var(--sapList_HeaderBackground);width:inherit;font-weight:var(--ui5_table_header_row_font_weight);font-size:var(--sapFontMediumSize);padding:.5rem;box-sizing:border-box;text-align:start;vertical-align:middle}:host([first]) th{padding-left:1rem}th ::slotted([ui5-label]){font-weight:var(--ui5_table_header_row_font_weight);font-size:var(--sapFontMediumSize)}"}