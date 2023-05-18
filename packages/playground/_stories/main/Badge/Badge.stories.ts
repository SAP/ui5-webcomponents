import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import { DocsPage } from "../../../.storybook/docs";
import type Badge from "@ui5/webcomponents/dist/Badge.js";

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
	${unsafeHTML(args.icon)}
	${unsafeHTML(args.default)}
</ui5-badge>`;
};

export const Basic = Template.bind({});
Basic.args = {
	colorScheme: "6",
	icon: `<ui5-icon name="pending" slot="icon"></ui5-icon>`,
	default: "Pending"
};

export const Truncating = Template.bind({});
Truncating.args = {
	default: "This would truncate as it is too long",
	style: "width: 200px",
};

const getIconHTML = (name: string): string => `<ui5-icon name="${name}" slot="icon"></ui5-icon>`;
const AllColorSchemesBadges = [
	{ icon: getIconHTML("accept"), default: "" },
	{ icon: getIconHTML("sap-ui5"), default: "" },
	{ icon: getIconHTML("add-equipment"), default: "In progress" },
	{ icon: getIconHTML("lab"), default: "" },
	{ icon: getIconHTML("email-read"), default: "" },
	{ icon: "", default: "Pending" },
	{ icon: getIconHTML("lightbulb"), default: "New idea" },
	{ icon: getIconHTML("locked"), default: "Locked" },
	{ icon: getIconHTML("flight"), default: "En route" },
	{ icon: "", default: "Archived" },
];

export const AllColorSchemes = Template.bind({});
AllColorSchemes.decorators = [
	(story, ctx) => {
		return html`
			${AllColorSchemesBadges.map((badge, i) => {
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