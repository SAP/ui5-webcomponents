import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ListItem from "@ui5/webcomponents/dist/ListItem.js";
import UploadState from "./types/UploadState.js";
import "@ui5/webcomponents-icons/dist/refresh.js";
import "@ui5/webcomponents-icons/dist/stop.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import type { IUploadCollectionItem } from "./UploadCollection.js";
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
declare class UploadCollectionItem extends ListItem implements IUploadCollectionItem {
    /**
     * Holds an instance of `File` associated with this item.
     * @default null
     * @public
     */
    file?: File | null;
    /**
     * The name of the file.
     * @default ""
     * @public
     */
    fileName: string;
    /**
     * If set to `true` the file name will be clickable and it will fire `file-name-click` event upon click.
     * @default false
     * @public
     */
    fileNameClickable: boolean;
    /**
     * Disables the delete button.
     * @default false
     * @public
     */
    disableDeleteButton: boolean;
    /**
     * By default, the delete button will always be shown, regardless of the `ui5-upload-collection`'s property `mode`.
     * Setting this property to `true` will hide the delete button.
     * @default false
     * @public
     */
    hideDeleteButton: boolean;
    /**
     * Hides the retry button when `uploadState` property is `Error`.
     * @default false
     * @public
     */
    hideRetryButton: boolean;
    /**
     * Hides the terminate button when `uploadState` property is `Uploading`.
     * @default false
     * @public
     */
    hideTerminateButton: boolean;
    /**
     * The upload progress in percentage.
     *
     * **Note:** Expected values are in the interval [0, 100].
     * @default 0
     * @public
     */
    progress: number;
    /**
     * If set to `Uploading` or `Error`, a progress indicator showing the `progress` is displayed.
     * Also if set to `Error`, a refresh button is shown. When this icon is pressed `retry` event is fired.
     * If set to `Uploading`, a terminate button is shown. When this icon is pressed `terminate` event is fired.
     * @default "Ready"
     * @public
     */
    uploadState: `${UploadState}`;
    /**
     * Indicates if editing.
     * @default false
     * @private
     */
    _editing: boolean;
    /**
     * A thumbnail, which will be shown in the beginning of the `ui5-upload-collection-item`.
     *
     * **Note:** Use `ui5-icon` or `img` for the intended design.
     * @public
     */
    thumbnail: Array<HTMLElement>;
    static i18nFioriBundle: I18nBundle;
    static onDefine(): Promise<void>;
    /**
     * @override
     */
    onDetailClick(): Promise<void>;
    _initInputField(): Promise<void>;
    _onDetailKeyup(e: KeyboardEvent): void;
    _onInputFocusin(e: FocusEvent): void;
    _onInputKeyDown(e: KeyboardEvent): void;
    _onRename(): void;
    _onRenameKeyup(e: KeyboardEvent): void;
    _onRenameCancel(e: KeyboardEvent): Promise<void>;
    _onRenameCancelKeyup(e: KeyboardEvent): void;
    _focus(): void;
    _onFileNameClick(): void;
    _onRetry(): void;
    _onRetryKeyup(e: KeyboardEvent): void;
    _onTerminate(): void;
    _onTerminateKeyup(e: KeyboardEvent): void;
    _onDelete(): void;
    getFocusDomRef(): HTMLElement | undefined;
    /**
     * @override
     */
    get classes(): {
        main: {
            "ui5-uci-root": boolean;
            "ui5-uci-root-editing": boolean;
            "ui5-uci-root-uploading": boolean;
        } | {
            "ui5-uci-root": boolean;
            "ui5-uci-root-editing": boolean;
            "ui5-uci-root-uploading": boolean;
        };
    };
    /**
     * @override
     */
    get renderUploadCollectionDeleteButton(): boolean;
    get _fileNameWithoutExtension(): string;
    get _fileExtension(): string;
    get _renameBtnText(): string;
    get _cancelRenameBtnText(): string;
    get _showProgressIndicator(): boolean;
    get _progressText(): string;
    get _showRetry(): boolean;
    get _showTerminate(): boolean;
    get _retryButtonTooltip(): string;
    get _terminateButtonTooltip(): string;
    get _editButtonTooltip(): string;
    get valueStateName(): ValueState;
    /**
     * override
     */
    get typeDetail(): boolean;
    get showEditButton(): boolean;
}
export default UploadCollectionItem;
