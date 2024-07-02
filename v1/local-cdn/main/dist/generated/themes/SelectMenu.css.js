import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/SelectMenu.css.ts", content: `.ui5-select-menu::part(content),.ui5-select-menu::part(header){padding:0}.ui5-select-menu [ui5-li-custom]{height:var(--_ui5-v1-24-0_list_item_dropdown_base_height)}.ui5-select-menu [ui5-li-custom]::part(native-li){padding:0}.ui5-select-menu [ui5-icon]{color:var(--sapList_TextColor)}
` };
export default styleData;
//# sourceMappingURL=SelectMenu.css.js.map