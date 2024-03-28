import type { ISegmentedButtonItem } from "./SegmentedButton.js";
import ToggleButton from "./ToggleButton.js";
import ButtonDesign from "./types/ButtonDesign.js";
import ButtonType from "./types/ButtonType.js";
import ButtonAccessibleRole from "./types/ButtonAccessibleRole.js";
import { AccessibilityAttributes } from "./Button.js";
/**
 * @class
 *
 * ### Overview
 *
 * Users can use the `ui5-segmented-button-item` as part of a `ui5-segmented-button`.
 *
 * Clicking or tapping on a `ui5-segmented-button-item` changes its state to `pressed`.
 * The item returns to its initial state when the user clicks or taps on it again.
 * By applying additional custom CSS-styling classes, apps can give a different style to any
 * `ui5-segmented-button-item`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButtonItem.js";`
 * @constructor
 * @extends ToggleButton
 * @implements { ISegmentedButtonItem }
 * @public
 */
declare class SegmentedButtonItem extends ToggleButton implements ISegmentedButtonItem {
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default "Default"
     * @public
     */
    design: `${ButtonDesign}`;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default false
     * @public
     */
    iconEnd: boolean;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default false
     * @public
     */
    submits: boolean;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default {}
     * @public
     */
    accessibilityAttributes: AccessibilityAttributes;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default "Button"
     * @public
     */
    type: `${ButtonType}`;
    /**
     * **Note:** The property is inherited and not supported. If set, it won't take any effect.
     * @default "Button"
     * @public
     */
    accessibleRole: `${ButtonAccessibleRole}`;
    /**
     * Defines the index of the item inside of the SegmentedButton.
     * @default 0
     * @private
     */
    posInSet: number;
    /**
     * Defines how many items are inside of the SegmentedButton.
     * @default 0
     * @private
     */
    sizeOfSet: number;
    get ariaDescription(): string;
}
export default SegmentedButtonItem;
