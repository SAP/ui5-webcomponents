import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type DateRangePicker from "@ui5/webcomponents/dist/DateRangePicker.js";

const component = "ui5-daterange-picker";

export default {
    title: "Main/DateRangePicker",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<DateRangePicker>;

const Template: UI5StoryArgs<DateRangePicker, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic DateRangePicker</h3>
	<div class="snippet">
		<div class="daterange-picker-width">
			<ui5-daterange-picker id="mydaterange-picker1"></ui5-daterange-picker>
		</div>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>DateRangePicker with Minimum and Maximum Date - 1/1/2020 - 4/5/2020 format-pattern="dd/MM/yyyy"</h3>
	<div class="snippet">
		<div class="daterange-picker-width">
			<ui5-daterange-picker id="mydaterange-picker12" min-date="1/1/2020" max-date="4/5/2020" format-pattern="dd/MM/yyyy"></ui5-daterange-picker>
		</div>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>DateRangePicker with format-pattern='long'</h3>
	<div class="snippet">
		<div class="daterange-picker-width">
			<ui5-daterange-picker format-pattern="long"></ui5-daterange-picker>
		</div>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Disabled DateRangePicker</h3>
	<div class="snippet">
		<div class="daterange-picker-width">
			<ui5-daterange-picker disabled="" value="Mar 31, 2021 - Apr 9, 2021"></ui5-daterange-picker>
		</div>
	</div>
`;


export const Template4: StoryFn = () => html`
<h3>readonly DateRangePicker</h3>
	<div class="snippet">
		<div class="daterange-picker-width">
			<ui5-daterange-picker readonly="" value="Mar 31, 2021 - Apr 9, 2021"></ui5-daterange-picker>
		</div>
	</div>
`;
