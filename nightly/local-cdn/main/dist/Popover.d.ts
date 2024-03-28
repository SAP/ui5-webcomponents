import Popup from "./Popup.js";
import type { PopupBeforeCloseEventDetail as PopoverBeforeCloseEventDetail } from "./Popup.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
type PopoverSize = {
    width: number;
    height: number;
};
type ArrowPosition = {
    x: number;
    y: number;
};
type CalculatedPlacement = {
    arrow: ArrowPosition;
    top: number;
    left: number;
    placementType: `${PopoverPlacementType}`;
};
/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-popover` component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * ### Structure
 *
 * The popover has three main areas:
 *
 * - Header (optional)
 * - Content
 * - Footer (optional)
 *
 * **Note:** The `ui5-popover` is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * `modal` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Popover.js";`
 *
 * **Note: ** We recommend placing popup-like components (`ui5-dialog` and `ui5-popover`)
 * outside any other components. Preferably, the popup-like components should be placed
 * in an upper level HTML element. Otherwise, in some cases the parent HTML elements can break
 * the position and/or z-index management of the popup-like components.
 *
 * **Note:** We don't recommend nesting popup-like components (`ui5-dialog`, `ui5-popover`).
 * @constructor
 * @extends Popup
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
declare class Popover extends Popup {
    /**
     * Defines the header text.
     *
     * **Note:** If `header` slot is provided, the `headerText` is ignored.
     * @default ""
     * @public
     */
    headerText: string;
    /**
     * Determines on which side the component is placed at.
     * @default "Right"
     * @public
     */
    placementType: `${PopoverPlacementType}`;
    /**
     * Determines the horizontal alignment of the component.
     * @default "Center"
     * @public
     */
    horizontalAlign: `${PopoverHorizontalAlign}`;
    /**
     * Determines the vertical alignment of the component.
     * @default "Center"
     * @public
     */
    verticalAlign: `${PopoverVerticalAlign}`;
    /**
     * Defines whether the component should close when
     * clicking/tapping outside of the popover.
     * If enabled, it blocks any interaction with the background.
     * @default false
     * @public
     */
    modal: boolean;
    /**
     * Defines whether the block layer will be shown if modal property is set to true.
     * @default false
     * @public
     * @since 1.0.0-rc.10
     */
    hideBackdrop: boolean;
    /**
     * Determines whether the component arrow is hidden.
     * @default false
     * @public
     * @since 1.0.0-rc.15
     */
    hideArrow: boolean;
    /**
     * Determines if there is no enough space, the component can be placed
     * over the target.
     * @default false
     * @public
     */
    allowTargetOverlap: boolean;
    /**
     * Defines the ID or DOM Reference of the element that the popover is shown at
     * @public
     * @default undefined
     * @since 1.2.0
     */
    opener?: HTMLElement | string;
    /**
     * Defines whether the content is scrollable.
     * @default false
     * @private
     */
    disableScrolling: boolean;
    /**
     * Sets the X translation of the arrow
     * @private
     */
    arrowTranslateX: number;
    /**
     * Sets the Y translation of the arrow
     * @private
     */
    arrowTranslateY: number;
    /**
     * Returns the calculated placement depending on the free space
     * @private
     */
    actualPlacementType: `${PopoverPlacementType}`;
    _maxHeight?: number;
    _maxWidth?: number;
    /**
     * Defines the header HTML Element.
     * @public
     */
    header: Array<HTMLElement>;
    /**
     * Defines the footer HTML Element.
     * @public
     */
    footer: Array<HTMLElement>;
    _opener?: HTMLElement;
    _openerRect?: DOMRect;
    _preventRepositionAndClose?: boolean;
    _top?: number;
    _left?: number;
    _oldPlacement?: CalculatedPlacement;
    _width?: string;
    static get VIEWPORT_MARGIN(): number;
    constructor();
    onAfterRendering(): void;
    isOpenerClicked(e: MouseEvent): boolean;
    /**
     * Shows the popover.
     * @param opener the element that the popover is shown at
     * @param [preventInitialFocus=false] prevents applying the focus inside the popover
     * @public
     * @returns Resolved when the popover is open
     */
    showAt(opener: HTMLElement, preventInitialFocus?: boolean): Promise<void>;
    /**
     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
     * @private
     */
    _addOpenedPopup(): void;
    /**
     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
     * @private
     */
    _removeOpenedPopup(): void;
    shouldCloseDueToOverflow(placement: `${PopoverPlacementType}`, openerRect: DOMRect): boolean;
    shouldCloseDueToNoOpener(openerRect: DOMRect): boolean;
    isOpenerOutsideViewport(openerRect: DOMRect): boolean;
    /**
     * @override
     */
    _resize(): void;
    reposition(): void;
    _show(): void;
    /**
     * Adjust the desired top position to compensate for shift of the screen
     * caused by opened keyboard on iOS which affects all elements with position:fixed.
     * @private
     * @param top The target top in px.
     * @returns The adjusted top in px.
     */
    _adjustForIOSKeyboard(top: number): number;
    _getContainingBlockClientLocation(): DOMRect | {
        left: number;
        top: number;
    };
    getPopoverSize(): PopoverSize;
    _showOutsideViewport(): void;
    get arrowDOM(): Element;
    /**
     * @private
     */
    calcPlacement(targetRect: DOMRect, popoverSize: PopoverSize): CalculatedPlacement;
    /**
     * Calculates the position for the arrow.
     * @private
     * @param targetRect BoundingClientRect of the target element
     * @param popoverSize Width and height of the popover
     * @param left Left offset of the popover
     * @param top Top offset of the popover
     * @param isVertical If the popover is positioned vertically to the target element
     * @param borderRadius Value of the border-radius property
     * @returns  Arrow's coordinates
     */
    getArrowPosition(targetRect: DOMRect, popoverSize: PopoverSize, left: number, top: number, isVertical: boolean, borderRadius: number): ArrowPosition;
    /**
     * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
     * @private
     */
    fallbackPlacement(clientWidth: number, clientHeight: number, targetRect: DOMRect, popoverSize: PopoverSize): PopoverPlacementType | undefined;
    getActualPlacementType(targetRect: DOMRect, popoverSize: PopoverSize): `${PopoverPlacementType}`;
    getVerticalLeft(targetRect: DOMRect, popoverSize: PopoverSize): number;
    getHorizontalTop(targetRect: DOMRect, popoverSize: PopoverSize): number;
    get isModal(): boolean;
    get shouldHideBackdrop(): boolean;
    get _ariaLabelledBy(): "ui5-popup-header" | undefined;
    get styles(): {
        root: {
            "max-height": string;
            "max-width": string;
        };
        arrow: {
            transform: string;
        };
        content: {};
        blockLayer: {
            zIndex: string | number;
        };
    };
    get classes(): import("@ui5/webcomponents-base/dist/types.js").ClassMap;
    /**
     * Hook for descendants to hide header.
     */
    get _displayHeader(): boolean;
    /**
     * Hook for descendants to hide footer.
     */
    get _displayFooter(): boolean;
    get _actualHorizontalAlign(): "Left" | "Right" | "Center" | "Stretch" | PopoverHorizontalAlign.Left | PopoverHorizontalAlign.Right;
}
declare const instanceOfPopover: (object: any) => object is Popover;
export default Popover;
export { instanceOfPopover };
export type { PopoverBeforeCloseEventDetail, };
