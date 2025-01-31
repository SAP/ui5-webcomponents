import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import { registerToolbarItem } from "./ToolbarRegistry.js";

// Templates

import ToolbarSelectTemplate from "./ToolbarSelectTemplate.js";
import ToolbarPopoverSelectTemplate from "./ToolbarPopoverSelectTemplate.js";
import ToolbarItem from "./ToolbarItem.js";
import type { ToolbarItemEventDetail } from "./ToolbarItem.js";
import type ToolbarSelectOption from "./ToolbarSelectOption.js";
import type { SelectChangeEventDetail } from "./Select.js";

type ToolbarSelectChangeEventDetail = ToolbarItemEventDetail & SelectChangeEventDetail;

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-select` component is used to create a toolbar drop-down list.
 * The items inside the `ui5-toolbar-select` define the available options by using the `ui5-toolbar-select-option` component.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarSelect.js";`
 *
 * `import "@ui5/webcomponents/dist/ToolbarSelectOption.js";` (comes with `ui5-toolbar-select`)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-select",
})

/**
 * Fired when the selected option changes.
 * @param {HTMLElement} selectedOption the selected option.
 * @public
 */
@event("change", {
	bubbles: true,
	cancelable: true,
})

/**
 * Fired after the component's dropdown menu opens.
 * @public
 */
@event("open", {
	bubbles: true,
})

/**
 * Fired after the component's dropdown menu closes.
 * @public
 */
@event("close")
class ToolbarSelect extends ToolbarItem {
	eventDetails!: ToolbarItem["eventDetails"] & {
		change: ToolbarSelectChangeEventDetail;
		open: ToolbarItemEventDetail;
		close: ToolbarItemEventDetail;
	}
	/**
	 * Defines the width of the select.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @default undefined
	 * @public
	 */
	@property()
	width?: string;

	/**
	 * Defines the component options.
	 *
	 * **Note:** Only one selected option is allowed.
	 * If more than one option is defined as selected, the last one would be considered as the selected one.
	 *
	 * **Note:** Use the `ui5-toolbar-select-option` component to define the desired options.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	options!: Array<ToolbarSelectOption>;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @public
	 * @default undefined
	 */
	@property()
	accessibleName?: string

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 * @default undefined
	 * @public
	 */
	@property()
	accessibleNameRef?: string;

	static get toolbarTemplate() {
		return ToolbarSelectTemplate;
	}

	static get toolbarPopoverTemplate() {
		return ToolbarPopoverSelectTemplate;
	}

	onClick(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("click", { targetRef: e.target as HTMLElement });
		if (prevented && !this.preventOverflowClosing) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onOpen(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("open", { targetRef: e.target as HTMLElement });
		if (prevented) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onClose(e: Event): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("close", { targetRef: e.target as HTMLElement });
		if (prevented) {
			this.fireDecoratorEvent("close-overflow");
		}
	}

	onChange(e: CustomEvent<SelectChangeEventDetail>): void {
		e.stopImmediatePropagation();
		const prevented = !this.fireDecoratorEvent("change", { ...e.detail, targetRef: e.target as HTMLElement });
		if (!prevented) {
			this.fireDecoratorEvent("close-overflow");
		}

		this._syncOptions(e.detail.selectedOption);
	}

	_syncOptions(selectedOption: HTMLElement): void {
		const selectedOptionIndex = Number(selectedOption?.getAttribute("data-ui5-external-action-item-index"));
		this.options.forEach((option: ToolbarSelectOption, index: number) => {
			if (index === selectedOptionIndex) {
				option.setAttribute("selected", "");
			} else {
				option.removeAttribute("selected");
			}
		});
	}

	get styles() {
		return {
			width: this.width,
		};
	}
}

registerToolbarItem(ToolbarSelect);

ToolbarSelect.define();

export default ToolbarSelect;

export type {
	ToolbarSelectChangeEventDetail,
};
