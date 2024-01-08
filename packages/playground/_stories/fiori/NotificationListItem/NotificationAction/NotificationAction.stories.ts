import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";
import { DocsPage } from "../../../../.storybook/docs.js";
import type NotificationAction from "@ui5/webcomponents-fiori/dist/NotificationAction.js";

const component = "ui5-notification-action";

export default {
	title: "Fiori/Notification List Item/Notification Action",
	component: "NotificationAction",
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true }),
			story: {
				iframeHeight: "470px",
				inline: false,
			},
		},
	},
	argTypes,
} as Meta<NotificationAction>;

const Template: UI5StoryArgs<NotificationAction, StoryArgsSlots> = (args) => {
	return html`<ui5-list header-text="Notifications">
	<ui5-li-notification
		title-text="New order (#2525)"
		priority="High">
		<ui5-notification-action
			icon="${ifDefined(args.icon)}"
			text="${ifDefined(args.text)}"
			slot="actions">
		</ui5-notification-action>
		<ui5-avatar size="XS" slot="avatar">
			<img src="../assets/images/avatars/woman_avatar_1.png">
		</ui5-avatar>
		And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
	</ui5-li-notification>
</ui5-list>
`
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	text: "Accept",
	icon: "accept"
};