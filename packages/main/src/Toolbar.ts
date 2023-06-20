import executeTemplate from "@ui5/webcomponents-base/dist/renderer/executeTemplate.js";
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
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

import ToolbarDesign from "./types/ToolbarDesign.js";
import ToolbarStyling from "./types/ToolbarStyling.js";
import ToolbarAlign from "./types/ToolbarAlign.js";

import ToolbarButton from "./ToolbarButton.js";
import ToolbarSpacer from "./ToolbarSpacer.js";
import ToolbarItem from "./ToolbarItem.js";
import ToolbarSeparator from "./ToolbarSeparator.js";

type ActionsWidthMap = {
	[key: string]: number
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>ui5-toolbar</code> component is used to create a horizontal layout with actions.
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
		ToolbarButton,
		ToolbarSpacer,
		ToolbarSeparator,
	],
})

/**
 * Fired whenever the width of the content changes.
 * @param {Number} contentWidth the value of the new changed width.
 * @event sap.ui.webc.main.Toolbar.prototype.contentWidthChange

 * @public
 */
@event("content-width-change", {
	detail: {
		contentWidth: { type: Number },
	},
})
/**
 * Fired whenever the toolbar popup closes and opens.
 * @param {Boolean} open indicates the state of the popup.
 * @public
 * @event sap.ui.webc.main.Toolbar.prototype.overflowToggle
 */
@event("overflow-toggle", {
	detail: {
		open: { type: Boolean },
	},
})

class Toolbar extends UI5Element {
	/**
	 * Indicates if the Toolbar is in disabled state.
	 * @type {boolean}
	 * @public
	 * @name sap.ui.webc.main.Toolbar.prototype.disabled
	 */
	 @property({ type: Boolean })
	 disabled!: boolean;

	/**
	 * Defines the design of the toolbar background. It can be solid or transparent.
	 * @type {sap.ui.webc.main.types.ToolbarDesign}
	 * @public
	 * @defaultvalue "Solid"
	 * @name sap.ui.webc.main.Toolbar.prototype.design
	 */
	@property({ type: ToolbarDesign })
	design!: string;

	/**
	 * Defines the styling of the toolbar. It can be standard or clear (no border applied).
	 * @type {sap.ui.webc.main.types.ToolbarStyling}
	 * @defaultvalue "Standard"
	 * @name sap.ui.webc.main.Toolbar.prototype.styling
	 * @public
	 */
	@property({ type: ToolbarStyling })
	styling!: string;

	/**
	 * Defines if the toolbar overflow popup should close upon intereaction with the actions inside.
	 * It will close by default.
	 * @type {boolean}
	 * @public
	 * @name sap.ui.webc.main.Toolbar.prototype.preventOverflowClosing
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	/**
	 * Indicated the direction in which the Toolbar items will be aligned.
	 * @type {sap.ui.webc.main.types.ToolbarAlign}
	 * @public
	 * @defaultvalue: "End"
	 * @name sap.ui.webc.main.Toolbar.prototype.alignContent
	 */
	@property({ type: ToolbarAlign })
	alignContent!: string;

	/**
	 * Actions, which will be displayed in the toolbar.
	 * @type {Object}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	actionsToBar!: Array<ToolbarItem>;
	/**
	 * Actions, that will be displayed inside overflow Popover.
	 * @type {Object}
	 * @private
	 */
	@property({ type: Object, multiple: true })
	actionsToOverflow!: Array<ToolbarItem>;
	/**
	 * Cached actions width and the sum of all of them.
	 * @type {Object}
	 * @private
	 */
	@property({ type: Object })
	ACTIONS_WIDTH_MAP!: ActionsWidthMap;
	/**
	 * Indicates the actions have been measured and the layout can be calculated.
	 * @type {boolean}
	 * @private
	 */
	@property({ type: Boolean })
	actionsWidthMeasured!: boolean;
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
	width!: number;

	/**
	* @private
	* Calculated width of all the Toolbar items.
	*/
	@property({ type: Integer })
	contentWidth!: number;

	/**
	 * Notifies the toolbar if it should show the items in a reverse way if Toolbar Popover needs to be placed on "Top" position.
	 * @private
	 * @type {sap.ui.webc.main.types.ToolbarAlign}
	 */
	@property({ type: Boolean })
	reverseOverflow!: boolean;

