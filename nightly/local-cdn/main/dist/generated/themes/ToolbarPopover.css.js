import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `.ui5-overflow-popover::part(content){padding:var(--_ui5-v2-10-0-rc-1_toolbar_overflow_padding)}.ui5-overflow-list{display:flex;flex-direction:column;justify-content:center;align-items:center}.ui5-tb-popover-item{width:100%}.ui5-tb-popover-item:not(:last-child){margin-bottom:.25rem}.ui5-tb-separator-in-overflow{display:none;height:.0625rem;background:var(--sapToolbar_SeparatorColor);box-sizing:border-box}.ui5-tb-separator-in-overflow[visible]{display:block}
`;
//# sourceMappingURL=ToolbarPopover.css.js.map