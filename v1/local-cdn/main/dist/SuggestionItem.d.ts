import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItemType from "./types/ListItemType.js";
import type { IInputSuggestionItem } from "./Input.js";
/**
 * @class
 * The `ui5-suggestion-item` represents the suggestion item of the `ui5-input`.
 * @constructor
 * @extends UI5Element
 * @abstract
 * @implements { IInputSuggestionItem }
 * @public
 */
declare class SuggestionItem extends UI5Element implements IInputSuggestionItem {
    /**
     * Defines the text of the component.
     * @default ""
     * @public
     */
    text: string;
    /**
     * Defines the visual indication and behavior of the item.
     * Available options are `Active` (by default), `Inactive` and `Detail`.
     *
     * **Note:** When set to `Active`, the item will provide visual response upon press and hover,
     * while when `Inactive` or `Detail` - will not.
     * @default "Active"
     * @public
     * @since 1.0.0-rc.8
    */
    type: `${ListItemType}`;
    /**
     * Defines the description displayed right under the item text, if such is present.
     * @default ""
     * @public
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
     * Defines whether the `icon` should be displayed in the beginning of the item or in the end.
     *
     * **Note:** If `image` is set, the `icon` would be displayed after the `image`.
     * @default false
     * @public
     */
    iconEnd: boolean;
    /**
     * Defines the `image` source URI.
     *
     * **Note:** The `image` would be displayed in the beginning of the item.
     * @default ""
     * @public
     */
    image: string;
    /**
     * Defines the `additionalText`, displayed in the end of the item.
     * @default ""
     * @since 1.0.0-rc.15
     * @public
     */
    additionalText: string;
    /**
     * Defines the state of the `additionalText`.
     * @default "None"
     * @since 1.0.0-rc.15
     * @public
     */
    additionalTextState: `${ValueState}`;
    get groupItem(): boolean;
}
export default SuggestionItem;
