import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import {
	isLeft,
	isRight,
	isDown,
	isUp,
} from "@ui5/webcomponents-base/dist/events/PseudoEvents.js";
import {
	fetchI18nBundle,
	getI18nBundle,
} from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ScrollEnablement from "@ui5/webcomponents-base/dist/delegate/ScrollEnablement.js";
import {
	CAROUSEL_OF_TEXT,
} from "./generated/i18n/i18n-defaults.js";
import CarouselArrowsPlacement from "./types/CarouselArrowsPlacement.js";
import CarouselTemplate from "./generated/templates/CarouselTemplate.lit.js";
import { isMobile } from "@ui5/webcomponents-base/dist/Device.js";

// Styles
import CarouselCss from "./generated/themes/Carousel.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-carousel",
	properties: /** @lends sap.ui.webcomponents.main.Carousel.prototype */ {
		/**
		 * If set to true the navigation is hidden
		 * @type {Boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideNavigation: {
			type: Boolean,
		},

		/**
		 * Defines the index of the initially selected slot
		 * @type {Integer}
		 * @defaultvalue 1
		 * @public
		 */
		selectedIndex: {
			type: Integer,
			defaultValue: 1,
		},

		/**
		 * Defines the position of arrows
		 * @type {CarouselArrowsPlacement}
		 * @defaultvalue CarouselArrowsPlacement.Content
		 * @public
		 */
		arrowsPlacement: {
			type: CarouselArrowsPlacement,
			defaultValue: CarouselArrowsPlacement.Content,
		},
	},
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
 * The control is mostly used for showing a gallery of images, but can hold any other HTML element.
 *
 * <h3>Usage</h3>
 *
 * When to use
 *   - The items you want to display are very different from each other.
 *   - You want to display the items one after the other.
 * When not to use
 *   - The items you want to display need to be visible at the same time.
 *   - The items you want to display are uniform and very similar
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

	constructor() {
		super();
		
		this._scrollEnablement = new ScrollEnablement(this);
		this._scrollEnablement.attachEvent("touchend", (event) => {
			this._updateScrolling(event);
		})

		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onAfterRendering() {
		this._scrollEnablement.scrollContainer = this.getDomRef();
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
		this.selectedIndex = this.selectedIndex - 1 < 1 ? this.content.length : --this.selectedIndex;
	}

	navigateRight() {
		this.selectedIndex = this.selectedIndex + 1 > this.content.length ? 1 : ++this.selectedIndex;
	}

	get items() {
		return this.content.map((item, index) => {
			return {
				item,
				tabindex: index + 1 === this.selectedIndex ? "0" : "-1",
			};
		});
	}

	get styles() {
		return {
			content: {
				"left": `-${(this.selectedIndex - 1) * 100}%`,
			},
		};
	}

	get classes() {
		return {
			navigation: {
				"ui5-carousel-navigation-wrapper": true,
				"ui5-carousel-navigation-with-buttons": this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
			},
		};
	}

	get isPageTypeDots() {
		return this.content.length < 9;
	}

	get dots() {
		return this.content.map((item, index) => {
			return {
				active: index === this.selectedIndex - 1,
			};
		});
	}

	get arrows() {
		return {
			content: !isMobile() && this.arrowsPlacement === CarouselArrowsPlacement.Content,
			navigation: !isMobile() && this.arrowsPlacement === CarouselArrowsPlacement.Navigation,
		};
	}

	get ofText() {
		return this.i18nBundle.getText(CAROUSEL_OF_TEXT);
	}

	static async define(...params) {
		await Promise.all([
			fetchI18nBundle("@ui5/webcomponents"),
		]);
		super.define(...params);
	}
}

Carousel.define();

export default Carousel;
