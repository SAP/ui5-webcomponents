import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/ListItemIcon.css.ts", content: `.ui5-li-icon{color:var(--sapList_TextColor);min-width:var(--_ui5-v2-0-0-rc-6_list_item_icon_size);min-height:var(--_ui5-v2-0-0-rc-6_list_item_icon_size);padding-inline-end:var(--_ui5-v2-0-0-rc-6_list_item_icon_padding-inline-end)}
` };
export default styleData;
//# sourceMappingURL=ListItemIcon.css.js.map