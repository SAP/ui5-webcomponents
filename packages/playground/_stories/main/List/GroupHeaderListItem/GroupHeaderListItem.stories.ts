import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type GroupHeaderListItem from "@ui5/webcomponents/dist/GroupHeaderListItem.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

import { DocsPage } from "../../../../.storybook/docs.js";

const component = "ui5-li-groupheader";

export default {
  title: "Main/List/Group Header List Item",
  component: "GroupHeaderListItem",
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component, showDefaultStoryOnly: true })
    },
  },
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
  image="../assets/images/avatars/woman_avatar_3.png"
  icon="navigation-right-arrow"
  icon-end=""
  >Jennifer</ui5-li
>
<ui5-li
  image="../assets/images/avatars/woman_avatar_4.png"
  icon="navigation-right-arrow"
  icon-end=""
  >Lora</ui5-li
>
<ui5-li
  image="../assets/images/avatars/woman_avatar_5.png"
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