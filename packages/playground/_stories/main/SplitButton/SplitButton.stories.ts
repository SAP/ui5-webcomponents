import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type SplitButton from "@ui5/webcomponents/dist/SplitButton.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

const component = "ui5-split-button";

export default {
	title: "Main/SplitButton",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
},
argTypes,
} as Meta<SplitButton>;

const Template: UI5StoryArgs<SplitButton, StoryArgsSlots> = (args) => html`<ui5-split-button
	?disabled="${ifDefined(args.disabled)}"
	design="${ifDefined(args.design)}"
	icon="${ifDefined(args.icon)}"
	active-icon="${ifDefined(args.activeIcon)}"
	accessible-name="${ifDefined(args.accessibleName)}"
>
	${unsafeHTML(args.default)}
</ui5-split-button>`;

export const Basic = Template.bind({});
Basic.args = {
	default: "Default",
};

export const Disabled = Template.bind({});
Disabled.storyName = "Disabled SplitButton";
Disabled.args = {
	default: "Disabled",
	disabled: true,
};

export const Design = Template.bind({});
Design.args = {
	default: "Attention",
	design: ButtonDesign.Attention,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
	default: "Icon",
	icon: "add",
};

export const WithActiveIcon = Template.bind({});
WithActiveIcon.args = {
	default: "Press Me",
	icon: "add",
	activeIcon: "accept",
};