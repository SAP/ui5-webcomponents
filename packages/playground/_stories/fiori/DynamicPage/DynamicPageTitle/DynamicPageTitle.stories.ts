import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import type { PartialStoryFn } from "@storybook/types";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "../argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

import type DynamicPageTitle from "@ui5/webcomponents-fiori/dist/DynamicPageTitle.js";
import DynamicPageTitleTemplate from "../DynamicPageTitleTemplate.js";

const component = "ui5-dynamic-page-title";

export default {
  title: "Fiori/Dynamic Page/ Dynamic Page Title",
  component: "DynamicPageTitle",
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
    },
  },
  argTypes,
} as Meta<DynamicPageTitle>;

const Template: UI5StoryArgs<DynamicPageTitle, StoryArgsSlots> = (args) => {
  return DynamicPageTitleTemplate;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
