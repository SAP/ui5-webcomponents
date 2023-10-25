import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import ItemNavigation, { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
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
	 * Hides the Today item in the legend.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.CalendarLegend.prototype.hideToday
	 * @public
	 */
	@property({ type: Boolean })
	hideToday!: boolean;

	/**
	 * Hides the Selected day item in the legend.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.CalendarLegend.prototype.hideSelectedDay
	 * @public
	 */
	@property({ type: Boolean })
	hideSelectedDay!: boolean;

	/**
	 * Hides the Non-Working day item in the legend.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.CalendarLegend.prototype.hideNonWorkingDay
	 * @public
	 */
	@property({ type: Boolean })
	hideNonWorkingDay!: boolean;

	/**
	 * Hides the Working day item in the legend.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.CalendarLegend.prototype.hideWorkingDay
	 * @public
	 */
	@property({ type: Boolean })
	hideWorkingDay!: boolean;

	_itemNavigation: ItemNavigation;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this._getFocusableElements(),
			behavior: ItemNavigationBehavior.Cyclic,
		});
	}

	_onItemClick(e: MouseEvent) {
		const target = e.target as CalendarLegendStandardItem;

		this._itemNavigation.setCurrentItem(target);
	}

	_itemsInLegend() {
		const items = this.shadowRoot!.querySelectorAll<CalendarLegendStandardItem>("ui5-cal-legend-standard-item");
		return [...items];
	}

	_getFocusableElements() {
		const defaultLegendItems: Array<ITabbable> = this._itemsInLegend();
		return defaultLegendItems;
	}

	_initItemNavigation() {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				getItemsCallback: () => this._getFocusableElements(),
				behavior: ItemNavigationBehavior.Cyclic,
			});
		}
	}

	get typeFromEnum() {
		const typeMapping = [
			{ type: [CalendarLegendStandardItemsType.Today], hide: this.hideToday },
			{ type: [CalendarLegendStandardItemsType.Selected], hide: this.hideSelectedDay },
			{ type: [CalendarLegendStandardItemsType.Working], hide: this.hideWorkingDay },
			{ type: [CalendarLegendStandardItemsType.NonWorking], hide: this.hideNonWorkingDay },
		];

		return typeMapping;
	}
}

CalendarLegend.define();

export default CalendarLegend;
