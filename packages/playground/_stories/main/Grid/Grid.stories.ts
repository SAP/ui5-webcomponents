import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type Grid from "@ui5/webcomponents/dist/Grid.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

export default {
  title: "Main/Grid",
  component: "Grid",
  argTypes,
} as Meta<Grid>;

const Template: UI5StoryArgs<Grid, StoryArgsSlots> = (args) =>
  html`<ui5-grid
  >
    ${unsafeHTML(args.header)}
    ${unsafeHTML(args.default)}
  </ui5-grid>`;

export const Basic = Template.bind({});
Basic.args = {
  header: `
    <ui5-grid-header-row slot="header-row">
      <ui5-grid-header-cell width="300px">Product</ui5-grid-header-cell>
      <ui5-grid-header-cell>Supplier</ui5-grid-header-cell>
      <ui5-grid-header-cell>Dimensions</ui5-grid-header-cell>
      <ui5-grid-header-cell>Weight</ui5-grid-header-cell>
      <ui5-grid-header-cell style="text-align: end;">Price</ui5-grid-header-cell>
    </ui5-grid-header-row>
  `,
  default: `
    <ui5-grid-row>
      <ui5-grid-cell><ui5-label><b>Notebook Basic 15</b><br>HT-1000</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>Very Best Screens</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>30 x 18 x 3 cm</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label style="color: #2b7c2b"><b>4.2</b> KG</ui5-label></ui5-grid-cell>
      <ui5-grid-cell style="text-align: end;"><ui5-label><b>956</b> EUR</ui5-label></ui5-grid-cell>
    </ui5-grid-row>
    <ui5-grid-row>
      <ui5-grid-cell><ui5-label><b>Notebook Basic 17</b><br>HT-1001</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>Smartcards</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>29 x 17 x 3.1 cm</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label style="color: #2b7c2b"><b>4.5</b> KG</ui5-label></ui5-grid-cell>
      <ui5-grid-cell style="text-align: end;"><ui5-label><b>1249</b> EUR</ui5-label></ui5-grid-cell>
    </ui5-grid-row>
    <ui5-grid-row>
      <ui5-grid-cell><ui5-label><b>Notebook Basic 18</b><br>HT-1002</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>Technocom</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label>32 x 21 x 4 cm</ui5-label></ui5-grid-cell>
      <ui5-grid-cell><ui5-label style="color: #2b7c2b"><b>3.7</b> KG</ui5-label></ui5-grid-cell>
      <ui5-grid-cell style="text-align: end;"><ui5-label><b>29</b> EUR</ui5-label></ui5-grid-cell>
    </ui5-grid-row>
  `
};
