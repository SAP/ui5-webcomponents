import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents-fiori", fileName: "themes/ShellBarPopover.css.ts", content: `.ui5-shellbar-menu-popover::part(content),.ui5-shellbar-overflow-popover::part(content){padding:0}.ui5-shellbar-overflow-popover [ui5-li]::part(icon){color:var(--sapList_TextColor)}
` };
export default styleData;
//# sourceMappingURL=ShellBarPopover.css.js.map