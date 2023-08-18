import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";

import { registerToolbarItem } from "./features/ToolbarRegistry.js";

// Templates

import ToolbarSelectTemplate from "./generated/templates/ToolbarSelectTemplate.lit.js";
import ToolbarPopoverSelectTemplate from "./generated/templates/ToolbarPopoverSelectTemplate.lit.js";
import ToolbarItem from "./ToolbarItem.js";
import Option from "./Option.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-select</code> component is used to create a toolbar drop-down list.
 * The items inside the <code>ui5-toolbar-select</code> define the available options by using the <code>ui5-option</code> component.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/Select";</code>
 * <br>
 * <code>import "@ui5/webcomponents/dist/Option";</code> (comes with <code>ui5-toolbar-select</code>)
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarSelect
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-toolbar-select
 * @appenddocs sap.ui.webc.main.Option
 * @public
 * @since 1.16.0
 */
@customElement({
	tag: "ui5-toolbar-select",
})

/**
 * Fired when the selected option changes.
 *
 * @event sap.ui.webc.main.ToolbarSelect#change
 * @allowPreventDefault
 * @param {HTMLElement} selectedOption the selected option.
 * @public
 */
@event("change", {
	detail: {
		selectedOption: { type: HTMLElement },
	},
})
class ToolbarSelect extends ToolbarItem {
    @property({ type: String })
	width!: string;

	/**
	 * When set, the button will not be visible in the toolbar
	 * @private
	 */
	@property({ type: Boolean })
	hidden!: boolean;

	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	options!: Array<Option>;

	/**
	 * Defines the value state of the component.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>None</code></li>
	 * <li><code>Error</code></li>
	 * <li><code>Warning</code></li>
	 * <li><code>Success</code></li>
	 * <li><code>Information</code></li>
	 * </ul>
	 *
	 * @type {sap.ui.webc.base.types.ValueState}
	 * @defaultvalue "None"
	 * @name sap.ui.webc.main.ToolbarSelect.prototype.valueState
	 * @public
	 */
	@property({ type: ValueState, defaultValue: ValueState.None })
	valueState!: `${ValueState}`;

	/**
	 * Defines whether the component is in disabled state.
	 * <br><br>
	 * <b>Note:</b> A disabled component is noninteractive.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.ToolbarSelect.prototype.disabled
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

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

		return map;
	}
}

registerToolbarItem(ToolbarSelect);

ToolbarSelect.define();

export default ToolbarSelect;
