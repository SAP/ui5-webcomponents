import "@ui5/webcomponents/dist/FileUploader.js";
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/MessageStrip.js";

import "@ui5/webcomponents-icons/dist/upload.js";

const fileUploader = document.querySelector("#max-file-size-uploader");
const resultDiv = document.querySelector("#file-exceed-result");

fileUploader.addEventListener("file-size-exceed", function (event) {
    const uploaderMaxSize = fileUploader.maxFileSize;
    const filesData = event.detail.filesData;

    filesData.forEach(fileData => {
        const fileName = fileData.fileName;
        const fileSizeDifference = (fileData.fileSize - uploaderMaxSize).toFixed(2);
        const errorMessage = "Can't upload file '" + fileName + "' because it exceeds the maximum upload size by " + fileSizeDifference + " MB.";

        const messageStrip = document.createElement('ui5-message-strip');
        messageStrip.addEventListener("close", handleMessageClose);
        resultDiv.append(messageStrip);

        messageStrip.design = "Negative";
        messageStrip.innerHTML = errorMessage;
    })
})

function handleMessageClose(event) {
    event.target.remove();
}