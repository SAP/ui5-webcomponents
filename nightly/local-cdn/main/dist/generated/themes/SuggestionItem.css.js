import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/SuggestionItem.css.ts", content: `:host([ui5-suggestion-item]){height:auto;min-height:var(--_ui5-v2-0-0-rc-6_list_item_base_height)}:host([ui5-suggestion-item]) .ui5-li-root{min-height:var(--_ui5-v2-0-0-rc-6_list_item_base_height)}:host([ui5-suggestion-item]) .ui5-li-content{padding-bottom:.875rem;padding-top:.875rem;box-sizing:border-box}
` };
export default styleData;
//# sourceMappingURL=SuggestionItem.css.js.map