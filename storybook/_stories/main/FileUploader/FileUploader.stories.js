import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/FileUploader",
    component: "FileUploader",
    argTypes,
};
const Template = (args) => html `<ui5-file-uploader
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
    default: `<ui5-button icon="upload" accessible-name-ref="upload-single-file-label">Upload Single File</ui5-button>`,
};
Basic.decorators = [
    (story) => html `<ui5-label id="upload-single-file-label" style="display: none">File Uploader, which accepts only one file.</ui5-label>
	${story()}`,
];
export const Advanced = Template.bind({});
Advanced.storyName = "Image Uploader";
Advanced.args = {
    id: "fileuploader",
    accept: "image/*",
    default: `<ui5-button icon="upload" accessible-name-ref="upload-img-label">Upload Images</ui5-button>`,
    multiple: true,
};
Advanced.decorators = [
    (story) => html `<ui5-label id="upload-img-label" style="display: none">File Uploader, which accepts only images.</ui5-label>
	${story()}
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
//# sourceMappingURL=FileUploader.stories.js.map