import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type DateTimePicker from "@ui5/webcomponents/dist/DateTimePicker.js";

const component = "ui5-datetime-picker";

export default {
    title: "Main/DateTimePicker",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<DateTimePicker>;

const Template: UI5StoryArgs<DateTimePicker, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>DateTimePicker</h3>
	<div class="snippet">
		<ui5-datetime-picker style="width: 230px"></ui5-datetime-picker>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>DateTimePicker with format-pattern</h3>
	<div class="snippet">
		<div style="display: flex; flex-direction: column;">
			<ui5-label>d/MM/yyyy, hh:mm aa</ui5-label>
			<ui5-datetime-picker style="width: 230px" format-pattern="dd/MM/yyyy, hh:mm aa" value="13/04/2020, 09:16 AM"></ui5-datetime-picker>
			<br/>
			<ui5-label>yyyy-MM-dd-hh:mm:ss aa</ui5-label>
			<ui5-datetime-picker style="width: 230px" format-pattern="yyyy-MM-dd-hh:mm:ss aa" value="2020-04-13-04:16:16 AM"></ui5-datetime-picker>
			<br/>
			<ui5-label>d/MM/yyyy, hh:mm:ss aa</ui5-label>
			<div style="display: flex; flex-direction: row;">
				<ui5-datetime-picker id="dt1" style="width: 230px" format-pattern="dd/MM/yyyy, hh:mm:ss aa" value="13/04/2020, 03:16:16 AM"></ui5-datetime-picker>
				<ui5-input id="input1" style="width: 320px"></ui5-input>
			</div>
		</div>
		<script>
			var counter = 0;
			input1.value = "{ value: 13/04/2020, 03:16:16 AM }";
			dt1.addEventListener("change", function(event) {
				input1.value = "{ value: " + dt1.value + " , valid: " + event.detail.valid + " }";
			});
		</script>
	</div>
`;
Template1.parameters = {
	docs: {
		story: {
			// Opt-out of inline rendering
			inline: false,
		},
	}
};

export const Template2: StoryFn = () => html`
<h3>DateTimePicker in states</h3>
	<div class="snippet">
		<ui5-datetime-picker value-state="Error"></ui5-datetime-picker>
		<ui5-datetime-picker value-state="Warning"></ui5-datetime-picker>
		<ui5-datetime-picker value-state="Information"></ui5-datetime-picker>
		<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
		<br/><br/>
		<ui5-datetime-picker readonly="" value="2020-04-13-04:16:16 AM"></ui5-datetime-picker>
		<ui5-datetime-picker disabled="" value="2020-04-13-04:16:16 AM"></ui5-datetime-picker>
	</div>
`;
