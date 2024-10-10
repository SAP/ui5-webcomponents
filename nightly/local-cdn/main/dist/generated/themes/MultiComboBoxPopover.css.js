import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/MultiComboBoxPopover.css.ts", content: `.ui5-suggestions-popover .ui5-multi-combobox-all-items-list{--_ui5-v2-3-1-rc-0_checkbox_width_height: var(--_ui5-v2-3-1-rc-0_list_item_dropdown_base_height)}.ui5-mcb-select-all-header{width:100%;height:44px;border-bottom:.0625rem solid var(--sapGroup_TitleBorderColor);display:flex;align-items:center;font-family:"72override",var(--sapFontFamily);position:sticky;top:0;z-index:2;background:var(--sapPageHeader_Background)}.ui5-mcb-select-all-checkbox{width:100%;font-family:var(--sapFontBoldFamily)}.ui5-mcb-select-all-checkbox::part(root):focus:before{border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:0;inset:0 2px}.ui5-mcb-select-all-checkbox::part(label){font-family:var(--sapFontBoldFamily)}
` };
export default styleData;
//# sourceMappingURL=MultiComboBoxPopover.css.js.map