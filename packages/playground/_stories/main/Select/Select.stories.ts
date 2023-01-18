import { action } from "@storybook/addon-actions";
import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

// @ts-ignore
import type Select from "@ui5/webcomponents/dist/Select.js";

import argTypes from "./argTypes.js";

export default {
  title: "Components/Select",
  component: "ui5-select",
  argTypes,
} as Meta<Select>;

type SelectEventMap = {
  "ui5-change": (event: CustomEvent) => void;
};

type SelectStoryArgs = Select & SelectEventMap;

const Template: Story<SelectStoryArgs> = (args) => {
  return html`<ui5-select
    name="${ifDefined(args.name)}"
    ?disabled="${ifDefined(args.disabled)}"
    ?required="${ifDefined(args.required)}"
    value-state="${ifDefined(args.valueState)}"
    value-state-message="${ifDefined(args.valueStateMessage)}"
    selected-option="${ifDefined(args.selectedOption)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
    @ui5-change="${ifDefined(args["change"])}"
  >
    ${unsafeHTML(args.innerHTML)}
  </ui5-select> `;
};

// Basic
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
  "ui5-change": (e: CustomEvent) => action("ui5-change")(e.detail),
  innerHTML: `<ui5-option icon="iphone">Phone</ui5-option>
	<ui5-option icon="ipad">Tablet</ui5-option>
	<ui5-option icon="laptop" selected="">Desktop</ui5-option>`,
};

// Value State and Value State Message

export const ValueStateAndValueStateMessage = () =>
  html`<ui5-select value-state="Success" class="select">
      <ui5-option icon="meal" selected="">Apple</ui5-option>
      <ui5-option icon="meal">Avocado</ui5-option>
      <ui5-option icon="meal">Mango</ui5-option>
    </ui5-select>
    <ui5-select value-state="Warning" class="select">
      <ui5-option icon="meal">Orange</ui5-option>
      <ui5-option icon="meal" selected="">Pumpkin</ui5-option>
      <ui5-option icon="meal">Carrot</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>
    <ui5-select value-state="Error" class="select">
      <ui5-option icon="meal">Strawberry</ui5-option>
      <ui5-option icon="meal">Tomato</ui5-option>
      <ui5-option icon="meal" selected="">Red Chili Pepper</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>
    <ui5-select value-state="Information" class="select">
      <ui5-option icon="meal">Blueberry</ui5-option>
      <ui5-option icon="meal">Grape</ui5-option>
      <ui5-option icon="meal" selected="">Plum</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>`;

ValueStateAndValueStateMessage.storyName = "Value State";

// Two-column layout
export const TwoColumnLayout = () =>
  html` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>`;
TwoColumnLayout.storyName = "Two-column layout";
