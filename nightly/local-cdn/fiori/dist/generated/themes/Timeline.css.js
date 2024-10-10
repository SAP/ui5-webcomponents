import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/Timeline.css.ts", content: `:host(:not([hidden])){display:block}.ui5-timeline-root{padding:var(--_ui5-v2-3-1-rc-0_tl_padding);box-sizing:border-box;overflow:hidden}.ui5-timeline-list{list-style:none;margin:0;padding:0}:host([layout="Vertical"]) .ui5-timeline-list{display:flex;flex-direction:column}.ui5-timeline-list-item{margin-bottom:var(--_ui5-v2-3-1-rc-0_tl_li_margin_bottom)}.ui5-timeline-list-item:last-child{margin-bottom:0}:host([layout="Horizontal"]) .ui5-timeline-list{white-space:nowrap;list-style:none;margin:0;padding:0;display:flex}:host([layout="Horizontal"]) .ui5-timeline-list-item{display:inline-block;margin-inline-start:var(--_ui5-v2-3-1-rc-0_tl_li_margin_bottom)}:host([layout="Horizontal"]) .ui5-timeline-scroll-container{overflow:auto;width:calc(100% + var(--_ui5-v2-3-1-rc-0_timeline_scroll_container_offset))}
` };
export default styleData;
//# sourceMappingURL=Timeline.css.js.map