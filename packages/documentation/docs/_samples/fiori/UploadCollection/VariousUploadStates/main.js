import "@ui5/webcomponents/dist/Title.js";

import "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";

import "@ui5/webcomponents-icons/dist/document-text.js";

var uploadCollection = document.querySelector("ui5-upload-collection");

uploadCollection.addEventListener("retry", e => {
    alert("Retry uploading: " + e.target.fileName);
});
uploadCollection.addEventListener("terminate", e => {
    alert("Terminate uploading of: " + e.target.fileName);
});

uploadCollection.addEventListener("ui5-item-delete", e => {
    uploadCollection.removeChild(e.detail.item);
});