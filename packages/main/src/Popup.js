import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import { isEscape } from "@ui5/webcomponents-base/dist/Keys.js";

// Styles
import styles from "./generated/themes/Popup.css.js";

import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";
import { getNextZIndex } from "./popup-utils/PopupUtils.js";

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
		 * Indicates if the elements is on focus
		 * @private
		 */
		opened: {
			type: Boolean,
		},

		_zIndex: {
			type: Integer,
			noAttribute: true,
		},

		_hideBlockLayer: {
			type: Boolean,
			noAttribute: true,
		},

		/**
		 * @private
		 */
		_disableInitialFocus: {
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

		beforeOpen: {},
		/**
		 * Fired after the component is opened.
		 *
		 * @public
		 * @event
		 */

		afterOpen: {},
		/**
		 * Fired before the component is closed.
		 *
		 * @public
		 * @event
		 * @param {Boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
		 */

		beforeClose: {
			escPressed: { type: Boolean },
		},

		/**
		 * Fired after the component is closed.
		 *
		 * @public
		 * @event
		 */
		afterClose: {},
	},
};

const openedPopups = [];
let isBodyScrollingDisabled = false;
let customBLyBackStyleInserted = false;

function getParentHost(node) {
	while (node && !node.host) {
		node = node.parentNode;
	}

	return node && node.host;
}

function createBLyBackStyle() {
	if (customBLyBackStyleInserted) {
		return;
	}

	customBLyBackStyleInserted = true;

	const bodyStyleSheet = document.createElement("style");
	bodyStyleSheet.type = "text/css";
	bodyStyleSheet.innerHTML = `
		.ui5-popup-BLy--back {
			width: 100%;
			height: 100%;
			position: fixed;
			overflow: hidden;
		}
	`;
	document.head.appendChild(bodyStyleSheet);
}

function updateBlockLayers() {
	let popup,
		i,
		hasModal = false;

	for (i = openedPopups.length - 1; i >= 0; i--) {
		popup = openedPopups[i];
		if (hasModal) {
			popup._hideBlockLayer = true;
		} else {
			if (popup.isModal()) { // eslint-disable-line
				popup._hideBlockLayer = false;
				hasModal = true;
			}
		}
	}

	updateBodyScrolling(hasModal);
}

function updateBodyScrolling(hasModal) {
	if (isBodyScrollingDisabled === hasModal) {
		return;
	}

	createBLyBackStyle();

	if (hasModal) {
		addBodyStyles();
	} else {
		removeBodyStyles();
	}
	isBodyScrollingDisabled = hasModal;
}

function addBodyStyles() {
	document.body.style.top = `-${window.pageYOffset}px`;
	document.body.classList.add("ui5-popup-BLy--back");
}

