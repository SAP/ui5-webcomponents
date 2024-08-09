import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ScrollEnablementEventListenerParam } from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselPageIndicatorStyle from "./types/CarouselPageIndicatorStyle.js";
import BackgroundDesign from "./types/BackgroundDesign.js";
import BorderDesign from "./types/BorderDesign.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
type CarouselNavigateEventDetail = {
    selectedIndex: number;
};
/**
 * @class
 *
 * ### Overview
 * The Carousel allows the user to browse through a set of items.
 * The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * There are several ways to perform navigation:
 *
 * - on desktop - the user can navigate using the navigation arrows or with keyboard shorcuts.
 * - on mobile - the user can use swipe gestures.
 *
 * ### Usage
 *
 * #### When to use:
 *
 * - The items you want to display are very different from each other.
 * - You want to display the items one after the other.
 *
 * #### When not to use:
 *
 * - The items you want to display need to be visible at the same time.
 * - The items you want to display are uniform and very similar.
 *
 * ### Keyboard Handling
 *
 * #### Basic Navigation
 * When the `ui5-carousel` is focused the user can navigate between the items
 * with the following keyboard shortcuts:
 *
 * - [Up] or [Down] - Navigates to previous and next item
 * - [Left] or [Right] - Navigates to previous and next item
 *
 * ### Fast Navigation
 * This component provides a build in fast navigation group which can be used via [F6] / [Shift] + [F6] / [Ctrl] + [Alt/Option] / [Down] or [Ctrl] + [Alt/Option] + [Up].
 * In order to use this functionality, you need to import the following module:
 *
 * `import "@ui5/webcomponents-base/dist/features/F6Navigation.js"`
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Carousel.js";`
 * @constructor
 * @extends UI5Element
 * @since 1.0.0-rc.6
 * @public
 * @csspart content - Used to style the content of the component
 */
