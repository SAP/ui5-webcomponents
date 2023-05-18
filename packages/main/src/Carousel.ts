import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import {
	isLeft,
	isRight,
	isDown,
	isUp,
	isF7,
} from "@ui5/webcomponents-base/dist/Keys.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import type { ScrollEnablementEventListenerParam } from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import AnimationMode from "@ui5/webcomponents-base/dist/types/AnimationMode.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import {
	CAROUSEL_OF_TEXT,
	CAROUSEL_DOT_TEXT,
	CAROUSEL_PREVIOUS_ARROW_TEXT,
	CAROUSEL_NEXT_ARROW_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselPageIndicatorStyle from "./types/CarouselPageIndicatorStyle.js";
import CarouselTemplate from "./generated/templates/CarouselTemplate.lit.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

import Button from "./Button.js";
import Label from "./Label.js";

// Styles
import CarouselCss from "./generated/themes/Carousel.css.js";

type CarouselNavigateEventDetail = {
	selectedIndex: number;
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The Carousel allows the user to browse through a set of items.
 * The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 * <br>
 * There are several ways to perform navigation:
 * <ul>
 * <li>on desktop - the user can navigate using the navigation arrows or with keyboard shorcuts.</li>
 * <li>on mobile - the user can use swipe gestures.</li>
 * </ul>
 *
 * <h3>Usage</h3>
 *
 * <h4>When to use:</h4>
 *
 * <ul>
 * <li>The items you want to display are very different from each other.</li>
 * <li>You want to display the items one after the other.</li>
 * </ul>
 *
 * <h4>When not to use:</h4>
 *
 * <ul>
 * <li>The items you want to display need to be visible at the same time.</li>
 * <li>The items you want to display are uniform and very similar.</li>
 * </ul>
 *
 * <h3>Keyboard Handling</h3>
 *
 * <h4>Basic Navigation</h4>
 * When the <code>ui5-carousel</code> is focused the user can navigate between the items
 * with the following keyboard shortcuts:
 * <br>
 * <ul>
 * <li>[UP/DOWN] - Navigates to previous and next item</li>
 * <li>[LEFT/RIGHT] - Navigates to previous and next item</li>
 * </ul>
 *
 * <h3>Fast Navigation</h3>
 * This component provides a build in fast navigation group which can be used via <code>F6 / Shift + F6</code> or <code> Ctrl + Alt(Option) + Down /  Ctrl + Alt(Option) + Up</code>.
 * In order to use this functionality, you need to import the following module:
 * <code>import "@ui5/webcomponents-base/dist/features/F6Navigation.js"</code>
 * <br><br>
 *
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-carousel</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>content - Used to style the content of the component</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Carousel.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Carousel
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-carousel
 * @since 1.0.0-rc.6
 * @public
 */
@customElement({
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
 * based on the <code>items-per-page-l</code>, <code>items-per-page-m</code> and <code>items-per-page-s</code> properties.
 *
 * @event sap.ui.webc.main.Carousel#navigate
 * @param {Integer} selectedIndex the current selected index
 * @public
 * @since 1.0.0-rc.7
 */
@event("navigate", {
	detail: {
		selectedIndex: { type: Integer },
	},
})

class Carousel extends UI5Element {
	/**
	 * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Carousel.prototype.cyclic
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	cyclic!: boolean;

	/**
	 * Defines the number of items per page on small size (up to 640px). One item per page shown by default.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.Carousel.prototype.itemsPerPageS
	 * @defaultvalue 1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	itemsPerPageS!: number;

	/**
	 * Defines the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.Carousel.prototype.itemsPerPageM
	 * @defaultvalue 1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	itemsPerPageM!: number;

	/**
	 * Defines the number of items per page on large size (more than 1024px). One item per page shown by default.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.Carousel.prototype.itemsPerPageL
	 * @defaultvalue 1
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 1 })
	itemsPerPageL!: number;

	/**
	 * Defines the visibility of the navigation arrows.
	 * If set to true the navigation arrows will be hidden.
	 * <br><br>
	 * <b>Note:</b> The navigation arrows are never displayed on touch devices.
	 * In this case, the user can swipe to navigate through the items.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Carousel.prototype.hideNavigationArrows
	 * @since 1.0.0-rc.15
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideNavigationArrows!: boolean;

	/**
	 * Defines the visibility of the page indicator.
	 * If set to true the page indicator will be hidden.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Carousel.prototype.hidePageIndicator
	 * @since 1.0.0-rc.15
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hidePageIndicator!: boolean;

	/**
	 * Defines the style of the page indicator.
	 * Available options are:
	 * <ul>
	 * <li><code>Default</code> - The page indicator will be visualized as dots if there are fewer than 9 pages. If there are more pages, the page indicator will switch to displaying the current page and the total number of pages. (e.g. X of Y)</li>
	 * <li><code>Numeric</code> - The page indicator will display the current page and the total number of pages. (e.g. X of Y)</li>
	 * </ul>
	 * @type {sap.ui.webc.main.types.CarouselPageIndicatorStyle}
	 * @name sap.ui.webc.main.Carousel.prototype.pageIndicatorStyle
	 * @since 1.10
	 * @defaultvalue "Default"
	 * @public
	 */
	@property({ type: CarouselPageIndicatorStyle, defaultValue: CarouselPageIndicatorStyle.Default })
	pageIndicatorStyle!: CarouselPageIndicatorStyle;

	/**
	 * Defines the index of the initially selected item.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.main.Carousel.prototype._selectedIndex
	 * @defaultvalue 0
	 * @private
	 */
	@property({ validator: Integer, defaultValue: 0 })
	_selectedIndex!: number;

	/**
	 * Defines the position of arrows.
	 * <br><br>
	 * Available options are:
	 * <ul>
	 * <li><code>Content</code></li>
	 * <li><code>Navigation</code></li>
	 * </ul>
	 * <br>
	 * When set to "Content", the arrows are placed on the sides of the current page.
	 * <br>
	 * When set to "Navigation", the arrows are placed on the sides of the page indicator.
	 * @type {sap.ui.webc.main.types.CarouselArrowsPlacement}
	 * @name sap.ui.webc.main.Carousel.prototype.arrowsPlacement
	 * @defaultvalue "Content"
	 * @public
	 */
	@property({ type: CarouselArrowsPlacement, defaultValue: CarouselArrowsPlacement.Content })
	arrowsPlacement!: CarouselArrowsPlacement;

	/**
	 * Defines the carousel width in pixels.
	 * @private
	 */
	@property({ validator: Integer })
	_width?: number;

	/**
	 * Defines the carousel item width in pixels.
	 * @private
	 */
	@property({ validator: Integer })
	_itemWidth?: number;

	/**
	 * If set to true navigation arrows are shown.
	 * @private
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean, noAttribute: true })
	_visibleNavigationArrows!: boolean;

	_scrollEnablement: ScrollEnablement;
	_onResizeBound: ResizeObserverCallback;
	_resizing: boolean;
	_lastFocusedElements: Array<HTMLElement>;
	_orderOfLastFocusedPages: Array<number>;

	/**
	 * Defines the content of the component.
	 * @type {HTMLElement[]}
	 * @slot
	 * @name sap.ui.webc.main.Carousel.prototype.default
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, individualSlots: true })
	content!: Array<HTMLElement>;

	static i18nBundle: I18nBundle;

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
		this._scrollEnablement.scrollContainer = this.getDomRef()!;
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
			this.fireEvent<CarouselNavigateEventDetail>("navigate", { selectedIndex: this._selectedIndex });
		}
	}

	_updateScrolling(e: ScrollEnablementEventListenerParam) {
		if (!e) {
			return;
		}

		if (e.isLeft) {
			this.navigateLeft();
		} else if (e.isRight) {
			this.navigateRight();
		}
	}

	async _onkeydown(e: KeyboardEvent) {
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
			this.getDomRef()!.focus();
		} else if (isRight(e) || isUp(e)) {
			this.navigateRight();
			await renderFinished();
			this.getDomRef()!.focus();
		}
	}

	_onfocusin(e: FocusEvent) {
		const target = e.target as HTMLElement;

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
		} else {
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

	_handleF7Key(e: KeyboardEvent) {
		const lastFocusedElement = this._lastFocusedElements[this._getLastFocusedActivePageIndex];

		if (e.target === this.getDomRef() && lastFocusedElement) {
			lastFocusedElement.focus();
		} else {
			this.getDomRef()!.focus();
		}
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
		} else {
			--this._selectedIndex;
		}

		if (previousSelectedIndex !== this._selectedIndex) {
			this.fireEvent<CarouselNavigateEventDetail>("navigate", { selectedIndex: this._selectedIndex });
		}
	}

	navigateRight() {
		this._resizing = false;

		const previousSelectedIndex = this._selectedIndex;

		if (this._selectedIndex + 1 > this.pagesCount - 1) {
			if (this.cyclic) {
				this._selectedIndex = 0;
			} else {
				return;
			}
		} else {
			++this._selectedIndex;
		}

		if (previousSelectedIndex !== this._selectedIndex) {
			this.fireEvent<CarouselNavigateEventDetail>("navigate", { selectedIndex: this._selectedIndex });
		}
	}

	_navButtonClick(e: MouseEvent) {
		const button = e.target as Button;
		if (button.hasAttribute("arrow-forward")) {
			this.navigateRight();
		} else {
			this.navigateLeft();
		}

		this.focus();
	}

	/**
	 * Changes the currently displayed page.
	 * @param {Integer} itemIndex The index of the target page
	 * @since 1.0.0-rc.15
	 * @method
	 * @name sap.ui.webc.main.Carousel#navigateTo
	 * @public
	 */
	navigateTo(itemIndex: number) {
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

	get effectiveItemsPerPage(): number {
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

	isItemInViewport(index: number): boolean {
		return index >= this._selectedIndex && index <= this._selectedIndex + this.effectiveItemsPerPage - 1;
	}

	isIndexInRange(index: number): boolean {
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

		return this.pagesCount < Carousel.pageTypeLimit;
	}

	get dots() {
		const dots = [];
		const pages = this.pagesCount;

		for (let index = 0; index < pages; index++) {
			dots.push({
				active: index === this._selectedIndex,
				ariaLabel: Carousel.i18nBundle.getText(CAROUSEL_DOT_TEXT, index + 1, pages),
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
		return Carousel.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	get ariaActiveDescendant() {
		return this.content.length ? `${this._id}-carousel-item-${this._selectedIndex + 1}` : undefined;
	}

	get nextPageText() {
		return Carousel.i18nBundle.getText(CAROUSEL_NEXT_ARROW_TEXT);
	}

	get previousPageText() {
		return Carousel.i18nBundle.getText(CAROUSEL_PREVIOUS_ARROW_TEXT);
	}

	/**
	 * The indices of the currently visible items of the component.
	 * @public
	 * @readonly
	 * @since 1.0.0-rc.15
	 * @returns {Integer[]} the indices of the visible items
	 */
	get visibleItemsIndices() {
		const visibleItemsIndices: Array<number> = [];

		this.items.forEach((item, index) => {
			if (this.isItemInViewport(index)) {
				visibleItemsIndices.push(index);
			}
		});

		return visibleItemsIndices;
	}

	static async onDefine() {
		Carousel.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

Carousel.define();

export default Carousel;
export type {
	CarouselNavigateEventDetail,
};
