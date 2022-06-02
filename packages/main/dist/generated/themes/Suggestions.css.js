import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";

import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_fiori_3/parameters-bundle.css.js";
import defaultTheme from "./sap_fiori_3/parameters-bundle.css.js";

registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_fiori_3", () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => defaultTheme);
export default {packageName:"@ui5/webcomponents",fileName:"themes/Suggestions.css",content:".ui5-suggestions-popover{box-shadow:var(--sapContent_Shadow1)}.ui5-suggestions-popover::part(content),.ui5-suggestions-popover::part(header){padding:0}.ui5-suggestions-popover::part(footer){padding:0 1rem}.ui5-suggestions-popover [ui5-li-suggestion-item],.ui5-suggestions-popover [ui5-li]{height:var(--_ui5_list_item_dropdown_base_height)}"}