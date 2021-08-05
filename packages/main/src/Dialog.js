import { isPhone, isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import {
	isUp, isDown, isLeft, isRight,
	isUpShift, isDownShift, isLeftShift, isRightShift,
} from "@ui5/webcomponents-base/dist/Keys.js";
import Popup from "./Popup.js";
import "@ui5/webcomponents-icons/dist/resize-corner.js";
import Icon from "./Icon.js";

// Template
import DialogTemplate from "./generated/templates/DialogTemplate.lit.js";
// Styles
import browserScrollbarCSS from "./generated/themes/BrowserScrollbar.css.js";
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import dialogCSS from "./generated/themes/Dialog.css.js";

/**
 * Defines the step size at which this component would change by when being dragged or resized with the keyboard.
 */
const STEP_SIZE = 16;

/**
 * @public
 */
const metadata = {
	tag: "ui5-dialog",
	slots: /** @lends  sap.ui.webcomponents.main.Dialog.prototype */ {
		/**
		 * Defines the header HTML Element.
		 * <br><br>
		 * <b>Note:</b> If <code>header</code> slot is provided, the labelling of the dialog is a responsibility of the application developer.
		 * <code>accessibleName</code> should be used.
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
	properties: /** @lends  sap.ui.webcomponents.main.Dialog.prototype */ {
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
		 * Sets the accessible aria name of the component.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		accessibleName: {
			type: String,
		},

		/**
		 * Determines whether the component should be stretched to fullscreen.
		 * <br><br>
		 * <b>Note:</b> The component will be stretched to approximately
		 * 90% of the viewport.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		stretch: {
			type: Boolean,
		},

		/**
		 * Determines whether the component is draggable.
		 * If this property is set to true, the Dialog will be draggable by its header.
		 * <br><br>
		 * <b>Note:</b> The component can be draggable only in desktop mode.
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.9
		 * @public
		 */
		draggable: {
			type: Boolean,
		},

		/**
		 * Configures the component to be resizable.
		 * If this property is set to true, the Dialog will have a resize handle in its bottom right corner in LTR languages.
		 * In RTL languages, the resize handle will be placed in the bottom left corner.
		 * <br><br>
		 * <b>Note:</b> The component can be resizable only in desktop mode.
		 * <br>
		 * <b>Note:</b> Upon resizing, externally defined height and width styling will be ignored.
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.10
		 * @public
		 */
		resizable: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		onPhone: {
			type: Boolean,
		},

		/**
		 * @private
		 */
		onDesktop: {
			type: Boolean,
		},
	},
};

/**
 * @class
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-dialog</code> component is used to temporarily display some information in a
 * size-limited window in front of the regular app screen.
 * It is used to prompt the user for an action or a confirmation.
 * The <code>ui5-dialog</code> interrupts the current app processing as it is the only focused UI element and
 * the main screen is dimmed/blocked.
 * The dialog combines concepts known from other technologies where the windows have
 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
 * <br><br>
 * The <code>ui5-dialog</code> is modal, which means that user action is required before returning to the parent window is possible.
 * The content of the <code>ui5-dialog</code> is fully customizable.
 *
 * <h3>Structure</h3>
 * A <code>ui5-dialog</code> consists of a header, content, and a footer for action buttons.
 * The <code>ui5-dialog</code> is usually displayed at the center of the screen.
 * Its position can be changed by the user. To enable this, you need to set the property <code>draggable</code> accordingly.

 *
 * <h3>Responsive Behavior</h3>
 * The <code>stretch</code> property can be used to stretch the
 * <code>ui5-dialog</code> on full screen.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Dialog";</code>
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>) inside <code>ui5-dialog</code>.
 * Ideally you should create all popups on the same level inside your HTML page and just open them from one another, rather than nesting them.
 *
 * <b>Note:</b> We don't recommend nesting popup-like components (<code>ui5-dialog</code>, <code>ui5-popover</code>) inside other components containing z-index.
 * This might break z-index management.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Dialog
 * @extends Popup
 * @tagname ui5-dialog
 * @public
 */
class Dialog extends Popup {
	constructor() {
		super();

		this._screenResizeHandler = this._center.bind(this);

		this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
		this._dragMouseUpHandler = this._onDragMouseUp.bind(this);

		this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
		this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
	}

	static get metadata() {
		return metadata;
	}

	static get dependencies() {
		return [
			Icon,
		];
	}

	static get template() {
		return DialogTemplate;
	}

	static get styles() {
		return [browserScrollbarCSS, PopupsCommonCss, dialogCSS];
	}

	static _isHeader(element) {
		return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
	}

	/**
	 * Shows the dialog.
	 *
	 * @param {boolean} preventInitialFocus Prevents applying the focus inside the popup
	 * @async
	 * @returns {Promise} Resolves when the dialog is open
	 * @public
	 */
	async show(preventInitialFocus = false) {
		await super._open(preventInitialFocus);
	}

	get isModal() { // Required by Popup.js
		return true;
	}

	get shouldHideBackdrop() { // Required by Popup.js
		return false;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		let ariaLabelledById;

		if (this.headerText !== "" && !this.accessibleName) {
			ariaLabelledById = "ui5-popup-header-text";
		}

		return ariaLabelledById;
	}

	get _ariaLabel() {
		let ariaLabel;

		if (this.header.length > 0 && !!this.accessibleName) {
			ariaLabel = this.accessibleName;
		}

		return this.accessibleName ? this.accessibleName : ariaLabel;
	}

	get _ariaModal() { // Required by Popup.js
		return true;
	}

	get _displayProp() {
		return "flex";
	}

	/**
	 * Determines if the header of the dialog should be shown.
	 */
	get _displayHeader() {
		return this.header.length || this.headerText || this.draggable || this.resizable;
	}

	get _movable() {
		return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
	}

	get _headerTabIndex() {
		return this._movable ? "0" : undefined;
	}

	_show() {
		super._show();
		this._center();
		this._attachResizeHandlers();
	}

	onBeforeRendering() {
		this._isRTL = this.effectiveDir === "rtl";
		this.onPhone = isPhone();
		this.onDesktop = isDesktop();
	}

	onExitDOM() {
		super.onExitDOM();
		this._detachResizeHandlers();
	}

	_attachResizeHandlers() {
		ResizeHandler.register(this, this._screenResizeHandler);
		ResizeHandler.register(document.body, this._screenResizeHandler);
	}

	_detachResizeHandlers() {
		ResizeHandler.deregister(this, this._screenResizeHandler);
		ResizeHandler.deregister(document.body, this._screenResizeHandler);
	}

	_center() {
		const height = window.innerHeight - this.offsetHeight,
			width = window.innerWidth - this.offsetWidth;

		Object.assign(this.style, {
			top: `${Math.round(height / 2)}px`,
			left: `${Math.round(width / 2)}px`,
		});
	}

	_revertSize() {
		Object.assign(this.style, {
			top: "",
			left: "",
			width: "",
			height: "",
		});
		this.removeEventListener("ui5-before-close", this._revertSize);
	}

	/**
	 * Event handlers
	 */
	_onDragMouseDown(event) {
		// allow dragging only on the header
		if (!this._movable || !this.draggable || !Dialog._isHeader(event.target)) {
			return;
		}

		event.preventDefault();

		const {
			top,
			left,
		} = this.getBoundingClientRect();
		const {
			width,
			height,
		} = window.getComputedStyle(this);

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
			width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
			height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`,
		});

		this._x = event.clientX;
		this._y = event.clientY;

		this._attachMouseDragHandlers();
	}

	_onDragMouseMove(event) {
		event.preventDefault();

		const calcX = this._x - event.clientX;
		const calcY = this._y - event.clientY;
		const {
			left,
			top,
		} = this.getBoundingClientRect();

		Object.assign(this.style, {
			left: `${Math.floor(left - calcX)}px`,
			top: `${Math.floor(top - calcY)}px`,
		});

		this._x = event.clientX;
		this._y = event.clientY;
	}

	_onDragMouseUp() {
		this._x = null;
		this._y = null;

		this._detachMouseDragHandlers();
	}

	_onDragOrResizeKeyDown(event) {
		if (!this._movable || !Dialog._isHeader(event.target)) {
			return;
		}

		if (this.draggable && [isUp, isDown, isLeft, isRight].some(key => key(event))) {
			this._dragWithEvent(event);
			return;
		}

		if (this.resizable && [isUpShift, isDownShift, isLeftShift, isRightShift].some(key => key(event))) {
			this._resizeWithEvent(event);
		}
	}

	_dragWithEvent(event) {
		const {
			top,
			left,
			width,
			height,
		} = this.getBoundingClientRect();

		let newPos,
			posDirection;

		switch (true) {
		case isUp(event):
			newPos = top - STEP_SIZE;
			posDirection = "top";
			break;
		case isDown(event):
			newPos = top + STEP_SIZE;
			posDirection = "top";
			break;
		case isLeft(event):
			newPos = left - STEP_SIZE;
			posDirection = "left";
			break;
		case isRight(event):
			newPos = left + STEP_SIZE;
			posDirection = "left";
			break;
		}

		newPos = clamp(
			newPos,
			0,
			posDirection === "left" ? window.innerWidth - width : window.innerHeight - height,
		);

		this.style[posDirection] = `${newPos}px`;
	}

	_resizeWithEvent(event) {
		this._detachResizeHandlers();
		this.addEventListener("ui5-before-close", this._revertSize);

		const { top, left } = this.getBoundingClientRect(),
			style = window.getComputedStyle(this),
			minWidth = Number.parseFloat(style.minWidth),
			minHeight = Number.parseFloat(style.minHeight),
			maxWidth = 	window.innerWidth - left,
			maxHeight = window.innerHeight - top;

		let width = Number.parseFloat(style.width),
			height = Number.parseFloat(style.height);

		switch (true) {
		case isUpShift(event):
			height -= STEP_SIZE;
			break;
		case isDownShift(event):
			height += STEP_SIZE;
			break;
		case isLeftShift(event):
			width -= STEP_SIZE;
			break;
		case isRightShift(event):
			width += STEP_SIZE;
			break;
		}

		width = clamp(width, minWidth, maxWidth);
		height = clamp(height, minHeight, maxHeight);

		Object.assign(this.style, {
			width: `${width}px`,
			height: `${height}px`,
		});
	}

	_attachMouseDragHandlers() {
		this._detachResizeHandlers();

		window.addEventListener("mousemove", this._dragMouseMoveHandler);
		window.addEventListener("mouseup", this._dragMouseUpHandler);
	}

	_detachMouseDragHandlers() {
		window.removeEventListener("mousemove", this._dragMouseMoveHandler);
		window.removeEventListener("mouseup", this._dragMouseUpHandler);
	}

	_onResizeMouseDown(event) {
		if (!this._movable || !this.resizable) {
			return;
		}

		event.preventDefault();

		const {
			top,
			left,
		} = this.getBoundingClientRect();
		const {
			width,
			height,
			minWidth,
			minHeight,
		} = window.getComputedStyle(this);

		this._initialX = event.clientX;
		this._initialY = event.clientY;
		this._initialWidth = Number.parseFloat(width);
		this._initialHeight = Number.parseFloat(height);
		this._initialTop = top;
		this._initialLeft = left;
		this._minWidth = Number.parseFloat(minWidth);
		this._minHeight = Number.parseFloat(minHeight);

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
		});

		this._attachMouseResizeHandlers();
	}

	_onResizeMouseMove(event) {
		const { clientX, clientY } = event;

		let newWidth,
			newLeft;

		if (this._isRTL) {
			newWidth = clamp(
				this._initialWidth - (clientX - this._initialX),
				this._minWidth,
				this._initialLeft + this._initialWidth,
			);

			newLeft = clamp(
				this._initialLeft + (clientX - this._initialX),
				0,
				this._initialX + this._initialWidth - this._minWidth,
			);
		} else {
			newWidth = clamp(
				this._initialWidth + (clientX - this._initialX),
				this._minWidth,
				window.innerWidth - this._initialLeft,
			);
		}

		const newHeight = clamp(
			this._initialHeight + (clientY - this._initialY),
			this._minHeight,
			window.innerHeight - this._initialTop,
		);

		Object.assign(this.style, {
			height: `${newHeight}px`,
			width: `${newWidth}px`,
			left: newLeft ? `${newLeft}px` : undefined,
		});
	}

	_onResizeMouseUp() {
		this._initialX = null;
		this._initialY = null;
		this._initialWidth = null;
		this._initialHeight = null;
		this._initialTop = null;
		this._initialLeft = null;
		this._minWidth = null;
		this._minHeight = null;

		this._detachMouseResizeHandlers();
	}

	_attachMouseResizeHandlers() {
		this._detachResizeHandlers();

		window.addEventListener("mousemove", this._resizeMouseMoveHandler);
		window.addEventListener("mouseup", this._resizeMouseUpHandler);
		this.addEventListener("ui5-before-close", this._revertSize);
	}

	_detachMouseResizeHandlers() {
		window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
		window.removeEventListener("mouseup", this._resizeMouseUpHandler);
	}
}

Dialog.define();

export default Dialog;
