import { html } from "lit";
import type { Meta } from "@storybook/web-components";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs";

// @ts-ignore
import type ProductSwitchItem from "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";
import { ifDefined } from "lit/directives/if-defined.js";

const component = "ui5-product-switch-item";

export default {
    title: "Fiori/Product Switch/Product Switch Item",
    component: "ProductSwitchItem",
    parameters: {
        docs: {
            page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true }),
        },
    },
    argTypes,
} as Meta<ProductSwitchItem>;

const Template: UI5StoryArgs<ProductSwitchItem, StoryArgsSlots> = (args) => html`
<ui5-product-switch>
	<ui5-product-switch-item
		title-text="${ifDefined(args.titleText)}"
		subtitle-text="${ifDefined(args.subtitleText)}"
		icon="${ifDefined(args.icon)}"
		target="${ifDefined(args.target)}"
		targetSrc="${ifDefined(args.targetSrc)}"
	></ui5-product-switch-item>
</ui5-product-switch>
`;

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
	titleText: "Home",
	subtitleText: "Central Home",
	icon: "home",
};