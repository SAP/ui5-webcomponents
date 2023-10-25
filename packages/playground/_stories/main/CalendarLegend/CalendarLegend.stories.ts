import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type CalendarLegend from "@ui5/webcomponents/dist/CalendarLegend.js";

const component = "ui5-calendar-legend";

export default {
	title: "Main/CalendarLegend",
	component: "CalendarLegend",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<CalendarLegend>;

const Template: UI5StoryArgs<CalendarLegend, StoryArgsSlots> = (args) => html`<ui5-calendar-legend
	?hide-today="${ifDefined(args.hideToday)}"
	?hide-selected-day="${ifDefined(args.hideSelectedDay)}"
	?hide-non-working-day="${ifDefined(args.hideNonWorkingDay)}"
	?hide-working-day="${ifDefined(args.hideWorkingDay)}"
>

	</ui5-calendar-legend>`;

export const Basic = Template.bind({});
Basic.decorators = [
	(story) => {
		return html`
			<ui5-calendar></ui5-calendar>
			${story()}
		`;
	},
];


