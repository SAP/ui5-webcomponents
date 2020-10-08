import { isPhone, isDesktop } from "@ui5/webcomponents-base/dist/Device.js";
import Popup from "./Popup.js";

// Template
import DialogTemplate from "./generated/templates/DialogTemplate.lit.js";
// Styles
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import dialogCSS from "./generated/themes/Dialog.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-dialog",
	slots: /** @lends  sap.ui.webcomponents.main.Popup.prototype */ {
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
		 * Determines whether the <code>ui5-dialog</code> should be stretched to fullscreen.
		 * <br><br>
		 * <b>Note:</b> The <code>ui5-dialog</code> will be stretched to approximately
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
		 * Determines whether the <code>ui5-dialog</code> is draggable.
		 * If this property is set to true, the Dialog will be draggable by its header.
		 * <br><br>
		 * <b>Note:</b> The <code>ui5-dialog</code> can be draggable only in desktop mode.
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.9
		 * @public
		 */
		draggable: {
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
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Dialog
 * @extends Popup
 * @tagname ui5-dialog
 * @public
 */
class Dialog extends Popup {
	static get metadata() {
		return metadata;
	}

	static get template() {
		return DialogTemplate;
	}

	static get styles() {
		return [PopupsCommonCss, dialogCSS];
	}

	get isModal() { // Required by Popup.js
		return true;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		return this.ariaLabel ? undefined : "ui5-popup-header";
	}

	get _ariaModal() { // Required by Popup.js
		return true;
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

	onBeforeRendering() {
		this.onPhone = isPhone();
		this.onDesktop = isDesktop();
	}

	onEnterDOM() {
		this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
		this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
	}

	onExitDOM() {
		this._dragMouseMoveHandler = null;
		this._dragMouseUpHandler = null;
	}

	/**
	 * Event handlers
	 */
	_onDragMouseDown(event) {
		if (!(this.draggable && this.onDesktop)) {
			return;
		}

		// only allow dragging on the header's whitespace
		if (!event.target.classList.contains("ui5-popup-header-root")
			&& event.target.getAttribute("slot") !== "header") {
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
			transform: "none",
			top: `${top}px`,
			left: `${left}px`,
			width: `${Math.round(Number(width) * 100) / 100}px`,
			height: `${Math.round(Number(height) * 100) / 100}px`,
		});

		this._x = event.clientX;
		this._y = event.clientY;

		this._attachDragHandlers();
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

		this._detachDragHandlers();
	}

	_attachDragHandlers() {
		window.addEventListener("mousemove", this._dragMouseMoveHandler);
		window.addEventListener("mouseup", this._dragMouseUpHandler);
		this.addEventListener("ui5-before-close", this._recenter);
	}

	_detachDragHandlers() {
		window.removeEventListener("mousemove", this._dragMouseMoveHandler);
		window.removeEventListener("mouseup", this._dragMouseUpHandler);
	}

	_recenter() {
		Object.assign(this.style, {
			top: "",
			left: "",
			transform: "",
		});
		this.removeEventListener("ui5-before-close", this._recenter);
	}
}

Dialog.define();

export default Dialog;
