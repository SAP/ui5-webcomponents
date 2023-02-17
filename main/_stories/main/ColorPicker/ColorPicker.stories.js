import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-color-picker";
export default {
    title: "Main/ColorPicker",
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
<h3>Pick color</h3>
	<div class="snippet">
		<ui5-color-picker></ui5-color-picker>
	</div>
`;
//# sourceMappingURL=ColorPicker.stories.js.map