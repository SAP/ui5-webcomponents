import type Calendar from "./Calendar.js";
import DayPicker from "./DayPicker.js";
import MonthPicker from "./MonthPicker.js";
import YearPicker from "./YearPicker.js";
import CalendarHeaderTemplate from "./CalendarHeaderTemplate.js";

export default function CalendarTemplate(this: Calendar) {
	return (
		<>
			<div
				class="ui5-cal-root"
				onKeyDown={this._onkeydown}
			>
				<div id={`${this._id}-content`} class="ui5-cal-content">
					<DayPicker
						id={`${this._id}-daypicker`}
						hidden={this._isDayPickerHidden}
						formatPattern={this._formatPattern}
						selectedDates={this._selectedDatesTimestamps}
						specialCalendarDates={this._specialCalendarDates}
						_hidden={this._isDayPickerHidden}
						primaryCalendarType={this._primaryCalendarType}
						secondaryCalendarType={this._secondaryCalendarType}
						selectionMode={this.selectionMode}
						minDate={this.minDate}
						maxDate={this.maxDate}
						calendarWeekNumbering={this.calendarWeekNumbering}
						timestamp={this._timestamp}
						hideWeekNumbers={this.hideWeekNumbers}
						onChange={this.onSelectedDatesChange}
						onNavigate={this.onNavigate}
						exportparts="day-cell, day-cell-selected, day-cell-selected-between"
					/>

					<MonthPicker
						id={`${this._id}-MP`}
						hidden={this._isMonthPickerHidden}
						formatPattern={this._formatPattern}
						selectedDates={this._selectedDatesTimestamps}
						_hidden={this._isMonthPickerHidden}
						primaryCalendarType={this._primaryCalendarType}
						secondaryCalendarType={this._secondaryCalendarType}
						selectionMode={this.selectionMode}
						minDate={this.minDate}
						maxDate={this.maxDate}
						timestamp={this._timestamp}
						onChange={this.onSelectedMonthChange}
						onNavigate={this.onNavigate}
						exportparts="month-cell, month-cell-selected, month-cell-selected-between"
					/>

					<YearPicker
						id={`${this._id}-YP`}
						hidden={this._isYearPickerHidden}
						formatPattern={this._formatPattern}
						selectedDates={this._selectedDatesTimestamps}
						_hidden={this._isYearPickerHidden}
						primaryCalendarType={this._primaryCalendarType}
						secondaryCalendarType={this._secondaryCalendarType}
						selectionMode={this.selectionMode}
						minDate={this.minDate}
						maxDate={this.maxDate}
						timestamp={this._timestamp}
						onChange={this.onSelectedYearChange}
						onNavigate={this.onNavigate}
						exportparts="year-cell, year-cell-selected, year-cell-selected-between"
					/>
				</div>

				<div class="ui5-calheader">
					{ CalendarHeaderTemplate.call(this) }
				</div>
			</div>

			<div
				onui5-calendar-legend-selection-change={this._onCalendarLegendSelectionChange}
				onui5-calendar-legend-focus-out={this._onLegendFocusOut}
			>
				<slot name="calendarLegend"></slot>
			</div>
		</>);
}
