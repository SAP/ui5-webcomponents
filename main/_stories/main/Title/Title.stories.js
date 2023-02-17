import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-title";
export default {
    title: "Main/Title",
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
<h3>Title in All Available Levels</h3>
	<div class="snippet flex-column">
		<ui5-title level="H1">Title level 1</ui5-title>
		<ui5-title level="H2">Title level 2</ui5-title>
		<ui5-title level="H3">Title level 3</ui5-title>
		<ui5-title level="H4">Title level 4</ui5-title>
		<ui5-title level="H5">Title level 5</ui5-title>
		<ui5-title level="H6">Title level 6</ui5-title>
	</div>
`;
//# sourceMappingURL=Title.stories.js.map