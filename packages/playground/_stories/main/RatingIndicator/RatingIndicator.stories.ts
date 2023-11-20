import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type RatingIndicator from "@ui5/webcomponents/dist/RatingIndicator.js";

const component = "ui5-rating-indicator";
let index = 0;

export default {
    title: "Main/Rating Indicator",
    component: "RatingIndicator",
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<RatingIndicator>;

const Template: UI5StoryArgs<RatingIndicator, StoryArgsSlots> = (args) => html`
<ui5-rating-indicator
	id="rating-indicator-${++index}"
	value="${ifDefined(args.value)}"
	max="${ifDefined(args.max)}"
	?disabled="${ifDefined(args.disabled)}"
	?readonly="${ifDefined(args.readonly)}"
	?required="${ifDefined(args.required)}"
	tooltip="${ifDefined(args.tooltip)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
></ui5-rating-indicator>`;

export const Basic = Template.bind({});
Basic.args = {
	value: 4
};

export const MaxValue = Template.bind({});
MaxValue.args = {
	value: 5,
	max: 10
};

export const RequiredLabel: StoryFn = Template.bind({});
RequiredLabel.args = {
	value: 5,
	max: 7,
	accessibleNameRef: "label-acc-name-ref",
	required: true
};
RequiredLabel.decorators = [
	(story) => {
	return html`
	<ui5-label id="label-acc-name-ref" required="true" for="rating-indicator-${index+1}">Rate us</ui5-label>
	${story()}`;
	}
]