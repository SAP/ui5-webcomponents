import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-textarea";
export default {
    title: "Main/TextArea",
    component,
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic TextArea</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type as much text as you wish"></ui5-textarea>
	</div>
`;
export const Template1 = () => html `
<h3>TextArea with Maximum Length</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type no more than 10 symbols" maxlength="10" show-exceeded-text=""></ui5-textarea>
	</div>
`;
export const Template2 = () => html `
<h3>TextArea with Label</h3>
	<div class="snippet">
		<ui5-label for="textAreaWithLabelID">Description</ui5-label>
		<ui5-textarea id="textAreaWithLabelID" class="textarea-width" placeholder="Enter description"></ui5-textarea>
	</div>
`;
//# sourceMappingURL=TextArea.stories.js.map