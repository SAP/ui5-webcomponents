import type TimelineGroupItem from "./TimelineGroupItem.js";
import TimelineLayout from "./types/TimelineLayout.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";
import slimArrowleft from "@ui5/webcomponents-icons/dist/slim-arrow-left.js";
import slimArrowRight from "@ui5/webcomponents-icons/dist/slim-arrow-right.js";
import slimArrowDown from "@ui5/webcomponents-icons/dist/slim-arrow-down.js";
import slimArrowup from "@ui5/webcomponents-icons/dist/slim-arrow-up.js";

export default function TimelineGroupItemTemplate(this: TimelineGroupItem) {
	return (
		<div class="ui5-tlgi-root">
			<div class="ui5-tlgi-btn-root">
				<div class="ui5-tlgi-icon-placeholder">
					<div class="ui5-tlgi-icon-dot"></div>
				</div>

				<div class="ui5-tlgi-line-placeholder">
					<div class="ui5-tlgi-line"></div>
				</div>

				<ToggleButton
					class="ui5-tlgi-btn"
					icon={getEffectiveGroupIcon.call(this, this.layout, this.collapsed)}
					pressed={this.collapsed}
					onClick={this.onGroupItemClick}
				>
					{this.groupName}
				</ToggleButton>
			</div>
			<ul class="ui5-tl-group-item">
				{this.items.map(item =>
					<li class="ui5-timeline-group-list-item">
						<slot name={item._individualSlot}></slot>
					</li>
				)}
			</ul>
		</div>
	);
}

function getEffectiveGroupIcon(layout: `${TimelineLayout}`, collapsed: boolean): string {
	if (layout === TimelineLayout.Vertical) {
		return collapsed ? slimArrowleft : slimArrowDown;
	}

	return collapsed ? slimArrowup : slimArrowRight;
}
