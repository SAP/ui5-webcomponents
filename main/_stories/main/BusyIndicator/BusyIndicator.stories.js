import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-busy-indicator";
export default {
    title: "Main/BusyIndicator",
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
<h3>Busy Indicator with different size</h3>
		<div class="snippet flex center">
			<ui5-busy-indicator active="" size="Small"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Medium"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Large"></ui5-busy-indicator>
		</div>
`;
export const Template1 = () => html `
<h3>Busy Indicator wrapping other elements</h3>
	<div class="snippet flex">
		<ui5-button id="fetch-btn" style="width: 120px;">Fetch List Data</ui5-button>
		<ui5-busy-indicator id="busy-container" size="Medium">
			<ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
		</ui5-busy-indicator>
	</div>
`;
//# sourceMappingURL=BusyIndicator.stories.js.map