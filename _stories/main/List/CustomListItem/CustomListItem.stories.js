import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/List/Custom List Item",
    component: "CustomListItem",
    argTypes,
};
const Template = (args) => {
    return html ` <ui5-list>
    <ui5-li-custom
      accessible-name="${ifDefined(args.accessibleName)}"
      accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
      ?navigated="${ifDefined(args.navigated)}"
      type="${ifDefined(args.type)}"
      ?selected="${ifDefined(args.selected)}"
	  tooltip="${ifDefined(args.tooltip)}"
    >
      ${unsafeHTML(args.default)}
      ${unsafeHTML(args.deleteButton)}
    </ui5-li-custom>
  </ui5-list>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    default: `<ui5-button>Click me</ui5-button>
  <ui5-link href="https://www.google.bg" target="_blank">UI5 link</ui5-link>
  <ui5-radio-button text="Option B" disabled="disabled"></ui5-radio-button>
  <ui5-button>Click me</ui5-button>`,
};
//# sourceMappingURL=CustomListItem.stories.js.map