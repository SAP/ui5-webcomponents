import type UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { isIOS } from "@ui5/webcomponents-base/dist/Device.js";
import { getClosedPopupParent } from "@ui5/webcomponents-base/dist/util/PopupUtils.js";
import clamp from "@ui5/webcomponents-base/dist/util/clamp.js";
import isElementContainingBlock from "@ui5/webcomponents-base/dist/util/isElementContainingBlock.js";
import getEffectiveScrollbarStyle from "@ui5/webcomponents-base/dist/util/getEffectiveScrollbarStyle.js";
import getParentElement from "@ui5/webcomponents-base/dist/util/getParentElement.js";
import DOMReferenceConverter from "@ui5/webcomponents-base/dist/converters/DOMReference.js";

import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import Popup from "./Popup.js";
import type { PopupBeforeCloseEventDetail as PopoverBeforeCloseEventDetail } from "./Popup.js";
import PopoverPlacement from "./types/PopoverPlacement.js";
import PopoverVerticalAlign from "./types/PopoverVerticalAlign.js";
import PopoverHorizontalAlign from "./types/PopoverHorizontalAlign.js";
import { addOpenedPopover, removeOpenedPopover } from "./popup-utils/PopoverRegistry.js";

// Template
import PopoverTemplate from "./generated/templates/PopoverTemplate.lit.js";
// Styles
import PopupsCommonCss from "./generated/themes/PopupsCommon.css.js";
import PopoverCss from "./generated/themes/Popover.css.js";

const ARROW_SIZE = 8;

type PopoverSize = {
	width: number;
	height: number;
}

type ArrowPosition = {
	x: number;
	y: number;
}

