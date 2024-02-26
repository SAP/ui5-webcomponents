import "@ui5/webcomponents/dist/Toast.js";
import "@ui5/webcomponents/dist/Button.js";

const btn = [...document.getElementsByTagName("ui5-button")][0];
const toast = [...document.getElementsByTagName("ui5-toast")][0];

btn.addEventListener("click", () => {
	toast.show();	
});