import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";
import customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";
import property from "@ui5/webcomponents-base/dist/decorators/property.js";
import event from "@ui5/webcomponents-base/dist/decorators/event.js";
import slot from "@ui5/webcomponents-base/dist/decorators/slot.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import litRender from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";
import { getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
import type I18nBundle from "@ui5/webcomponents-base/dist/i18nBundle.js";
import { getEventMark } from "@ui5/webcomponents-base/dist/MarkedEvents.js";
import { isEnter, isSpace } from "@ui5/webcomponents-base/dist/Keys.js";
import type { IFormInputElement } from "@ui5/webcomponents-base/dist/features/InputElementsFormSupport.js";
import {
	FILEUPLOAD_BROWSE,
	FILEUPLOADER_TITLE,
	VALUE_STATE_SUCCESS,
	VALUE_STATE_INFORMATION,
	VALUE_STATE_ERROR,
	VALUE_STATE_WARNING,
} from "./generated/i18n/i18n-defaults.js";

import Input from "./Input.js";
import Popover from "./Popover.js";
import Icon from "./Icon.js";

// Template
import FileUploaderTemplate from "./generated/templates/FileUploaderTemplate.lit.js";

// Styles
import FileUploaderCss from "./generated/themes/FileUploader.css.js";
import ResponsivePopoverCommonCss from "./generated/themes/ResponsivePopoverCommon.css.js";
import ValueStateMessageCss from "./generated/themes/ValueStateMessage.css.js";

type FileUploaderChangeEventDetail = {
	files: FileList | null,
}

/**
 * @class
 *
 * ### Overview
 *
 * The `ui5-file-uploader` opens a file explorer dialog and enables users to upload files.
 * The component consists of input field, but you can provide an HTML element by your choice
 * to trigger the file upload, by using the default slot.
 * Furthermore, you can set the property "hideInput" to "true" to hide the input field.
 *
 * To get all selected files, you can simply use the read-only "files" property.
 * To restrict the types of files the user can select, you can use the "accept" property.
 *
 * And, similar to all input based components, the FileUploader supports "valueState", "placeholder", "name", and "disabled" properties.
 *
 * For the `ui5-file-uploader`
 * ### ES6 Module Import
 *
 * `import "@ui5/webcomponents/dist/FileUploader.js";`
 * @constructor
 * @since 1.0.0-rc.6
 * @extends UI5Element
 * @public
 */
@customElement({
	tag: "ui5-file-uploader",
	languageAware: true,
	formAssociated: true,
	renderer: litRender,
	styles: [
		FileUploaderCss,
		ResponsivePopoverCommonCss,
		ValueStateMessageCss,
	],
	template: FileUploaderTemplate,
	dependencies: [
		Input,
		Popover,
		Icon,
	],
})
/**
 * Event is fired when the value of the file path has been changed.
 *
 * **Note:** Keep in mind that because of the HTML input element of type file, the event is also fired in Chrome browser when the Cancel button of the uploads window is pressed.
 * @param {FileList | null} files The current files.
 * @public
 */
@event<FileUploaderChangeEventDetail>("change", {
	detail: {
		/**
		 * @public
		 */
		files: { type: FileList },
	},
})
class FileUploader extends UI5Element implements IFormInputElement {
	/**
	 * Comma-separated list of file types that the component should accept.
	 *
	 * **Note:** Please make sure you are adding the `.` in front on the file type, e.g. `.png` in case you want to accept png's only.
	 * @default ""
	 * @public
	 */
	@property()
	accept?: string;

	/**
	 * If set to "true", the input field of component will not be rendered. Only the default slot that is passed will be rendered.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	hideInput = false;

	/**
	 * Defines whether the component is in disabled state.
	 *
	 * **Note:** A disabled component is completely noninteractive.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	disabled = false;

	/**
	 * Allows multiple files to be chosen.
	 * @default false
	 * @public
	 */
	@property({ type: Boolean })
	multiple = false;

	/**
	 * Determines the name by which the component will be identified upon submission in an HTML form.
	 *
	 * **Note:** This property is only applicable within the context of an HTML Form element.
	 * @default undefined
	 * @public
	 */
	@property()
	name?: string;

	/**
	 * Defines a short hint intended to aid the user with data entry when the component has no value.
	 * @default undefined
	 * @public
	 */
	@property()
	placeholder?: string;

	/**
	 * Defines the name/names of the file/files to upload.
	 * @default undefined
	 * @formEvents change
	 * @formProperty
	 * @public
	 */
	@property()
	value?: string;

	/**
	 * Defines the value state of the component.
	 * @default "None"
	 * @public
	 */
	@property()
	valueState: `${ValueState}` = "None";

	/**
	 * @private
	 */
	@property({ type: Boolean })
	focused = false;

	/**
	 * By default the component contains a single input field. With this slot you can pass any content that you wish to add. See the samples for more information.
	 *
	 * **Note:** If no content is provided in this slot, the component will only consist of an input field and will not be interactable using the keyboard.
	 * Also it is not recommended to use any non-interactable components, as it may lead to poor accessibility experience.
	 * @public
	 */
	@slot({ type: HTMLElement, "default": true })
	content!: Array<HTMLElement>;

	/**
	 * Defines the value state message that will be displayed as pop up under the component.
	 *
	 * **Note:** If not specified, a default text (in the respective language) will be displayed.
	 *
	 * **Note:** The `valueStateMessage` would be displayed,
	 * when the component is in `Information`, `Warning` or `Error` value state.
	 * @since 1.0.0-rc.9
	 * @public
	 */
	@slot()
	valueStateMessage!: Array<HTMLElement>;

	static emptyInput: HTMLInputElement;

	static i18nBundle: I18nBundle;

	async formElementAnchor() {
		return this.getFocusDomRefAsync();
	}

	/**
	 * @override
	 */
	getFocusDomRef(): HTMLElement | undefined {
		return this.content[0];
	}

	get formFormattedValue() {
		if (this.files && this.name) {
			const formData = new FormData();

			for (let i = 0; i < this.files.length; i++) {
				formData.append(this.name, this.files[i]);
			}

			return formData;
		}

		return null;
	}

	_onmouseover() {
		this.content.forEach(item => {
			item.classList.add("ui5_hovered");
		});
	}

	_onmouseout() {
		this.content.forEach(item => {
			item.classList.remove("ui5_hovered");
		});
	}

	_onclick(e: MouseEvent) {
		if (getEventMark(e) === "button") {
			this._input.click();
		}
	}

	_onkeydown(e: KeyboardEvent) {
		if (isEnter(e)) {
			this._input.click();
			e.preventDefault();
		}
	}

	_onkeyup(e: KeyboardEvent) {
		if (isSpace(e)) {
			this._input.click();
			e.preventDefault();
		}
	}

	_ondrag(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
	}

	_ondrop(e: DragEvent) {
		e.preventDefault();
		e.stopPropagation();
		const files = e.dataTransfer?.files;

		if (files) {
			this._input.files = files;
			this._updateValue(files);
			this.fireEvent<FileUploaderChangeEventDetail>("change", {
				files,
			});
		}
	}

	_onfocusin() {
		this.focused = true;
	}

	_onfocusout() {
		this.focused = false;
	}

	/**
	 * FileList of all selected files.
	 * @public
	 * @default null
	 */
	get files(): FileList | null {
		if (this._input) {
			return this._input.files;
		}

		return FileUploader._emptyFilesList;
	}

	onAfterRendering() {
		if (!this.value) {
			this._input.value = "";
		}

		this.toggleValueStatePopover(this.shouldOpenValueStateMessagePopover);
	}

	_onChange(e: Event) {
		const changedFiles = (e.target as HTMLInputElement).files;

		this._updateValue(changedFiles);
		this.fireEvent<FileUploaderChangeEventDetail>("change", {
			files: changedFiles,
		});
	}

	_updateValue(files: FileList | null) {
		this.value = Array.from(files || []).reduce((acc, currFile) => {
			return `${acc}"${currFile.name}" `;
		}, "");
	}

	toggleValueStatePopover(open: boolean) {
		if (open) {
			this.openValueStatePopover();
		} else {
			this.closeValueStatePopover();
		}
	}

	openValueStatePopover() {
		const popover = this._getPopover();

		if (popover) {
			popover.opener = this;
			popover.open = true;
		}
	}

	closeValueStatePopover() {
		const popover = this._getPopover();

		if (popover) {
			popover.open = false;
		}
	}

	_getPopover(): Popover {
		return this.shadowRoot!.querySelector<Popover>(".ui5-valuestatemessage-popover")!;
	}

	/**
	 * in case when the component is not placed in the DOM, return empty FileList, like native input would do
	 * @private
	 */
	static get _emptyFilesList() {
		if (!this.emptyInput) {
			this.emptyInput = document.createElement("input");
			this.emptyInput.type = "file";
		}
		return this.emptyInput.files;
	}

	get browseText(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOAD_BROWSE);
	}

	get titleText(): string {
		return FileUploader.i18nBundle.getText(FILEUPLOADER_TITLE);
	}

	get _input(): HTMLInputElement {
		return (this.shadowRoot!.querySelector<HTMLInputElement>("input[type=file]") || this.querySelector<HTMLInputElement>("input[type=file][data-ui5-form-support]"))!;
	}

	get valueStateTextMappings(): Record<string, string> {
		return {
			"Positive": FileUploader.i18nBundle.getText(VALUE_STATE_SUCCESS),
			"Information": FileUploader.i18nBundle.getText(VALUE_STATE_INFORMATION),
			"Negative": FileUploader.i18nBundle.getText(VALUE_STATE_ERROR),
			"Critical": FileUploader.i18nBundle.getText(VALUE_STATE_WARNING),
		};
	}

	get valueStateText(): string {
		return this.valueStateTextMappings[this.valueState];
	}

	get hasValueState(): boolean {
		return this.valueState !== ValueState.None;
	}

	get hasValueStateText(): boolean {
		return this.hasValueState && this.valueState !== ValueState.Positive;
	}

	get valueStateMessageText() {
		return this.getSlottedNodes("valueStateMessage").map(el => el.cloneNode(true));
	}

	get shouldDisplayDefaultValueStateMessage(): boolean {
		return !this.valueStateMessage.length && this.hasValueStateText;
	}

	get shouldOpenValueStateMessagePopover(): boolean {
		return this.focused && this.hasValueStateText && !this.hideInput;
	}

	/**
	 * This method is relevant for sap_horizon theme only
	 */
	get _valueStateMessageInputIcon(): string {
		const iconPerValueState = {
			Negative: "error",
			Critical: "alert",
			Positive: "sys-enter-2",
			Information: "information",
		};

		return this.valueState !== ValueState.None ? iconPerValueState[this.valueState] : "";
	}

	get classes() {
		return {
			popoverValueState: {
				"ui5-valuestatemessage-root": true,
				"ui5-valuestatemessage--success": this.valueState === ValueState.Positive,
				"ui5-valuestatemessage--error": this.valueState === ValueState.Negative,
				"ui5-valuestatemessage--warning": this.valueState === ValueState.Critical,
				"ui5-valuestatemessage--information": this.valueState === ValueState.Information,
			},
		};
	}

	get styles() {
		return {
			popoverHeader: {
				"width": `${this.ui5Input ? this.ui5Input.offsetWidth : 0}px`,
			},
		};
	}

	get ui5Input() {
		return this.shadowRoot!.querySelector<Input>(".ui5-file-uploader-input");
	}

	static async onDefine() {
		FileUploader.i18nBundle = await getI18nBundle("@ui5/webcomponents");
	}
}

FileUploader.define();

export default FileUploader;
export type {
	FileUploaderChangeEventDetail,
};
