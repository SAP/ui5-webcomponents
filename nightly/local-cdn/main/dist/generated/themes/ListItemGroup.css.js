import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/ListItemGroup.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{height:var(--_ui5-v2-0-0-rc-6_group_header_list_item_height);background:var(--ui5-v2-0-0-rc-6-group-header-listitem-background-color);color:var(--sapList_TableGroupHeaderTextColor)}.ui5-group-li-root{padding:0;margin:0;list-style-type:none}
` };
export default styleData;
//# sourceMappingURL=ListItemGroup.css.js.map