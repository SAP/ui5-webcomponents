import type DynamicDateRange from "../DynamicDateRange.js";
import Calendar from "../Calendar.js";

export default function DynamicDateRangeOptionDateTemplate(this: DynamicDateRange) {
	return (
		<Calendar onSelectionChange={this.calendarSelectionChange}></Calendar>
	);
}
