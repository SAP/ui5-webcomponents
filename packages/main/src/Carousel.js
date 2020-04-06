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
	properties: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {
		/**
		 * Defines whether the carousel should loop, i.e show the first page after the last page is reached and vice versa.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		cycling: {
			type: Boolean,
		},

		/**
		 * Sets the amount of items per page. If this property is set, on mobile devices it will always fallback to 1.
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		itemsPerPage: {
			type: Integer,
			defaultValue: 1,
		},

		itemsPerPageS: {
			type: Integer,
			defaultValue: undefined,
		},

		itemsPerPageM: {
			type: Integer,
			defaultValue: undefined,
		},

		itemsPerPageL: {
			type: Integer,
			defaultValue: undefined,
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
		 * Defines the index of the initially selected page.
		 * @type {Integer}
		 * @defaultvalue 0
		 * @public
		 */
		selectedIndex: {
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
		 * Defines the carousel width in pixels
		 * @private
		 */
		_width: {
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
		//
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
	}

	onAfterRendering() {
		this._scrollEnablement.scrollContainer = this.getDomRef();
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._onResizeBound);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResizeBound);
	}

	_onResize() {
		// const currentItem = (this.selectedIndex + 1) * this.effectiveItemsPerPage;
		this._width = this.offsetWidth;
		// this.selectedIndex = Math.ceil(currentItem / this.effectiveItemsPerPage);
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
		if (this.selectedIndex - 1 < 0) {
			if (this.cycling) {
				this.selectedIndex = this.pages.length - 1;
			}
		} else {
			--this.selectedIndex;
		}
	}

	navigateRight() {
		if (this.selectedIndex + 1 > this.pages.length - 1) {
			if (this.cycling) {
				this.selectedIndex = 0;
			}
		} else {
			++this.selectedIndex;
		}
	}

	get shouldAnimate() {
		return getAnimationMode() === AnimationMode.None;
	}

	/**
	 * Assuming that all items have the same width
	 * @private
	 */
	get pages() {
		const result = [],
			pagesCount = Math.ceil(this.content.length / this.effectiveItemsPerPage);

		for (let pageIdx = 0; pageIdx < pagesCount; pageIdx++) {
			result.push([]);
			for (let itemIdx = 0; itemIdx < this.effectiveItemsPerPage; itemIdx++) {
				const item = this.content[(pageIdx * this.effectiveItemsPerPage) + itemIdx];
				if (item) {
					result[pageIdx].push({
						item,
						tabIndex: pageIdx === this.selectedIndex ? "0" : "-1",
					});
				}
			}
			const itemsOnThisPage = result[pageIdx].length;
			const itemWidth = Math.floor(100 / itemsOnThisPage);
			result[pageIdx].forEach(item => {
				item.width = itemWidth;
			});
		}

		return result;
	}

	get effectiveItemsPerPage() {
		if (!isDesktop()) {
			return 1;
		}

		if (this.itemsPerPageS && this._width <= 640) {
			return this.itemsPerPageS;
		}

		if (this.itemsPerPageM && this._width <= 1024) {
			return this.itemsPerPageM;
		}

		if (this.itemsPerPageL) {
			return this.itemsPerPageL;
		}

		return this.itemsPerPage;
	}

	get styles() {
		return {
			content: {
				transform: `translateX(-${this.selectedIndex * 100}%)`,
			},
		};
	}

	get classes() {
		return {
			content: {
				"ui5-carousel-content": true,
				"ui5-carousel-content-no-animation": this.shouldAnimate,
				"ui5-carousel-content-has-navigation": this.showNavigationArrows,
				"ui5-carousel-content-has-navigation-and-buttons": this.showNavigationArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
			},
			navigation: {
				"ui5-carousel-navigation-wrapper": true,
				"ui5-carousel-navigation-with-buttons": this.showNavigationArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
			},
			page: {
				"ui5-carousel-page": true,
				"ui5-carousel-page-multiple": this.effectiveItemsPerPage > 1,
			},
		};
	}

	get isPageTypeDots() {
		return this.pages.length < Carousel.pageTypeLimit;
	}

	get dots() {
		return this.pages.map((item, index) => {
			return {
				active: index === this.selectedIndex,
			};
		});
	}

	get arrows() {
		const showArrows = this.showNavigationArrows && isDesktop();

		return {
			content: showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Content,
			navigation: showArrows && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
		};
	}

	get ofText() {
		return this.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	get currentlySelectedIndexToShow() {
		return this.selectedIndex + 1;
	}

	get showNavigationArrows() {
		return !this.hideNavigation && this.pages.length > 1;
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
