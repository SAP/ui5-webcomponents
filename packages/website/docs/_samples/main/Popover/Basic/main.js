import "@ui5/webcomponents/dist/Popover.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";

const btn = [...document.getElementsByTagName("ui5-button")][0];
const popover = [...document.getElementsByTagName("ui5-popover")][0];

btn.addEventListener("click", () => {
	popover.open = !popover.open;
});