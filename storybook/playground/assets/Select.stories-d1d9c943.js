import{x as s}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";import{o as b}from"./unsafe-html-0ddd83da.js";const M={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},selectedOption:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<IOption>"}}},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},label:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},change:{description:"Fired when the selected option changes.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"IOption",references:[{name:"IOption",package:"@ui5/webcomponents",module:"dist/Select.js"}]},name:"selectedOption",_ui5privacy:"public",description:"the selected option."}]}},"live-change":{description:`Fired when the user navigates through the options, but the selection is not finalized,
or when pressing the ESC key to revert the current selection.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"IOption",references:[{name:"IOption",package:"@ui5/webcomponents",module:"dist/Select.js"}]},name:"selectedOption",_ui5privacy:"public",description:"the selected option."}]}}},L={package:"@ui5/webcomponents",since:"0.8.0",tagName:"ui5-select"};var l=Object.freeze,T=Object.defineProperty,C=(e,S)=>l(T(e,"raw",{value:l(S||e.slice())})),u;const B={title:"Main/Select",component:"Select",argTypes:M},A=e=>s`<ui5-select
    name="${n(e.name)}"
    ?disabled="${n(e.disabled)}"
    ?required="${n(e.required)}"
    ?readonly="${n(e.readonly)}"
    value-state="${n(e.valueState)}"
    value-state-message="${n(e.valueStateMessage)}"
    selected-option="${n(e.selectedOption)}"
    accessible-name="${n(e.accessibleName)}"
    accessible-name-ref="${n(e.accessibleNameRef)}"
  >
    ${b(e.default)}
  </ui5-select> `,t=A.bind({});t.storyName="Basic";t.args={default:`<ui5-option icon="iphone">Phone</ui5-option>
    <ui5-option icon="ipad">Tablet</ui5-option>
    <ui5-option icon="laptop" selected="">Desktop</ui5-option>`};const i=()=>s`<ui5-select value-state="Success" class="select">
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
    </ui5-select>`;i.storyName="Value State";const o=()=>s` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>`;o.storyName="Two-column layout";const a=()=>s(u||(u=C([`
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
<\/script>`])));a.storyName="Custom Options";var c,r,m;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  return html\`<ui5-select
    name="\${ifDefined(args.name)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?required="\${ifDefined(args.required)}"
    ?readonly="\${ifDefined(args.readonly)}"
    value-state="\${ifDefined(args.valueState)}"
    value-state-message="\${ifDefined(args.valueStateMessage)}"
    selected-option="\${ifDefined(args.selectedOption)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
  >
    \${unsafeHTML(args.default)}
  </ui5-select> \`;
}`,...(m=(r=t.parameters)==null?void 0:r.docs)==null?void 0:m.source}}};var p,d,g;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`<ui5-select value-state="Success" class="select">
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
    </ui5-select>\``,...(g=(d=i.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var f,x,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`() => html\` <ui5-select class="select">
    <ui5-option additional-text="AT">Austria</ui5-option>
    <ui5-option additional-text="BE">Belgium</ui5-option>
    <ui5-option additional-text="BR">Brazil</ui5-option>
    <ui5-option additional-text="BG">Bulgaria</ui5-option>
    <ui5-option additional-text="CA">Canada</ui5-option>
  </ui5-select>\``,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,h,E;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`() => html\`
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
<\/script>\``,...(E=(h=a.parameters)==null?void 0:h.docs)==null?void 0:E.source}}};const I=["Basic","ValueStateAndValueStateMessage","TwoColumnLayout","CustomOptions"],w=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,CustomOptions:a,TwoColumnLayout:o,ValueStateAndValueStateMessage:i,__namedExportsOrder:I,default:B},Symbol.toStringTag,{value:"Module"}));export{w as C,L as c};
