import Icon from "./Icon.js";
import Tokenizer from "./Tokenizer.js";
import Token from "./Token.js";
import type FileUploader from "./FileUploader.js";
import FileUploaderPopoverTemplate from "./FileUploaderPopoverTemplate.js";

export default function FileUploaderTemplate(this: FileUploader) {
	return (
		<>
			<div
				class="ui5-file-uploader-root"
				onFocusIn={this._onfocusin}
				onFocusOut={this._onfocusout}
				onKeyDown={this._onkeydown}
				onKeyUp={this._onkeyup}
				onClick={this._onclick}
				onDragOver={this._ondrag}
				onDrop={this._ondrop}
			>
				<form class="ui5-file-uploader-form">
					<input
						type="file"
						class="ui5-file-uploader-native-input"
						multiple={this.multiple}
						accept={this.accept}
						disabled={this.disabled}
						onChange={this._onChange}
						tabindex={this.hideInput ? -1 : 0}
					/>
				</form>
				{!this.hideInput ? (
					<div class="ui5-file-uploader-display-container">
						{this.selectedFileNames.length > 0 ? (
							<>
								<Tokenizer
									class="ui5-file-uploader-tokenizer"
									preventInitialFocus
									readonly
								>
									{this.selectedFileNames.map(fileName => (
										<Token text={fileName} />
									))}
								</Tokenizer>
								<Icon
									name="decline"
									class="ui5-file-uploader-close-icon inputIcon"
									onClick={this._clearFileSelection}
									title={this.clearIconTitle}
								/>
							</>
						) : (
							<input
								class="ui5-file-uploader-display-input"
								tabindex={-1}
								aria-hidden="true"
								title={this.inputTitle}
								placeholder={this.resolvedPlaceholder}
								inner-input
								readonly
								onClick={this._openFileBrowser}
							/>
						)}
						<Icon
							name="value-help"
							class="ui5-file-uploader-value-help-icon inputIcon"
							onClick={this._openFileBrowser}
							title={this.valueHelpTitle}
						/>
					</div>
				) : (
					<slot></slot>
				)}
			</div>

			{ FileUploaderPopoverTemplate.call(this) }
		</>
	);
}
