import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/ResponsivePopover.css.ts", content: `:host{--_ui5-v2-3-1-rc-0_input_width: 100%;min-width:6.25rem;min-height:2rem}:host([on-phone]){display:contents}.ui5-responsive-popover-header{height:var(--_ui5-v2-3-1-rc-0-responsive_popover_header_height);display:flex;justify-content:var(--_ui5-v2-3-1-rc-0_popup_header_prop_header_text_alignment);align-items:center;width:100%}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v2-3-1-rc-0_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}
` };
export default styleData;
//# sourceMappingURL=ResponsivePopover.css.js.map