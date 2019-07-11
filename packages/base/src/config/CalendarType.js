import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js";
import { _getCalendarType } from "../InitialConfiguration.js";

const calendarType = _getCalendarType();

const getCalendarType = () => {
	if (calendarType) {
		const type = Object.keys(CalendarType).filter(calType => calType === calendarType)[0];

		if (type) {
			return type;
		}
	}

	return CalendarType.Gregorian;
};

export { getCalendarType }; // eslint-disable-line
