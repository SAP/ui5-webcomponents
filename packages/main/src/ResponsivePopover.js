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

		/**
		 * By default the popover will be as wide at least as its opener. It will be wider if the content is not fitting.
		 * If this property is set to true, it will take only as much space as it needs.
		 */
		noStretch: {
			type: Boolean,
		},

		/**
		 * When set there will be padding added by around the content.
		 */
		withPadding: {
			type: Boolean,
		},

		/**
		 * Title of the Dialog on phone. It will be displayed as "Select" translatable text.
		 */
		showHeaderTitle: {
			type: Boolean,
		},

		/**
		 * Determines whether to show "Confirm" button in the footer on phone.
		 */
		showConfirmButton: {
			type: Boolean,
		},

		/**
		 * Determines whether to show "Cancel" button in the footer on phone.
		 */
		showCancelButton: {
			type: Boolean,
		},
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
class ResponsivePopover extends Popover {
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
			Dialog.define(),
			Button.define(),
			fetchI18nBundle("@ui5/webcomponents"),
		]);

		super.define(...params);
	}

	constructor() {
		super();
		this.i18nBundle = getI18nBundle("@ui5/webcomponents");
		this.placementType = "Bottom";
		this.horizontalAlign = PopoverHorizontalAlign.Left;
		this.noArrow = true;
	}

	/**
	 * @public
	 */
	open(opener) {
		if (!isPhone()) {
			// make popover width be >= of the opener's width
			if (!this.noStretch) {
				this._minWidth = Math.max(POPOVER_MIN_WIDTH, opener.getBoundingClientRect().width);
			}

			this.openBy(opener);
		} else {
			this._dialog.open();
		}
	}

	/**
	 * @public
	 */
	close() {
		if (!isPhone()) {
			super.close();
		} else {
			this._dialog.close();
		}
	}

	_afterDialogOpen(event) {
		this.opened = true;
		this._propagateDialogEvent(event);
	}

	_afterDialogClose(event) {
		this.opened = false;
		this._propagateDialogEvent(event);
	}

	_propagateDialogEvent(event) {
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
		const popoverStyles = super.styles;

		return {
			...popoverStyles,
			root: {
				"min-width": `${this._minWidth}px`,
			},
		};
	}

	get _dialog() {
		return this.shadowRoot.querySelector("ui5-dialog");
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
