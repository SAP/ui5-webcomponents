"use strict";import r from"../types/CalendarType.js";import{getCalendarType as a,getSecondaryCalendarType as d}from"../InitialConfiguration.js";let n,e;const t=()=>(n===void 0&&(n=a()),n&&n in r?n:r.Gregorian),y=()=>(e===void 0&&(e=d()),e&&e in r,e);export{t as getCalendarType,y as getSecondaryCalendarType};
//# sourceMappingURL=CalendarType.js.map
