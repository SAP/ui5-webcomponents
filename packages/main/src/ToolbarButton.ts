import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

import ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

/**
 * @class
 * The <code>ui5-toolbar-button</code> represents an abstract action,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarButton
 * @extends sap.ui.webc.base.UI5Element
 * @since 1.17.0
 * @abstract
 * @public
 */

@customElement({
	tag: "ui5-toolbar-button",
	dependencies: [ToolbarItem],
})

/**
 * Fired when a toolbar button is clicked.
 *
 * @event sap.ui.webc.main.ToolbarButton#click
 * @public
 */

 @event("click", {})

class ToolbarButton extends ToolbarItem {
	/**
	 * Defines if the action is disabled.
	 * <br><br>
	 * <b>Note:</b> a disabled action can't be pressed or focused, and it is not in the tab chain.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @name sap.ui.webc.main.ToolbarButton.prototype.disabled
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the action design.
	 * <b>The available values are:</b>
	 *
	 * <ul>
	 * <li><code>Default</code></li>
	 * <li><code>Emphasized</code></li>
	 * <li><code>Positive</code></li>
	 * <li><code>Negative</code></li>
	 * <li><code>Transparent</code></li>
	 * <li><code>Attention</code></li>
	 * </ul>
	 *
	 * @type {ButtonDesign}
	 * @defaultvalue "Default"
	 * @name sap.ui.webc.main.ToolbarButton.prototype.design
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: `${ButtonDesign}`;

	/**
	 * Defines the <code>icon</code> source URI.
	 * <br><br>
	 * <b>Note:</b>
	 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @name sap.ui.webc.main.ToolbarButton.prototype.icon
	 * @public
	 */
	@property({ type: String })
	icon!: string;

	/**
	 * Button text
	 * @public
	 * @defaultvalue ""
	 * @type {string}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.text
	 */
	@property({ type: String })
	text!: string;

	/**
	 * Button width
	 * @name sap.ui.webc.main.ToolbarButton.prototype.width
	 * @defaultvalue ""
	 * @type {string}
	 * @public
	 */
	@property({ type: String })
	width!: string;

	get styles() {
		return {
			width: this.width,
			display: this.hidden ? "none" : "inline-block",
		};
	}

	get containsText() {
		return this.text !== undefined;
	}

	get hasFlexibleWidth() {
		return this.width !== undefined;
	}

	get toolbarTemplate() {
		return ToolbarButtonTemplate;
	}

	get toolbarPopoverTemplate() {
		return ToolbarPopoverButtonTemplate;
	}
}

ToolbarButton.define();

export default ToolbarButton;
