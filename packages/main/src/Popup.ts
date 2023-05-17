import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import type { ClassMap } from "@ui5/webcomponents-base/dist/types.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isChrome } from "@ui5/webcomponents-base/dist/Device.js";
import { getFirstFocusableElement, getLastFocusableElement } from "@ui5/webcomponents-base/dist/util/FocusableElements.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import { hasStyle, createStyle } from "@ui5/webcomponents-base/dist/ManagedStyles.js";
import { isEnter, isTabPrevious } from "@ui5/webcomponents-base/dist/Keys.js";
import { getNextZIndex, getFocusedElement, isFocusedElementWithinNode } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import MediaRange from "@ui5/webcomponents-base/dist/MediaRange.js";
import PopupTemplate from "./generated/templates/PopupTemplate.lit.js";
import PopupBlockLayer from "./generated/templates/PopupBlockLayerTemplate.lit.js";
import PopupAccessibleRole from "./types/PopupAccessibleRole.js";
import { addOpenedPopup, removeOpenedPopup } from "./popup-utils/OpenedPopupsRegistry.js";

// Styles
import popupStlyes from "./generated/themes/Popup.css.js";
import popupStaticAreaStyles from "./generated/themes/PopupStaticAreaStyles.css.js";
import globalStyles from "./generated/themes/PopupGlobal.css.js";

const createBlockingStyle = (): void => {
	if (!hasStyle("data-ui5-popup-scroll-blocker")) {
		createStyle(globalStyles, "data-ui5-popup-scroll-blocker");
	}
};

createBlockingStyle();

const pageScrollingBlockers = new Set<Popup>();

type PopupScrollEventDetail = {
	scrollTop: number;
	targetRef: HTMLElement;
}

type PopupBeforeCloseEventDetail = {
	escPressed: boolean;
}

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
 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
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
 * @alias sap.ui.webc.main.Popup
 * @extends sap.ui.webc.base.UI5Element
 * @public
 */
@customElement({
	renderer: litRender,
	styles: popupStlyes,
	template: PopupTemplate,
	staticAreaTemplate: PopupBlockLayer,
	staticAreaStyles: popupStaticAreaStyles,
})
/**
 * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Popup#before-open
 * @allowPreventDefault
 */
@event("before-open")

/**
 * Fired after the component is opened. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Popup#after-open
 */
@event("after-open")

/**
 * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Popup#before-close
 * @allowPreventDefault
 * @param {boolean} escPressed Indicates that <code>ESC</code> key has triggered the event.
 */
@event("before-close", {
	escPressed: { type: Boolean },
})

/**
 * Fired after the component is closed. <b>This event does not bubble.</b>
 *
 * @public
 * @event sap.ui.webc.main.Popup#after-close
 */
@event("after-close")

/**
 * Fired whenever the popup content area is scrolled
 *
 * @private
 * @event sap.ui.webc.main.Popup#scroll
 */
@event("scroll")
abstract class Popup extends UI5Element {
	/**
	 * Defines the ID of the HTML Element, which will get the initial focus.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Popup.prototype.initialFocus
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	initialFocus!: string;

	/**
	 * Defines if the focus should be returned to the previously focused element,
	 * when the popup closes.
	 * @type {boolean}
	 * @name sap.ui.webc.main.Popup.prototype.preventFocusRestore
	 * @defaultvalue false
	 * @public
	 * @since 1.0.0-rc.8
	*/
	@property({ type: Boolean })
	preventFocusRestore!: boolean;

	/**
	 * Indicates if the element is open
	 * @public
	 * @type {boolean}
	 * @name sap.ui.webc.main.Popup.prototype.open
	 * @defaultvalue false
	 * @since 1.2.0
	 */
	@property({ type: Boolean })
	open!: boolean;

	/**
	 * Indicates if the element is already open
	 * @private
	 * @type {boolean}
	 * @defaultvalue false
	 */
	@property({ type: Boolean, noAttribute: true })
	opened!: boolean;

