import CalendarType from "@ui5/webcomponents-utils/dist/sap/ui/core/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

let calendarType;

const getCalendarType = () => {
	if (calendarType === undefined) {
		calendarType = getConfiguredCalendarType();
	}

	if (calendarType) {
		const type = Object.keys(CalendarType).find(calType => calType === calendarType);

		if (type) {
			return type;
		}
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
