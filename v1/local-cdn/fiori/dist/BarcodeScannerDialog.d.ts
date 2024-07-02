import UI5Element, { ChangeInfo } from "@ui5/webcomponents-base/dist/UI5Element.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
declare const BrowserMultiFormatReader: typeof import("@zxing/library/esm5/index.js").BrowserMultiFormatReader;
type BarcodeScannerDialogScanSuccessEventDetail = {
    text: string;
    rawBytes: Uint8Array;
};
type BarcodeScannerDialogScanErrorEventDetail = {
    message: string;
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
declare class BarcodeScannerDialog extends UI5Element {
    /**
     * Indicates whether the dialog is open.
     *
     * @public
     * @default false
     * @since 1.24.0
    */
    open: boolean;
    /**
     * Indicates whether a loading indicator should be displayed in the dialog.
     * @default false
     * @private
     */
    loading: boolean;
    _codeReader: InstanceType<typeof BrowserMultiFormatReader>;
    dialog?: Dialog;
    static i18nBundle: I18nBundle;
    constructor();
    static onDefine(): Promise<void>;
    onInvalidation(changeInfo: ChangeInfo): void;
    /**
     * Shows a dialog with the camera videostream. Starts a scan session.
     * @public
     * @deprecated The method is deprecated in favour of <code>open</code> property.
     */
    show(): void;
    /**
     * Closes the dialog and the scan session.
     * @public
     * @deprecated The method is deprecated in favour of <code>open</code> property.
     */
    close(): void;
    /**
     *  PRIVATE METHODS
     */
    _hasGetUserMedia(): boolean;
    _getUserPermission(): Promise<MediaStream>;
    _getDialog(): Promise<Dialog>;
    _getVideoElement(): Promise<HTMLVideoElement>;
    _showDialog(): Promise<void>;
    _closeDialog(): void;
    _startReader(): void;
    _resetReader(): Promise<void>;
    _decodeFromCamera(): Promise<void>;
    get _cancelButtonText(): string;
    get _busyIndicatorText(): string;
}
export default BarcodeScannerDialog;
export type { BarcodeScannerDialogScanErrorEventDetail, BarcodeScannerDialogScanSuccessEventDetail, };
