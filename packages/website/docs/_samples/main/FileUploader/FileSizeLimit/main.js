import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";

import "@ui5/webcomponents-icons/dist/upload.js";

const fileUploader = document.querySelector("#fileuploader");
const resultDiv = document.querySelector("#file-exceed-result");

fileUploader.addEventListener("fileSizeExceed", (event) => {
    const maxSize = fileUploader.maxFileSize;
    const fileSize = event.detail.fileSize.toFixed(2);

    resultDiv.innerHTML = "<ui5-label>File too big! Max file size is " + maxSize + " MB, this file is " + fileSize + " MB</ui5-label>";
})

fileUploader.addEventListener("change", () => {
    resultDiv.innerHTML = "";
})