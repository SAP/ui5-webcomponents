import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getNextZIndex } from "./popup-utils/PopupUtils.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import Title from "./Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

const POPOVER_MIN_WIDTH = 100;

/**
 * @public
 */
const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {

		/**
		 * Defines whether the component will stretch to fit its content.
		 * <br/><b>Note:</b> by default the popover will be as wide as its opener component and will grow if the content is not fitting.
		 * <br/><b>Note:</b> if set to true, it will take only as much space as it needs.
		 * @private
		 */
		noStretch: {
			type: Boolean,
		},

		/**
		 * Defines if padding would be added around the content.
		 * @private
		 */
		withPadding: {
			type: Boolean,
		},

		/**
		 * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
		 * By default both the header and footer would be displayed.
		 * @private
		 */
		contentOnlyOnDesktop: {
			type: Boolean,
		},

		/**
		 * Used internaly for controls which must not have header.
		 * @private
		 */
		_hideHeader: {
			type: Boolean,
		},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * The <code>ui5-responsive-popover</code> acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * <h3>Usage</h3>
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.ResponsivePopover
 * @extends Popover
 * @tagname ui5-responsive-popover
 * @since 1.0.0-rc.6
 * @public
 */
class ResponsivePopover extends Popover {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [Popover.styles, ResponsivePopoverCss];
	}

	static get template() {
		return ResponsivePopoverTemplate;
	}

	static get dependencies() {
		return [
			Button,
			Dialog,
			Title,
		];
	}

	/**
	 * Opens popover on desktop and dialog on mobile.
	 * @param {HTMLElement} opener the element that the popover is opened by
	 * @public
	 */
	open(opener) {
		this.style.display = this._isPhone ? "contents" : "";

		if (this.isOpen() || (this._dialog && this._dialog.isOpen())) {
			return;
		}

		if (!isPhone()) {
			// make popover width be >= of the opener's width
			if (!this.noStretch) {
				this._minWidth = Math.max(POPOVER_MIN_WIDTH, opener.getBoundingClientRect().width);
			}

			this.openBy(opener);
		} else {
			this.style.zIndex = getNextZIndex();
			this._dialog.open();
		}
	}

	/**
	 * Closes the popover/dialog.
	 * @public
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
		if (!isPhone()) {
			super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
		} else {
			this._dialog.close();
		}
	}

	toggle(opener) {
		if (this.isOpen()) {
			return this.close();
		}

		this.open(opener);
	}

	isOpen() {
		return isPhone() ? this._dialog.isOpen() : super.isOpen();
	}

	get styles() {
		const popoverStyles = super.styles;

		popoverStyles.root = {
			"min-width": `${this._minWidth}px`,
		};

		return popoverStyles;
	}

	get _dialog() {
		return this.shadowRoot.querySelector("[ui5-dialog]");
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return this._isPhone || !this.contentOnlyOnDesktop;
	}

	get _displayFooter() {
		return this._isPhone || !this.contentOnlyOnDesktop;
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

		this.fireEvent(type, event.detail);
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
