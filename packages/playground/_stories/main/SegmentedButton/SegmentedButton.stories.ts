import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";

const component = "ui5-segmented-button";

export default {
	title: "Main/SegmentedButton",
	component: "SegmentedButton",
	subcomponents: {'SegmentedButtonItem' : 'SegmentedButtonItem'},
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<SegmentedButton>;

const Template: UI5StoryArgs<SegmentedButton, StoryArgsSlots> = (args) => html`<ui5-segmented-button
	accessible-name="${ifDefined(args.accessibleName)}"
	mode="${ifDefined(args.mode)}"
>
	${unsafeHTML(args.default)}
</ui5-segmented-button>`;

export const Basic = Template.bind({});
Basic.args = {
	default: `<ui5-segmented-button-item>Map</ui5-segmented-button-item>
<ui5-segmented-button-item pressed="">Satellite</ui5-segmented-button-item>
<ui5-segmented-button-item>Terrain</ui5-segmented-button-item>`,
	accessibleName: "Geographic location",
};

export const WithIcons = Template.bind({});
WithIcons.args = {
	default: `<ui5-segmented-button-item icon="bold-text" pressed=""></ui5-segmented-button-item>
<ui5-segmented-button-item icon="underline-text"></ui5-segmented-button-item>
<ui5-segmented-button-item icon="italic-text"></ui5-segmented-button-item>`,
};
