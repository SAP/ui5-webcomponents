import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import {
	isLeft,
	isRight,
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/Keys.js";
import {
	fetchI18nBundle,
	getI18nBundle,
} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
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
import CarouselTemplate from "./generated/templates/CarouselTemplate.lit.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/slim-arrow-right.js";

import Button from "./Button.js";
import Label from "./Label.js";

// Styles
import CarouselCss from "./generated/themes/Carousel.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-carousel",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {
		/**
		 * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		cyclic: {
			type: Boolean,
		},

		/**
		 * Defines the number of items per page on small size (up to 640px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageS: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageM: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines the number of items per page on large size (more than 1024px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageL: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines the visibility of the navigation arrows.
		 * If set to true the navigation arrows will be hidden.
		 * <br><br>
		 * <b>Note:</b> The navigation arrows are never displayed on touch devices.
		 * In this case, the user can swipe to navigate through the items.
		 * @type {boolean}
		 * @since 1.0.0-rc.15
		 * @defaultvalue false
		 * @public
		 */
		hideNavigationArrows: {
			type: Boolean,
		},

		/**
		 * Defines the visibility of the paging indicator.
		 * If set to true the page indicator will be hidden.
		 * @type {boolean}
		 * @since 1.0.0-rc.15
		 * @defaultvalue false
		 * @public
		 */
		hidePageIndicator: {
			type: Boolean,
		},

		/**
		 * Defines the index of the initially selected item.
		 * @type {Integer}
		 * @defaultvalue 0
		 * @private
		 */
		_selectedIndex: {
			type: Integer,
			defaultValue: 0,
		},

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
		 * @type {CarouselArrowsPlacement}
		 * @defaultvalue "Content"
		 * @public
		 */
		arrowsPlacement: {
			type: CarouselArrowsPlacement,
			defaultValue: CarouselArrowsPlacement.Content,
		},

		/**
		 * Defines the carousel width in pixels.
		 * @private
		 */
		_width: {
			type: Integer,
		},

		/**
		 * Defines the carousel item width in pixels.
		 * @private
		 */
		_itemWidth: {
			type: Integer,
		},

		/**
		 * If set to true navigation arrows are shown.
		 * @private
		 * @since 1.0.0-rc.15
		 */
		_visibleNavigationArrows: {
			type: Boolean,
			noAttribute: true,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {
		/**
		 * Defines the content of the component.
		 * @type {HTMLElement[]}
		 * @slot content
		 * @public
		 */
		"default": {
			propertyName: "content",
			type: HTMLElement,
			individualSlots: true,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {

		/**
		 * Fired whenever the page changes due to user interaction,
		 * when the user clicks on the navigation arrows or while resizing,
		 * based on the <code>items-per-page-l</code>, <code>items-per-page-m</code> and <code>items-per-page-s</code> properties.
		 *
		 * @event
		 * @param {Integer} selectedIndex the current selected index
		 * @public
		 * @since 1.0.0-rc.7
		 */
		navigate: {
			detail: {
				selectedIndex: { type: Integer },
			},
		},
	},
};

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
 * When the <code>ui5-carousel</code> is focused the user can navigate between the items
 * with the following keyboard shortcuts:
 * <br>
 *
 * <ul>
 * <li>[UP/DOWN] - Navigates to previous and next item</li>
 * <li>[LEFT/RIGHT] - Navigates to previous and next item</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Carousel.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Carousel
 * @extends UI5Element
 * @tagname ui5-carousel
 * @since 1.0.0-rc.6
 * @public
 */
class Carousel extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return CarouselCss;
	}

	static get template() {
		return CarouselTemplate;
	}

	static get pageTypeLimit() {
		return 9;
	}

	constructor() {
		super();

		this._scrollEnablement = new ScrollEnablement(this);
		this._scrollEnablement.attachEvent("touchend", event => {
			this._updateScrolling(event);
		});

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this._onResizeBound = this._onResize.bind(this);
		this._resizing = false; // indicates if the carousel is in process of resizing
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

	_updateScrolling(event) {
		if (!event) {
			return;
		}

		if (event.isLeft) {
			this.navigateLeft();
		} else if (event.isRight) {
			this.navigateRight();
		}
	}

	_onkeydown(event) {
		if (event.target !== this.getDomRef()) {
			return;
		}

		if (isLeft(event) || isDown(event)) {
			this.navigateLeft();
		} else if (isRight(event) || isUp(event)) {
			this.navigateRight();
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
			this.fireEvent("navigate", { selectedIndex: this._selectedIndex });
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
			this.fireEvent("navigate", { selectedIndex: this._selectedIndex });
		}
	}

	/**
	 * Changes the currently displayed page.
	 * @param {Integer} itemIndex The index of the target page
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
				posinset: idx + 1,
				setsize: this.content.length,
				width: this._itemWidth,
				classes: visible ? "" : "ui5-carousel-item--hidden",
			};
		});
	}

	get effectiveItemsPerPage() {
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
		return {
			content: {
				transform: `translateX(${this._isRTL ? "" : "-"}${this._selectedIndex * this._itemWidth}px`,
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
		return this.pagesCount < Carousel.pageTypeLimit;
	}

	get dots() {
		const dots = [];
		const pages = this.pagesCount;

		for (let index = 0; index < pages; index++) {
			dots.push({
				active: index === this._selectedIndex,
				ariaLabel: this.i18nBundle.getText(CAROUSEL_DOT_TEXT, [index + 1], [pages]),
			});
		}

		return dots;
	}

	get arrows() {
		const showArrows = this._visibleNavigationArrows && this.hasManyPages && isDesktop();

		return {
			content: !this.hideNavigationArrows && showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Content,
			navigation: !this.hideNavigationArrows && showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
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
		return this.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	get ariaActiveDescendant() {
		return this.content.length ? `${this._id}-carousel-item-${this._selectedIndex + 1}` : undefined;
	}

	get nextPageText() {
		return this.i18nBundle.getText(CAROUSEL_NEXT_ARROW_TEXT);
	}

	get previousPageText() {
		return this.i18nBundle.getText(CAROUSEL_PREVIOUS_ARROW_TEXT);
	}

	/**
	 * The indices of the currently visible items of the component.
	 * @readonly
	 * @since 1.0.0-rc.15
	 * @returns {Integer[]} the indices of the visible items
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

	static get dependencies() {
		return [
			Button,
			Label,
		];
	}

	static async onDefine() {
		await fetchI18nBundle("@ui5/webcomponents");
	}
}

Carousel.define();

export default Carousel;
