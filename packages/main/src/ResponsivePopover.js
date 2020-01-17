import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResponsivePopoverTemplate from "./generated/templates/ResponsivePopoverTemplate.lit.js";

import { isPhone } from "@ui5/webcomponents-base/dist/Device.js";
import Popover from "./Popover.js";
import Dialog from "./Dialog.js";



// Styles
import ResponsivePopoverCss from "./generated/themes/ResponsivePopover.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-responsive-popover",
	properties: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
		opened: {
			type: Boolean 
		},
		phoneHeaderTitle: {
			type: String
		}
	},
	slots: /** @lends sap.ui.webcomponents.main.ResponsivePopover.prototype */ {
	
		"default": {
			type: HTMLElement,
		},

		"phoneHeader": {
			type: HTMLElement
		},

		"phoneFooter": {
			type: HTMLElement
		}
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
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-popover</code> component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * <h3>Structure</h3>
 *
 * The popover has three main areas:
 * <ul>
 * <li>Header (optional)</li>
 * <li>Content</li>
 * <li>Footer (optional)</li>
 * </ul>
 *
 * <b>Note:</b> The <code>ui5-popover</code> is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * <code>modal</code> property.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/Popover.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.Popover
 * @extends UI5Element
 * @tagname ui5-popover
 * @public
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

	get isPhone() {
		return isPhone();
	}

	static async define(...params) {
		await Promise.all([
			Popover.define(),
			Dialog.define()
		]);

		super.define(...params);
	}

	open(opener) {
		this.opener = opener;

		const dialog = this.shadowRoot.querySelector("ui5-dialog");
		const popover = this.shadowRoot.querySelector("ui5-popover");

		if (dialog) {
			dialog.open();
		} else {
			popover.openBy(opener);
		}

		this.opened = true;
	}

	close() {
		console.error("close")
		this._container.close();
		this.opened = false;
	}

	_fireEvent(event) {
		const type = event.type.replace("ui5-", "")
		this.fireEvent(type, event.detail);
	}

	get _container() {
		return this.shadowRoot.querySelector("ui5-dialog") || this.shadowRoot.querySelector("ui5-popover");
	}
}

ResponsivePopover.define();

export default ResponsivePopover;
