import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type ProgressIndicator from "@ui5/webcomponents/dist/ProgressIndicator.js";

const component = "ui5-progress-indicator";

export default {
    title: "Main/Progress Indicator",
    component: "ProgressIndicator",
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component }),
        },
    },
    argTypes,
} as Meta<ProgressIndicator>;

const Template: UI5StoryArgs<ProgressIndicator, StoryArgsSlots> = (args) =>
    html`<ui5-progress-indicator
        ?disabled="${ifDefined(args.disabled)}"
        ?hide-value="${ifDefined(args.hideValue)}"
        value="${ifDefined(args.value)}"
        display-value="${ifDefined(args.displayValue)}"
        value-state="${ifDefined(args.valueState)}"
        style="${ifDefined(args.style)}"
    ></ui5-progress-indicator>`;

export const Basic = Template.bind({});
Basic.args = {
    value: 25,
};

export const Customised = Template.bind({});
Customised.args = {
    value: 25,
    displayValue: "Custom Display Value",
    style: "height: 50px; width: 200px;",
};