type CalculatedPlacement = {
	arrow: ArrowPosition,
	top: number,
	left: number,
	placement: `${PopoverPlacement}`,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-popover` component displays additional information for an object
 * in a compact way and without leaving the page.
 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
 * It can also include actions in the footer.
 *
 * ### Structure
 *
 * The popover has three main areas:
 *
 * - Header (optional)
 * - Content
 * - Footer (optional)
 *
 * **Note:** The `ui5-popover` is closed when the user clicks
 * or taps outside the popover
 * or selects an action within the popover. You can prevent this with the
 * `modal` property.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/Popover.js";`
 *
 * @constructor
 * @extends Popup
 * @since 1.0.0-rc.6
 * @public
 * @csspart header - Used to style the header of the component
 * @csspart content - Used to style the content of the component
 * @csspart footer - Used to style the footer of the component
 */
@customElement({
	tag: "ui5-popover",
	styles: [
		Popup.styles,
		PopupsCommonCss,
		PopoverCss,
		getEffectiveScrollbarStyle(),
	],
	template: PopoverTemplate,
})
class Popover extends Popup {
	/**
	 * Defines the header text.
	 *
	 * **Note:** If `header` slot is provided, the `headerText` is ignored.
	 * @default undefined
	 * @public
	 */
	@property()
	headerText?: string;

	/**
	 * Determines on which side the component is placed at.
	 * @default "End"
	 * @public
	 */
	@property()
	placement: `${PopoverPlacement}` = "End";

	/**
	 * Determines the horizontal alignment of the component.
	 * @default "Center"
	 * @public
	 */
	@property()
	horizontalAlign: `${PopoverHorizontalAlign}` = "Center";

	/**
	 * Determines the vertical alignment of the component.
	 * @default "Center"
	 * @public
	 */
	@property()
	verticalAlign: `${PopoverVerticalAlign}` = "Center";

	/**
	 * Defines whether the component should close when
	 * clicking/tapping outside of the popover.
	 * If enabled, it blocks any interaction with the background.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	modal = false;

	/**
	 * Determines whether the component arrow is hidden.
	 * @default false
	 * @public
	 * @since 1.0.0-rc.15
	 */
	@property({ type: Boolean })
	hideArrow = false;

	/**
	 * Determines if there is no enough space, the component can be placed
	 * over the target.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	allowTargetOverlap = false;

	/**
	 * Defines whether the content is scrollable.
	 * @default false
	 * @private
	 */
	@property({ type: Boolean })
	disableScrolling = false;

	/**
	 * Sets the X translation of the arrow
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	arrowTranslateX = 0;

	/**
	 * Sets the Y translation of the arrow
	 * @private
	 */
	@property({ type: Number, noAttribute: true })
	arrowTranslateY = 0;

	/**
	 * Returns the calculated placement depending on the free space
	 * @private
	 */
	@property()
	actualPlacement: `${PopoverPlacement}` = "End";

	@property({ type: Number, noAttribute: true })
	_maxHeight?: number;

	@property({ type: Number, noAttribute: true })
	_maxWidth?: number;

	/**
	 * Defines the header HTML Element.
	 * @public
	 */
	@slot({ type: HTMLElement })
	header!: Array<HTMLElement>;

	/**
	 * Defines the footer HTML Element.
	 * @public
	 */
	@slot({ type: HTMLElement })
	footer!: Array<HTMLElement>;

	_opener?: HTMLElement | string;
	_openerRect?: DOMRect;
	_preventRepositionAndClose?: boolean;
	_top?: number;
	_left?: number;
	_oldPlacement?: CalculatedPlacement;
	_width?: string;

	static get VIEWPORT_MARGIN() {
		return 10; // px
	}

	constructor() {
		super();
	}

	/**
	 * Defines the ID or DOM Reference of the element at which the popover is shown.
	 * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	 * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	 * @public
	 * @default undefined
	 * @since 1.2.0
	 */
	@property({ converter: DOMReferenceConverter })
	set opener(value: HTMLElement | string) {
		if (this._opener === value) {
			return;
		}

		this._opener = value;

		if (value && this.open) {
			this.openPopup();
		}
	}

	get opener(): HTMLElement | string | undefined {
		return this._opener;
	}

	async openPopup() {
		if (this._opened) {
			return;
		}

		const opener = this.getOpenerHTMLElement(this.opener);

		if (!opener) {
			console.warn("Valid opener id is required. It must be defined before opening the popover."); // eslint-disable-line
			return;
		}

		if (this.isOpenerOutsideViewport(opener.getBoundingClientRect())) {
			await renderFinished();
			this.open = false;
			this.fireEvent("close", {}, false, false);
			return;
		}

		this._openerRect = opener.getBoundingClientRect();

		await super.openPopup();
	}

	isOpenerClicked(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (target === this._opener) {
			return true;
		}

		const ui5ElementTarget = target as UI5Element;

		if (ui5ElementTarget.getFocusDomRef && ui5ElementTarget.getFocusDomRef() === this._opener) {
			return true;
		}

		return e.composedPath().indexOf(this._opener as EventTarget) > -1;
	}

	/**
	 * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
	 * @private
	 */
	_addOpenedPopup() {
		addOpenedPopover(this);
	}

	/**
	 * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
	 * @private
	 */
	_removeOpenedPopup() {
		removeOpenedPopover(this);
	}

	getOpenerHTMLElement(opener: HTMLElement | string | undefined): HTMLElement | null | undefined {
		if (opener === undefined || opener instanceof HTMLElement) {
			return opener;
		}

		const rootNode = this.getRootNode();

		if (rootNode instanceof Document) {
			return rootNode.getElementById(opener);
		}
		return document.getElementById(opener);
	}

	shouldCloseDueToOverflow(placement: `${PopoverPlacement}`, openerRect: DOMRect): boolean {
		const threshold = 32;
		const limits = {
			"Start": openerRect.right,
			"End": openerRect.left,
			"Top": openerRect.top,
			"Bottom": openerRect.bottom,
		};

		const opener = this.getOpenerHTMLElement(this.opener);
		const closedPopupParent = getClosedPopupParent(opener!);
		let overflowsBottom = false;
		let overflowsTop = false;

		if (closedPopupParent instanceof Popover) {
			const contentRect = closedPopupParent.contentDOM.getBoundingClientRect();
			overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
			overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
		}

		return (limits[placement] < 0 || (limits[placement] + threshold > (closedPopupParent as unknown as Window).innerHeight)) || overflowsBottom || overflowsTop;
	}

	shouldCloseDueToNoOpener(openerRect: DOMRect): boolean {
		return openerRect.top === 0
			&& openerRect.bottom === 0
			&& openerRect.left === 0
			&& openerRect.right === 0;
	}

	isOpenerOutsideViewport(openerRect: DOMRect): boolean {
		return openerRect.bottom < 0
			|| openerRect.top > window.innerHeight
			|| openerRect.right < 0
			|| openerRect.left > window.innerWidth;
	}

	/**
	 * @override
	 */
	_resize() {
		super._resize();

		if (this.open) {
			this.reposition();
		}
	}

	reposition() {
		this._show();
	}

	async _show() {
		super._show();

		const opener = this.getOpenerHTMLElement(this.opener);

		if (opener && this._isUI5Element(opener) && !opener.getDomRef()) {
			return;
		}

		if (!this._opened) {
			this._showOutsideViewport();
		}

		const popoverSize = this.getPopoverSize();
		let placement;

		if (popoverSize.width === 0 || popoverSize.height === 0) {
			// size can not be determined properly at this point, popover will be shown with the next reposition
			return;
		}

		if (this.open) {
			// update opener rect if it was changed during the popover being opened
			this._openerRect = opener!.getBoundingClientRect();
		}

		if (this._oldPlacement && this.shouldCloseDueToNoOpener(this._openerRect!) && this.isFocusWithin()) {
			// reuse the old placement as the opener is not available,
			// but keep the popover open as the focus is within
			placement = this._oldPlacement;
		} else {
			placement = this.calcPlacement(this._openerRect!, popoverSize);
		}

		if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect!)) {
			await this._waitForDomRef();
			return this.closePopup();
		}

		this._oldPlacement = placement;
		this.actualPlacement = placement.placement;

		let left = clamp(
			this._left!,
			Popover.VIEWPORT_MARGIN,
			document.documentElement.clientWidth - popoverSize.width - Popover.VIEWPORT_MARGIN,
		);

		if (this.actualPlacement === PopoverPlacement.End) {
			left = Math.max(left, this._left!);
		}

		let top = clamp(
			this._top!,
			Popover.VIEWPORT_MARGIN,
			document.documentElement.clientHeight - popoverSize.height - Popover.VIEWPORT_MARGIN,
		);

		if (this.actualPlacement === PopoverPlacement.Bottom) {
			top = Math.max(top, this._top!);
		}

		this.arrowTranslateX = placement.arrow.x;
		this.arrowTranslateY = placement.arrow.y;

		top = this._adjustForIOSKeyboard(top);

		Object.assign(this.style, {
			top: `${top}px`,
			left: `${left}px`,
		});

		if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && this._width) {
			this.style.width = this._width;
		}
	}

	/**
	 * Adjust the desired top position to compensate for shift of the screen
	 * caused by opened keyboard on iOS which affects all elements with position:fixed.
	 * @private
	 * @param top The target top in px.
	 * @returns The adjusted top in px.
	 */
	_adjustForIOSKeyboard(top: number): number {
		if (!isIOS()) {
			return top;
		}

		const actualTop = Math.ceil(this.getBoundingClientRect().top);

		return top + (Number.parseInt(this.style.top || "0") - actualTop);
	}

	_getContainingBlockClientLocation() {
		let parentElement = getParentElement(this);

		while (parentElement) {
			if (isElementContainingBlock(parentElement)) {
				return parentElement.getBoundingClientRect();
			}

			parentElement = getParentElement(parentElement);
		}

		return { left: 0, top: 0 };
	}

	getPopoverSize(): PopoverSize {
		const rect = this.getBoundingClientRect(),
			width = rect.width,
			height = rect.height;

		return { width, height };
	}

	_showOutsideViewport() {
		Object.assign(this.style, {
			top: "-10000px",
			left: "-10000px",
		});
	}

	_isUI5Element(el: HTMLElement): el is UI5Element {
		return "isUI5Element" in el;
	}

	get arrowDOM() {
		return this.shadowRoot!.querySelector(".ui5-popover-arrow")!;
	}

	/**
	 * @private
	 */
	calcPlacement(targetRect: DOMRect, popoverSize: PopoverSize): CalculatedPlacement {
		let left = Popover.VIEWPORT_MARGIN;
		let top = 0;
		const allowTargetOverlap = this.allowTargetOverlap;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		let maxHeight = clientHeight;
		let maxWidth = clientWidth;

		const placement = this.getActualPlacement(targetRect, popoverSize);

		this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placement, targetRect);

		const isVertical = placement === PopoverPlacement.Top
			|| placement === PopoverPlacement.Bottom;

		if (this.horizontalAlign === PopoverHorizontalAlign.Stretch && isVertical) {
			popoverSize.width = targetRect.width;
			this._width = `${targetRect.width}px`;
		} else if (this.verticalAlign === PopoverVerticalAlign.Stretch && !isVertical) {
			popoverSize.height = targetRect.height;
		}

		const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;

		// calc popover positions
		switch (placement) {
		case PopoverPlacement.Top:
			left = this.getVerticalLeft(targetRect, popoverSize);
			top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);

			if (!allowTargetOverlap) {
				maxHeight = targetRect.top - arrowOffset;
			}
			break;
		case PopoverPlacement.Bottom:
			left = this.getVerticalLeft(targetRect, popoverSize);
			top = targetRect.bottom + arrowOffset;

			if (allowTargetOverlap) {
				top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
			} else {
				maxHeight = clientHeight - targetRect.bottom - arrowOffset;
			}
			break;
		case PopoverPlacement.Start:
			left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
			top = this.getHorizontalTop(targetRect, popoverSize);

			if (!allowTargetOverlap) {
				maxWidth = targetRect.left - arrowOffset;
			}
			break;
		case PopoverPlacement.End:
			left = targetRect.left + targetRect.width + arrowOffset;
			top = this.getHorizontalTop(targetRect, popoverSize);

			if (allowTargetOverlap) {
				left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
			} else {
				maxWidth = clientWidth - targetRect.right - arrowOffset;
			}
			break;
		}

		// correct popover positions
		if (isVertical) {
			if (popoverSize.width > clientWidth || left < Popover.VIEWPORT_MARGIN) {
				left = Popover.VIEWPORT_MARGIN;
			} else if (left + popoverSize.width > clientWidth - Popover.VIEWPORT_MARGIN) {
				left = clientWidth - Popover.VIEWPORT_MARGIN - popoverSize.width;
			}
		} else {
			if (popoverSize.height > clientHeight || top < 0) { // eslint-disable-line
				top = 0;
			} else if (top + popoverSize.height > clientHeight) {
				top -= top + popoverSize.height - clientHeight;
			}
		}

		this._maxHeight = Math.round(maxHeight - Popover.VIEWPORT_MARGIN);
		this._maxWidth = Math.round(maxWidth - Popover.VIEWPORT_MARGIN);

		if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
			this._left = Math.round(left);
		}

		if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
			this._top = Math.round(top);
		}

		const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
		const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);

		return {
			arrow: arrowPos,
			top: this._top,
			left: this._left,
			placement,
		};
	}

	/**
	 * Calculates the position for the arrow.
	 * @private
	 * @param targetRect BoundingClientRect of the target element
	 * @param popoverSize Width and height of the popover
	 * @param left Left offset of the popover
	 * @param top Top offset of the popover
	 * @param isVertical If the popover is positioned vertically to the target element
	 * @param borderRadius Value of the border-radius property
	 * @returns  Arrow's coordinates
	 */
	getArrowPosition(targetRect: DOMRect, popoverSize: PopoverSize, left: number, top: number, isVertical: boolean, borderRadius: number): ArrowPosition {
		const horizontalAlign = this._actualHorizontalAlign;
		let arrowXCentered = horizontalAlign === PopoverHorizontalAlign.Center || horizontalAlign === PopoverHorizontalAlign.Stretch;

		if (horizontalAlign === PopoverHorizontalAlign.End && left <= targetRect.left) {
			arrowXCentered = true;
		}

		if (horizontalAlign === PopoverHorizontalAlign.Start && left + popoverSize.width >= targetRect.left + targetRect.width) {
			arrowXCentered = true;
		}

		let arrowTranslateX = 0;
		if (isVertical && arrowXCentered) {
			arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
		}

		let arrowTranslateY = 0;
		if (!isVertical) {
			arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
		}

		// Restricts the arrow's translate value along each dimension,
		// so that the arrow does not clip over the popover's rounded borders.
		const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2;
		arrowTranslateY = clamp(
			arrowTranslateY,
			-safeRangeForArrowY,
			safeRangeForArrowY,
		);

		const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2;
		arrowTranslateX = clamp(
			arrowTranslateX,
			-safeRangeForArrowX,
			safeRangeForArrowX,
		);

		return {
			x: Math.round(arrowTranslateX),
			y: Math.round(arrowTranslateY),
		};
	}

	/**
	 * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
	 * @private
	 */
	fallbackPlacement(clientWidth: number, clientHeight: number, targetRect: DOMRect, popoverSize: PopoverSize): PopoverPlacement | undefined {
		if (targetRect.left > popoverSize.width) {
			return PopoverPlacement.Start;
		}

		if (clientWidth - targetRect.right > targetRect.left) {
			return PopoverPlacement.End;
		}

		if (clientHeight - targetRect.bottom > popoverSize.height) {
			return PopoverPlacement.Bottom;
		}

		if (clientHeight - targetRect.bottom < targetRect.top) {
			return PopoverPlacement.Top;
		}
	}

	getActualPlacement(targetRect: DOMRect, popoverSize: PopoverSize): `${PopoverPlacement}` {
		const placement = this.placement;
		let actualPlacement = placement;

		const clientWidth = document.documentElement.clientWidth;
		const clientHeight = document.documentElement.clientHeight;

		switch (placement) {
		case PopoverPlacement.Top:
			if (targetRect.top < popoverSize.height
				&& targetRect.top < clientHeight - targetRect.bottom) {
				actualPlacement = PopoverPlacement.Bottom;
			}
			break;
		case PopoverPlacement.Bottom:
			if (clientHeight - targetRect.bottom < popoverSize.height
				&& clientHeight - targetRect.bottom < targetRect.top) {
				actualPlacement = PopoverPlacement.Top;
			}
			break;
		case PopoverPlacement.Start:
			if (targetRect.left < popoverSize.width) {
				actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placement;
			}
			break;
		case PopoverPlacement.End:
			if (clientWidth - targetRect.right < popoverSize.width) {
				actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placement;
			}
			break;
		}

		return actualPlacement;
	}

	getVerticalLeft(targetRect: DOMRect, popoverSize: PopoverSize): number {
		const horizontalAlign = this._actualHorizontalAlign;
		let left = Popover.VIEWPORT_MARGIN;

		switch (horizontalAlign) {
		case PopoverHorizontalAlign.Center:
		case PopoverHorizontalAlign.Stretch:
			left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
			break;
		case PopoverHorizontalAlign.Start:
			left = targetRect.left;
			break;
		case PopoverHorizontalAlign.End:
			left = targetRect.right - popoverSize.width;
			break;
		}

		return left;
	}

	getHorizontalTop(targetRect: DOMRect, popoverSize: PopoverSize): number {
		let top = 0;

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

	get isModal() { // Required by Popup.js
		return this.modal;
	}

	get _ariaLabelledBy() { // Required by Popup.js
		if (!this._ariaLabel && this._displayHeader) {
			return "ui5-popup-header";
		}

		return undefined;
	}

	get styles() {
		return {
			...super.styles,
			root: {
				"max-height": this._maxHeight ? `${this._maxHeight}px` : "",
				"max-width": this._maxWidth ? `${this._maxWidth}px` : "",
			},
			arrow: {
				transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
			},
		};
	}

	get classes() {
		const allClasses = super.classes;
		allClasses.root["ui5-popover-root"] = true;

		return allClasses;
	}

	/**
	 * Hook for descendants to hide header.
	 */
	get _displayHeader() {
		return !!(this.header.length || this.headerText);
	}

	/**
	 * Hook for descendants to hide footer.
	 */
	get _displayFooter() {
		return true;
	}

	get _actualHorizontalAlign() {
		if (this.effectiveDir === "rtl") {
			if (this.horizontalAlign === PopoverHorizontalAlign.Start) {
				return PopoverHorizontalAlign.End;
			}

			if (this.horizontalAlign === PopoverHorizontalAlign.End) {
				return PopoverHorizontalAlign.Start;
			}
		}

		return this.horizontalAlign;
	}
}

const instanceOfPopover = (object: any): object is Popover => {
	return "opener" in object;
};

Popover.define();

export default Popover;

export { instanceOfPopover };

export type {
	PopoverBeforeCloseEventDetail,
};
