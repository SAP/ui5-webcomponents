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
	component: "Button",
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
	default: "Button Text",
	accessibleName: "Button with Accessible Name",
};

export const DifferentDesigns: StoryFn = () => html`
	<ui5-button design="${ButtonDesign.Emphasized}"> Emphasized </ui5-button>
	<ui5-button design="${ButtonDesign.Attention}"> Attention </ui5-button>
	<ui5-button design="${ButtonDesign.Positive}"> Positive </ui5-button>
	<ui5-button design="${ButtonDesign.Negative}"> Negative </ui5-button>
	<ui5-button design="${ButtonDesign.Transparent}"> Transparent </ui5-button>
`;

export const IconOnlyButtons: StoryFn = () => html`
	<ui5-button design="${ButtonDesign.Emphasized}" icon="business-suite/icon-target"></ui5-button>
	<ui5-button design="${ButtonDesign.Attention}" icon="message-warning" tooltip="Warning Button"></ui5-button>
	<ui5-button design="${ButtonDesign.Positive}" icon="business-suite/icon-completed" tooltip="Positive Button"></ui5-button>
	<ui5-button design="${ButtonDesign.Negative}" icon="cancel" tooltip="Negative Button"></ui5-button>
	<ui5-button design="${ButtonDesign.Transparent}" icon="account" tooltip="Transparent Button"></ui5-button>
`;
IconOnlyButtons.storyName = "Icon-Only Buttons";