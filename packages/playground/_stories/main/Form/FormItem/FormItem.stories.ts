import { html } from "lit";
import argTypes from "./argTypes.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type FormItem from "@ui5/webcomponents/dist/FormItem.js";

export default {
    title: "Main/Form/FormItem",
    component: "FormItem",
    argTypes,
} as Meta<FormItem>;

const Template: UI5StoryArgs<FormItem, StoryArgsSlots> = (args) => {
  return html`<ui5-form>
    <ui5-form-item>
      ${unsafeHTML(args.labelContent)}
      ${unsafeHTML(args.default)}
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">ZIP Code/City:</ui5-label>
      <span>411 Maintown</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Street:</ui5-label>
      <span>Main St 1618</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Country:</ui5-label>
      <span>Germany</span>
    </ui5-form-item>
  </ui5-form>`;
};

export const Basic = Template.bind({});
Basic.args = {
  labelContent: `<ui5-label slot="labelContent">Name:</ui5-label>`,
  default: `<span>Red Point Stores</span>`
}