var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Carousel_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isLeft, isRight, isDown, isUp, isF7, } from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import { CAROUSEL_OF_TEXT, CAROUSEL_DOT_TEXT, CAROUSEL_PREVIOUS_ARROW_TEXT, CAROUSEL_NEXT_ARROW_TEXT, } from "./generated/i18n/i18n-defaults.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselPageIndicatorStyle from "./types/CarouselPageIndicatorStyle.js";
import BackgroundDesign from "./types/BackgroundDesign.js";
import BorderDesign from "./types/BorderDesign.js";
import CarouselTemplate from "./generated/templates/CarouselTemplate.lit.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import Button from "./Button.js";
import Label from "./Label.js";
// Styles
import CarouselCss from "./generated/themes/Carousel.css.js";
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
let Carousel = Carousel_1 = class Carousel extends UI5Element {
    static get pageTypeLimit() {
        return 9;
    }
    constructor() {
        super();
        this._scrollEnablement = new ScrollEnablement(this);
        this._scrollEnablement.attachEvent("touchend", e => {
            this._updateScrolling(e);
        });
        this._onResizeBound = this._onResize.bind(this);
        this._resizing = false; // indicates if the carousel is in process of resizing
        this._lastFocusedElements = [];
        this._orderOfLastFocusedPages = [];
    }
    onBeforeRendering() {
        if (this.arrowsPlacement === CarouselArrowsPlacement.Navigation) {
            this._visibleNavigationArrows = true;
        }
        this.validateSelectedIndex();
    }
    onAfterRendering() {
        this._scrollEnablement.scrollContainer = this.getDomRef();
        this._resizing = false; // not invalidating
    }
    onEnterDOM() {
        ResizeHandler.register(this, this._onResizeBound);
    }
    onExitDOM() {
        ResizeHandler.deregister(this, this._onResizeBound);
    }
    validateSelectedIndex() {
        if (!this.isIndexInRange(this._selectedIndex)) {
            this._selectedIndex = 0;
        }
    }
    _onResize() {
        const previousItemsPerPage = this.effectiveItemsPerPage;
        // Set the resizing flag to suppress animation while resizing
        this._resizing = true;
        // Change transitively effectiveItemsPerPage by modifying _width
        this._width = this.offsetWidth;
        this._itemWidth = Math.floor(this._width / this.effectiveItemsPerPage);
        // Items per page did not change or the current,
        // therefore page index does not need to be re-adjusted
        if (this.effectiveItemsPerPage === previousItemsPerPage) {
            return;
        }
        if (this._selectedIndex > this.pagesCount - 1) {
            this._selectedIndex = this.pagesCount - 1;
            this.fireEvent("navigate", { selectedIndex: this._selectedIndex });
        }
    }
    _updateScrolling(e) {
        if (!e) {
            return;
        }
        if (e.isLeft) {
            this.navigateLeft();
        }
        else if (e.isRight) {
            this.navigateRight();
        }
    }
    async _onkeydown(e) {
        if (isF7(e)) {
            this._handleF7Key(e);
            return;
        }
        if (e.target !== this.getDomRef()) {
            return;
        }
        if (isLeft(e) || isDown(e)) {
            this.navigateLeft();
            await renderFinished();
            this.getDomRef().focus();
        }
        else if (isRight(e) || isUp(e)) {
            this.navigateRight();
            await renderFinished();
            this.getDomRef().focus();
        }
    }
    _onfocusin(e) {
        const target = e.target;
        if (target === this.getDomRef()) {
            return;
        }
        let pageIndex = -1;
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].contains(target)) {
                pageIndex = i;
                break;
            }
        }
        if (pageIndex === -1) {
            return;
        }
        // Save reference of the last focused element for each page
        this._lastFocusedElements[pageIndex] = target;
        const sortedPageIndex = this._orderOfLastFocusedPages.indexOf(pageIndex);
        if (sortedPageIndex === -1) {
            this._orderOfLastFocusedPages.unshift(pageIndex);
        }
        else {
            this._orderOfLastFocusedPages.splice(0, 0, this._orderOfLastFocusedPages.splice(sortedPageIndex, 1)[0]);
        }
    }
    _onmouseout() {
        if (this.arrowsPlacement === CarouselArrowsPlacement.Content) {
            this._visibleNavigationArrows = false;
        }
    }
    _onmouseover() {
        if (this.arrowsPlacement === CarouselArrowsPlacement.Content) {
            this._visibleNavigationArrows = true;
        }
    }
    _handleF7Key(e) {
        const lastFocusedElement = this._lastFocusedElements[this._getLastFocusedActivePageIndex];
        if (e.target === this.getDomRef() && lastFocusedElement) {
            lastFocusedElement.focus();
        }
        else {
            this.getDomRef().focus();
        }
    }
    get _backgroundDesign() {
        return this.backgroundDesign.toLowerCase();
    }
    get _getLastFocusedActivePageIndex() {
        for (let i = 0; i < this._orderOfLastFocusedPages.length; i++) {
            const pageIndex = this._orderOfLastFocusedPages[i];
            if (this.isItemInViewport(pageIndex)) {
                return pageIndex;
            }
        }
        return this._selectedIndex;
    }
    navigateLeft() {
        this._resizing = false;
        const previousSelectedIndex = this._selectedIndex;
        if (this._selectedIndex - 1 < 0) {
            if (this.cyclic) {
                this._selectedIndex = this.pagesCount - 1;
            }
        }
        else {
            --this._selectedIndex;
        }
        if (previousSelectedIndex !== this._selectedIndex) {
            this.fireEvent("navigate", { selectedIndex: this._selectedIndex });
        }
    }
    navigateRight() {
        this._resizing = false;
        const previousSelectedIndex = this._selectedIndex;
        if (this._selectedIndex + 1 > this.pagesCount - 1) {
            if (this.cyclic) {
                this._selectedIndex = 0;
            }
            else {
                return;
            }
        }
        else {
            ++this._selectedIndex;
        }
        if (previousSelectedIndex !== this._selectedIndex) {
            this.fireEvent("navigate", { selectedIndex: this._selectedIndex });
        }
    }
    _navButtonClick(e) {
        const button = e.target;
        if (button.hasAttribute("arrow-forward")) {
            this.navigateRight();
        }
        else {
            this.navigateLeft();
        }
        this.focus();
    }
    /**
     * Changes the currently displayed page.
     * @param itemIndex The index of the target page
     * @since 1.0.0-rc.15
     * @public
     */
    navigateTo(itemIndex) {
        this._resizing = false;
        this._selectedIndex = itemIndex;
    }
    /**
     * Assuming that all items have the same width
     * @private
     */
    get items() {
        return this.content.map((item, idx) => {
            const visible = this.isItemInViewport(idx);
            return {
                id: `${this._id}-carousel-item-${idx + 1}`,
                item,
                tabIndex: visible ? "0" : "-1",
                posinset: `${idx + 1}`,
                setsize: `${this.content.length}`,
                styles: {
                    width: `${this._itemWidth || 0}px`,
                },
                classes: visible ? "" : "ui5-carousel-item--hidden",
            };
        });
    }
    get effectiveItemsPerPage() {
        if (!this._width) {
            return this.itemsPerPageL;
        }
        if (this._width <= 640) {
            return this.itemsPerPageS;
        }
        if (this._width <= 1024) {
            return this.itemsPerPageM;
        }
        return this.itemsPerPageL;
    }
    isItemInViewport(index) {
        return index >= this._selectedIndex && index <= this._selectedIndex + this.effectiveItemsPerPage - 1;
    }
    isIndexInRange(index) {
        return index >= 0 && index <= this.pagesCount - 1;
    }
    /**
     * @private
     */
    get renderNavigation() {
        if (!this.hasManyPages) {
            return false;
        }
        if (this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows) {
            return true;
        }
        if (this.hidePageIndicator) {
            return false;
        }
        return true;
    }
    get hasManyPages() {
        return this.pagesCount > 1;
    }
    get styles() {
        const items = this._itemWidth || 0;
        return {
            content: {
                transform: `translateX(${this._isRTL ? "" : "-"}${this._selectedIndex * items}px`,
            },
        };
    }
    get classes() {
        return {
            viewport: {
                "ui5-carousel-viewport": true,
                "ui5-carousel-viewport--single": this.pagesCount === 1,
            },
            content: {
                "ui5-carousel-content": true,
                "ui5-carousel-content-no-animation": this.suppressAnimation,
                "ui5-carousel-content-has-navigation": this.renderNavigation,
                "ui5-carousel-content-has-navigation-and-buttons": this.renderNavigation && this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows,
            },
            navigation: {
                "ui5-carousel-navigation-wrapper": true,
                "ui5-carousel-navigation-with-buttons": this.renderNavigation && this.arrowsPlacement === CarouselArrowsPlacement.Navigation && !this.hideNavigationArrows,
                [`ui5-carousel-navigation-wrapper-bg-${this.pageIndicatorBackgroundDesign.toLowerCase()}`]: true,
                [`ui5-carousel-navigation-wrapper-border-${this.pageIndicatorBorderDesign.toLowerCase()}`]: true,
            },
            navPrevButton: {
                "ui5-carousel-navigation-button--hidden": !this.hasPrev,
            },
            navNextButton: {
                "ui5-carousel-navigation-button--hidden": !this.hasNext,
            },
        };
    }
    get pagesCount() {
        const items = this.content.length;
        return items > this.effectiveItemsPerPage ? items - this.effectiveItemsPerPage + 1 : 1;
    }
    get isPageTypeDots() {
        if (this.pageIndicatorStyle === CarouselPageIndicatorStyle.Numeric) {
            return false;
        }
        return this.pagesCount < Carousel_1.pageTypeLimit;
    }
    get dots() {
        const dots = [];
        const pages = this.pagesCount;
        for (let index = 0; index < pages; index++) {
            dots.push({
                active: index === this._selectedIndex,
                ariaLabel: Carousel_1.i18nBundle.getText(CAROUSEL_DOT_TEXT, index + 1, pages),
            });
        }
        return dots;
    }
    get showArrows() {
        const displayArrows = this._visibleNavigationArrows && this.hasManyPages && isDesktop();
        return {
            content: !this.hideNavigationArrows && displayArrows && this.arrowsPlacement === CarouselArrowsPlacement.Content,
            navigation: !this.hideNavigationArrows && displayArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
        };
    }
    get hasPrev() {
        return this.cyclic || this._selectedIndex - 1 >= 0;
    }
    get hasNext() {
        return this.cyclic || this._selectedIndex + 1 <= this.pagesCount - 1;
    }
    get suppressAnimation() {
        return this._resizing || getAnimationMode() === AnimationMode.None;
    }
    get _isRTL() {
        return this.effectiveDir === "rtl";
    }
    get selectedIndexToShow() {
        return this._isRTL ? this.pagesCount - (this.pagesCount - this._selectedIndex) + 1 : this._selectedIndex + 1;
    }
    get ofText() {
        return Carousel_1.i18nBundle.getText(CAROUSEL_OF_TEXT);
    }
    get ariaActiveDescendant() {
        return this.content.length ? `${this._id}-carousel-item-${this._selectedIndex + 1}` : undefined;
    }
    get ariaLabelTxt() {
        return getEffectiveAriaLabelText(this);
    }
    get nextPageText() {
        return Carousel_1.i18nBundle.getText(CAROUSEL_NEXT_ARROW_TEXT);
    }
    get previousPageText() {
        return Carousel_1.i18nBundle.getText(CAROUSEL_PREVIOUS_ARROW_TEXT);
    }
    /**
     * The indices of the currently visible items of the component.
     * @public
     * @since 1.0.0-rc.15
     * @default []
     */
    get visibleItemsIndices() {
        const visibleItemsIndices = [];
        this.items.forEach((item, index) => {
            if (this.isItemInViewport(index)) {
                visibleItemsIndices.push(index);
            }
        });
        return visibleItemsIndices;
    }
    static async onDefine() {
        Carousel_1.i18nBundle = await getI18nBundle("@ui5/webcomponents");
    }
};
__decorate([
    property()
], Carousel.prototype, "accessibleName", void 0);
__decorate([
    property({ defaultValue: "" })
], Carousel.prototype, "accessibleNameRef", void 0);
__decorate([
    property({ type: Boolean })
], Carousel.prototype, "cyclic", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1 })
], Carousel.prototype, "itemsPerPageS", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1 })
], Carousel.prototype, "itemsPerPageM", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 1 })
], Carousel.prototype, "itemsPerPageL", void 0);
__decorate([
    property({ type: Boolean })
], Carousel.prototype, "hideNavigationArrows", void 0);
__decorate([
    property({ type: Boolean })
], Carousel.prototype, "hidePageIndicator", void 0);
__decorate([
    property({ type: CarouselPageIndicatorStyle, defaultValue: CarouselPageIndicatorStyle.Default })
], Carousel.prototype, "pageIndicatorStyle", void 0);
__decorate([
    property({ type: BackgroundDesign, defaultValue: BackgroundDesign.Translucent })
], Carousel.prototype, "backgroundDesign", void 0);
__decorate([
    property({ type: BackgroundDesign, defaultValue: BackgroundDesign.Solid })
], Carousel.prototype, "pageIndicatorBackgroundDesign", void 0);
__decorate([
    property({ type: BorderDesign, defaultValue: BorderDesign.Solid })
], Carousel.prototype, "pageIndicatorBorderDesign", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], Carousel.prototype, "_selectedIndex", void 0);
__decorate([
    property({ type: CarouselArrowsPlacement, defaultValue: CarouselArrowsPlacement.Content })
], Carousel.prototype, "arrowsPlacement", void 0);
__decorate([
    property({ validator: Integer })
], Carousel.prototype, "_width", void 0);
__decorate([
    property({ validator: Integer })
], Carousel.prototype, "_itemWidth", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], Carousel.prototype, "_visibleNavigationArrows", void 0);
__decorate([
    slot({ "default": true, type: HTMLElement, individualSlots: true })
], Carousel.prototype, "content", void 0);
Carousel = Carousel_1 = __decorate([
    customElement({
        tag: "ui5-carousel",
        languageAware: true,
        fastNavigation: true,
        renderer: litRender,
        styles: CarouselCss,
        template: CarouselTemplate,
        dependencies: [
            Button,
            Label,
        ],
    })
    /**
     * Fired whenever the page changes due to user interaction,
     * when the user clicks on the navigation arrows or while resizing,
     * based on the `items-per-page-l`, `items-per-page-m` and `items-per-page-s` properties.
     * @param {Integer} selectedIndex the current selected index
     * @public
     * @since 1.0.0-rc.7
     */
    ,
    event("navigate", {
        detail: {
            /**
             * @public
             */
            selectedIndex: { type: Integer },
        },
    })
], Carousel);
Carousel.define();
export default Carousel;
//# sourceMappingURL=Carousel.js.map