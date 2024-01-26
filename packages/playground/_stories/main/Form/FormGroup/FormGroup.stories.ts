import { html } from "lit";
import { DocsPage } from "../../../../.storybook/docs.js";
import argTypes, { componentInfo } from "./argTypes.js";
import type { Meta } from "@storybook/web-components";
import type FormGroup from "@ui5/webcomponents/dist/FormGroup.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

const component = "ui5-form-group";

export default {
  title: "Main/Form/FormGroup",
  component: "FormGroup",
  argTypes,
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
    },
  },
} as Meta<FormGroup>;


const Template: UI5StoryArgs<FormGroup, StoryArgsSlots> = (args) => {
  return html`<ui5-form>
   <ui5-form-group>
    <ui5-form-item>
      <ui5-label slot="labelContent">Name:</ui5-label>
      <span class="text">Red Point Stores</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
      <span class="text">411 Maintown</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Street:</ui5-label>
      <span class="text">Main St 1618</span>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Country:</ui5-label>
      <span class="text">Germany</span>
    </ui5-form-item>
  </ui5-form-group>
  </ui5-form>`;
};

export const Basic = Template.bind({});