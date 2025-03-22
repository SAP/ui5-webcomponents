import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
export default `[ui5-li-group-header]::part(native-li){height:100%;padding:.5625rem .5rem}[ui5-li-group-header]{height:2rem}[ui5-li-group-header]::part(native-li):focus:after{inset:0!important;border-radius:8px}
`;
//# sourceMappingURL=SearchItemGroup.css.js.map