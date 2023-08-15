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
    title: "Main/Text Area",
    component: "TextArea",
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

export const Basic = Template.bind({});
Basic.args = {
	placeholder: 'Enter text',
};


export const WithMaxLength = Template.bind({});
WithMaxLength.decorators = [
	(story) =>  html`
		${story()}
		<script>
		(() => {
			const textAreaMaxLength = document.getElementById("textArea-${index-1}");

			textAreaMaxLength.addEventListener("input", function (event) {
				let value = textAreaMaxLength.value.length;
				let maxLength = textAreaMaxLength.maxlength;
				let valueState = value > maxLength ? "Warning" : "None";
				let valueStateMessage = document.getElementById("warningMessage");
			
				textAreaMaxLength.valueState = valueState;

				if (valueState === "Warning" && !valueStateMessage) {
					valueStateMessage = document.createElement("div");
					valueStateMessage.id = "warningMessage"
					valueStateMessage.slot="valueStateMessage";
					valueStateMessage.textContent = "The characters limit is exceeded";

					event.target.appendChild(valueStateMessage);
				}
			});
		})()
		</script>`
];
WithMaxLength.args = {
	placeholder: 'Enter text',
	maxlength: 10,
	showExceededText: true

};

export const WithLabel = Template.bind({});
WithLabel.decorators = [
	(story) => {
		return html`
		<ui5-label for="textArea-${index}">Description</ui5-label>
		${story()}
		`;
	}
]
WithLabel.args = {
	placeholder: 'Enter description',
	required: true
};


