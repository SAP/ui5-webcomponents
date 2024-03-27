import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ToolbarSpacerTemplate from "./generated/templates/ToolbarSpacerTemplate.lit.js";

import { IToolbarItem } from "./Toolbar.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-spacer` is an element, used for taking needed space for toolbar items to take 100% width.
 * It takes no space in calculating toolbar items width.
 * @constructor
 * @extends ToolbarItem
 * @abstract
 * @since 1.17.0
 * @public
 */
@customElement({
	tag: "ui5-toolbar-spacer",
	renderer: litRender,
	template: ToolbarSpacerTemplate,
})

class ToolbarSpacer extends UI5Element implements IToolbarItem {
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
	/**
	 * Defines the width of the spacer.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @public
	 * @default undefined
	 */
	@property({ validator: CSSSize })
	width?: string;

	get styles() {
		return this.width ? { width: this.width } : { flex: "auto" };
	}

	get ignoreSpace() {
		return this.width === "";
	}

	get hasFlexibleWidth() {
		return this.width === "";
	}

	get isInteractive() {
		return false;
	}
}

ToolbarSpacer.define();

export default ToolbarSpacer;
