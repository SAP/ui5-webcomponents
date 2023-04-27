import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";

const component = "ui5-button";

export default {
	title: "Main/Button",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<Button>;

const Template: UI5StoryArgs<Button, StoryArgsSlots> = (args) => html`<ui5-button
	design="${ifDefined(args.design)}"
	?disabled="${ifDefined(args.disabled)}"
	icon="${ifDefined(args.icon)}"
	?icon-end="${ifDefined(args.iconEnd)}"
	tooltip="${ifDefined(args.tooltip)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
>
	${unsafeHTML(args.default)}
</ui5-button>`;

export const Basic = Template.bind({});
Basic.args = {
	default: "Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
	default: "Disabled",
	disabled: true,
};

export const WithIconAndDesign = Template.bind({});
WithIconAndDesign.args = {
	default: "Warning",
	design: ButtonDesign.Attention,
	icon: "message-warning",
};

export const WithEndIcon = Template.bind({});
WithEndIcon.args = {
	default: "Download",
	icon: "download",
	iconEnd: true,
};

export const IconOnly = Template.bind({});
IconOnly.storyName = "Icon-only Button";
IconOnly.args = {
	design: ButtonDesign.Negative,
	icon: "cancel",
	accessibleName: "Cancel",
	accessibleNameRef: "lblCancel",
	tooltip: "Cancel",
};
IconOnly.decorators = [
	(story) => html`<ui5-label style="display:none;" id="lblCancel" aria-hidden="true">Cancel</ui5-label>
	${story()}`,
];