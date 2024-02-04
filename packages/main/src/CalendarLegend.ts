import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import {
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import ItemNavigationBehavior from "@ui5/webcomponents-base/dist/types/ItemNavigationBehavior.js";
import CalendarLegendItemType from "./types/CalendarLegendItemType.js";
import CalendarLegendTemplate from "./generated/templates/CalendarLegendTemplate.lit.js";
import CalendarLegendItem from "./CalendarLegendItem.js";

// Styles
import CalendarLegendCss from "./generated/themes/CalendarLegend.css.js";

type CalendarLegendItemSelectionChangeEventDetail = {
	item: CalendarLegendItem;
}

/**
 * @class CalendarLegend
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-calendar-legend</code> component is designed for use within the <code>ui5-calendar</code> to display a legend.
 * Each <code>ui5-calendar-legend-item</code> represents a unique date type, specifying its visual style
 * and a corresponding textual label.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/CalendarLegend.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.22.0
 */
@customElement({
	tag: "ui5-calendar-legend",
	renderer: litRender,
	styles: CalendarLegendCss,
	template: CalendarLegendTemplate,
	dependencies: [CalendarLegendItem],
})
@event<CalendarLegendItemSelectionChangeEventDetail>("_calendar-legend-selection-change", {
	detail: {
		item: { type: CalendarLegendItem },
	},
})
@event("_calendar-legend-focus-out")
class CalendarLegend extends UI5Element {
	/**
	 * Hides the Today item in the legend.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideToday!: boolean;

	/**
	 * Hides the Selected day item in the legend.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideSelectedDay!: boolean;

	/**
	 * Hides the Non-Working day item in the legend.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideNonWorkingDay!: boolean;

	/**
	 * Hides the Working day item in the legend.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideWorkingDay!: boolean;

	/**
	 * Defines the items of the component.
	 * @public
	 */
	@slot({
		type: HTMLElement,
		invalidateOnChildChange: true,
		individualSlots: true,
		"default": true,
	 })
	items!: Array<CalendarLegendItem>;

	_itemNavigation!: ItemNavigation;

	constructor() {
		super();
	}

	onAfterRendering(): void {
		if (!this._itemNavigation) {
			this._itemNavigation = new ItemNavigation(this, {
				navigationMode: NavigationMode.Horizontal,
				behavior: ItemNavigationBehavior.Static,
				getItemsCallback: () => this.focusableElements,
			});
		}
	}

	_onMouseDown(e: MouseEvent) {
		e.stopPropagation();
		const target = e.target as CalendarLegendItem;

		this._itemNavigation.setCurrentItem(target);
		this._itemNavigation._focusCurrentItem();
	}

	_onFocusIn(e: FocusEvent) {
		const target = e.target as CalendarLegendItem;

		this.fireEvent<CalendarLegendItemSelectionChangeEventDetail>("_calendar-legend-selection-change", {
			item: target,
		});
	}

	_onFocusOut() {
		this.fireEvent("_calendar-legend-focus-out");
	}

	_onItemKeyDown(e: KeyboardEvent) {
		const items = this.focusableElements;
		const itemsCount = items.length;
		const currentItem = e.target as CalendarLegendItem;
		const currentIndex = items.indexOf(currentItem);

		if (isDown(e)) {
			e.preventDefault();
			const nextIndex = currentIndex + 1;

			if (nextIndex < itemsCount) {
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
		const allFocusableItems = [...this.shadowRoot!.querySelectorAll<CalendarLegendItem>("[ui5-calendar-legend-item]"), ...this.legendItems];
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
export type {
	CalendarLegendItemSelectionChangeEventDetail,
};
