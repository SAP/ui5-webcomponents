import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type SuggestionGroupItem from "@ui5/webcomponents/dist/SuggestionGroupItem.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

const component = "ui5-suggestion-group-item";

export default {
	title: "Main/Input/Suggestion Group Item",
	component: "SuggestionGroupItem",
	parameters: {
		docs: {
		  page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<SuggestionGroupItem>;

const Template: UI5StoryArgs<SuggestionGroupItem, StoryArgsSlots> = (args) => html`
<ui5-input
	show-suggestions
>
<ui5-suggestion-group-item text="${ifDefined(args.text)}"></ui5-suggestion-group-item>
<ui5-suggestion-item text="Germany"></ui5-suggestion-item>
<ui5-suggestion-item text="France"></ui5-suggestion-item>
</ui5-input>`;


export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Europe"
};