import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type BusyIndicator from "@ui5/webcomponents/dist/BusyIndicator.js";

const component = "ui5-busy-indicator";

export default {
    title: "Main/BusyIndicator",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<BusyIndicator>;

const Template: UI5StoryArgs<BusyIndicator, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Busy Indicator with different size</h3>
		<div class="snippet flex center">
			<ui5-busy-indicator active="" size="Small"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Medium"></ui5-busy-indicator>
			<ui5-busy-indicator active="" size="Large"></ui5-busy-indicator>
		</div>
`;


export const Template1: StoryFn = () => html`
<h3>Busy Indicator wrapping other elements</h3>
	<div class="snippet flex">
		<ui5-button id="fetch-btn" style="width: 120px;">Fetch List Data</ui5-button>
		<ui5-busy-indicator id="busy-container" size="Medium">
			<ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
		</ui5-busy-indicator>
	</div>
`;
