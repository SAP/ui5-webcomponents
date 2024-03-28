import{x as h}from"./lit-element-c5a2b594.js";import{l as n}from"./if-defined-c29cffe1.js";import{W as m}from"./WrappingType-b81e595a.js";const f={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},wrappingType:{control:"select",options:["None","Normal"]}},S={package:"@ui5/webcomponents",tagName:"ui5-checkbox"},p={title:"Main/Check Box",component:"CheckBox",argTypes:f},k=e=>h`<ui5-checkbox
        accessible-name-ref="${n(e.accessibleNameRef)}"
        accessible-name="${n(e.accessibleName)}"
        ?disabled="${n(e.disabled)}"
        ?readonly="${n(e.readonly)}"
        ?required="${n(e.required)}"
        ?indeterminate="${n(e.indeterminate)}"
        ?checked="${n(e.checked)}"
        ?display-only="${n(e.displayOnly)}"
        text="${n(e.text)}"
        value-state="${n(e.valueState)}"
        wrapping-type="${n(e.wrappingType)}"
        name="${n(e.name)}"
        style="${n(e.style)}"
    >
    </ui5-checkbox>`,c=k.bind({});c.args={text:"Basic"};const a=k.bind({});a.args={text:"ui5-checkbox with 'wrapping-type=Normal' set and some long text.",wrappingType:m.Normal,style:"width:200px",indeterminate:!0,checked:!0};const t=()=>h`
    <ui5-checkbox text="Success" value-state="Success"></ui5-checkbox>
    <ui5-checkbox text="Error" value-state="Error"></ui5-checkbox>
    <ui5-checkbox text="Warning" value-state="Warning"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Success disabled"
        disabled=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error disabled"
        disabled=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning disabled "
        disabled=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success readonly"
        readonly=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error readonly"
        readonly=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning readonly"
        readonly=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success indeterminate"
        value-state="Success"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error indeterminate"
        value-state="Error"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning indeterminate"
        value-state="Warning"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information indeterminate"
        value-state="Information"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
`;var i,r,o;c.parameters={...c.parameters,docs:{...(i=c.parameters)==null?void 0:i.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        ?display-only="${ifDefined(args.displayOnly)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(o=(r=c.parameters)==null?void 0:r.docs)==null?void 0:o.source}}};var s,d,u;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        ?display-only="${ifDefined(args.displayOnly)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var l,x,b;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => html\`
    <ui5-checkbox text="Success" value-state="Success"></ui5-checkbox>
    <ui5-checkbox text="Error" value-state="Error"></ui5-checkbox>
    <ui5-checkbox text="Warning" value-state="Warning"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Success disabled"
        disabled=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error disabled"
        disabled=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning disabled "
        disabled=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success readonly"
        readonly=""
        value-state="Success"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error readonly"
        readonly=""
        value-state="Error"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning readonly"
        readonly=""
        value-state="Warning"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Success indeterminate"
        value-state="Success"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Error indeterminate"
        value-state="Error"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Warning indeterminate"
        value-state="Warning"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information indeterminate"
        value-state="Information"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
\``,...(b=(x=t.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};const y=["Basic","Wrapping","States"],D=Object.freeze(Object.defineProperty({__proto__:null,Basic:c,States:t,Wrapping:a,__namedExportsOrder:y,default:p},Symbol.toStringTag,{value:"Module"}));export{D as C,S as c};
