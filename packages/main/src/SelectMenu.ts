import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

// Template
import SelectMenuTemplate from "./generated/templates/SelectMenuTemplate.lit.js";

// Styles
import SelectMenuCss from "./generated/themes/SelectMenu.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

// Deps
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";

// Types
import type Select from "./Select.js";
import type SelectMenuOption from "./SelectMenuOption.js";

type SelectMenuOptionClick = {
	option: SelectMenuOption,
	optionIndex: number,
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>select-menu</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SelectMenu.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SelectMenu
 * @extends sap.ui.webc.base.UI5Element
 * @tagname select-menu
 * @public
 */
@customElement({
	tag: "ui5-select-menu",
	renderer: litRender,
	styles: [SelectMenuCss, ValueStateMessageCss],
	template: SelectMenuTemplate,
	dependencies: [
		ResponsivePopover,
		List,
	],
})
class SelectMenu extends UI5Element {
	constructor() {
		super();

		this.valueStateMessageText = [];
	}

	/**
	 * Defines the text of the component.
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.SelectMenu.prototype.default
	 * @slot
	 * @public
	 */
	@slot({
		"default": true,
		type: HTMLElement,
		invalidateOnChildChange: true,
	})
	options!: Array<SelectMenuOption>;

	/**
	 * Defines the width of the component.
	 *
	 * @type { number }
	 * @name sap.ui.webc.main.SelectMenu.prototype.selectWidth
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

	valueStateMessageText: Array<Node>;

	select?: Select;

	/**
	 * Shows the dropdown at the given element.
	 */
	showAt(opener: Select, openerWidth: number) {
		this.respPopover.open = true;
		this.respPopover.opener = opener;
		this.selectWidth = openerWidth;
		this.hasValueState = !!opener.hasValueState;
		this.hasValueStateSlot = opener.valueStateMessageText.length > 0;
		debugger;
		this.valueStateText = opener.valueStateText;
		this.valueStateMessageText = opener.valueStateMessageText;
		this.valueState = opener.valueState;
	}

	/**
	 * Closes the dropdown.
	 */
	close() {
		this.respPopover.open = false;
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

	onAfterRendering(): void {
		this.fireEvent<CustomEvent>("menu-rendered");
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
				"ui5-valuestatemessage--success": this.valueState === ValueState.Success,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Error,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Warning,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
			popover: {
				"ui5-select-popover-valuestate": this.hasValueState,
			},
		};
	}

	get styles() {
		return {
			responsivePopover: {
				width: this.selectWidth || "auto",
			},
			responsivePopoverHeader: {
				"display": this.options.length && this.respPopover?.offsetWidth === 0 ? "none" : "inline-block",
				"width": `${this.options.length ? this.respPopover?.offsetWidth : this.selectWidth || "auto"}px`,
			},
		};
	}

	get _valueStateMessageInputIcon() {
		const iconPerValueState = {
			Error: "error",
			Warning: "alert",
			Success: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}
}

SelectMenu.define();

export default SelectMenu;
export type {
	SelectMenuOptionClick,
};
