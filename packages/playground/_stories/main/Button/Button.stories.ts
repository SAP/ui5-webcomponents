import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Button from "@ui5/webcomponents/dist/Button.js";
import ButtonDesign from "@ui5/webcomponents/dist/types/ButtonDesign.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

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

const Template: UI5StoryArgs<Button, StoryArgsSlots> = (args) => html`
<ui5-button
	design="${ifDefined(args.design)}"
	?disabled="${ifDefined(args.disabled)}"
	icon="${ifDefined(args.icon)}"
	icon-end="${ifDefined(args.iconEnd)}"
	tooltip="${ifDefined(args.tooltip)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
	accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
	>${unsafeHTML(args.default)}</ui5-button
>`;

export const Basic = Template.bind({});
Basic.storyName = "Basic button with text";
Basic.args = {
	default: "Default",
	design: ButtonDesign.Default
};

export const TransparentDesign = Template.bind({});
TransparentDesign.storyName = "Button with design";
TransparentDesign.args = {
	default: "Transparent",
	design: ButtonDesign.Transparent
};

export const Disabled = Template.bind({});
Disabled.storyName = "Disabled button";
Disabled.args = {
	default: "Disabled",
	disabled: true
};

export const IconAndDesign = Template.bind({});
IconAndDesign.storyName = "Button with an icon and design";
IconAndDesign.args = {
	default: "Warning",
	design: ButtonDesign.Attention,
	icon: "message-warning"
};

export const IconEnd = Template.bind({});
IconEnd.storyName = "Button with an end icon";
IconEnd.args = {
	default: "Download",
	icon: "download",
	iconEnd: true
};

export const IconOnly = Template.bind({});
IconOnly.storyName = "Icon-only button";
IconOnly.args = {
	design: ButtonDesign.Negative,
	icon: "cancel",
	accessibleName: "Cancel",
	accessibleNameRef: "lblCancel",
	tooltip: "Cancel"
};
IconOnly.decorators = [
	(story) => html`
		<ui5-label style="display:none;" id="lblCancel" aria-hidden="true">Cancel</ui5-label>
		${story()}
	`,
];