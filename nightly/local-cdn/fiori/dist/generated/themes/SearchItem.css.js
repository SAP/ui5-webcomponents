import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
export default `:host([selected]){border:none}.ui5-search-item-content{width:100%;height:100%;display:flex;align-items:center;gap:1rem}.ui5-search-item-begin-content{display:flex;height:100%;align-items:center;gap:.75rem;width:100%;box-sizing:border-box;flex:1}.ui5-search-item-selected-delete{display:none}:host([selected]:hover),:host(:focus-within){.ui5-search-item-selected-delete{display:inline-block}}.ui5-search-item-heading{display:inline-block;font-size:var(--sapFontLargeSize);font-family:var(--sapFontFamily);font-weight:400;color:var(--sapList_TextColor);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-search-item-titles-container{overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;flex:1}.ui5-search-item-icon{padding:.375rem;width:1rem;height:1rem;box-sizing:content-box}
`;
//# sourceMappingURL=SearchItem.css.js.map