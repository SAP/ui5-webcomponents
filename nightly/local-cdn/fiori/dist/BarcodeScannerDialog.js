var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BarcodeScannerDialog_1;
import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import * as ZXing from "@zxing/library/umd/index.min.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
// Texts
import { BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT, BARCODE_SCANNER_DIALOG_LOADING_TXT, } from "./generated/i18n/i18n-defaults.js";
// Template
import BarcodeScannerDialogTemplate from "./generated/templates/BarcodeScannerDialogTemplate.lit.js";
// Styles
import BarcodeScannerDialogCss from "./generated/themes/BarcodeScannerDialog.css.js";
// some tools handle named exports from UMD files and the window object is not assigned but the imports work (vitejs)
// other tools do not handle named exports (they are undefined after the import), but the window global is assigned and can be used (web dev server)
const effectiveZXing = { ...ZXing, ...window.ZXing };
const { BrowserMultiFormatReader, NotFoundException } = effectiveZXing;
const defaultMediaConstraints = {
    audio: false,
    video: {
        height: {
            min: 480,
            ideal: 960,
            max: 1440,
        },
        aspectRatio: 1.333333333,
        facingMode: "environment",
    },
};
/**
 * @class
 *
 * ### Overview
 *
 * The `BarcodeScannerDialog` component provides barcode scanning functionality for all devices that support the `MediaDevices.getUserMedia()` native API.
 * Opening the dialog launches the device camera and scans for known barcode formats.
 *
 * A `scanSuccess` event fires whenever a barcode is identified
 * and a `scanError` event fires when the scan failed (for example, due to missing permisions).
 *
 * Internally, the component  uses the zxing-js/library third party OSS.
 *
 * For a list of supported barcode formats, see the [zxing-js/library](https://github.com/zxing-js/library) documentation.
 * @constructor
 * @extends UI5Element
 * @public
 * @since 1.0.0-rc.15
 */
let BarcodeScannerDialog = BarcodeScannerDialog_1 = class BarcodeScannerDialog extends UI5Element {
    constructor() {
        super();
        /**
         * Indicates whether the dialog is open.
         *
         * @public
         * @default false
         * @since 1.24.0
        */
        this.open = false;
        /**
         * Indicates whether a loading indicator should be displayed in the dialog.
         * @default false
         * @private
         */
        this.loading = false;
        /**
         * Indicates whether the user has granted permissions to use the camera.
         * @default false
         * @private
         */
        this.permissionsGranted = false;
        this._codeReader = new BrowserMultiFormatReader();
    }
    static async onDefine() {
        BarcodeScannerDialog_1.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
    }
    onAfterRendering() {
        if (this.open) {
            if (this.loading) {
                return;
            }
            if (!this._hasGetUserMedia()) {
                this.fireEvent("scan-error", { message: "getUserMedia() is not supported by your browser" });
                return;
            }
            if (!this.permissionsGranted) {
                this.loading = true;
            }
            this._getUserPermission()
                .then(() => {
                this.permissionsGranted = true;
            })
                .catch(err => {
                this.fireEvent("scan-error", { message: err });
                this.loading = false;
            });
        }
        else {
            this.loading = false;
        }
    }
    get _open() {
        return this.open && this.permissionsGranted;
    }
    /**
     *  PRIVATE METHODS
     */
    _hasGetUserMedia() {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }
    _getUserPermission() {
        return navigator.mediaDevices.getUserMedia(defaultMediaConstraints);
    }
    _getVideoElement() {
        return this.shadowRoot.querySelector(".ui5-barcode-scanner-dialog-video");
    }
    _closeDialog() {
        this.open = false;
    }
    _fireCloseEvent() {
        this.open = false;
        this.fireEvent("close");
    }
    _startReader() {
        this._decodeFromCamera();
    }
    _resetReader() {
        const videoElement = this._getVideoElement();
        videoElement.pause();
        this._codeReader.reset();
    }
    _decodeFromCamera() {
        const videoElement = this._getVideoElement();
        this._codeReader.decodeFromVideoDevice(null, videoElement, (result, err) => {
            this.loading = false;
            if (result) {
                this.fireEvent("scan-success", {
                    text: result.getText(),
                    rawBytes: result.getRawBytes(),
                });
            }
            if (err && !(err instanceof NotFoundException)) {
                this.fireEvent("scan-error", { message: err.message });
            }
        }).catch((err) => this.fireEvent("scan-error", { message: err.message }));
    }
    get _cancelButtonText() {
        return BarcodeScannerDialog_1.i18nBundle.getText(BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT);
    }
    get _busyIndicatorText() {
        return BarcodeScannerDialog_1.i18nBundle.getText(BARCODE_SCANNER_DIALOG_LOADING_TXT);
    }
};
__decorate([
    property({ type: Boolean })
], BarcodeScannerDialog.prototype, "open", void 0);
__decorate([
    property({ type: Boolean })
], BarcodeScannerDialog.prototype, "loading", void 0);
__decorate([
    property({ type: Boolean, noAttribute: true })
], BarcodeScannerDialog.prototype, "permissionsGranted", void 0);
BarcodeScannerDialog = BarcodeScannerDialog_1 = __decorate([
    customElement({
        tag: "ui5-barcode-scanner-dialog",
        languageAware: true,
        renderer: litRender,
        template: BarcodeScannerDialogTemplate,
        styles: [BarcodeScannerDialogCss],
        dependencies: [
            Dialog,
            BusyIndicator,
            Button,
        ],
    })
    /**
     * Fired when the user closes the component.
     * @public
     */
    ,
    event("close")
    /**
     * Fires when the scan is completed successfuuly.
     * @param {string} text the scan result as string
     * @param {Object} rawBytes the scan result as a Uint8Array
     * @public
     */
    ,
    event("scan-success", {
        detail: {
            /**
            * @public
            */
            text: { type: String },
            /**
            * @public
            */
            rawBytes: { type: Object },
        },
    })
    /**
     * Fires when the scan fails with error.
     * @param {string} message the error message
     * @public
     */
    ,
    event("scan-error", {
        detail: {
            /**
            * @public
            */
            message: { type: String },
        },
    })
], BarcodeScannerDialog);
BarcodeScannerDialog.define();
export default BarcodeScannerDialog;
//# sourceMappingURL=BarcodeScannerDialog.js.map