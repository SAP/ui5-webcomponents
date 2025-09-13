import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme);
export default `.ui5-li-icon{color:var(--sapList_TextColor);min-width:var(--_ui5-v2-15-0-rc-0_list_item_icon_size);min-height:var(--_ui5-v2-15-0-rc-0_list_item_icon_size);padding-inline-end:var(--_ui5-v2-15-0-rc-0_list_item_icon_padding-inline-end)}
`;
//# sourceMappingURL=ListItemIcon.css.js.map