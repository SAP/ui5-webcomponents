import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type Grid from "@ui5/webcomponents/dist/Grid.js";
import "@ui5/webcomponents-fiori/dist/IllustratedMessage.js";
import "@ui5/webcomponents-fiori/dist/illustrations/NoData.js"

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

export default {
  title: "Main/Grid",
  component: "Grid",
  argTypes,
} as Meta<Grid>;

let index = 0;

const Template: UI5StoryArgs<Grid, StoryArgsSlots> = (args) =>
  html`<ui5-grid id="grid-${++index}"
  >
    ${unsafeHTML(args.headerRow)}
    ${unsafeHTML(args.default)}
    ${unsafeHTML(args.nodata)}
  </ui5-grid>`;

export const Basic = Template.bind({});
Basic.args = {
  headerRow: `
    <ui5-grid-header-row slot="headerRow">
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

const PopinTemplate: UI5StoryArgs<Grid, StoryArgsSlots> = (args) =>
html`<ui5-grid id="grid-popin"
>
  ${unsafeHTML(args.headerRow)}
  ${unsafeHTML(args.default)}
</ui5-grid>`;

export const Popin = PopinTemplate.bind({});
Popin.args = {
  headerRow: `
    <ui5-grid-header-row slot="headerRow">
      <ui5-grid-header-cell id="produtCol" min-width="600px" width="300px"><span>Product</span></ui5-grid-header-cell>
      <ui5-grid-header-cell id="supplierCol" min-width="800px">Supplier</ui5-grid-header-cell>
      <ui5-grid-header-cell id="dimensionsCol" min-width="300px">Dimensions</ui5-grid-header-cell>
      <ui5-grid-header-cell id="weightCol" popin-text="Weight">Weight</ui5-grid-header-cell>
      <ui5-grid-header-cell id="priceCol" min-width="300px" style="text-align: end;">Price</ui5-grid-header-cell>
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
}

Popin.decorators = [
  story => {
    return html`
      <ui5-slider id="slider" min="0" max="100" step="1" value="100" label-interval="0"></ui5-slider>
      ${story()}
      <script>
        const slider = document.getElementById("slider");
        const grid = document.getElementById("grid-popin");
        slider.addEventListener("input", (e) => {
          grid.style.width = e.target.value + '%';
        });
      </script>
    `;
  }
]

export const NoData = Template.bind({});
NoData.args = {
  headerRow: `
    <ui5-grid-header-row slot="headerRow">
      <ui5-grid-header-cell id="produtCol" min-width="600px" width="300px"><span>Product</span></ui5-grid-header-cell>
      <ui5-grid-header-cell id="supplierCol" min-width="800px">Supplier</ui5-grid-header-cell>
      <ui5-grid-header-cell id="dimensionsCol" min-width="300px">Dimensions</ui5-grid-header-cell>
      <ui5-grid-header-cell id="weightCol" popin-text="Weight">Weight</ui5-grid-header-cell>
      <ui5-grid-header-cell id="priceCol" min-width="300px" style="text-align: end;">Price</ui5-grid-header-cell>
    </ui5-grid-header-row>
  `,
  nodata: `
    <ui5-illustrated-message slot="nodata" name="NoData"></ui5-illustrated-message>
  `
};