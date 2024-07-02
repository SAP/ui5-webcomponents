import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TableHeaderCell.css.ts", content: `:host{font-family:var(--sapFontSemiboldDuplexFamily);color:var(--sapList_HeaderTextColor)}:host(:empty){padding:0}
` };
export default styleData;
//# sourceMappingURL=TableHeaderCell.css.js.map