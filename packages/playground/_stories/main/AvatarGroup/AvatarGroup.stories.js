import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import argTypes from "./argTypes.js";

import TemplateGroupWithPopover from "./TemplateGroupWithPopover.js";
import TemplateIndividualWithPopover from "./TemplateIndividualWithPopover.js";
import TemplateAvatarGroupSizes from "./TemplateAvatarGroupSizes.js";

export default {
    title: "Components/AvatarGroup",
    component: "ui5-avatar-group",
    argTypes,
};

const Template = (args) =>
    html`<ui5-avatar-group
        .type="${ifDefined(args.type)}"
        .aria-haspopup="${ifDefined(args.ariaHaspopup)}"
        @ui5-click="${ifDefined(args["ui5-click"])}"
    >
        ${unsafeHTML(args.defaultSlot)}
</ui5-avatar-group> `;

// Basic
export const TypeGroup = Template.bind({});
TypeGroup.storyName = "Type Group";
TypeGroup.args = {
    ["ui5-click"]: (e) => action("ui5-click")(e.detail),
    defaultSlot: `
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
    ["ui5-click"]: (e) => action("ui5-click")(e.detail),
    defaultSlot: `
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
export const TypeIndividualWithPopover = TemplateIndividualWithPopover.bind({});
TypeIndividualWithPopover.storyName = "Type Individual with Popover";
TypeIndividualWithPopover.parameters = {
    docs: {
        // Opt-out of inline rendering
        inlineStories: false,
    },
};

// Type Group with Popover
export const TypeGroupWithPopover = TemplateGroupWithPopover.bind({});
TypeGroupWithPopover.storyName = "Type Group with Popover";
TypeGroupWithPopover.parameters = {
    docs: {
        // Opt-out of inline rendering
        inlineStories: false,
    },
};

// Sizes
export const Sizes = TemplateAvatarGroupSizes.bind({});
Sizes.storyName = "Sizes";
