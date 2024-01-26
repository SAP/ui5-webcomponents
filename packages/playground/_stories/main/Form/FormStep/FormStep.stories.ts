import { html } from "lit";
import { DocsPage } from "../../../../.storybook/docs.js";
import argTypes, { componentInfo } from "./argTypes.js";
import type { Meta } from "@storybook/web-components";
import type FormGroup from "@ui5/webcomponents/dist/FormGroup.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import type FormStep from "@ui5/webcomponents/dist/FormStep.js";

const component = "ui5-form-step";

export default {
    title: "Main/Form/FormStep",
    component: "FormStep",
    parameters: {
        docs: {
          page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
        },
    },
    argTypes,
} as Meta<FormStep>;

const Template: UI5StoryArgs<FormGroup, StoryArgsSlots> = (args) => {
  return html`<ui5-form class="addressForm" header-text="Layout: S1 M1 L2 XL3">

  <ui5-form-step min-width="S" columns="1" slot="steps"></ui5-form-step>
  <ui5-form-step min-width="M" columns="1" slot="steps"></ui5-form-step>
  <ui5-form-step min-width="L" columns="2" slot="steps"></ui5-form-step>
  <ui5-form-step min-width="XL" columns="3" slot="steps"></ui5-form-step>

  <ui5-form-group header-text="Address" column-span="2">
    <ui5-form-item>
      <ui5-label slot="labelContent">Name:</ui5-label>
      <ui5-input value="Red Point Stores"></ui5-input>
    </ui5-form-item>
    
    <ui5-form-item>
      <ui5-label slot="labelContent">ZIPCode/City:</ui5-label>
      <ui5-input value="411"></ui5-input>
      <ui5-input value="Maintown"></ui5-input>
    </ui5-form-item>
    
    <ui5-form-item>
      <ui5-label slot="labelContent">Street:</ui5-label>
      <ui5-input value="Main St 1618"></ui5-input>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Country:</ui5-label>
      <ui5-select>
        <ui5-option>Germany</ui5-option>
        <ui5-option>Australia</ui5-option>
        <ui5-option>Bulgaria</ui5-option>
      </ui5-select>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">WebSite:</ui5-label>
      <ui5-input value="sap.com"></ui5-input>
    </ui5-form-item>
  </ui5-form-group>



  <ui5-form-group header-text="Contact">
    <ui5-form-item>
      <ui5-label slot="labelContent">WebSite:</ui5-label>
      <ui5-input></ui5-input>
      <ui5-input></ui5-input>
      <!-- <div class="customElement">
        <div class="customElement-child">
          <ui5-input></ui5-input>
        </div>
        <div class="customElement-child">
          <ui5-input></ui5-input>
        </div>
      </div> -->
      
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Email:</ui5-label>
      <ui5-input value="john.smith@sap.com"></ui5-input>
    </ui5-form-item>
    
    <ui5-form-item>
      <ui5-label slot="labelContent">Tel:</ui5-label>
      <ui5-input value="+49 6227 747474"></ui5-input>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">SMS:</ui5-label>
      <ui5-input value="+49 6227 747474"></ui5-input>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Mobile:</ui5-label>
      <ui5-input value="+49 6227 747474"></ui5-input>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Pager:</ui5-label>
      <ui5-input value="+49 6227 747474"></ui5-input>
    </ui5-form-item>

    <ui5-form-item>
      <ui5-label slot="labelContent">Fax:</ui5-label>
      <ui5-input value="+49 6227 747474"></ui5-input>
    </ui5-form-item>


  </ui5-form-group>
  </ui5-form>`;
};

export const Basic = Template.bind({});