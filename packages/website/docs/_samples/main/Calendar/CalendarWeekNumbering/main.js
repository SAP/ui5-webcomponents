import "@ui5/webcomponents/dist/Calendar.js";
import "@ui5/webcomponents/dist/Select.js";
import "@ui5/webcomponents/dist/Option.js";

sel.addEventListener("change", async (e) => {
   cal.calendarWeekNumbering = e.detail.selectedOption.getAttribute("data-calendar-week-numbering");
});