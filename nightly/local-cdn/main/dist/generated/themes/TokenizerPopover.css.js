import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TokenizerPopover.css.ts", content: `[ui5-responsive-popover]::part(header),[ui5-responsive-popover]::part(content){padding:0}[ui5-responsive-popover] .ui5-responsive-popover-header{min-height:2rem}[ui5-responsive-popover] .ui5-responsive-popover-header .row{justify-content:left}[ui5-responsive-popover] [ui5-button]{height:100%;min-width:4rem}[ui5-responsive-popover]{margin-top:var(--_ui5-v2-3-1-rc-0_tokenizer-popover_offset);margin-inline-start:calc(-1 * var(--_ui5-v2-3-1-rc-0_tokenizer_padding))}.ui5-responsive-popover-footer [ui5-button]:first-child{margin-right:1rem}
` };
export default styleData;
//# sourceMappingURL=TokenizerPopover.css.js.map