	/**
 	* Slotted Toolbar items
	* @type {sap.ui.webc.main.IToolbarItem[]}
	* @name sap.ui.webc.main.Toolbar.prototype.default
	* @slot actions
	* @public
	*/
	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	actions!: Array<ToolbarItem>

	_onResize!: ResizeObserverCallback;

	constructor() {
		super();

		// actions displayed in the bar
		this.actionsToBar = [];

		// actions displayed in the toolbar overflow popover
		this.actionsToOverflow = [];

		// store for actions width
		this.ACTIONS_WIDTH_MAP = {};

		// indicates the actions have been measured and the layout can be calculated
		this.actionsWidthMeasured = false;

		// indicates if the bar is being reized at the moment
		this.resizing = false;

		// resize handler
		this._onResize = this.onResize.bind(this);
	}

	static get OVERFLOW_BTN_SIZE(): number {
		return 44;
	}

	static get ACTION_MARGIN() {
		return 4;
	}

	static get PADDING() {
		return 16;
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
		this.storeActionsWidth();
		this.doLayout();
	}

	/**
	 * Layout management
	 */
	doLayout(forceLayout = false) {
		const containerWidth = this.getContainerWidth();
		const contentWidth: number = this.getAllActionsWidth();
		const contentOverflows = contentWidth + Toolbar.OVERFLOW_BTN_SIZE > containerWidth;

		// skip calculation if the width has not been changed
		if (!forceLayout && this.width === containerWidth) {
			return;
		}

		if (contentOverflows) {
			this.distributeActions(contentWidth - containerWidth);
		} else {
			this.displayAllActionsIntoBar();
		}

		this.width = containerWidth;

		if (this.contentWidth !== contentWidth) {
			this.contentWidth = contentWidth;
			this.fireEvent("contentWidthChange", { contentWidth });
		}
	}

	storeActionsWidth() {
		let totalWidth = 0;

		this.movableActions.forEach((action: ToolbarItem) => {
			const actionWidth = this.getActionWidth(action);
			const id: string = action._id;
			totalWidth += actionWidth;
			this.ACTIONS_WIDTH_MAP[id] = actionWidth;
		});

		this.ACTIONS_WIDTH_MAP.width = totalWidth;
		this.actionsWidthMeasured = true;
	}

	distributeActions(overflowSpace = 0) {
		overflowSpace += Toolbar.OVERFLOW_BTN_SIZE;
		overflowSpace += Toolbar.PADDING;

		this.actionsToBar = [];
		this.actionsToOverflow = [];

		// distribute actions that always overflow
		this.distributeActionsThatAlwaysOverflow();

		// distribute the rest of the actions, based on the available space
		this.movableActions.reverse().forEach(action => {
			if (overflowSpace > 0 && action.getAttribute("priority") !== "Never") {
				this.actionsToOverflow.unshift(action);
				overflowSpace -= this.getCachedActionWidth(action._id);
			} else {
				this.actionsToBar.unshift(action);
			}
		});

		// If the last bar item is a spacer, force it to the overflow even if there is enough space for it
		if (this.actionsToBar.length) {
			const lastActionToBar = this.actionsToBar[this.actionsToBar.length - 1];
			if (lastActionToBar.ignoreSpace) {
				const actionBar = this.actionsToBar.pop();
				if (actionBar) {
					this.actionsToOverflow.unshift(actionBar);
				}
			}
		}
	}

	displayAllActionsIntoBar() {
		this.actionsToOverflow = [];

		// distribute actions that always overflow
		this.distributeActionsThatAlwaysOverflow();

		// distribute actions that always overflow
		this.distributeActionsThatNeverOverflow();

		// distribute the rest of the actions into the bar
		this.actionsToBar = this.movableActions.map((action: ToolbarItem) => action);
	}

	distributeActionsThatAlwaysOverflow() {
		this.alwaysOverflowActions.forEach((action: ToolbarItem) => {
			this.actionsToOverflow.push(action);
		});
	}

	distributeActionsThatNeverOverflow() {
		this.neverOverflowActions.forEach((action: ToolbarItem) => {
			this.actionsToBar.push(action);
		});
	}

	get alwaysOverflowActions() {
		return this._actions.filter((action: ToolbarItem) => action.getAttribute("priority") === "Always");
	}

	get movableActions() {
		return this._actions.filter((action: ToolbarItem) => action.getAttribute("priority") !== "Always");
	}

	get neverOverflowActions() {
		return this._actions.filter((action: ToolbarItem) => action.getAttribute("priority") === "Never");
	}

