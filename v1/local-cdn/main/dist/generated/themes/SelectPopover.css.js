import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/SelectPopover.css.ts", content: `.ui5-select-popover::part(content),.ui5-select-popover::part(header){padding:0}.ui5-select-popover [ui5-li]{height:var(--_ui5-v1-24-0_list_item_dropdown_base_height)}.ui5-select-popover [ui5-li]::part(icon){color:var(--sapList_TextColor)}
` };
export default styleData;
//# sourceMappingURL=SelectPopover.css.js.map