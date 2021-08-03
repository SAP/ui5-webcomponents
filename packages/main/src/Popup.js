import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isChrome } from "@ui5/webcomponents-base/dist/Device.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import createStyleInHead from "@ui5/webcomponents-base/dist/util/createStyleInHead.js";
import { isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import { getNextZIndex, getFocusedElement, isFocusedElementWithinNode } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import PopupTemplate from "./generated/templates/PopupTemplate.lit.js";
import PopupBlockLayer from "./generated/templates/PopupBlockLayerTemplate.lit.js";
import { getOpenedPopups, addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";

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
		 * Defines the content of the Popup.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
			propertyName: "content",
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
		 * Defines if the focus should be returned to the previously focused element,
		 * when the popup closes.
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 * @since 1.0.0-rc.8
		*/
		preventFocusRestore: {
			type: Boolean,
		},

		/**
		 * Indicates if the element is open
		 * @private
		 * @type {boolean}
		 * @defaultvalue false
		 */
		opened: {
			type: Boolean,
		},

		/**
		 * Sets the accessible aria name of the component.
		 *
		 * @type {String}
		 * @defaultvalue ""
		 * @public
		 * @since 1.0.0-rc.15
		 */
		accessibleName: {
			type: String,
			defaultValue: undefined,
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
		 * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. <b>This event does not bubble.</b>
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#before-open
		 * @allowPreventDefault
		 */
		"before-open": {},

		/**
		 * Fired after the component is opened. <b>This event does not bubble.</b>
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#after-open
		 */
		"after-open": {},

		/**
		 * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. <b>This event does not bubble.</b>
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#before-close
		 * @allowPreventDefault
		 * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
		 */
		"before-close": {
			detail: {
				escPressed: { type: Boolean },
			},
		},

		/**
		 * Fired after the component is closed. <b>This event does not bubble.</b>
		 *
		 * @public
		 * @event sap.ui.webcomponents.main.Popup#after-close
		 */
		"after-close": {},

		/**
		 * Fired whenever the popup content area is scrolled
		 *
		 * @private
		 * @event sap.ui.webcomponents.main.Popup#scroll
		 */
		"scroll": {},
	},
};

let customBlockingStyleInserted = false;

const createBlockingStyle = () => {
	if (customBlockingStyleInserted) {
		return;
	}

	createStyleInHead(`
		.ui5-popup-scroll-blocker {
			width: 100%;
			height: 100%;
			position: fixed;
			overflow: hidden;
		}
	`, { "data-ui5-popup-scroll-blocker": "" });

	customBlockingStyleInserted = true;
};

createBlockingStyle();

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * Base class for all popup Web Components.
 *
 * If you need to create your own popup-like custom UI5 Web Components, it is highly recommended that you extend
 * at least Popup in order to have consistency with other popups in terms of modal behavior and z-index management.
 *
 * 1. The Popup class handles modality:
 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
 *  - Derivatives may call the "blockBodyScrolling" and "unblockBodyScrolling" static methods to temporarily remove scrollbars on the body
 *  - Derivatives may call the "open" and "close" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
 *
 *  2. Provides blocking layer (relevant for modal popups only):
 *   - It is in the static area
 *   - Controlled by the "open" and "close" methods
 *
 * 3. The Popup class "traps" focus:
 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
 *
 * 4. The Popup class automatically assigns "z-index"
 *  - Each time a popup is opened, it gets a higher than the previously opened popup z-index
 *
 * 5. The template of this component exposes two inline partials you can override in derivatives:
 *  - beforeContent (upper part of the box, useful for header/title/close button)
 *  - afterContent (lower part, useful for footer/action buttons)
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

	onEnterDOM() {
		if (!this.isOpen()) {
			this._blockLayerHidden = true;
		}
	}

	onExitDOM() {
		if (this.isOpen()) {
			Popup.unblockBodyScrolling();
			this._removeOpenedPopup();
		}
	}

	get _displayProp() {
		return "block";
	}

	/**
	 * Prevents the user from interacting with the content under the block layer
	 */
	_preventBlockLayerFocus(event) {
		event.preventDefault();
	}

	/**
	 * Temporarily removes scrollbars from the body
	 * @protected
	 */
	static blockBodyScrolling() {
		if (window.pageYOffset > 0) {
			document.body.style.top = `-${window.pageYOffset}px`;
		}
		document.body.classList.add("ui5-popup-scroll-blocker");
	}

	/**
	 * Restores scrollbars on the body, if needed
	 * @protected
	 */
	static unblockBodyScrolling() {
		document.body.classList.remove("ui5-popup-scroll-blocker");
		window.scrollTo(0, -parseFloat(document.body.style.top));
		document.body.style.top = "";
	}

	_scroll(e) {
		this.fireEvent("scroll", {
			scrollTop: e.target.scrollTop,
			targetRef: e.target,
		});
	}

	_onkeydown(e) {
		if (e.target === this._root && isTabPrevious(e)) {
			e.preventDefault();
		}
	}

	_onfocusout(e) {
		// relatedTarget is the element, which will get focus. If no such element exists, focus the root.
		// This happens after the mouse is released in order to not interrupt text selection.
		if (!e.relatedTarget) {
			this._shouldFocusRoot = true;
		}
	}

	_onmousedown(e) {
		this._root.removeAttribute("tabindex");

		if (this.shadowRoot.contains(e.target)) {
			this._shouldFocusRoot = true;
		} else {
			this._shouldFocusRoot = false;
		}
	}

	_onmouseup() {
		this._root.tabIndex = -1;
		if (this._shouldFocusRoot) {
			if (isChrome()) {
				this._root.focus();
			}
			this._shouldFocusRoot = false;
		}
	}

	/**
	 * Focus trapping
	 * @private
	 */
	async forwardToFirst() {
		const firstFocusable = await getFirstFocusableElement(this);

		if (firstFocusable) {
			firstFocusable.focus();
		} else {
			this._root.focus();
		}
	}

	/**
	 * Focus trapping
	 * @private
	 */
	async forwardToLast() {
		const lastFocusable = await getLastFocusableElement(this);

		if (lastFocusable) {
			lastFocusable.focus();
		} else {
			this._root.focus();
		}
	}

	/**
	 * Use this method to focus the element denoted by "initialFocus", if provided, or the first focusable element otherwise.
	 * @protected
	 */
	async applyInitialFocus() {
		await this.applyFocus();
	}

	/**
	 * Focuses the element denoted by <code>initialFocus</code>, if provided,
	 * or the first focusable element otherwise.
	 * @public
	 * @async
	 * @returns {Promise} Promise that resolves when the focus is applied
	 */
	async applyFocus() {
		await this._waitForDomRef();

		const element = this.getRootNode().getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus)
			|| await getFirstFocusableElement(this)
			|| this._root; // in case of no focusable content focus the root

		if (element) {
			if (element === this._root) {
				element.tabIndex = -1;
			}
			element.focus();
		}
	}

	/**
	 * Tells if the component is opened
	 * @public
	 * @returns {boolean}
	 */
	isOpen() {
		return this.opened;
	}

	isFocusWithin() {
		return isFocusedElementWithinNode(this.shadowRoot.querySelector(".ui5-popup-root"));
	}

	/**
	 * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
	 * @protected
	 */
	async _open(preventInitialFocus) {
		const prevented = !this.fireEvent("before-open", {}, true, false);
		if (prevented) {
			return;
		}

		if (this.isModal && !this.shouldHideBackdrop) {
			// create static area item ref for block layer
			this.getStaticAreaItemDomRef();
			this._blockLayerHidden = false;
			Popup.blockBodyScrolling();
		}

		this._zIndex = getNextZIndex();
		this.style.zIndex = this._zIndex;
		this._focusedElementBeforeOpen = getFocusedElement();

		this._show();

		if (!this._disableInitialFocus && !preventInitialFocus) {
			this.applyInitialFocus();
		}

		this._addOpenedPopup();

		this.opened = true;

		await renderFinished();
		this.fireEvent("after-open", {}, false, false);
	}

	/**
	 * Adds the popup to the "opened popups registry"
	 * @protected
	 */
	_addOpenedPopup() {
		addOpenedPopup(this);
	}

	/**
	 * Hides the block layer (for modal popups only)
	 * @public
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
		if (!this.opened) {
			return;
		}

		const prevented = !this.fireEvent("before-close", { escPressed }, true, false);
		if (prevented) {
			return;
		}

		const openedPopups = getOpenedPopups();
		if (this.isModal) {
			this._blockLayerHidden = true;
			if (openedPopups.length === 1) {
				Popup.unblockBodyScrolling();
			}
		}

		this.hide();
		this.opened = false;

		if (!preventRegistryUpdate) {
			this._removeOpenedPopup();
		}

		if (!this.preventFocusRestore && !preventFocusRestore) {
			this.resetFocus();
		}

		this.fireEvent("after-close", {}, false, false);
	}

	/**
	 * Removes the popup from the "opened popups registry"
	 * @protected
	 */
	_removeOpenedPopup() {
		removeOpenedPopup(this);
	}

	/**
	 * Returns the focus to the previously focused element
	 * @protected
	 */
	resetFocus() {
		if (!this._focusedElementBeforeOpen) {
			return;
		}

		this._focusedElementBeforeOpen.focus();
		this._focusedElementBeforeOpen = null;
	}

	/**
	 * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
	 * @protected
	 */
	_show() {
		this.style.display = this._displayProp;
	}

	/**
	 * Sets "none" display to the popup
	 * @protected
	 */
	hide() {
		this.style.display = "none";
	}

	/**
	 * Implement this getter with relevant logic regarding the modality of the popup (e.g. based on a public property)
	 *
	 * @protected
	 * @abstract
	 * @returns {boolean}
	 */
	get isModal() {} // eslint-disable-line

	/**
	 * Implement this getter with relevant logic in order to hide the block layer (f.e. based on a public property)
	 *
	 * @protected
	 * @abstract
	 * @returns {boolean}
	 */
	get shouldHideBackdrop() {} // eslint-disable-line

	/**
	 * Return the ID of an element in the shadow DOM that is going to label this popup
	 *
	 * @protected
	 * @abstract
	 * @returns {String}
	 */
	get _ariaLabelledBy() {} // eslint-disable-line

	/**
	 * Return the value for aria-modal for this popup
	 *
	 * @protected
	 * @abstract
	 * @returns {String}
	 */
	get _ariaModal() {} // eslint-disable-line

	/**
	 * Ensures ariaLabel is never null or empty string
	 * @returns {String|undefined}
	 * @protected
	 */
	get _ariaLabel() {
		return this.accessibleName || undefined;
	}

	get _root() {
		return this.shadowRoot.querySelector(".ui5-popup-root");
	}

	get styles() {
		return {
			root: {},
			content: {},
			blockLayer: {
				"zIndex": (this._zIndex - 1),
			},
		};
	}

	get classes() {
		return {
			root: {
				"ui5-popup-root": true,
			},
			content: {
				"ui5-popup-content": true,
			},
		};
	}
}

export default Popup;
