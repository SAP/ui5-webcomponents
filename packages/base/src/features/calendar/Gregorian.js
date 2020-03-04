import Gregorian from "@ui5/webcomponents-utils/dist/sap/ui/core/date/Gregorian.js";
import CalendarClassRegistry from "@ui5/webcomponents-utils/dist/sap/ui/core/date/CalendarClassRegistry.js";
import CalendarType from "@ui5/webcomponents-utils/dist/sap/ui/core/CalendarType.js";

CalendarClassRegistry.set(CalendarType.Gregorian, Gregorian);
