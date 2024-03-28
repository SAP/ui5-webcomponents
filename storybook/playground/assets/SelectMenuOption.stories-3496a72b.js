import{x as r}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as i}from"./unsafe-html-0ddd83da.js";const d={type:{control:"select",options:["Inactive","Active","Detail","Navigation"]},highlight:{control:"select",options:["None","Success","Warning","Error","Information"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},deleteButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}}},_={package:"@ui5/webcomponents",since:"1.17.0",tagName:"ui5-select-menu-option",showDefaultStoryOnly:!0};var s=Object.freeze,p=Object.defineProperty,m=(e,u)=>s(p(e,"raw",{value:s(u||e.slice())})),c;const y={title:"Main/Select/Select Menu Option",component:"SelectMenuOption",argTypes:d},f=e=>r(c||(c=m([`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  <ui5-select-menu-option
    accessibility-attributes="`,`"
    ?disabled="`,`"
    display-text="`,`"
    ?navigated="`,`"
    type="`,`"
    value="`,`"
    accessible-name="`,`"
    ?selected="`,`"
  >
  `,`
  `,`
  </ui5-select-menu-option>
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
<\/script>`])),t(e.accessibilityAttributes),t(e.disabled),t(e.displayText),t(e.navigated),t(e.type),t(e.value),t(e.accessibleName),t(e.selected),i(e.default),i(e.deleteButton)),n=f.bind({});n.tags=["_hidden_"];n.args={displayText:"AR",default:`<div class="optionContent">
  <ui5-icon name="soccer"></ui5-icon>
  Argentina
  <ui5-icon name="employee"></ui5-icon>
</div>`};var a,o,l;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`args => {
  return html\`<style>
  .optionContent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width:100%;
  }
</style>
<ui5-select-menu id="selectMenu">
  <ui5-select-menu-option
    accessibility-attributes="\${ifDefined(args.accessibilityAttributes)}"
    ?disabled="\${ifDefined(args.disabled)}"
    display-text="\${ifDefined(args.displayText)}"
    ?navigated="\${ifDefined(args.navigated)}"
    type="\${ifDefined(args.type)}"
    value="\${ifDefined(args.value)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    ?selected="\${ifDefined(args.selected)}"
  >
  \${unsafeHTML(args.default)}
  \${unsafeHTML(args.deleteButton)}
  </ui5-select-menu-option>
</ui5-select-menu>

<ui5-select menu="selectMenu"></ui5-select>
<script>
    var selectMenu = document.querySelector("#selectMenu");

    document.body.appendChild(selectMenu);
<\/script>\`;
}`,...(l=(o=n.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const b=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:n,__namedExportsOrder:b,default:y},Symbol.toStringTag,{value:"Module"}));export{x as C,_ as c};
