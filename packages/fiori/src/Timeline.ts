import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import {
	isTabNext,
	isTabPrevious,
} from "@ui5/webcomponents-base/dist/Keys.js";
import type { ITabbable } from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import type ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import ItemNavigation from "@ui5/webcomponents-base/dist/delegate/ItemNavigation.js";
import NavigationMode from "@ui5/webcomponents-base/dist/types/NavigationMode.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { TIMELINE_ARIA_LABEL } from "./generated/i18n/i18n-defaults.js";
import TimelineTemplate from "./generated/templates/TimelineTemplate.lit.js";
import TimelineItem from "./TimelineItem.js";
import TimelineGroupItem from "./TimelineGroupItem.js";

// Styles
import TimelineCss from "./generated/themes/Timeline.css.js";
import TimelineLayout from "./types/TimelineLayout.js";

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
	_lastItem: boolean;
	_isNextItemGroup?: boolean;
	_firstItemInTimeline?: boolean;
}

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";

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
	renderer: litRender,
	styles: TimelineCss,
	template: TimelineTemplate,
	dependencies: [TimelineItem, TimelineGroupItem],
})
class Timeline extends UI5Element {
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
	 * Determines the content of the `ui5-timeline`.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<ITimelineItem>;

	static i18nBundle: I18nBundle;

	_itemNavigation: ItemNavigation;

	constructor() {
		super();

		this._itemNavigation = new ItemNavigation(this, {
			getItemsCallback: () => this._navigatableItems,
		});
	}

	static async onDefine() {
		Timeline.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	get ariaLabel() {
		return this.accessibleName
			? `${Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL)} ${this.accessibleName}`
			: Timeline.i18nBundle.getText(TIMELINE_ARIA_LABEL);
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
		this.items[0]._firstItemInTimeline = true;
	}

	_setLastItem() {
		const items = this.items;
		if (items && items.length > 0) {
			items[items.length - 1]._lastItem = true;
		}
	}

	_setIsNextItemGroup() {
		for (let i = 0; i < this.items.length; i++) {
			if (this.items[i + 1] && this.items[i + 1].isGroupItem) {
				this.items[i]._isNextItemGroup = true;
			}
		}
	}

	_onkeydown(e: KeyboardEvent) {
		const target = e.target as ITimelineItem;

		if (target.nameClickable && getEventMark(e) !== "link") {
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
			} else {
				navigatableItems.push(item.shadowRoot!.querySelector<ToggleButton>("[ui5-toggle-button]")!);
			}

			if (item.isGroupItem && !item.collapsed) {
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
