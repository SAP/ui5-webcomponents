import { html } from "lit";
import argTypes from "./argTypes.js";
import { ifDefined } from "lit/directives/if-defined.js";
export default {
    title: "Main/Range Slider",
    component: "RangeSlider",
    argTypes,
};
const Template = (args) => html `
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
export const Basic = Template.bind({});
Basic.decorators = [
    (story) => {
        return html `
			<div class="wrapper" style="margin-top:1rem;">
				${story()}
			</div>
		`;
    }
];
Basic.args = {
    min: 0,
    max: 100,
    step: 5,
    disabled: false,
    showTooltip: false,
    showTickmarks: false,
    labelInterval: 0,
    startValue: 0,
    endValue: 20
};
export const Tooltips = Template.bind({});
Tooltips.decorators = [
    (story) => {
        return html `
			<div class="wrapper" style="margin-top:1rem;">
				${story()}
			</div>
		`;
    }
];
Tooltips.args = {
    startValue: 3,
    endValue: 13,
    showTooltip: true
};
export const RangeSliderTickmarksTooltipLabel = Template.bind({});
RangeSliderTickmarksTooltipLabel.decorators = [
    (story) => {
        return html `
			<div class="wrapper" style="margin-top:1rem;">
				${story()}
			</div>
		`;
    }
];
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
RangeSliderTickmarksTooltipLabel.storyName = "Tooltips, Tickmarks and Labels";
//# sourceMappingURL=RangeSlider.stories.js.map