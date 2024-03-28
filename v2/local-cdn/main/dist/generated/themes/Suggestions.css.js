import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/Suggestions.css.ts", content: `.ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(header),.ui5-suggestions-popover::part(content){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.ui5-suggestions-popover [ui5-li]::part(icon),.ui5-suggestions-popover [ui5-li-suggestion-item]::part(icon){color:var(--sapList_TextColor)}.input-root-phone.native-input-wrapper{display:contents}.input-root-phone.native-input-wrapper:before{display:none}.native-input-wrapper .ui5-input-inner-phone{margin:0}
` };
export default styleData;
//# sourceMappingURL=Suggestions.css.js.map