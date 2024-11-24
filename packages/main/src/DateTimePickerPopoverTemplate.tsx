import DatePickerPopoverTemplate from "./DatePickerPopoverTemplate.js"

import Button from "./Button.js";
import Calendar from "./Calendar.js";
import CalendarDate from "./CalendarDate.js";
import SegmentedButton from "./SegmentedButton.js";
import type DateTimePicker from "./DateTimePicker.js"
import SegmentedButtonItem from "./SegmentedButtonItem.js";
import TimeSelectionClocks from "./TimeSelectionClocks.js";

export default function (this: DateTimePicker) {
	return (
		<>
			{ DatePickerPopoverTemplate.call(this, { header, content, footer }) };
		</>
	);
};

function header(this: DateTimePicker) {
	return (
		<>
			{ this.phone && 
				<div class="ui5-dt-picker-header">
					<SegmentedButton class="ui5-dt-picker-toggle-button" onSelectionChange={this._dateTimeSwitchChange}>
						{/* TODO: discuss as previously we used toggle button here: */}
						<SegmentedButtonItem data-ui5-key="Date" selected={this.showDateView}>{this.btnDateLabel}</SegmentedButtonItem>
						<SegmentedButtonItem data-ui5-key="Time" selected={this.showTimeView}>{this.btnTimeLabel}</SegmentedButtonItem>
					</SegmentedButton>
				</div>
			}
		</>
	);
};

function content(this: DateTimePicker) {
	return (
		<div class="ui5-dt-picker-content {{classes.picker}}">
			<Calendar
				class="ui5-dt-cal {{classes.dateTimeView}}"
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
			>
				{this._calendarSelectedDates.map(date =>
					<CalendarDate value={date}></CalendarDate>
				)}
			</Calendar>

			{ !this.phone && <span class="ui5-dt-picker-separator"></span> }

			{ this.showTimeView &&
				<TimeSelectionClocks
					id={`${this._id}-time-sel`}
					class="ui5-dt-time {{classes.dateTimeView}}"
					formatPattern={this._formatPattern}
					value={this._timeSelectionValue}
					onChange={this.onTimeSelectionChange}
					_calendarType={this._primaryCalendarType}
				></TimeSelectionClocks>
			}
		</div>
	);
};


function footer(this: DateTimePicker) {
	return (
		<div slot="footer" class="ui5-dt-picker-footer {{classes.footer}}">
			<Button
				id="ok"
				class="ui5-dt-picker-action"
				design="Emphasized"
				disabled={this._submitDisabled}
				onClick={this._submitClick}
			>
				{this.btnOKLabel}
			</Button>

			<Button
				id="cancel"
				class="ui5-dt-picker-action"
				design="Transparent"
				onClick={this._cancelClick}
			>
				{this.btnCancelLabel}
			</Button>
		</div>
	);
};

