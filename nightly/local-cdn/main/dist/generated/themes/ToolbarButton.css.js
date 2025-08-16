import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `:host([disabled]:active){pointer-events:none}.ui5-tb-popover-item.ui5-tb-button::part(button){justify-content:start}.ui5-tb-popover-item.ui5-tb-button[icon-only]::part(button){padding:0 var(--_ui5-v2-14-0-rc-1_button_base_padding)}
`;
//# sourceMappingURL=ToolbarButton.css.js.map