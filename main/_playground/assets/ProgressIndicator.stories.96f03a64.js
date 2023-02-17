import{y as S}from"./lit-html.9e2e9691.js";import{l as a}from"./if-defined.fd0de8da.js";import{D as h}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const V={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]}},b={package:"@ui5/webcomponents",since:"1.0.0-rc.8"},n="ui5-progress-indicator",M={title:"Main/ProgressIndicator",component:n,parameters:{docs:{page:h({...b,component:n})}},argTypes:V},t=e=>S`<ui5-progress-indicator
        ?disabled="${a(e.disabled)}"
        ?hide-value="${a(e.hideValue)}"
        value="${a(e.value)}"
        display-value="${a(e.displayValue)}"
        value-state="${a(e.valueState)}"
        style="${a(e.style)}"
    ></ui5-progress-indicator>`,r=t.bind({});r.args={value:25};const s=t.bind({});s.args={value:25,displayValue:"Custom Display Value"};const i=t.bind({});i.args={value:25,style:"height: 50px; width: 200px;"};const o=()=>S`
<ui5-progress-indicator
    value-state="None"
    value="25"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Error"
    value="50"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Warning"
    value="75"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Success"
    value="90"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Information"
    value="100"
></ui5-progress-indicator>
`;var u,l,d;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:'args => html`<ui5-progress-indicator\n        ?disabled="${ifDefined(args.disabled)}"\n        ?hide-value="${ifDefined(args.hideValue)}"\n        value="${ifDefined(args.value)}"\n        display-value="${ifDefined(args.displayValue)}"\n        value-state="${ifDefined(args.valueState)}"\n        style="${ifDefined(args.style)}"\n    ></ui5-progress-indicator>`',...(d=(l=r.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,p,g;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:'args => html`<ui5-progress-indicator\n        ?disabled="${ifDefined(args.disabled)}"\n        ?hide-value="${ifDefined(args.hideValue)}"\n        value="${ifDefined(args.value)}"\n        display-value="${ifDefined(args.displayValue)}"\n        value-state="${ifDefined(args.valueState)}"\n        style="${ifDefined(args.style)}"\n    ></ui5-progress-indicator>`',...(g=(p=s.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var m,v,f;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:'args => html`<ui5-progress-indicator\n        ?disabled="${ifDefined(args.disabled)}"\n        ?hide-value="${ifDefined(args.hideValue)}"\n        value="${ifDefined(args.value)}"\n        display-value="${ifDefined(args.displayValue)}"\n        value-state="${ifDefined(args.valueState)}"\n        style="${ifDefined(args.style)}"\n    ></ui5-progress-indicator>`',...(f=(v=i.parameters)==null?void 0:v.docs)==null?void 0:f.source}}};var $,y,D;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:`() => html\`
<ui5-progress-indicator
    value-state="None"
    value="25"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Error"
    value="50"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Warning"
    value="75"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Success"
    value="90"
></ui5-progress-indicator>
<ui5-progress-indicator
    value-state="Information"
    value="100"
></ui5-progress-indicator>
\``,...(D=(y=o.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const O=["Basic","DisplayValue","CustomSize","ValueStates"];export{r as Basic,i as CustomSize,s as DisplayValue,o as ValueStates,O as __namedExportsOrder,M as default};
//# sourceMappingURL=ProgressIndicator.stories.96f03a64.js.map
