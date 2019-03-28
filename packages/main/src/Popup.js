import WebComponent from "@ui5/webcomponents-base/src/WebComponent";
import FocusHelper from "@ui5/webcomponents-base/src/FocusHelper";
import Integer from "@ui5/webcomponents-base/src/types/Integer";
import ShadowDOM from "@ui5/webcomponents-base/src/compatibility/ShadowDOM";

// Styles
import belize from "./themes/sap_belize/Popup.less";
import belizeHcb from "./themes/sap_belize_hcb/Popup.less";
import fiori3 from "./themes/sap_fiori_3/Popup.less";
import { isEscape } from "@ui5/webcomponents-base/src/events/PseudoEvents";

ShadowDOM.registerStyle("sap_belize", "Popup.css", belize);
ShadowDOM.registerStyle("sap_belize_hcb", "Popup.css", belizeHcb);
ShadowDOM.registerStyle("sap_fiori_3", "Popup.css", fiori3);

/**
 * @public
 */
const metadata = {
	"abstract": true,
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {

		/**
		 * Defines the content of the Web Component.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		content: {
			type: HTMLElement,
			multiple: true,
		},

		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement}
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
		 * @public
		 */
		initialFocus: {
			type: String,
			defaultValue: null,
			association: true,
		},
		/**
		 * Defines whether the header is hidden.
		 *
		 * @type {Boolean}
		 * @public
		 */
		hideHeader: {
			type: Boolean,
		},
		/**
		 * Defines the header text.
		 *
		 * @type {string}
		 * @public
		 */
		headerText: {
			type: String,
			defaultValue: "",
		},

		_isOpen: {
			type: Boolean,
		},
		_zIndex: {
			type: Integer,
		},
		_hideBlockLayer: {
			type: Boolean,
		},
	},
	events: {
		/**
		 * Fired before the Web Component is opened.
		 *
		 * @public
		 * @event
		 */
		beforeOpen: {},
		/**
		 * Fired after the Web Component is opened.
		 *
		 * @public
		 * @event
		 */
		afterOpen: {},
		/**
		 * Fired before the Web Component is closed.
		 *
		 * @public
		 * @event
		 * @param {Boolean} escPressed Indicate that ESC key triggered the event.
		 */
		beforeClose: {
			escPressed: { type: Boolean },
		},
		/**
		 * Fired after the Web Component is closed.
		 *
		 * @public
		 * @event
		 */
		afterClose: {},
	},
};

const openedPopups = [];
let currentZIndex = 100;
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

	const stylesheet = document.styleSheets[0];
	stylesheet.insertRule(".sapUiBLyBack {overflow: hidden;position: fixed;width:100%;height: 100%;}", 0);
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
		document.body.style.top = `-${window.pageYOffset}px`;
		document.body.classList.add("sapUiBLyBack");
	} else {
		document.body.classList.remove("sapUiBLyBack");
		window.scrollTo(0, -parseFloat(document.body.style.top));
		document.body.style.top = "";
	}

	isBodyScrollingDisabled = hasModal;
}

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Represents a base class for all popup Web Components.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popup
 * @extends sap.ui.webcomponents.base.WebComponent
 * @public
 */
class Popup extends WebComponent {
	static get metadata() {
		return metadata;
	}

	static getNextZIndex() {
		currentZIndex += 2;
		return currentZIndex;
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
		return domRef && domRef.querySelector(".sapMPopup");
	}

	hitTest(_event) {
		return true;
	}

	open() {
		this.fireEvent("beforeOpen", { });

		this._isFirstTimeRendered = false;

		this._zIndex = Popup.getNextZIndex();
		openedPopups.push(this);

		updateBlockLayers();

		document.addEventListener("keydown", this._documentKeyDownHandler, true);
	}

	close() {
		this.fireEvent("beforeClose", {
			escPressed: this.escPressed,
		}, true);

		this.escPressed = false;

		document.removeEventListener("keydown", this._documentKeyDownHandler, true);

		const index = openedPopups.indexOf(this);
		openedPopups.splice(index, 1);

		updateBlockLayers();
	}

	initInitialFocus() {
		const initialFocus = this.initialFocus;
		let initialFocusDomRef = this.initialFocus;

		if (typeof initialFocus === "string") {
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
		if (!this._isOpen) {
			return;
		}

		if (!this._isFirstTimeRendered) {
			this.onFirstTimeAfterRendering();
			this._isFirstTimeRendered = true;
		}
	}

	setInitialFocus(container) {
		if (this._initialFocusDomRef) {
			if (this._initialFocusDomRef !== document.activeElement) {
				this._initialFocusDomRef.focus();
			}
			return;
		}

		if (!container) {
			return;
		}

		const focusableElement = FocusHelper.findFirstFocusableElement(container);

		if (focusableElement) {
			focusableElement.focus();
		} else {
			container.focus();
		}
	}

	onfocusin(event) {
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
			focusableElement = FocusHelper.findLastFocusableElement(container);
			isSpecialCase = true;
			break;
		case `${this._id}-lastfe`:
			focusableElement = FocusHelper.findFirstFocusableElement(container);
			isSpecialCase = true;
			break;
		case `${this._id}-blocklayer`:
			focusableElement = this._currentFocusedElement
				|| FocusHelper.findFirstFocusableElement(container);
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

		this._lastFocusableElement = element;
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
}

export default Popup;
