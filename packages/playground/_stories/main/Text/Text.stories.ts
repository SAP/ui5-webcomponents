import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import type { Meta } from "@storybook/web-components";
import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";
import type Text from "@ui5/webcomponents/dist/Text.js";
import WrappingType from "@ui5/webcomponents/dist/types/WrappingType.js";

export default {
	title: "Main/Text",
	component: "Text",
	argTypes,
} as Meta<Text>;


const Template: UI5StoryArgs<Text, StoryArgsSlots> = (args) => {
	return html`
<ui5-text max-lines="${ifDefined(args.maxLines)}" wrapping-type="${ifDefined(args.wrappingType)}">${unsafeHTML(args.default)}</ui5-text>`;
};

export const Basic = Template.bind({});
Basic.args = {
	default: "Simple Text"
};


export const TextTruncation = Template.bind({});
TextTruncation.args = {
	wrappingType: WrappingType.None,
	default: `Text demonstrates Truncation. When wrapping-type="None", the long text will be truncated. To test the wrapping, use 'wrapping-type="Normal",
	Text demonstrates truncation. When wrapping-type="None", the long text will be truncated. To test the wrapping, use 'wrapping-type="Normal"`,
};

export const TextWrapping = Template.bind({});
TextWrapping.args = {
	wrappingType: WrappingType.Normal,
	default: `Text demonstrates Wrapping. When wrapping-type="Normal", the long text will wrap. To test the truncation, use 'wrapping-type="None"
	Text demonstrates Wrapping. When wrapping-type="Normal", the long text will be wrap. To test the truncation, use 'wrapping-type="None"`,
};

const TextMaxLinesTemplate: UI5StoryArgs<Text, StoryArgsSlots> = (args) => {
return html`
<ui5-title level="H5">2 max lines</ui5-title>
	
<ui5-text
	max-lines="${ifDefined(args.maxLines)}"
	wrapping-type="${ifDefined(args.wrappingType)}"
>${unsafeHTML(args.default)}
</ui5-text>

<br><br>

<ui5-title level="H5">3 max lines</ui5-title>

<ui5-text max-lines="3" wrapping-type="Normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
</ui5-text>`;
};

export const TextMaxLines = TextMaxLinesTemplate.bind({});
TextMaxLines.args = {
	wrappingType: WrappingType.Normal,
	maxLines: 2,
	default: `Text that demonstrates how, if wrapping-type="Normal" and "max-lines" is set, the text will first wrap to the number of lines and then start truncating
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque elementum dignissim ultricies. Fusce rhoncus ipsum tempor eros aliquam consequat. Lorem ipsum dolor sit amet`,
};
