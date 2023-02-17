import{y as n}from"./lit-html.9e2e9691.js";import{l as a}from"./if-defined.fd0de8da.js";import{o as x}from"./unsafe-html.9d6beac9.js";import{D as v}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const E={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},default:{control:{type:"text"}},valueStateMessage:{control:{type:"text"}}},S={package:"@ui5/webcomponents",since:"0.8.0"},s="ui5-select",w={title:"Main/Select",component:s,subcomponents:{Option:"ui5-option"},argTypes:E,parameters:{docs:{page:v({...S,component:s})}}},h=e=>n`<ui5-select
    name="${a(e.name)}"
    ?disabled="${a(e.disabled)}"
    ?required="${a(e.required)}"
    value-state="${a(e.valueState)}"
    value-state-message="${a(e.valueStateMessage)}"
    selected-option="${a(e.selectedOption)}"
    accessible-name="${a(e.accessibleName)}"
    accessible-name-ref="${a(e.accessibleNameRef)}"
  >
    ${x(e.default)}
  </ui5-select> `,t=h.bind({});t.storyName="Basic";t.args={default:`<ui5-option icon="iphone">Phone</ui5-option>
    <ui5-option icon="ipad">Tablet</ui5-option>
    <ui5-option icon="laptop" selected="">Desktop</ui5-option>`};const i=()=>n`<ui5-select value-state="Success" class="select">
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
    </ui5-select>`;i.storyName="Value State";const o=()=>n` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>`;o.storyName="Two-column layout";var l,r,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  return html\`<ui5-select
    name="\${ifDefined(args.name)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?required="\${ifDefined(args.required)}"
    value-state="\${ifDefined(args.valueState)}"
    value-state-message="\${ifDefined(args.valueStateMessage)}"
    selected-option="\${ifDefined(args.selectedOption)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
  >
    \${unsafeHTML(args.default)}
  </ui5-select> \`;
}`,...(u=(r=t.parameters)==null?void 0:r.docs)==null?void 0:u.source}}};var m,c,d;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`() => html\`<ui5-select value-state="Success" class="select">
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
    </ui5-select>\``,...(d=(c=i.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var p,g,f;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>\``,...(f=(g=o.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};const O=["Basic","ValueStateAndValueStateMessage","TwoColumnLayout"];export{t as Basic,o as TwoColumnLayout,i as ValueStateAndValueStateMessage,O as __namedExportsOrder,w as default};
//# sourceMappingURL=Select.stories.cd04c7b6.js.map
