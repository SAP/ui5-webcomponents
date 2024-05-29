import type { Meta } from "@storybook/web-components";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "../argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type DynamicPageTitle from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import DynamicPageTitleTemplate from "../DynamicPageTitleTemplate.js";

export default {
  title: "Fiori/Dynamic Page/ Dynamic Page Title",
  component: "DynamicPageTitle",
  argTypes,
} as Meta<DynamicPageTitle>;

const Template: UI5StoryArgs<DynamicPageTitle, StoryArgsSlots> = (args) => {
  return DynamicPageTitleTemplate;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
