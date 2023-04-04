import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import type { Meta, StoryFn } from "@storybook/web-components";

import type Dialog from "@ui5/webcomponents/dist/Dialog.js";

import argTypes, { componentInfo } from "./argTypes.js";
import type { StoryArgsSlots } from "./argTypes.js";
import type { UI5StoryArgs } from "../../../types.js";

import { DocsPage } from "../../../.storybook/docs";

const component = "ui5-list";

export default {
  title: "Main/Dialog",
  component,
  argTypes,
  parameters: {
    docs: {
      page: DocsPage({ ...componentInfo, component }),
    },
  },
} as Meta<Dialog>;

let index = 0;

const Template: UI5StoryArgs<Dialog, StoryArgsSlots> = (args) => {
  const id = index++;
  return html`
<ui5-button id="dialogOpener-${id}">Open Dialog</ui5-button>
<ui5-dialog
  id="dialog-${id}"
  header-text="${ifDefined(args.headerText)}"
  ?stretch="${ifDefined(args.stretch)}"
  ?draggable="${ifDefined(args.draggable)}"
  ?resizable="${ifDefined(args.resizable)}"
  ?on-phone="${ifDefined(args.onPhone)}"
  ?on-desktop="${ifDefined(args.onDesktop)}"
  state="${ifDefined(args.state)}"
  initial-focus="${ifDefined(args.initialFocus)}"
  ?prevent-focus-restore="${ifDefined(args.preventFocusRestore)}"
  ?open-by="${ifDefined(args.open)}"
  accessible-name="${ifDefined(args.accessibleName)}"
  accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
  ${unsafeHTML(args.header)}
  ${unsafeHTML(args.default)}
  ${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
  const dialogOpener = document.getElementById("dialogOpener-${id}");
  const dialog = document.getElementById("dialog-${id}"); 
  const dialogCloser = document.querySelector("#dialog-${id} .dialogCloser");
  dialogOpener.accessibilityAttributes = {
    hasPopup: "dialog",
    controls: dialog.id,
  };
  dialogOpener.addEventListener("click", function () {
    dialog.show();
  });
  dialogCloser.addEventListener("click", function () {
    dialog.close();
  });
</script>`;
};

export const Basic = Template.bind({});

Basic.args = {
  headerText: "Register Form",
  default: `
    <section class="login-form">
      <div>
        <ui5-label for="username" required="">Username: </ui5-label>
        <ui5-input id="username"></ui5-input>
      </div>
      <div>
        <ui5-label for="password" required="">Password: </ui5-label>
        <ui5-input id="password" type="Password" value-state="Error"></ui5-input>
      </div>
      <div>
        <ui5-label for="email" type="Email" required="">Email: </ui5-label>
        <ui5-input id="email"></ui5-input>
      </div>
      <div>
        <ui5-label for="address">Address: </ui5-label>
        <ui5-input id="address"></ui5-input>
      </div>
    </section>`,
  footer: `
    <div slot="footer" style="display: flex; align-items: center;padding: .5rem">
      <div style="flex: 1;"></div>
      <ui5-button id="dialogCloser" design="Emphasized">Register</ui5-button>
    </div>`,
};

export const DraggableAndResizable = Template.bind({});
DraggableAndResizable.args = {
  resizable: true,
  draggable: true,
  headerText: "Draggable/Resizable dialog",
  default: `
    <p>Resize this dialog by dragging it by its resize handle.</p>
    <p>This feature available only on Desktop.</p>
    <p>Move this dialog around the screen by dragging it by its header.</p>
    <p>This feature available only on Desktop.</p>`,
  footer: `
    <div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;">
      <ui5-button class="dialogCloser" design="Emphasized">OK</ui5-button>
    </div>`,
    };

export const FioriDialog = Template.bind({});
FioriDialog.storyName = "SAP Fiori Styled Footer";
FioriDialog.args = {
  headerText: "SAP Fiori Styled Footer",
  default: `<p>Adding custom styles to achieve the look and feel of a SAP Fiori footer</p>`,
  footer: `
    <div slot="footer" style="display: flex; align-items: center; justify-content: end; width: 100%; box-sizing: border-box;">
      <ui5-button design="Emphasized" style="min-width: 4rem;">OK</ui5-button>
      <ui5-button class="dialogCloser" style="margin: 0 0 0 0.5rem; min-width: 4rem;">Cancel</ui5-button>
    </div>`,
};

export const StateProperties: StoryFn = () => html`
  <h3>Dialogs with various state properties</h3>
  <ui5-button id="error-state">Open error state dialog</ui5-button>
  <ui5-button id="information-state">Open information state dialog</ui5-button>
  <ui5-button id="success-state">Open success state dialog</ui5-button>
  <ui5-button id="warning-state">Open warning state dialog</ui5-button>
  <ui5-dialog id="error-state-dialog" header-text="Error" state="Error">
    <p>Error state dialog</p>
    <div
      slot="footer"
      style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;"
    >
      <ui5-button id="error-close">Close</ui5-button>
    </div>
  </ui5-dialog>
  <ui5-dialog
    id="information-state-dialog"
    header-text="Information"
    state="Information"
  >
    <p>Information state dialog</p>
    <div
      slot="footer"
      style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;"
    >
      <ui5-button id="information-close">Close</ui5-button>
    </div>
  </ui5-dialog>
  <ui5-dialog id="success-state-dialog" header-text="Success" state="Success">
    <p>Success state dialog</p>
    <div
      slot="footer"
      style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;"
    >
      <ui5-button id="success-close">Close</ui5-button>
    </div>
  </ui5-dialog>
  <ui5-dialog id="warning-state-dialog" header-text="Warning" state="Warning">
    <p>Warning state dialog</p>
    <div
      slot="footer"
      style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;"
    >
      <ui5-button id="warning-close">Close</ui5-button>
    </div>
  </ui5-dialog>
  <script>
    const dialogOpenerError = document.getElementById("error-state");
    const dialogError = document.getElementById("error-state-dialog");
    const dialogCloserError = document.getElementById("error-close");
    dialogOpenerError.addEventListener("click", function () {
      dialogError.show();
    });
    dialogCloserError.addEventListener("click", function () {
      dialogError.close();
    });
    const dialogOpenerInfo = document.getElementById("information-state");
    const dialogInfo = document.getElementById("information-state-dialog");
    const dialogCloserInfo = document.getElementById("information-close");
    dialogOpenerInfo.addEventListener("click", function () {
      dialogInfo.show();
    });
    dialogCloserInfo.addEventListener("click", function () {
      dialogInfo.close();
    });
    const dialogOpenerSuccess = document.getElementById("success-state");
    const dialogSuccess = document.getElementById("success-state-dialog");
    const dialogCloserSuccess = document.getElementById("success-close");
    dialogOpenerSuccess.addEventListener("click", function () {
      dialogSuccess.show();
    });
    dialogCloserSuccess.addEventListener("click", function () {
      dialogSuccess.close();
    });
    const dialogOpenerWarning = document.getElementById("warning-state");
    const dialogWarning = document.getElementById("warning-state-dialog");
    const dialogCloserWarning = document.getElementById("warning-close");
    dialogOpenerWarning.addEventListener("click", function () {
      dialogWarning.show();
    });
    dialogCloserWarning.addEventListener("click", function () {
      dialogWarning.close();
    });
  </script>
`;
