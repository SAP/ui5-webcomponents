import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
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
Basic.storyName = "With Content and Header Design";
Basic.args = {
	design: BarDesign.Header,
	startContent: `<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>`,
	default: `<ui5-label id="basic-label">Title</ui5-label>`,
	endContent: `<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>`,
};

export const Footer = Template.bind({});
Footer.storyName = "With Content and Footer Design";
Footer.args = {
	design: BarDesign.Footer,
	startContent: `<ui5-button design="Positive" slot="endContent">Agree</ui5-button>`,
	default: `<ui5-button design="Negative" slot="endContent">Decline</ui5-button>`,
	endContent: `<ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>`,
};