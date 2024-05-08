import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";

// Template
import SelectMenuTemplate from "./generated/templates/SelectMenuTemplate.lit.js";

// Styles
import SelectMenuCss from "./generated/themes/SelectMenu.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";

// Deps
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import Button from "./Button.js";

// Types
import type Select from "./Select.js";
import type SelectMenuOption from "./SelectMenuOption.js";
import type { IOption } from "./Select.js";

type SelectMenuOptionClick = {
	option: SelectMenuOption,
	optionIndex: number,
};

type SelectMenuChange = {
	text: string,
	selectedIndex: number,
};

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-select-menu` is meant to be used together with the `ui5-select` component as alternative
 * to define the select's dropdown. It acts as a popover on desktop and tablet, and as a Dialog on phone.
 *
 * The component gives the possibility to the user to customize the `ui5-select`'s dropdown
 * by slotting custom options and adding custom styles.
 *
 * ### Usage
 *
 * To use `ui5-select` with a `ui5-select-menu`,
 * you need to set the `ui5-select` `menu` property to reference `ui5-select-menu` either by ID or DOM reference.
 *
 * For the `ui5-select-menu`
 * ### ES6 Module Import
 *
 * `import @ui5/webcomponents/dist/SelectMenu.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-select-menu",
	renderer: litRender,
	styles: [SelectMenuCss, ValueStateMessageCss, ResponsivePopoverCommonCss],
	template: SelectMenuTemplate,
	dependencies: [
		ResponsivePopover,
		List,
		Button,
	],
})
@event<SelectMenuOptionClick>("option-click", {
	detail: {
		option: { type: HTMLElement },
		optionIndex: { type: Integer },
	},
})
@event("before-open")
@event("after-open")
@event("after-close")
@event<SelectMenuChange>("menu-change", {
	detail: {
		text: { type: String },
		selectedIndex: { type: Integer },
	},
})
class SelectMenu extends UI5Element {
	constructor() {
		super();

		this.valueStateMessageText = [];
	}

	/**
	 * Defines the options of the component.
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	options!: Array<IOption>;

	/**
	 * Defines the width of the component.
	 * @private
	 */
	@property({ validator: Integer })
	selectWidth?: number;

	@property({ type: Boolean })
	hasValueState!: boolean;

	@property({ type: Boolean })
	hasValueStateSlot!: boolean;

	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	@property()
	valueStateText!: string;

	@property({ type: String, noAttribute: true })
	value!: string;

	@property({ type: String, noAttribute: true })
	selectId?: string;

	valueStateMessageText: Array<Node>;

	_headerTitleText?: string;

	select?: Select;

	/**
	 * Shows the dropdown at the given element.
	 */
	showAt(opener: Select, openerWidth: number) {
		this.selectWidth = openerWidth;
		this.respPopover.open = true;
		this.respPopover.opener = opener;
		this.hasValueState = !!opener.hasValueState;
		this.hasValueStateSlot = opener.valueStateMessageText.length > 0;
		this.valueStateText = opener.valueStateText;
		this.valueStateMessageText = opener.valueStateMessageText;
		this.valueState = opener.valueState;

		this._headerTitleText = opener._headerTitleText;
	}

	/**
	 * Closes the dropdown.
	 */
	close(preventFocusRestore = false) {
		this.respPopover.preventFocusRestore = preventFocusRestore;
		this.respPopover.open = false;
	}

	onBeforeRendering() {
		this._syncSelection();
	}

	_syncSelection() {
		let lastSelectedOptionIndex = -1,
			firstEnabledOptionIndex = -1,
			text,
			selectedIndex;
		const options = this.options;
		options.forEach((opt, index) => {
			if (opt.selected) {
				lastSelectedOptionIndex = index;
			}
			if (firstEnabledOptionIndex === -1) {
				firstEnabledOptionIndex = index;
			}

			opt.selected = false;
			opt.focused = false;
			return opt;
		});

		if (lastSelectedOptionIndex > -1) {
			const lastSelectedOption = options[lastSelectedOptionIndex];
			lastSelectedOption.selected = true;
			lastSelectedOption.focused = true;
			text = lastSelectedOption.displayText || String(lastSelectedOption.textContent);
			selectedIndex = lastSelectedOptionIndex;
		} else {
			text = "";
			selectedIndex = -1;
			const firstSelectedOption = options[firstEnabledOptionIndex];
			if (firstSelectedOption) {
				firstSelectedOption.selected = true;
				firstSelectedOption.focused = true;
				selectedIndex = firstEnabledOptionIndex;
				text = firstSelectedOption.displayText || String(firstSelectedOption.textContent);
			}
		}

		this.fireEvent<SelectMenuChange>("menu-change", {
			text,
			selectedIndex,
		});
	}

	_onOptionClick(e: CustomEvent) {
		const option = e.detail.item;
		const optionIndex = this.options.findIndex(_option => option.__id === _option.__id);

		this.fireEvent<SelectMenuOptionClick>("option-click", {
			option,
			optionIndex,
		});
	}

	_onBeforeOpen() {
		this.fireEvent<CustomEvent>("before-open");
	}

	_onAfterOpen() {
		this.fireEvent<CustomEvent>("after-open");
	}

	_onAfterClose() {
		this.fireEvent<CustomEvent>("after-close");
	}

	_onCloseBtnClick() {
		this.close();
	}

	get open() {
		return !!this.respPopover?.open;
	}

	get respPopover() {
		return this.shadowRoot!.querySelector<ResponsivePopover>(".ui5-select-menu")!;
	}

	get classes() {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
			popover: {
				"ui5-select-popover-valuestate": this.hasValueState,
			},
		};
	}

	get styles() {
		return {
			valueStatePopover: {
				"width": `${this.selectWidth!}px`,
			},
			responsivePopover: {
				"min-width": `${this.selectWidth!}px`,
			},
		};
	}

	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Negative: "error",
			Critical: "alert",
			Positive: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get _isPhone() {
		return isPhone();
	}
}

SelectMenu.define();

export default SelectMenu;
export type {
	SelectMenuOptionClick,
	SelectMenuChange,
};
