import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/BreadcrumbsPopover.css.ts", content: `.ui5-breadcrumbs-popover::part(content){padding:0}.ui5-breadcrumbs-popover-footer{display:flex;justify-content:flex-end;width:100%;padding-right:.5rem;align-items:center}
` };
export default styleData;
//# sourceMappingURL=BreadcrumbsPopover.css.js.map