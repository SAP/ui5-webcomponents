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
				onMouseDown={this._onmousedown}
				onDragOver={this._ondrag}
				onDrop={this._ondrop}
			>
				<form class="ui5-file-uploader-form">
					<input
						type="file"
						class="ui5-file-uploader-native-input"
						aria-label={this.inputLabelText}
						multiple={this.multiple}
						required={this.required}
						accept={this.accept}
						disabled={this.disabled}
						aria-roledescription={this.roleDescription}
						title={this.inputTitle}
						placeholder={this.resolvedPlaceholder}
						onChange={this._onChange}
						data-sap-focus-ref
					/>
				</form>

				{this.hideInput ? (
					<slot></slot>
				) : (
					<div class="ui5-file-uploader-display-container">
						<div class="ui5-file-uploader-display-elements">
							{this._selectedFilesNames.length > 0 ? (
								<>
									<Tokenizer
										class="ui5-file-uploader-tokenizer"
										preventInitialFocus
										readonly
										expanded={this._tokenizerExpanded}
										open={this._tokenizerOpen}
										popoverMinWidth={this._formWidth}
										onClick={this._onTokenizerClick}
										onMouseDown={this._onTokenizerMouseDown}
										onKeyDown={this._onTokenizerKeyDown}
										onKeyUp={this._onTokenizerKeyUp}
									>
										{this._selectedFilesNames.map(fileName => (
											<Token
												text={fileName}
											/>
										))}
									</Tokenizer>
									<Icon
										name="decline"
										class="ui5-file-uploader-close-icon inputIcon"
										onClick={this._onClearIconClick}
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
								/>
							)}

							<Icon
								name="value-help"
								class="ui5-file-uploader-value-help-icon inputIcon"
								title={this.valueHelpTitle}
							/>
						</div>

						<slot></slot>
					</div>
				)}
			</div>

			{ FileUploaderPopoverTemplate.call(this) }
		</>
	);
}
