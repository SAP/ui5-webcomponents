import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `:host([_popin]){color:var(--sapContent_LabelColor);padding-inline-start:0;padding-inline-end:0;align-items:center}.popin-colon{padding-inline-end:.5rem}.popin-header{display:contents}
`;
//# sourceMappingURL=TableCell.css.js.map