import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type RangeSlider from "@ui5/webcomponents/dist/RangeSlider.js";
import { ifDefined } from "lit/directives/if-defined.js";

const component = "ui5-range-slider";

export default {
    title: "Main/RangeSlider",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<RangeSlider>;

const Template: UI5StoryArgs<RangeSlider, StoryArgsSlots> = (args) => html`
<ui5-range-slider
	start-value="${ifDefined(args.startValue)}"
	end-value="${ifDefined(args.endValue)}"
	min="${ifDefined(args.min)}"
	max="${ifDefined(args.max)}"
	step="${ifDefined(args.step)}"
	?show-tickmarks="${ifDefined(args.showTickmarks)}"
	label-interval="${ifDefined(args.labelInterval)}"
	?show-tooltip="${ifDefined(args.showTooltip)}"
></ui5-range-slider>`;

export const BasicRangeSlider = Template.bind({});
BasicRangeSlider.args = {
	endValue: 20
};

export const RangeSliderCustomValues = Template.bind({});
RangeSliderCustomValues.args = {
	min: 100,
	max: 200,
	startValue: 120,
	endValue: 150
};
RangeSliderCustomValues.storyName = "Range Slider with Custom 'min', 'max', 'startValue' and 'endValue' Properties";

export const RangeSliderTooltip = Template.bind({});
RangeSliderTooltip.args = {
	startValue: 3,
	endValue: 13,
	showTooltip: true
};
RangeSliderTooltip.storyName = "Range Slider with Tooltips";

export const RangeSliderTickmarksCustomStep = Template.bind({});
RangeSliderTickmarksCustomStep.args = {
	step: 2,
	startValue: 12,
	endValue: 24,
	showTickmarks: true
};
RangeSliderTickmarksCustomStep.storyName = "Range Slider with Tickmarks and Custom Step";

export const RangeSliderTickmarksTooltipLabel = Template.bind({});
RangeSliderTickmarksTooltipLabel.args = {
	min: 0,
	max: 112,
	step: 2,
	startValue: 4,
	endValue: 12,
	labelInterval: 2,
	showTickmarks: true,
	showTooltip: true
};
RangeSliderTickmarksTooltipLabel.storyName = "Range Slider with Tooltips, Tickmarks and Labels";
