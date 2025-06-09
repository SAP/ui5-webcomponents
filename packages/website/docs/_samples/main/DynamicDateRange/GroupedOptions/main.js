import "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextDays.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextWeeks.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/NextYears.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Input.js";

const groupedOption = document.getElementById("groupedOption");
const outputGrouped = document.getElementById("outputGrouped");

groupedOption.addEventListener("change", (event) => {
	const value = event.detail.value;
	if (value) {
		outputGrouped.value = JSON.stringify(value, null, 2);
	} else {
		outputGrouped.value = "";
	}
}); 