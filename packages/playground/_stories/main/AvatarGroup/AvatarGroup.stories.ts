import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { StoryFn, Meta } from "@storybook/web-components";

// @ts-ignore
import type AvatarGroup from "@ui5/webcomponents/dist/AvatarGroup.js";
import AvatarGroupType from "@ui5/webcomponents/dist/types/AvatarGroupType.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import TemplateGroupWithPopover from "./TemplateGroupWithPopover.js";
import TemplateIndividualWithPopover from "./TemplateIndividualWithPopover.js";
import TemplateAvatarGroupSizes from "./TemplateAvatarGroupSizes.js";

import { DocsPage } from "../../../.storybook/docs";

const component = "ui5-avatar-group";

export default {
  title: "Main/AvatarGroup",
  component,
  argTypes,
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component })
    },
  },
} as Meta<AvatarGroup>;

const Template: UI5StoryArgs<AvatarGroup, StoryArgsSlots> = (args) =>
  html`<ui5-avatar-group
    .type="${ifDefined(args.type)}"
    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"
  >
    ${unsafeHTML(args.default)}
    ${unsafeHTML(args.overflowButton)}
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
export const TypeIndividualWithPopover: StoryFn =
  TemplateIndividualWithPopover.bind({});
TypeIndividualWithPopover.storyName = "Type Individual with Popover";

// Type Group with Popover
export const TypeGroupWithPopover: StoryFn = TemplateGroupWithPopover.bind({});
TypeGroupWithPopover.storyName = "Type Group with Popover";

// Sizes
export const Sizes: StoryFn = TemplateAvatarGroupSizes.bind({});
Sizes.storyName = "Sizes";
