import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import CalendarLegendStandardItemsType from "./types/StandardCalendarLegendItemsType.js";
import CalendarLegendTemplate from "./generated/templates/CalendarLegendTemplate.lit.js";

// Styles
import CalendarLegendCss from "./generated/themes/CalendarLegend.css.js";
import CalendarLegendStandardItem from "./CalendarLegendStandardItem.js";

/**
 * @class CalendarLegend
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-calendar-legend</code> component is used to display a legend of special calendar dates
 * with their corresponding textual descriptions and types.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CalendarLegend.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.CalendarLegend
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-calendar-legend
 * @public
 */
@customElement({
	tag: "ui5-calendar-legend",
	renderer: litRender,
	styles: CalendarLegendCss,
	template: CalendarLegendTemplate,
	dependencies: [CalendarLegendStandardItem],
})
class CalendarLegend extends UI5Element {
	/**
	 * Defines the items of the component.
	 *
	 * @type {CalendarLegendStandardItem[]}
	 * @slot
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<CalendarLegendStandardItem>

	constructor() {
		super();
	}

	onBeforeRendering() {
		this._ensureMaxItemsCount();
		this._addDefaultItemsIfNeeded();
		this._removeDuplicateTypes();

		this.items.forEach(item => {
			if (!(item.type in CalendarLegendStandardItemsType)) {
				item.remove();
			}
		});
	}

	/**
	 * Ensures that there are no more than 4 items.
	 * If there are more, removes the items after the 4th one.
	 * <br><br>
	 *
	 * Note: Change/Remove this method when Custom Calendar Legend items are introduced.
	 *
	 * @private
	 */
	_ensureMaxItemsCount() {
		while (this.items.length > 4) {
			this.items[this.items.length - 1].remove();
			this.items.pop();
		}
	}

	/**
	 * Adds default items if none are present.
	 * @private
	 */
	_addDefaultItemsIfNeeded() {
		if (this.items.length === 0) {
			const itemsToAdd = this._generateDefaultItems();
			itemsToAdd.forEach(item => {
				this.appendChild(item);
			});
		}
	}

	/**
	 * Generates default items.
	 * @returns {HTMLElement[]} Array of items to add.
	 * @private
	 */
	_generateDefaultItems() {
		const types = Object.values(CalendarLegendStandardItemsType);
		const itemsToAdd: Array<HTMLElement> = [];

		types.forEach(type => {
			const item = document.createElement("ui5-cal-legend-standard-item");
			item.setAttribute("type", type);
			item.textContent = type;
			itemsToAdd.push(item);
		});

		return itemsToAdd;
	}

	/**
	 * Removes items with duplicate types, keeping only the first occurrence.
	 * @private
	 */
	_removeDuplicateTypes() {
		const types = new Set();
		this.items.forEach(item => {
			if (types.has(item.type)) {
				item.remove();
			} else {
				types.add(item.type);
			}
		});
	}
}

CalendarLegend.define();

export default CalendarLegend;
