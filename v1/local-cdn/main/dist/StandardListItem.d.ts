import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "./ListItem.js";
import type { IAccessibleListItem } from "./ListItem.js";
import WrappingType from "./types/WrappingType.js";
/**
 * @class
 * The `ui5-li` represents the simplest type of item for a `ui5-list`.
 *
 * This is a list item,
 * providing the most common use cases such as `text`,
 * `image` and `icon`.

 * @csspart title - Used to style the title of the list item
 * @csspart description - Used to style the description of the list item
 * @csspart additional-text - Used to style the additionalText of the list item
 * @csspart icon - Used to style the icon of the list item
 * @csspart native-li - Used to style the main li tag of the list item
 * @csspart content - Used to style the content area of the list item
 * @csspart detail-button - Used to style the button rendered when the list item is of type detail
 * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
 * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
 * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
 * @slot {Node[]} default - Defines the text of the component.
 *
 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
 * @constructor
 * @extends ListItem
 * @public
 */
declare class StandardListItem extends ListItem implements IAccessibleListItem {
    /**
     * Defines the description displayed right under the item text, if such is present.
     * @default ""
     * @public
     * @since 0.8.0
     */
    description: string;
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
     * Defines whether the `icon` should be displayed in the beginning of the list item or in the end.
     *
     * **Note:** If `image` is set, the `icon` would be displayed after the `image`.
     * @default false
     * @public
     */
    iconEnd: boolean;
    /**
     * Defines the `image` source URI.
     *
     * **Note:** The `image` would be displayed in the beginning of the list item.
     * @default ""
     * @public
     */
    image: string;
    /**
     * Defines the `additionalText`, displayed in the end of the list item.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    additionalText: string;
    /**
     * Defines the state of the `additionalText`.
     *
     * Available options are: `"None"` (by default), `"Success"`, `"Warning"`, `"Information"` and `"Error"`.
     * @default "None"
     * @public
     * @since 1.0.0-rc.15
     */
    additionalTextState: `${ValueState}`;
    /**
     * Defines the text alternative of the component.
     * Note: If not provided a default text alternative will be set, if present.
     * @default ""
     * @public
     * @since 1.0.0-rc.15
     */
    accessibleName: string;
    /**
     * Defines if the text of the component should wrap, they truncate by default.
     *
     * **Note:** this property takes affect only if text node is provided to default slot of the component
     * @default "None"
     * @private
     * @since 1.5.0
     */
    wrappingType: `${WrappingType}`;
    /**
     * Indicates if the list item has text content.
     * @private
     */
    hasTitle: boolean;
    _hasImageContent: boolean;
    /**
     * **Note:** While the slot allows option for setting custom avatar, to match the
     * design guidelines, please use the `ui5-avatar` with it's default size - S.
     *
     * **Note:** If bigger `ui5-avatar` needs to be used, then the size of the
     * `ui5-li` should be customized in order to fit.
     * @since 1.10.0
     * @public
     */
    imageContent: Array<HTMLElement>;
    onBeforeRendering(): void;
    get displayImage(): boolean;
    get displayIconBegin(): boolean;
    get displayIconEnd(): boolean;
    get hasImageContent(): boolean;
}
export default StandardListItem;