	/**
	 * Event Handlers
	 */
	onResize() {
		if (!this.actionsWidthMeasured) {
			return;
		}

		this.resizing = true;
		this.closeOverflow();
		this.doLayout();
	}

	onBtnOverflowClick() {
		this.openOverflow();
	}

	onCustomActionClick(e: MouseEvent) {
		const target = e.target as HTMLElement;
		const item = target.closest<ToolbarItem>(".ui5-external-action-item");

		if (!item) {
			return;
		}

		const refItemId = target.getAttribute("data-ui5-ref-id");

		if (refItemId) {
			this.getActionByID(refItemId)!.fireEvent("click", {
				targetRef: e.target,
			}, true);

			if (!this.preventOverflowClosing) {
				this.closeOverflow();
			}
		}
	}

	_onoverflowopen() {
		this.fireEvent("overflow-toggle", { open: true });
	}

	_onoverflowclose() {
		this.fireEvent("overflow-toggle", { open: false });
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
	get overflowActions() {
		const overflowActions = this.getActionsInfo(this.actionsToOverflow);
		return this.reverseOverflow ? overflowActions.reverse() : overflowActions;
	}

	get standardActions() {
		if (!this.actionsWidthMeasured && (!arraysAreEqual(this._actions, this.actionsToBar))) {
			this.actionsToBar = this._actions.filter(action => action);
		}

		return this.getActionsInfo(this.actionsToBar);
	}

	get showOverflowBtn() {
		return !!this.actionsToOverflow.length;
	}

	get tabIndex(): number {
		return -1;
	}

	get _actions(): Array<ToolbarItem> {
		return this.getSlottedNodes("actions");
	}

	/**
	 * Toolbar Overflow Popover
	 */
	get overflowButtonDOM(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-tb-overflow-btn");
	}

	get actionsDOM() {
		return this.shadowRoot!.querySelector(".ui5-tb-actions");
	}

	get hasActionWithText(): boolean {
		return this.overflowActions.some((action: ToolbarItem) => action.containsText);
	}

	get hasFlexibleSpacers() {
		return this.actions.some((action: ToolbarItem) => action.localName === "ui5-toolbar-spacer" && !action.hasFlexibleWidth);
	}

	get classes() {
		return {
			actions: {
				"ui5-tb-actions": true,
				"ui5-tb-actions-full-width": this.hasFlexibleSpacers,
			},
			overflow: {
				"ui5-overflow-list--alignleft": this.hasActionWithText,
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
	getActionsInfo(actions: Array<ToolbarItem>) {
		return actions.map((action: ToolbarItem) => {
			// Item props
			const item = {
				toolbarTemplate: executeTemplate(action.toolbarTemplate, action),
				toolbarPopoverTemplate: executeTemplate(action.toolbarPopoverTemplate, action),
			};

			return item as ToolbarItem;
		});
	}

	getActionWidth(action: ToolbarItem): number {
		// Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
		if (action.ignoreSpace && !action.hasFlexibleWidth) {
			return 0;
		}
		const id: string = action._id;
		// Measure rendered width for spacers with width, and for normal actions
		const renderedAction = this.getToolbarActionByID(id);

		let actionWidth = 0;

		if (renderedAction) {
			actionWidth = renderedAction.offsetWidth + Toolbar.ACTION_MARGIN;
		} else {
			actionWidth = this.getCachedActionWidth(id) || 0;
		}

		return Math.ceil(actionWidth);
	}

	getCachedActionWidth(id: string) {
		return this.ACTIONS_WIDTH_MAP[id];
	}

	getAllActionsWidth() {
		return this.ACTIONS_WIDTH_MAP.width;
	}

	getContainerWidth() {
		return this.offsetWidth;
	}

	getActionByID(id: string) {
		return this._actions.find(action => action._id === id);
	}

	getToolbarActionByID(id: string): HTMLElement | null {
		return this.actionsDOM!.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
	}

	async getOverflowedActionByID(id: string): Promise<UI5Element | null> {
		const popover = await this.getOverflowPopover();
		return popover!.querySelector<UI5Element>(`[data-ui5-external-action-item-id="${id}"]`);
	}

	getActionDOMRefByID(id: string) {
		return this.getToolbarActionByID(id) || (this.getOverflowedActionByID(id));
	}
}

Toolbar.define();

export default Toolbar;
