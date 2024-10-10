import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/NavigationMenu.css.ts", content: `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}.ui5-navigation-menu .ui5-navigation-menu-main{padding:var(--_ui5-v2-3-1-rc-0_side_navigation_parent_popup_padding)}.ui5-menu-rp.ui5-navigation-menu{box-shadow:var(--_ui5-v2-3-1-rc-0_side_navigation_popup_box_shadow);min-width:10rem;background:var(--sapGroup_ContentBackground);border:none;border-radius:.75rem}.ui5-navigation-menu[sub-menu] ::slotted([ui5-navigation-menu-item]){font-weight:400}
` };
export default styleData;
//# sourceMappingURL=NavigationMenu.css.js.map