import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
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
class TimelineGroupItem extends UI5Element implements ITimelineItem {
	isGroupItem = true;

	/**
	 * Defines the text of the button that expands and collapses the group.
	 * @public
	 */
	@property()
	groupName: string = "";

	/**
	 * Determines if the group is collapsed or expanded.
	 * @public
	 */
	@property({ type: Boolean })
	_collapsed!: boolean;

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
	_lastItem!: boolean;

	/**
	 * Determines if the item afterwards is a group item.
	 * Intended for styling purposes.
	 * @private
	 */
	@property({ type: Boolean })
	_isNextItemGroup!: boolean;

	@property({ noAttribute: true })
	forcedTabIndex: string = "-1";

	@property()
	hidden!: boolean;

	@property({ type: Boolean })
	_firstItemInTimeline!: boolean;

	onBeforeRendering(): void {
		this.setLastItemProperty();

		this.itemsCount = this.items.length;

		if (this._lastItem) {
			this.items[this.items.length - 1]._lastItem = true;
		}

		if (this.items.length && this._firstItemInTimeline) {
			this.items[0]._firstItemInTimeline = true;
		}

		this.items.forEach((item, index) => {
			item.positionInGroup = index + 1;
		});

		if (this.items) {
			for (let i = 0; i < this.items.length; i++) {
				this.items[i].layout = this.layout;
				if (this.items[i + 1] && !!this.items[i + 1].icon) {
					this.items[i].forcedLineWidth = SHORT_LINE_WIDTH;
				} else if (this.items[i].icon && this.items[i + 1] && !this.items[i + 1].icon) {
					this.items[i].forcedLineWidth = LARGE_LINE_WIDTH;
				}
			}
		}
	}

	onGroupItemClick() {
		const groupItems = this.items;
		this._collapsed = !this._collapsed;

		if (groupItems) {
			groupItems.forEach(item => {
				item.hidden = !item.hidden;
			});
		}
	}

	_handleFocusLink(currentItem: TimelineItem, isLinkFocused: boolean, e: Event) {
		if (!isLinkFocused && currentItem.nameClickable) {
			currentItem.focusLink();
			e.stopPropagation();
		}
	}

	get _groupName() {
		return this.groupName;
	}

	setLastItemProperty() {
		const items = this.items;

		if (items && items.length > 0 && this._collapsed) {
			items[items.length - 1]._lastItem = false;
		}
	}

	get groupItemIcon() {
		if (this.layout === TimelineLayout.Vertical) {
			return this._collapsed ? "slim-arrow-left" : "slim-arrow-down";
		}

		return this._collapsed ? "slim-arrow-up" : "slim-arrow-right";
	}

	get classes() {
		return {
			collapsed: {
				"toggled": this._collapsed,
			},
		};
	}
}

TimelineGroupItem.define();

export default TimelineGroupItem;
