import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import {
	CAL_LEGEND_TODAY_TEXT,
	CAL_LEGEND_SELECTED_TEXT,
	CAL_LEGEND_WORKING_DAY_TEXT,
	CAL_LEGEND_NON_WORKING_DAY_TEXT,
} from "./generated/i18n/i18n-defaults.js";

import CalendarLegendItemTemplate from "./CalendarLegendItemTemplate.js";

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
@customElement({
	tag: "ui5-calendar-legend-item",
	renderer: jsxRenderer,
	styles: CalendarLegendItemCss,
	template: CalendarLegendItemTemplate,
})

class CalendarLegendItem extends UI5Element implements ITabbable {
	/**
	 * Defines the text content of the Calendar Legend Item.
	 * @default undefined
	 * @public
	 */
	@property()
	text?: string;

	/**
	 * Defines the type of the Calendar Legend Item.
	 * @default "None"
	 * @public
	 */
	@property()
	type: `${CalendarLegendItemType}` = "None";

	/**
	 * Tab index of the component.
	 * @private
	 */
	@property({ noAttribute: true })
	forcedTabIndex = "-1"

	@i18n("@ui5/webcomponents")
	static i18nBundle: I18nBundle;

	get effectiveText() {
		const TodayI18n = CalendarLegendItem.i18nBundle.getText(CAL_LEGEND_TODAY_TEXT);
		const SelectedI18n = CalendarLegendItem.i18nBundle.getText(CAL_LEGEND_SELECTED_TEXT);
		const WorkingI18n = CalendarLegendItem.i18nBundle.getText(CAL_LEGEND_WORKING_DAY_TEXT);
		const NonWorkingI18n = CalendarLegendItem.i18nBundle.getText(CAL_LEGEND_NON_WORKING_DAY_TEXT);

		const typeMapping = {
			[CalendarLegendItemType.Today]: TodayI18n,
			[CalendarLegendItemType.Selected]: SelectedI18n,
			[CalendarLegendItemType.NonWorking]: NonWorkingI18n,
			[CalendarLegendItemType.Working]: WorkingI18n,
		};

		return typeMapping[this.type as keyof typeof typeMapping] || this.text || this.type;
	}
}

CalendarLegendItem.define();

export default CalendarLegendItem;
