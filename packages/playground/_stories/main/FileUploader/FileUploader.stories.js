import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/FileUploader",
    component: "ui5-file-uploader",
    subcomponents: {},
    argTypes,
};


export const Template0 = () => html`
<h3>Upload multiple images</h3>
	<div class="snippet">
		<ui5-file-uploader id="fileuploader1" accept="image/*" multiple="true">
			<ui5-button icon="upload">Upload Images</ui5-button>
		</ui5-file-uploader>
		<div id="result"></div>
		<script>
			var fileUploader = document.querySelector("#fileuploader1"),
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
		</script>
	</div>
`;

export const Template1 = () => html`
<h3>Upload Single File</h3>
	<div class="snippet">
		<ui5-file-uploader>
			<ui5-button>Upload Single File</ui5-button>
		</ui5-file-uploader>
	</div>
`;

export const Template2 = () => html`
<h3>File Uploader With No Input</h3>
	<div class="snippet">
		<ui5-file-uploader hide-input="">
			<ui5-button>Upload File</ui5-button>
		</ui5-file-uploader>
	</div>
`;

export const Template3 = () => html`
<h3>Custom File Uploaders</h3>
	<div class="snippet">
		<ui5-file-uploader hide-input="">
			<ui5-avatar icon="upload"></ui5-avatar>
		</ui5-file-uploader>
		<ui5-file-uploader hide-input="">
			<ui5-badge>Upload File</ui5-badge>
		</ui5-file-uploader>
	</div>
`;

export const Template4 = () => html`
<h3>Button With Icon File Uploader</h3>
	<div class="snippet">
		<ui5-file-uploader>
			<ui5-button icon="upload">Upload</ui5-button>
		</ui5-file-uploader>
		<ui5-file-uploader>
			<ui5-button icon="upload" icon-end="">Upload</ui5-button>
		</ui5-file-uploader>
		<ui5-file-uploader>
			<ui5-button icon="upload" icon-only=""></ui5-button>
		</ui5-file-uploader>
	</div>
`;