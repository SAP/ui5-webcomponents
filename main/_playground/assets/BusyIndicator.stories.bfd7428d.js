import{y as u}from"./lit-html.9e2e9691.js";import{D as d}from"./docs.7a9434d6.js";import"./index.8cb7a9d9.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.8974bf6a.js";import"./chunk-R4NKYYJA.15989c7a.js";const p={size:{control:"select",options:["Large","Medium","Small"]},default:{control:{type:"text"}}},m={package:"@ui5/webcomponents",since:"0.12.0"},e="ui5-busy-indicator",D={title:"Main/BusyIndicator",component:e,parameters:{docs:{page:d({...m,component:e})}},argTypes:p},i=()=>u`
<h3>Busy Indicator with different size</h3>
        <div class="snippet flex center">
            <ui5-busy-indicator active="" size="Small"></ui5-busy-indicator>
            <ui5-busy-indicator active="" size="Medium"></ui5-busy-indicator>
            <ui5-busy-indicator active="" size="Large"></ui5-busy-indicator>
        </div>
`,t=()=>u`
<h3>Busy Indicator wrapping other elements</h3>
    <div class="snippet flex">
        <ui5-button id="fetch-btn" style="width: 120px;">Fetch List Data</ui5-button>
        <ui5-busy-indicator id="busy-container" size="Medium">
            <ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
        </ui5-busy-indicator>
    </div>
`;var s,a,o;i.parameters={...i.parameters,docs:{...(s=i.parameters)==null?void 0:s.docs,source:{originalSource:`() => html\`
<h3>Busy Indicator with different size</h3>
        <div class="snippet flex center">
            <ui5-busy-indicator active="" size="Small"></ui5-busy-indicator>
            <ui5-busy-indicator active="" size="Medium"></ui5-busy-indicator>
            <ui5-busy-indicator active="" size="Large"></ui5-busy-indicator>
        </div>
\``,...(o=(a=i.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var r,n,c;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Busy Indicator wrapping other elements</h3>
    <div class="snippet flex">
        <ui5-button id="fetch-btn" style="width: 120px;">Fetch List Data</ui5-button>
        <ui5-busy-indicator id="busy-container" size="Medium">
            <ui5-list id="fetch-list" no-data-text="No Data" header-text="Available Items"></ui5-list>
        </ui5-busy-indicator>
    </div>
\``,...(c=(n=t.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const M=["Template0","Template1"];export{i as Template0,t as Template1,M as __namedExportsOrder,D as default};
//# sourceMappingURL=BusyIndicator.stories.bfd7428d.js.map
