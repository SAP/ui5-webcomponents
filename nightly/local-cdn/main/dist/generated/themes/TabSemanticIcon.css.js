import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TabSemanticIcon.css.ts", content: `.ui5-tab-semantic-icon{display:var(--_ui5-v2-3-1-rc-0_tc_headerItemSemanticIcon_display);height:var(--_ui5-v2-3-1-rc-0_tc_headerItemSemanticIcon_size);width:var(--_ui5-v2-3-1-rc-0_tc_headerItemSemanticIcon_size);margin-inline-end:.5rem}.ui5-tab-semantic-icon--positive{color:var(--sapPositiveElementColor)}.ui5-tab-semantic-icon--negative{color:var(--sapNegativeElementColor)}.ui5-tab-semantic-icon--critical{color:var(--sapCriticalElementColor)}
` };
export default styleData;
//# sourceMappingURL=TabSemanticIcon.css.js.map