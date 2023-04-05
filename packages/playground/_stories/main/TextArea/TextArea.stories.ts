import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type TextArea from "@ui5/webcomponents/dist/TextArea.js";

const component = "ui5-textarea";

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

const Template: UI5StoryArgs<TextArea, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic TextArea</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type as much text as you wish"></ui5-textarea>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>TextArea with Maximum Length</h3>
	<div class="snippet">
		<ui5-textarea class="textarea-width" placeholder="Type no more than 10 symbols" maxlength="10" show-exceeded-text=""></ui5-textarea>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>TextArea with Label</h3>
	<div class="snippet">
		<ui5-label for="textAreaWithLabelID">Description</ui5-label>
		<ui5-textarea id="textAreaWithLabelID" class="textarea-width" placeholder="Enter description"></ui5-textarea>
	</div>
`;
