var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadCollectionItem_1;
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
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
import { UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT, UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT, UPLOADCOLLECTIONITEM_ERROR_STATE, UPLOADCOLLECTIONITEM_UPLOADING_STATE, UPLOADCOLLECTIONITEM_READY_STATE, UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT, UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT, UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT, } from "./generated/i18n/i18n-defaults.js";
// Template
import UploadCollectionItemTemplate from "./generated/templates/UploadCollectionItemTemplate.lit.js";
// Styles
import UploadCollectionItemCss from "./generated/themes/UploadCollectionItem.css.js";
/**
 * @class
 *
 * ### Overview
 * A component to be used within the `ui5-upload-collection`.
 *
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";`
 * @constructor
 * @extends ListItem
 * @public
 * @implements {IUploadCollectionItem}
 * @slot {Node[]} default - Hold the description of the `ui5-upload-collection-item`. Will be shown below the file name.
 * @since 1.0.0-rc.7
 */
let UploadCollectionItem = UploadCollectionItem_1 = class UploadCollectionItem extends ListItem {
    static async onDefine() {
        [UploadCollectionItem_1.i18nFioriBundle] = await Promise.all([
            getI18nBundle("@ui5/webcomponents-fiori"),
            super.onDefine(),
        ]);
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
        const inp = this.shadowRoot.querySelector("#ui5-uci-edit-input");
        inp.value = this._fileNameWithoutExtension;
        await renderFinished();
        const inpFocusDomRef = inp.getFocusDomRef();
        if (inpFocusDomRef) {
            inpFocusDomRef.focus();
            inpFocusDomRef.setSelectionRange(0, this._fileNameWithoutExtension.length);
        }
    }
    _onDetailKeyup(e) {
        if (isSpace(e)) {
            this.onDetailClick();
        }
    }
    _onInputFocusin(e) {
        // prevent focusing the whole upload collection item.
        e.stopPropagation();
    }
    _onInputKeyDown(e) {
        if (isEscape(e)) {
            this._onRenameCancel(e);
        }
        else if (isEnter(e)) {
            this._onRename();
        }
        else if (isSpace(e)) {
            e.stopImmediatePropagation();
        }
    }
    _onRename() {
        const inp = this.shadowRoot.querySelector("#ui5-uci-edit-input");
        this.fileName = inp.value + this._fileExtension;
        this.fireEvent("rename");
        this._editing = false;
        this._focus();
    }
    _onRenameKeyup(e) {
        if (isSpace(e)) {
            this._onRename();
        }
    }
    async _onRenameCancel(e) {
        this._editing = false;
        if (isEscape(e)) {
            await renderFinished();
            this.shadowRoot.querySelector(`#${this._id}-editing-button`).focus();
        }
        else {
            this._focus();
        }
    }
    _onRenameCancelKeyup(e) {
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
    _onRetryKeyup(e) {
        if (isSpace(e)) {
            this._onRetry();
        }
    }
    _onTerminate() {
        this.fireEvent("terminate");
    }
    _onTerminateKeyup(e) {
        if (isSpace(e)) {
            this._onTerminate();
        }
    }
    _onDelete() {
        this.fireEvent("_uci-delete");
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
    get renderUploadCollectionDeleteButton() {
        return !this.hideDeleteButton;
    }
    get _fileNameWithoutExtension() {
        return this.fileName.substring(0, this.fileName.length - this._fileExtension.length);
    }
    get _fileExtension() {
        return getFileExtension(this.fileName);
    }
    get _renameBtnText() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT);
    }
    get _cancelRenameBtnText() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT);
    }
    get _showProgressIndicator() {
        return this.uploadState !== UploadState.Complete;
    }
    get _progressText() {
        if (this.uploadState === UploadState.Uploading) {
            return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_UPLOADING_STATE);
        }
        if (this.uploadState === UploadState.Error) {
            return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_ERROR_STATE);
        }
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_READY_STATE);
    }
    get _showRetry() {
        return !this.hideRetryButton && this.uploadState === UploadState.Error;
    }
    get _showTerminate() {
        return !this.hideTerminateButton && this.uploadState === UploadState.Uploading;
    }
    get _retryButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT);
    }
    get _terminateButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT);
    }
    get _editButtonTooltip() {
        return UploadCollectionItem_1.i18nFioriBundle.getText(UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT);
    }
    get valueStateName() {
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
};
__decorate([
    property({ type: Object, noAttribute: true, defaultValue: null })
], UploadCollectionItem.prototype, "file", void 0);
__decorate([
    property()
], UploadCollectionItem.prototype, "fileName", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "fileNameClickable", void 0);
__decorate([
    property({ type: Boolean, noAttribute: false })
], UploadCollectionItem.prototype, "disableDeleteButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideDeleteButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideRetryButton", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "hideTerminateButton", void 0);
__decorate([
    property({ validator: Integer, defaultValue: 0 })
], UploadCollectionItem.prototype, "progress", void 0);
__decorate([
    property({ type: UploadState, defaultValue: UploadState.Ready })
], UploadCollectionItem.prototype, "uploadState", void 0);
__decorate([
    property({ type: Boolean })
], UploadCollectionItem.prototype, "_editing", void 0);
__decorate([
    slot({ type: HTMLElement })
], UploadCollectionItem.prototype, "thumbnail", void 0);
UploadCollectionItem = UploadCollectionItem_1 = __decorate([
    customElement({
        tag: "ui5-upload-collection-item",
        languageAware: true,
        styles: [ListItem.styles, UploadCollectionItemCss],
        template: UploadCollectionItemTemplate,
        dependencies: [
            ...ListItem.dependencies,
            Button,
            Input,
            Link,
            Label,
            ProgressIndicator,
        ],
    })
    /**
     * Fired when the file name is clicked.
     *
     * **Note:** This event is only available when `fileNameClickable` property is `true`.
     * @public
     */
    ,
    event("file-name-click")
    /**
     * Fired when the `fileName` property gets changed.
     *
     * **Note:** An edit button is displayed on each item,
     * when the `ui5-upload-collection-item` `type` property is set to `Detail`.
     * @public
     */
    ,
    event("rename")
    /**
     * Fired when the terminate button is pressed.
     *
     * **Note:** Terminate button is displayed when `uploadState` property is set to `Uploading`.
     * @public
     */
    ,
    event("terminate")
    /**
     * Fired when the retry button is pressed.
     *
     * **Note:** Retry button is displayed when `uploadState` property is set to `Error`.
     * @public
     */
    ,
    event("retry")
    /**
     * @since 1.0.0-rc.8
     * @private
     */
    ,
    event("_focus-requested")
    /**
     * @private
     */
    ,
    event("_uci-delete")
], UploadCollectionItem);
UploadCollectionItem.define();
export default UploadCollectionItem;
//# sourceMappingURL=UploadCollectionItem.js.map