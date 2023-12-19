import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type CalendarDate from "@ui5/webcomponents/dist/CalendarDate.js";


const component = "ui5-date";

export default {
	title: "Main/Calendar/Calendar Date",
	component: "CalendarDate",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<CalendarDate>;

const Template: UI5StoryArgs<CalendarDate, StoryArgsSlots> = (args) => html`<ui5-calendar format-pattern="dd/MM/yyyy">
	<ui5-date value="${ifDefined(args.value)}"></ui5-date>
</ui5-calendar>`;

var date = new Date();

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	value: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}