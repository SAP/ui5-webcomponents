import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{height:var(--_ui5-v2-10-0-rc-1_group_header_list_item_height);background:var(--ui5-v2-10-0-rc-1-group-header-listitem-background-color);color:var(--sapList_TableGroupHeaderTextColor)}:host([has-border]){border-bottom:var(--sapList_BorderWidth) solid var(--sapList_GroupHeaderBorderColor)}:host([actionable]:not([disabled])){cursor:default}.ui5-li-root.ui5-ghli-root{padding-top:.5rem;color:currentColor;font-size:var(--sapFontHeader6Size);font-weight:400;line-height:2rem;margin:0}.ui5-ghli-title{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:700;font-family:var(--sapFontHeaderFamily)}.ui5-li-content{width:100%}
`;
//# sourceMappingURL=ListItemGroupHeader.css.js.map