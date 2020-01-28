import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { fetchI18nBundle, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import {
	INPUT_SUGGESTIONS_TITLE,
} from "./generated/i18n/i18n-defaults.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

const POPOVER_MIN_WIDTH = 100;

const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
		opened: {
			type: Boolean,
		},

		stayOpenOnScroll: {
			type: Boolean,
		},

		allowTargetOverlap: {
			type: Boolean,
		},

		disableInitialFocus: {
			type: Boolean,
		},

		/**
		 * By default the popover will be as wide at least as its opener. It will be wider if the content is not fitting.
		 * If this property is set to true, the popover won't stretch.
		 */
		noStretch: {
			type: Boolean,
		},

		/**
		 * When set there will be padding added by Popover or Dialog.
		 */
		withPadding: {
			type: Boolean,
		},

		/**
		 * Determines the horizontal alignment of the <code>ui5-popover</code>.
		 *
		 * @type {PopoverHorizontalAlign}
		 * @defaultvalue "Left"
		 * @public
		 */
		horizontalAlign: {
			type: PopoverHorizontalAlign,
			defaultValue: PopoverHorizontalAlign.Left,
		},

		/**
		 * Title of the Dialog on phone. It will be displayed as "Select" text.
		 */
		showHeaderTitle: {
			type: Boolean,
		},

		/**
		 * Determines whether to show "Confirm" button on phone.
		 */
		showConfirmButton: {
			type: Boolean,
		},

		/**
		 * Determines whether to show "Cancel" button on phone.
		 */
		showCancelButton: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
		"default": {
			type: HTMLElement,
		},

		"header": {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
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

/**
 * @class
 * ResponsivePopover is UI5Element, which shows Dialog on mobile devices and Popover otherwise.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ResponsivePopover
 * @extends UI5Element
 * @tagname ui5-responsive-popover
 * @private
 */
class ResponsivePopover extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get render() {
		return litRender;
	}

	static get styles() {
		return ResponsivePopoverCss;
	}

	static get template() {
		return ResponsivePopoverTemplate;
	}

	static async define(...params) {
		await Promise.all([
			Popover.define(),
			Dialog.define(),
			Button.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);

		super.define(...params);
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
	}

	onAfterRendering() {
		if (this.opened) {
			const dialog = this.shadowRoot.querySelector("ui5-dialog");
			const popover = this.shadowRoot.querySelector("ui5-popover");

			if (dialog) {
				dialog.open();
			} else {
				popover.openBy(this._opener);
			}
		} else {
			this._inner.close();
		}
	}

	/**
	 * @public
	 */
	open(opener) {
		if (this.opened) {
			return;
		}

		this._opener = opener;
		this.fireEvent("beforeOpen", {});
		this.opened = true;

		if (!this.noStretch) {
			// make popover width be >= of the opener's width
			this._width = Math.max(POPOVER_MIN_WIDTH, opener.getBoundingClientRect().width);
		}

		this.style.display = "inline-block";
	}

	/**
	 * @public
	 */
	close() {
		if (!this.opened) {
			return;
		}

		this._inner.close();
	}

	_afterOpen(event) {
		this.style.top = this._inner.style.top;
		this.style.left = this._inner.style.left;
		this._fireEvent(event);
	}

	_beforeClose(event) {
		this._fireEvent(event);
	}

	_afterClose(event) {
		delete this._opener;
		this.style.display = "";
		this.opened = false;

		this._fireEvent(event);
	}

	_fireEvent(event) {
		const type = event.type.replace("ui5-", "");

		this.fireEvent(type, {
			...event.detail,
			confirmButtonPressed: this._confirmButtonPressed,
			cancelButtonPressed: this._cancelButtonPressed,
		});

		this._confirmButtonPressed = false;
		this._cancelButtonPressed = false;
	}

	_handleClose(event) {
		if (event.target.hasAttribute("confirm")) {
			this._confirmButtonPressed = true;
		}

		if (event.target.hasAttribute("cancel")) {
			this._cancelButtonPressed = true;
		}

		this.close();
	}

	get styles() {
		return {
			popover: {
				"min-width": `${this._width}px`,
			},
		};
	}

	get _inner() {
		return this.shadowRoot.querySelector(".ui5-responsive-popover-inner");
	}

	get _hasFooter() {
		return this.showCancelButton || this.showConfirmButton;
	}

	get _hasHeader() {
		return this.showHeaderTitle || this.header.length;
	}

	get _isPhone() {
		return isPhone();
	}

	get _headerTitleText() {
		return this.i18nBundle.getText(INPUT_SUGGESTIONS_TITLE);
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
