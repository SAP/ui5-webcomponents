import type DynamicDateRange from "../DynamicDateRange.js";
import Calendar from "../Calendar.js";
import CalendarDateRange from "../CalendarDateRange.js";

export default function DynamicDateRangeOptionDateRangeTemplate(this: DynamicDateRange) {
	return (
		<Calendar onSelectionChange={this.handleSelectionChange} selectionMode="Range">
			<CalendarDateRange
				startValue={this.value && this.getOption(this.value?.operator)?.format(this.value).split("-")[0]}
				endValue={this.value && this.getOption(this.value?.operator)?.format(this.value).split("-")[1]}
			></CalendarDateRange>
		</Calendar>
	);
}
