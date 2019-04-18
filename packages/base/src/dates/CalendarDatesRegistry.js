import Gregorian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Gregorian.js";
import CalendarType from "@ui5/webcomponents-core/dist/sap/ui/core/CalendarType.js";

const registry = new Map();
registry.set(CalendarType.Gregorian, Gregorian);

export default {
	addCalendarClass: (calendarType, CalendarDateClass) => {
		registry.set(calendarType, CalendarDateClass);
	},
	getCalendarClass: calendarType => {
		if (!calendarType) {
			// TODO: add in configuration
			calendarType = CalendarType.Gregorian;
		}
		return registry.get(calendarType);
	},
};
