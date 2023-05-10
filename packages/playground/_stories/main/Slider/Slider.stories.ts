import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Slider from "@ui5/webcomponents/dist/Slider.js";
import { ifDefined } from "lit/directives/if-defined.js";

const component = "ui5-slider";

export default {
    title: "Main/Slider",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Slider>;

const Template: UI5StoryArgs<Slider, StoryArgsSlots> = (args) => html`
<ui5-slider
	value="${ifDefined(args.value)}"
	min="${ifDefined(args.min)}"
	max="${ifDefined(args.max)}"
	step="${ifDefined(args.step)}"
	?show-tickmarks="${ifDefined(args.showTickmarks)}"
	label-interval="${ifDefined(args.labelInterval)}"
	?show-tooltip="${ifDefined(args.showTooltip)}"
	?disabled="${ifDefined(args.disabled)}"
	accessible-name="${ifDefined(args.accessibleName)}"
></ui5-slider>`;

export const BasicSlider = Template.bind({});

export const SliderTooltip = Template.bind({});
SliderTooltip.args = {
	min: 0,
	max: 20,
	showTooltip: true,
	labelInterval: 5

};
SliderTooltip.storyName = "Slider with Tooltip";

export const DisabledTickmarksLabel = Template.bind({});
DisabledTickmarksLabel.args = {
	min: 20,
	max: 100,
	labelInterval: 5,
	disabled: true,
	showTickmarks: true
};
DisabledTickmarksLabel.storyName = "Disabled Slider with Tickmarks and Labels";


export const TickmarksLabelTooltip = Template.bind({});
TickmarksLabelTooltip.args = {
	min: -20,
	max: 20,
	step: 2,
	value: 12,
	showTooltip: true,
	labelInterval: 2,
	showTickmarks: true
};
TickmarksLabelTooltip.storyName = "Slider Tooltip, Tickmarks and Labels";