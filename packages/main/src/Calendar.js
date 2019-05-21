import "@ui5/webcomponents-base/src/shims/jquery-shim.js";
import "@ui5/webcomponents-base/src/shims/Core-shim.js";

// all themes should work via the convenience import (inlined now, switch to json when elements can be imported individyally)
import "./ThemePropertiesProvider.js";

import Calendar from "./CalendarElement.js";
Calendar.define();

export default Calendar;
