import "@ui5/webcomponents/dist/ResponsivePopover.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Input.js";

const btn = [...document.getElementsByTagName("ui5-button")][0];
const respPopover = [...document.getElementsByTagName("ui5-responsive-popover")][0];

btn.addEventListener("click", () => {
	respPopover.open = !respPopover.open;
});