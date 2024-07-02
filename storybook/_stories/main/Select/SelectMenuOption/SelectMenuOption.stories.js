import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Select/Select Menu Option",
    component: "SelectMenuOption",
    argTypes,
};
const Template = (args) => {
    return html `<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  <ui5-select-menu-option
    accessibility-attributes="${ifDefined(args.accessibilityAttributes)}"
    ?disabled="${ifDefined(args.disabled)}"
    display-text="${ifDefined(args.displayText)}"
    ?navigated="${ifDefined(args.navigated)}"
    type="${ifDefined(args.type)}"
    value="${ifDefined(args.value)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    ?selected="${ifDefined(args.selected)}"
  >
  ${unsafeHTML(args.default)}
  ${unsafeHTML(args.deleteButton)}
  </ui5-select-menu-option>
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
</script>`;
};
export const Basic = Template.bind({});
Basic.tags = ["_hidden_"];
Basic.args = {
    displayText: "AR",
    default: `<div class="optionContent">
  <ui5-icon name="soccer"></ui5-icon>
  Argentina
  <ui5-icon name="employee"></ui5-icon>
</div>`
};
//# sourceMappingURL=SelectMenuOption.stories.js.map