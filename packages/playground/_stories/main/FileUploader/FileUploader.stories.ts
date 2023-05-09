import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type FileUploader from "@ui5/webcomponents/dist/FileUploader.js";

const component = "ui5-file-uploader";

export default {
	title: "Main/FileUploader",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<FileUploader>;

const Template: UI5StoryArgs<FileUploader, StoryArgsSlots> = (args) => html`<ui5-file-uploader
	accept="${ifDefined(args.accept)}"
	?hide-input="${ifDefined(args.hideInput)}"
	?disabled="${ifDefined(args.disabled)}"
	?multiple="${ifDefined(args.multiple)}"
	name="${ifDefined(args.name)}"
	placeholder="${ifDefined(args.placeholder)}"
	value="${ifDefined(args.value)}"
	valueState="${ifDefined(args.valueState)}"
	id="${ifDefined(args.id)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.valueStateMessage)}
</ui5-file-uploader>`;

export const Basic = Template.bind({});
Basic.args = {
	default: `<ui5-button icon="upload">Upload Single File</ui5-button>`,
};

export const Custom = Template.bind({});
Custom.storyName = "With Custom Design ";
Custom.args = {
	hideInput: true,
	default: `<ui5-badge>Upload File</ui5-badge>`,
};

export const Advanced = Template.bind({});
Advanced.storyName = "Image Uploader";
Advanced.args = {
	id: "fileuploader",
	accept: "image/*",
	default: `<ui5-button icon="upload">Upload Images</ui5-button>`,
	multiple: true,
};
Advanced.decorators = [
	(story) => html`${story()}
	<div id="result"></div>
	<script>
		var fileUploader = document.querySelector("#fileuploader"),
			resultDiv = document.querySelector("#result");
		fileUploader.addEventListener("change", function(event) {
			var files = event.target.files;
			if (!files.length) {
				resultDiv.innerHTML = "<ui5-label>No Files Selected</ui5-label>";
			} else {
				resultDiv.innerHTML = "";
				resultDiv.style.marginTop = "1rem";
				for (var i = 0; i < files.length; i++) {
					var img = document.createElement("img");
					img.src = URL.createObjectURL(files[i]);
					img.width = 100;
					img.height = 100;
					img.onload = function() {
						URL.revokeObjectURL(img.src);
					}
					resultDiv.appendChild(img);
				}
			}
		})
	</script>`,
];
Advanced.parameters = {
	docs: {
		story: {
			inline: false,
		},
	}
};