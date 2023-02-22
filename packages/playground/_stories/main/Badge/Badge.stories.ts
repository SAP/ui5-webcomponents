import { html } from "lit-html";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

// @ts-ignore
import type Badge from "@ui5/webcomponents/dist/Badge.js";

const component = "ui5-badge";

export default {
    title: "Main/Badge",
    component,
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component })
        },
    },
    argTypes,
} as Meta<Badge>;

const Template: UI5StoryArgs<Badge, StoryArgsSlots> = (args) => html`<div></div>`;


export const Template0: StoryFn = () => html`
<h3>Basic Badge</h3>
	<div class="snippet">
		<ui5-badge color-scheme="1">available 1</ui5-badge>
		<ui5-badge color-scheme="2">required 2</ui5-badge>
		<ui5-badge color-scheme="3">3K</ui5-badge>
		<ui5-badge color-scheme="4">bug 4</ui5-badge>
		<ui5-badge color-scheme="5">in process 5</ui5-badge>
		<ui5-badge color-scheme="6">in warehouse 6</ui5-badge>
		<ui5-badge color-scheme="7">7\$</ui5-badge>
		<ui5-badge color-scheme="8">solution provided 8</ui5-badge>
		<ui5-badge color-scheme="9">pending release 9</ui5-badge>
		<ui5-badge color-scheme="10">customer action 10</ui5-badge>
		<ui5-badge style="width:200px;">This would truncate as it is too long</ui5-badge>
	</div>
`;


export const Template1: StoryFn = () => html`
<h3>Badge with Icon</h3>
	<div class="snippet">
		<ui5-badge color-scheme="1">
				<ui5-icon name="accept" slot="icon"></ui5-icon>done
		</ui5-badge>
		<ui5-badge color-scheme="2">
				<ui5-icon name="sap-ui5" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="3">
				<ui5-icon name="add-equipment" slot="icon"></ui5-icon>in process
		</ui5-badge>
		<ui5-badge color-scheme="4">
				<ui5-icon name="lab" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="5">
				<ui5-icon name="email-read" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="6">
				<ui5-icon name="pending" slot="icon"></ui5-icon>pending
		</ui5-badge>
		<ui5-badge color-scheme="7">
				<ui5-icon name="lightbulb" slot="icon"></ui5-icon>
		</ui5-badge>
		<ui5-badge color-scheme="8">
				<ui5-icon name="locked" slot="icon"></ui5-icon>
		</ui5-badge>
	</div>
`;