function removeBodyStyles() {
	document.body.classList.remove("ui5-popup-BLy--back");
	window.scrollTo(0, -parseFloat(document.body.style.top));
	document.body.style.top = "";
}

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

	static get styles() {
		return styles;
	}

	static hitTest(popup, event) {
		const indexOf = openedPopups.indexOf(popup);
		let openedPopup;

		for (let i = indexOf; i < openedPopups.length; i++) {
			openedPopup = openedPopups[i];
			if (openedPopup.hitTest(event)) {
				return true;
			}
		}

		return false;
	}

	static hasModalPopup() {
		for (let i = 0; i < openedPopups.length; i++) {
			if (openedPopups[i].isModal()) {
				return true;
			}
		}

		return false;
	}

	constructor() {
		super();

		this._documentKeyDownHandler = this.documentKeyDown.bind(this);
	}

	isTopPopup() {
		return openedPopups.indexOf(this) === openedPopups.length - 1;
	}

	isModal() {
		return true;
	}

	documentKeyDown(event) {
		if (isEscape(event) && this.isTopPopup()) {
			this.escPressed = true;
			this.close();
		}
	}

	getPopupDomRef() {
		const domRef = this.getDomRef();
		return domRef && domRef.querySelector(".ui5-popup-root");
	}

	hitTest(_event) {
		return true;
	}

	open() {
		this.fireEvent("beforeOpen", { });

		this._isFirstTimeRendered = false;

		this._zIndex = getNextZIndex();
		openedPopups.push(this);
		addOpenedPopup(this);


		updateBlockLayers();
	}

	close() {
		this.fireEvent("beforeClose", {
			escPressed: this.escPressed,
		}, true);

		this.escPressed = false;

		const index = openedPopups.indexOf(this);
		openedPopups.splice(index, 1);

		if (this.opened) {
			removeOpenedPopup(this);
		}

		updateBlockLayers();
	}

	initInitialFocus() {
		const initialFocus = this.initialFocus;
		let initialFocusDomRef = this.initialFocus;

		if (initialFocus && typeof initialFocus === "string") {
			initialFocusDomRef = document.getElementById(initialFocus);

			if (!initialFocusDomRef) {
				const parentHost = getParentHost(this);
				if (parentHost) {
					initialFocusDomRef = parentHost.shadowRoot.querySelector(`#${initialFocus}`);
				}
			}
		}

		this._initialFocusDomRef = initialFocusDomRef;
	}

	onFirstTimeAfterRendering() {
		if (this.isTopPopup()) {
			this.initInitialFocus();
			this.setInitialFocus(this.getPopupDomRef());
		}

		this.fireEvent("afterOpen", {});
	}

	onAfterRendering() {
		if (!this.opened) {
			return;
		}

		if (!this._isFirstTimeRendered) {
			this.onFirstTimeAfterRendering();
			this._isFirstTimeRendered = true;
		}
	}

	setInitialFocus(container) {
		if (this._disableInitialFocus) {
			return;
		}

		if (this._initialFocusDomRef) {
			if (this._initialFocusDomRef !== document.activeElement) {
				this._initialFocusDomRef.focus();
			}
			return;
		}

		if (!container) {
			return;
		}

		const focusableElement = getFirstFocusableElement(container);

		if (focusableElement) {
			focusableElement.focus();
		} else {
			container.focus();
		}
	}

	_onfocusin(event) {
		this.preserveFocus(event, this.getPopupDomRef());
	}

	preserveFocus(event, container) {
		if (!this.isTopPopup()) {
			return;
		}

		let target = event.target;

		while (target.shadowRoot && target.shadowRoot.activeElement) {
			target = target.shadowRoot.activeElement;
		}

		let focusableElement;
		let isSpecialCase = false;

		switch (target.id) {
		case `${this._id}-firstfe`:
			focusableElement = getLastFocusableElement(container);
			isSpecialCase = true;
			break;
		case `${this._id}-lastfe`:
			focusableElement = getFirstFocusableElement(container);
			isSpecialCase = true;
			break;
		case `${this._id}-blocklayer`:
			focusableElement = this._currentFocusedElement
				|| getFirstFocusableElement(container);
			isSpecialCase = true;
			break;
		}

		if (focusableElement) {
			focusableElement.focus();
		} else if (isSpecialCase) {
			container.focus();
		}

		this._currentFocusedElement = focusableElement || document.activeElement;
	}

	storeCurrentFocus() {
		let element = document.activeElement;

		while (element.shadowRoot && element.shadowRoot.activeElement) {
			element = element.shadowRoot.activeElement;
		}

		this._lastFocusableElement = (element && typeof element.focus === "function") ? element : null;
	}

	resetFocus() {
		if (!this._lastFocusableElement) {
			return;
		}

		const lastFocusableElement = this._lastFocusableElement;
		if (lastFocusableElement) {
			lastFocusableElement.focus();
		}

		this._lastFocusableElement = null;
	}

	onExitDOM() {
		removeBodyStyles();
	}

	get hasHeader() {
		const hasHeaderText = this.headerText && this.headerText.length;
		return !!(hasHeaderText || this.header.length);
	}

	get hasFooter() {
		return !!this.footer.length;
	}

	get role() {
		return "heading";
	}
}

export default Popup;
