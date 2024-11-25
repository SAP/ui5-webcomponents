import type TimelineGroupItem from "./TimelineGroupItem.js";
import ToggleButton from "@ui5/webcomponents/dist/ToggleButton.js";

export default function (this: TimelineGroupItem) {
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
					icon={this._groupItemIcon}
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
};
