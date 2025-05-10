import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
export default `:host{width:calc(100% - .5rem);border-bottom:1px solid var(--sapGroup_TitleBorderColor);box-sizing:border-box;display:inline-block;margin-left:.25rem;margin-right:.25rem}.ui5-search-message-area-wrapper{padding:.5rem;box-sizing:border-box}.ui5-search-message-area-description{margin-top:.25rem;font-size:.75rem;color:var(--sapContent_LabelColor)}
`;
//# sourceMappingURL=SearchMessageArea.css.js.map