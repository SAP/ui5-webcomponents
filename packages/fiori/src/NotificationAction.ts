import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type Button from "@ui5/webcomponents/dist/Button.js";

type NotificationActionClickEventDetail = {
	targetRef: Button,
};

/**
 * @class
 * The `ui5-notification-action` represents an abstract action,
 * used in the `ui5-li-notification` and the `ui5-li-notification-group` items.
 *
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
@customElement("ui5-notification-action")

/**
 * Fired, when the action is pressed.
 *
 * @param {HTMLElement} targetRef DOM ref of the clicked element
 * @public
 */
@event<NotificationActionClickEventDetail>("click", {
	detail: {
		targetRef: { type: HTMLElement },
	},
})
class NotificationAction extends UI5Element {
	/**
	 * Defines the text of the `ui5-notification-action`.
	 *
	 * @default ""
	 * @public
	 */
	@property()
	text!: string;

	/**
	 * Defines if the action is disabled.
	 *
	 * **Note:** a disabled action can't be pressed or focused, and it is not in the tab chain.
	 *
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;

	/**
	 * Defines the action design.
	 *
	 * @default "Transparent"
	 * @public
	 */
	@property({ type: ButtonDesign, defaultValue: ButtonDesign.Transparent })
	design!: `${ButtonDesign}`;

	/**
	 * Defines the `icon` source URI.
	 *
	 * **Note:**
	 * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
	 * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
	 *
	 * @default ""
	 * @public
	 */
	@property()
	icon!: string;

	/**
	 * Fires a custom event "click".
	 * **Note:** Called by NotificationListItem and NotificationListGroupItem components.
	 *
	 * @param e
	 * @protected
	 * @returns false, if the event was cancelled (preventDefault called), true otherwise
	 */
	fireClickEvent(e: MouseEvent): boolean {
		return this.fireEvent<NotificationActionClickEventDetail>("click", {
			targetRef: (e.target as Button),
		}, true);
	}
}

NotificationAction.define();

export default NotificationAction;

export type {
	NotificationActionClickEventDetail,
};
