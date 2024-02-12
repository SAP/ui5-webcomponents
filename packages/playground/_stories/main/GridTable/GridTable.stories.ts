import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type GridTable from "@ui5/webcomponents/dist/GridTable.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

export default {
  title: "Main/GridTable",
  component: "GridTable",
  argTypes,
} as Meta<GridTable>;

const Template: UI5StoryArgs<GridTable, StoryArgsSlots> = (args) =>
  html`<ui5-grid-table
  >
    ${unsafeHTML(args.default)}
  </ui5-grid-table>`;

export const Basic = Template.bind({});
Basic.args = {
};
