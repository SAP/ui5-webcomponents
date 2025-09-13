import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@" + "ui5" + "/" + "webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@" + "u" + "i" + "5" + "/" + "w" + "e" + "b" + "c" + "o" + "m" + "p" + "o" + "n" + "e" + "n" + "t" + "s", "sap_horizon", async () => defaultTheme);
export default `:host(:not([hidden])){display:inline-block}.ui5-cal-root .ui5-calheader{display:block;height:var(--_ui5-v2-15-0-rc-0_calendar_header_height);font-family:var(--_ui5-v2-15-0-rc-0_button_fontFamily)}.ui5-cal-root{background:var(--sapList_Background);box-sizing:border-box;height:var(--_ui5-v2-15-0-rc-0_calendar_height);width:var(--_ui5-v2-15-0-rc-0_calendar_width);padding:var(--_ui5-v2-15-0-rc-0_calendar_top_bottom_padding) var(--_ui5-v2-15-0-rc-0_calendar_left_right_padding) 0;display:flex;flex-direction:column-reverse;justify-content:flex-end;overflow:hidden}.ui5-cal-root .ui5-cal-content{padding:0 var(--_ui5-v2-15-0-rc-0_calendar_left_right_padding) var(--_ui5-v2-15-0-rc-0_calendar_top_bottom_padding)}
`;
//# sourceMappingURL=Calendar.css.js.map