import "@ui5/webcomponents/dist/Title.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/FileUploader.js";

import "@ui5/webcomponents-fiori/dist/UploadCollection.js";
import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";

import "@ui5/webcomponents-icons/dist/document-text.js";
import "@ui5/webcomponents-icons/dist/add.js";

var uploadCollection = document.querySelector("ui5-upload-collection");
var fileUploader = document.getElementById("fileUploader");
var startUploading = document.getElementById("startUploading");

fileUploader.addEventListener("change", e => {
    var files = e.detail.files;
    for (var i = 0; i < files.length; i++) {
        uploadCollection.appendChild(createUCI(files[i]));
    }
});

function createUCI(file) {
    var uci = document.createElement("ui5-upload-collection-item");
    var description = document.createTextNode("Last modified: " + file.lastModifiedDate + ", size: " + file.size);

    uci.appendChild(createThumbnail(file.name));
    uci.appendChild(description);
    uci.file = file;
    uci.fileName = file.name;
    return uci;
}

function createThumbnail() {
    var icon = document.createElement("ui5-icon");
    icon.name = "document";
    icon.slot = "thumbnail";
    return icon;
}

startUploading.addEventListener("click", e => {
    uploadCollection.items
        .filter(item => item.uploadState === "Ready" && item.file)
        .forEach(item => {
            item.uploadState = "Uploading";

            fetch("/upload", {
                method: "POST",
                body: item.file
            }).then(res => {
                item.uploadState = res.status === 200 ? "Complete" : "Error";
            });
        });
});

uploadCollection.addEventListener("drop", e => {
    e.preventDefault();

    var files = e.dataTransfer.files;
    // Take the files from the drop event and create <ui5-upload-collection-item> from them
    for (var i = 0; i < files.length; i++) {
        uploadCollection.appendChild(createUCI(files[i]));
    }
});

uploadCollection.addEventListener("ui5-item-delete", e => {
    uploadCollection.removeChild(e.detail.item);
});