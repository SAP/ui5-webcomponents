import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta } from "@storybook/web-components";

import type Avatar from "@ui5/webcomponents/dist/Avatar.js";
import AvatarSize from "@ui5/webcomponents/dist/types/AvatarSize.js";
import AvatarShape from "@ui5/webcomponents/dist/types/AvatarShape.js";

import argTypes from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

export default {
  title: "Components/Avatar",
  component: "ui5-avatar",
  argTypes,
} as Meta<Avatar>;

const Template: UI5StoryArgs<Avatar, StoryArgsSlots> = (args) =>
  html`<ui5-avatar
    icon="${ifDefined(args.icon)}"
    size="${ifDefined(args.size)}"
    shape="${ifDefined(args.shape)}"
    style="${ifDefined(args.style)}"
    initials="${ifDefined(args.initials)}"
    color-scheme="${ifDefined(args.colorScheme)}"
    ?interactive="${ifDefined(args.interactive)}"
    aria-haspopup="${ifDefined(args.ariaHaspopup)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-avatar>`;

// Basic
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
  initials: "FJ",
  interactive: true,
};

// With Image
export const WithImage = Template.bind({});
WithImage.storyName = "Avatar with image";
WithImage.args = {
  default: `<img
	alt="Woman 1"
	src="../assets/images/avatars/man_avatar_1.png"
/>`,
};

// Sizes
export const Size = Template.bind({});
Size.storyName = "Avatar Size";
Size.args = {
  size: AvatarSize.L,
  icon: "home",
};

// Styles
export const Styles = Template.bind({});
Styles.storyName = "Avatar Styles";
Styles.args = {
  size: AvatarSize.XL,
  shape: AvatarShape.Square,
  style: "width: 250px; height:250px; border: 1px solid var(--sapField_BorderColor)",
  default: `<img
	src="../assets/images/avatars/Lamp_avatar_01.jpg"
	alt="Lamp"
	style="object-fit: contain"
/>`,
};
