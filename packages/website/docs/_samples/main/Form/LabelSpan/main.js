import "@ui5/webcomponents/dist/Form.js";
import "@ui5/webcomponents/dist/FormItem.js";


// The following code is required only for the sample
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Slider.js";

const slider = document.getElementById("slider");
const txtLayout = document.getElementById("txtLayout");
const container = document.getElementById("container");

slider.addEventListener("ui5-input", () => {
	const width = (slider.value / 100 * 1500);
	container.style.width = `${width}px`;
	txtLayout.innerHTML = getLayoutByWidth(width);
});

const getLayoutByWidth = (width) => {
	if (width > 599 && width <= 1023) {
		return "M";
	} else if (width >= 1024 && width <= 1439) {
		return "L"
	} else if (width >= 1440) {
		return "XL"
	}
	return "S";
};
