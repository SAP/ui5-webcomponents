import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type SegmentedButton from "@ui5/webcomponents/dist/SegmentedButton.js";

export default {
	title: "Main/Segmented Button",
	component: "SegmentedButton",
	argTypes,
} as Meta<SegmentedButton>;

const Template: UI5StoryArgs<SegmentedButton, StoryArgsSlots> = (args) => html`<ui5-segmented-button
	accessible-name="${ifDefined(args.accessibleName)}"
	selection-mode="${ifDefined(args.selectionMode)}"
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
