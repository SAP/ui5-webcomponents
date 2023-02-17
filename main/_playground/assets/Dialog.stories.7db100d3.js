import{y as w}from"./lit-html.9e2e9691.js";import{l as n}from"./if-defined.fd0de8da.js";import{o as r}from"./unsafe-html.9d6beac9.js";import{D as C}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const B={state:{control:"select",options:["Error","Information","None","Success","Warning"]},footer:{control:{type:"text"}},header:{control:{type:"text"}},show:{table:{category:"Methods"}},accessibleRole:{control:"select",options:["AlertDialog","Dialog","None"]},default:{control:{type:"text"}},applyFocus:{table:{category:"Methods"}},close:{table:{category:"Methods"}},isOpen:{table:{category:"Methods"}}},k={package:"@ui5/webcomponents"};var d=Object.freeze,L=Object.defineProperty,x=(e,$)=>d(L(e,"raw",{value:d($||e.slice())})),l,c;const g="ui5-list",K={title:"Main/Dialog",component:g,argTypes:B,parameters:{docs:{page:C({...k,component:g})}}},s=e=>w(l||(l=x([`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>
<ui5-dialog
  id="dialog"
  header-text="`,`"
  ?stretch="`,`"
  ?draggable="`,`"
  ?resizable="`,`"
  ?on-phone="`,`"
  ?on-desktop="`,`"
  state="`,`"
  initial-focus="`,`"
  ?prevent-focus-restore="`,`"
  ?open-by="`,`"
  accessible-name="`,`"
  accessible-name-ref="`,`"
>
  `,` 
  `,`
  `,`
</ui5-dialog>

<script>
  var dialogOpener = document.getElementById("dialogOpener");
  var dialog = document.getElementById("dialog"); 
  var dialogCloser = document.getElementById("dialogCloser");
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
<\/script>`])),n(e.headerText),n(e.stretch),n(e.draggable),n(e.resizable),n(e.onPhone),n(e.onDesktop),n(e.state),n(e.initialFocus),n(e.preventFocusRestore),n(e.open),n(e.accessibleName),n(e.accessibleNameRef),r(e.header),r(e.default),r(e.footer)),t=s.bind({});t.parameters={docs:{story:{inline:!1}}};t.args={headerText:"Register Form",default:`
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
    </section>`,footer:`
    <div slot="footer" style="display: flex; align-items: center;padding: .5rem">
      <div style="flex: 1;"></div>
      <ui5-button id="dialogCloser" design="Emphasized">Register</ui5-button>
    </div>`};const o=s.bind({});o.args={resizable:!0,draggable:!0,headerText:"Draggable/Resizable dialog",default:`
    <p>Resize this dialog by dragging it by its resize handle.</p>
    <p>This feature available only on Desktop.</p>
    <p>Move this dialog around the screen by dragging it by its header.</p>
    <p>This feature available only on Desktop.</p>`,footer:`
    <div slot="footer" style="display: flex; justify-content: flex-end; width: 100%; padding: .25rem 1rem;">
      <ui5-button id="dialogCloser" design="Emphasized">OK</ui5-button>
    </div>`};o.parameters={docs:{story:{inline:!1}}};const i=s.bind({});i.storyName="SAP Fiori Styled Footer";i.args={headerText:"SAP Fiori Styled Footer",default:"<p>Adding custom styles to achieve the look and feel of a SAP Fiori footer</p>",footer:`
    <div slot="footer" style="display: flex; align-items: center; justify-content: end; width: 100%; box-sizing: border-box;">
      <ui5-button design="Emphasized" style="min-width: 4rem;">OK</ui5-button>
      <ui5-button id="dialogCloser" style="margin: 0 0 0 0.5rem; min-width: 4rem;">Cancel</ui5-button>
    </div>`};i.parameters={docs:{story:{inline:!1}}};const a=()=>w(c||(c=x([`
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
    var dialogOpenerError = document.getElementById("error-state");
    var dialogError = document.getElementById("error-state-dialog");
    var dialogCloserError = document.getElementById("error-close");
    dialogOpenerError.addEventListener("click", function () {
      dialogError.show();
    });
    dialogCloserError.addEventListener("click", function () {
      dialogError.close();
    });
    var dialogOpenerInfo = document.getElementById("information-state");
    var dialogInfo = document.getElementById("information-state-dialog");
    var dialogCloserInfo = document.getElementById("information-close");
    dialogOpenerInfo.addEventListener("click", function () {
      dialogInfo.show();
    });
    dialogCloserInfo.addEventListener("click", function () {
      dialogInfo.close();
    });
    var dialogOpenerSuccess = document.getElementById("success-state");
    var dialogSuccess = document.getElementById("success-state-dialog");
    var dialogCloserSuccess = document.getElementById("success-close");
    dialogOpenerSuccess.addEventListener("click", function () {
      dialogSuccess.show();
    });
    dialogCloserSuccess.addEventListener("click", function () {
      dialogSuccess.close();
    });
    var dialogOpenerWarning = document.getElementById("warning-state");
    var dialogWarning = document.getElementById("warning-state-dialog");
    var dialogCloserWarning = document.getElementById("warning-close");
    dialogOpenerWarning.addEventListener("click", function () {
      dialogWarning.show();
    });
    dialogCloserWarning.addEventListener("click", function () {
      dialogWarning.close();
    });
  <\/script>
`])));a.parameters={docs:{story:{inline:!1}}};var u,f,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>
<ui5-dialog
  id="dialog"
  header-text="\${ifDefined(args.headerText)}"
  ?stretch="\${ifDefined(args.stretch)}"
  ?draggable="\${ifDefined(args.draggable)}"
  ?resizable="\${ifDefined(args.resizable)}"
  ?on-phone="\${ifDefined(args.onPhone)}"
  ?on-desktop="\${ifDefined(args.onDesktop)}"
  state="\${ifDefined(args.state)}"
  initial-focus="\${ifDefined(args.initialFocus)}"
  ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
  ?open-by="\${ifDefined(args.open)}"
  accessible-name="\${ifDefined(args.accessibleName)}"
  accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
  \${unsafeHTML(args.header)} 
  \${unsafeHTML(args.default)}
  \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
  var dialogOpener = document.getElementById("dialogOpener");
  var dialog = document.getElementById("dialog"); 
  var dialogCloser = document.getElementById("dialogCloser");
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
<\/script>\`;
}`,...(p=(f=t.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var m,b,v;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>
<ui5-dialog
  id="dialog"
  header-text="\${ifDefined(args.headerText)}"
  ?stretch="\${ifDefined(args.stretch)}"
  ?draggable="\${ifDefined(args.draggable)}"
  ?resizable="\${ifDefined(args.resizable)}"
  ?on-phone="\${ifDefined(args.onPhone)}"
  ?on-desktop="\${ifDefined(args.onDesktop)}"
  state="\${ifDefined(args.state)}"
  initial-focus="\${ifDefined(args.initialFocus)}"
  ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
  ?open-by="\${ifDefined(args.open)}"
  accessible-name="\${ifDefined(args.accessibleName)}"
  accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
  \${unsafeHTML(args.header)} 
  \${unsafeHTML(args.default)}
  \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
  var dialogOpener = document.getElementById("dialogOpener");
  var dialog = document.getElementById("dialog"); 
  var dialogCloser = document.getElementById("dialogCloser");
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
<\/script>\`;
}`,...(v=(b=o.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var y,h,E;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => {
  return html\`
<ui5-button id="dialogOpener">Open Dialog</ui5-button>
<ui5-dialog
  id="dialog"
  header-text="\${ifDefined(args.headerText)}"
  ?stretch="\${ifDefined(args.stretch)}"
  ?draggable="\${ifDefined(args.draggable)}"
  ?resizable="\${ifDefined(args.resizable)}"
  ?on-phone="\${ifDefined(args.onPhone)}"
  ?on-desktop="\${ifDefined(args.onDesktop)}"
  state="\${ifDefined(args.state)}"
  initial-focus="\${ifDefined(args.initialFocus)}"
  ?prevent-focus-restore="\${ifDefined(args.preventFocusRestore)}"
  ?open-by="\${ifDefined(args.open)}"
  accessible-name="\${ifDefined(args.accessibleName)}"
  accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
  \${unsafeHTML(args.header)} 
  \${unsafeHTML(args.default)}
  \${unsafeHTML(args.footer)}
</ui5-dialog>

<script>
  var dialogOpener = document.getElementById("dialogOpener");
  var dialog = document.getElementById("dialog"); 
  var dialogCloser = document.getElementById("dialogCloser");
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
<\/script>\`;
}`,...(E=(h=i.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};var D,I,O;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`() => html\`
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
    var dialogOpenerError = document.getElementById("error-state");
    var dialogError = document.getElementById("error-state-dialog");
    var dialogCloserError = document.getElementById("error-close");
    dialogOpenerError.addEventListener("click", function () {
      dialogError.show();
    });
    dialogCloserError.addEventListener("click", function () {
      dialogError.close();
    });
    var dialogOpenerInfo = document.getElementById("information-state");
    var dialogInfo = document.getElementById("information-state-dialog");
    var dialogCloserInfo = document.getElementById("information-close");
    dialogOpenerInfo.addEventListener("click", function () {
      dialogInfo.show();
    });
    dialogCloserInfo.addEventListener("click", function () {
      dialogInfo.close();
    });
    var dialogOpenerSuccess = document.getElementById("success-state");
    var dialogSuccess = document.getElementById("success-state-dialog");
    var dialogCloserSuccess = document.getElementById("success-close");
    dialogOpenerSuccess.addEventListener("click", function () {
      dialogSuccess.show();
    });
    dialogCloserSuccess.addEventListener("click", function () {
      dialogSuccess.close();
    });
    var dialogOpenerWarning = document.getElementById("warning-state");
    var dialogWarning = document.getElementById("warning-state-dialog");
    var dialogCloserWarning = document.getElementById("warning-close");
    dialogOpenerWarning.addEventListener("click", function () {
      dialogWarning.show();
    });
    dialogCloserWarning.addEventListener("click", function () {
      dialogWarning.close();
    });
  <\/script>
\``,...(O=(I=a.parameters)==null?void 0:I.docs)==null?void 0:O.source}}};const U=["Basic","DraggableAndResizable","FioriDialog","StateProperties"];export{t as Basic,o as DraggableAndResizable,i as FioriDialog,a as StateProperties,U as __namedExportsOrder,K as default};
//# sourceMappingURL=Dialog.stories.7db100d3.js.map
