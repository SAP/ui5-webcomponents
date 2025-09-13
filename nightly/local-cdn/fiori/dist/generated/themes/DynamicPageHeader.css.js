import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s" + "-" + "f" + "i" + "o" + "r" + "i", "sap_horizon", async () => defaultTheme);
export default `:host{background-color:var(--_ui5-v2-15-0-rc-0_dynamic_page_header_background_color);display:block;box-shadow:var(--_ui5-v2-15-0-rc-0_dynamic_page_header-box-shadow)}.ui5-dynamic-page-header-root{background:inherit}
`;
//# sourceMappingURL=DynamicPageHeader.css.js.map