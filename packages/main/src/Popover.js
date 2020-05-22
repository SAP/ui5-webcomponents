import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import PopoverTemplate from "./generated/templates/PopoverTemplate.lit.js";
import Popup from "./Popup.js";
import PopoverPlacementType from "./types/PopoverPlacementType.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";

import { addOpenedPopover, removeOpenedPopover } from "./popup-utils/PopoverRegistry.js";
import { getFocusedElement, getClosedPopupParent } from "./popup-utils/PopupUtils.js";

// Styles
import PopoverCss from "./generated/themes/Popover.css.js";

const arrowSize = 8;

/**
 * @public
 */
const metadata = {
	tag: "ui5-popover",
	properties: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
		/**
		 * Determines on which side the <code>ui5-popover</code> is placed at.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Left</code></li>
		 * <li><code>Right</code></li>
		 * <li><code>Top</code></li>
		 * <li><code>Bottom</code></li>
		 * </ul>
		 *
		 * @type {PopoverPlacementType}
		 * @defaultvalue "Right"
		 * @public
		 */
		placementType: {
			type: PopoverPlacementType,
			defaultValue: PopoverPlacementType.Right,
		},

		/**
		 * Determines the horizontal alignment of the <code>ui5-popover</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Center</code></li>
		 * <li><code>Left</code></li>
		 * <li><code>Right</code></li>
		 * <li><code>Stretch</code></li>
		 * </ul>
		 *
		 * @type {PopoverHorizontalAlign}
		 * @defaultvalue "Center"
		 * @public
		 */
		horizontalAlign: {
			type: PopoverHorizontalAlign,
			defaultValue: PopoverHorizontalAlign.Center,
		},

		/**
		 * Determines the vertical alignment of the <code>ui5-popover</code>.
		 * <br><br>
		 * Available options are:
		 * <ul>
		 * <li><code>Center</code></li>
		 * <li><code>Top</code></li>
		 * <li><code>Bottom</code></li>
		 * <li><code>Stretch</code></li>
		 * </ul>
		 *
		 * @type {PopoverVerticalAlign}
		 * @defaultvalue "Center"
		 * @public
		 */
		verticalAlign: {
			type: PopoverVerticalAlign,
			defaultValue: PopoverVerticalAlign.Center,
		},

		/**
		 * Defines whether the <code>ui5-popover</code> should close when
		 * clicking/tapping outside of the popover.
		 * If enabled, it blocks any interaction with the background.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		modal: {
			type: Boolean,
		},

		/**
		 * Determines whether the <code>ui5-popover</code> arrow is hidden.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		noArrow: {
			type: Boolean,
		},

		/**
		 * Determines if there is no enough space, the <code>ui5-popover</code> can be placed
		 * over the target.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		allowTargetOverlap: {
			type: Boolean,
		},

		/**
		 * Sets the X translation of the arrow
		 *
		 * @private
		 */
		arrowTranslateX: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},

		/**
		 * Sets the Y translation of the arrow
		 *
		 * @private
		 */
		arrowTranslateY: {
			type: Integer,
			defaultValue: 0,
			noAttribute: true,
		},

		/**
		 * Returns the calculated placement depending on the free space
		 *
		 * @private
		 */
		actualPlacementType: {
			type: PopoverPlacementType,
			defaultValue: PopoverPlacementType.Right,
		},

		_maxContentHeight: { type: Integer },

		preventFocusRestore: {
			type: Boolean,
		},
	},
	managedSlots: true,
	slots: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
		/**
		 * Defines the content of the Web Component.
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: HTMLElement,
		},

		/**
		 * Defines the header HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		header: {
			type: HTMLElement,
		},

		/**
		 * Defines the footer HTML Element.
		 *
		 * @type {HTMLElement[]}
		 * @slot
		 * @public
		 */
		footer: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.main.Popover.prototype */ {
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
 * @extends Popup
 * @tagname ui5-popover
 * @since 1.0.0-rc.6
 * @public
 */
class Popover extends Popup {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [Popup.styles, PopoverCss];
	}

	static get template() {
		return PopoverTemplate;
	}

	isOpenerClicked(event) {
		const target = event.target;
		return target === this._opener || (target.getFocusDomRef && target.getFocusDomRef() === this._opener);
	}

	/**
	 * Opens the popover.
	 * @param {HTMLElement} opener the element that the popover is opened by
	 * @public
	 */
	openBy(opener) {
		if (!opener || this.opened) {
			return;
		}

		super.open();

		if (this.isModal) {
			Popover.blockBodyScrolling();
		}

		this._opener = opener;
		this._focusedElementBeforeOpen = getFocusedElement();

		this.fireEvent("beforeOpen", {});
		this.reposition();
		this.applyInitialFocus();

		addOpenedPopover(this);

		this.opened = true;
		this.fireEvent("afterOpen", {});
	}

	/**
	 * Closes the popover.
	 * @public
	 */
	close(escPressed = false, preventRegitryUpdate = false, preventFocusRestore = false) {
		if (!this.opened) {
			return;
		}

		super.close();

		if (this.isModal) {
			Popover.unblockBodyScrolling();
		}

		this.fireEvent("beforeClose", {
			escPressed,
		}, true);


		this.opened = false;

		if (!preventRegitryUpdate) {
			removeOpenedPopover(this);
		}

		// TODO: check focus restore
		if (!this.preventFocusRestore) {
			this.resetFocus();
		}

		this.hide();
		this.fireEvent("afterClose", {});
	}

	get focusedElement() {
		let element = document.activeElement;

		while (element.shadowRoot && element.shadowRoot.activeElement) {
			element = element.shadowRoot.activeElement;
		}

		return (element && typeof element.focus === "function") ? element : null;
	}

	resetFocus() {
		if (!this._focusedElementBeforeOpen) {
			return;
		}

		this._focusedElementBeforeOpen.focus();
		this._focusedElementBeforeOpen = null;
	}

	shouldCloseDueToOverflow(placement, openerRect) {
		const threshold = 32;
		const limits = {
			"Right": openerRect.right,
			"Left": openerRect.left,
			"Top": openerRect.top,
			"Bottom": openerRect.bottom,
		};

		const closedPopupParent = getClosedPopupParent(this._opener);
		let overflowsBottom = false;
		let overflowsTop = false;

		if (closedPopupParent.openBy) {
			const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
			overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
			overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
		}

		return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
	}

	shouldCloseDueToNoOpener(openerRect) {
		return openerRect.top === 0
			&& openerRect.bottom === 0
			&& openerRect.left === 0
			&& openerRect.right === 0;
	}

	reposition() {
		const popoverSize = this.popoverSize;
		const openerRect = this._opener.getBoundingClientRect();
		const placement = this.calcPlacement(openerRect, popoverSize);
		const stretching = this.horizontalAlign === PopoverHorizontalAlign.Stretch;

		if (this._preventRepositionAndClose) {
			return this.close();
		}

		if (this._oldPlacement && (this._oldPlacement.left === placement.left) && (this._oldPlacement.top === placement.top) && stretching) {
			this.show();
			this.style.width = this._width;
			return;
		}

		this._oldPlacement = placement;

		this.actualPlacementType = placement.placementType;
		this.arrowTranslateX = placement.arrowX;
		this.arrowTranslateY = placement.arrowY;

		this.style.left = `${this._left}px`;
		this.style.top = `${this._top}px`;
		this.show();

		if (stretching && this._width) {
			this.style.width = this._width;
		}
	}

	get popoverSize() {
		let width,
			height;
		let rect = this.getBoundingClientRect();

		if (this.opened) {
			width = rect.width;
			height = rect.height;

			return { width, height };
		}

		this.style.visibility = "hidden";
		this.show();

		rect = this.getBoundingClientRect();

		width = rect.width;
		height = rect.height;

		this.hide();
		this.style.visibility = "visible";

		return { width, height };
	}

	get contentDOM() {
		return this.shadowRoot.querySelector(".ui5-popup-content");
	}

	get arrowDOM() {
		return this.shadowRoot.querySelector(".ui5-popover-arrow");
	}

	calcPlacement(targetRect, popoverSize) {
		let left = 0;
		let top = 0;
		const allowTargetOverlap = this.allowTargetOverlap;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		let maxHeight = clientHeight;

		let width = "";
		let height = "";

		const placementType = this.getActualPlacementType(targetRect, popoverSize);

		this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placementType, targetRect);

		const isVertical = placementType === PopoverPlacementType.Top
			|| placementType === PopoverPlacementType.Bottom;

		if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
			popoverSize.width = targetRect.width;
			width = `${targetRect.width}px`;
		} else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
			popoverSize.height = targetRect.height;
			height = `${targetRect.height}px`;
		}

		this._width = width;
		this._height = height;

		const arrowOffset = this.noArrow ? 0 : arrowSize;

		// calc popover positions
		switch (placementType) {
		case PopoverPlacementType.Top:
			left = this.getVerticalLeft(targetRect, popoverSize);
			top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);

			if (!allowTargetOverlap) {
				maxHeight = targetRect.top - arrowOffset;
			}
			break;
		case PopoverPlacementType.Bottom:
			left = this.getVerticalLeft(targetRect, popoverSize);

			if (allowTargetOverlap) {
				top = Math.max(Math.min(targetRect.bottom + arrowOffset, clientHeight - popoverSize.height), 0);
			} else {
				top = targetRect.bottom + arrowOffset;
				maxHeight = clientHeight - targetRect.bottom - arrowOffset;
			}
			break;
		case PopoverPlacementType.Left:
			left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
			top = this.getHorizontalTop(targetRect, popoverSize);
			break;
		case PopoverPlacementType.Right:
			if (allowTargetOverlap) {
				left = Math.max(Math.min(targetRect.left + targetRect.width + arrowOffset, clientWidth - popoverSize.width), 0);
			} else {
				left = targetRect.left + targetRect.width + arrowOffset;
			}

			top = this.getHorizontalTop(targetRect, popoverSize);
			break;
		}

		// correct popover positions
		if (isVertical) {
			if (popoverSize.width > clientWidth || left < 0) {
				left = 0;
			} else if (left + popoverSize.width > clientWidth) {
				left -= left + popoverSize.width - clientWidth;
			}
		} else {
			if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
				top = 0;
			} else if (top + popoverSize.height > clientHeight) {
				top -= top + popoverSize.height - clientHeight;
			}
		}

		let maxContentHeight = Math.round(maxHeight);

		const hasHeader = this.header.length || this.headerText;

		if (hasHeader) {
			const headerDomRef = this.shadowRoot.querySelector(".ui5-popup-header-root")
				|| this.shadowRoot.querySelector(".ui5-popup-header-text");

			if (headerDomRef) {
				maxContentHeight = Math.round(maxHeight - headerDomRef.offsetHeight);
			}
		}

		this._maxContentHeight = maxContentHeight;

		const arrowTranslateX = isVertical ? targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2 : 0;
		const arrowTranslateY = !isVertical ? targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2 : 0;

		if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
			this._left = Math.round(left);
		}

		if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
			this._top = Math.round(top);
		}

		return {
			arrowX: Math.round(arrowTranslateX),
			arrowY: Math.round(arrowTranslateY),
			top: this._top,
			left: this._left,
			placementType,
		};
	}

	/**
	 * Fallbacks to new placement, prioritizing <code>Left</code> and <code>Right</code> placements.
	 * @private
	 */
	fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
		if (targetRect.left > popoverSize.width) {
			return PopoverPlacementType.Left;
		}

		if (clientWidth - targetRect.right > targetRect.left) {
			return PopoverPlacementType.Right;
		}

		if (clientHeight - targetRect.bottom > popoverSize.height) {
			return PopoverPlacementType.Bottom;
		}

		if (clientHeight - targetRect.bottom < targetRect.top) {
			return PopoverPlacementType.Top;
		}
	}

	getActualPlacementType(targetRect, popoverSize) {
		const placementType = this.placementType;
		let actualPlacementType = placementType;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		switch (placementType) {
		case PopoverPlacementType.Top:
			if (targetRect.top < popoverSize.height
				&& targetRect.top < clientHeight - targetRect.bottom) {
				actualPlacementType = PopoverPlacementType.Bottom;
			}
			break;
		case PopoverPlacementType.Bottom:
			if (clientHeight - targetRect.bottom < popoverSize.height
				&& clientHeight - targetRect.bottom < targetRect.top) {
				actualPlacementType = PopoverPlacementType.Top;
			}
			break;
		case PopoverPlacementType.Left:
			if (targetRect.left < popoverSize.width) {
				actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
			}
			break;
		case PopoverPlacementType.Right:
			if (clientWidth - targetRect.right < popoverSize.width) {
				actualPlacementType = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placementType;
			}
			break;
		}

		return actualPlacementType;
	}

	getVerticalLeft(targetRect, popoverSize) {
		let left;

		switch (this.horizontalAlign) {
		case PopoverHorizontalAlign.Center:
		case PopoverHorizontalAlign.Stretch:
			left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
			break;
		case PopoverHorizontalAlign.Left:
			left = targetRect.left;
			break;
		case PopoverHorizontalAlign.Right:
			left = targetRect.right - popoverSize.width;
			break;
		}

		return left;
	}

	getHorizontalTop(targetRect, popoverSize) {
		let top;

		switch (this.verticalAlign) {
		case PopoverVerticalAlign.Center:
		case PopoverVerticalAlign.Stretch:
			top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
			break;
		case PopoverVerticalAlign.Top:
			top = targetRect.top;
			break;
		case PopoverVerticalAlign.Bottom:
			top = targetRect.bottom - popoverSize.height;
			break;
		}

		return top;
	}

	get isModal() {
		return this.modal;
	}

	get styles() {
		return {
			...super.styles,
			content: {
				"max-height": `${this._maxContentHeight}px`,
			},
			arrow: {
				transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
			},
		};
	}
}

Popover.define();

export default Popover;
