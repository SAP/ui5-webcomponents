import{x as d}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as M}from"./unsafe-html-0ddd83da.js";const N={valueState:{control:"select",options:["None","Positive","Critical","Negative","Information"]},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"value-state-change":{description:`Fired before the value state of the component is updated internally.
The event is preventable, meaning that if it's default action is
prevented, the component will not update the value state.`,control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"string"},name:"valueState",_ui5privacy:"public",description:"The new `valueState` that will be set."},{type:{text:"boolean"},name:"valid",_ui5privacy:"public",description:"Indicator if the value is in between the min and max value."}]}}},_={package:"@ui5/webcomponents",since:"1.0.0-rc.13",tagName:"ui5-step-input"},w={title:"Main/StepInput",component:"StepInput",argTypes:N},l=e=>d`
<div style="max-width: 13rem">
    <ui5-step-input
        value="${i(e.value)}"
        value-state="${i(e.valueState)}"
        value-precision="${i(e.valuePrecision)}"
        min="${i(e.min)}"
        max="${i(e.max)}"
        step="${i(e.step)}"
        ?required="${i(e.required)}"
        ?readonly="${i(e.readonly)}"
        ?disabled="${i(e.disabled)}"
        placeholder="${i(e.placeholder)}"
        name="${i(e.name)}"
        accessible-name="${i(e.accessibleName)}"
        accessible-name-ref="${i(e.accessibleNameRef)}"
        id="${i(e.id)}"
        style="${i(e.style)}"
    >
        ${M(e.valueStateMessage)}
    </ui5-step-input>
</div>`,t=l.bind({});t.args={value:5};const r=()=>d`
    <div style="max-width: 13rem"> <ui5-step-input value-state="Positive" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Critical" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Negative" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Information" value="5"></ui5-step-input> </div> <br>
`,n=l.bind({});n.storyName="Min/Max and Step Values";n.args={value:0,min:-50,max:50,step:10};const s=l.bind({});s.args={value:5,min:0,max:10,step:.5,valuePrecision:1};const a=l.bind({});a.storyName="With Text Alignment";a.args={id:"myStepInput",style:"text-align: left",placeholder:"Enter your Number",required:!0};a.decorators=[e=>d`<ui5-label class="samples-big-margin-right" for="myStepInput">Number is left-aligned</ui5-label>
    ${e()}`];var u,f,p;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`args => html\`
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
</div>\``,...(p=(f=t.parameters)==null?void 0:f.docs)==null?void 0:p.source}}};var o,m,c;r.parameters={...r.parameters,docs:{...(o=r.parameters)==null?void 0:o.docs,source:{originalSource:`() => html\`
    <div style="max-width: 13rem"> <ui5-step-input value-state="Positive" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Critical" value="5"></ui5-step-input> </div> <br>
    <div style="max-width: 13rem"> <ui5-step-input value-state="Negative" value="5"></ui5-step-input> </div> <br>
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
</div>\``,...($=(g=n.parameters)==null?void 0:g.docs)==null?void 0:$.source}}};var D,b,y;s.parameters={...s.parameters,docs:{...(D=s.parameters)==null?void 0:D.docs,source:{originalSource:`args => html\`
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
</div>\``,...(y=(b=s.parameters)==null?void 0:b.docs)==null?void 0:y.source}}};var h,x,S;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`args => html\`
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
</div>\``,...(S=(x=a.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};const P=["Basic","DifferentValueStates","MinMax","ValuePrecision","Label"],L=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,DifferentValueStates:r,Label:a,MinMax:n,ValuePrecision:s,__namedExportsOrder:P,default:w},Symbol.toStringTag,{value:"Module"}));export{L as C,_ as c};
