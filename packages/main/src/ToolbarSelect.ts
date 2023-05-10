import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";

// Templates

import ToolbarPriority from "./types/ToolbarPriority.js";

import ToolbarSelectTemplate from "./generated/templates/ToolbarSelectTemplate.lit.js";
import ToolbarPopoverSelectTemplate from "./generated/templates/ToolbarPopoverSelectTemplate.lit.js";
import ToolbarItem from "./ToolbarItem.js";
import Option from "./Option.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-select</code> component is used to create a drop-down list.
 * The items inside the <code>ui5-toolbar-select</code> define the available options by using the <code>ui5-option</code> component.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-toolbar-select</code> provides advanced keyboard handling.
 * <br>
 * <ul>
 * <li>[F4, ALT+UP, ALT+DOWN, SPACE, ENTER] - Opens/closes the drop-down.</li>
 * <li>[UP, DOWN] - If the drop-down is closed - changes selection to the next or the previous option. If the drop-down is opened - moves focus to the next or the previous option.</li>
 * <li>[SPACE, ENTER] - If the drop-down is opened - selects the focused option.</li>
 * <li>[ESC] - Closes the drop-down without changing the selection.</li>
 * <li>[HOME] - Navigates to first option</li>
 * <li>[END] - Navigates to the last option</li>
 * </ul>
 * <br>
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
 * @since 0.8.0
 */
@customElement({
	tag: "ui5-toolbar-select",
})
class ToolbarSelect extends ToolbarItem {
	/**
	 * When set, the button will be always part of the overflow part of the toolbar.
	 * @public
	 * @defaultvalue ToolbarPriority.Default,
	 */
	@property({ type: ToolbarPriority })
	priority!: string;

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

	get ignoreSpace() {
		return false;
	}

	get toolbarTemplate() {
		return ToolbarSelectTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarPopoverSelectTemplate;
	}
}

ToolbarSelect.define();

export default ToolbarSelect;