	/**
	 * Defines the accessible name of the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Popup.prototype.accessibleName
	 * @defaultvalue undefined
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ defaultValue: undefined })
	accessibleName?: string;

	/**
	 * Defines the IDs of the elements that label the component.
	 *
	 * @type {string}
	 * @name sap.ui.webc.main.Popup.prototype.accessibleNameRef
	 * @defaultvalue ""
	 * @public
	 * @since 1.1.0
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Allows setting a custom role. Available options are:
	 * <ul>
	 * <li><code>Dialog</code></li>
	 * <li><code>None</code></li>
	 * <li><code>AlertDialog</code></li>
	 * </ul>
	 * @type {sap.ui.webc.main.types.PopupAccessibleRole}
	 * @name sap.ui.webc.main.Popup.prototype.accessibleRole
	 * @defaultvalue "Dialog"
	 * @public
	 * @since 1.10.0
	 */
	@property({ type: PopupAccessibleRole, defaultValue: PopupAccessibleRole.Dialog })
	accessibleRole!: `${PopupAccessibleRole}`;

	/**
	 * Defines the current media query size.
	 *
	 * @type {string}
	 * @private
	 */
	@property()
	mediaRange!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	_disableInitialFocus!: boolean;

	@property({ type: Boolean })
	_blockLayerHidden!: boolean;

	/**
	 * Indicates if the element is the top modal popup
	 *
	 * This property is calculated automatically
	 *
	 * @private
	 * @type {boolean}
	 * @defaultvalue false
	 */
	@property({ type: Boolean, noAttribute: true })
	isTopModalPopup!: boolean;

	/**
	 * Defines the content of the Popup.
	 * @type {HTMLElement[]}
	 * @name sap.ui.webc.main.Popup.prototype.default
	 * @slot content
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>

	_resizeHandler: ResizeObserverCallback;
	_shouldFocusRoot?: boolean;
	_zIndex?: number;
	_focusedElementBeforeOpen?: HTMLElement | null;

	constructor() {
		super();

		this._resizeHandler = this._resize.bind(this);
	}

	onBeforeRendering() {
		this._blockLayerHidden = !this.isOpen() || !this.isTopModalPopup;
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._resizeHandler);
	}

	onExitDOM() {
		if (this.isOpen()) {
			Popup.unblockPageScrolling(this);
			this._removeOpenedPopup();
		}

		ResizeHandler.deregister(this, this._resizeHandler);
	}

	get _displayProp() {
		return "block";
	}

	_resize() {
		this.mediaRange = MediaRange.getCurrentRange(MediaRange.RANGESETS.RANGE_4STEPS, this.getDomRef()!.offsetWidth);
	}

	/**
	 * Prevents the user from interacting with the content under the block layer
	 */
	_preventBlockLayerFocus(e: KeyboardEvent | MouseEvent) {
		e.preventDefault();
	}

	/**
	 * Temporarily removes scrollbars from the html element
	 * @protected
	 */
	static blockPageScrolling(popup: Popup) {
		pageScrollingBlockers.add(popup);

		if (pageScrollingBlockers.size !== 1) {
			return;
		}

		document.documentElement.classList.add("ui5-popup-scroll-blocker");
	}

	/**
	 * Restores scrollbars on the html element, if needed
	 * @protected
	 */
	static unblockPageScrolling(popup: Popup) {
		pageScrollingBlockers.delete(popup);

		if (pageScrollingBlockers.size !== 0) {
			return;
		}

		document.documentElement.classList.remove("ui5-popup-scroll-blocker");
	}

	_scroll(e: Event) {
		this.fireEvent<PopupScrollEventDetail>("scroll", {
			scrollTop: (e.target as HTMLElement).scrollTop,
			targetRef: e.target as HTMLElement,
		});
	}

	_onkeydown(e: KeyboardEvent) {
		const isTabOutAttempt = e.target === this._root && isTabPrevious(e);
		// if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
		const isEnterOnClosedPopupChild = isEnter(e) && !this.isOpen();

		if (isTabOutAttempt || isEnterOnClosedPopupChild) {
			e.preventDefault();
		}
	}

	_onfocusout(e: FocusEvent) {
		// relatedTarget is the element, which will get focus. If no such element exists, focus the root.
		// This happens after the mouse is released in order to not interrupt text selection.
		if (!e.relatedTarget) {
			this._shouldFocusRoot = true;
		}
	}

