import "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/LastDays.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Input.js";

const individualOption = document.getElementById("individualOption");
const outputIndividual = document.getElementById("outputIndividual");

individualOption.addEventListener("change", (event) => {
	const value = event.detail.value;
	if (value) {
		outputIndividual.value = JSON.stringify(value, null, 2);
	} else {
		outputIndividual.value = "";
	}
}); 