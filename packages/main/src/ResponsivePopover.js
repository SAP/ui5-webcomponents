import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";
import Popup from "./Popup.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";
import Button from "./Button.js";
import Title from "./Title.js";
import "@ui5/webcomponents-icons/dist/icons/decline.js";

// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {

		...Popup.metadata.properties,
		...Popover.metadata.properties,
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


		showPopoverFooter: {
			type: Boolean,
		},

		/**
		 * Used internaly for controls which must not have header.
		 * @private
		 */
		_hideHeader: {
			type: Boolean,
		},

		_minWidth: {
			type: Integer,
		},
	},

	events: { ...Popover.metadata.events },
	slots: { ...Popover.metadata.slots },
	managedSlots: true,
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
 * @alias sap.ui.webcomponents.main.Button
 * @extends UI5Element
 * @tagname ui5-responsive-popover
 * @since 1.0.0-rc.6
 * @public
 */
class ResponsivePopover extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [...Popover.styles, ResponsivePopoverCss];
	}

	static get template() {
		return ResponsivePopoverTemplate;
	}

	static get render() {
		return litRender;
	}

	static async onDefine() {
		await Promise.all([
			Popover.define(),
			Dialog.define(),
			Button.define(),
			Title.define(),
		]);
	}

	constructor() {
		super();
		this._isPhone = isPhone();

		this._openerResizeObserver = ref => {
			this._minWidth = ref.getBoundingClientRect().width;
		};
	}

	detachResizeHandler() {
		if (this.noStretch) {
			return;
		}

		ResizeHandler.detachListener(this._opener, this._openerResizeObserver);
	}

	attachResizeHandler() {
		if (this.noStretch) {
			return;
		}

		ResizeHandler.attachListener(this._opener, this._openerResizeObserver);
	}

	open(opener) {
		const popup = this.getPopup();

		if (opener && popup.openBy) {
			this._opener = opener;
			return popup.openBy(opener);
		}

		popup.open();
	}

	close() {
		const popup = this.getPopup();

		popup.close();
	}

	toggle(opener) {
		const popup = this.getPopup();

		if (popup.isOpen()) {
			return this.close();
		}

		this.open(opener);
	}

	isOpen() {
		return this.getPopup().isOpen();
	}

	getPopup() {
		return this.shadowRoot.querySelector("#ui5-rpo-popup");
	}

	onAfterRendering() {
		this.forwardPropsToPopup();
	}

	forwardPropsToPopup() {
		const props = Object.keys({
			...Popup.metadata.properties,
			...Popover.metadata.properties,
		});

		props.forEach(prop => {
			if (prop === "opened") {
				return;
			}

			this.getPopup() && (this.getPopup()[prop] = this[prop]);
		});
	}

	forwardEvent(event) {
		this.fireEvent(event.type, event.detail);
	}

	get isPhone() {
		return this._isPhone;
	}

	get showHeader() {
		if (this.isPhone && this.header.length) {
			return true;
		}

		return !this.contentOnlyOnDesktop;
	}

	get showFooter() {
		if (this.isPhone) {
			return true;
		}

		return this.footer.length && this.showPopoverFooter;
	}

	get styles() {
		return {
			popover: {
				"min-width": `${this._minWidth}px`,
			},
		};
	}

	get hasPadding() {
		return !this.withPadding;
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
