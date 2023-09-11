import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import CalendarType from "@ui5/webcomponents-base/dist/types/CalendarType.js";
import type { IFormElement } from "./features/InputElementsFormSupport.js";

/**
* @class
*
* <h3 class="comment-api-title">Overview</h3>
*
* The <code>ui5-button</code> component represents a simple push button.
* It enables users to trigger actions by clicking or tapping the <code>ui5-button</code>, or by pressing
* certain keyboard keys, such as Enter.
*
*
* <h3>Usage</h3>
*
* For the <code>ui5-button</code> UI, you can define text, icon, or both. You can also specify
* whether the text or the icon is displayed first.
* <br><br>
* You can choose from a set of predefined types that offer different
* styling to correspond to the triggered action.
* <br><br>
* You can set the <code>ui5-button</code> as enabled or disabled. An enabled
* <code>ui5-button</code> can be pressed by clicking or tapping it. The button changes
* its style to provide visual feedback to the user that it is pressed or hovered over with
* the mouse cursor. A disabled <code>ui5-button</code> appears inactive and cannot be pressed.
*
* <h3>CSS Shadow Parts</h3>
*
* <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
* <br>
* The <code>ui5-button</code> exposes the following CSS Shadow Parts:
* <ul>
* <li>button - Used to style the native button element</li>
* </ul>
*
* <h3>ES6 Module Import</h3>
*
* <code>import "@ui5/webcomponents/dist/Button";</code>
*
* @slot {Node[]} default - Defines the text of the component.
* <br><br>
* <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
* @cssprop --text-color - Controls the color of foo
*
* @extends sap.ui.webc.base.UI5Element
* @since 1.0.0-rc.12
* @appenddocs sap.ui.webc.main.ColorPaletteItem
* @public
* @abstract
* @implements sap.ui.webc.fiori.IFilterItemOption
*/
@customElement("ui5-button2333")
/**
* Fired when the component is activated either with a
* mouse/tap or by using the Enter or Space key.
* <br><br>
* <b>Note:</b> The event will not be fired if the <code>disabled</code>
* property is set to <code>true</code>.
*
* @public
* @param {Object} rawBytes the scan result as a Uint8Array
* @deprecated Deprecated in version 1.16.0
* @allowPreventDefault
* @since Added in version 1.1.0
* @native
*/
@event("eventWithDetails", {
	detail: {
		/**
		* @public
		* @deprecated Deprecated in version 1.14.0
		* @since Parameter is added in version 1.14.0
		*/
		rawBytes: { type: HTMLElement },
	},
})
/**
* Fired when the component is activated either with a
* mouse/tap or by using the Enter or Space key.
* <br><br>
* <b>Note:</b> The event will not be fired if the <code>disabled</code>
* property is set to <code>true</code>.
*
* @public
* @native
* @deprecated Deprecated in version 1.16.0
* @allowPreventDefault
* @since Added in version 1.1.0
* @native
*/
@event("event")
class Button2 extends UI5Element implements IFormElement {
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
	* @public
	* @since 1.2.0
	* @deprecated 12aldfoasdfkaosdfkaskodfasdf
	* @default "asdasdADSA"
	*/
	@property({ type: Object })
	property!: { expanded: "true" | "false", hasPopup: "Dialog" | "Grid" | "ListBox" | "Menu" | "Tree", controls: string };

	/**
	* Defines the text of the component.
	* <br><br>
	* <b>Note:</b> Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	*
	* @type {sap.ui.webc.fiori.IFilterItemOption[]}
	* @slot asdfasdfasdf
	* @public
	* @deprecated asdfasdf
	* @since 1.12.0
	*/
	@slot()
	propertySlot!: Array<Node>;

	/**
	* Shows the popover.
	* @param {HTMLElement} opener the element that the popover is shown at
	* @param {boolean} [preventInitialFocus=false] prevents applying the focus inside the popover
	* @public
	* @deprecated asdaasdasdasdasd
	* @method
	* @returns {Promise} Resolved when the popover is open
	*/
	async methodDescription(opener: HTMLElement, preventInitialFocus = CalendarType.Gregorian) {

	}

	/**
	* Returns an array containing the <code>AvatarColorScheme</code> values that correspond to the avatars in the component.
	* @type {sap.ui.webc.main.types.AvatarColorScheme[]}
	* @default []
	* @public
	*/
	get getterDescription() {
		return [];
	}

	/**
	* Hook that will be called upon custom element definition
	*
	* @protected
	* @returns {Promise<void>}
	*/
	static async staticMethodDescription() {
		return Promise.resolve();
	}
}

Button2.define();

export default Button2;
