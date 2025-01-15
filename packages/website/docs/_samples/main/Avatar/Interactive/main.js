import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Avatar.js";

const avatar = document.getElementById("avt");
const label = document.getElementById("lbl");
let counter = 0;

avatar.addEventListener("click", (e) => {
	label.innerHTML = `Avatar clicked! :: ${++counter}`;
})
