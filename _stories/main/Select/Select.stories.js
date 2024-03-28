import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
export default {
    title: "Main/Select",
    component: "Select",
    argTypes,
};
const Template = (args) => {
    return html `<ui5-select
    name="${ifDefined(args.name)}"
    ?disabled="${ifDefined(args.disabled)}"
    ?required="${ifDefined(args.required)}"
    ?readonly="${ifDefined(args.readonly)}"
    value-state="${ifDefined(args.valueState)}"
    value-state-message="${ifDefined(args.valueStateMessage)}"
    selected-option="${ifDefined(args.selectedOption)}"
    accessible-name="${ifDefined(args.accessibleName)}"
    accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
  >
    ${unsafeHTML(args.default)}
  </ui5-select> `;
};
export const Basic = Template.bind({});
Basic.storyName = "Basic";
Basic.args = {
    default: `<ui5-option icon="iphone">Phone</ui5-option>
	<ui5-option icon="ipad">Tablet</ui5-option>
	<ui5-option icon="laptop" selected="">Desktop</ui5-option>`,
};
export const ValueStateAndValueStateMessage = () => html `<ui5-select value-state="Success" class="select">
      <ui5-option icon="meal" selected="">Apple</ui5-option>
      <ui5-option icon="meal">Avocado</ui5-option>
      <ui5-option icon="meal">Mango</ui5-option>
    </ui5-select>
    <ui5-select value-state="Warning" class="select">
      <ui5-option icon="meal">Orange</ui5-option>
      <ui5-option icon="meal" selected="">Pumpkin</ui5-option>
      <ui5-option icon="meal">Carrot</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>
    <ui5-select value-state="Error" class="select">
      <ui5-option icon="meal">Strawberry</ui5-option>
      <ui5-option icon="meal">Tomato</ui5-option>
      <ui5-option icon="meal" selected="">Red Chili Pepper</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>
    <ui5-select value-state="Information" class="select">
      <ui5-option icon="meal">Blueberry</ui5-option>
      <ui5-option icon="meal">Grape</ui5-option>
      <ui5-option icon="meal" selected="">Plum</ui5-option>
      <div slot="valueStateMessage">
        Information message. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
      <div slot="valueStateMessage">
        Information message 2. This is a <a href="#">Link</a>. Extra long text
        used as an information message. Extra long text used as an information
        message - 2. Extra long text used as an information message - 3.
      </div>
    </ui5-select>
    <ui5-select class="select" readonly>
      <ui5-option icon="meal" selected="">Apple</ui5-option>
      <ui5-option icon="meal">Avocado</ui5-option>
      <ui5-option icon="meal">Mango</ui5-option>
    </ui5-select>`;
ValueStateAndValueStateMessage.storyName = "Value State";
export const TwoColumnLayout = () => html ` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>`;
TwoColumnLayout.storyName = "Two-column layout";
export const CustomOptions = () => html `
  <ui5-select menu="selectMenu"></ui5-select>



  <template id="selectMenuTemplate">
    <style>
      .optionContent {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width:100%;
      }
    </style>

    <ui5-select-menu id="selectMenu">
      <ui5-select-menu-option display-text="AR">
          <div class="optionContent">
              <ui5-icon name="soccer"></ui5-icon>
              Argentina
              <ui5-icon name="employee"></ui5-icon>
          </div>
      </ui5-select-menu-option>

      <ui5-select-menu-option display-text="BE">
          <div class="optionContent">
              <ui5-icon name="soccer"></ui5-icon>
              Belgium
              <ui5-icon name="employee"></ui5-icon>
          </div>
      </ui5-select-menu-option>

      <ui5-select-menu-option display-text="BR">
          <div class="optionContent">
              <ui5-icon name="soccer"></ui5-icon>
              Brazil
              <ui5-icon name="employee"></ui5-icon>
          </div>
      </ui5-select-menu-option>
  </ui5-select-menu>
</template>

<script>
    const template = document.querySelector("#selectMenuTemplate");
    const clone = template.content.cloneNode(true);

    document.body.appendChild(clone);
</script>`;
CustomOptions.storyName = "Custom Options";
//# sourceMappingURL=Select.stories.js.map