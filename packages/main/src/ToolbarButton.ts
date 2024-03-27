import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import Button from "./Button.js";
import type { AccessibilityAttributes as ButtonAccessibilityAttributes } from "./Button.js";

import type { IEventOptions } from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

import ToolbarItemCss from "./generated/themes/ToolbarItem.css.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import { IToolbarItem } from "./Toolbar.js";

type AccessibilityAttributes = ButtonAccessibilityAttributes;

/**
 * @class
 *
 * ### Overview
 * The `ui5-toolbar-button` represents an abstract action,
 * used in the `ui5-toolbar`.
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/ToolbarButton.js";`
 * @constructor
 * @abstract
 * @extends ToolbarItem
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar-button",
	styles: [
		Button.styles,
		ToolbarItemCss,
	],
})

/**
 * Fired when the component is activated either with a
 * mouse/tap or by using the Enter or Space key.
 *
 * **Note:** The event will not be fired if the `disabled`
 * property is set to `true`.
 * @public
 */
@event("click")
class ToolbarButton extends Button implements IToolbarItem {
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

	get containsText() {
		return true;
	}

	async onBeforeRendering() {
		await super.onBeforeRendering();
		if (this.overflowed) {
			this.setAttribute("hidden", "true");
		} else {
			this.removeAttribute("hidden");
		}
	}

	static get toolbarTemplate() {
		return ToolbarButtonTemplate;
	}

	static get toolbarPopoverTemplate() {
		return ToolbarPopoverButtonTemplate;
	}

	onMenuItemClick(e: Event) {
		this.fireEvent("click", { targetRef: e.target });
	}

	get subscribedEvents(): Map<string, IEventOptions> {
		const map = new Map();
		map.set("click", { preventClosing: false });
		return map;
	}

	get toolbarDisplayText() {
		return this.textContent || "";
	}
}

ToolbarButton.define();

export default ToolbarButton;

export type {
	AccessibilityAttributes,
};
