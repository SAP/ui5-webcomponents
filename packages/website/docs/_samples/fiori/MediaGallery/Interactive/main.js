import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Dialog.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Title.js";

import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents-fiori/dist/MediaGallery.js";
import "@ui5/webcomponents-fiori/dist/MediaGalleryItem.js";

const mediaGalleryDialog = document.getElementById("mediaGalleryDialog");
const mediaGallery = document.querySelector(".container > ui5-media-gallery");
const closeDialogButton = document.getElementById("closeDialogButton");

closeDialogButton.addEventListener("click", () => {
    mediaGalleryDialog.open = false;
});
mediaGallery.addEventListener("overflow-click", (event) => {
    mediaGalleryDialog.open = true;
});
mediaGallery.addEventListener(
    "display-area-click",
    (event) => {
        mediaGalleryDialog.open = true;
    }
);