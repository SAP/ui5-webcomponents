import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import "@ui5/webcomponents-icons/dist/navigation-up-arrow.js";
import "@ui5/webcomponents-icons/dist/navigation-down-arrow.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
type WheelSliderSelectEventDetail = {
    value: string;
};
/**
 * @class
 *
 * ### Overview
 *
 * ### Usage
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/WheelSlider.js";`
 * @constructor
 * @extends UI5Element
 * @private
 * @since 1.0.0-rc.6
 */
declare class WheelSlider extends UI5Element {
    /**
     * Defines whether the component is disabled
     * (default is set to `false`).
     * A disabled component can't be pressed or
     * focused, and it is not in the tab chain.
     * @default false
     * @public
     */
    disabled: boolean;
    /**
     * Defines the currently selected value
     * @default "0"
     * @public
     */
    value: string;
    /**
     * Defines the label of the wheelslider.
     * @default ""
     * @public
     */
    label: string;
    /**
     * Indicates if the wheelslider is expanded.
     * @default false
     * @public
     */
    expanded: boolean;
    /**
     * Indicates if the wheelslider has a cyclic behaviour.
     * @default false
     * @public
     */
    cyclic: boolean;
    _items: Array<string>;
    _itemsToShow: Array<{
        value: string;
        selected: boolean;
    }>;
    _currentElementIndex: number;
    _scroller: ScrollEnablement;
    _prevWheelTimestamp?: number;
    _density: string;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): true | undefined;
    get classes(): {
        root: {
            "ui5-wheelslider-root": boolean;
            "ui5-phone": boolean;
        };
    };
    expandSlider(): void;
    collapseSlider(): void;
    get _itemCellHeight(): number;
    _updateScrolling(): void;
    _handleScrollTouchEnd(): void;
    _selectElement(element: HTMLElement): void;
    _getCurrentRepetition(): number;
    _selectElementByIndex(currentIndex: number): void;
    _timesMultipliedOnCyclic(): number;
    _buildItemsToShow(): void;
    _handleArrayBorderReached(currentIndex: number): number;
    /**
     * The listener for this event can't be passive as it calls preventDefault()
     * @param e Wheel Event
     * @private
     */
    _handleWheel(e: WheelEvent): void;
    _onclick(e: MouseEvent): void;
    _onArrowDown(e: KeyboardEvent): void;
    _onArrowUp(e: KeyboardEvent): void;
    _itemDown(): void;
    _itemUp(): void;
    _onkeydown(e: KeyboardEvent): void;
    _selectLimitCell(e: KeyboardEvent, isMax: boolean): void;
}
export default WheelSlider;
export type { WheelSliderSelectEventDetail };
