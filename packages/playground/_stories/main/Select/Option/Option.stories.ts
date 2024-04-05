import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type Option from "@ui5/webcomponents/dist/Option.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
  title: "Main/Select/Option",
  component: "Option",
  argTypes,

} as Meta<Option>;

const Template: UI5StoryArgs<Option, StoryArgsSlots> = (args) => {
  return html`<ui5-select>
   <ui5-option
   additional-text="${ifDefined(args.additionalText)}"
   icon="${ifDefined(args.icon)}"
   ?selected="${ifDefined(args.selected)}"
   value="${ifDefined(args.value)}"
   >${unsafeHTML(args.default)}</ui5-option>
</ui5-select> `;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
  icon: "laptop",
  default: "Desktop",
  selected: true
};