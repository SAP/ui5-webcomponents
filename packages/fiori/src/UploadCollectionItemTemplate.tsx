import Input from "@ui5/webcomponents/dist/Input.js";
import type UploadCollectionItem from "./UploadCollectionItem.js";
import type { ListItemHooks } from "@ui5/webcomponents/dist/ListItemTemplate.js";
import ListItemTemplate from "@ui5/webcomponents/dist/ListItemTemplate.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ProgressIndicator from "@ui5/webcomponents/dist/ProgressIndicator.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import refreshIcon from "@ui5/webcomponents-icons/dist/refresh.js";
import stopIcon from "@ui5/webcomponents-icons/dist/stop.js";
import editIcon from "@ui5/webcomponents-icons/dist/edit.js";
import declineIcon from "@ui5/webcomponents-icons/dist/decline.js";

const predefinedHooks: Partial<ListItemHooks> = {
	listItemContent,
};

export default function UploadCollectionItemTemplate(this: UploadCollectionItem, hooks?: Partial<ListItemHooks>) {
	const currentHooks = { ...predefinedHooks, ...hooks };

	return ListItemTemplate.call(this, currentHooks);
}

function listItemContent(this: UploadCollectionItem) {
	return <>
		<div class="ui5-uci-thumbnail-and-content-container">
			<div class="ui5-uci-thumbnail">
				<slot name="thumbnail"></slot>
			</div>
			<div class="ui5-uci-content-and-progress">
				<div class="ui5-uci-content">

					{this._editing ? (
						<div class="ui5-uci-edit-container">
							<Input
								id="ui5-uci-edit-input"
								data-sap-focus-ref
								onFocusIn={this._onInputFocusin}
								onKeyDown={this._onInputKeyDown}
							/>
							<span class="ui5-uci-file-extension">{this._fileExtension}</span>
						</div>
					) : (

						this.fileNameClickable ? (
							<Link
								class="ui5-uci-file-name"
								onClick={this._onFileNameClick}
								wrappingType="None"
							>{this.fileName}</Link>
						) : (
							<span class="ui5-uci-file-name ui5-uci-file-name-text">{this.fileName}</span>
						)
					)}
					<div class="ui5-uci-description">
						<slot></slot>
					</div>
				</div >
				{this._showProgressIndicator && (
					<div class="ui5-uci-progress-box">
						<ProgressIndicator
							class="ui5-uci-progress-indicator"
							hideValue={true}
							value={this.progress}
							valueState={this.valueStateName}
						/>
						<div class="ui5-uci-progress-labels">
							<Label showColon wrappingType="None">{this._progressText}</Label>
							<Label>{this.progress}%</Label>
						</div>
					</div>
				)}
			</div >
		</div >

		<div class="ui5-uci-buttons">
			{this._editing ? (
				<>
					<Button
						design="Transparent"
						class="ui5-uci-edit-rename-btn"
						onClick={this._onRename}
						onKeyUp={this._onRenameKeyup}
					>
						{this._renameBtnText}
					</Button>
					<Button
						design="Transparent"
						id="ui5-uci-edit-cancel"
						onClick={this._onRenameCancel}
						onKeyUp={this._onRenameCancelKeyup}
					>
						{this._cancelRenameBtnText}
					</Button>
				</>
			) : (
				<>
					{this._showRetry && (
						<Button
							icon={refreshIcon}
							design="Transparent"
							tooltip={this._retryButtonTooltip}
							onClick={this._onRetry}
							onKeyUp={this._onRetryKeyup}
						/>
					)}
					{this._showTerminate && (
						<Button
							icon={stopIcon}
							design="Transparent"
							tooltip={this._terminateButtonTooltip}
							onClick={this._onTerminate}
							onKeyUp={this._onTerminateKeyup}
						/>
					)}
					{this.showEditButton && (
						<Button
							id={`${this._id}-editing-button`}
							design="Transparent"
							tooltip={this._editButtonTooltip}
							icon={editIcon}
							onClick={this.onDetailClick}
							onKeyUp={this._onDetailKeyup}
							class="ui5-li-detailbtn ui5-uci-edit"
						/>
					)}
					{!this.hideDeleteButton && (
						this.hasDeleteButtonSlot ? (
							<slot name="deleteButton"></slot>
						) : (
							<Button
								class="ui5-upload-collection-deletebtn"
								id={`${this._id}-deleteSelectionElement`}
								design="Transparent"
								icon={declineIcon}
								disabled={this.disableDeleteButton}
								onClick={this._onDelete}
								tooltip={this.deleteText}
							/>
						)
					)}
				</>
			)}
		</div>
	</>;
}
