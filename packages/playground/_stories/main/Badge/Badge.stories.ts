import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import { DocsPage } from "../../../.storybook/docs";
import type Badge from "@ui5/webcomponents/dist/Badge.js";

import { Basic as Icon } from "../Icon/Icon.stories.js";

const component = "ui5-badge";

export default {
	title: "Main/Badge",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<Badge>;

const Template: UI5StoryArgs<Badge, StoryArgsSlots> = (args) => {
	return html`
<ui5-badge
	color-scheme="${ifDefined(args.colorScheme)}"
	style="${ifDefined(args.style)}"
>
	${args.icon ? Icon({ name: args.icon, slot: "icon" }) : null}
	${unsafeHTML(args.default)}
</ui5-badge>`;
};

export const Basic = Template.bind({});
Basic.args = {
	colorScheme: "6",
	icon: "pending",
	default: "Pending"
};

export const Truncating = Template.bind({});
Truncating.args = {
	default: "This would truncate as it is too long",
	style: "width: 200px",
};

export const AllColorSchemes = Template.bind({});
AllColorSchemes.args = {}

const AllColorSchemes_badges = [
	{ icon: "accept", default: "" },
	{ icon: "sap-ui5", default: "" },
	{ icon: "add-equipment", default: "In progress" },
	{ icon: "lab", default: "" },
	{ icon: "email-read", default: "" },
	{ icon: "", default: "Pending" },
	{ icon: "lightbulb", default: "New idea" },
	{ icon: "locked", default: "Locked" },
	{ icon: "flight", default: "En route" },
	{ icon: "", default: "Archived" },
];

AllColorSchemes.decorators = [
	(story, ctx) => {
		return html`
			${AllColorSchemes_badges.map((badge, i) => {
			return story({
				args: {
					colorScheme: ctx.args.colorScheme || (i + 1).toString(),
					icon: ctx.args.icon || badge.icon,
					default: ctx.args.default || badge.default,
				}
			});
		})}`;
	}
];