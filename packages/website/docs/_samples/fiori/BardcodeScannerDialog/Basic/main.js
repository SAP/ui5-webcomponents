import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/BarcodeScannerDialog.js";
import "@ui5/webcomponents-icons/dist/camera.js"

const btnScan = document.getElementById("btnScan");
const dlgScan = document.getElementById("dlgScan");
const scanResult = document.getElementById("scanResult");
const scanError = document.getElementById("scanError");

btnScan.addEventListener("click", (event) => {
    dlgScan.show();
});

dlgScan.addEventListener("scan-success", (event) => {
    scanResult.innerHTML = event.detail.text;
    dlgScan.close();
});

dlgScan.addEventListener("scan-error", (event) => {
    scanError.innerHTML = event.detail.message;
    dlgScan.close();
});