import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Input.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Toolbar.js"
import "@ui5/webcomponents/dist/ToolbarButton.js"

var dialogOpener = document.getElementById("dialogOpener");
var dialog = document.getElementById("dialog");
var dialogClosers = [...dialog.querySelectorAll(".dialogCloser")];

dialogOpener.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: dialog.id,
};
dialogOpener.addEventListener("click", () => {
    dialog.open = true;
});
dialogClosers.forEach(btn => {
    btn.addEventListener("click", () => {
        dialog.open = false;
    });
})