import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import CSSSize from "@ui5/webcomponents-base/dist/types/CSSSize.js";
import Button from "./Button.js";
import type { AccessibilityAttributes as ButtonAccessibilityAttributes } from "./Button.js";
import ButtonDesign from "./types/ButtonDesign.js";

import ToolbarItem from "./ToolbarItem.js";
import type { IEventOptions } from "./ToolbarItem.js";
import ToolbarButtonTemplate from "./generated/templates/ToolbarButtonTemplate.lit.js";
import ToolbarPopoverButtonTemplate from "./generated/templates/ToolbarPopoverButtonTemplate.lit.js";

import ToolbarButtonPopoverCss from "./generated/themes/ToolbarButtonPopover.css.js";

import { registerToolbarItem } from "./ToolbarRegistry.js";

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
	dependencies: [Button],
	styles: ToolbarButtonPopoverCss,
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
class ToolbarButton extends ToolbarItem {
	/**
	 * Defines if the action is disabled.
	 *
	 * **Note:** a disabled action can't be pressed or focused, and it is not in the tab chain.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the action design.
	 * @default "Default"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Default })
	design!: `${ButtonDesign}`;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:** SAP-icons font provides numerous buil-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Defines whether the icon should be displayed after the component text.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	iconEnd!: boolean;

	/**
	 * Defines the tooltip of the component.
	 *
	 * **Note:** A tooltip attribute should be provided for icon-only buttons, in order to represent their exact meaning/function.
	 * @default ""
	 * @public
	 */
	@property()
	tooltip!: string;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Receives id(or many ids) of the elements that label the component.
	 * @default ""
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
	 * - `expanded`: Indicates whether the button, or another grouping element it controls, is currently expanded or collapsed. Accepts the following string values:
	 * 	- `true`
	 * 	- `false`
	 * - `hasPopup`: Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by the button. Accepts the following string values:
	 * 	- `Dialog`
	 * 	- `Grid`
	 * 	- `ListBox`
	 * 	- `Menu`
	 * 	- `Tree`
	 * - `controls`: Identifies the element (or elements) whose contents or presence are controlled by the button element. Accepts a string value.
	 * @default {}
	 * @public
	 */
	@property({ type: Object })
	accessibilityAttributes!: AccessibilityAttributes;

	/**
	 * Button text
	 * @public
	 * @default ""
	 */
	@property()
	text!: string;

	/**
	 * Defines the width of the button.
	 *
	 * **Note:** all CSS sizes are supported - 'percentage', 'px', 'rem', 'auto', etc.
	 * @default undefined
	 * @public
	 */
	@property({ validator: CSSSize })
	width?: string;

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

export type {
	AccessibilityAttributes,
};
