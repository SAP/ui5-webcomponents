import{y}from"./lit-html.9e2e9691.js";import{l as n}from"./if-defined.fd0de8da.js";import{D as $}from"./docs.7a9434d6.js";import{W as v}from"./WrappingType.7b16fe53.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const D={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},wrappingType:{control:"select",options:["None","Normal"]}},S={package:"@ui5/webcomponents"},o="ui5-checkbox",j={title:"Main/CheckBox",component:o,parameters:{docs:{page:$({...S,component:o})}},argTypes:D},r=e=>y`<ui5-checkbox
        accessible-name-ref="${n(e.accessibleNameRef)}"
        accessible-name="${n(e.accessibleName)}"
        ?disabled="${n(e.disabled)}"
        ?readonly="${n(e.readonly)}"
        ?required="${n(e.required)}"
        ?indeterminate="${n(e.indeterminate)}"
        ?checked="${n(e.checked)}"
        text="${n(e.text)}"
        value-state="${n(e.valueState)}"
        wrapping-type="${n(e.wrappingType)}"
        name="${n(e.name)}"
        style="${n(e.style)}"
    >
    </ui5-checkbox>`,a=r.bind({});a.args={text:"Basic"};const i=r.bind({});i.args={text:"ui5-checkbox with 'wrapping-type=Normal' set and some long text.",wrappingType:v.Normal,style:"width:200px"};const c=r.bind({});c.args={text:"Select / deselect all",indeterminate:!0,checked:!0};c.parameters={controls:{include:["indeterminate","checked"]}};const t=()=>y`
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
`;var s,d,u;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(u=(d=a.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var l,x,b;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(b=(x=i.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var h,k,m;c.parameters={...c.parameters,docs:{...(h=c.parameters)==null?void 0:h.docs,source:{originalSource:'args => html`<ui5-checkbox\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?indeterminate="${ifDefined(args.indeterminate)}"\n        ?checked="${ifDefined(args.checked)}"\n        text="${ifDefined(args.text)}"\n        value-state="${ifDefined(args.valueState)}"\n        wrapping-type="${ifDefined(args.wrappingType)}"\n        name="${ifDefined(args.name)}"\n        style="${ifDefined(args.style)}"\n    >\n    </ui5-checkbox>`',...(m=(k=c.parameters)==null?void 0:k.docs)==null?void 0:m.source}}};var f,p,g;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`() => html\`
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
\``,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const z=["Basic","Wrapping","Indeterminate","States"];export{a as Basic,c as Indeterminate,t as States,i as Wrapping,z as __namedExportsOrder,j as default};
//# sourceMappingURL=CheckBox.stories.c3b153dd.js.map
