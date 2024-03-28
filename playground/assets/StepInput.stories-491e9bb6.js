import{x as d}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as M}from"./unsafe-html-0ddd83da.js";const w={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"value-state-change":{description:`Fired before the value state of the component is updated internally.
The event is preventable, meaning that if it's default action is
prevented, the component will not update the value state.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"valueState",_ui5privacy:"public",description:"The new `valueState` that will be set."},{type:{text:"boolean"},name:"valid",_ui5privacy:"public",description:"Indicator if the value is in between the min and max value."}]}}},_={package:"@ui5/webcomponents",since:"1.0.0-rc.13",tagName:"ui5-step-input"},N={title:"Main/StepInput",component:"StepInput",argTypes:w},l=e=>d`
<div style="max-width: 13rem">
    <ui5-step-input
        value="${a(e.value)}"
        value-state="${a(e.valueState)}"
        value-precision="${a(e.valuePrecision)}"
        min="${a(e.min)}"
        max="${a(e.max)}"
        step="${a(e.step)}"
        ?required="${a(e.required)}"
        ?readonly="${a(e.readonly)}"
        ?disabled="${a(e.disabled)}"
        placeholder="${a(e.placeholder)}"
        name="${a(e.name)}"
        accessible-name="${a(e.accessibleName)}"
        accessible-name-ref="${a(e.accessibleNameRef)}"
        id="${a(e.id)}"
        style="${a(e.style)}"
    >
        ${M(e.valueStateMessage)}
    </ui5-step-input>
</div>`,s=l.bind({});s.args={value:5};const r=()=>d`
    <div style="max-width: 13rem"> <ui5-step-input value-state="Success" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Warning" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Error" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Information" value="5"></ui5-step-input> </div> <br>
`,n=l.bind({});n.storyName="Min/Max and Step Values";n.args={value:0,min:-50,max:50,step:10};const t=l.bind({});t.args={value:5,min:0,max:10,step:.5,valuePrecision:1};const i=l.bind({});i.storyName="With Text Alignment";i.args={id:"myStepInput",style:"text-align: left",placeholder:"Enter your Number",required:!0};i.decorators=[e=>d`<ui5-label class="samples-big-margin-right" for="myStepInput">Number is left-aligned</ui5-label>
    ${e()}`];var u,f,p;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`args => html\`
<div style="max-width: 13rem">
    <ui5-step-input
        value="\${ifDefined(args.value)}"
        value-state="\${ifDefined(args.valueState)}"
        value-precision="\${ifDefined(args.valuePrecision)}"
        min="\${ifDefined(args.min)}"
        max="\${ifDefined(args.max)}"
        step="\${ifDefined(args.step)}"
        ?required="\${ifDefined(args.required)}"
        ?readonly="\${ifDefined(args.readonly)}"
        ?disabled="\${ifDefined(args.disabled)}"
        placeholder="\${ifDefined(args.placeholder)}"
        name="\${ifDefined(args.name)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        id="\${ifDefined(args.id)}"
        style="\${ifDefined(args.style)}"
    >
        \${unsafeHTML(args.valueStateMessage)}
    </ui5-step-input>
</div>\``,...(p=(f=s.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var o,m,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => html\`
    <div style="max-width: 13rem"> <ui5-step-input value-state="Success" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Warning" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Error" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Information" value="5"></ui5-step-input> </div> <br>
\``,...(c=(m=r.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var v,g,$;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`args => html\`
<div style="max-width: 13rem">
    <ui5-step-input
        value="\${ifDefined(args.value)}"
        value-state="\${ifDefined(args.valueState)}"
        value-precision="\${ifDefined(args.valuePrecision)}"
        min="\${ifDefined(args.min)}"
        max="\${ifDefined(args.max)}"
        step="\${ifDefined(args.step)}"
        ?required="\${ifDefined(args.required)}"
        ?readonly="\${ifDefined(args.readonly)}"
        ?disabled="\${ifDefined(args.disabled)}"
        placeholder="\${ifDefined(args.placeholder)}"
        name="\${ifDefined(args.name)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        id="\${ifDefined(args.id)}"
        style="\${ifDefined(args.style)}"
    >
        \${unsafeHTML(args.valueStateMessage)}
    </ui5-step-input>
</div>\``,...($=(g=n.parameters)==null?void 0:g.docs)==null?void 0:$.source}}};var D,b,y;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`args => html\`
<div style="max-width: 13rem">
    <ui5-step-input
        value="\${ifDefined(args.value)}"
        value-state="\${ifDefined(args.valueState)}"
        value-precision="\${ifDefined(args.valuePrecision)}"
        min="\${ifDefined(args.min)}"
        max="\${ifDefined(args.max)}"
        step="\${ifDefined(args.step)}"
        ?required="\${ifDefined(args.required)}"
        ?readonly="\${ifDefined(args.readonly)}"
        ?disabled="\${ifDefined(args.disabled)}"
        placeholder="\${ifDefined(args.placeholder)}"
        name="\${ifDefined(args.name)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        id="\${ifDefined(args.id)}"
        style="\${ifDefined(args.style)}"
    >
        \${unsafeHTML(args.valueStateMessage)}
    </ui5-step-input>
</div>\``,...(y=(b=t.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var h,x,S;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`args => html\`
<div style="max-width: 13rem">
    <ui5-step-input
        value="\${ifDefined(args.value)}"
        value-state="\${ifDefined(args.valueState)}"
        value-precision="\${ifDefined(args.valuePrecision)}"
        min="\${ifDefined(args.min)}"
        max="\${ifDefined(args.max)}"
        step="\${ifDefined(args.step)}"
        ?required="\${ifDefined(args.required)}"
        ?readonly="\${ifDefined(args.readonly)}"
        ?disabled="\${ifDefined(args.disabled)}"
        placeholder="\${ifDefined(args.placeholder)}"
        name="\${ifDefined(args.name)}"
        accessible-name="\${ifDefined(args.accessibleName)}"
        accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
        id="\${ifDefined(args.id)}"
        style="\${ifDefined(args.style)}"
    >
        \${unsafeHTML(args.valueStateMessage)}
    </ui5-step-input>
</div>\``,...(S=(x=i.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const q=["Basic","DifferentValueStates","MinMax","ValuePrecision","Label"],L=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,DifferentValueStates:r,Label:i,MinMax:n,ValuePrecision:t,__namedExportsOrder:q,default:N},Symbol.toStringTag,{value:"Module"}));export{L as C,_ as c};
