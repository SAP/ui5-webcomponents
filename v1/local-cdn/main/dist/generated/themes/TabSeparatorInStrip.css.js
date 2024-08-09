import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TabSeparatorInStrip.css.ts", content: `.ui5-tc__separator{position:relative;width:.5625rem}.ui5-tc__separator:before{content:" ";position:absolute;width:.0625rem;left:.25rem;top:.5rem;bottom:.5rem;background:var(--sapGroup_TitleBorderColor)}
` };
export default styleData;
//# sourceMappingURL=TabSeparatorInStrip.css.js.map