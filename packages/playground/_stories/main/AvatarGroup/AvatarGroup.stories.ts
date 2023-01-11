import { Story, Meta } from "@storybook/web-components";
import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

// @ts-ignore
import AvatarGroup from "@ui5/webcomponents/dist/AvatarGroup.js";

import argTypes from "./argTypes.js";

import TemplateGroupWithPopover from "./TemplateGroupWithPopover.js";
import TemplateIndividualWithPopover from "./TemplateIndividualWithPopover.js";
import TemplateAvatarGroupSizes from "./TemplateAvatarGroupSizes.js";

export default {
  title: "Components/AvatarGroup",
  component: "ui5-avatar-group",
  argTypes,
} as Meta<AvatarGroup>;

const Template: Story<AvatarGroup> = (args) =>
  html`<ui5-avatar-group
    .type="${ifDefined(args.type)}"
    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"
    @click="${ifDefined(args["click"])}"
  >
    ${unsafeHTML(args.default)}
  </ui5-avatar-group> `;

// Basic
export const TypeGroup = Template.bind({});
TypeGroup.storyName = "Type Group";
TypeGroup.args = {
  ["click"]: (e: CustomEvent) => action("ui5-click")(e.detail),
  default: `
  <ui5-avatar size="M" icon="employee"></ui5-avatar>
  <ui5-avatar size="M" initials="JD"></ui5-avatar>
  <ui5-avatar size="M">
    <img
      src="../assets/images/avatars/woman_avatar_5.png"
      alt="Woman Avatar 5"
    />
  </ui5-avatar>`,
};

// Type Individual
export const TypeIndividual = Template.bind({});
TypeIndividual.storyName = "Type Individual";
TypeIndividual.args = {
  type: "Individual",
  ["click"]: (e: CustomEvent) => action("ui5-click")(e.detail),
  default: `
  <ui5-avatar size="M" icon="employee"></ui5-avatar>
  <ui5-avatar size="M" initials="JD"></ui5-avatar>
  <ui5-avatar size="M">
    <img
      src="../assets/images/avatars/woman_avatar_5.png"
      alt="Woman Avatar 5"
    />
  </ui5-avatar>`,
};

// Type Individual with Popover
export const TypeIndividualWithPopover: Story = TemplateIndividualWithPopover.bind({});
TypeIndividualWithPopover.storyName = "Type Individual with Popover";
TypeIndividualWithPopover.parameters = {
  docs: {
    // Opt-out of inline rendering
    inlineStories: false,
  },
};

// Type Group with Popover
export const TypeGroupWithPopover: Story = TemplateGroupWithPopover.bind({});
TypeGroupWithPopover.storyName = "Type Group with Popover";
TypeGroupWithPopover.parameters = {
  docs: {
    // Opt-out of inline rendering
    inlineStories: false,
  },
};

// Sizes
export const Sizes: Story = TemplateAvatarGroupSizes.bind({});
Sizes.storyName = "Sizes";
