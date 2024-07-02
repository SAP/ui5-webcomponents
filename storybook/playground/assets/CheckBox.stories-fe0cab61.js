import{x as h}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{W as m}from"./WrappingType-b81e595a.js";const f={valueState:{control:"select",options:["None","Positive","Critical","Negative","Information"]},wrappingType:{control:"select",options:["None","Normal"]}},N={package:"@ui5/webcomponents",tagName:"ui5-checkbox"},v={title:"Main/Check Box",component:"CheckBox",argTypes:f},k=e=>h`<ui5-checkbox
        accessible-name-ref="${i(e.accessibleNameRef)}"
        accessible-name="${i(e.accessibleName)}"
        ?disabled="${i(e.disabled)}"
        ?readonly="${i(e.readonly)}"
        ?required="${i(e.required)}"
        ?indeterminate="${i(e.indeterminate)}"
        ?checked="${i(e.checked)}"
        ?display-only="${i(e.displayOnly)}"
        text="${i(e.text)}"
        value-state="${i(e.valueState)}"
        wrapping-type="${i(e.wrappingType)}"
        name="${i(e.name)}"
        style="${i(e.style)}"
    >
    </ui5-checkbox>`,t=k.bind({});t.args={text:"Basic"};const a=k.bind({});a.args={text:"ui5-checkbox with 'wrapping-type=Normal' set and some long text.",wrappingType:m.Normal,style:"width:200px",indeterminate:!0,checked:!0};const c=()=>h`
    <ui5-checkbox text="Positive" value-state="Positive"></ui5-checkbox>
    <ui5-checkbox text="Negative" value-state="Negative"></ui5-checkbox>
    <ui5-checkbox text="Critical" value-state="Critical"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Positive disabled"
        disabled=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative disabled"
        disabled=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical disabled "
        disabled=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive readonly"
        readonly=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative readonly"
        readonly=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical readonly"
        readonly=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive indeterminate"
        value-state="Positive"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative indeterminate"
        value-state="Negative"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical indeterminate"
        value-state="Critical"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information indeterminate"
        value-state="Information"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
`;var n,o,d;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        ?display-only="${ifDefined(args.displayOnly)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(d=(o=t.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};var s,r,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        ?display-only="${ifDefined(args.displayOnly)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(l=(r=a.parameters)==null?void 0:r.docs)==null?void 0:l.source}}};var u,x,b;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
    <ui5-checkbox text="Positive" value-state="Positive"></ui5-checkbox>
    <ui5-checkbox text="Negative" value-state="Negative"></ui5-checkbox>
    <ui5-checkbox text="Critical" value-state="Critical"></ui5-checkbox>
    <ui5-checkbox text="Information" value-state="Information"></ui5-checkbox>
    <ui5-checkbox text="Disabled" disabled="" checked=""></ui5-checkbox>
    <ui5-checkbox text="Readonly" readonly="" checked=""></ui5-checkbox>
    <ui5-checkbox
        text="Positive disabled"
        disabled=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative disabled"
        disabled=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical disabled "
        disabled=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information disabled "
        disabled=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive readonly"
        readonly=""
        value-state="Positive"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative readonly"
        readonly=""
        value-state="Negative"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical readonly"
        readonly=""
        value-state="Critical"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information readonly"
        readonly=""
        value-state="Information"
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Positive indeterminate"
        value-state="Positive"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Negative indeterminate"
        value-state="Negative"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Critical indeterminate"
        value-state="Critical"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
    <ui5-checkbox
        text="Information indeterminate"
        value-state="Information"
        indeterminate=""
        checked=""
    ></ui5-checkbox>
\``,...(b=(x=c.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};const p=["Basic","Wrapping","States"],D=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,States:c,Wrapping:a,__namedExportsOrder:p,default:v},Symbol.toStringTag,{value:"Module"}));export{D as C,N as c};
