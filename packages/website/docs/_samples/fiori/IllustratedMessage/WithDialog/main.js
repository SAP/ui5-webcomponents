import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Dialog.js";

import "@ui5/webcomponents-fiori/dist/Bar.js";
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/UnableToLoad.js";

const dialogOpener = document.getElementById("openDialogButton");
const dialog = document.getElementById("hello-dialog");
const dialogCloser = document.getElementById("closeDialogButton");
dialogOpener.addEventListener("click", function () {
    dialog.show();
});
dialogCloser.addEventListener("click", function () {
    dialog.close();
});