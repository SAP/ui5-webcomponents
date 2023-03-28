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
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import Button from "./Button.js";
import Popover from "./Popover.js";

import OverflowToolbarTemplate from "./generated/templates/OverflowToolbarTemplate.lit.js";
import OverflowToolbarCss from "./generated/themes/OverflowToolbar.css.js";

import OverflowToolbarPopoverTemplate from "./generated/templates/OverflowToolbarPopoverTemplate.lit.js";
import OverflowToolbarPopoverCss from "./generated/themes/OverflowToolbarPopover.css.js";

import ToolbarDesign from "./types/ToolbarDesign.js";
import ToolbarStyling from "./types/ToolbarStyling.js";
import OverflowToolbarAlign from "./types/OverflowToolbarAlign.js";

import OverflowButton from "./OverflowButton.js";
import OverflowSpacer from "./ToolbarSpacer.js";

type ActionsWidthMap = {
	[key: string]: number
};
interface IOverflowItem extends UI5Element {
	alwaysOverflow: boolean,
	hidden: boolean,
}

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * @constructor
 * @author SAP SE
 * @alias OverflowToolbar
 * @extends UI5Element
 * @tagname ui5-overflow-toolbar
 * @public
 */
@customElement({
	tag: "ui5-overflow-toolbar",
	languageAware: true,
	renderer: litRender,
	template: OverflowToolbarTemplate,
	staticAreaTemplate: OverflowToolbarPopoverTemplate,
	styles: OverflowToolbarCss,
	staticAreaStyles: OverflowToolbarPopoverCss,
	dependencies: [
		Popover,
		Button,
		OverflowButton,
		OverflowSpacer,
	],
})

/**
 * @event
 */
@event("contentWidthChange", {
	detail: {
		contentWidth: { type: Number },
	},
})
/**
 * Fired whenever the overflow popup closes and opens.
 * @param {Boolean} open indicates the state of the popup
 * @event
 */
@event("overflow-toggle", {
	detail: {
		open: { type: Boolean },
	},
})

// @ts-ignore
class OverflowToolbar extends UI5Element {
	@property({ type: Object, multiple: true })
	actionsToBar: Array<UI5Element | any>;

	@property({ type: Object, multiple: true })
	actionsToOverflow: Array<UI5Element>;

	@property({ type: Object })
	ACTIONS_WIDTH_MAP: ActionsWidthMap;

	@property({ type: Boolean })
	actionsWidthMeasured!: boolean;

	@property({ type: Boolean })
	resizing!: boolean;
	/**
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	disabled!: boolean;
	/**
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	type!: boolean;

	/**
	 * @type {string}
	 * @public
	 * defaultValue: ToolbarDesign.Solid
	 */
	@property({ type: ToolbarDesign })
	design!: string;

	/**
	 * @type {string}
	 * @defaultvalue ToolbarStyling.Standard,
	 * @public
	 */
	@property({ type: ToolbarStyling })
	styling!: string;

	/**
	 * Defines if the overflow should close upon intereaction with the actions inside.
	 * It will close by default.
	 * @type {boolean}
	 * @public
	 */
	@property({ type: Boolean })
	preventOverflowClosing!: boolean;

	/**
	 *  @type {boolean}
	 *  @public
	 *  @defaultvalue: OverflowToolbarAlign.End
	 */
	@property({ type: OverflowToolbarAlign })
	alignContent!: string;

	/**
	* @private
	*/
	@property({ type: Boolean })
	nonFocusable!: boolean;

	/**
	* @private
	*/
	@property({ type: Boolean })
	noPadding!: boolean;

	/**
	* @private
	*/
	@property({ type: Integer })
	width!: number;

	/**
	* @private
	*/
	@property({ type: Integer })
	contentWidth!: number;

	/**
	 * @private
	 */
	@property({ type: String })
	alwaysOverflowActionsHash!: string;

	/**
	 * @private
	 */
	@property({ type: Boolean })
	reverseOverflow!: boolean;

	/**
	* @type {HTMLElement[]}
	* @slot
	* @public
	*/