declare class Carousel extends UI5Element {
    /**
     * Defines the accessible name of the component.
     * @default ""
     * @public
     * @since 1.24
     */
    accessibleName: string;
    /**
     * Defines the IDs of the elements that label the input.
     * @default ""
     * @public
     * @since 1.24
     */
    accessibleNameRef: string;
    /**
     * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
     * @default false
     * @public
     */
    cyclic: boolean;
    /**
     * Defines the number of items per page on small size (up to 640px). One item per page shown by default.
     * @default 1
     * @public
     */
    itemsPerPageS: number;
    /**
     * Defines the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
     * @default 1
     * @public
     */
    itemsPerPageM: number;
    /**
     * Defines the number of items per page on large size (more than 1024px). One item per page shown by default.
     * @default 1
     * @public
     */
    itemsPerPageL: number;
    /**
     * Defines the visibility of the navigation arrows.
     * If set to true the navigation arrows will be hidden.
     *
     * **Note:** The navigation arrows are never displayed on touch devices.
     * In this case, the user can swipe to navigate through the items.
     * @since 1.0.0-rc.15
     * @default false
     * @public
     */
    hideNavigationArrows: boolean;
    /**
     * Defines the visibility of the page indicator.
     * If set to true the page indicator will be hidden.
     * @since 1.0.0-rc.15
     * @default false
     * @public
     */
    hidePageIndicator: boolean;
    /**
     * Defines the style of the page indicator.
     * Available options are:
     *
     * - `Default` - The page indicator will be visualized as dots if there are fewer than 9 pages. If there are more pages, the page indicator will switch to displaying the current page and the total number of pages. (e.g. X of Y)
     * - `Numeric` - The page indicator will display the current page and the total number of pages. (e.g. X of Y)
     * @since 1.10
     * @default "Default"
     * @public
     */
    pageIndicatorStyle: `${CarouselPageIndicatorStyle}`;
    /**
     * Defines the carousel's background design.
     * @since 1.14
     * @default "Translucent"
     * @public
     */
    backgroundDesign: BackgroundDesign;
    /**
     * Defines the page indicator background design.
     * @since 1.14
     * @default "Solid"
     * @public
     */
    pageIndicatorBackgroundDesign: BackgroundDesign;
    /**
     * Defines the page indicator border design.
     * @since 1.14
     * @default "Solid"
     * @public
     */
    pageIndicatorBorderDesign: BorderDesign;
    /**
     * Defines the index of the initially selected item.
     * @default 0
     * @private
     */
    _selectedIndex: number;
    /**
     * Defines the position of arrows.
     *
     * Available options are:
     *
     * - `Content` - the arrows are placed on the sides of the current page.
     * - `Navigation` - the arrows are placed on the sides of the page indicator.
     * @default "Content"
     * @public
     */
    arrowsPlacement: `${CarouselArrowsPlacement}`;
    /**
     * Defines the carousel width in pixels.
     * @private
     */
    _width?: number;
    /**
     * Defines the carousel item width in pixels.
     * @private
     */
    _itemWidth?: number;
    /**
     * If set to true navigation arrows are shown.
     * @private
     * @since 1.0.0-rc.15
     */
    _visibleNavigationArrows: boolean;
    _scrollEnablement: ScrollEnablement;
    _onResizeBound: ResizeObserverCallback;
    _resizing: boolean;
    _lastFocusedElements: Array<HTMLElement>;
    _orderOfLastFocusedPages: Array<number>;
    /**
     * Defines the content of the component.
     * @public
     */
    content: Array<HTMLElement>;
    static i18nBundle: I18nBundle;
    static get pageTypeLimit(): number;
    constructor();
    onBeforeRendering(): void;
    onAfterRendering(): void;
    onEnterDOM(): void;
    onExitDOM(): void;
    validateSelectedIndex(): void;
    _onResize(): void;
    _updateScrolling(e: ScrollEnablementEventListenerParam): void;
    _onkeydown(e: KeyboardEvent): Promise<void>;
    _onfocusin(e: FocusEvent): void;
    _onmouseout(): void;
    _onmouseover(): void;
    _handleF7Key(e: KeyboardEvent): void;
    get _backgroundDesign(): string;
    get _getLastFocusedActivePageIndex(): number;
    navigateLeft(): void;
    navigateRight(): void;
    _navButtonClick(e: MouseEvent): void;
    /**
     * Changes the currently displayed page.
     * @param itemIndex The index of the target page
     * @since 1.0.0-rc.15
     * @public
     */
    navigateTo(itemIndex: number): void;
    /**
     * Assuming that all items have the same width
     * @private
     */
    get items(): {
        id: string;
        item: HTMLElement;
        tabIndex: string;
        posinset: string;
        setsize: string;
        styles: {
            width: string;
        };
        classes: string;
    }[];
    get effectiveItemsPerPage(): number;
    isItemInViewport(index: number): boolean;
    isIndexInRange(index: number): boolean;
    /**
     * @private
     */
    get renderNavigation(): boolean;
    get hasManyPages(): boolean;
    get styles(): {
        content: {
            transform: string;
        };
    };
    get classes(): {
        viewport: {
            "ui5-carousel-viewport": boolean;
            "ui5-carousel-viewport--single": boolean;
        };
        content: {
            "ui5-carousel-content": boolean;
            "ui5-carousel-content-no-animation": boolean;
            "ui5-carousel-content-has-navigation": boolean;
            "ui5-carousel-content-has-navigation-and-buttons": boolean;
        };
        navigation: {
            [x: string]: boolean;
            "ui5-carousel-navigation-wrapper": boolean;
            "ui5-carousel-navigation-with-buttons": boolean;
        };
        navPrevButton: {
            "ui5-carousel-navigation-button--hidden": boolean;
        };
        navNextButton: {
            "ui5-carousel-navigation-button--hidden": boolean;
        };
    };
    get pagesCount(): number;
    get isPageTypeDots(): boolean;
    get dots(): {
        active: boolean;
        ariaLabel: string;
    }[];
    get showArrows(): {
        content: boolean;
        navigation: boolean;
    };
    get hasPrev(): boolean;
    get hasNext(): boolean;
    get suppressAnimation(): boolean;
    get _isRTL(): boolean;
    get selectedIndexToShow(): number;
    get ofText(): string;
    get ariaActiveDescendant(): string | undefined;
    get ariaLabelTxt(): string | undefined;
    get nextPageText(): string;
    get previousPageText(): string;
    /**
     * The indices of the currently visible items of the component.
     * @public
     * @since 1.0.0-rc.15
     * @default []
     */
    get visibleItemsIndices(): Array<number>;
    static onDefine(): Promise<void>;
}
export default Carousel;
export type { CarouselNavigateEventDetail, };
