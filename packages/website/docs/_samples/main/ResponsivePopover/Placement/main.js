import "@ui5/webcomponents/dist/ResponsivePopover.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";

const btn1 = document.getElementById("btn1");
const respPopover1 = document.getElementById("respPopover1");
const btn2 = document.getElementById("btn2");
const respPopover2 = document.getElementById("respPopover2");

btn1.addEventListener("click", () => {
	respPopover1.open = !respPopover1.open;
});
btn2.addEventListener("click", () => {

	respPopover2.open = !respPopover2.open;
});