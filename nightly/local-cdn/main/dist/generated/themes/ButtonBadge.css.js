import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `[ui5-tag]::part(root){border:.0625rem solid var(--sapContent_BadgeBorderColor);background-color:var(--sapContent_BadgeBackground);color:var(--sapContent_BadgeTextColor);height:1rem;border-radius:.5rem}:host([design="AttentionDot"]) [ui5-tag]::part(root){min-width:var(--_ui5-v2-11-0-rc-2-button-badge-diameter);min-height:var(--_ui5-v2-11-0-rc-2-button-badge-diameter);height:var(--_ui5-v2-11-0-rc-2-button-badge-diameter);width:var(--_ui5-v2-11-0-rc-2-button-badge-diameter);border-radius:100%}
`;
//# sourceMappingURL=ButtonBadge.css.js.map