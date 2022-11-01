import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ListItemType from "@ui5/webcomponents/dist/types/ListItemType.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ProgressIndicator from "@ui5/webcomponents/dist/ProgressIndicator.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import getFileExtension from "@ui5/webcomponents-base/dist/util/getFileExtension.js";
import { renderFinished } from "@ui5/webcomponents-base/dist/Render.js";
import { isEnter, isEscape, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import UploadState from "./types/UploadState.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import {
	UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT,
	UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT,
	UPLOADCOLLECTIONITEM_ERROR_STATE,
	UPLOADCOLLECTIONITEM_UPLOADING_STATE,
	UPLOADCOLLECTIONITEM_READY_STATE,
	UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT,
	UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT,
	UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT,
} from "./generated/i18n/i18n-defaults.js";

// Template
import UploadCollectionItemTemplate from "./generated/templates/UploadCollectionItemTemplate.lit.js";

// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";

/**
 * @public
 */
const metadata = {
	tag: "ui5-upload-collection-item",
	languageAware: true,
	properties: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		/**
		 * Holds an instance of <code>File</code> associated with this item.
		 *
		 * @type {File}
		 * @defaultvalue null
		 * @public
		 */
		file: {
			type: Object,
			defaultValue: null,
		},

		/**
		 * The name of the file.
		 *
		 * @type {string}
		 * @defaultvalue ""
		 * @public
		 */
		fileName: {
			type: String,
		},

		/**
		 * If set to <code>true</code> the file name will be clickable and it will fire <code>file-name-click</code> event upon click.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		fileNameClickable: {
			type: Boolean,
		},

		/**
		 * Disables the delete button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		disableDeleteButton: {
			type: Boolean,
		},

		/**
		 * By default, the Delete button will always be shown, regardless of the <code>ui5-upload-collection</code>'s property <code>mode</code>.
		 * Setting this property to <code>true</code> will hide the delete button.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 */
		hideDeleteButton: {
			type: Boolean,
		},

		/**
		 * Hides the retry button when <code>uploadState</code> property is <code>Error</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideRetryButton: {
			type: Boolean,
		},

		/**
		 * Hides the terminate button when <code>uploadState</code> property is <code>Uploading</code>.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @public
		 */
		hideTerminateButton: {
			type: Boolean,
		},

		/**
		 * The upload progress in percentage.
		 * <br><br>
		 * <b>Note:</b> Expected values are in the interval [0, 100].
		 *
		 * @type {sap.ui.webcomponents.base.types.Integer}
		 * @defaultvalue 0
		 * @public
		 */
		progress: {
			type: Integer,
			defaultValue: 0,
		},

		/**
		 * If set to <code>Uploading</code> or <code>Error</code>, a progress indicator showing the <code>progress</code> is displayed.
		 * Also if set to <code>Error</code>, a refresh button is shown. When this icon is pressed <code>retry</code> event is fired.
		 * If set to <code>Uploading</code>, a terminate button is shown. When this icon is pressed <code>terminate</code> event is fired.
		 *
		 * @type {sap.ui.webcomponents.fiori.types.UploadState}
		 * @defaultvalue "Ready"
		 * @public
		 */
		uploadState: {
			type: UploadState,
			defaultValue: UploadState.Ready,
		},

		/**
		 * Indicates if editing.
		 *
		 * @type {boolean}
		 * @defaultvalue false
		 * @private
		 */
		_editing: {
			type: Boolean,
		},
	},
	slots: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		/**
		 * Hold the description of the <code>ui5-upload-collection-item</code>. Will be shown below the file name.
		 *
		 * @type {Node[]}
		 * @slot
		 * @public
		 */
		"default": {
			type: Node,
		},

		/**
		 * A thumbnail, which will be shown in the beginning of the <code>ui5-upload-collection-item</code>.
		 * <br><br>
		 * <b>Note:</b> Use <code>ui5-icon</code> or <code>img</code> for the intended design.
		 *
		 * @type {HTMLElement}
		 * @slot
		 * @public
		 */
		thumbnail: {
			type: HTMLElement,
		},
	},
	events: /** @lends sap.ui.webcomponents.fiori.UploadCollectionItem.prototype */ {
		/**
		 * Fired when the file name is clicked.
		 * <br><br>
		 * <b>Note:</b> This event is only available when <code>fileNameClickable</code> property is <code>true</code>.
		 *
		 * @event sap.ui.webcomponents.fiori.UploadCollectionItem#file-name-click
		 * @public
		 */
		"file-name-click": { },

		/**
		 * Fired when the <code>fileName</code> property gets changed.
		 * <br><br>
		 * <b>Note:</b> An edit button is displayed on each item,
		 * when the <code>ui5-upload-collection-item</code> <code>type</code> property is set to <code>Detail</code>.
		 *
		 * @event
		 * @public
		 */
		rename: { },

		/**
		 * Fired when the terminate button is pressed.
		 * <br><br>
		 * <b>Note:</b> Terminate button is displayed when <code>uploadState</code> property is set to <code>Uploading</code>.
		 *
		 * @event
		 * @public
		 */
		terminate: {},

		/**
		 * Fired when the retry button is pressed.
		 * <br><br>
		 * <b>Note:</b> Retry button is displayed when <code>uploadState</code> property is set to <code>Error</code>.
		 * @event
		 * @public
		 */
		retry: {},

		/**
		 * @since 1.0.0-rc.8
		 * @event
		 * @private
		 */
		"_focus-requested": {},
	},
};

