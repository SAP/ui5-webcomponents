import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/DynamicPageHeader.css.ts", content: `:host{background-color:var(--_ui5-v2-0-0-rc-6_dynamic_page_header_background_color);display:block;box-shadow:var(--_ui5-v2-0-0-rc-6_dynamic_page_header-box-shadow)}.ui5-dynamic-page-header-root{background:inherit;padding-top:var(--_ui5-v2-0-0-rc-6_dynamic_page_header_padding_top);padding-bottom:var(--_ui5-v2-0-0-rc-6_dynamic_page_header_padding_bottom)}
` };
export default styleData;
//# sourceMappingURL=DynamicPageHeader.css.js.map