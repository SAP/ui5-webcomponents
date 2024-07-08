import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import TimelineLayout from "./types/TimelineLayout.js";
import TimelineItem from "./TimelineItem.js";
import type { ITimelineItem } from "./Timeline.js";

import TimelineGroupItemTemplate from "./generated/templates/TimelineGroupItemTemplate.lit.js";

// Styles
import TimelineGroupItemCss from "./generated/themes/TimelineGroupItem.css.js";

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 *
 * <h3>Usage</h3>
 *
 * For the <code>timeline-group-item</code>
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/TimelineGroupItem.js";</code>
 *
 * @constructor
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-timeline-group-item",
	renderer: litRender,
	styles: TimelineGroupItemCss,
	template: TimelineGroupItemTemplate,
	dependencies: [Button, TimelineItem, ToggleButton],
})
class TimelineGroupItem extends UI5Element implements ITimelineItem {
	_lastItemInGroup!: boolean;
	isGroupItem = true;

	/**
	 * Defines the items orientation.
	 * @default "Vertical"
	 * @private
	 */
	@property()
	layout: `${TimelineLayout}` = TimelineLayout.Vertical;

	@property({ type: Number })
	itemsCount: number = 0;

	@property({ type: Boolean })
	_collapsed!: boolean;

	@property({ type: Boolean })
	_lastItem!: boolean;

	@property({ type: Boolean })
	_isNextItemGroup!: boolean;

	@property({ noAttribute: true })
	forcedTabIndex: string = "-1";

	/**
	 * Determines the content of the `ui5-timeline`.
	 * @public
	 */
	@slot({ type: HTMLElement, individualSlots: true, "default": true })
	items!: Array<ITimelineItem>;

	@property()
	hidden!: boolean;

	@property()
	groupName: string = "";

	@property({ type: Boolean })
	_firstItemInTimeline!: boolean;

	onBeforeRendering(): void {
		this.setLastItemProperty();

		this.itemsCount = this.items.length;

		// apply _index property to every item in a row: 1 to the first, 2 to the second, etc.
		// this.items.forEach((item: TimelineItem, index: number) => {
		// 	item.positionInGroup = index + 1;
		// });

		// for the last item in the timeline if it is group, so styles dont draw a line.
		if (this._lastItem) {
			this.items[this.items.length - 1]._lastItem = true;
		}

		if (this._firstItemInTimeline) {
			this.items[0]._firstItemInTimeline = true;
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
		// get slotted items and apply this._lastItem true to the last one

		const items = this.items;
		// if (items && items.length > 0) {
		// 	items[items.length - 1]._lastItemInGroup = true;
		// }

		// if collapsed, remove the _lastItem property from the last item
		if (this._collapsed) {
			items[items.length - 1]._lastItem = false;
		}
	}

	get grpItemIcon() {
		if (this.layout === TimelineLayout.Vertical) {
			return this._collapsed ? "slim-arrow-left" : "slim-arrow-down";
		}

		return this._collapsed ? "slim-arrow-up" : "slim-arrow-right";
	}

	// get _navigatableItems() {
	// 	// return this.items and the button in the group
	// 	const items = this.items;
	// 	const button = this.shadowRoot!.querySelector<Button>("ui5-button")!;

	// 	return [button, ...items];
	// }

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
