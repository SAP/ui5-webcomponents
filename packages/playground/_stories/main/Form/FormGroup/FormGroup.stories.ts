import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import type { Meta } from "@storybook/web-components";
import type FormGroup from "@ui5/webcomponents/dist/FormGroup.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
  title: "Main/Form/FormGroup",
  component: "FormGroup",
  argTypes,
} as Meta<FormGroup>;

const Template: UI5StoryArgs<FormGroup, StoryArgsSlots> = (args) => {
  return html`
  <ui5-form header-text="Address" layout="S1 M1 L4 XL6">
    <ui5-form-group header-text="${ifDefined(args.headerText)}" column-span="${ifDefined(args.columnSpan)}">
      ${unsafeHTML(args.default)}
    </ui5-form-group>

    <ui5-form-group header-text="Detail">
        <ui5-form-item>
          <ui5-label slot="labelContent">Street:</ui5-label>
          <span>Main St 1618</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">Country:</ui5-label>
          <span>Germany</span>
        </ui5-form-item>

        <ui5-form-item>
          <ui5-label slot="labelContent">WebSite:</ui5-label>
          <ui5-link href="sap.com">sap.com</ui5-link>
	      </ui5-form-item>
    </ui5-form-group>
  </ui5-form>`;
};

export const Basic = Template.bind({});
Basic.args = {
  headerText: "Contact",
  columnSpan: 2,
  default:`
  <ui5-form-item>
    <ui5-label slot="labelContent">Name:</ui5-label>
    <span>Red Point Stores</span>
  </ui5-form-item>

  <ui5-form-item>
		<ui5-label slot="labelContent">Street:</ui5-label>
		<span>Main St 1618</span>
	</ui5-form-item>

  <ui5-form-item>
    <ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
    <span>411 Maintown</span>
  </ui5-form-item>
  `
};