	@slot({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	actions!: Array<UI5Element>
	@slot({ type: HTMLElement })
	startContent!: Array<HTMLElement>;

	_onResize!: ResizeObserverCallback;

	constructor() {
		super();

		// actions displayed in the bar
		this.actionsToBar = [];

		// actions displayed in the overflow popover
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

	static get render() {
		return litRender;
	}

	static get styles() {
		return OverflowToolbarCss;
	}

	static get template() {
		return OverflowToolbarTemplate;
	}

	static get staticAreaTemplate() {
		return OverflowToolbarPopoverTemplate;
	}

	static get staticAreaStyles() {
		return OverflowToolbarPopoverCss;
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
		this.doLayout(true);
	}

	/**
	 * Layout management
	 */
	doLayout(forceLayout = false) {
		const containerWidth = this.getContainerWidth();
		const contentWidth: number = this.getAllActionsWidth();
		const contentOverflows = contentWidth + OverflowToolbar.OVERFLOW_BTN_SIZE > containerWidth;

		// skip calculation if the width has not been changed
		if (!forceLayout && this.width === containerWidth) {
			return;
		}

		if (contentOverflows) {
			this.distributeActions(contentWidth - containerWidth);
		} else {
			this.displayAllActionsIntoBar();
		}

		this.width = containerWidth; // invalidating
		this.alwaysOverflowActionsHash = this.alwaysOverflowActions.reduce((acc, item: UI5Element) => `${acc}${item._id}`, "");// invalidating

		if (this.contentWidth !== contentWidth) {
			this.contentWidth = contentWidth; // invalidating
			this.fireEvent("contentWidthChange", { contentWidth });
		}
	}

	storeActionsWidth() {
		let totalWidth = 0;

		this.movableActions.forEach((action: any) => {
			const actionWidth = this.getActionWidth(action);
			const id: string = action._id;
			totalWidth += actionWidth;
			this.ACTIONS_WIDTH_MAP[id] = actionWidth;
		});

		this.ACTIONS_WIDTH_MAP.width = totalWidth;
		this.actionsWidthMeasured = true;
	}

	distributeActions(overflowSpace = 0) {
		overflowSpace += OverflowToolbar.OVERFLOW_BTN_SIZE;
		overflowSpace += OverflowToolbar.PADDING;

		this.actionsToBar = [];
		this.actionsToOverflow = [];

		// distribute actionsthat always overflow
		this.distributeActionsThatAlwaysOverflow();

		// distribute the rest of the actions, based on the available space
		this.movableActions.reverse().forEach((action: UI5Element) => {
			if (overflowSpace > 0) {
				this.actionsToOverflow.unshift(action);
				overflowSpace -= this.getCachedActionWidth(action._id);
			} else {
				this.actionsToBar.unshift(action);
			}
		});

		// If the last bar item is a spacer, force it to the overflow even if there is enough space for it
		if (this.actionsToBar.length) {
			const lastActionToBar = this.actionsToBar[this.actionsToBar.length - 1];
			if (lastActionToBar.isSpacer) {
				const actionBar: UI5Element = this.actionsToBar.pop();
				this.actionsToOverflow.unshift(actionBar);
			}
		}
	}

	displayAllActionsIntoBar() {
		this.actionsToOverflow = [];

		// distribute actionsthat always overflow
		this.distributeActionsThatAlwaysOverflow();

		// distribute the rest of the actions into the bar
		this.actionsToBar = this.movableActions.map((action: UI5Element) => action);
	}

	distributeActionsThatAlwaysOverflow() {
		this.alwaysOverflowActions.forEach((action: UI5Element) => {
			this.actionsToOverflow.push(action);
		});
	}

	get alwaysOverflowActions() {
		return this._actions.filter((action: UI5Element) => action.hasAttribute("always-overflow"));
	}

	get movableActions() {
		return this._actions.filter((action: UI5Element) => !action.hasAttribute("always-overflow"));
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

	onCustomActionClick(e: any) {
		const refItemId: string = e.target.closest("ui5-button").getAttribute("data-ui5-external-action-item-id");

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
	 * @return {Boolean}
	 */
	async isOverflowOpen(): Promise<boolean> {
		const overflowPopover = await this.getOverflowPopover();
		return overflowPopover!.isOpen();
	}

	/**
	 * Read-only members
	 */
	get overflowActions(): Array<any> {
		const overflowActions = this.getActionsInfo(this.actionsToOverflow);
		return this.reverseOverflow ? overflowActions.reverse() : overflowActions;
	}

	get standardActions(): Array<any> {
		// if (!this.actionsWidthMeasured) {
		// 	this.actionsToBar = this._actions.filter(action => action);
		// }

		return this.getActionsInfo(this.actionsToBar);
	}

	get showOverflowBtn() {
		return !!this.actionsToOverflow.length;
	}

	get tabIndex(): number {
		return this.nonFocusable || this.disabled ? -1 : 0;
	}

	get _actions(): Array<UI5Element> {
		return this.getSlottedNodes("actions");
	}

	get _disabled() {
		return this.disabled ? "true" : undefined;
	}

	get hasStartContent() {
		return !!this.startContent.length;
	}

	/**
	 * Overflow Popover
	 */
	get overflowButtonDOM(): HTMLElement | null {
		return this.shadowRoot!.querySelector(".ui5-otb-overflow-btn");
	}

	get startContentDOM(): HTMLElement {
		return this.shadowRoot!.querySelector(".ui5-otb-start")!;
	}

	get actionsDOM() {
		return this.shadowRoot!.querySelector(".ui5-otb-actions");
	}

	get hasActionWithText(): boolean {
		return this.overflowActions.some((action: any) => !!action.text);
	}

	get hasFlexibleSpacers() {
		return this.actions.some((action: any) => action.isSpacer && !action.width);
	}

	get classes() {
		return {
			actions: {
				"ui5-otb-actions": true,
				"ui5-otb-actions-full-width": this.hasFlexibleSpacers,
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
	getActionsInfo(actions: Array<any>) {
		return actions.map((action: any) => {
			const isSpacer: boolean = action.isSpacer;
			const refItemid = action._id;
			const width: number = action.width;
			const display = action.hidden ? "none" : "block";
			let style = {};

			if (isSpacer) {
				style = width ? { width } : { flex: "auto" };
			} else {
				style = {
					display,
					width,
				};
			}

			// Item props
			const item = {
				isSpacer,
				refItemid,
				style,
				press: this.onCustomActionClick.bind(this),
				overflowTemplate: {},
				overflowPopoverTemplate: {},
				alwaysOverflow: action.alwaysOverflow || action.getAttribute("always-overflow"),
			};
			item.overflowTemplate = action.overflowToolbarTemplate({ ...JSON.parse(JSON.stringify(action)), ...item } as unknown as UI5Element, [], undefined);
			item.overflowPopoverTemplate = action.overflowPopoverTemplate({ ...JSON.parse(JSON.stringify(action)), ...item } as unknown as UI5Element, [], undefined);

			return item;
		});
	}

	getActionWidth(action: any): number {
		// Spacer width - always 0 for flexible spacers, so that they shrink, otherwise - measure the width normally
		if (action.isSpacer && !action.width) {
			return 0;
		}
		const id: string = action._id;
		// Measure rendered width for spacers with width, and for normal actions
		const renderedAction = this.getToolbarActionByID(id);

		let actionWidth = 0;

		if (renderedAction) {
			actionWidth = renderedAction.offsetWidth + OverflowToolbar.ACTION_MARGIN;
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
		if (!this.startContentDOM) {
			return this.offsetWidth;
		}

		return this.offsetWidth - this.startContentDOM.offsetWidth;
	}

	getActionByID(id: string) {
		return this._actions.find(action => action._id === id);
	}

	getToolbarActionByID(id: string): HTMLElement | null {
		return this.actionsDOM!.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
	}

	async getOverflowedActionByID(id: string): Promise<Element | null> {
		const popover = await this.getOverflowPopover();
		return popover!.querySelector(`[data-ui5-external-action-item-id="${id}"]`);
	}

	async getActionDOMRefByID(id: string) {
		return this.getToolbarActionByID(id) || (await this.getOverflowedActionByID(id)); // eslint-disable-line
	}
}

OverflowToolbar.define();

export default OverflowToolbar;

export type {
	IOverflowItem,
};
