import Dialog from "@ui5/webcomponents/dist/Dialog.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";
import type BarcodeScannerDialog from "./BarcodeScannerDialog.js";

export default function BarcodeScannerDialogTemplate(this: BarcodeScannerDialog) {
	return (<>
		<Dialog
			stretch={true}
			class="ui5-barcode-scanner-dialog-root"
			open={this._open}
			onClose={this._closeDialog}
		>
			<slot name="header"></slot>
			<div class="ui5-barcode-scanner-dialog-video-wrapper">
				<video
					autoplay={true}
					playsinline={true}
					muted={true}
					class="ui5-barcode-scanner-dialog-video"
				></video>
				<canvas class="ui5-barcode-scanner-dialog-overlay"></canvas>
			</div>
			<slot name="footer" class="ui5-barcode-scanner-dialog-footer">
				<Button
					design="Transparent"
					onClick={this._closeDialog}
				>{this._cancelButtonText}</Button>
			</slot>
		</Dialog>
		<BusyIndicator
			class="ui5-barcode-scanner-dialog-busy"
			active={this.loading}
			size="L"
			text={this._busyIndicatorText}
		/>
	</>);
}
