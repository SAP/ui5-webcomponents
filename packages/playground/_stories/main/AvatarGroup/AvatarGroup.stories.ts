import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Story, Meta } from "@storybook/web-components";

// @ts-ignore
import type AvatarGroup from "@ui5/webcomponents/dist/AvatarGroup.js";
import AvatarGroupType from "@ui5/webcomponents/dist/types/AvatarGroupType.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import TemplateGroupWithPopover from "./TemplateGroupWithPopover.js";
import TemplateIndividualWithPopover from "./TemplateIndividualWithPopover.js";
import TemplateAvatarGroupSizes from "./TemplateAvatarGroupSizes.js";

export default {
  title: "Components/AvatarGroup",
  component: "ui5-avatar-group",
  argTypes,
} as Meta<AvatarGroup>;

const Template: UI5StoryArgs<AvatarGroup, StoryArgsSlots> = (args) =>
  html`<ui5-avatar-group
    .type="${ifDefined(args.type)}"
    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-avatar-group> `;

// Basic
export const TypeGroup = Template.bind({});
TypeGroup.storyName = "Type Group";
TypeGroup.args = {
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
  type: AvatarGroupType.Individual,
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
export const TypeIndividualWithPopover: Story =
  TemplateIndividualWithPopover.bind({});
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
