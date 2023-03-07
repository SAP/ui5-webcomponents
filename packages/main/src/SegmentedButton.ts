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

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

type SegmentedButtonSelectionChangeEventDetail = {
	selectedItem: SegmentedButtonItem,
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
 * @param {HTMLElement} selectedItem the pressed item.
 * @public
 */
@event("selection-change", {
	detail: {
		selectedItem: { type: HTMLElement },
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
		const selectedItems = this.items.filter(item => item.pressed);
		const selectedIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;

		if (this._selectedItem && selectedItems.length > 1) {
			selectedItems.splice(selectedIndex, 1);
		}
		this._selectedItem = selectedItems.pop();

		if (this._selectedItem) {
			this.items.forEach(item => {
				item.pressed = false;
			});
			this._selectedItem.pressed = true;
		}
	}

	_selectItem(e: MouseEvent | KeyboardEvent) {
		const target = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");

		if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
			return;
		}

		if (target !== this._selectedItem) {
			if (this._selectedItem) {
				this._selectedItem.pressed = false;
			}
			this._selectedItem = target;
			this.fireEvent<SegmentedButtonSelectionChangeEventDetail>("selection-change", {
				selectedItem: this._selectedItem,
			});
		}

		this._selectedItem.pressed = true;
		this._itemNavigation.setCurrentItem(this._selectedItem);

		this.selectedItem!.focus();

		return this;
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
		if (this.selectedItem) {
			this.selectedItem.focus();
			this._itemNavigation.setCurrentItem(this._selectedItem!);
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
	 * @public
	 */
	get selectedItem() {
		return this._selectedItem;
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
