import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TableHeaderRow.css.ts", content: `:host{background:var(--sapList_HeaderBackground);grid-template-rows:var(--_ui5-v2-0-0-rc-6_list_item_base_height);border-bottom:var(--sapList_BorderWidth) solid var(--sapList_HeaderBorderColor)}:host([hidden]){display:none}:host([sticky]){position:sticky;top:var(--ui5-v2-0-0-rc-6_grid_sticky_top, 0);z-index:1}#popin-cell{padding:0;width:0}
` };
export default styleData;
//# sourceMappingURL=TableHeaderRow.css.js.map