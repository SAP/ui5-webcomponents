import { html } from "lit-html";
import type { Meta } from "@storybook/web-components";
import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import { DocsPage } from "../../../.storybook/docs";
import type Title from "@ui5/webcomponents/dist/Title.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import TitleLevel from "@ui5/webcomponents/dist/types/TitleLevel.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";

const component = "ui5-title";

export default {
	title: "Main/Title",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<Title>;

const Template: UI5StoryArgs<Title, StoryArgsSlots> = (args) => {
	return html`
<ui5-title
	level="${ifDefined(args.level)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
>${unsafeHTML(args.default)}</ui5-title>`;
};
Template.decorators = [
	(story, {args}) => {
		return html`
${story({args: {...args, level: TitleLevel.H1}})}
${story({args: {...args, level: TitleLevel.H2}})}
${story({args: {...args, level: TitleLevel.H3}})}
${story({args: {...args, level: TitleLevel.H4}})}
${story({args: {...args, level: TitleLevel.H5}})}
${story({args: {...args, level: TitleLevel.H6}})}`;
	},
];

export const Basic = Template.bind({});
Basic.args = {
	default: "Title text",
};
Basic.decorators = [...Template.decorators];

export const Wrapping = Template.bind({});
Wrapping.args = {
	default: "Long title text text text which wraps",
	wrappingType: WrappingType.Normal,
}
Wrapping.decorators = [
	...Template.decorators,
	(story) => {
		return html`
<style>
	ui5-title {
		width: 15ch;
	}
</style>
${story()}`
	},
];