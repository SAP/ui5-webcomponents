import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import ResizeHandler from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import type { ResizeObserverCallback } from "@ui5/webcomponents-base/dist/delegate/ResizeHandler.js";
import "@ui5/webcomponents-icons/dist/overflow.js";
import arraysAreEqual from "@ui5/webcomponents-base/dist/util/arraysAreEqual.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Button from "./Button.js";

import Popover from "./Popover.js";

import ToolbarTemplate from "./generated/templates/ToolbarTemplate.lit.js";
import ToolbarCss from "./generated/themes/Toolbar.css.js";

import ToolbarPopoverTemplate from "./generated/templates/ToolbarPopoverTemplate.lit.js";
import ToolbarPopoverCss from "./generated/themes/ToolbarPopover.css.js";

import ToolbarAlign from "./types/ToolbarAlign.js";

import ToolbarItem from "./ToolbarItem.js";
import ToolbarItemOverflowBehavior from "./types/ToolbarItemOverflowBehavior.js";

function calculateCSSREMValue(styleSet: CSSStyleDeclaration, propertyName: string): number {
	return Number(styleSet.getPropertyValue(propertyName).replace("rem", "")) * parseInt(getComputedStyle(document.body).getPropertyValue("font-size"));
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toolbar</code> component is used to create a horizontal layout with items.
 * The items can be overflowing in a popover, when the space is not enough to show all of them.
 *
 * <h3>Keyboard Handling</h3>
 * The <code>ui5-toolbar</code> provides advanced keyboard handling.
 * <br>
 * <ul>
 * <li>The control is not interactive, but can contain of interactive elements </li>
 * <li>[TAB] - iterates through elements</li>
 * </ul>
 * <br>
 *
 * <h3>ES6 Module Import</h3>
 * <code>import "@ui5/webcomponents/dist/Toolbar";</code>
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.main.Toolbar
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-toolbar
 * @public
 * @since 1.16.0
 */
@customElement({
	tag: "ui5-toolbar",
	languageAware: true,
	renderer: litRender,
	template: ToolbarTemplate,
	staticAreaTemplate: ToolbarPopoverTemplate,
	styles: ToolbarCss,
	staticAreaStyles: ToolbarPopoverCss,
	dependencies: [
		Popover,
		Button,
	],
})

class Toolbar extends UI5Element {
	/**
	 * Indicated the direction in which the Toolbar items will be aligned.
	 * Available options are:
	 * <ul>
	 * <li><code>End</code></li>
	 * <li><code>Start</code></li>
	 * </ul>
	 * @type {sap.ui.webc.main.types.ToolbarAlign}
	 * @public
	 * @defaultvalue: "End"
	 * @name sap.ui.webc.main.Toolbar.prototype.alignContent
	 */
	@property({ type: ToolbarAlign, defaultValue: ToolbarAlign.End })
	alignContent!: `${ToolbarAlign}`;

	/**
	 * Items, which will be displayed in the toolbar.
	 * @type {Object}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	itemsToBar!: Array<ToolbarItem>;
	/**
	 * Items, that will be displayed inside overflow Popover.
	 * @type {Object}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	itemsToOverflow!: Array<ToolbarItem>;

	/**
	 * Cached the sum of all of items width.
	 * @type {sap.ui.webc.base.types.Integer}
	 * @private
	 */
	 @property({ type: Integer, defaultValue: 0 })
	 ITEMS_WIDTH!: number;

	/**
	 * Indicates the items have been measured and the layout can be calculated.
	 * @type {boolean}
	 * @private
	 */
	@property({ type: Boolean })
	itemsWidthMeasured!: boolean;
	/**
	 * Indicates the end of the resizing iteration.
	 * @type {boolean}
	 * @private
	 */
	@property({ type: Boolean })
	resizing!: boolean;

	/**
	* Calculated width of the whole toolbar.
	* @private
	*/
	@property({ type: Integer })
	width?: number;

	/**
	* @private
	* Calculated width of all the Toolbar items.
	*/
	@property({ type: Integer })
	contentWidth?: number;

	/**
	 * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
	 * @private
	 * @type {Boolean}
	 */
	@property({ type: Boolean })
	reverseOverflow!: boolean;

	/**
 	* Slotted Toolbar items
	* @type {sap.ui.webc.main.IToolbarItem[]}
	* @name sap.ui.webc.main.Toolbar.prototype.items
	* @slot items
	* @public
	*/
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	items!: Array<ToolbarItem>

	_onResize!: ResizeObserverCallback;

	ITEMS_WIDTH_MAP: Map<string, number> = new Map();

	constructor() {
		super();

		// resize handler
		this._onResize = this.onResize.bind(this);
	}

	get OVERFLOW_BTN_SIZE(): number {
		const toolbarOverflowButton = this.overflowButtonDOM;
		return toolbarOverflowButton ? toolbarOverflowButton.getBoundingClientRect().width : 0;
	}

	get PADDING(): number {
		const toolbarComputedStyle = getComputedStyle(this.getDomRef()!);
		return calculateCSSREMValue(toolbarComputedStyle, "--_ui5-toolbar-padding-left")
		+ calculateCSSREMValue(toolbarComputedStyle, "--_ui5-toolbar-padding-right");
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

	async onAfterRendering() {
		if (this.resizing) {
			this.resizing = false;
			return;
		}

		await renderFinished();
		this.storeItemsWidth();
		this.processOverflowLayout();
	}

	/**
	 * Layout management
	 */
	processOverflowLayout(forceLayout = false) {
		const containerWidth = this.offsetWidth;
		const contentWidth: number = this.ITEMS_WIDTH;
		const contentOverflows = contentWidth + this.OVERFLOW_BTN_SIZE > containerWidth;

		// skip calculation if the width has not been changed
		if (!forceLayout && this.width === containerWidth) {
			return;
		}

		if (contentOverflows) {
			this.distributeItems(contentWidth - containerWidth);
		} else {
			this.displayAllItemsIntoBar();
		}

		this.width = containerWidth;

		if (this.contentWidth !== contentWidth) {
			this.contentWidth = contentWidth;
		}
	}

	storeItemsWidth() {
		let totalWidth = 0;

		this.movableItems.forEach((item: ToolbarItem) => {
			const itemWidth = this.getitemWidth(item);
			const id: string = item._id;
			totalWidth += itemWidth;
			this.ITEMS_WIDTH_MAP.set(id, itemWidth);
		});

		this.ITEMS_WIDTH = totalWidth;
		this.itemsWidthMeasured = true;
	}

	distributeItems(overflowSpace = 0) {
		overflowSpace += this.OVERFLOW_BTN_SIZE;
		overflowSpace += this.PADDING;

		this.itemsToBar = [];
		this.itemsToOverflow = [];

		// distribute items that always overflow
		this.distributeItemsThatAlwaysOverflow();

		// distribute the rest of the items, based on the available space
		this.movableItems.reverse().forEach(item => {
			if (overflowSpace > 0 && item.getAttribute("overflowPriority") !== ToolbarItemOverflowBehavior.NeverOverflow) {
				this.itemsToOverflow.unshift(item);
				overflowSpace -= this.getCachedItemWidth(item._id)!;
			} else {
				this.itemsToBar.unshift(item);
			}
		});

		// If the last bar item is a spacer, force it to the overflow even if there is enough space for it
		if (this.itemsToBar.length) {
			const lastItemToBar = this.itemsToBar[this.itemsToBar.length - 1];
			if (lastItemToBar.ignoreSpace) {
				const itemBar = this.itemsToBar.pop();
				if (itemBar) {
					this.itemsToOverflow.unshift(itemBar);
				}
			}
		}
	}

	displayAllItemsIntoBar() {
		this.itemsToOverflow = [];

		// distribute items that always overflow
		this.distributeItemsThatAlwaysOverflow();

		// distribute items that always overflow
		this.distributeItemsThatNeverOverflow();

		// distribute the rest of the items into the bar
		this.itemsToBar = this.movableItems.map((item: ToolbarItem) => item);
	}

	distributeItemsThatAlwaysOverflow() {
		this.alwaysOverflowItems.forEach((item: ToolbarItem) => {
			this.itemsToOverflow.push(item);
		});
	}

	distributeItemsThatNeverOverflow() {
		this.neverOverflowItems.forEach((item: ToolbarItem) => {
			this.itemsToBar.push(item);
		});
	}

	get alwaysOverflowItems() {
		return this._items.filter((item: ToolbarItem) => item.getAttribute("overflow-priority") === ToolbarItemOverflowBehavior.AlwaysOverflow);
	}

	get movableItems() {
		return this._items.filter((item: ToolbarItem) => item.getAttribute("overflow-priority") !== ToolbarItemOverflowBehavior.AlwaysOverflow);
	}

	get neverOverflowItems() {
		return this._items.filter((item: ToolbarItem) => item.getAttribute("overflow-priority") === ToolbarItemOverflowBehavior.NeverOverflow);
	}

	/**
	 * Event Handlers
	 */
	onResize() {
		if (!this.itemsWidthMeasured) {
			return;
		}

		this.resizing = true;
		this.closeOverflow();
		this.processOverflowLayout();
	}

	onCustomItemClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const item = target.closest<ToolbarItem>(".ui5-tb-item") || target.closest<ToolbarItem>(".ui5-tb-popover-item");

		if (target === this.overflowButtonDOM) {
			this.openOverflow();
			return;
		}

		if (!item) {
			return;
		}

		const refItemId = target.getAttribute("data-ui5-external-action-item-id");

		if (refItemId) {
			this.getItemByID(refItemId)!.fireEvent("click", {
				targetRef: e.target,
			}, true);

			if (item.getAttribute("prevent-overflow-closing") === "false") {
				this.closeOverflow();
			}
		}
	}

	/**
	 * Returns if the overflow popup is open.
	 *
	 * @public
	 * @return { Promise<Boolean> }
	 */
	async isOverflowOpen(): Promise<boolean> {
		const overflowPopover = await this.getOverflowPopover();
		return overflowPopover!.isOpen();
	}

	/**
	 * Read-only members
	 */
	get overflowItems() {
		const overflowItems = this.getItemsInfo(this.itemsToOverflow);
		return this.reverseOverflow ? overflowItems.reverse() : overflowItems;
	}

	get standardItems() {
		if (!this.itemsWidthMeasured && (!arraysAreEqual(this._items, this.itemsToBar))) {
			this.itemsToBar = this._items.filter(item => item);
		}

		return this.getItemsInfo(this.itemsToBar);
	}

	get showOverflowBtn() {
		return !!this.itemsToOverflow.length;
	}

	get _items(): Array<ToolbarItem> {
		return this.getSlottedNodes("items");
	}

	/**
	 * Toolbar Overflow Popover
	 */
	get overflowButtonDOM(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-tb-overflow-btn");
	}

	get itemsDOM() {
		return this.shadowRoot!.querySelector(".ui5-tb-items");
	}

	get hasItemWithText(): boolean {
		return this.overflowItems.some((item: ToolbarItem) => item.containsText);
	}

	get hasFlexibleSpacers() {
		return this.items.some((item: ToolbarItem) => item.localName === "ui5-toolbar-spacer" && !item.hasFlexibleWidth);
	}

	get classes() {
		return {
			items: {
				"ui5-tb-items": true,
				"ui5-tb-items-full-width": this.hasFlexibleSpacers,
			},
			overflow: {
				"ui5-overflow-list--alignleft": this.hasItemWithText,
			},
		};
	}

	async openOverflow(): Promise<void> {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover!.showAt(this.overflowButtonDOM!);
		this.reverseOverflow = overflowPopover!.actualPlacementType === "Top";
	}

	async closeOverflow() {
		const overflowPopover = await this.getOverflowPopover();
		overflowPopover!.close();
	}

	async getOverflowPopover(): Promise<Popover | null> {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Popover>(".ui5-overflow-popover");
	}

	/**
	 * Private members
	 */
	getItemsInfo(items: Array<ToolbarItem>) {
		return items.map((item: ToolbarItem) => {
			// Item props
			const toolbarItem = {
				toolbarTemplate: executeTemplate(item.toolbarTemplate, item),
				toolbarPopoverTemplate: executeTemplate(item.toolbarPopoverTemplate, item),
			};

			return toolbarItem as ToolbarItem;
		});
	}

	getitemWidth(item: ToolbarItem): number {
		// Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
		if (item.ignoreSpace && !item.hasFlexibleWidth) {
			return 0;
		}
		const id: string = item._id;
		// Measure rendered width for spacers with width, and for normal items
		const renderedItem = this.getToolbarItemByID(id);

		let itemWidth = 0;

		if (renderedItem) {
			const ItemCSSStyleSet = getComputedStyle(renderedItem);
			itemWidth = renderedItem.offsetWidth + calculateCSSREMValue(ItemCSSStyleSet, "--_ui5-toolbar-item-margin-right")
			+ calculateCSSREMValue(ItemCSSStyleSet, "--_ui5-toolbar-item-margin-left");
		} else {
			itemWidth = this.getCachedItemWidth(id) || 0;
		}

		return Math.ceil(itemWidth);
	}

	getCachedItemWidth(id: string) {
		return this.ITEMS_WIDTH_MAP.get(id);
	}

	getItemByID(id: string) {
		return this._items.find(item => item._id === id);
	}

	getToolbarItemByID(id: string): HTMLElement | null {
		return this.itemsDOM!.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
	}

	async getOverflowedItemByID(id: string): Promise<UI5Element | null> {
		const popover = await this.getOverflowPopover();
		return popover!.querySelector<UI5Element>(`[data-ui5-external-action-item-id="${id}"]`);
	}

	getItemDOMRefByID(id: string) {
		return this.getToolbarItemByID(id) || (this.getOverflowedItemByID(id));
	}
}

Toolbar.define();

export default Toolbar;
