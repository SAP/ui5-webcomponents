import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { TemplateFunction } from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";

import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

@customElement({
	tag: "ui5-tb-item",
})

/**
 * @class
 * The <code>ui5-tb-item</code> represents an abstract class for items,
 * used in the <code>ui5-toolbar</code>.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ToolbarItem
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
class ToolbarItem extends UI5Element {
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
	 * @defaultvalue ToolbarItemOverflowBehavior.Default,
	 */
	@property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
	overflowPriority!: `${ToolbarItemOverflowBehavior}`;

	/*
	* Defines if the width of the item should be ignored in calculating the whole width of the toolbar
	*/
	get ignoreSpace() {
		return false;
	}

	get containsText() {
		return false;
	}

	get hasFlexibleWidth() {
		return false;
	}

	get toolbarTemplate(): TemplateFunction {
		throw new Error("Template must be defined");
	}

	get toolbarPopoverTemplate(): TemplateFunction {
		throw new Error("Template must be defined");
	}
}

ToolbarItem.define();

export default ToolbarItem;