	_onmousedown(e: MouseEvent) {
		this._root.removeAttribute("tabindex");

		if (this.shadowRoot!.contains(e.target as HTMLElement)) {
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
			firstFocusable.focus({ focusVisible: true } as FocusOptions);
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
			lastFocusable.focus({ focusVisible: true } as FocusOptions);
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
	 * @method
	 * @name sap.ui.webc.main.Popup#applyFocus
	 * @async
	 * @returns {Promise} Promise that resolves when the focus is applied
	 */
	async applyFocus() {
		await this._waitForDomRef();

		const element = (this.getRootNode() as Document).getElementById(this.initialFocus)
			|| document.getElementById(this.initialFocus)
			|| await getFirstFocusableElement(this)
			|| this._root; // in case of no focusable content focus the root

		if (element) {
			if (element === this._root) {
				element.tabIndex = -1;
			}
			element.focus({ focusVisible: true } as FocusOptions);
		}
	}

	/**
	 * Tells if the component is opened
	 * @public
	 * @method
	 * @name sap.ui.webc.main.Popup#isOpen
	 * @returns {boolean}
	 */
	isOpen() {
		return this.opened;
	}

	isFocusWithin() {
		return isFocusedElementWithinNode(this._root);
	}

	/**
	 * Shows the block layer (for modal popups only) and sets the correct z-index for the purpose of popup stacking
	 * @protected
	 */
	async _open(preventInitialFocus: boolean) {
		const prevented = !this.fireEvent("before-open", {}, true, false);
		if (prevented) {
			return;
		}

		if (this.isModal && !this.shouldHideBackdrop) {
			// create static area item ref for block layer
			this.getStaticAreaItemDomRef();
			this._blockLayerHidden = false;
			Popup.blockPageScrolling(this);
		}

		this._zIndex = getNextZIndex();
		this.style.zIndex = this._zIndex?.toString() || "";

		this._focusedElementBeforeOpen = getFocusedElement();

		this._show();

		this._addOpenedPopup();

		this.opened = true;
		this.open = true;

		await renderFinished();

		if (!this._disableInitialFocus && !preventInitialFocus) {
			await this.applyInitialFocus();
		}

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
	 * Closes the popup.
	 * @public
	 * @method
	 * @name sap.ui.webc.main.Popup#close
	 * @returns {void}
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
		if (!this.opened) {
			return;
		}

		const prevented = !this.fireEvent<PopupBeforeCloseEventDetail>("before-close", { escPressed }, true, false);
		if (prevented) {
			return;
		}

		if (this.isModal) {
			this._blockLayerHidden = true;
			Popup.unblockPageScrolling(this);
		}

		this.hide();
		this.opened = false;
		this.open = false;

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

		this._focusedElementBeforeOpen.focus({ focusVisible: true } as FocusOptions);
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
	abstract get isModal(): boolean

	/**
	 * Implement this getter with relevant logic in order to hide the block layer (f.e. based on a public property)
	 *
	 * @protected
	 * @abstract
	 * @returns {boolean}
	 */
	abstract get shouldHideBackdrop(): boolean

	/**
	 * Return the ID of an element in the shadow DOM that is going to label this popup
	 *
	 * @protected
	 * @abstract
	 * @returns {string | undefined}
	 */
	abstract get _ariaLabelledBy(): string | undefined

	/**
	 * Ensures ariaLabel is never null or empty string
	 * @returns {string | undefined}
	 * @protected
	 */
	get _ariaLabel() {
		return getEffectiveAriaLabelText(this);
	}

	get _root(): HTMLElement {
		return this.shadowRoot!.querySelector(".ui5-popup-root")!;
	}

	get _role(): string | undefined {
		return (this.accessibleRole === PopupAccessibleRole.None) ? undefined : this.accessibleRole.toLowerCase();
	}

	get _ariaModal(): string | undefined {
		return this.accessibleRole === PopupAccessibleRole.None ? undefined : "true";
	}

	get contentDOM(): HTMLElement {
		return this.shadowRoot!.querySelector(".ui5-popup-content")!;
	}

	get styles() {
		return {
			root: {},
			content: {},
			blockLayer: {
				"zIndex": this._zIndex ? this._zIndex - 1 : "",
			},
		};
	}

	get classes(): ClassMap {
		return {
			root: {
				"ui5-popup-root": true,
				"ui5-content-native-scrollbars": getEffectiveScrollbarStyle(),
			},
			content: {
				"ui5-popup-content": true,
			},
		};
	}
}

export default Popup;

export type {
	PopupScrollEventDetail,
	PopupBeforeCloseEventDetail,
};
