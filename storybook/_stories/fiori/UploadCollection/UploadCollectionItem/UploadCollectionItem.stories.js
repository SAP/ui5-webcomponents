import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Fiori/Upload Collection/Upload Collection Item",
    component: "UploadCollectionItem",
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-upload-collection>
	<ui5-upload-collection-item
		file-name="${ifDefined(args.fileName)}"
		accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
		?navigated="${ifDefined(args.navigated)}"
		?selected="${ifDefined(args.selected)}"
		upload-state="${ifDefined(args.uploadState)}"
		type="${ifDefined(args.type)}"
		progress="${ifDefined(args.progress)}"
		?file-name-clickable="${ifDefined(args.fileNameClickable)}"
		?disable-delete-button="${ifDefined(args.disableDeleteButton)}"
		?hide-delete-button="${ifDefined(args.hideDeleteButton)}"
		?hide-retry-button="${ifDefined(args.hideRetryButton)}"
		?hide-terminate-button="${ifDefined(args.hideTerminateButton)}"
		tooltip="${ifDefined(args.tooltip)}"
	>
		${unsafeHTML(args.default)}
		${unsafeHTML(args.thumbnail)}
	</ui5-upload-collection-item>
</ui5-upload-collection>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    fileName: "latest-reports.pdf",
    fileNameClickable: false,
    uploadState: "Error",
    default: `uploadState="Error"`,
    thumbnail: `<ui5-icon name="document-text" slot="thumbnail"></ui5-icon>`,
    type: "Active",
    progress: 59
};
//# sourceMappingURL=UploadCollectionItem.stories.js.map