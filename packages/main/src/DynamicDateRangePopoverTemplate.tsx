import type DynamicDateRange from "./DynamicDateRange.js";
// import Button from "./Button.js";
// import Calendar from "./Calendar.js";
// import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";

export default function DynamicDateRangePopoverTemplate(this: DynamicDateRange) {
	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			opener={this}
			open={this.open}
			allowTargetOverlap
			placement="Bottom"
			horizontalAlign="Start"
			// accessibleName={this.pickerAccessibleName}
			hideArrow={true}
			_hideHeader={true}
			// onKeyDown={this._onkeydown}
			// onClose={this.onResponsivePopoverAfterClose}
			// onOpen={this.onResponsivePopoverAfterOpen}
			// onBeforeOpen={this.onResponsivePopoverBeforeOpen}
		>
			<List
				class="ui5-dynamic-date-range-options-list"
				separators="None"
				selectionMode="Single"
				// onItemClick={this._selectItem}
				// onItemFocused={this._onItemFocus}
				// onMouseDown={this._itemMousedown}
			>
				{this._optionsTitles.map(optionTitle => {
					return <ListItemStandard>{optionTitle}</ListItemStandard>;
				})}
			</List>
		</ResponsivePopover>
	);
}
