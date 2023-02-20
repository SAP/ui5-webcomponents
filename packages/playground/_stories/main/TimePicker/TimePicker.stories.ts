import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type TimePicker from "@ui5/webcomponents/dist/TimePicker.js";

const component = "ui5-time-picker";

export default {
    title: "Main/TimePicker",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<TimePicker>;

const Template: UI5StoryArgs<TimePicker, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic TimePicker</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1"></ui5-time-picker>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>TimePicker in twelve hours format</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1" format-pattern="hh:mm:ss a"></ui5-time-picker>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>TimePicker with only minutes and seconds</h3>
	<div class="snippet">
			<ui5-time-picker id="timepicker1" format-pattern="mm:ss"></ui5-time-picker>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>TimePicker with value-state and valueStateMessage</h3>
	<div class="snippet">
		<ui5-time-picker id="timepicker3" format-pattern="mm:ss" value-state="Error">
			<div slot="valueStateMessage">Please provide valid value</div>
		</ui5-time-picker>
	</div>
`;
