import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type MultiComboBoxItem from "@ui5/webcomponents/dist/MultiComboBoxItem.js";
import { ifDefined } from "lit-html/directives/if-defined.js";

const component = "ui5-mcb-item";

export default {
    title: "Main/Multi-Combo Box/Multi-Combo Box Item",
    component: "MultiComboBoxItem",
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
        },
    },
    argTypes,
} as Meta<MultiComboBoxItem>;

const Template: UI5StoryArgs<MultiComboBoxItem, StoryArgsSlots> = (args) => html`
<ui5-multi-combobox>
	<ui5-mcb-item
		text="${ifDefined(args.text)}"
		additional-text="${ifDefined(args.additionalText)}"
		?selected="${ifDefined(args.selected)}"
	></ui5-mcb-item>
</ui5-multi-combobox>`;


export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Argentina",
	selected: true
};