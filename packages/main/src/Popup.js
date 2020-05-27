import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import PopupTemplate from "./generated/templates/PopupTemplate.lit.js";
import PopupBlockLayer from "./generated/templates/PopupBlockLayerTemplate.lit.js";
import { getNextZIndex } from "./popup-utils/PopupUtils.js";

// Styles
import styles from "./generated/themes/Popup.css.js";
import staticAreaStyles from "./generated/themes/PopupStaticAreaStyles.css.js";

/**
 * @public
 */
const metadata = {
	managedSlots: true,
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Defines the content of the Web Component.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},

		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footer: {
			type: HTMLElement,
		},
	},
	properties: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {
		/**
		 * Defines the ID of the HTML Element, which will get the initial focus.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		initialFocus: {
			type: String,
		},

		/**
		 * Defines the header text.
		 * <br><br>
		 * <b>Note:</b> If <code>header</code> slot is provided, the <code>headerText</code> is ignored.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		headerText: {
			type: String,
		},

		/**
		 * Indicates if the elements is open
		 * @private
		 */
		opened: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		_disableInitialFocus: {
			type: Boolean,
		},

		_blockLayerHidden: {
			type: Boolean,
		},
	},
	events: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Fired before the component is opened.
		 *
		 * @public
		 * @event
		 */

		"before-open": {},
		/**
		 * Fired after the component is opened.
		 *
		 * @public
		 * @event
		 */

		"after-open": {},
		/**
		 * Fired before the component is closed.
		 *
		 * @public
		 * @event
		 * @param {Boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
		 */

		"before-close": {
			escPressed: { type: Boolean },
		},

		/**
		 * Fired after the component is closed.
		 *
		 * @public
		 * @event
		 */
		"after-close": {},
	},
};

let customBlockingStyleInserted = false;

const createBlockingStyle = () => {
	if (customBlockingStyleInserted) {
		return;
	}

	const styleTag = document.createElement("style");

	styleTag.innerHTML = `
		.ui5-dialog-scroll-blocker {
			width: 100%;
			height: 100%;
			position: fixed;
			overflow: hidden;
		}
	`;

	customBlockingStyleInserted = true;

	document.head.appendChild(styleTag);
};

createBlockingStyle();

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Represents a base class for all popup Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popup
 * @extends sap.ui.webcomponents.base.UI5Element
 * @public
 */
class Popup extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return styles;
	}

	static get template() {
		return PopupTemplate;
	}

	static get staticAreaTemplate() {
		return PopupBlockLayer;
	}

	static get staticAreaStyles() {
		return staticAreaStyles;
	}

	static blockBodyScrolling() {
		document.body.style.top = `-${window.pageYOffset}px`;
		document.body.classList.add("ui5-dialog-scroll-blocker");
	}

	static unblockBodyScrolling() {
		document.body.classList.remove("ui5-dialog-scroll-blocker");
		window.scrollTo(0, -parseFloat(document.body.style.top));
		document.body.style.top = "";
	}

	forwardToFirst() {
		const firstFocusable = getFirstFocusableElement(this);

		if (firstFocusable) {
			firstFocusable.focus();
		}
	}

	forwardToLast() {
		const lastFocusable = getLastFocusableElement(this);

		if (lastFocusable) {
			lastFocusable.focus();
		}
	}

	applyInitialFocus() {
		if (this._disableInitialFocus) {
			return;
		}

		const element = this.getRootNode().getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus)
			|| getFirstFocusableElement(this);

		if (element) {
			element.focus();
		}
	}

	isOpen() {
		return this.opened;
	}

	open() {
		if (this.isModal) {
			// create static area item ref for block layer
			this.getStaticAreaItemDomRef();
		}

		this._zIndex = getNextZIndex();
		this.style.zIndex = this._zIndex;

		this._blockLayerHidden = false;
	}

	close() {
		if (this.isModal) {
			this._blockLayerHidden = true;
		}
	}

	/**
	 * Sets "inline-block" display to the popup
	 *
	 * @protected
	 */
	show() {
		this.style.display = "inline-block";
	}


	/**
	 * Sets "none" display to the popup
	 *
	 * @protected
	 */
	hide() {
		this.style.display = "none";
	}

	get isModal() {
		return false;
	}

	get styles() {
		return {
			content: {},
			root: {},
			blockLayer: {
				"zIndex": (this._zIndex - 1),
			},
		};
	}
}

export default Popup;
