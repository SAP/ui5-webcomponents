import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import CalendarLegendStandardItemsType from "./types/StandardCalendarLegendItemsType.js";

import CalendarLegendStandardItemTemplate from "./generated/templates/CalendarLegendStandardItemTemplate.lit.js";

// Styles
import CalendarLegendStandardItemCss from "./generated/themes/CalendarLegendStandardItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-cal-legend-standard-item</code> represents a standard legend item used within the <code>ui5-calendar-legend</code> component.
 *
 * <h3>Custom Text Override</h3>
 * If you provide `textContent` or use the item as <code><ui5-cal-legend-standard-item type="Today">Text here</ui5-cal-legend-standard-item></code>,
 * it will override the default text provided by the `type`. This allows for customization of the legend item text.
 *
 * <h3>Usage</h3>
 *
 * The <code>ui5-cal-legend-standard-item</code> is intended to be used within the <code>ui5-calendar-legend</code> component.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CalendarLegendStandardItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarLegendStandardItem
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-cal-legend-standard-item
 * @public
 */
@customElement({
	tag: "ui5-cal-legend-standard-item",
	renderer: litRender,
	styles: CalendarLegendStandardItemCss,
	template: CalendarLegendStandardItemTemplate,
	dependencies: [],
})

class CalendarLegendStandardItem extends UI5Element {
	/**
	 * Defines the type of the Calendar Legend Standard Item.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.CalendarLegendStandardItem.prototype.type
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	type!: `${CalendarLegendStandardItemsType}`;

	get effectiveText() {
		const typeExists = `${this.type}` in CalendarLegendStandardItemsType;

		if ((typeExists && this.textContent === "")) {
			return this.type;
		}

		if (this.type && typeExists && this.textContent) {
			return this.textContent;
		}
	}
}

CalendarLegendStandardItem.define();

export default CalendarLegendStandardItem;
