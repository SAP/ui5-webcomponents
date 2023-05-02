import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type RatingIndicator from "@ui5/webcomponents/dist/RatingIndicator.js";

const component = "ui5-rating-indicator";

export default {
    title: "Main/RatingIndicator",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<RatingIndicator>;

const Template: UI5StoryArgs<RatingIndicator, StoryArgsSlots> = (args) => html`
<ui5-rating-indicator
	value="${ifDefined(args.value)}"
	max="${ifDefined(args.max)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	accessible-нame="${ifDefined(args.accessibleName)}"
></ui5-rating-indicator>`;

export const BasicRatingIndicator = Template.bind({});
BasicRatingIndicator.args = {
	value: 3.7
};

export const RatingIndicatorMax = Template.bind({});
RatingIndicatorMax.args = {
	value: 5,
	max: 10
};
RatingIndicatorMax.storyName = "Rating Indicator with Max Value";


export const DisabledRatingIndicator: StoryFn = Template.bind({});
DisabledRatingIndicator.args = {
	value: 5,
	max: 10,
	disabled: true
};

export const ReadonlyRatingIndicator: StoryFn = Template.bind({});
ReadonlyRatingIndicator.args = {
	value: 5,
	max: 7,
	readonly: true
};
