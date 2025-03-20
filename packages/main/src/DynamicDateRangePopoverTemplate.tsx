import type DynamicDateRange from "./DynamicDateRange.js";
// import Button from "./Button.js";
// import Calendar from "./Calendar.js";
// import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import List from "./List.js";
import ListItemStandard from "./ListItemStandard.js";
import Button from "./Button.js";

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
			{this._hasCurrentOptionTemplate &&
				<div slot="header">
					{this._currentOption?.title}
				</div>
			}
			{!this._hasCurrentOptionTemplate ? <div class="ui5-dynamic-date-range-options">
				<List
					class="ui5-dynamic-date-range-options-list"
					separators="None"
					selectionMode="Single"
					onItemClick={this._selectOption}
					// onItemFocused={this._onItemFocus}
					// onMouseDown={this._itemMousedown}
				>
					{this._optionsTitles.map(optionTitle => {
						return <ListItemStandard selected={optionTitle === this.value?.operator}>{optionTitle}</ListItemStandard>;
					})}
				</List>
			</div>
				:
				<div class="ui5-dynamic-date-range-option-container">
					{this._currentOption?.template?.call(this)}
				</div>
			}
			{this._hasCurrentOptionTemplate &&
				<div slot="footer">
					<div slot="footer" class="ui5-ddr-footer">
						<Button
							design="Emphasized"
							onClick={this._submitValue}
						>Submit</Button>
						<Button
							design="Transparent"
							onClick={this._close}
						>Close</Button>
					</div>
				</div>
			}
		</ResponsivePopover>
	);
}
