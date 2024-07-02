import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TimeSelectionInputs.css.ts", content: `.ui5-time-selection-numeric-input{width:2.875rem;text-align:center}.ui5-time-selection-inputs{min-width:12.5rem;display:flex;justify-content:center;align-items:center}span[separator]{display:inline-block;min-width:.5rem;padding:0 .125rem;text-align:center;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapTextColor)}.ui5-hidden-text{display:none}
` };
export default styleData;
//# sourceMappingURL=TimeSelectionInputs.css.js.map