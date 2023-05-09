import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";

import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

const component = "ui5-textarea";
let index = 0;

export default {
    title: "Main/TextArea",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<TextArea>;

const Template: UI5StoryArgs<TextArea, StoryArgsSlots> = (args) => html`
<ui5-textarea
	id="textArea-${index++}"
	value="${ifDefined(args.value)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	?required="${ifDefined(args.required)}"
	placeholder="${ifDefined(args.placeholder)}"
	value-state="${ifDefined(args.valueState)}"
	rows="${ifDefined(args.rows)}"
	maxlength="${ifDefined(args.maxlength)}"
	?show-exceeded-text="${ifDefined(args.showExceededText)}"
	?growing="${ifDefined(args.growing)}"
	growing-max-lines="${ifDefined(args.growingMaxLines)}"
	name="${ifDefined(args.name)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
></ui5-textarea>`;

export const BasicTextArea = Template.bind({});
BasicTextArea.args = {
	placeholder: 'Type as much text as you wish',
};

export const TextAreaMaxLength = Template.bind({});
TextAreaMaxLength.args = {
	placeholder: 'Type no more than 10 symbols',
	maxlength: 10,
	showExceededText: true

};
TextAreaMaxLength.storyName = "Text Area with Maximum Length";

export const TextAreaLabel = Template.bind({});
TextAreaLabel.decorators = [
	(story) => {
		return html`
		<ui5-label for="textArea-${index}">Description</ui5-label>
		${story()}
		`;
	}
]
TextAreaLabel.args = {
	placeholder: 'Enter description',
	required: true

};


