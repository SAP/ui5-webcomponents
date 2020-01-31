import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";

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
		 * By default the popover will be as wide as its opener. It will be wider if the content is not fitting.
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
	},
};

/**
 * @class
 * ResponsivePopover is Popover, which shows Dialog on mobile devices.
 * Also slots <code>header</code> and <code>footer</code> are displayed only on mobile.
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
		]);

		super.define(...params);
	}

	constructor() {
		super();
		this.placementType = "Bottom";
		this.horizontalAlign = PopoverHorizontalAlign.Left;
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

		this.fireEvent(type, event.detail);
	}

	get styles() {
		const popoverStyles = super.styles;

		popoverStyles.root = {
			"min-width": `${this._minWidth}px`,
		};

		return popoverStyles;
	}

	get _dialog() {
		return this.shadowRoot.querySelector("ui5-dialog");
	}

	get _isPhone() {
		return isPhone();
	}

	get _displayHeader() {
		return this._isPhone;
	}

	get _displayFooter() {
		return this._isPhone;
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
