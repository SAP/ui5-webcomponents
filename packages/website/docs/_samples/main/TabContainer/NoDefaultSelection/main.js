import "@ui5/webcomponents/dist/TabContainer.js"
import "@ui5/webcomponents/dist/Tab.js"
import "@ui5/webcomponents/dist/Text.js"
import "@ui5/webcomponents/dist/Button.js"

const resetBtn = document.getElementById("resetBtn");
const tabContainer = document.getElementById("tabContainer");

resetBtn.addEventListener("click", () => {
	tabContainer.allItems.forEach(tab => tab.selected = false);
	tabContainer.selectedTab = undefined;
});