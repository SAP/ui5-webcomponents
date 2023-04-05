import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Bar from "@ui5/webcomponents-fiori/dist/Bar.js";

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

const Template: UI5StoryArgs<Bar, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Header Bar</h3>
	<div class="snippet">
		<ui5-bar design="Header">
			<ui5-button icon="home" tooltip="Go home" design="Transparent" slot="startContent"></ui5-button>
			<ui5-label id="basic-label">Header Title</ui5-label>
			<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
		</ui5-bar>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Subheader Bar</h3>
	<div class="snippet">
		<ui5-bar design="Subheader">
			<ui5-button icon="home" tooltip="Go home" slot="startContent"></ui5-button>
			<ui5-label id="basic-label">Subheader Title</ui5-label>
			<ui5-button icon="action-settings" tooltip="Go to settings" slot="endContent"></ui5-button>
		</ui5-bar>
	</div>
`;


export const Template2: StoryFn = () => html`
<h3>Footer Bar</h3>
	<div class="snippet">
		<ui5-bar design="Footer">
			<ui5-button design="Positive" slot="endContent">Agree</ui5-button>
			<ui5-button design="Negative" slot="endContent">Decline</ui5-button>
			<ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
		</ui5-bar>
	</div>
`;


export const Template3: StoryFn = () => html`
<h3>FloatingFooter Bar</h3>
	<div class="snippet">
		<ui5-bar design="FloatingFooter">
			<ui5-button design="Positive" slot="endContent">Agree</ui5-button>
			<ui5-button design="Negative" slot="endContent">Decline</ui5-button>
			<ui5-button design="Transparent" slot="endContent">Cancel</ui5-button>
		</ui5-bar>
	</div>
`;
