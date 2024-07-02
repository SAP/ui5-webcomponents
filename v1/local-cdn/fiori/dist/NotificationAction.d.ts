import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import type Button from "@ui5/webcomponents/dist/Button.js";
type NotificationActionClickEventDetail = {
    targetRef: Button;
};
/**
 * @class
 * The `ui5-notification-action` represents an abstract action,
 * used in the `ui5-li-notification` and the `ui5-li-notification-group` items.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @public
 */
declare class NotificationAction extends UI5Element {
    /**
     * Defines the text of the `ui5-notification-action`.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines if the action is disabled.
     *
     * **Note:** a disabled action can't be pressed or focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the action design.
     * @default "Transparent"
     * @public
     */
    design: `${ButtonDesign}`;
    /**
     * Defines the `icon` source URI.
     *
     * **Note:**
     * SAP-icons font provides numerous built-in icons. To find all the available icons, see the
     * [Icon Explorer](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html).
     * @default ""
     * @public
     */
    icon: string;
    /**
     * Fires a custom event "click".
     * **Note:** Called by NotificationListItem and NotificationListGroupItem components.
     * @param e
     * @protected
     * @returns false, if the event was cancelled (preventDefault called), true otherwise
     */
    fireClickEvent(e: MouseEvent): boolean;
}
export default NotificationAction;
export type { NotificationActionClickEventDetail, };
