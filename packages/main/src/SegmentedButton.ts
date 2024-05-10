import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ItemNavigation, { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import {
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { SEGMENTEDBUTTON_ARIA_DESCRIPTION, SEGMENTEDBUTTON_ARIA_DESCRIBEDBY } from "./generated/i18n/i18n-defaults.js";
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import SegmentedButtonSelectionMode from "./types/SegmentedButtonSelectionMode.js";

// Template
import SegmentedButtonTemplate from "./generated/templates/SegmentedButtonTemplate.lit.js";

// Styles
import SegmentedButtonCss from "./generated/themes/SegmentedButton.css.js";

/**
 * Interface for components that may be slotted inside `ui5-segmented-button` as items
 * @public
 */
interface ISegmentedButtonItem extends UI5Element, ITabbable {
	disabled: boolean,
	selected: boolean,
}

type SegmentedButtonSelectionChangeEventDetail = {
	selectedItems: Array<ISegmentedButtonItem>,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
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
 * @param {Array<ISegmentedButtonItem>} selectedItems an array of selected items.
 * @public
 */
@event<SegmentedButtonSelectionChangeEventDetail>("selection-change", {
	detail: {
		/**
		 * @public
		 * @since 1.14.0
		 */
		selectedItems: { type: Array },
	},
})

class SegmentedButton extends UI5Element {
	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.0.3
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Defines the component selection mode.
	 * @default "Single"
	 * @public
	 * @since 1.14.0
	 */
	@property({ type: SegmentedButtonSelectionMode, defaultValue: SegmentedButtonSelectionMode.Single })
	selectionMode!: `${SegmentedButtonSelectionMode}`;

	/**
	 * Defines the items of `ui5-segmented-button`.
	 *
	 * **Note:** Multiple items are allowed.
	 *
	 * **Note:** Use the `ui5-segmented-button-item` for the intended design.
	 * @public
	 */
	@slot({ type: HTMLElement, invalidateOnChildChange: true, "default": true })
	items!: Array<ISegmentedButtonItem>;

	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	hasPreviouslyFocusedItem: boolean;

	_selectedItem?: ISegmentedButtonItem;

	static async onDefine() {
		SegmentedButton.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this.getSlottedNodes<SegmentedButtonItem>("items"),
		});
		this.hasPreviouslyFocusedItem = false;
	}

	onBeforeRendering() {
		const items = this.getSlottedNodes<SegmentedButtonItem>("items");

		items.forEach((item, index, arr) => {
			item.posInSet = index + 1;
			item.sizeOfSet = arr.length;
		});

		this.normalizeSelection();

		this.style.setProperty(getScopedVarName("--_ui5_segmented_btn_items_count"), `${items.length}`);
	}

	normalizeSelection() {
		if (!this.items.length) {
			return;
		}

		switch (this.selectionMode) {
		case SegmentedButtonSelectionMode.Single: {
			const selectedItems = this.selectedItems;
			const selectedItemIndex = this._selectedItem ? selectedItems.indexOf(this._selectedItem) : -1;
			if (this._selectedItem && selectedItems.length > 1) {
				selectedItems.splice(selectedItemIndex, 1);
			}
			const selectedItem = selectedItems.pop() || this.items[0];
			this._applySingleSelection(selectedItem);
			break;
		}
		default:
		}
	}

	_selectItem(e: MouseEvent | KeyboardEvent) {
		const target = e.target as SegmentedButtonItem;
		const isTargetSegmentedButtonItem = target.hasAttribute("ui5-segmented-button-item");

		if (target.disabled || target === this.getDomRef() || !isTargetSegmentedButtonItem) {
			return;
		}

		switch (this.selectionMode) {
		case SegmentedButtonSelectionMode.Multiple:
			if (e instanceof KeyboardEvent) {
				target.selected = !target.selected;
			}
			break;
		default:
			this._applySingleSelection(target);
		}

		this.fireEvent<SegmentedButtonSelectionChangeEventDetail>("selection-change", {
			selectedItems: this.selectedItems,
		});

		this._itemNavigation.setCurrentItem(target);

		return this;
	}

	_applySingleSelection(item: ISegmentedButtonItem) {
		this.items.forEach(currentItem => {
			currentItem.selected = false;
		});
		item.selected = true;
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
		if (this.selectedItems.length) {
			this._itemNavigation.setCurrentItem(this.selectedItems[0]);
			this.selectedItems[0].focus();
			this.hasPreviouslyFocusedItem = true;
		}
	}

	/**
	 * Returns an array of the currently selected items.
	 * @since 1.14.0
	 * @public
	 * @default []
	 */
	get selectedItems(): Array<ISegmentedButtonItem> {
		return this.items.filter(item => item.selected);
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
export type {
	SegmentedButtonSelectionChangeEventDetail,
	ISegmentedButtonItem,
};
