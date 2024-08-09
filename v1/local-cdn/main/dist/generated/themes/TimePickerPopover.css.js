import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
const styleData = { packageName: "@ui5/webcomponents", fileName: "themes/TimePickerPopover.css.ts", content: `.ui5-time-picker-popover{width:20rem}.ui5-time-picker-footer{height:fit-content;display:flex;justify-content:flex-end;width:100%}.ui5-time-picker-footer>[ui5-button]{margin:1%;min-width:20%}.ui5-time-picker-popover::part(content){padding:0}
` };
export default styleData;
//# sourceMappingURL=TimePickerPopover.css.js.map