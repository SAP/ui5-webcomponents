import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type SegmentedButtonItem from "@ui5/webcomponents/dist/SegmentedButtonItem.js";

export default {
	title: "Main/Segmented Button/Segmented Button Item",
	component: "SegmentedButtonItem",
	argTypes,
} as Meta<SegmentedButtonItem>;

const Template: UI5StoryArgs<SegmentedButtonItem, StoryArgsSlots> = (args) => html`
<ui5-segmented-button>
	<ui5-segmented-button-item>Map</ui5-segmented-button-item>
	<ui5-segmented-button-item
		design="${ifDefined(args.design)}"
		?icon-end="${ifDefined(args.iconEnd)}"
		?submits="${ifDefined(args.submits)}"
		?selected="${ifDefined(args.selected)}"
		accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
		accessible-name="${ifDefined(args.accessibleName)}"
		accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
		?disabled="${ifDefined(args.disabled)}"
		icon="${ifDefined(args.icon)}"
		tooltip="${ifDefined(args.tooltip)}"
		type="${ifDefined(args.type)}"
	>${unsafeHTML(args.default)}</ui5-segmented-button-item>
	<ui5-segmented-button-item>Terrain</ui5-segmented-button-item>
</ui5-segmented-button>`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	default: "Current item",
	selected: true,
};