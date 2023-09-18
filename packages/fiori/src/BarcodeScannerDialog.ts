import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import * as ZXing from "@zxing/library/umd/index.min.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import type { Result, Exception } from "@zxing/library/esm5/index.js";

// Texts
import {
	BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT,
	BARCODE_SCANNER_DIALOG_LOADING_TXT,
} from "./generated/i18n/i18n-defaults.js";

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

type BarcodeScannerDialogScanSuccessEventDetail = {
	text: string,
	rawBytes: Uint8Array,
};

type BarcodeScannerDialogScanErrorEventDetail = {
	message: string,
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 *
 * The <code>BarcodeScannerDialog</code> component provides barcode scanning functionality for all devices that support the <code>MediaDevices.getUserMedia()</code> native API.
 * Opening the dialog launches the device camera and scans for known barcode formats.
 * <br>
 * <br>
 * A <code>scanSuccess</code> event fires whenever a barcode is identified
 * and a <code>scanError</code> event fires when the scan failed (for example, due to missing permisions).
 * <br>
 * <br>
 * Internally, the component  uses the zxing-js/library third party OSS.
 *
 * For a list of supported barcode formats, see the <ui5-link target="_blank" href="https://github.com/zxing-js/library">zxing-js/library</ui5-link> documentation.
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webc.fiori.BarcodeScannerDialog
 * @extends sap.ui.webc.base.UI5Element
 * @tagname ui5-barcode-scanner-dialog
 * @public
 * @since 1.0.0-rc.15
 */
@customElement({
	tag: "ui5-barcode-scanner-dialog",
	languageAware: true,
	renderer: litRender,
	staticAreaTemplate: BarcodeScannerDialogTemplate,
	staticAreaStyles: [BarcodeScannerDialogCss],
	dependencies: [
		Dialog,
		BusyIndicator,
		Button,
	],
})
/**
 * Fires when the scan is completed successfuuly.
 *
 * @event sap.ui.webc.fiori.BarcodeScannerDialog#scan-success
 * @param {string} text the scan result as string
 * @param {Object} rawBytes the scan result as a Uint8Array
 * @public
 */
@event("scan-success", {
	detail: {
		text: { type: String },
		rawBytes: { type: Object },
	},
})

/**
 * Fires when the scan fails with error.
 *
 * @event sap.ui.webc.fiori.BarcodeScannerDialog#scan-error
 * @param {string} message the error message
 * @public
 */
@event("scan-error", {
	detail: {
		message: { type: String },
	},
})

class BarcodeScannerDialog extends UI5Element {
	/**
	 * Indicates whether a loading indicator should be displayed in the dialog.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.BarcodeScannerDialog.prototype.loading
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	loading!: boolean;

	_codeReader: InstanceType<typeof BrowserMultiFormatReader>;
	dialog?: Dialog;
	static i18nBundle: I18nBundle;

	constructor() {
		super();
		this._codeReader = new BrowserMultiFormatReader();
	}

	static async onDefine() {
		BarcodeScannerDialog.i18nBundle = await getI18nBundle("@ui5/webcomponents-fiori");
	}

	/**
	 * Shows a dialog with the camera videostream. Starts a scan session.
	 * @method
	 * @name sap.ui.webc.fiori.BarcodeScannerDialog#show
	 * @returns {void}
	 * @public
	 */
	show() {
		if (this.loading) {
			console.warn("Barcode scanning is already in progress.");  // eslint-disable-line
			return;
		}

		if (!this._hasGetUserMedia()) {
			this.fireEvent<BarcodeScannerDialogScanErrorEventDetail>("scan-error", { message: "getUserMedia() is not supported by your browser" });
			return;
		}

		this.loading = true;

		this._getUserPermission()
			.then(() => this._showDialog())
			.catch(err => {
				this.fireEvent<BarcodeScannerDialogScanErrorEventDetail>("scan-error", { message: err });
				this.loading = false;
			});
	}

	/**
	 * Closes the dialog and the scan session.
	 * @method
	 * @name sap.ui.webc.fiori.BarcodeScannerDialog#close
	 * @returns {void}
	 * @public
	 */
	close() {
		this._closeDialog();
		this.loading = false;
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

	async _getDialog() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<Dialog>("[ui5-dialog]")!;
	}

	async _getVideoElement() {
		const staticAreaItem = await this.getStaticAreaItemDomRef();
		return staticAreaItem!.querySelector<HTMLVideoElement>(".ui5-barcode-scanner-dialog-video")!;
	}

	async _showDialog() {
		this.dialog = await this._getDialog();
		this.dialog.show();
	}

	_closeDialog() {
		if (this.dialog && this.dialog.opened) {
			this.dialog.close();
		}
	}

	_startReader() {
		this._decodeFromCamera();
	}

	async _resetReader() {
		const videoElement = await this._getVideoElement();
		videoElement.pause();
		this._codeReader.reset();
	}

	async _decodeFromCamera() {
		const videoElement = await this._getVideoElement();
		this._codeReader.decodeFromVideoDevice(null, videoElement, (result: Result, err?: Exception) => {
			this.loading = false;
			if (result) {
				this.fireEvent<BarcodeScannerDialogScanSuccessEventDetail>("scan-success",
					{
						text: result.getText(),
						rawBytes: result.getRawBytes(),
					});
			}
			if (err && !(err instanceof NotFoundException)) {
				this.fireEvent<BarcodeScannerDialogScanErrorEventDetail>("scan-error", { message: err.message });
			}
		}).catch((err: Error) => this.fireEvent<BarcodeScannerDialogScanErrorEventDetail>("scan-error", { message: err.message }));
	}

	get _cancelButtonText() {
		return BarcodeScannerDialog.i18nBundle.getText(BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT);
	}

	get _busyIndicatorText() {
		return BarcodeScannerDialog.i18nBundle.getText(BARCODE_SCANNER_DIALOG_LOADING_TXT);
	}
}

BarcodeScannerDialog.define();

export default BarcodeScannerDialog;
export type {
	BarcodeScannerDialogScanErrorEventDetail,
	BarcodeScannerDialogScanSuccessEventDetail,
};
