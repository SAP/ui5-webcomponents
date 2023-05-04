import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type Bar from "@ui5/webcomponents-fiori/dist/Bar.js";
import BarDesign from "@ui5/webcomponents-fiori/dist/types/BarDesign.js";

const component = "ui5-bar";

export default {
	title: "Fiori/Bar",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
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
Basic.storyName = "With Content and Design";
Basic.args = {
	design: BarDesign.Header,
	startContent: `<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>`,
	default: `<ui5-label id="basic-label">Content</ui5-label>`,
	endContent: `<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>`,
};