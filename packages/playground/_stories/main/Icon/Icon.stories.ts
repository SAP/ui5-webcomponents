import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Icon from "@ui5/webcomponents/dist/Icon.js";
import IconDesign from "@ui5/webcomponents/dist/types/IconDesign.js";

const component = "ui5-icon";

export default {
	title: "Main/Icon",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component }),
		},
	},
	argTypes,
} as Meta<Icon>;

const Template: UI5StoryArgs<Icon, StoryArgsSlots> = (args) =>
	html`<ui5-icon
	design="${ifDefined(args.design)}"
	?interactive="${ifDefined(args.interactive)}"
	name="${ifDefined(args.name)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-role="${ifDefined(args.accessibleRole)}"
	?show-tooltip="${ifDefined(args.showTooltip)}"
	style="${ifDefined(args.style)}"
></ui5-icon>`;

export const Basic = Template.bind({});
Basic.args = {
	name: "activities",
};

export const FioriToolsIcons = Template.bind({});
FioriToolsIcons.args = {
	name: "tnt/antenna",
};

export const Customized = Template.bind({});
Customized.args = {
	name: "employee",
	style: "width: 3rem; height: 3rem; font-size: 1.5rem; color: crimson; background-color: #fafafa",
};

export const SemanticDesign = Template.bind({});
SemanticDesign.args = {
	name: "employee",
	design: IconDesign.Positive,
};
