import type DatePicker from "./DatePicker.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

type TemplateHook = () => void;

export default function (this: DatePicker, hooks?: { header?: TemplateHook, content?: TemplateHook, footer?: TemplateHook }) {
	return (
		<ResponsivePopover
			id={`${this._id}-responsive-popover`}
			opener={this}
			open={this.open}
			allowTargetOverlap
			placement="Bottom"
			horizontalAlign="Start"
			accessibleName={this.pickerAccessibleName}
			hideArrow={true}
			_hideHeader={this._shouldHideHeader}
			onKeyDown={this._onkeydown}
			onClose={this.onResponsivePopoverAfterClose}
			onOpen={this.onResponsivePopoverAfterOpen}
			onBeforeOpen={this.onResponsivePopoverBeforeOpen}
		>
			{ this.showHeader && (hooks?.header || _header).call(this) }

			{ (hooks?.content || _content).call(this)}

			{ this.showFooter && (hooks?.footer || _footer).call(this) }
		</ResponsivePopover>
	);
};

function _header(this: DatePicker) {
	return (
		<div slot="header" class="ui5-responsive-popover-header">
			<div class="row">
				<span>{this._headerTitleText}</span>
				<Button
					class="ui5-responsive-popover-close-btn"
					icon={decline}
					design="Transparent"
					onClick={this._togglePicker}
				>
				</Button>
			</div>
		</div>
	);
};

function _content(this: DatePicker) {
	return (
		<Calendar
			id={`${this._id}-calendar`}
			primaryCalendarType={this._primaryCalendarType}
			secondaryCalendarType={this.secondaryCalendarType}
			formatPattern={this._formatPattern}
			selectionMode={this._calendarSelectionMode}
			minDate={this.minDate}
			maxDate={this.maxDate}
			calendarWeekNumbering={this.calendarWeekNumbering}
			onSelectionChange={this.onSelectedDatesChange}
			onShowMonthView={this.onHeaderShowMonthPress}
			onShowYearView={this.onHeaderShowYearPress}
			hideWeekNumbers={this.hideWeekNumbers}
			_currentPicker={this._calendarCurrentPicker}
			_pickersMode={this._calendarPickersMode}
		>
			{ this._calendarSelectedDates.map(date => <CalendarDate value={date}></CalendarDate> )}
		</Calendar>
	);
};
		
function _footer() {}


