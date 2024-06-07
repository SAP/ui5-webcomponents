import UI5Element, { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
import AriaHasPopup from "@ui5/webcomponents-base/dist/types/AriaHasPopup.js";

import {
	TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

import ToolbarTemplate from "./generated/templates/ToolbarTemplate.lit.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";

import ToolbarPopoverCss from "./generated/themes/ToolbarPopover.css.js";

import ToolbarAlign from "./types/ToolbarAlign.js";
import ToolbarDesign from "./types/ToolbarDesign.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

import ToolbarItem from "./ToolbarItem.js";
import type ToolbarSeparator from "./ToolbarSeparator.js";

import {
	getRegisteredToolbarItem,
	getRegisteredStyles,
	getRegisteredDependencies,
} from "./ToolbarRegistry.js";

import Button from "./Button.js";
import Popover from "./Popover.js";

type ToolbarMinWidthChangeEventDetail = {
	minWidth: number,
};

function calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
	return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
}

function parsePxValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
	return Number(styleSet.getPropertyValue(propertyName).replace("px", ""));
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-toolbar` component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * ### Keyboard Handling
 * The `ui5-toolbar` provides advanced keyboard handling.
 *
 * - The control is not interactive, but can contain of interactive elements
 * - [Tab] - iterates through elements
 *
 * ### ES6 Module Import
 * `import "@ui5/webcomponents/dist/Toolbar.js";`
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.17.0
 */
@customElement({
	tag: "ui5-toolbar",
	languageAware: true,
	renderer: litRender,
	template: ToolbarTemplate,
})
class Toolbar extends UI5Element {
	static i18nBundle: I18nBundle;

	/**
	 * Indicated the direction in which the Toolbar items will be aligned.
	 * @public
	 * @default "End"
	 */
	@property({ type: ToolbarAlign, defaultValue: ToolbarAlign.End })
	alignContent!: `${ToolbarAlign}`;

	/**
	 * Calculated width of the whole toolbar.
	 * @private
	 * @default undefined
	 */
	@property({ validator: Integer })
	width?: number;

	/**
	 * Calculated width of the toolbar content.
	 * @private
	 * @default undefined
	 */
	@property({ validator: Integer })
	contentWidth?: number;

	/**
	 * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
	 * @private
	 */
	@property({ type: Boolean })
	reverseOverflow!: boolean;

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default ""
	 * @public
	 */
	@property()
	accessibleName!: string;

	/**
	 * Receives id(or many ids) of the elements that label the input.
	 * @default ""
	 * @public
	 */
	@property({ defaultValue: "" })
	accessibleNameRef!: string;

	/**
	 * Defines the toolbar design.
	 * @public
	 * @default "Auto"
	 * @since 2.0.0
	 */
	@property({ type: ToolbarDesign, defaultValue: ToolbarDesign.Auto })
	design!: `${ToolbarDesign}`;

	/**
	 * Defines the items of the component.
     *
     * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<ToolbarItem>

	_onResize!: ResizeObserverCallback;
	_onInteract!: EventListener;
	itemsToOverflow: Array<ToolbarItem> = [];
	itemsWidth = 0;
	minContentWidth = 0;
	popoverOpen = false;
	itemsWidthMeasured = false;
	_sAutoDesign = ToolbarDesign.Auto;

	ITEMS_WIDTH_MAP: Map<string, number> = new Map();

	static get styles() {
		const styles = getRegisteredStyles();
		return [
			ToolbarCss,
			ToolbarPopoverCss,
			...styles,
		];
	}

	static get dependencies() {
		const deps = getRegisteredDependencies();
		return [
			Popover,
			Button,
			...deps,
		];
	}

	static async onDefine() {
		Toolbar.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._onResize = this.onResize.bind(this);
		this._onInteract = (e: Event) => this.onInteract(e as CustomEvent);
	}

	/**
	 * Read-only members
	 */

	get overflowButtonSize(): number {
		return this.overflowButtonDOM?.getBoundingClientRect().width || 0;
	}

	get padding(): number {
		const toolbarComputedStyle = getComputedStyle(this.getDomRef()!);
		return calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-left"))
			+ calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-right"));
	}

	get subscribedEvents() {
		return this.items
			.map((item: ToolbarItem) => Array.from(item.subscribedEvents.keys()))
			.flat()
			// remove duplicates
			.filter((value, index, self) => self.indexOf(value) === index);
	}

	get alwaysOverflowItems() {
		return this.items.filter((item: ToolbarItem) => item.overflowPriority === ToolbarItemOverflowBehavior.AlwaysOverflow);
	}

	get movableItems() {
		return this.items.filter((item: ToolbarItem) => item.overflowPriority !== ToolbarItemOverflowBehavior.AlwaysOverflow && item.overflowPriority !== ToolbarItemOverflowBehavior.NeverOverflow);
	}

	get overflowItems() {
		// spacers are ignored
		const overflowItems = this.getItemsInfo(this.itemsToOverflow.filter(item => !item.ignoreSpace));
		return this.reverseOverflow ? overflowItems.reverse() : overflowItems;
	}

	get standardItems() {
		return this.getItemsInfo(this.items.filter(item => this.itemsToOverflow.indexOf(item) === -1));
	}

	get hideOverflowButton() {
		return this.itemsToOverflow.filter(item => !(item.ignoreSpace || item.isSeparator)).length === 0;
	}

	get classes() {
		const activeDesignClass = `ui5-tb-items-design-${this.getActiveDesign().toLowerCase()}`;
		return {
			items: {
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
				[activeDesignClass]: true,
			},
			overflow: {
				"ui5-overflow-list--alignleft": this.hasItemWithText,
			},
			overflowButton: {
				"ui5-tb-item": true,
				"ui5-tb-overflow-btn": true,
				"ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
			},
		};
	}

	get interactiveItemsCount() {
		return this.items.filter((item: ToolbarItem) => item.isInteractive).length;
	}

	/**
	 * Accessibility
	 */

	get hasAriaSemantics() {
		return this.interactiveItemsCount > 1;
	}

	get accessibleRole() {
		return this.hasAriaSemantics ? "toolbar" : undefined;
	}

	get ariaLabelText() {
		return this.hasAriaSemantics ? getEffectiveAriaLabelText(this) : undefined;
	}

	get accInfo() {
		return {
			root: {
				role: this.accessibleRole,
				accessibleName: this.ariaLabelText,
			},
			overflowButton: {
				accessibleName: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
				tooltip: Toolbar.i18nBundle.getText(TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL),
				accessibilityAttributes: {
					expanded: this.overflowButtonDOM?.accessibilityAttributes.expanded,
					hasPopup: AriaHasPopup.Menu.toLowerCase(),
				},
			},
		};
	}

	/**
	 * Toolbar Overflow Popover
	 */

	get overflowButtonDOM(): Button | null {
		return this.shadowRoot!.querySelector(".ui5-tb-overflow-btn");
	}

	get itemsDOM() {
		return this.shadowRoot!.querySelector(".ui5-tb-items");
	}

	get hasItemWithText(): boolean {
		return this.itemsToOverflow.some((item: ToolbarItem) => item.containsText);
	}

	get hasFlexibleSpacers() {
		return this.items.some((item: ToolbarItem) => item.hasFlexibleWidth);
	}

	/**
	 * Lifecycle methods
	 */
	onEnterDOM() {
		ResizeHandler.register(this, this._onResize);
	}

	onExitDOM() {
		ResizeHandler.deregister(this, this._onResize);
	}

	onInvalidation(changeInfo: ChangeInfo) {
		if (changeInfo.reason === "childchange" && changeInfo.child === this.itemsToOverflow[0]) {
			this.onToolbarItemChange();
		}
	}

	onBeforeRendering() {
		this.detachListeners();
		this.attachListeners();
	}

	async onAfterRendering() {
		await renderFinished();

		this.storeItemsWidth();
		this.processOverflowLayout();
	}

	/**
	 * Returns if the overflow popup is open.
	 * @public
	 */
	isOverflowOpen(): boolean {
		const overflowPopover = this.getOverflowPopover();
		return overflowPopover!.open;
	}

	openOverflow(): void {
		const overflowPopover = this.getOverflowPopover();
		overflowPopover!.opener = this.overflowButtonDOM!;
		overflowPopover!.open = true;
		this.reverseOverflow = overflowPopover!.actualPlacement === "Top";
	}

	closeOverflow() {
		const overflowPopover = this.getOverflowPopover();
		overflowPopover!.open = false;
	}

	toggleOverflow() {
		if (this.popoverOpen) {
			this.closeOverflow();
		} else {
			this.openOverflow();
		}
	}

	getOverflowPopover(): Popover | null {
		return this.shadowRoot!.querySelector<Popover>(".ui5-overflow-popover");
	}

	/**
	 * Layout management
	 */

	processOverflowLayout() {
		const containerWidth = this.offsetWidth - this.padding;
		const contentWidth = this.itemsWidth;
		const overflowSpace = contentWidth - containerWidth + this.overflowButtonSize;

		// skip calculation if the width has not been changed or if the items width has not been changed
		if (this.width === containerWidth && this.contentWidth === contentWidth) {
			return;
		}

		this.distributeItems(overflowSpace);
		this.width = containerWidth;
		this.contentWidth = contentWidth;
	}

	storeItemsWidth() {
		let totalWidth = 0,
			minWidth = 0;

		this.items.forEach((item: ToolbarItem) => {
			const itemWidth = this.getItemWidth(item);
			totalWidth += itemWidth;
			if (item.overflowPriority === ToolbarItemOverflowBehavior.NeverOverflow) {
				minWidth += itemWidth;
			}
			this.ITEMS_WIDTH_MAP.set(item._id, itemWidth);
		});

		if (minWidth !== this.minContentWidth) {
			const spaceAroundContent = this.offsetWidth - this.getDomRef()!.offsetWidth;
			this.fireEvent<ToolbarMinWidthChangeEventDetail>("_min-content-width-change", {
				minWidth: minWidth + spaceAroundContent + this.overflowButtonSize,
			});
		}

		this.itemsWidth = totalWidth;
		this.minContentWidth = minWidth;
	}

	distributeItems(overflowSpace = 0) {
		const movableItems = this.movableItems.reverse();
		let index = 0;
		let currentItem = movableItems[index];

		this.itemsToOverflow = [];

		// distribute items that always overflow
		this.distributeItemsThatAlwaysOverflow();

		while (overflowSpace > 0 && currentItem) {
			this.itemsToOverflow.unshift(currentItem);
			overflowSpace -= this.getCachedItemWidth(currentItem?._id) || 0;
			index++;
			currentItem = movableItems[index];
		}

		// If the last bar item is a spacer, force it to the overflow even if there is enough space for it
		if (index < movableItems.length) {
			let lastItem = movableItems[index];
			while (index <= movableItems.length - 1 && lastItem.isSeparator) {
				this.itemsToOverflow.unshift(lastItem);
				index++;
				lastItem = movableItems[index];
			}
		}

		this.setSeperatorsVisibilityInOverflow();
	}

	distributeItemsThatAlwaysOverflow() {
		this.alwaysOverflowItems.forEach((item: ToolbarItem) => {
			this.itemsToOverflow.push(item);
		});
	}

	setSeperatorsVisibilityInOverflow() {
		this.itemsToOverflow.forEach((item, idx, items) => {
			if (item.isSeparator) {
				(item as ToolbarSeparator).visible = this.shouldShowSeparatorInOverflow(idx, items);
			}
		});
	}

	shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<ToolbarItem>) {
		let foundPrevNonSeparatorItem = false;
		let foundNextNonSeperatorItem = false;

		// search for non-separator item before and after the seperator
		overflowItems.forEach((item, idx) => {
			if (idx < separatorIdx && !item.isSeparator) {
				foundPrevNonSeparatorItem = true;
			}
			if (idx > separatorIdx && !item.isSeparator) {
				foundNextNonSeperatorItem = true;
			}
		});

		return foundPrevNonSeparatorItem && foundNextNonSeperatorItem;
	}

	/**
	 * Event Handlers
	 */

	onOverflowPopoverClosed() {
		this.popoverOpen = false;
		if (this.overflowButtonDOM) {
			this.overflowButtonDOM.accessibilityAttributes.expanded = false;
		}
	}

	onOverflowPopoverOpened() {
		this.popoverOpen = true;
		if (this.overflowButtonDOM) {
			this.overflowButtonDOM.accessibilityAttributes.expanded = true;
		}
	}

	onResize() {
		if (!this.itemsWidth) {
			return;
		}

		this.closeOverflow();
		this.processOverflowLayout();
	}

	onInteract(e: CustomEvent) {
		const target = e.target as HTMLElement;
		const item = target.closest<ToolbarItem>(".ui5-tb-item") || target.closest<ToolbarItem>(".ui5-tb-popover-item");

		if (target === this.overflowButtonDOM) {
			this.toggleOverflow();
			return;
		}

		if (!item) {
			return;
		}

		const refItemId = target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			const abstractItem = this.getItemByID(refItemId);
			const eventType = e.type;
			const eventTypeNonPrefixed: string = e.type.replace("ui5-", "");
			const prevented = !abstractItem?.fireEvent(eventTypeNonPrefixed, e.detail, true);
			const eventOptions = abstractItem?.subscribedEvents.get(eventType) || abstractItem?.subscribedEvents.get(eventTypeNonPrefixed);

			if (prevented || abstractItem?.preventOverflowClosing || eventOptions?.preventClosing) {
				return;
			}

			this.closeOverflow();
		}
	}

	/**
	 * Private members
	 */

	attachListeners() {
		const popover = this.getOverflowPopover();

		this.subscribedEvents.forEach((e: string) => {
			this.itemsDOM?.addEventListener(e, this._onInteract);
			popover?.addEventListener(e, this._onInteract);
		});
	}

	detachListeners() {
		const popover = this.getOverflowPopover();

		this.subscribedEvents.forEach((e: string) => {
			this.itemsDOM?.removeEventListener(e, this._onInteract);
			popover?.removeEventListener(e, this._onInteract);
		});
	}

	onToolbarItemChange() {
		// some items were updated reset the cache and trigger a re-render
		this.itemsToOverflow = [];
		this.contentWidth = 0; // re-render
	}

	getItemsInfo(items: Array<ToolbarItem>) {
		return items.map((item: ToolbarItem) => {
			const ElementClass = getRegisteredToolbarItem(item.constructor.name);

			if (!ElementClass) {
				return null;
			}

			const toolbarItem = {
				toolbarTemplate: executeTemplate(ElementClass.toolbarTemplate, item),
				toolbarPopoverTemplate: executeTemplate(ElementClass.toolbarPopoverTemplate, item),
			};

			return toolbarItem;
		});
	}

	getItemWidth(item: ToolbarItem): number {
		// Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
		if (item.ignoreSpace || item.isSeparator) {
			return 0;
		}
		const id: string = item._id;
		// Measure rendered width for spacers with width, and for normal items
		const renderedItem = this.getRegisteredToolbarItemByID(id);

		let itemWidth = 0;

		if (renderedItem) {
			const ItemCSSStyleSet = getComputedStyle(renderedItem);
			itemWidth = renderedItem.offsetWidth + parsePxValue(ItemCSSStyleSet, "margin-inline-end")
				+ parsePxValue(ItemCSSStyleSet, "margin-inline-start");
		} else {
			itemWidth = this.getCachedItemWidth(id) || 0;
		}

		return Math.ceil(itemWidth);
	}

	getCachedItemWidth(id: string) {
		return this.ITEMS_WIDTH_MAP.get(id);
	}

	getItemByID(id: string) {
		return this.items.find(item => item._id === id);
	}

	getRegisteredToolbarItemByID(id: string): HTMLElement | null {
		return this.itemsDOM!.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
	}

	/*
	 * Design property setter.
	 * Second parameter can be used to define auto design context.
	 * **Note:** When the second parameter is used, Toolbar does not rerender. This should be done by the setter.
	 */

	setDesign(sDesign: ToolbarDesign, bSetAutoDesign: boolean) {
		if (bSetAutoDesign) {
			this._sAutoDesign = sDesign;
			return this;
		}
	}

	/**
	 * Returns the currently applied design property of the Toolbar.
	 */
	getActiveDesign() {
		return this.design !== ToolbarDesign.Auto ? this.design : this._sAutoDesign;
	}
}

Toolbar.define();

export default Toolbar;
export type {
	ToolbarMinWidthChangeEventDetail,
};
