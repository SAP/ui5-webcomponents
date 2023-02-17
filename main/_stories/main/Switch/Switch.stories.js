import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-switch";
export default {
    title: "Main/Switch",
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
<h3>Basic Switch</h3>
	<div class="snippet">
		<ui5-switch text-on="On" text-off="Off"></ui5-switch>
		<ui5-switch text-on="On" text-off="Off" checked=""></ui5-switch>
		<ui5-switch></ui5-switch>
		<ui5-switch checked=""></ui5-switch>
		<ui5-switch text-on="Yes" text-off="No" disabled=""></ui5-switch>
		<ui5-switch text-on="Yes" text-off="No" checked="" disabled=""></ui5-switch>
	</div>
`;
export const Template1 = () => html `
<h3>Graphical Switch</h3>
	<div class="snippet">
		<ui5-switch accessible-name="graphical" design="Graphical"></ui5-switch>
		<ui5-switch accessible-name="graphical" design="Graphical" checked=""></ui5-switch>
		<ui5-switch accessible-name="graphical" design="Graphical" disabled=""></ui5-switch>
		<ui5-switch accessible-name="graphical" design="Graphical" checked="" disabled=""></ui5-switch>
	</div>
`;
//# sourceMappingURL=Switch.stories.js.map