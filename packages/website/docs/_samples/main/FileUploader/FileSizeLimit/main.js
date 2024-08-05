import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/MessageStrip.js";

import "@ui5/webcomponents-icons/dist/upload.js";

const fileUploader = document.querySelector("#fileuploader");
const resultDiv = document.querySelector("#file-exceeded-result");

fileUploader.addEventListener("fileSizeExceeded", (event) => {
    const maxSize = fileUploader.maxFileSize;
    const fileSize = event.detail.fileSize.toFixed(2);
    const errorMessage = "File too big! Max file size is " + maxSize + " MB, this file is " + fileSize + " MB";

    const messageStrip = document.createElement('ui5-message-strip');
    messageStrip.addEventListener("close", handleMessageClose);
    resultDiv.append(messageStrip);

    messageStrip.design = "Negative";
    messageStrip.innerHTML = errorMessage;
})

function handleMessageClose(event) {
    event.target.remove();
}