import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";

import ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

@customElement({
	tag: "ui5-toolbar-button",
})

/**
 * @event
 */
@event("click", {})

/**
 * @class
 * The <code>ui5-toolbar-button</code> represents an abstract action,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias ToolbarButton
 * @extends UI5Element
 * @public
 */
class ToolbarButton extends ToolbarItem {
	/**
	 * Defines if the action is disabled.
	 * <br><br>
	 * <b>Note:</b> a disabled action can't be pressed or focused, and it is not in the tab chain.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the action design.
	 * <br><br>
	 * <b>Note:</b> Available options are "Default", "Emphasized", "Positive",
	 * "Negative", and "Transparent".
	 *
	 * @type {ButtonDesign}
	 * @defaultvalue "Transparent"
	 * @public
	 */
	@property({ type: ButtonDesign })
	design!: ButtonDesign;

	/**
	 * Defines the <code>icon</code> source URI.
	 * <br><br>
	 * <b>Note:</b>
	 * SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * <ui5-link target="_blank" href="https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html" class="api-table-content-cell-link">Icon Explorer</ui5-link>.
	 *
	 * @type {string}
	 * @defaultvalue ""
	 * @public
	 */
	@property({ type: String })
	icon!: string;

	/**
	 * Button text
	 * @public
	 */
	@property({ type: String })
	text!: string;

	/**
	 * Button width
	 * @public
	 */
	@property({ type: String })
	width!: string;

	get styles() {
		return {
			width: this.width,
			display: this.hidden ? "none" : "block",
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
