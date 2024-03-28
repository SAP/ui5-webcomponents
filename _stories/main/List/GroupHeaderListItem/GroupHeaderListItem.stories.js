import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/List/Group Header List Item",
    component: "GroupHeaderListItem",
    argTypes,
};
const Template = (args) => {
    return html ` <ui5-list>
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
Basic.tags = ["_hidden_"];
Basic.args = {
    default: `Front End Developers`,
};
//# sourceMappingURL=GroupHeaderListItem.stories.js.map