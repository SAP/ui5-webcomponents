import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-bar";
export default {
    title: "Fiori/Bar",
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
<h3>Header Bar</h3>
	<div class="snippet">
		<ui5-bar design="Header">
			<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>
			<ui5-label id="basic-label">Header Title</ui5-label>
			<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
		</ui5-bar>
	</div>
`;
export const Template1 = () => html `
<h3>Subheader Bar</h3>
	<div class="snippet">
		<ui5-bar design="Subheader">
			<ui5-button icon="home" tooltip="Go home" slot="startContent"></ui5-button>
			<ui5-label id="basic-label">Subheader Title</ui5-label>
			<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
		</ui5-bar>
	</div>
`;
export const Template2 = () => html `
<h3>Footer Bar</h3>
	<div class="snippet">
		<ui5-bar design="Footer">
			<ui5-button design="Positive" slot="endContent">Agree</ui5-button>
			<ui5-button design="Negative" slot="endContent">Decline</ui5-button>
			<ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
		</ui5-bar>
	</div>
`;
export const Template3 = () => html `
<h3>FloatingFooter Bar</h3>
	<div class="snippet">
		<ui5-bar design="FloatingFooter">
			<ui5-button design="Positive" slot="endContent">Agree</ui5-button>
			<ui5-button design="Negative" slot="endContent">Decline</ui5-button>
			<ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
		</ui5-bar>
	</div>
`;
//# sourceMappingURL=Bar.stories.js.map