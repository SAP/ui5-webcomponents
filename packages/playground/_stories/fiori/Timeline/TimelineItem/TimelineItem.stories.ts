import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type TimelineItem from "@ui5/webcomponents-fiori/dist/TimelineItem.js";

const component = "ui5-timeline-item";

export default {
	title: "Fiori/Timeline/Timeline Item",
	component: "TimelineItem",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<TimelineItem>;

const Template: UI5StoryArgs<TimelineItem, StoryArgsSlots> = (args) => html`
<ui5-timeline>
	<ui5-timeline-item
		title-text="${ifDefined(args.titleText)}"
		subtitle-text="${ifDefined(args.subtitleText)}"
		icon="${ifDefined(args.icon)}"
		name="${ifDefined(args.name)}"
		?name-clickable="${ifDefined(args.nameClickable)}"
		>
		${unsafeHTML(args.default)}
	</ui5-timeline-item>
</ui5-timeline>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	icon: "calendar",
	titleText: "Weekly Sync - CP Design",
	subtitleText: "27.07.2017 (11:00 - 12:30)",
	default: `<div>MR SOF02 2.43</div>`
};