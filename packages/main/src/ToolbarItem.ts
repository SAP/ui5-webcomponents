import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { TemplateFunction } from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

type IEventOptions = {
	preventClosing: boolean;
}

interface IToolbarItem {
	overflowPriority: `${ToolbarItemOverflowBehavior}`;
	preventOverflowClosing: boolean;
	ignoreSpace?: boolean;
	isSeparator?: boolean;
	containsText?: boolean;
	hasFlexibleWidth?: boolean;
	stableDomRef: string;
}

/**
 * @class
 *
 * Represents an abstract class for items, used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarItem
 * @extends sap.ui.webc.base.UI5Element
 * @abstract
 * @public
 * @since 1.17.0
 */
class ToolbarItem extends UI5Element implements IToolbarItem {
	/**
	 * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	 * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	 * Available options are:
	 * <ul>
	 * <li><code>NeverOverflow</code></li>
	 * <li><code>AlwaysOverflow</code></li>
	 * <li><code>Default</code></li>
	 * </ul>
	 * @public
	 * @name sap.ui.webc.main.ToolbarItem.prototype.overflowPriority
	 * @defaultvalue "Default"
	 * @type {sap.ui.webc.main.types.ToolbarItemOverflowBehavior}
	 */
	@property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
	overflowPriority!: `${ToolbarItemOverflowBehavior}`;

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @type {boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.main.ToolbarItem.prototype.preventOverflowClosing
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	/**
	* Defines if the width of the item should be ignored in calculating the whole width of the toolbar
	* @returns {boolean}
	* @protected
	*/
	get ignoreSpace(): boolean {
		return false;
	}

	/**
	 * Returns if the item contains text. Used to position the text properly inside the popover.
	 * Aligned left if the item has text, default aligned otherwise.
	 * @protected
	 * @returns {boolean}
	 */
	get containsText(): boolean {
		return false;
	}

	/**
	 * Returns if the item is flexible. An item that is returning true for this property will make
	 * the toolbar expand to fill the 100% width of its container.
	 * @protected
	 * @returns {Boolean}
	 */
	get hasFlexibleWidth(): boolean {
		return false;
	}

	/**
	 * Returns if the item is interactive.
	 * This value is used to determinate if the toolbar should have its accessibility role and attributes set.
	 * At least two interactive items are needed for the toolbar to have the role="toolbar" attribute set.
	 * @protected
	 * @returns {boolean}
	 */
	get isInteractive(): boolean {
		return true;
	}

	/**
	 * Returns if the item is separator.
	 * @protected
	 * @returns {boolean}
	 */
	get isSeparator() {
		return false;
	}

	/**
	 * Returns the template for the toolbar item.
	 * @protected
	 * @returns {TemplateFunction}
	 */
	static get toolbarTemplate(): TemplateFunction {
		throw new Error("Template must be defined");
	}

	/**
	 * Returns the template for the toolbar item popover.
	 * @protected
	 * @returns {TemplateFunction}
	 */
	static get toolbarPopoverTemplate(): TemplateFunction {
		throw new Error("Popover template must be defined");
	}

	/**
	 * Returns the events that the item is subscribed to.
	 * @protected
	 * @returns {Map}
	 */
	get subscribedEvents(): Map<string, IEventOptions> {
		return new Map();
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

export type {
	IToolbarItem,
	IEventOptions,
};
export default ToolbarItem;
