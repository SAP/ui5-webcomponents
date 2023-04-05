import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

import type ColorPalettePopover from "@ui5/webcomponents/dist/ColorPalettePopover.js";

const component = "ui5-color-palette-popover";

export default {
	title: "Main/ColorPalettePopover",
	component,
	parameters: {
		docs: {
			page: DocsPage({ ...componentInfo, component })
		},
	},
	argTypes,
} as Meta<ColorPalettePopover>;

const Template: UI5StoryArgs<ColorPalettePopover, StoryArgsSlots> = (args) => html`<ui5-color-palette-popover
	id="${ifDefined(args.id)}"
	?show-recent-colors="${ifDefined(args.showRecentColors)}"
	?show-more-colors="${ifDefined(args.showMoreColors)}"
	?show-default-color="${ifDefined(args.showDefaultColor)}"
	default-color="${ifDefined(args.defaultColor)}"
>
	${unsafeHTML(args.default)}
</ui5-color-palette-popover>`;

export const Basic = Template.bind({});
Basic.storyName = "With No Additional Features";
Basic.args = {
	id: "colorPalettePopover",
	default: `<ui5-color-palette-item value="pink"></ui5-color-palette-item>
<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>`,
};
Basic.decorators = [
	(story) => html`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	${story()}
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>`,
];
Basic.parameters = {
	docs: {
		story: {
			inline: false,
		},
	}
};

export const DefaultColor = Template.bind({});
DefaultColor.storyName = "With Default Color";
DefaultColor.args = {
	id: "colorPalettePopover",
	defaultColor: "orange",
	showDefaultColor: true,
	default: `<ui5-color-palette-item value="blue"></ui5-color-palette-item>
<ui5-color-palette-item value="cyan"></ui5-color-palette-item>
<ui5-color-palette-item value="orange"></ui5-color-palette-item>
<ui5-color-palette-item value="#5480e7"></ui5-color-palette-item>
<ui5-color-palette-item value="#ff6699"></ui5-color-palette-item>`,
};
DefaultColor.decorators = [
	(story) => html`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	${story()}
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>`,
];
DefaultColor.parameters = {
	docs: {
		story: {
			inline: false,
		},
	}
};

export const MoreColors = Template.bind({});
MoreColors.storyName = "With Recent and More Colors";
MoreColors.args = {
	id: "colorPalettePopover",
	showRecentColors: true,
	showMoreColors: true,
	default: `<ui5-color-palette-item value="pink"></ui5-color-palette-item>
<ui5-color-palette-item value="darkblue"></ui5-color-palette-item>
<ui5-color-palette-item value="#444444"></ui5-color-palette-item>
<ui5-color-palette-item value="rgb(0,200,0)"></ui5-color-palette-item>`,
};
MoreColors.decorators = [
	(story) => html`<ui5-button id="colorPaletteBtn">Open ColorPalettePopover</ui5-button>
	${story()}
	<script>
		colorPaletteBtn.addEventListener("click", function(event) {
			colorPalettePopover.showAt(this);
		});
	</script>`,
];
MoreColors.parameters = {
	docs: {
		story: {
			inline: false,
		},
	}
};