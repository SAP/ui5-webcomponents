import { html } from "lit";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Link from "@ui5/webcomponents/dist/Link.js";

const component = "ui5-link";

export default {
    title: "Main/Link",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Link>;

const Template: UI5StoryArgs<Link, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Different Link Designs</h3>
	<div class="snippet">
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank">Standard Link</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" design="Subtle">Subtle link</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" disabled="">Disabled</ui5-link>
		<ui5-link class="samples-big-margin-right" href="https://www.sap.com" target="_blank" design="Emphasized">Emphasized</ui5-link>
	</div>
`;
