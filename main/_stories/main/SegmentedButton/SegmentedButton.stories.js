import { html } from "lit-html";
import argTypes, { componentInfo } from "./argTypes.js";
import { DocsPage } from "../../../.storybook/docs";
const component = "ui5-segmented-button";
export default {
    title: "Main/SegmentedButton",
    component,
    subcomponents: { 'SegmentedButtonItem': 'ui5-segmented-button-item' },
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
};
const Template = (args) => html `<div></div>`;
export const Template0 = () => html `
<h3>Basic SegmentedButton</h3>
	<div class="snippet">
        <ui5-segmented-button accessible-name="Geographic location">
            <ui5-segmented-button-item>Map</ui5-segmented-button-item>
            <ui5-segmented-button-item pressed="">Satellite</ui5-segmented-button-item>
            <ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
        </ui5-segmented-button>
	</div>
`;
export const Template1 = () => html `
<h3>SegmentedButton with Icons</h3>
	<div class="snippet">
		<ui5-segmented-button>
			<ui5-segmented-button-item icon="employee" pressed=""></ui5-segmented-button-item>
			<ui5-segmented-button-item icon="menu"></ui5-segmented-button-item>
			<ui5-segmented-button-item icon="factory"></ui5-segmented-button-item>
		</ui5-segmented-button>
	</div>
`;
export const Template2 = () => html `
<h3>SegmentedButton with 5 SegmentedButtonItems</h3>
	<div class="snippet">
		<ui5-segmented-button>
			<ui5-segmented-button-item>Item</ui5-segmented-button-item>
			<ui5-segmented-button-item pressed="">Pressed SegmentedButtonItem With Bigger Text</ui5-segmented-button-item>
			<ui5-segmented-button-item>Item</ui5-segmented-button-item>
			<ui5-segmented-button-item>SegmentedButtonItem</ui5-segmented-button-item>
			<ui5-segmented-button-item>Press me</ui5-segmented-button-item>
		</ui5-segmented-button>
	</div>
`;
//# sourceMappingURL=SegmentedButton.stories.js.map