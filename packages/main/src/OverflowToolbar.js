import UI5Element from "@ui5/webcomponents-base/src/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/src/delegate/ResizeHandler.js";
import Button from "./Button.js";
import Popover from "./Popover.js";

// Styles
import overflowToolbarCss from "./generated/themes/OverflowToolbar.css.js";
import OverflowToolbarPopoverCss from "./generated/themes/OverflowToolbarPopover.css.js";

// Templates
import OverflowToolbarTemplate from "./generated/templates/OverflowToolbarTemplate.lit.js";
import OverflowToolbarPopoverTemplate from "./generated/templates/OverflowToolbarPopoverTemplate.lit.js";

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
		_items: {
			type: Object,
			multiple: true,
			defaultValue: [],
		},

		_overflowedItems: {
			type: Object,
			multiple: true,
			defaultValue: [],
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
		this._mutationObserver = new MutationObserver(this.mutationObserverCallback.bind(this));
	}

	onBeforeRendering() {
		if (this.initialRendering) {
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
		if (this.initialRendering) {
			this._items.forEach(item => {
				this._widthOfElements.push(item.ref.offsetWidth);
			});
			this._handleResize();
			this.initialRendering = false;

			this.attachEventHandlers();
		}
	}

	onEnterDOM() {
		ResizeHandler.register(this, this._handleResize.bind(this));
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._handleResize);
		this.removeEventHandlers();
		this._mutationObserver.disconnect();
	}

	attachEventHandlers() {
		this.eventsHandler = this.fireEventOnRealTarget.bind(this);
		OverflowToolbar.events.forEach(event => {
			document.addEventListener(event, this.eventsHandler);
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
			if (item.parentNode === this) { // Item is in the overflow toolbar
				
				mutationsList.some(item => {
					return this._isSlotInvalidation(item);
				});

				if (this.overflowingIndex < 0 || onlySlotsAreInvalidated) {
					return;
				}

				this._getOverflowedItems();
			} else { // Item is overflowed in the popover
				if (this._isSlotInvalidation(item)) {
					return;
				}
				const indexOfRealElement = this.items.length - this._overflowedItems.length + this._overflowedItems.indexOf(item) + 1;
				switch (item.type) {
					case "childList":

						break;

					case "subtree":

						break;
					
					default:
					case "attributes":
						if (item.target[item.attributeName]) {
							if (this.items[indexOfRealElement].getAttribute(item.attributeName) !== item.target.getAttribute(item.attributeName)) {
								this.items[indexOfRealElement].setAttribute(item.attributeName, item.target[item.attributeName]);
							}
						} else {
							this.items[indexOfRealElement].removeAttribute(item.attributeName);
						}
						break;
				}
				console.log("overflowed", item);
			}
		})
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
			const overflowed = this.overflowingIndex === -1 ? false : index >= this.overflowingIndex;

			if (overflowed) {
				this._mutationObserver.observe(item, {
					attributes: true,
					childList: true,
					subtree: true,
				});
			}

			return {
				ref: item,
				overflowed,
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
			currentItem.id += `-clonned${i}`;
			currentItem.classList.add("ui5-overflowed-item");
			this._mutationObserver.observe(currentItem, {
				attributes: true,
				childList: true,
				subtree: true,
			});

			this._overflowedItems.push(currentItem);
		}
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
		return this.getStaticAreaItemDomRef().querySelector(`#${this._id}-overflowMenu`);
	}

	_getItemsWrapper() {
		return this.getDomRef().querySelector(".ui5-overflow-toolbar-items");
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
		];
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
