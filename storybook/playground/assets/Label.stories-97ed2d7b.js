import{x as n}from"./lit-element-c5a2b594.js";import{o as w}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";import{W as b}from"./WrappingType-b81e595a.js";const x={wrappingType:{control:"select",options:["None","Normal"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},I={package:"@ui5/webcomponents",tagName:"ui5-label"},D={title:"Main/Label",component:"Label",argTypes:x},s=e=>n`
<ui5-label
    for="${i(e.for)}"
    ?required="${i(e.required)}"
    ?show-colon="${i(e.showColon)}"
    wrapping-type="${i(e.wrappingType)}"
    class="${i(e.className)}"
>${w(e.default)}</ui5-label>`,h=e=>(r,{args:$})=>n`
${r({args:{...$,for:e}})}
<ui5-input id="${e}"></ui5-input>`,a=s.bind({});a.args={showColon:!0,default:"Simple Label"};a.decorators=[h("myInputSimple")];const T=(e,{args:r})=>n`
<style>
    .w200 {
        width: 200px;
    }
</style>
${e({args:{...r,className:"w200"}})}`,t=s.bind({});t.args={wrappingType:b.Normal,showColon:!0,default:`Label that demonstrates how, if set to wrapping-type="Normal", the long labels could be wrapped. To test the truncation, use 'wrapping-type="None"`};t.decorators=[T,h("myInputWrapping")];const o=s.bind({});o.args={required:!0,showColon:!0};o.decorators=[(e,{args:r})=>n`
    ${e({args:{...r,for:"myInput",default:"First name"}})}
    <ui5-input id="myInput" required placeholder="Enter your name"></ui5-input>

    ${e({args:{...r,for:"myDatePicker",default:"Date of birth"}})}
    <ui5-date-picker id="myDatePicker" required></ui5-date-picker>

    ${e({args:{...r,for:"mySelect",default:"Job"}})}
    <ui5-select id="mySelect" required>
        <ui5-option>Manager</ui5-option>
        <ui5-option>Sales</ui5-option>
        <ui5-option selected>Developer</ui5-option>
    </ui5-select>

    ${e({args:{...r,for:"myTextArea",default:"Description"}})}
    <ui5-textarea id="myTextArea" required placeholder="Type as much text as you wish"></ui5-textarea>

    <div style="display: flex; align-items: center;">
        ${e({args:{...r,for:"myCheckBox",default:"Accept terms of use"}})}
        <ui5-checkbox id="myCheckBox" required></ui5-checkbox>
    </div>
`,e=>n`
<style>
    .f {
        display: flex;
        flex-direction: column;
    }
    .f > :nth-child(2n) {
        margin-bottom: 1.5rem;
    }
</style>

<div class="f">
    ${e()}
</div>`];var l,p,u;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  return html\`
<ui5-label
    for="\${ifDefined(args.for)}"
    ?required="\${ifDefined(args.required)}"
    ?show-colon="\${ifDefined(args.showColon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    class="\${ifDefined(args.className)}"
>\${unsafeHTML(args.default)}</ui5-label>\`;
}`,...(u=(p=a.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,c,f;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  return html\`
<ui5-label
    for="\${ifDefined(args.for)}"
    ?required="\${ifDefined(args.required)}"
    ?show-colon="\${ifDefined(args.showColon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    class="\${ifDefined(args.className)}"
>\${unsafeHTML(args.default)}</ui5-label>\`;
}`,...(f=(c=t.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var m,g,y;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  return html\`
<ui5-label
    for="\${ifDefined(args.for)}"
    ?required="\${ifDefined(args.required)}"
    ?show-colon="\${ifDefined(args.showColon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    class="\${ifDefined(args.className)}"
>\${unsafeHTML(args.default)}</ui5-label>\`;
}`,...(y=(g=o.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};const q=["Basic","WrappingText","UsageWithInputs"],L=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,UsageWithInputs:o,WrappingText:t,__namedExportsOrder:q,default:D},Symbol.toStringTag,{value:"Module"}));export{L as C,I as c};
