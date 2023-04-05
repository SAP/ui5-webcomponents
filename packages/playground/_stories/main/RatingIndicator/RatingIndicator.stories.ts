import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
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

const Template: UI5StoryArgs<RatingIndicator, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator></ui5-rating-indicator>
		<ui5-rating-indicator value="3"></ui5-rating-indicator>
		<ui5-rating-indicator value="3.7"></ui5-rating-indicator>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Rating Indicator With Different Max Value</h3>
	<div class="snippet">
		<ui5-rating-indicator max="10" value="5"></ui5-rating-indicator>
		<ui5-rating-indicator max="3" value="3"></ui5-rating-indicator>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Disabled Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator value="4" disabled=""></ui5-rating-indicator>
		<ui5-rating-indicator max="10" value="5" disabled=""></ui5-rating-indicator>
		<ui5-rating-indicator max="3" value="3" disabled=""></ui5-rating-indicator>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>Readonly Rating Indicator</h3>
	<div class="snippet">
		<ui5-rating-indicator value="4" readonly=""></ui5-rating-indicator>
		<ui5-rating-indicator max="7" value="5" readonly=""></ui5-rating-indicator>
	</div>
`;
