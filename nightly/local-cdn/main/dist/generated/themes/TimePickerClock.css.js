import { registerThemePropertiesLoader } from "@ui5/webcomponents-base/dist/asset-registries/Themes.js";
import defaultThemeBase from "@ui5/webcomponents-theming/dist/generated/themes/sap_horizon/parameters-bundle.css.js";
import defaultTheme from "./sap_horizon/parameters-bundle.css.js";
registerThemePropertiesLoader("@ui5/webcomponents-theming", "sap_horizon", async () => defaultThemeBase);
registerThemePropertiesLoader("@ui5/webcomponents", "sap_horizon", async () => defaultTheme);
export default `.ui5-tp-clock{position:relative;width:auto;padding:.5625rem;outline:none;display:none}.ui5-tp-clock-active{display:block}.ui5-tp-clock-dial{position:relative;width:auto;display:block;border-radius:100%;background-color:var(--sapLegend_WorkingBackground);text-align:center;z-index:1}.ui5-tp-clock-dial:before{content:attr(data-label);display:flex;align-items:center;justify-content:center;position:absolute;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapContent_LabelColor);inset:2.75rem;border-radius:100%;z-index:2}.ui5-tp-clock-dial:after{content:"";display:block;padding-bottom:100%}.ui5-tp-clock-inner .ui5-tp-clock-dial:before{background-color:var(--sapLegend_WorkingBackground)}.ui5-tp-clock-cover{position:absolute;inset:-.25rem;border-radius:100%;z-index:10;touch-action:none}.ui5-tp-clock-item{position:absolute;top:0;left:50%;display:inline-block;width:2.75rem;height:100%;z-index:3;-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ui5-tp-clock-item.ui5-tp-clock-marker{z-index:4}.ui5-tp-clock-dot{display:block;box-sizing:border-box;width:.25rem;height:.3125rem;margin:0 auto .25rem;border-radius:100%;background-color:var(--sapField_BorderColor)}.ui5-tp-clock-mid-dot{display:block;box-sizing:border-box;width:.125rem;height:.1875rem;margin:0 auto .375rem;border-radius:100%;background-color:var(--sapField_BorderColor)}.ui5-tp-clock-select-marker{box-sizing:border-box;width:.25rem;height:.5625rem;margin:0 auto;border-radius:100%;background-color:var(--sapButton_Selected_Background);border:.0625rem solid var(--sapButton_Selected_BorderColor)}.ui5-tp-clock-hover-marker{box-sizing:border-box;width:.25rem;height:.5625rem;margin:0 auto;border-radius:100%;background-color:var(--sapList_Hover_Background);border:.0625rem solid var(--sapGroup_TitleBorderColor)}.ui5-tp-clock-number{box-sizing:border-box;display:inline-block;width:2.75rem;height:2.75rem;border-radius:100%;line-height:2.75rem;text-align:center;vertical-align:top;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapTextColor);border:.0625rem solid transparent}.ui5-tp-clock-number.ui5-tp-clock-number-hover:not(.ui5-tp-clock-selected){background-color:var(--sapList_Hover_Background);z-index:5}.ui5-tp-clock-selected{color:var(--sapButton_Selected_TextColor);background-color:var(--sapButton_Selected_Background);border:.0625rem solid var(--sapButton_Selected_BorderColor)}.ui5-tp-clock-hovered{background-color:var(--sapList_Hover_Background);z-index:5}.ui5-tp-clock-pointer{cursor:pointer}.ui5-tp-clock-items,.ui5-tp-clock-markers{position:absolute;inset:0}:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-items .ui5-tp-clock-number,:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-items .ui5-tp-clock-mid-dot,:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-number.ui5-tp-clock-selected,:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-select-marker,:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-dial:before{opacity:0}.ui5-tp-clock-transition .ui5-tp-clock-items .ui5-tp-clock-number{animation-name:fadeOutClockItems;animation-delay:.15s;animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}.ui5-tp-clock-transition .ui5-tp-clock-dial:before{animation-name:fadeOutClockLabel;animation-duration:.35s;animation-timing-function:ease-out;animation-fill-mode:forwards}.ui5-tp-clock-transition .ui5-tp-clock-number.ui5-tp-clock-selected,.ui5-tp-clock-transition .ui5-tp-clock-select-marker{animation-name:fadeOutSelectedItem;animation-delay:.1s;animation-duration:.15s;animation-timing-function:ease-out;animation-fill-mode:forwards}.ui5-tp-clock-transition .ui5-tp-clock-items .ui5-tp-clock-mid-dot{animation-name:fadeOutSelectedItem;animation-delay:.15s;animation-duration:.2s;animation-timing-function:ease-out;animation-fill-mode:forwards}:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-items .ui5-tp-clock-number{animation-name:fadeInClockItems;animation-delay:.15s;animation-duration:.2s;animation-timing-function:ease-in;animation-fill-mode:forwards}:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-dial:before{animation-name:fadeInClockLabel;animation-duration:.35s;animation-timing-function:ease-in;animation-fill-mode:forwards}:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-number.ui5-tp-clock-selected,:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-select-marker{animation-name:fadeInSelectedItem;animation-delay:.1s;animation-duration:.15s;animation-timing-function:ease-in;animation-fill-mode:forwards}:host(:not([_skip-animation])) .ui5-tp-clock-active:not(.ui5-tp-clock-transition) .ui5-tp-clock-items .ui5-tp-clock-mid-dot{animation-name:fadeInSelectedItem;animation-delay:.15s;animation-duration:.2s;animation-timing-function:ease-in;animation-fill-mode:forwards}@keyframes fadeOutClockItems{0%{opacity:1;display:block}to{opacity:0;display:block}}@keyframes fadeOutClockLabel{0%{opacity:1;display:flex;transform:translateY(0)}to{opacity:0;display:flex;transform:translateY(-16px)}}@keyframes fadeOutSelectedItem{0%{opacity:1;display:block}to{opacity:0;display:block}}@keyframes fadeInClockItems{0%{opacity:0;display:block}to{opacity:1;display:block}}@keyframes fadeInClockLabel{0%{opacity:0;display:flex;transform:translateY(16px)}to{opacity:1;display:flex;transform:translateY(0)}}@keyframes fadeInSelectedItem{0%{opacity:0;display:block}50%{opacity:.5;display:block}to{opacity:1;display:block}}
`;
//# sourceMappingURL=TimePickerClock.css.js.map