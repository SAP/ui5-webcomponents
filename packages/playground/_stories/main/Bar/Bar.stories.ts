import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type Bar from "@ui5/webcomponents/dist/Bar.js";
import BarDesign from "@ui5/webcomponents/dist/types/BarDesign.js";

export default {
	title: "Main/Bar",
	component: "Bar",
	argTypes,
} as Meta<Bar>;

const Template: UI5StoryArgs<Bar, StoryArgsSlots> = (args) => html`<ui5-bar
	design="${ifDefined(args.design)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.startContent)}
	${unsafeHTML(args.endContent)}
</ui5-bar>`;

export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
	design: BarDesign.Header,
	startContent: `<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>`,
	default: `<ui5-label id="basic-label">Content</ui5-label>`,
	endContent: `<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>`,
};