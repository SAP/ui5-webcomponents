import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import TemplateGroupWithPopover from "./TemplateGroupWithPopover.js";
import TemplateIndividualWithPopover from "./TemplateIndividualWithPopover.js";
import TemplateAvatarGroupTypesAndSizes from "./TemplateAvatarGroupTypesAndSizes.js";
export default {
    title: "Main/AvatarGroup",
    component: "AvatarGroup",
    argTypes,
};
const Template = (args) => html `<ui5-avatar-group
    .type="${ifDefined(args.type)}"
    .aria-haspopup="${ifDefined(args.ariaHaspopup)}"
  >
    ${unsafeHTML(args.default)}
    ${unsafeHTML(args.overflowButton)}
  </ui5-avatar-group> `;
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    default: `
    <ui5-avatar-group>
      <ui5-avatar size="S">
          <img src="../assets/images/avatars/man_avatar_1.png" alt="Man Avatar 1" />
      </ui5-avatar>
      <ui5-avatar size="S" initials="JD"></ui5-avatar>
      <ui5-avatar size="S">
          <img src="../assets/images/avatars/woman_avatar_5.png" alt="Woman Avatar 5" />
      </ui5-avatar>
      <ui5-avatar size="S">
          <img src="../assets/images/avatars/man_avatar_3.png" alt="Man Avatar 3" />
      </ui5-avatar>
    </ui5-avatar-group>`
};
export const TypesAndSizes = TemplateAvatarGroupTypesAndSizes.bind({});
export const TypeIndividualWithPopover = TemplateIndividualWithPopover.bind({});
export const TypeGroupWithPopover = TemplateGroupWithPopover.bind({});
//# sourceMappingURL=AvatarGroup.stories.js.map