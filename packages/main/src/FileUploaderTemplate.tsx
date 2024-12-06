import type FileUploader from "./FileUploader.js";
import Input from "./Input.js";
import FileUploaderPopoverTemplate from "./FileUploaderPopoverTemplate.js";

export default function FileUploaderTemplate(this: FileUploader) {
	return (
		<>
			<div
				class="ui5-file-uploader-root"
				onMouseOver={this._onmouseover}
				onMouseOut={this._onmouseout}
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
				onDragOver={this._ondrag}
				onDrop={this._ondrop}
			>
				<div class="ui5-file-uploader-mask">
					{!this.hideInput &&
						<Input
							value={this.value}
							valueState={this.valueState}
							placeholder={this.placeholder}
							disabled={this.disabled}
							tabindex={-1}
							class="ui5-file-uploader-input"
						/>
					}
					<slot></slot>
				</div>
				<input
					type="file"
					tabindex={-1}
					aria-hidden="true"
					multiple={this.multiple}
					accept={this.accept}
					title={this.titleText}
					disabled={this.disabled}
					onChange={this._onChange}
				/>
			</div>

			{ FileUploaderPopoverTemplate.call(this) }
		</>
	);
}
