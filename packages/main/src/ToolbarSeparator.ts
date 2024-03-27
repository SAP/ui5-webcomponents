import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";

import ToolbarSeparatorTemplate from "./generated/templates/ToolbarSeparatorTemplate.lit.js";
import ToolbarSeparatorCss from "./generated/themes/ToolbarSeparator.css.js";

import { IToolbarItem } from "./Toolbar.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-separator` is an element, used for visual separation between two elements.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @since 1.17.0
 * @abstract
 * @public
 */
@customElement({
	tag: "ui5-toolbar-separator",
	renderer: litRender,
	template: ToolbarSeparatorTemplate,
	styles: [ToolbarSeparatorCss],
})

class ToolbarSeparator extends UI5Element implements IToolbarItem {
	/**
	 * Property used to define the access of the item to the overflow Popover. If "NeverOverflow" option is set,
	 * the item never goes in the Popover, if "AlwaysOverflow" - it never comes out of it.
	 * @public
	 * @default "Default"
	 */
	@property({ type: ToolbarItemOverflowBehavior, defaultValue: ToolbarItemOverflowBehavior.Default })
	overflowPriority!: `${ToolbarItemOverflowBehavior}`;

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the item.
	 * It will close by default.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	@property({ type: Boolean })
	overflowed!: boolean;

	@property({ type: Boolean })
	visible!: boolean;

	get isSeparator() {
		return true;
	}

	get isInteractive() {
		return false;
	}

	get preventOverflow() {
		return true;
	}
}

ToolbarSeparator.define();

export default ToolbarSeparator;
