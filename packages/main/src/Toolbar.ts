import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import { getEffectiveAriaLabelText } from "@ui5/webcomponents-base/dist/util/AriaLabelHelper.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getScopedVarName } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";

import Menu, { MenuItemClickEventDetail } from "./Menu.js";
import MenuItem from "./MenuItem.js";

import {
	TOOLBAR_OVERFLOW_BUTTON_ARIA_LABEL,
} from "./generated/i18n/i18n-defaults.js";

import ToolbarTemplate from "./generated/templates/ToolbarTemplate.lit.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";

import ToolbarAlign from "./types/ToolbarAlign.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";
import HasPopup from "./types/HasPopup.js";

import Button from "./Button.js";

interface IToolbarSubMenuItem {
	_id: string;
	displayText: string;
	onMenuItemClick: (event: CustomEvent<MenuItemClickEventDetail>) => void;
}

interface IToolbarItem extends UI5Element {
	overflowPriority: `${ToolbarItemOverflowBehavior}`;
	overflowed: boolean;
	preventOverflowClosing: boolean;
	preventOverflow?: boolean;
	hasFlexibleWidth?: boolean;
	isInteractive?: boolean;
	stableDomRef?: HTMLElement;
	onMenuItemClick?(event: Event): void;
	toolbarDisplayText?: string;
	subMenuItems?: Array<IToolbarSubMenuItem>;
}

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
	styles: [
		ToolbarCss,
	],
	dependencies: [Button, Menu, MenuItem],
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
	 * Defines the items of the component.
	 *
	 * **Note:** Currently only `ui5-toolbar-button`, `ui5-toolbar-select`, `ui5-toolbar-separator` and `ui5-toolbar-spacer` are allowed here.
	 * @public
	 */
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<IToolbarItem>

	@property({ type: Integer, defaultValue: -1 })
	itemsInOverflow!: number;

	_onResize!: ResizeObserverCallback;
	_onInteract!: EventListener;
	popoverOpen = false;

	static async onDefine() {
		Toolbar.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}

	constructor() {
		super();

		this._onResize = this.onResize.bind(this);
	}

	/**
	 * Read-only members
	 */

	get overflowButtonSize(): number {
		return this.hideOverflowButton ? 0 : this.overflowButtonDOM!.clientWidth;
	}

	get padding(): number {
		const toolbarComputedStyle = getComputedStyle(this.getDomRef()!);
		return calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-left"))
			+ calculateCSSREMValue(toolbarComputedStyle, getScopedVarName("--_ui5-toolbar-padding-right"));
	}

	get neverOverflowItems() {
		return this.items.filter((item: IToolbarItem) => item.overflowPriority === ToolbarItemOverflowBehavior.NeverOverflow);
	}

	get movableItems() {
		return this.items.filter((item: IToolbarItem) => item.overflowPriority !== ToolbarItemOverflowBehavior.AlwaysOverflow && item.overflowPriority !== ToolbarItemOverflowBehavior.NeverOverflow);
	}

	get overflowItems() {
		return this.items.filter((item: IToolbarItem) => item.hidden && !item.preventOverflow);
	}

	get hideOverflowButton() {
		return this.overflowItems.length === 0;
	}

	get classes() {
		return {
			main: {
				"ui5-tb-root": true,
			},
			items: {
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
			},
			overflowButton: {
				"ui5-tb-item": true,
				"ui5-tb-overflow-btn": true,
				"ui5-tb-overflow-btn-hidden": this.hideOverflowButton,
			},
		};
	}

	get interactiveItemsCount() {
		return this.items.filter((item: IToolbarItem) => item.isInteractive).length;
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
					hasPopup: HasPopup.Menu.toLowerCase(),
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

	get itemsDOM(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-tb-items");
	}

	get rootDOM(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-tb-root");
	}

	get hasFlexibleSpacers() {
		return this.items.some((item: IToolbarItem) => item.hasFlexibleWidth);
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

	async openOverflow(): Promise<void> {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover!.showAt(this.overflowButtonDOM!);
	}

	async closeOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover!.close();
	}

	toggleOverflow() {
		if (this.popoverOpen) {
			this.closeOverflow();
		} else {
			this.openOverflow();
		}
	}

	async getOverflowPopover(): Promise<Menu | null> {
		return Promise.resolve(this.shadowRoot!.querySelector<Menu>("[ui5-menu]"));
	}

	onAfterRendering(): void {
		this.processOverflowLayout();
	}

	onMenuItemClick(event: CustomEvent<MenuItemClickEventDetail>) {
		const menuItem = event.detail.item;
		const itemId = menuItem.getAttribute("data-ui5-id");

		if (!itemId) {
			return;
		}

		// recursively search for the item in the toolbar items
		const findItem = (id: string, items: Array<Partial<IToolbarItem>>): Partial<IToolbarItem> | undefined => {
			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				if (item._id === id) {
					return item;
				}

				if (item.subMenuItems) {
					const foundItem = findItem(id, item.subMenuItems);
					if (foundItem) {
						return foundItem;
					}
				}
			}
		};

		const item = findItem(itemId, this.items);
		if (item?.onMenuItemClick) {
			item.onMenuItemClick(event);
		}
	}

	processOverflowLayout() {
		let itemsWidth = 0;
		const allItems = [...this.movableItems, ...this.neverOverflowItems];
		const itemsToShow: IToolbarItem[] = [];
		const rootDomWidth = this.rootDOM!.offsetWidth - this.overflowButtonSize;
		const itemsCount = this.items.length;

		for (let i = 0; i < itemsCount; i++) {
			const item = allItems.pop();
			if (item) {
				item.hidden = false;
				const ItemCSSStyleSet = getComputedStyle(item);
				itemsWidth += item.offsetWidth + parsePxValue(ItemCSSStyleSet, "margin-inline-end")
					+ parsePxValue(ItemCSSStyleSet, "margin-inline-start");

				if (itemsWidth < rootDomWidth) {
					itemsToShow.push(item);
				} else {
					break;
				}
			}
		}

		this.items.forEach(i => {
			if (!itemsToShow.includes(i) && !this.neverOverflowItems.includes(i)) {
				i.hidden = true;
			}
		});

		this.itemsInOverflow = this.overflowItems.length; // rerendering
	}

	shouldShowSeparatorInOverflow(separatorIdx: number, overflowItems: Array<IToolbarItem>) {
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
		this.processOverflowLayout();
	}
}

Toolbar.define();

export default Toolbar;
export {
	IToolbarItem,
	IToolbarSubMenuItem,
};
