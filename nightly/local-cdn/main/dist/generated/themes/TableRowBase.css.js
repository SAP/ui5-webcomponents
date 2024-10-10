import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TableRowBase.css.ts", content: `:host{display:grid;grid-template-columns:subgrid;grid-column:1 / -1;min-height:var(--_ui5-v2-3-1-rc-0_list_item_base_height);box-sizing:border-box;border-bottom:var(--sapList_BorderWidth) solid var(--sapList_BorderColor)}:host([tabindex]:focus){outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:calc(-1 * var(--sapContent_FocusWidth))}#selection-cell{padding:0;left:0}:dir(rtl)#selection-cell{right:0}#selection-component{vertical-align:middle}:host([tabindex]:focus) #selection-cell{outline:none;box-shadow:var(--_ui5-v2-3-1-rc-0_table_shadow_border_top),var(--_ui5-v2-3-1-rc-0_table_shadow_border_left),var(--_ui5-v2-3-1-rc-0_table_shadow_border_bottom)}
` };
export default styleData;
//# sourceMappingURL=TableRowBase.css.js.map