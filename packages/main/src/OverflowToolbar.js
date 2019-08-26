import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import OverflowToolbarTemplate from "./generated/templates/OverflowToolbarTemplate.lit.js";
import Button from "./Button.js";
import Popover from "./Popover.js";

// Styles
import overflowToolbarCss from "./generated/themes/OverflowToolbar.css.js";


// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-overflow-toolbar",
	slots: /** @lends sap.ui.webcomponents.main.OverflowToolbar.prototype */ {

		/**
		 * Defines the content of the <code>ui5-overflow-toolbar</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		items: {
			type: Node,
			individualSlots: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.OverflowToolbar.prototype */ {
		_overflowButton: { type: Object },

		_overflowPopover: { type: Object },

		_items: { type: Object, multiple: true },

		_widthOfElements: { type: Array, defaultValue: [] },

		_notInitialRendering: {
			type: Boolean,
			noAttribute: true,
		},

		_showOverflowButton: {
			type: Boolean,
			noAttribute: true,
		},

	},
	events: /** @lends sap.ui.webcomponents.main.OverflowToolbar.prototype */ {

	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-overflow-toolbar</code> component represents a toolbar which overflows.
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>ui5-overflow-toolbar</code>...
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/OverflowToolbar";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.OverflowToolbar
 * @extends UI5Element
 * @tagname ui5-overflow-toolbar
 * @usestextcontent
 * @public
 */
class OverflowToolbar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return overflowToolbarCss;
	}

	static get template() {
		return OverflowToolbarTemplate;
	}

	static get render() {
		return litRender;
	}

	constructor() {
		super();
		this.intersectionIndex = -1;
	}

	onBeforeRendering() {
		if (!this._notInitialRendering) {
			this.overflowingIndex = -1;

			this._items = this.items.map(item => {
				return {
					ref: item,
					overflowed: false,
				};
			});
		}
	}

	onAfterRendering() {
		if (!this._notInitialRendering) {
			this._items.forEach(item => {
				this._widthOfElements.push(item.ref.offsetWidth);
			});
			this._handleResize();
			this._notInitialRendering = true;
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
	}

	_handleResize() {
		let width = this._getItemsWrapper().offsetWidth;

		for (let i = 0; i < this._items.length; i++) {
			width -= this._widthOfElements[i] + 8;
			if (width <= 0) {
				if (this.overflowingIndex === i) {
					return; // There is no change in overflowing
				}
				this.overflowingIndex = i;
				break;
			}
			this.overflowingIndex = -1;
		}

		this._items = this.items.map((item, index) => {
			return {
				ref: item,
				overflowed: this.overflowingIndex === -1
					? false
					: index >= this.overflowingIndex,
			};
		});

		// Set the visibility of the button that opens the popover
		this._showOverflowButton = this._items[this._items.length - 1].overflowed;
	}

	_handleToggleOverflowMenu(event) {
		const popover = this._getPopover();
		if (popover.opened) {
			popover.close();
		} else {
			popover.openBy(event.target);
		}
	}

	_getPopover() {
		return this.shadowRoot.getElementById(`${this._id}-overflowMenu`);
	}

	_getItemsWrapper() {
		return this.shadowRoot.querySelector(".ui5-overflow-toolbar-items");
	}

	static async define(...params) {
		await Promise.all([
			Button.define(),
			Popover.define(),
		]);

		super.define(...params);
	}
}

OverflowToolbar.define();

export default OverflowToolbar;
