import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import languageAware from "@ui5/webcomponents-base/dist/decorators/languageAware.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type { I18nText } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import Integer from "@ui5/webcomponents-base/dist/types/Integer.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItemType from "@ui5/webcomponents/dist/types/ListItemType.js";
import Button from "@ui5/webcomponents/dist/Button.js";
import Input from "@ui5/webcomponents/dist/Input.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import Link from "@ui5/webcomponents/dist/Link.js";
import ProgressIndicator from "@ui5/webcomponents/dist/ProgressIndicator.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
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
	// @ts-ignore
} from "./generated/i18n/i18n-defaults.js";

// Template
import UploadCollectionItemTemplate from "./generated/templates/UploadCollectionItemTemplate.lit.js";

// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";

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
 * @alias sap.ui.webc.fiori.UploadCollectionItem
 * @extends sap.ui.webc.main.ListItem
 * @tagname ui5-upload-collection-item
 * @public
 * @implements sap.ui.webc.fiori.IUploadCollectionItem
 * @since 1.0.0-rc.7
 */
@customElement("ui5-upload-collection-item")
@languageAware

/**
 * Fired when the file name is clicked.
 * <br><br>
 * <b>Note:</b> This event is only available when <code>fileNameClickable</code> property is <code>true</code>.
 *
 * @event sap.ui.webc.fiori.UploadCollectionItem#file-name-click
 * @public
 */
@event("file-name-click")

/**
 * Fired when the <code>fileName</code> property gets changed.
 * <br><br>
 * <b>Note:</b> An edit button is displayed on each item,
 * when the <code>ui5-upload-collection-item</code> <code>type</code> property is set to <code>Detail</code>.
 *
 * @event sap.ui.webc.fiori.UploadCollectionItem#rename
 * @public
 */
@event("rename")

/**
 * Fired when the terminate button is pressed.
 * <br><br>
 * <b>Note:</b> Terminate button is displayed when <code>uploadState</code> property is set to <code>Uploading</code>.
 *
 * @event sap.ui.webc.fiori.UploadCollectionItem#terminate
 * @public
 */
@event("terminate")

/**
 * Fired when the retry button is pressed.
 * <br><br>
 * <b>Note:</b> Retry button is displayed when <code>uploadState</code> property is set to <code>Error</code>.
 *
 * @event sap.ui.webc.fiori.UploadCollectionItem#retry
 * @public
 */
@event("retry")

/**
 * @since 1.0.0-rc.8
 *
 * @event
 * @private
 */
@event("_focus-requested")

class UploadCollectionItem extends ListItem {
	/**
	 * Holds an instance of <code>File</code> associated with this item.
	 *
	 * @type {File}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.file
	 * @defaultvalue null
	 * @public
	 */
	@property({ type: Object, noAttribute: true, defaultValue: null })
	file?: object;

	/**
	 * The name of the file.
	 *
	 * @type {string}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.fileName
	 * @defaultvalue ""
	 * @public
	 */
	@property()
	fileName!: string;

	/**
	 * If set to <code>true</code> the file name will be clickable and it will fire <code>file-name-click</code> event upon click.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.fileNameClickable
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	fileNameClickable!: boolean;

	/**
	 * Disables the delete button.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.disableDeleteButton
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean, noAttribute: false })
	disableDeleteButton!: boolean;

	/**
	 * By default, the Delete button will always be shown, regardless of the <code>ui5-upload-collection</code>'s property <code>mode</code>.
	 * Setting this property to <code>true</code> will hide the delete button.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.hideDeleteButton
	 * @defaultvalue false
	 */
	@property({ type: Boolean })
	hideDeleteButton!: boolean;

	/**
	 * Hides the retry button when <code>uploadState</code> property is <code>Error</code>.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.hideRetryButton
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideRetryButton!: boolean;

	/**
	 * Hides the terminate button when <code>uploadState</code> property is <code>Uploading</code>.
	 *
	 * @type {boolean}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.hideTerminateButton
	 * @defaultvalue false
	 * @public
	 */
	@property({ type: Boolean })
	hideTerminateButton!: boolean;

	/**
	 * The upload progress in percentage.
	 * <br><br>
	 * <b>Note:</b> Expected values are in the interval [0, 100].
	 *
	 * @type {sap.ui.webc.base.types.Integer}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.progress
	 * @defaultvalue 0
	 * @public
	 */
	@property({ validator: Integer, defaultValue: 0 })
	progress!: number;

