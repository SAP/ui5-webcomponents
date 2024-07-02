var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var CalendarLegendItem_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import { CAL_LEGEND_TODAY_TEXT, CAL_LEGEND_SELECTED_TEXT, CAL_LEGEND_WORKING_DAY_TEXT, CAL_LEGEND_NON_WORKING_DAY_TEXT, } from "./generated/i18n/i18n-defaults.js";
import CalendarLegendItemTemplate from "./generated/templates/CalendarLegendItemTemplate.lit.js";
// Styles
import CalendarLegendItemCss from "./generated/themes/CalendarLegendItem.css.js";
/**
 * @class
 *
 * ### Overview
 *
 * Each `ui5-calendar-legend-item` represents a legend item, displaying a color with a label.
 * The color is determined by the `type` property and the label by the `text` property.
 * If a `ui5-special-date` is used within the `ui5-calendar` and a type is set, clicking on a `ui5-calendar-legend-item`
 * with the same type will emphasize the respective date(s) in the calendar.
 *
 * ### Usage
 * The `ui5-calendar-legend-item` is intended to be used within the `ui5-calendar-legend` component.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/CalendarLegendItem.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.23.0
 * @public
 */
let CalendarLegendItem = CalendarLegendItem_1 = class CalendarLegendItem extends UI5Element {
    static async onDefine() {
        CalendarLegendItem_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
    get effectiveText() {
        const TodayI18n = CalendarLegendItem_1.i18nBundle.getText(CAL_LEGEND_TODAY_TEXT);
        const SelectedI18n = CalendarLegendItem_1.i18nBundle.getText(CAL_LEGEND_SELECTED_TEXT);
        const WorkingI18n = CalendarLegendItem_1.i18nBundle.getText(CAL_LEGEND_WORKING_DAY_TEXT);
        const NonWorkingI18n = CalendarLegendItem_1.i18nBundle.getText(CAL_LEGEND_NON_WORKING_DAY_TEXT);
        const typeMapping = {
            [CalendarLegendItemType.Today]: TodayI18n,
            [CalendarLegendItemType.Selected]: SelectedI18n,
            [CalendarLegendItemType.NonWorking]: NonWorkingI18n,
            [CalendarLegendItemType.Working]: WorkingI18n,
        };
        return typeMapping[this.type] || this.text || this.type;
    }
};
__decorate([
    property()
], CalendarLegendItem.prototype, "text", void 0);
__decorate([
    property({ type: CalendarLegendItemType, defaultValue: CalendarLegendItemType.None })
], CalendarLegendItem.prototype, "type", void 0);
__decorate([
    property({ defaultValue: "-1", noAttribute: true })
], CalendarLegendItem.prototype, "forcedTabIndex", void 0);
CalendarLegendItem = CalendarLegendItem_1 = __decorate([
    customElement({
        tag: "ui5-calendar-legend-item",
        renderer: litRender,
        styles: CalendarLegendItemCss,
        template: CalendarLegendItemTemplate,
    })
], CalendarLegendItem);
CalendarLegendItem.define();
export default CalendarLegendItem;
//# sourceMappingURL=CalendarLegendItem.js.map