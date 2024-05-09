import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type MultiComboBoxGroup from "@ui5/webcomponents/dist/MultiComboBoxGroup.js";

export default {
    title: "Main/Multi-Combo Box/Multi-Combo Box Group Item",
    component: "MultiComboBoxGroup",
    argTypes,
} as Meta<MultiComboBoxGroup>;

const Template: UI5StoryArgs<MultiComboBoxGroup, StoryArgsSlots> = (args) => html`
<ui5-multi-combobox>
<ui5-mcb-group text="${args.text}">
    <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
    <ui5-mcb-item text="Denmark"></ui5-mcb-item>
    <ui5-mcb-item text="England"></ui5-mcb-item>
    <ui5-mcb-item text="Germany"></ui5-mcb-item>
</ui5-mcb-group>
</ui5-multi-combobox>`;


export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Europe"
};