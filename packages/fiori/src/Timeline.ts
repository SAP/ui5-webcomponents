import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import i18n from "@ui5/webcomponents-base/dist/decorators/i18n.js";
import jsxRenderer from "@ui5/webcomponents-base/dist/renderer/JsxRenderer.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import {
	isTabNext,
	isTabPrevious,
	isSpace,
	isEnter,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { TIMELINE_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";
import TimelineTemplate from "./TimelineTemplate.js";
import TimelineItem from "./TimelineItem.js";
import TimelineGroupItem from "./TimelineGroupItem.js";
import event from "@ui5/webcomponents-base/dist/decorators/event-strict.js";
import type { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import debounce from "@ui5/webcomponents-base/dist/util/debounce.js";
import query from "@ui5/webcomponents-base/dist/decorators/query.js";
import process from "@ui5/webcomponents-icons/dist/process.js";
import drillDown from "@ui5/webcomponents-icons/dist/drill-down.js";
// Styles
import TimelineCss from "./generated/themes/Timeline.css.js";
import TimelineLayout from "./types/TimelineLayout.js";
// Mode
import TimeLineGrowingMode from "./types/TimelineGrowingMode.js";
import type Button from "@ui5/webcomponents/dist/Button.js";

/**
 * Interface for components that may be slotted inside `ui5-timeline` as items
 * @public
 */
interface ITimelineItem extends UI5Element, ITabbable {
	layout: `${TimelineLayout}`;
	isGroupItem: boolean;
	forcedLineWidth?: string;
	icon?: string;
	nameClickable?: boolean;
	positionInGroup?: number;
	collapsed?: boolean;
	items?: Array<ITimelineItem>;
	focusLink?(): void;
	lastItem: boolean;
	isNextItemGroup?: boolean;
	firstItemInTimeline?: boolean;
}

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";
const GROWING_WITH_SCROLL_DEBOUNCE_RATE = 250; // ms

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-timeline` component shows entries (such as objects, events, or posts) in chronological order.
 * A common use case is to provide information about changes to an object, or events related to an object.
 * These entries can be generated by the system (for example, value XY changed from A to B), or added manually.
 * There are two distinct variants of the timeline: basic and social. The basic timeline is read-only,
 * while the social timeline offers a high level of interaction and collaboration, and is integrated within SAP Jam.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 0.8.0
 */
@customElement({
	tag: "ui5-timeline",
	languageAware: true,
	renderer: jsxRenderer,
	styles: TimelineCss,
	template: TimelineTemplate,
})

/**
 * Fired when the user presses the `More` button or scrolls to the Timeline's end.
 *
 * **Note:** The event will be fired if `growing` is set to `Button` or `Scroll`.
 * @public
 * @since 2.7.0
 */
@event("load-more", {
	bubbles: true,
})

class Timeline extends UI5Element {
	eventDetails!: {
		"load-more": void,
	}
	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @since 1.0.0-rc.15
	 * @public
	 */
	@property()
	layout: `${TimelineLayout}` = "Vertical";

	/**
	 * Defines the accessible ARIA name of the component.
	 * @default undefined
	 * @public
	 * @since 1.2.0
	 */
	@property()
	accessibleName?: string;

	/**
	 * Defines if the component should display a loading indicator over the Timeline.
	 *
	 * @default false
	 * @since 2.7.0
	 * @public
	 */
	@property({ type: Boolean })
	loading = false;

	/**
	 * Defines the delay in milliseconds, after which the loading indicator will show up for this component.
	 * @default 1000
	 * @public
	 */
	@property({ type: Number })
	loadingDelay = 1000;

	/**
	 * Defines whether the Timeline will have growing capability either by pressing a `More` button,
	 * or via user scroll. In both cases `load-more` event is fired.
	 *
	 * Available options:
	 *
	 * `Button` - Shows a button at the end of the Timeline, pressing which triggers the load-more event.
	 *
	 * `Scroll` - The `load-more` event is triggered when the user scrolls to the bottom of the Timeline;
	 *
	 * `None` (default) - The growing is off.
	 *
	 * **Restrictions:** `growing="Scroll"` is not supported for Internet Explorer,
	 * and the component will fallback to `growing="Button"`.
	 * @default "None"
	 * @since 2.7.0
	 * @public
	 */
	@property()
	growing: `${TimeLineGrowingMode}` = "None";

	/**
	 * Defines the active state of the `More` button.
	 * @private
	 */
	@property({ type: Boolean })
	_loadMoreActive = false;

	/**
	 * Determines the content of the `ui5-timeline`.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<ITimelineItem>;

	@query(".ui5-timeline-end-marker")
	timelineEndMarker!: HTMLElement;

	@i18n("@ui5/webcomponents-fiori")
	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;
	growingIntersectionObserver?: IntersectionObserver | null;
	timeLineEndObserved = false;
	initialIntersection = true;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this._navigatableItems,
		});
	}

	get ariaLabel() {
		return this.accessibleName
			? `${Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL)} ${this.accessibleName}`
			: Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL);
	}

	get showBusyIndicatorOverlay() {
		return !this.growsWithButton && this.loading;
	}

	get growsOnScroll(): boolean {
		return this.growing === TimeLineGrowingMode.Scroll;
	}

	get growingButtonIcon() {
		return this.layout === TimelineLayout.Horizontal ? process : drillDown;
	}

	get growsWithButton(): boolean {
		return this.growing === TimeLineGrowingMode.Button;
	}

	onAfterRendering() {
		if (this.growsOnScroll) {
			this.observeTimeLineEnd();
		} else if (this.timeLineEndObserved){
			this.unobserveTimelineEnd();
		}

		this.growingIntersectionObserver = this.getIntersectionObserver();
	}

	onExitDOM() {
		this.unobserveTimelineEnd();
	}

	observeTimeLineEnd() {
		if (!this.timeLineEndObserved) {
			this.getIntersectionObserver().observe(this.timelineEndMarker);
			this.timeLineEndObserved = true;
		}
	}

	async observeTimelineEnd() {
		if (!this.timeLineEndObserved) {
			//await renderFinished();
			this.getIntersectionObserver().observe(this.timelineEndDOM!);
			this.timeLineEndObserved = true;
		}
	}

	unobserveTimelineEnd() {
		if (this.growingIntersectionObserver) {
			this.growingIntersectionObserver.disconnect();
			this.growingIntersectionObserver = null;
			this.timeLineEndObserved = false;
		}
	}

	get timelineEndDOM() {
		return this.shadowRoot!.querySelector(".ui5-timeline-end-marker");
	}

	getIntersectionObserver(): IntersectionObserver {
		if (!this.growingIntersectionObserver) {
			this.growingIntersectionObserver = new IntersectionObserver(this.onIntersection.bind(this), {
				root: null,
				threshold: 1.0,
			});
		}

		return this.growingIntersectionObserver;
	}

	onIntersection(entries: Array<IntersectionObserverEntry>) {
		if (this.initialIntersection) {
			this.initialIntersection = false;
			return;
		}

		if (entries.some(entry => entry.isIntersecting)) {
			debounce(this.loadMore.bind(this), GROWING_WITH_SCROLL_DEBOUNCE_RATE);
		}
	}

	loadMore() {
		this.fireDecoratorEvent("load-more");
	}

	_onLoadMoreKeydown(e: KeyboardEvent) {
		if (isSpace(e)) {
			e.preventDefault();
			this._loadMoreActive = true;
		}

		if (isEnter(e)) {
			this._onLoadMoreClick();
			this._loadMoreActive = true;
		}
	}

	_onLoadMoreKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onLoadMoreClick();
		}
		this._loadMoreActive = false;
	}

	_onLoadMoreClick() {
		this.fireDecoratorEvent("load-more");
	}

	_onfocusin(e: FocusEvent) {
		let target = e.target as ITimelineItem | ToggleButton;

		if ((target as ITimelineItem).isGroupItem) {
			target = target.shadowRoot!.querySelector<ToggleButton>("[ui5-toggle-button]")!;
		}

		this._itemNavigation.setCurrentItem(target);
	}

	onBeforeRendering() {
		this._itemNavigation._navigationMode = this.layout === TimelineLayout.Horizontal ? NavigationMode.Horizontal : NavigationMode.Vertical;

		if (!this.items.length) {
			return;
		}

		for (let i = 0; i < this.items.length; i++) {
			this.items[i].layout = this.layout;
			if (this.items[i + 1] && !!this.items[i + 1].icon) {
				this.items[i].forcedLineWidth = SHORT_LINE_WIDTH;
			} else if (this.items[i].icon && this.items[i + 1] && !this.items[i + 1].icon) {
				this.items[i].forcedLineWidth = LARGE_LINE_WIDTH;
			}
		}

		this._setLastItem();
		this._setIsNextItemGroup();
		this.items[0].firstItemInTimeline = true;
	}

	_setLastItem() {
		const items = this.items;

		for (let i = 0; i < items.length; i++) {
			items[i].lastItem = false;
		}

		if (items.length > 0) {
			items[items.length - 1].lastItem = true;
		}
	}

	_setIsNextItemGroup() {
		for (let i = 0; i < this.items.length; i++) {
			this.items[i].isNextItemGroup = false;
		}

		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i + 1] && this.items[i + 1].isGroupItem) {
				this.items[i].isNextItemGroup = true;
			}
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as ITimelineItem;

		if (target.nameClickable && !target.getFocusDomRef()!.matches(":has(:focus-within)")) {
			return;
		}

		if (isTabNext(e)) {
			this._handleNextOrPreviousItem(e, true);
		} else if (isTabPrevious(e)) {
			this._handleNextOrPreviousItem(e);
		}
	}

	_handleNextOrPreviousItem(e: KeyboardEvent, isNext?: boolean) {
		const target = e.target as ITimelineItem | ToggleButton;
		let updatedTarget = target;

		if ((target as ITimelineItem).isGroupItem) {
			updatedTarget = target.shadowRoot!.querySelector<ToggleButton>("[ui5-toggle-button]")!;
		}

		const nextTargetIndex = isNext ? this._navigatableItems.indexOf(updatedTarget) + 1 : this._navigatableItems.indexOf(updatedTarget) - 1;
		const nextTarget = this._navigatableItems[nextTargetIndex];

		if (!nextTarget) {
			return;
		}

		if (nextTarget) {
			e.preventDefault();
			nextTarget.focus();
			this._itemNavigation.setCurrentItem(nextTarget);
		}
	}

	get _navigatableItems() {
		const navigatableItems: Array<ITimelineItem | ToggleButton> = [];

		if (!this.items.length) {
			return [];
		}

		this.items.forEach(item => {
			if (!item.isGroupItem) {
				navigatableItems.push(item);

				return;
			}

			const navigatableItem = item.shadowRoot!.querySelector<ToggleButton>("[ui5-toggle-button]");

			if (navigatableItem) {
				navigatableItems.push(navigatableItem);
			}

			if (!item.collapsed) {
				item.items?.forEach(groupItem => {
					navigatableItems.push(groupItem);
				});
			}
		});

		return navigatableItems;
	}
}

Timeline.define();

export default Timeline;
export type {
	ITimelineItem,
};
