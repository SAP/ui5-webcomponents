import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js"
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Panel from "@ui5/webcomponents/dist/Panel.js";
import PanelAccessibleRole from "@ui5/webcomponents/dist/types/PanelAccessibleRole.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";


const component = "ui5-panel";

export default {
    title: "Main/Panel",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Panel>;

const Template : UI5StoryArgs<Panel, StoryArgsSlots> = (args) => html`
<ui5-panel
	accessible-role="${ifDefined(args.accessibleRole)}"
	header-text="${ifDefined(args.headerText)}"
	?fixed="${ifDefined(args.fixed)}"
	?collapsed="${ifDefined(args.collapsed)}"
	?no-animation="${ifDefined(args.noAnimation)}"
	header-level="${ifDefined(args.headerLevel)}"
	accessible-name="${ifDefined(args.accessibleName)}"
>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
</ui5-panel>`;

export const BasicPanel = Template.bind({});
BasicPanel.args = {
	default: `
	<h1 class="content-color">I am a native heading!</h1>
	<ui5-label wrapping-type="Normal">Short text.</ui5-label>
	<br/>
	<ui5-label wrapping-type="Normal">Another text.</ui5-label>
	<p class="content-color">Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
		Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
		commodo Lorem laboris nisi Lorem.
	</p>`,
	headerText: "Both expandable and expanded"
};

export const PanelWithList = Template.bind({});
PanelWithList.args = {
	default: `
	<ui5-list mode="MultiSelect">
		<ui5-li key="country1">Argentina</ui5-li>
		<ui5-li key="country2">Bulgaria</ui5-li>
		<ui5-li key="country3">China</ui5-li>
		<ui5-li key="country4">Germany</ui5-li>
		<ui5-li key="country5">Hungary</ui5-li>
		<ui5-li key="country6">England</ui5-li>
		<ui5-li key="country7">USA</ui5-li>
		<ui5-li key="country8">Canada</ui5-li>
	</ui5-list>`,
	headerText: "Select your country",
	accessibleRole: PanelAccessibleRole.Complementary
};


export const FixedPanel = Template.bind({});
FixedPanel.args = {
	default: `
	<ui5-list mode="SingleSelectBegin">
		<ui5-li key="country1">Argentina</ui5-li>
		<ui5-li key="country2">Bulgaria</ui5-li>
		<ui5-li key="country3">China</ui5-li>
		<ui5-li key="country4">Germany</ui5-li>
	</ui5-list>`,
	headerText: "Country Of Birth",
	accessibleRole: PanelAccessibleRole.Complementary,
	fixed: true
};
FixedPanel.storyName = "Fixed Panel (Can't be Collapsed/Expanded)";


export const PanelCustomHeader = Template.bind({});
PanelCustomHeader.decorators = [
	(story) => {
	return html`
<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
</style>
	${story()}`;
	}
]
PanelCustomHeader.args = {
	header: `
	<div slot="header" class="header">
		<ui5-title>Countries</ui5-title>
		<div>
			<ui5-button>Edit</ui5-button>
			<ui5-button design="Emphasized">Add</ui5-button>
			<ui5-button design="Negative">Remove</ui5-button>
		</div>
	</div>`,
	default: `
	<ui5-list mode="MultiSelect">
		<ui5-li key="country1">Argentina</ui5-li>
		<ui5-li key="country2">Bulgaria</ui5-li>
		<ui5-li key="country3">China</ui5-li>
	</ui5-list>`,
	accessibleRole: PanelAccessibleRole.Complementary
};
PanelCustomHeader.storyName = "Panel with Custom Header";
