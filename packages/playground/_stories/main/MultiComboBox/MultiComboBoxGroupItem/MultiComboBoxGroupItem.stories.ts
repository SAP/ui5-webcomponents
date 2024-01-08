import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type MultiComboBoxGroupItem from "@ui5/webcomponents/dist/MultiComboBoxGroupItem.js";

const component = "ui5-mcb-group-item";

export default {
    title: "Main/Multi-Combo Box/Multi-Combo Box Group Item",
    component: "MultiComboBoxGroupItem",
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
        },
    },
    argTypes,
} as Meta<MultiComboBoxGroupItem>;

const Template: UI5StoryArgs<MultiComboBoxGroupItem, StoryArgsSlots> = (args) => html`
<ui5-multi-combobox>
<ui5-mcb-group-item text="${args.text}"></ui5-mcb-group-item>
<ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
<ui5-mcb-item text="Denmark"></ui5-mcb-item>
<ui5-mcb-item text="England"></ui5-mcb-item>
<ui5-mcb-item text="Germany"></ui5-mcb-item>
</ui5-multi-combobox>`;


export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Europe"
};