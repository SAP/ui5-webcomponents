import type DynamicDateRange from "./DynamicDateRange.js";
// import Button from "./Button.js";
// import Calendar from "./Calendar.js";
// import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import Button from "./Button.js";
import Title from "./Title.js";

export default function DynamicDateRangePopoverTemplate(this: DynamicDateRange) {
	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			opener={this}
			open={this.open}
			allowTargetOverlap
			placement="Bottom"
			horizontalAlign="Start"
			hideArrow={true}
			_hideHeader={true}
		>
			{this._hasCurrentOptionTemplate &&
				<div slot="header" class="ui5-ddr-header">
					<Button
						iconOnly={true}
						icon="slim-arrow-left"
						design="Transparent"
						onClick={this.onButtonBackClick}>
					</Button>
					<Title>{this._currentOption?.text}</Title>
				</div>
			}
			{!this._hasCurrentOptionTemplate ? <div class="ui5-dynamic-date-range-options">
				<List
					class="ui5-dynamic-date-range-options-list"
					separators="None"
					selectionMode="Single"
					onItemClick={this._selectOption}
				>
					{this.optionsObjects.map(option => {
						return <ListItemStandard selected={option.key === this.value?.operator} iconEnd={true} icon={option.icon}>{option.text}</ListItemStandard>;
					})}
				</List>
			</div>
				:
				<div class="ui5-dynamic-date-range-option-container">
					{this._currentOption?.template?.call(this)}
					<div class="ui5-ddr-current-value">{this.currentValueText}</div>
				</div>
			}
			{this._hasCurrentOptionTemplate &&
				<div slot="footer">
					<Button
						design="Emphasized"
						onClick={this._submitValue}
					>Submit</Button>
					<Button
						design="Transparent"
						onClick={this._close}
					>Close</Button>
				</div>
			}
		</ResponsivePopover>
	);
}
