import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type OptionCustom from "@ui5/webcomponents/dist/OptionCustom.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
  title: "Main/Select/OptionCustom",
  component: "OptionCustom",
  argTypes,

} as Meta<OptionCustom>;

const Template: UI5StoryArgs<OptionCustom, StoryArgsSlots> = (args) => {
  return html`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
  </style>
  <ui5-select>
   <ui5-option-custom
   ?selected="${ifDefined(args.selected)}"
   value="${ifDefined(args.value)}"
   tooltip="${ifDefined(args.tooltip)}"
   >${unsafeHTML(args.default)}</ui5-option-custom>
</ui5-select> `;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
  default: `<div class="optionContent">
  <ui5-icon name="soccer"></ui5-icon>
  Brazil
  <ui5-icon name="employee"></ui5-icon>
</div>`,
  selected: true
};