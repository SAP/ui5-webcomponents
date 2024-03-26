import { html } from "lit";
import type { Meta } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "../argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type DynamicPageHeader from "@ui5/webcomponents-fiori/dist/DynamicPageHeader.js";
import DynamicPageHeaderTemplate from "../DynamicPageHeaderTemplate.js";

export default {
  title: "Fiori/Dynamic Page/ Dynamic Page Header",
  component: "DynamicPageHeader",
  argTypes,
} as Meta<DynamicPageHeader>;

const Template: UI5StoryArgs<DynamicPageHeader, StoryArgsSlots> = (args) => {
  return DynamicPageHeaderTemplate;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
