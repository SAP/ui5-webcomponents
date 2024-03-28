import{x as o}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{W as x}from"./WrappingType-b81e595a.js";const D={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},wrappingType:{control:"select",options:["None","Normal"]}},h={package:"@ui5/webcomponents",tagName:"ui5-radio-button"},v={title:"Main/Radio Button",component:"RadioButton",argTypes:D},g=e=>o`
<ui5-radio-button
    name="${t(e.name)}"
    text="${t(e.text)}"
    ?required="${t(e.required)}"
    ?checked="${t(e.checked)}"
    ?disabled="${t(e.disabled)}"
    ?readonly="${t(e.readonly)}"
    value-state="${t(e.valueState)}"
    value="${t(e.value)}"
    accessible-name="${t(e.accessibleName)}"
    accessible-name-ref="${t(e.accessibleNameRef)}"
    wrapping-type="${t(e.wrappingType)}"
>
<ui5-radio-button>`,a=g.bind({});a.args={name:"GroupA"};a.decorators=[(e,{args:$})=>{let r=0;return o`
            ${e({args:{text:`Option ${++r}`,checked:!0,...$}})}
            ${e({args:{text:`Option ${++r}`,...a.args}})}
            ${e({args:{text:`Option ${r++}`,...a.args}})}
        `}];const i=()=>o`
<ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
`,n=g.bind({});n.args={wrappingType:x.Normal,text:"ui5-radio-button with 'wrapping-type=Normal' set and some long text"};n.decorators=[e=>o`
<style>
    ui5-radio-button {
        width: 200px;
    }
</style>
${e()}`];var u,s,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`
<ui5-radio-button
    name="\${ifDefined(args.name)}"
    text="\${ifDefined(args.text)}"
    ?required="\${ifDefined(args.required)}"
    ?checked="\${ifDefined(args.checked)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?readonly="\${ifDefined(args.readonly)}"
    value-state="\${ifDefined(args.valueState)}"
    value="\${ifDefined(args.value)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
>
<ui5-radio-button>\`;
}`,...(d=(s=a.parameters)==null?void 0:s.docs)==null?void 0:d.source}}};var p,c,l;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`
<ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
<ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
\``,...(l=(c=i.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,b,f;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`args => {
  return html\`
<ui5-radio-button
    name="\${ifDefined(args.name)}"
    text="\${ifDefined(args.text)}"
    ?required="\${ifDefined(args.required)}"
    ?checked="\${ifDefined(args.checked)}"
    ?disabled="\${ifDefined(args.disabled)}"
    ?readonly="\${ifDefined(args.readonly)}"
    value-state="\${ifDefined(args.valueState)}"
    value="\${ifDefined(args.value)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
>
<ui5-radio-button>\`;
}`,...(f=(b=n.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};const O=["Basic","Variations","Wrapping"],N=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,Variations:i,Wrapping:n,__namedExportsOrder:O,default:v},Symbol.toStringTag,{value:"Module"}));export{N as C,h as c};
