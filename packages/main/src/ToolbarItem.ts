import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { TemplateFunction } from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

interface IEventOptions {
	preventClosing: boolean;
}

interface IToolbarItem {
	overflowPriority: `${ToolbarItemOverflowBehavior}`;
	preventOverflowClosing: boolean;
	ignoreSpace?: boolean;
	containsText?: boolean;
	hasFlexibleWidth?: boolean;
	toolbarTemplate: TemplateFunction;
	toolbarPopoverTemplate: TemplateFunction;
	subscribedEvents: Map<string, IEventOptions>;
	stableDomRef: string;
}

@customElement("ui5-tb-item")

/**
 * @class
 * The <code>ui5-tb-item</code> represents an abstract class for items,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarItem
 * @extends sap.ui.webc.base.UI5Element
 * @since 1.17.0
 * @abstract
 * @public
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
	 * @type {ToolbarItemOverflowBehavior}
	 */
	@property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
	overflowPriority!: `${ToolbarItemOverflowBehavior}`;

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @type {Boolean}
	 * @defaultvalue false
	 * @public
	 * @name sap.ui.webc.main.Toolbar.prototype.preventOverflowClosing
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	/**
	* Defines if the width of the item should be ignored in calculating the whole width of the toolbar
	* @returns {Boolean}
	* @protected
	* @abstract
	*/
	get ignoreSpace(): boolean {
		return false;
	}

	/**
	 * Returns if the item contains text. Used to position the text properly inside the popover.
	 * Aligned left if the item has text, default aligned otherwise.
	 * @protected
	 * @abstract
	 * @returns {Boolean}
	 */
	get containsText(): boolean {
		return false;
	}

	/**
	 * Returns if the item is flexible. An item that is returning true for this property will make
	 * the toolbar expand to fill the 100% width of its container.
	 * @protected
	 * @abstract
	 * @returns {Boolean}
	 */
	get hasFlexibleWidth(): boolean {
		return false;
	}

	/**
	 * Returns the template for the toolbar item.
	 * @protected
	 * @abstract
	 * @returns {TemplateFunction}
	 */
	get toolbarTemplate(): TemplateFunction {
		throw new Error("Template must be defined");
	}

	/**
	 * Returns the template for the toolbar item popover.
	 * @protected
	 * @abstract
	 * @returns {TemplateFunction}
	 */
	get toolbarPopoverTemplate(): TemplateFunction {
		throw new Error("Template must be defined");
	}

	/**
	 * Returns the events that the item is subscribed to.
	 * @protected
	 * @abstract
	 * @readonly
	 * @name sap.ui.webc.main.ToolbarItem.prototype.subscribedEvents
	 * @defaultvalue []
	 */
	get subscribedEvents(): Map<string, IEventOptions> {
		const map = new Map();
		map.set("click", { preventClosing: false });
		return map;
	}

	get stableDomRef() {
		return this.getAttribute("stable-dom-ref") || `${this._id}-stable-dom-ref`;
	}
}

ToolbarItem.define();

export type { ToolbarItem };
export default ToolbarItem;
