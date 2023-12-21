import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type SpecialCalendarDate from "@ui5/webcomponents/dist/SpecialCalendarDate.js";


const component = "ui5-special-date";

export default {
	title: "Main/Calendar/Special Calendar Date",
	component: "SpecialCalendarDate",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<SpecialCalendarDate>;

const Template: UI5StoryArgs<SpecialCalendarDate, StoryArgsSlots> = (args) => html`<ui5-calendar format-pattern="yyyy/MM/dd">
<ui5-special-date slot="specialDates" value="${ifDefined(args.value)}" type="${ifDefined(args.type)}" ui5-special-date=""></ui5-special-date>
</ui5-calendar>`;

var date = new Date();

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	type: "Type01",
	value: `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate() - 1}`,
}