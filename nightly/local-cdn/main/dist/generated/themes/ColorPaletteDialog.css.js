import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/ColorPaletteDialog.css.ts", content: `.ui5-cp-dialog-content{display:flex;justify-content:center;align-items:center;margin:1rem 0}.ui5-cp-dialog-footer{width:100%;display:flex;justify-content:flex-end;margin:.1875rem 1rem}.ui5-cp-dialog-footer [ui5-button]:first-child{margin-right:1rem}
` };
export default styleData;
//# sourceMappingURL=ColorPaletteDialog.css.js.map