/**
 * @class
 *
 * <h3 class="comment-api-title">Overview</h3>
 * A component to be used within the <code>ui5-upload-collection</code>.
 *
 * <h3>ES6 Module Import</h3>
 *
 * <code>import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";</code>
 *
 * @constructor
 * @author SAP SE
 * @alias sap.ui.webcomponents.fiori.UploadCollectionItem
 * @extends sap.ui.webcomponents.main.ListItem
 * @tagname ui5-upload-collection-item
 * @public
 * @implements sap.ui.webcomponents.fiori.IUploadCollectionItem
 * @since 1.0.0-rc.7
 */
class UploadCollectionItem extends ListItem {
	static get metadata() {
		return metadata;
	}

	static get styles() {
		return [ListItem.styles, UploadCollectionItemCss];
	}

	static get template() {
		return UploadCollectionItemTemplate;
	}

	static get dependencies() {
		return [
			...ListItem.dependencies,
			Button,
			Input,
			Link,
			Label,
			ProgressIndicator,
		];
	}

	static async onDefine() {
		[UploadCollectionItem.i18nFioriBundle] = await Promise.all([
			getI18nBundle("@ui5/webcomponents-fiori"),
			super.onDefine(),
		]);
	}

	onBeforeRendering() {
		// In the base class the item can become "actionable",
		// that's why we are overriding this method.
	}

	async _initInputField() {
		await renderFinished();

		const inp = this.shadowRoot.getElementById("ui5-uci-edit-input");
		inp.value = this._fileNameWithoutExtension;

		await renderFinished();

		const inpFocusDomRef = inp.getFocusDomRef();

		if (inpFocusDomRef) {
			inpFocusDomRef.focus();
			inpFocusDomRef.setSelectionRange(0, this._fileNameWithoutExtension.length);
		}
	}

	/**
	 * @override
	 */
	async onDetailClick(event) {
		super.onDetailClick(event);
		this._editing = true;

		await this._initInputField();
	}

	_onDetailKeyup(event) {
		if (isSpace(event)) {
			this.onDetailClick(event);
		}
	}

	_onInputFocusin(event) {
		// prevent focusing the whole upload collection item.
		event.stopPropagation();
	}

	_onInputKeyDown(event) {
		if (isEscape(event)) {
			this._onRenameCancel(event);
		} else if (isEnter(event)) {
			this._onRename();
		} else if (isSpace(event)) {
			event.stopImmediatePropagation();
		}
	}

	_onRename(event) {
		const inp = this.shadowRoot.getElementById("ui5-uci-edit-input");
		this.fileName = inp.value + this._fileExtension;
		this.fireEvent("rename");

		this._editing = false;
		this._focus();
	}

	_onRenameKeyup(event) {
		if (isSpace(event)) {
			this._onRename(event);
		}
	}

	async _onRenameCancel(event) {
		this._editing = false;

		if (isEscape(event)) {
			await renderFinished();
			this.shadowRoot.getElementById(`${this._id}-editing-button`).focus();
		} else {
			this._focus();
		}
	}

	_onRenameCancelKeyup(event) {
		if (isSpace(event)) {
			this._onRenameCancel(event);
		}
	}

	_focus() {
		this.fireEvent("_focus-requested");
	}

	_onFileNameClick(event) {
		this.fireEvent("file-name-click");
	}

	_onRetry(event) {
		this.fireEvent("retry");
	}

	_onRetryKeyup(event) {
		if (isSpace(event)) {
			this._onRetry(event);
		}
	}

	_onTerminate(event) {
		this.fireEvent("terminate");
	}

	_onTerminateKeyup(event) {
		if (isSpace(event)) {
			this._onTerminate(event);
		}
	}

	getFocusDomRef() {
		return this.getDomRef();
	}

	get list() {
		return this.assignedSlot.parentElement;
	}

	/**
	 * @override
	 */
	get classes() {
		const result = super.classes;

		return {
			main: {
				...result.main,
				"ui5-uci-root": true,
				"ui5-uci-root-editing": this._editing,
				"ui5-uci-root-uploading": this.uploadState === UploadState.Uploading,
			},
		};
	}

	/**
	 * @override
	 */
	get renderDeleteButton() {
		return !this.hideDeleteButton;
	}

	/**
	 * @override
	 */
	get placeSelectionElementAfter() {
		return true;
	}

	/**
	 * @override
	 */
	get placeSelectionElementBefore() {
		return false;
	}

	get _fileNameWithoutExtension() {
		return this.fileName.substring(0, this.fileName.length - this._fileExtension.length);
	}

	get _fileExtension() {
		return getFileExtension(this.fileName);
	}

	get _renameBtnText() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT);
	}

	get _cancelRenameBtnText() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT);
	}

	get _showProgressIndicator() {
		return this.uploadState !== UploadState.Complete;
	}

	get _progressText() {
		if (this.uploadState === UploadState.Uploading) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_UPLOADING_STATE);
		}

		if (this.uploadState === UploadState.Error) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_ERROR_STATE);
		}

		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_READY_STATE);
	}

	get _showRetry() {
		return !this.hideRetryButton && this.uploadState === UploadState.Error;
	}

	get _showTerminate() {
		return !this.hideTerminateButton && this.uploadState === UploadState.Uploading;
	}

	get _retryButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT);
	}

	get _terminateButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT);
	}

	get _editButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT);
	}

	get valueStateName() {
		if (this.uploadState === UploadState.Error) {
			return "Error";
		}

		if (this.uploadState === UploadState.Ready || this.uploadState === UploadState.Uploading) {
			return "Information";
		}

		return undefined;
	}

	/**
	 * override
	 */
	get typeDetail() {
		return false;
	}

	get showEditButton() {
		return this.type === ListItemType.Detail;
	}
}

UploadCollectionItem.define();

export default UploadCollectionItem;
