import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type StandardListItem from "@ui5/webcomponents/dist/StandardListItem.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../../types.js";

export default {
  title: "Main/List/Standard List Item",
  component: "StandardListItem",
  argTypes,
} as Meta<StandardListItem>;

const Template: UI5StoryArgs<StandardListItem, StoryArgsSlots> = (args) => {
  return html` <ui5-list>
  <ui5-li
    icon="${ifDefined(args.icon)}"
    description="${ifDefined(args.description)}"
    additional-text="${ifDefined(args.additionalText)}"
    additional-text-state="${ifDefined(args.additionalTextState)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    ?icon-end="${ifDefined(args.iconEnd)}"
    image="${ifDefined(args.image)}"
    accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
    ?navigated="${ifDefined(args.navigated)}"
    type="${ifDefined(args.type)}"
    ?selected="${ifDefined(args.selected)}"
	tooltip="${ifDefined(args.tooltip)}"
  >
    ${unsafeHTML(args.default)}
    ${unsafeHTML(args.imageContent)}
    ${unsafeHTML(args.deleteButton)}
  </ui5-li>
  </ui5-list>`;
};

export const Basic = Template.bind({});
Basic.tags = ["_hidden_"]
Basic.args = {
  default: `Pineapple`,
  icon: "nutrition-activity",
  description: "Tropical plant with an edible fruit",
  additionalText: "In-stock",
  additionalTextState: "Positive"
};