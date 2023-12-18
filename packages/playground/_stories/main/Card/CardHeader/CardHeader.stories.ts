import { html } from "lit";
import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";
import { DocsPage } from "../../../../.storybook/docs.js";
import type CardHeader from "@ui5/webcomponents/dist/CardHeader.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";

const component = "ui5-card-header";

export default {
	title: "Main/Card/Card Header",
	component: "CardHeader",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
		},
	},
	argTypes,
} as Meta<CardHeader>;

const Template: UI5StoryArgs<CardHeader, StoryArgsSlots> = (args) => {
	return html`
<ui5-card style="width: 22rem">
	<ui5-card-header
	slot="header"
	title-text="${ifDefined(args.titleText)}"
	subtitle-text="${ifDefined(args.subtitleText)}"
	status="${ifDefined(args.status)}"
	?interactive="${ifDefined(args.interactive)}"
	>
	${unsafeHTML(args.avatar)}
	${unsafeHTML(args.action)}
	</ui5-card-header>
		<ui5-list separators="None" style="margin-block-end: 0.75rem;">
		<ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
		<ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
		<ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
	</ui5-list>
</ui5-card>
	`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"]
Basic.args = {
	titleText: "Team Space",
	subtitleText: "Direct Reports",
	status: "3 of 10",
	action: `<ui5-button design="Transparent" slot="action">View All</ui5-button>`,
	avatar: `<ui5-icon name="group" slot="avatar"></ui5-icon>`,
	interactive: true,
};