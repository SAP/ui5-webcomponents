import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import Button from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";
import type { IEventOptions } from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

import ToolbarButtonPopoverCss from "./generated/themes/ToolbarButtonPopover.css.js";

import { registerToolbarItem } from "./ToolbarRegistry.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-toolbar-button</code> represents an abstract action,
 * used in the <code>ui5-toolbar</code>.
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/ToolbarButton";</code>
 *
 * @constructor
 * @abstract
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarButton
 * @extends sap.ui.webc.main.ToolbarItem
 * @tagname ui5-toolbar-button
 * @public
 * @implements sap.ui.webc.main.IToolbarItem
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-button",
	dependencies: [Button],
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 * <br><br>
 * <b>Note:</b> The event will not be fired if the <code>disabled</code>
 * property is set to <code>true</code>.
 *
 * @event sap.ui.webc.main.ToolbarButton#click
 * @public
 */
@event("click")
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
	@property()
	icon!: string;

	/**
	 * Defines whether the icon should be displayed after the component text.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.iconEnd
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * Defines the tooltip of the component.
	 * <br>
	 * <b>Note:</b> A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @type {string}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.tooltip
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.accessibleName
	 * @defaultvalue undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * An object of strings that defines several additional accessibility attribute values
	 * for customization depending on the use case.
	 *
	 * It supports the following fields:
	 *
	 * <ul>
	 * 		<li><code>expanded</code>: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 *			<ul>
	 *				<li><code>true</code></li>
	 *				<li><code>false</code></li>
	 *			</ul>
	 * 		</li>
	 * 		<li><code>hasPopup</code>: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values:
	 * 			<ul>
	 *				<li><code>Dialog</code></li>
	 *				<li><code>Grid</code></li>
	 *				<li><code>ListBox</code></li>
	 *				<li><code>Menu</code></li>
	 *				<li><code>Tree</code></li>
	 * 			</ul>
	 * 		</li>
	 * 		<li><code>controls</code>: Identifies the element (or elements) whose contents or presence are controlled by the button element. Accepts a string value.</li>
	 * </ul>
	 * @type {object}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.accessibilityAttributes
	 * @public
	 */
	@property({ type: Object })
	accessibilityAttributes!: { expanded: "true" | "false", hasPopup: "Dialog" | "Grid" | "ListBox" | "Menu" | "Tree", controls: string};

	/**
	 * Button text
	 * @public
	 * @defaultvalue ""
	 * @type {string}
	 * @name sap.ui.webc.main.ToolbarButton.prototype.text
	 */
	@property()
	text!: string;

	/**
	 * Defines the width of the button.
	 * <br><br>
	 *
	 * <b>Note:</b> all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 *
	 * @name sap.ui.webc.main.ToolbarButton.prototype.width
	 * @defaultvalue undefined
	 * @type { sap.ui.webc.base.types.CSSSize }
	 * @public
	 */
	@property({ validator: CSSSize })
	width?: string;

	static get staticAreaStyles() {
		return ToolbarButtonPopoverCss;
	}

	get styles() {
		return {
			width: this.width,
			display: this.hidden ? "none" : "inline-block",
		};
	}

	get containsText() {
		return true;
	}

	static get toolbarTemplate() {
		return ToolbarButtonTemplate;
	}

	static get toolbarPopoverTemplate() {
		return ToolbarPopoverButtonTemplate;
	}

	get subscribedEvents(): Map<string, IEventOptions> {
		const map = new Map();
		map.set("click", { preventClosing: false });
		return map;
	}
}

registerToolbarItem(ToolbarButton);

ToolbarButton.define();

export default ToolbarButton;
