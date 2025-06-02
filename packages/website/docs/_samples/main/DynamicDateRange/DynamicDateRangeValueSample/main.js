import "@ui5/webcomponents/dist/DynamicDateRange.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Today.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Yesterday.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/Tomorrow.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/SingleDate.js";
import "@ui5/webcomponents/dist/dynamic-date-range-options/DateRange.js";

const dynamicDateRange = document.getElementById("dynamicDateRange");
const selectedValueInput = document.getElementById("selectedValue");
const convertedDatesInput = document.getElementById("convertedDates");

dynamicDateRange.addEventListener("change", (event) => {
    const selectedValue = event.detail.value;

    selectedValueInput.value = JSON.stringify(selectedValue);

    const dates = dynamicDateRange.toDates(selectedValue);
    convertedDatesInput.value = dates.map(date => date.toLocaleString()).join(" - ");
   
});