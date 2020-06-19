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
} from "./generated/i18n/i18n-defaults.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselTemplate from "./generated/templates/CarouselTemplate.lit.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-left.js";
import "@ui5/webcomponents-icons/dist/icons/slim-arrow-right.js";

import Button from "./Button.js";

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
		 * Sets the number of items per page on small size (up to 640px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageS: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Sets the number of items per page on medium size (from 640px to 1024px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageM: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Sets the number of items per page on large size (more than 1024px). One item per page shown by default.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPageL: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * If set to true the navigation is hidden.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideNavigation: {
			type: Boolean,
		},

		/**
		 * Defines the index of the initially selected item.
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		selectedIndex: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * Defines when the <code>load-more</code> event is thrown. If not applied the event will not be thrown.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 * @since 1.0.0-rc.8
		 */
		infiniteScrollOffset: {
			type: Integer,
			defaultValue: 1,
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
		 * Defines the carousel width in pixels
		 * @private
		 */
		_width: {
			type: Integer,
		},

		/**
		 * Defines the carousel item width in pixels
		 * @private
		 */
		_itemWidth: {
			type: Integer,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {
		/**
		 * Defines the content of the <code>ui5-carousel</code>.
		 * @type {HTMLElement[]}
		 * @slot
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
		 * Fired whenever the <code>selectedIndex</code> changes due to user interaction,
		 * when the user clicks on the navigation arrows or while resizing,
		 * based on the <code>items-per-page-l</code>, <code>items-per-page-m</code> and <code>items-per-page-s</code> properties.
		 *
		 * @event
		 * @param {Integer} selectedIndex the current <code>selectedIndex</code>.
		 * @public
		 * @since 1.0.0-rc.7
		 */
		navigate: {
			detail: {
				selectedIndex: { type: Integer },
			},
		},

		/**
		 * Fired for the last items of the <code>ui5-carousel</code> if it is scrolled and the direction of scrolling is to the end.
		 * The number of items for which the event is thrown is controlled by the <code>infiniteScrollOffset</code> property.
		 * @event sap.ui.webcomponents.main.Carousel#load-more
		 * @public
		 * @since 1.0.0-rc.8
		 */
		"load-more": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The carousel allows the user to browse through a set of items by swiping right or left.
 * The component is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * <h3>Usage</h3>
 *
 * When to use
 *
 * - The items you want to display are very different from each other.
 * - You want to display the items one after the other.
 * When not to use
 *
 * - The items you want to display need to be visible at the same time.
 * - The items you want to display are uniform and very similar
 *
 * For the <code>ui5-carousel</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import @ui5/webcomponents/dist/Carousel.js";</code>
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
		if (!this.isIndexInRange(this.selectedIndex)) {
			this.selectedIndex = 0;
			console.warn(`The "selectedIndex" is out of range, changed to: ${0}`); // eslint-disable-line
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

		if (this.selectedIndex > this.pagesCount - 1) {
			this.selectedIndex = this.pagesCount - 1;
			this.fireEvent("navigate", { selectedIndex: this.selectedIndex });
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

	navigateLeft() {
		this._resizing = false;

		const peviousSelectedIndex = this.selectedIndex;

		if (this.selectedIndex - 1 < 0) {
			if (this.cyclic) {
				this.selectedIndex = this.pagesCount - 1;
			}
		} else {
			--this.selectedIndex;
		}

		if (peviousSelectedIndex !== this.selectedIndex) {
			this.fireEvent("navigate", { selectedIndex: this.selectedIndex });
		}
	}

	navigateRight() {
		this._resizing = false;

		const peviousSelectedIndex = this.selectedIndex;

		if (this.selectedIndex + 1 > this.pagesCount - 1) {
			if (this.cyclic) {
				this.selectedIndex = 0;
			} else {
				return;
			}
		} else {
			++this.selectedIndex;
		}

		if (peviousSelectedIndex !== this.selectedIndex) {
			this.fireEvent("navigate", { selectedIndex: this.selectedIndex });
		}

		if (this.pagesCount - this.selectedIndex <= this.infiniteScrollOffset + 1) {
			this.fireEvent("load-more");
		}
	}

	/**
	 * Assuming that all items have the same width
	 * @private
	 */
	get items() {
		return this.content.map((item, idx) => {
			return {
				id: `${this._id}-carousel-item-${idx + 1}`,
				item,
				tabIndex: idx === this.selectedIndex ? "0" : "-1",
				posinset: idx + 1,
				setsize: this.content.length,
				width: this._itemWidth,
				classes: this.isItemInViewport(idx) ? "" : "ui5-carousel-item--hidden",
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
		return index >= this.selectedIndex && index <= this.selectedIndex + this.effectiveItemsPerPage - 1;
	}

	isIndexInRange(index) {
		return index >= 0 && index <= this.pagesCount - 1;
	}

	get styles() {
		return {
			content: {
				transform: `translateX(-${this.selectedIndex * this._itemWidth}px`,
			},
		};
	}

	get classes() {
		return {
			viewport: {
				"ui5-carousel-viewport--single": this.pagesCount === 1,
			},
			content: {
				"ui5-carousel-content": true,
				"ui5-carousel-content-no-animation": this.supressAimation,
				"ui5-carousel-content-has-navigation": this.showNavigationArrows,
				"ui5-carousel-content-has-navigation-and-buttons": this.showNavigationArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
			},
			navigation: {
				"ui5-carousel-navigation-wrapper": true,
				"ui5-carousel-navigation-with-buttons": this.showNavigationArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
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
				active: index === this.selectedIndex,
				ariaLabel: this.i18nBundle.getText(CAROUSEL_DOT_TEXT, [index + 1], [pages]),
			});
		}

		return dots;
	}

	get arrows() {
		const showArrows = this.showNavigationArrows && isDesktop();

		return {
			content: showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Content,
			navigation: showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
		};
	}

	get hasPrev() {
		return this.cyclic || this.selectedIndex - 1 >= 0;
	}

	get hasNext() {
		return this.cyclic || this.selectedIndex + 1 <= this.pagesCount - 1;
	}

	get supressAimation() {
		return this._resizing || getAnimationMode() === AnimationMode.None;
	}

	get selectedIndexToShow() {
		return this.selectedIndex + 1;
	}

	get showNavigationArrows() {
		return !this.hideNavigation && this.pagesCount > 1;
	}

	get ofText() {
		return this.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	get ariaActiveDescendant() {
		return this.content.length ? `${this._id}-carousel-item-${this.selectedIndex + 1}` : undefined;
	}

	static async onDefine() {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
			Button.define(),
		]);
	}
}

Carousel.define();

export default Carousel;