	/**
	 * If set to <code>Uploading</code> or <code>Error</code>, a progress indicator showing the <code>progress</code> is displayed.
	 * Also if set to <code>Error</code>, a refresh button is shown. When this icon is pressed <code>retry</code> event is fired.
	 * If set to <code>Uploading</code>, a terminate button is shown. When this icon is pressed <code>terminate</code> event is fired.
	 *
	 * @type {sap.ui.webc.fiori.types.UploadState}
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.uploadState
	 * @defaultvalue "Ready"
	 * @public
	 */
	@property({ type: UploadState, defaultValue: UploadState.Ready })
	uploadState!: UploadState;

	/**
	 * Indicates if editing.
	 *
	 * @type {boolean}
	 * @defaultvalue false
	 * @private
	 */
	@property({ type: Boolean })
	_editing!: boolean;

	/**
	 * A thumbnail, which will be shown in the beginning of the <code>ui5-upload-collection-item</code>.
	 * <br><br>
	 * <b>Note:</b> Use <code>ui5-icon</code> or <code>img</code> for the intended design.
	 *
	 * @type {HTMLElement}
	 * @slot
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.thumbnail
	 * @public
	 */
	@slot({ type: HTMLElement })
	thumbnail!: Array<HTMLElement>;

	/**
	 * Hold the description of the <code>ui5-upload-collection-item</code>. Will be shown below the file name.
	 *
	 * @type {Node[]}
	 * @slot
	 * @name sap.ui.webc.fiori.UploadCollectionItem.prototype.default
	 * @public
	 */

	static i18nFioriBundle: I18nBundle;

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

	/**
	 * @override
	 */
	async onDetailClick() {
		super.onDetailClick();
		this._editing = true;

		await this._initInputField();
	}

	async _initInputField() {
		await renderFinished();

		const inp = this.shadowRoot!.querySelector<Input>("#ui5-uci-edit-input")!;
		inp.value = this._fileNameWithoutExtension;

		await renderFinished();

		const inpFocusDomRef = inp.getFocusDomRef() as HTMLInputElement;
		if (inpFocusDomRef) {
			inpFocusDomRef.focus();
			inpFocusDomRef.setSelectionRange(0, this._fileNameWithoutExtension.length);
		}
	}

	_onDetailKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this.onDetailClick();
		}
	}

	_onInputFocusin(e: FocusEvent) {
		// prevent focusing the whole upload collection item.
		e.stopPropagation();
	}

	_onInputKeyDown(e: KeyboardEvent) {
		if (isEscape(e)) {
			this._onRenameCancel(e);
		} else if (isEnter(e)) {
			this._onRename();
		} else if (isSpace(e)) {
			e.stopImmediatePropagation();
		}
	}

	_onRename() {
		const inp = this.shadowRoot!.querySelector<Input>("#ui5-uci-edit-input")!;
		this.fileName = inp.value + this._fileExtension;
		this.fireEvent("rename");

		this._editing = false;
		this._focus();
	}

	_onRenameKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onRename();
		}
	}

	async _onRenameCancel(e: KeyboardEvent) {
		this._editing = false;

		if (isEscape(e)) {
			await renderFinished();
			this.shadowRoot!.querySelector<Button>(`#${this._id}-editing-button`)!.focus();
		} else {
			this._focus();
		}
	}

	_onRenameCancelKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onRenameCancel(e);
		}
	}

	_focus() {
		this.fireEvent("_focus-requested");
	}

	_onFileNameClick() {
		this.fireEvent("file-name-click");
	}

	_onRetry() {
		this.fireEvent("retry");
	}

	_onRetryKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onRetry();
		}
	}

	_onTerminate() {
		this.fireEvent("terminate");
	}

	_onTerminateKeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._onTerminate();
		}
	}

	getFocusDomRef() {
		return this.getDomRef();
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
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT as I18nText);
	}

	get _cancelRenameBtnText() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT as I18nText);
	}

	get _showProgressIndicator() {
		return this.uploadState !== UploadState.Complete;
	}

	get _progressText() {
		if (this.uploadState === UploadState.Uploading) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_UPLOADING_STATE as I18nText);
		}

		if (this.uploadState === UploadState.Error) {
			return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_ERROR_STATE as I18nText);
		}

		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_READY_STATE as I18nText);
	}

	get _showRetry() {
		return !this.hideRetryButton && this.uploadState === UploadState.Error;
	}

	get _showTerminate() {
		return !this.hideTerminateButton && this.uploadState === UploadState.Uploading;
	}

	get _retryButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT as I18nText);
	}

	get _terminateButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT as I18nText);
	}

	get _editButtonTooltip() {
		return UploadCollectionItem.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT as I18nText);
	}

	get valueStateName(): ValueState {
		if (this.uploadState === UploadState.Error) {
			return ValueState.Error;
		}

		if (this.uploadState === UploadState.Ready || this.uploadState === UploadState.Uploading) {
			return ValueState.Information;
		}

		return ValueState.None;
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
