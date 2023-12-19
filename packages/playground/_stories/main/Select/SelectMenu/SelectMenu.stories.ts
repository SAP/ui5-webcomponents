import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type SelectMenu from "@ui5/webcomponents/dist/SelectMenu.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs";

const component = "ui5-select-menu";

export default {
  title: "Main/Select/Select Menu",
  component: "SelectMenu",
  argTypes,
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
    },
  },
} as Meta<SelectMenu>;

const Template: UI5StoryArgs<SelectMenu, StoryArgsSlots> = (args) => {
  return html`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  ${unsafeHTML(args.default)}
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
</script>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
  default: `<ui5-select-menu-option display-text="AR">
  <div class="optionContent">
      <ui5-icon name="soccer"></ui5-icon>
      Argentina
      <ui5-icon name="employee"></ui5-icon>
  </div>
</ui5-select-menu-option>

<ui5-select-menu-option display-text="BE">
  <div class="optionContent">
      <ui5-icon name="soccer"></ui5-icon>
      Belgium
      <ui5-icon name="employee"></ui5-icon>
  </div>
</ui5-select-menu-option>

<ui5-select-menu-option display-text="BR">
  <div class="optionContent">
      <ui5-icon name="soccer"></ui5-icon>
      Brazil
      <ui5-icon name="employee"></ui5-icon>
  </div>
</ui5-select-menu-option>`
};