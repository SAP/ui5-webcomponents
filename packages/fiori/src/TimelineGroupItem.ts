import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import TimelineLayout from "./types/TimelineLayout.js";
import TimelineItem from "./TimelineItem.js";
import type { ITimelineItem } from "./Timeline.js";

import TimelineGroupItemTemplate from "./generated/templates/TimelineGroupItemTemplate.lit.js";

// Styles
import TimelineGroupItemCss from "./generated/themes/TimelineGroupItem.css.js";

const SHORT_LINE_WIDTH = "ShortLineWidth";
const LARGE_LINE_WIDTH = "LargeLineWidth";

type TimelineGroupItemToggleCollapseEventDetail = {
	collapsed: boolean;
};

/**
 * @class
 *
 * ### Overview
 *
 * An entry posted on the timeline.
 * It is intented to represent a group of `<ui5-timeline-item>`s.
 *
 * **Note**: Please do not use empty groups in order to preserve the intended design.
 *
 * @constructor
 * @extends UI5Element
 * @public
 * @since 2.1.0
 */
@customElement({
	tag: "ui5-timeline-group-item",
	renderer: litRender,
	styles: TimelineGroupItemCss,
	template: TimelineGroupItemTemplate,
	dependencies: [TimelineItem, ToggleButton],
})
/**
 * Fired when the group item is expanded or collapsed.
 * @public
 * @param {boolean} collapsed Indicator whether the group item is collapsed or expanded.
 */
@event<TimelineGroupItemToggleCollapseEventDetail>("toggle-collapse", {
	detail: {
		collapsed: { type: Boolean },
	},
})
class TimelineGroupItem extends UI5Element implements ITimelineItem {
	/**
	 * Defines the text of the button that expands and collapses the group.
	 * @public
	 */
	@property()
	groupName = "";

	/**
	 * Determines if the group is collapsed or expanded.
	 * @public
	 */
	@property({ type: Boolean })
	set collapsed(value: boolean) {
		const oldValue = this._collapsed;
		this._collapsed = value;

		if (oldValue !== value) {
			this.fireEvent("toggle-collapse", { collapsed: value });
		}
	}

	/**
	 * Determines the content of the `ui5-timeline-group-item`.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<ITimelineItem>;

	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @private
	 */
	@property()
	layout: `${TimelineLayout}` = "Vertical";

	/**
	 * Shows the number of items in the group.
	 * @private
	 */
	@property({ type: Number })
	itemsCount: number = 0;

	/**
	 * Applies to the last item in the group.
	 * @private
	 */
	@property({ type: Boolean })
	_lastItem = false;

	/**
	 * Determines if the item afterwards is a group item.
	 * Intended for styling purposes.
	 * @private
	 */
	@property({ type: Boolean })
	_isNextItemGroup = false;

	@property({ type: Boolean })
	hidden = false;

	@property({ type: Boolean })
	_firstItemInTimeline = false;

	@property({ noAttribute: true })
	forcedTabIndex = "-1";

	isGroupItem = true;
	_collapsed = false;

	onBeforeRendering() {
		if (!this.items.length) {
			return;
		}

		this.itemsCount = this.items.length;
		this._setGroupItemProps();
	}

	_setGroupItemProps() {
		const items = this.items;
		const itemsLength = items.length;

		if (itemsLength && this._firstItemInTimeline) {
			items[0]._firstItemInTimeline = true;
		}

		if (this.collapsed) {
			items[itemsLength - 1]._lastItem = false;
		} else if (this._lastItem) {
			items[itemsLength - 1]._lastItem = true;
		}

		for (let i = 0; i < itemsLength; i++) {
			const item = items[i];
			item.positionInGroup = i + 1;
			item.hidden = !!this.collapsed;
			item.layout = this.layout;

			if (items[i + 1] && !!items[i + 1].icon) {
				item.forcedLineWidth = SHORT_LINE_WIDTH;
			} else if (item.icon && items[i + 1] && !items[i + 1].icon) {
				item.forcedLineWidth = LARGE_LINE_WIDTH;
			}
		}
	}

	onGroupItemClick() {
		this.collapsed = !this.collapsed;
	}

	get _groupName() {
		return this.groupName;
	}

	get groupItemIcon() {
		if (this.layout === TimelineLayout.Vertical) {
			return this.collapsed ? "slim-arrow-left" : "slim-arrow-down";
		}

		return this.collapsed ? "slim-arrow-up" : "slim-arrow-right";
	}

	get collapsed() {
		return this._collapsed;
	}
}

TimelineGroupItem.define();

export default TimelineGroupItem;
