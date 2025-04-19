import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `:host{max-width:100%;font-size:var(--sapFontSize);font-family:var(--sapFontFamily);color:var(--sapTextColor);line-height:normal;cursor:text;overflow:hidden}:host([max-lines="1"]){display:inline-block;text-overflow:ellipsis;white-space:nowrap}:host(:not([max-lines="1"])){display:-webkit-box;-webkit-line-clamp:var(--_ui5-v2-10-0-rc-1_text_max_lines);line-clamp:var(--_ui5-v2-10-0-rc-1_text_max_lines);-webkit-box-orient:vertical;white-space:normal;word-wrap:break-word}.empty-indicator-aria-label{position:absolute!important;clip:rect(1px,1px,1px,1px);user-select:none;left:0;top:0;font-size:0}
`;
//# sourceMappingURL=Text.css.js.map