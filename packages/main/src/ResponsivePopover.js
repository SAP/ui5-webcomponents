import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getNextZIndex } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import { RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON } from "./generated/i18n/i18n-defaults.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import Title from "./Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webc.main.ResponsivePopover.prototype */ {
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

		/**
		 * Defines whether a close button will be rendered in the header of the component
		 * <b>Note:</b> If you are using the <code>header</code> slot, this property will have no effect
		 *
		 * @private
		 * @type {boolean}
		 * @defaultvalue false
		 * @since 1.0.0-rc.16
		 */
		_hideCloseButton: {
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
 * <h3>CSS Shadow Parts</h3>
 *
 * <ui5-link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS/::part">CSS Shadow Parts</ui5-link> allow developers to style elements inside the Shadow DOM.
 * <br>
 * The <code>ui5-responsive-popover</code> exposes the following CSS Shadow Parts:
 * <ul>
 * <li>header - Used to style the header of the component</li>
 * <li>content - Used to style the content of the component</li>
 * <li>footer - Used to style the footer of the component</li>
 * </ul>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.ResponsivePopover
 * @extends sap.ui.webc.main.Popover
 * @tagname ui5-responsive-popover
 * @since 1.0.0-rc.6
 * @public
 */
class ResponsivePopover extends Popover {
	constructor() {
		super();
	}

	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [Popover.styles, ResponsivePopoverCss];
	}

	get classes() {
		const allClasses = super.classes;

		allClasses.header = {
			"ui5-responsive-popover-header": true,
			"ui5-responsive-popover-header-no-title": !this.headerText,
		};

		return allClasses;
	}

	static get template() {
		return ResponsivePopoverTemplate;
	}

	static get dependencies() {
		return [
			...Popover.dependencies,
			Button,
			Dialog,
			Title,
		];
	}

	/**
	 * Shows popover on desktop and dialog on mobile.
	 * @param {HTMLElement} opener the element that the popover is shown at
	 * @param {boolean} preventInitialFocus Prevents applying the focus inside the popup
	 * @public
	 * @async
	 * @returns {Promise} Resolves when the responsive popover is open
	 */
	async showAt(opener, preventInitialFocus = false) {
		if (!isPhone()) {
			await super.showAt(opener, preventInitialFocus);
		} else {
			this.style.display = "contents";
			this.style.zIndex = getNextZIndex();
			await this._dialog.show(preventInitialFocus);
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
			this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
		}
	}

	toggle(opener) {
		if (this.isOpen()) {
			return this.close();
		}

		this.showAt(opener);
	}

	/**
	 * Tells if the responsive popover is open
	 * @public
	 * @returns {boolean}
	 */
	isOpen() {
		return (isPhone() && this._dialog) ? this._dialog.isOpen() : super.isOpen();
	}

	get _dialog() {
		return this.shadowRoot.querySelector("[ui5-dialog]");
	}

	get contentDOM() {
		return this._isPhone ? this._dialog.contentDOM : super.contentDOM;
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return (this._isPhone || !this.contentOnlyOnDesktop) && super._displayHeader;
	}

	get _displayFooter() {
		return this._isPhone || !this.contentOnlyOnDesktop;
	}

	get _closeDialogAriaLabel() {
		return ResponsivePopover.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
	}

	_beforeDialogOpen(event) {
		this.open = true;
		this.opened = true;
		this._propagateDialogEvent(event);
	}

	_afterDialogClose(event) {
		this.open = false;
		this.opened = false;
		this._propagateDialogEvent(event);
	}

	_propagateDialogEvent(event) {
		const type = event.type.replace("ui5-", "");

		this.fireEvent(type, event.detail);
	}

	get isModal() {
		if (!isPhone()) {
			return super.isModal;
		}

		return this._dialog.isModal;
	}

	static async onDefine() {
		ResponsivePopover.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
