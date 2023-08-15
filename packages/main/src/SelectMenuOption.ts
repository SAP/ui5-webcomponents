import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";

import type { IOption } from "./Select.js";

// Template
import CustomListItemTemplate from "./generated/templates/CustomListItemTemplate.lit.js";

// Styles
import CustomListItem from "./CustomListItem.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>select-menu-option</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/SelectMenuOption.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.SelectMenuOption
 * @extends sap.ui.webc.base.UI5Element
 * @implements sap.ui.webc.main.ISelectOption
 * @tagname select-menu-option
 * @public
 */
@customElement({
	tag: "ui5-select-menu-option",
	renderer: litRender,
	styles: CustomListItem.styles,
	template: CustomListItemTemplate,
	dependencies: [],
})

/**
 * Example custom event.
 * Please keep in mind that all public events should be documented in the API Reference as shown below.
 *
 * @event sap.ui.webc.main.SelectMenuOption#interact
 * @public
 */
@event("interact", { detail: { /* event payload ( optional ) */ } })
class SelectMenuOption extends CustomListItem implements IOption {
	/**
	 * Defines the text, displayed inside the <code>ui5-select</code> input filed
	 * when the option gets selected.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Option.prototype.value
	 * @public
	 */
	@property()
	displayText!: string;

	/**
	 * Defines the selected state of the component.
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.selected
	 * @public
	 */
	@property({ type: Boolean })
	selected!: boolean;

	/**
	 * Defines the value of the <code>ui5-select</code> inside an HTML Form element when this component is selected.
	 * For more information on HTML Form support, see the <code>name</code> property of <code>ui5-select</code>.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Option.prototype.value
	 * @public
	 */
	@property()
	value!: string;

	/**
	 * Defines the focused state of the component.
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	_focused!: boolean;

	/**
	 * Defines the content of the component.
	 * <br><br>
	 *
	 * @type {Node[]}
	 * @name sap.ui.webc.main.SelectMenuOption.prototype.default
	 * @slot
	 * @public
	 */
}

SelectMenuOption.define();

export default SelectMenuOption;
