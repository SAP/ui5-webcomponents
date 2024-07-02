import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import ItemNavigation, { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import SegmentedButtonMode from "./types/SegmentedButtonMode.js";
/**
 * Interface for components that may be slotted inside `ui5-segmented-button` as items
 * @public
 */
interface ISegmentedButtonItem extends UI5Element, ITabbable {
    disabled: boolean;
    pressed: boolean;
}
type SegmentedButtonSelectionChangeEventDetail = {
    selectedItem: ISegmentedButtonItem;
    selectedItems: Array<ISegmentedButtonItem>;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-segmented-button` shows a group of items. When the user clicks or taps
 * one of the items, it stays in a pressed state. It automatically resizes the items
 * to fit proportionally within the component. When no width is set, the component uses the available width.
 *
 * **Note:** There can be just one selected `item` at a time.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/SegmentedButton.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 */
declare class SegmentedButton extends UI5Element {
    /**
     * Defines the accessible ARIA name of the component.
     * @default undefined
     * @public
     * @since 1.0.3
     */
    accessibleName?: string;
    /**
     * Defines the component selection mode.
     * @default "SingleSelect"
     * @public
     * @since 1.14.0
     */
    mode: `${SegmentedButtonMode}`;
    /**
     * Defines the items of `ui5-segmented-button`.
     *
     * **Note:** Multiple items are allowed.
     *
     * **Note:** Use the `ui5-segmented-button-item` for the intended design.
     * @public
     */
    items: Array<ISegmentedButtonItem>;
    static i18nBundle: I18nBundle;
    _itemNavigation: ItemNavigation;
    hasPreviouslyFocusedItem: boolean;
    _selectedItem?: ISegmentedButtonItem;
    static onDefine(): Promise<void>;
    constructor();
    onBeforeRendering(): void;
    normalizeSelection(): void;
    _selectItem(e: MouseEvent | KeyboardEvent): this | undefined;
    _applySingleSelection(item: ISegmentedButtonItem): void;
    _onclick(e: MouseEvent): void;
    _onkeydown(e: KeyboardEvent): void;
    _onkeyup(e: KeyboardEvent): void;
    _onmousedown(e: MouseEvent): void;
    _onfocusin(e: FocusEvent): void;
    /**
     * Currently selected item.
     * @deprecated since 1.14.0. This method will be removed in the next major release.
     * Please use the `selectedItems` property instead.
     * @public
     * @default undefined
     */
    get selectedItem(): ISegmentedButtonItem | undefined;
    /**
     * Returns an array of the currently selected items.
     * @since 1.14.0
     * @public
     * @default []
     */
    get selectedItems(): Array<ISegmentedButtonItem>;
    get ariaDescribedBy(): string;
    get ariaDescription(): string;
}
export default SegmentedButton;
export type { SegmentedButtonSelectionChangeEventDetail, ISegmentedButtonItem, };
