import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js";
import { getCalendarType as getConfiguredCalendarType } from "../InitialConfiguration.js";

const calendarType = getConfiguredCalendarType();

const getCalendarType = () => {
	if (calendarType) {
		const type = Object.keys(CalendarType).find(calType => calType === calendarType);

		if (type) {
			return type;
		}
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
