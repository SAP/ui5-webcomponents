import type DatePicker from "./DatePicker.js";
import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import ResponsivePopover from "./ResponsivePopover.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

type TemplateHook = () => void;

export default function DatePickerPopoverTemplate(this: DatePicker, hooks?: { header?: TemplateHook, content?: TemplateHook, footer?: TemplateHook }) {
	const header = hooks?.header || defaultHeader;
	const content = hooks?.content || defaultContent;
	const footer = hooks?.footer || defaultFooter;

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
			{ this.showHeader && header.call(this) }

			{ content.call(this) }

			{ this.showFooter && footer.call(this) }
		</ResponsivePopover>
	);
}

function defaultHeader(this: DatePicker) {
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
}

function defaultContent(this: DatePicker) {
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
			{ this._calendarSelectedDates.map(date => <CalendarDate value={date}/>)}
		</Calendar>
	);
}

function defaultFooter() {}
