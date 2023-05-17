import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import SegmentedButtonMode from "./types/SegmentedButtonMode.js";

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

type SegmentedButtonSelectionChangeEventDetail = {
	selectedItem: SegmentedButtonItem,
	pressedItems: Array<SegmentedButtonItem>,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-segmented-button</code> shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 * <br><br>
 * <b>Note:</b> There can be just one selected <code>item</code> at a time.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/SegmentedButton";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SegmentedButton
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-segmented-button
 * @since 1.0.0-rc.6
 * @appenddocs sap.ui.webc.main.SegmentedButtonItem
 * @public
 */
@customElement({
	tag: "ui5-segmented-button",
	languageAware: true,
	renderer: litRender,
	template: SegmentedButtonTemplate,
	styles: SegmentedButtonCss,
	dependencies: [SegmentedButtonItem],
})
/**
 * Fired when the selected item changes.
 *
 * @event sap.ui.webc.main.SegmentedButton#selection-change
 * @deprecated As of 1.14.0. This parameter is not guaranteed in future releases.
 * Please use the <code>pressedItems</code> parameter instead.
 * @param {HTMLElement} selectedItem the pressed item.
 * @param {string} pressedItems an array of pressed items.
 * @public
 */
@event("selection-change", {
	detail: {
		selectedItem: { type: HTMLElement },
		pressedItems: { type: Array },
	},
})

class SegmentedButton extends UI5Element {
	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @defaultvalue undefined
	 * @public
	 * @name sap.ui.webc.main.SegmentedButton.prototype.accessibleName
	 * @since 1.0.3
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Defines the component selection mode.
	 *
	 * <br><br>
	 * <b>The available values are:</b>
	 *
	 * <ul>
	 * <li><code>Single</code></li>
	 * <li><code>Multi</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.main.types.SegmentedButtonMode}
	 * @defaultvalue "Single"
	 * @public
	 * @name sap.ui.webc.main.SegmentedButton.prototype.mode
	 * @since 1.14.0
	 */
	@property({ type: SegmentedButtonMode, defaultValue: SegmentedButtonMode.Single })
	mode!: SegmentedButtonMode;

	/**
	 * Defines the items of <code>ui5-segmented-button</code>.
	 * <br><br>
	 * <b>Note:</b> Multiple items are allowed.
	 * <br><br>
	 * <b>Note:</b> Use the <code>ui5-segmented-button-item</code> for the intended design.
	 * @type {sap.ui.webc.main.ISegmentedButtonItem[]}
	 * @name sap.ui.webc.main.SegmentedButton.prototype.default
	 * @slot items
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<SegmentedButtonItem>;

	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	absoluteWidthSet: boolean // set to true whenever we set absolute width to the component
	percentageWidthSet: boolean; // set to true whenever we set 100% width to the component
	hasPreviouslyFocusedItem: boolean;

	_handleResizeBound: ResizeObserverCallback;

	widths?: Array<number>;
	_selectedItem?: SegmentedButtonItem;

	static async onDefine() {
		SegmentedButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.getSlottedNodes<SegmentedButtonItem>("items"),
		});

		this.absoluteWidthSet = false; // true when component width is set to absolute
		this.percentageWidthSet = false; // true when component width is set to 100%
		this.hasPreviouslyFocusedItem = false;

		this._handleResizeBound = this._doLayout.bind(this);
	}

	onEnterDOM() {
		ResizeHandler.register(this.parentNode as HTMLElement, this._handleResizeBound);
	}

	onExitDOM() {
		if (this.parentNode) {
			ResizeHandler.deregister(this.parentNode as HTMLElement, this._handleResizeBound);
		}
	}

	onBeforeRendering() {
		const items = this.getSlottedNodes<SegmentedButtonItem>("items");

		items.forEach((item, index, arr) => {
			item.posInSet = index + 1;
			item.sizeOfSet = arr.length;
		});

		this.normalizeSelection();
	}

	async onAfterRendering() {
		await this._doLayout();
	}

	prepareToMeasureItems() {
		this.style.width = "";
		this.items.forEach(item => {
			item.style.width = "";
		});
	}

	async measureItemsWidth() {
		await renderFinished();
		this.prepareToMeasureItems();

		this.widths = this.items.map(item => {
			// 1 is added because for width 100.44px the offsetWidth property is 100px and not 101px
			return item.offsetWidth + 1;
		});
	}

	normalizeSelection() {
		const selectedItems = this.pressedItems;
		const selectedIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;

		if (this._selectedItem && selectedItems.length > 1) {
			selectedItems.splice(selectedIndex, 1);
		}

		const pressedItem = selectedItems.pop() || this.items[0];

		switch (this.mode) {
		case SegmentedButtonMode.Single:
			this._applySingleSelectionTo(pressedItem);
			break;
		default:
		}
	}

	_selectItem(e: MouseEvent | KeyboardEvent) {
		const target = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");

		if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
			return;
		}

		switch (this.mode) {
		case SegmentedButtonMode.Single:
			this._applySingleSelectionTo(target);
			break;
		default:
			if (e instanceof KeyboardEvent) {
				target.pressed = !target.pressed;
			}
		}

		this.fireEvent<SegmentedButtonSelectionChangeEventDetail>("selection-change", {
			selectedItem: target,
			pressedItems: this.pressedItems,
		});

		this._itemNavigation.setCurrentItem(target);
		target.focus();

		return this;
	}

	_applySingleSelectionTo(item: SegmentedButtonItem) {
		this.items.forEach(currentItem => {
			currentItem.pressed = false;
		});
		item.pressed = true;
		this._selectedItem = item;
	}

	_onclick(e: MouseEvent) {
		this._selectItem(e);
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._selectItem(e);
		} else if (isSpace(e)) {
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._selectItem(e);
		}
	}

	_onmousedown(e: MouseEvent) {
		const eventTarget = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = eventTarget.hasAttribute("ui5-segmented-button-item");

		if (isTargetSegmentedButtonItem) {
			eventTarget.focus();
			this._itemNavigation.setCurrentItem(eventTarget);
			this.hasPreviouslyFocusedItem = true;
		}
	}

	_onfocusin(e: FocusEvent) {
		// If the component was previously focused,
		// update the ItemNavigation to sync the button's tabindex values
		if (this.hasPreviouslyFocusedItem) {
			this._itemNavigation.setCurrentItem(e.target as SegmentedButtonItem);
			return;
		}

		// If the component is focused for the first time
		// focus the selected item if such is present
		if (this.pressedItems.length) {
			this.pressedItems[0].focus();
			this._itemNavigation.setCurrentItem(this.pressedItems[0]);
			this.hasPreviouslyFocusedItem = true;
		}
	}

	async _doLayout(): Promise<void> {
		const itemsHaveWidth = this.widths && this.widths.some(itemWidth => itemWidth > 2); // 2 pixels added for rounding
		if (!itemsHaveWidth) {
			await this.measureItemsWidth();
		}

		const parentWidth = this.parentNode ? (this.parentNode as HTMLElement).offsetWidth : 0;

		if (!this.style.width || this.percentageWidthSet) {
			this.style.width = `${Math.max(...this.widths!) * this.items.length}px`;
			this.absoluteWidthSet = true;
		}

		this.items.forEach(item => {
			item.style.width = "100%";
		});

		if (parentWidth <= this.offsetWidth && this.absoluteWidthSet) {
			this.style.width = "100%";
			this.percentageWidthSet = true;
		}
	}

	/**
	 * Currently selected item.
	 *
	 * @readonly
	 * @type {sap.ui.webc.main.ISegmentedButtonItem}
	 * @name sap.ui.webc.main.SegmentedButton.prototype.selectedItem
	 * @deprecated As of 1.14.0. This method is not guaranteed in future releases.
	 * Please use the <code>pressedItems</code> property instead.
	 * @public
	 */
	get selectedItem() {
		return this._selectedItem;
	}

	/**
	 * Retrieves an array of <code>SegmentedButtonItem</code>'s.
	 * @readonly
	 * @name sap.ui.webc.main.SegmentedButton.prototype.selectedItem
	 * @type {sap.ui.webc.main.ISegmentedButtonItem[]}
	 * @since 1.14.0
	 * @public
	 */
	get pressedItems(): Array<SegmentedButtonItem> {
		return this.items.filter(item => item.pressed);
	}

	get ariaDescribedBy() {
		return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIBEDBY);
	}

	get ariaDescription() {
		return SegmentedButton.i18nBundle.getText(SEGMENTEDBUTTON_ARIA_DESCRIPTION);
	}
}

SegmentedButton.define();

export default SegmentedButton;
