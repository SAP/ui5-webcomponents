import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";

const btn1 = document.getElementById("btn1");
const popover1 = document.getElementById("popover1");
const btn2 = document.getElementById("btn2");
const popover2 = document.getElementById("popover2");

btn1.addEventListener("click", () => {
	popover1.open = !popover1.open;
});
btn2.addEventListener("click", () => {
	popover2.open = !popover2.open;
});