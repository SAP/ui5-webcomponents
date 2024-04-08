import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type GroupHeaderListItem from "@ui5/webcomponents/dist/GroupHeaderListItem.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
  title: "Main/List/Group Header List Item",
  component: "GroupHeaderListItem",
  argTypes,
} as Meta<GroupHeaderListItem>;

const Template: UI5StoryArgs<GroupHeaderListItem, StoryArgsSlots> = (args) => {
  return html` <ui5-list>
  <ui5-li-groupheader
    accessible-name="${ifDefined(args.accessibleName)}"
    ?selected="${ifDefined(args.selected)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-li-groupheader>
  <ui5-li
  icon="navigation-right-arrow"
  icon-end=""
  >Jennifer</ui5-li
>
<ui5-li
  icon="navigation-right-arrow"
  icon-end=""
  >Lora</ui5-li
>
<ui5-li
  icon="navigation-right-arrow"
  icon-end=""
  >Carlotta</ui5-li
>
  </ui5-list>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"]
Basic.args = {
  default: `Front End Developers`,
};