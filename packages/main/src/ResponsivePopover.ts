import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

import { RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON } from "./generated/i18n/i18n-defaults.js";

import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import type { PopupBeforeCloseEventDetail } from "./Popup.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import Title from "./Title.js";
import "@ui5/webcomponents-icons/dist/decline.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

type ResponsivePopoverBeforeCloseEventDetail = PopupBeforeCloseEventDetail;

/**
 * @class
 *
 * ### Overview
 * The `ui5-responsive-popover` acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
 * The component improves tremendously the user experience on mobile.
 *
 * ### Usage
 * Use it when you want to make sure that all the content is visible on any device.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/ResponsivePopover.js";`
 * @constructor
 * @extends Popover
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-responsive-popover",
	styles: [Popover.styles, ResponsivePopoverCss],
	template: ResponsivePopoverTemplate,
	dependencies: [
		...Popover.dependencies,
		Button,
		Dialog,
		Title,
	],
})
class ResponsivePopover extends Popover {
	/**
	 * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
	 * By default both the header and footer would be displayed.
	 * @private
	 */
	@property({ type: Boolean })
	contentOnlyOnDesktop!: boolean;

	/**
	 * Used internaly for controls which must not have header.
	 * @private
	 */
	@property({ type: Boolean })
	_hideHeader!: boolean;

	/**
	 * Defines whether a close button will be rendered in the header of the component
	 * **Note:** If you are using the `header` slot, this property will have no effect
	 * @private
	 * @default false
	 * @since 1.0.0-rc.16
	 */
	@property({ type: Boolean })
	_hideCloseButton!: boolean;

	static i18nBundle: I18nBundle;

	constructor() {
		super();
	}

	/**
	 * Shows popover on desktop and dialog on mobile.
	 * @param opener the element that the popover is shown at
	 * @param [preventInitialFocus=false] Prevents applying the focus inside the popup
	 * @public
	 * @returns Resolves when the responsive popover is open
	 */
	async showAt(opener: HTMLElement, preventInitialFocus = false): Promise<void> {
		if (!isPhone()) {
			await super.showAt(opener, preventInitialFocus);
		} else {
			this.style.display = "contents";
			await this._dialog.show(preventInitialFocus);
		}
	}

	_show() {
		if (!isPhone()) {
			super._show();
		}
	}

	/**
	 * Closes the popover/dialog.
	 * @public
	 */
	close(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) : void {
		if (!isPhone()) {
			super.close(escPressed, preventRegistryUpdate, preventFocusRestore);
		} else {
			this._dialog.close(escPressed, preventRegistryUpdate, preventFocusRestore);
		}
	}

	toggle(opener: HTMLElement) {
		if (this.isOpen()) {
			return this.close();
		}

		this.showAt(opener);
	}

	/**
	 * Tells if the responsive popover is open.
	 * @public
	 */
	isOpen() : boolean {
		return (isPhone() && this._dialog) ? this._dialog.isOpen() : super.isOpen();
	}

	get classes() {
		const allClasses = super.classes;

		allClasses.header = {
			"ui5-responsive-popover-header": true,
			"ui5-responsive-popover-header-no-title": !this.headerText,
		};

		return allClasses;
	}

	get _dialog() {
		return this.shadowRoot!.querySelector<Dialog>("[ui5-dialog]")!;
	}

	get contentDOM() {
		return isPhone() ? this._dialog.contentDOM : super.contentDOM;
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return (isPhone() || !this.contentOnlyOnDesktop) && super._displayHeader;
	}

	get _displayFooter() {
		return isPhone() || !this.contentOnlyOnDesktop;
	}

	get _closeDialogAriaLabel() {
		return ResponsivePopover.i18nBundle.getText(RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
	}

	_beforeDialogOpen(e: CustomEvent<PopupBeforeCloseEventDetail>) {
		this._actualOpen = true;
		this.opened = true;
		this.open = true;
		this._propagateDialogEvent(e);
	}

	_afterDialogClose(e: CustomEvent) {
		this._actualOpen = false;
		this.opened = false;
		this.open = false;
		this._propagateDialogEvent(e);
	}

	_propagateDialogEvent(e: CustomEvent) {
		const type = e.type.replace("ui5-", "");

		this.fireEvent(type, e.detail);
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
export type {
	ResponsivePopoverBeforeCloseEventDetail,
};
