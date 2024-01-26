import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";

import { registerToolbarItem } from "./ToolbarRegistry.js";

// Templates

import ToolbarSelectTemplate from "./generated/templates/ToolbarSelectTemplate.lit.js";
import ToolbarPopoverSelectTemplate from "./generated/templates/ToolbarPopoverSelectTemplate.lit.js";
import ToolbarItem from "./ToolbarItem.js";
import Select from "./Select.js";
import Option from "./Option.js";
import type ToolbarSelectOption from "./ToolbarSelectOption.js";
import type { SelectChangeEventDetail } from "./Select.js";

type ToolbarSelectChangeEventDetail = SelectChangeEventDetail;

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-select</code> component is used to create a toolbar drop-down list.
 * The items inside the <code>ui5-toolbar-select</code> define the available options by using the <code>ui5-toolbar-select-option</code> component.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/ToolbarSelect";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/ToolbarSelectOption";</code> (comes with <code>ui5-toolbar-select</code>)
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-select",
	dependencies: [Select, Option],
})

/**
 * Fired when the selected option changes.
 *
 * @allowPreventDefault
 * @param {HTMLElement} selectedOption the selected option.
 * @public
 */
@event<ToolbarSelectChangeEventDetail>("change", {
	detail: {
		/**
		* @public
		*/
		selectedOption: { type: HTMLElement },
	},
})

/**
 * Fired after the component's dropdown menu opens.
 *
 * @public
 */
@event("open")
/**
 * Fired after the component's dropdown menu closes.
 *
 * @public
 */
@event("close")

class ToolbarSelect extends ToolbarItem {
	/**
	 * Defines the width of the select.
	 * <br><br>
	 *
	 * <b>Note:</b> all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 *
	 * @default undefined
	 * @public
	 */
	@property({ validator: CSSSize })
	width?: string;

	/**
	 * Defines the component options.
	 *
	 * <br><br>
	 * <b>Note:</b> Only one selected option is allowed.
	 * If more than one option is defined as selected, the last one would be considered as the selected one.
	 *
	 * <br><br>
	 * <b>Note:</b> Use the <code>ui5-toolbar-select-option</code> component to define the desired options.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	options!: Array<ToolbarSelectOption>;

	/**
	 * Defines the value state of the component.
	 * <br><br>
	 *
	 * @default "None"
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is noninteractive.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @public
	 * @default ""
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the select.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	accessibleNameRef!: string;

	_onEvent: EventListener

	static get toolbarTemplate() {
		return ToolbarSelectTemplate;
	}

	static get toolbarPopoverTemplate() {
		return ToolbarPopoverSelectTemplate;
	}

	get subscribedEvents() {
		const map = new Map();

		map.set("click", { preventClosing: true });
		map.set("change", { preventClosing: false });
		map.set("open", { preventClosing: true });
		map.set("close", { preventClosing: true });

		return map;
	}

	constructor() {
		super();

		this._onEvent = this._onEventHandler.bind(this);
	}

	onEnterDOM(): void {
		this.attachEventListeners();
	}

	onExitDOM(): void {
		this.detachEventListeners();
	}

	attachEventListeners(): void {
		[...this.subscribedEvents.keys()].forEach(e => {
			this.addEventListener(e, this._onEvent);
		});
	}

	detachEventListeners(): void {
		[...this.subscribedEvents.keys()].forEach(e => {
			this.removeEventListener(e, this._onEvent);
		});
	}

	_onEventHandler(e: Event): void {
		if (e.type === "change") {
			// update options
			const selectedOption = (e as CustomEvent<ToolbarSelectChangeEventDetail>).detail.selectedOption;
			const selectedOptionIndex = Number(selectedOption?.getAttribute("data-ui5-external-action-item-index"));
			this.options.forEach((option: ToolbarSelectOption, index: number) => {
				if (index === selectedOptionIndex) {
					option.setAttribute("selected", "");
				} else {
					option.removeAttribute("selected");
				}
			});
		}
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
