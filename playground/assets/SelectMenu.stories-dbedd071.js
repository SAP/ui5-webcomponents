import{x as l}from"./lit-element-c5a2b594.js";import{o as a}from"./unsafe-html-0ddd83da.js";const r={default:{control:{type:"text"},table:{type:{summary:"Array<IOption>"}}}},g={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-select-menu",showDefaultStoryOnly:!0};var t=Object.freeze,p=Object.defineProperty,m=(n,u)=>t(p(n,"raw",{value:t(u||n.slice())})),i;const d={title:"Main/Select/Select Menu",component:"SelectMenu",argTypes:r},y=n=>l(i||(i=m([`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  `,`
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
<\/script>`])),a(n.default)),e=y.bind({});e.tags=["_hidden_"];e.args={default:`<ui5-select-menu-option display-text="AR">
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
</ui5-select-menu-option>`};var o,c,s;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  return html\`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  \${unsafeHTML(args.default)}
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
<\/script>\`;
}`,...(s=(c=e.parameters)==null?void 0:c.docs)==null?void 0:s.source}}};const f=["Basic"],v=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:f,default:d},Symbol.toStringTag,{value:"Module"}));export{v as C,g as c};
