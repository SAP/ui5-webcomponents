import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import Button from "./Button.js";
import Popover from "./Popover.js";
import OverflowToolbarDesign from "./types/OverflowToolbarDesign.js";

// Styles
import OverflowToolbarCss from "./generated/themes/OverflowToolbar.css.js";
import OverflowToolbarPopoverCss from "./generated/themes/OverflowToolbarPopover.css.js";

// Templates
import OverflowToolbarTemplate from "./generated/templates/OverflowToolbarTemplate.lit.js";
import OverflowToolbarPopoverTemplate from "./generated/templates/OverflowToolbarPopoverTemplate.lit.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-overflow-toolbar",
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.OverflowToolbar.prototype */ {

		/**
		 * Defines the content of the <code>ui5-overflow-toolbar</code>.
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		"default": {
			propertyName: "items",
			type: HTMLElement,
			individualSlots: true,
		},
	},
	properties: /** @lends sap.ui.webcomponents.main.OverflowToolbar.prototype */ {
		/**
		 * Defines the design of the <code>ui5-overflow-toolbar</code>
		 * @type {string}
		 * @public
		 * @defaultvalue "Transparent"
		 */
		design: {
			type: String,
			defaultValue: OverflowToolbarDesign.Transparent,
		},

		/**
		 * @private
		 */
		_items: {
			type: Object,
			multiple: true,
		},

		/**
		 * @private
		 */
		_overflowedItems: {
			type: Object,
			multiple: true,
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
 * A container control, that provides overflow when its content does not fit in the visible area.
 *
 *
 * <h3>Usage</h3>
 *
 * The content of the OverflowToolbar moves into the overflow area from right to left when the available space is not enough in the visible area of the container. It can be accessed by the user through the overflow button that opens it in a popover.
 *
 * <h3>Usage</h3>
 *
 * List of supported components:
 * <ul>
 * <li>Button</li>
 * <li>Switch</li>
 * <li>Title</li>
 * <li>Label</li>
 * </ul>
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents/dist/OverflowToolbar.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.main.OverflowToolbar
 * @extends UI5Element
 * @tagname ui5-overflow-toolbar
 * @appenddocs ToolbarSpacer
 * @usestextcontent
 * @public
 */
class OverflowToolbar extends UI5Element {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return OverflowToolbarCss;
	}

	static get template() {
		return OverflowToolbarTemplate;
	}

	static get render() {
		return litRender;
	}

	static get staticAreaTemplate() {
		return OverflowToolbarPopoverTemplate;
	}

	static get staticAreaStyles() {
		return OverflowToolbarPopoverCss;
	}

	constructor() {
		super();
		this._showOverflowButton = false;
		this.initialRendering = true;
		this._widthOfElements = [];
		this.shouldRenderAllItems = true;
	}

	onBeforeRendering() {
		if (this.initialRendering) {
			this.overflowingIndex = -1;

			this._items = this.items.map(item => {
				return {
					ref: item,
					overflowed: false,
					isSpacer: this.isSpacer(item),
				};
			});
		}
	}

	onAfterRendering() {
		if (this.initialRendering) {
			this.measureAllItems();
			this.initialRendering = false;
		}
	}

	measureAllItems() {
		requestAnimationFrame(_ => {
			// Invalidate in order to render all items
			if (this.shouldRenderAllItems) {
				this._overflowedItems = [];
				this._items.forEach(item => {
					item.overflowed = false;
				});
			}
		});

		// Measeure all the items
		// Read from the light DOM, because in IE11 the slot tags have width of 0
		this._widthOfElements = [];
		Array.from(this.children).forEach(item => {
			this._widthOfElements.push(item.offsetWidth);
		});

		if (this._widthOfElements[0] === 0) {
			// This case is needed for IE11, because in onAfterRendering the items sometimes have width 0
			setTimeout(() => {
				this._widthOfElements = [];
				Array.from(this.children).forEach(item => {
					this._widthOfElements.push(item.offsetWidth);
				});
				this._handleResize();
				this.shouldRenderAllItems = false;
			}, 200);
		} else {
			this._handleResize();
			this.shouldRenderAllItems = false;
		}
	}

	onEnterDOM() {
		this.initMutationObserver();
		this.attachEventHandlers();
		ResizeHandler.register(this, this._handleResize.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
		this.removeEventHandlers();
		this._mutationObserver.disconnect();
	}

	initMutationObserver() {
		this._mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
		this._items.forEach(item => {
			this._mutationObserver.observe(item.ref, {
				attributes: true,
				childList: true,
				subtree: true,
			});
		});
	}

	async attachEventHandlers() {
		const popover = await this._getPopover();
		this.eventsHandler = this.fireEventOnRealTarget.bind(this);
		OverflowToolbar.events.forEach(event => {
			popover.addEventListener(event, this.eventsHandler);
		});
	}

	fireEventOnRealTarget(event) {
		const targetInStaticArea = event.composedPath().filter(item => {
			return this._overflowedItems.indexOf(item) > -1;
		})[0];

		if (!targetInStaticArea) {
			return;
		}

		this.items[this.overflowingIndex + this._overflowedItems.indexOf(targetInStaticArea)].fireEvent(event.type, {
			preventPopoverClose: true,
		});
	}

	removeEventHandlers() {
		OverflowToolbar.events.forEach(event => {
			document.removeEventListener(event, this.eventsHandler);
		});
	}

	mutationObserverCallback(mutationsList, observer) {
		mutationsList.forEach(item => {
			if (item.target.parentNode === this) { // Item is in the overflow toolbar
				if (item.attributeName === "style" || item.attributeName === "class") {
					this.shouldRenderAllItems = true;
					// Check for change in sizes
					this.measureAllItems();
				}

				if (this.overflowingIndex < 0 || this._isSlotInvalidation(item)) {
					return;
				}

				this._getOverflowedItems();
			}
		});
	}

	/**
	 * Slots are invalidated on every rerender and this methods checks if such invalidation has occured
	 * @param {Node} currentItem
	 */
	_isSlotInvalidation(currentItem) {
		let onlySlotsAreInvalidated = true;
		if (currentItem.type !== "attributes" || currentItem.attributeName !== "slot") {
			onlySlotsAreInvalidated = false;
		}

		return onlySlotsAreInvalidated;
	}

	_handleResize() {
		let width = this._getItemsWrapper().offsetWidth;

		for (let i = 0; i < this._items.length; i++) {
			width -= this._widthOfElements[i] + OverflowToolbar.itemsPadding;
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
			const overflowed = this.overflowingIndex === -1 ? false : index >= this.overflowingIndex;

			return {
				ref: item,
				overflowed,
				isSpacer: this.isSpacer(item),
			};
		});


		this._getOverflowedItems();

		// Set the visibility of the button that opens the popover
		this._showOverflowButton = this._items[this._items.length - 1].overflowed;
	}

	_getOverflowedItems() {
		if (this.overflowingIndex === -1) {
			return;
		}

		this._overflowedItems = [];

		for (let i = this.overflowingIndex; i < this.items.length; i++) {
			const currentItem = this.items[i].cloneNode(true);
			currentItem.id += `-cloned${i}`;
			currentItem.classList.add("ui5-overflowed-item");

			this._overflowedItems.push(currentItem);
		}
	}

	async _handleToggleOverflowMenu(event) {
		const popover = await this._getPopover();
		if (popover.opened) {
			popover.close();
		} else {
			popover.openBy(event.target);
		}
	}

	async _getPopover() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem.querySelector(`#${this._id}-overflowMenu`);
	}

	_getItemsWrapper() {
		return this.getDomRef().querySelector(".ui5-overflow-toolbar-items");
	}

	isSpacer(item) {
		return item.tagName === "UI5-TOOLBAR-SPACER";
	}

	get classes() {
		return {
			items: {
				"ui5-overflow-toolbar-items": true,
				"ui5-overflow-toolbar-items-with-button": this._showOverflowButton,
			},
		};
	}

	static get itemsPadding() {
		return 8;
	}

	static get events() {
		return [
			"click",
			"mouseup",
			"mousedown",
			"focusin",
			"focusout",
			"keydown",
			"keyup",
			"touchstart",
			"touchend",
			"change",
		];
	}

	static async onDefine(...params) {
		await Promise.all([
			Button.define(),
			Popover.define(),
		]);
	}
}

OverflowToolbar.define();

export default OverflowToolbar;
