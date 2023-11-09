import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import CalendarLegendTemplate from "./generated/templates/CalendarLegendTemplate.lit.js";

// Styles
import CalendarLegendCss from "./generated/themes/CalendarLegend.css.js";
import CalendarLegendItem from "./CalendarLegendItem.js";

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
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-calendar-legend",
	renderer: litRender,
	styles: CalendarLegendCss,
	template: CalendarLegendTemplate,
	dependencies: [CalendarLegendItem],
})
class CalendarLegend extends UI5Element {
	/**
	 * Hides the Today item in the legend.
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	hideToday!: boolean;

	/**
	 * Hides the Selected day item in the legend.
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	hideSelectedDay!: boolean;

	/**
	 * Hides the Non-Working day item in the legend.
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	hideNonWorkingDay!: boolean;

	/**
	 * Hides the Working day item in the legend.
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	hideWorkingDay!: boolean;

	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
	 })
	items!: Array<CalendarLegendItem>;

	_itemNavigation: ItemNavigation;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			navigationMode: NavigationMode.Horizontal,
			behavior: ItemNavigationBehavior.Static,
			getItemsCallback: () => this.focusableElements,
		});
	}

	_onItemClick(e: MouseEvent) {
		const target = e.target as CalendarLegendItem;

		this._itemNavigation.setCurrentItem(target);
		this._itemNavigation._focusCurrentItem();
	}

	_onItemKeyDown(e: KeyboardEvent) {
		const items = this.focusableElements;
		const totalItems = items.length;
		const currentItem = e.target as CalendarLegendItem;
		const currentIndex = items.indexOf(currentItem);

		if (isDown(e)) {
			e.preventDefault();
			const nextIndex = currentIndex + 1;

			if (nextIndex < totalItems) {
				this._itemNavigation.setCurrentItem(items[nextIndex]);
				this._itemNavigation._focusCurrentItem();
			}
		}

		if (isUp(e)) {
			e.preventDefault();
			const nextIndex = currentIndex - 1;

			if (nextIndex >= 0) {
				this._itemNavigation.setCurrentItem(items[nextIndex]);
				this._itemNavigation._focusCurrentItem();
			}
		}
	}

	get focusableElements() {
		let allFocusableItems = [...this.shadowRoot!.querySelectorAll<CalendarLegendItem>("[ui5-calendar-legend-item]"), ...this.legendItems];
		const rearrangedItems: Array<CalendarLegendItem> = [];

		// Rearrange items' order
		allFocusableItems.forEach(item => rearrangedItems.push(item));

		const itemsFirstColumn = rearrangedItems.filter((item, index) => index % 2 === 0);
		const itemsSecondColumn = rearrangedItems.filter((item, index) => index % 2 !== 0);

		allFocusableItems = [...itemsFirstColumn, ...itemsSecondColumn];
		return allFocusableItems;
	}

	get legendItems() {
		const items = this.getSlottedNodes<CalendarLegendItem>("items");
		return items.filter(item => item instanceof CalendarLegendItem);
	}

	get defaultItemsMapping() {
		const typeMapping = [
			{ type: [CalendarLegendItemType.Today], hide: this.hideToday },
			{ type: [CalendarLegendItemType.Selected], hide: this.hideSelectedDay },
			{ type: [CalendarLegendItemType.Working], hide: this.hideWorkingDay },
			{ type: [CalendarLegendItemType.NonWorking], hide: this.hideNonWorkingDay },
		];

		return typeMapping;
	}
}

CalendarLegend.define();

export default CalendarLegend;
