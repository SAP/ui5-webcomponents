import{y as t}from"./lit-html.9e2e9691.js";import{D as y}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const T={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},default:{control:{type:"text"}},icon:{control:{type:"text"}},valueStateMessage:{control:{type:"text"}}},f={package:"@ui5/webcomponents",since:"1.0.0-rc.6"},c="ui5-combobox",P={title:"Main/ComboBox",component:c,subcomponents:{ComboBoxItem:"ui5-cb-item",ComboBoxGroupItem:"ui5-cb-group-item"},parameters:{docs:{page:y({...f,component:c})}},argTypes:T},i=()=>t`
<h3>Basic Example</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="Enter value">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Success" value="Item 1">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Warning" value="Item 2">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Error" value="Item 3">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
    </div>
`,e=()=>t`
<h3>Disabled and Readonly properties</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox value="Disabled" disabled="">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value="Readonly" readonly="">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
    </div>
`,m=()=>t`
<h3>Filters (StartsWithPerTerm(default), StartsWith, Contains)</h3>
        <div class="snippet responsive-snippet">
            <ui5-combobox placeholder="Starts With Per Term filter (default)">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
            <ui5-combobox placeholder="StartsWith" filter="StartsWith">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
            <ui5-combobox placeholder="Contains" filter="Contains">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
        </div>
`,o=()=>t`
<h3>ComboBox with Two-Column Layout Items</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="Two-column Layout">
            <ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
            <ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
            <ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
            <ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
            <ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
        </ui5-combobox>
    </div>
`,u=()=>t`
<h3>ComboBox with Grouping of Items</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="ComboBox with grouping of suggestions">
            <ui5-cb-group-item text="A"></ui5-cb-group-item>
            <ui5-cb-item text="Argentina"></ui5-cb-item>
            <ui5-cb-item text="Australia"></ui5-cb-item>
            <ui5-cb-item text="Austria"></ui5-cb-item>	
            <ui5-cb-group-item text="B"></ui5-cb-group-item>
            <ui5-cb-item text="Bahrain"></ui5-cb-item>
            <ui5-cb-item text="Belgium"></ui5-cb-item>
            <ui5-cb-item text="Brazil"></ui5-cb-item>
            <ui5-cb-group-item text="C"></ui5-cb-group-item>
            <ui5-cb-item text="Canada"></ui5-cb-item>
            <ui5-cb-item text="Chile"></ui5-cb-item>
        </ui5-combobox>
    </div>
`;var b,a,n;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`() => html\`
<h3>Basic Example</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="Enter value">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Success" value="Item 1">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Warning" value="Item 2">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value-state="Error" value="Item 3">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
    </div>
\``,...(n=(a=i.parameters)==null?void 0:a.docs)==null?void 0:n.source}}};var r,s,x;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Disabled and Readonly properties</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox value="Disabled" disabled="">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
        <ui5-combobox value="Readonly" readonly="">
            <ui5-cb-item text="Item 1"></ui5-cb-item>
            <ui5-cb-item text="Item 2"></ui5-cb-item>
            <ui5-cb-item text="Item 3"></ui5-cb-item>
        </ui5-combobox>
    </div>
\``,...(x=(s=e.parameters)==null?void 0:s.docs)==null?void 0:x.source}}};var l,p,d;m.parameters={...m.parameters,docs:{...(l=m.parameters)==null?void 0:l.docs,source:{originalSource:`() => html\`
<h3>Filters (StartsWithPerTerm(default), StartsWith, Contains)</h3>
        <div class="snippet responsive-snippet">
            <ui5-combobox placeholder="Starts With Per Term filter (default)">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
            <ui5-combobox placeholder="StartsWith" filter="StartsWith">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
            <ui5-combobox placeholder="Contains" filter="Contains">
                <ui5-cb-item text="Austria"></ui5-cb-item>
                <ui5-cb-item text="Bulgaria"></ui5-cb-item>
                <ui5-cb-item text="Germany"></ui5-cb-item>
                <ui5-cb-item text="United Kingdom"></ui5-cb-item>
                <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
            </ui5-combobox>
        </div>
\``,...(d=(p=m.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var h,g,v;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>ComboBox with Two-Column Layout Items</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="Two-column Layout">
            <ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
            <ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
            <ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
            <ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
            <ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
        </ui5-combobox>
    </div>
\``,...(v=(g=o.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var I,B,C;u.parameters={...u.parameters,docs:{...(I=u.parameters)==null?void 0:I.docs,source:{originalSource:`() => html\`
<h3>ComboBox with Grouping of Items</h3>
    <div class="snippet responsive-snippet">
        <ui5-combobox placeholder="ComboBox with grouping of suggestions">
            <ui5-cb-group-item text="A"></ui5-cb-group-item>
            <ui5-cb-item text="Argentina"></ui5-cb-item>
            <ui5-cb-item text="Australia"></ui5-cb-item>
            <ui5-cb-item text="Austria"></ui5-cb-item>	
            <ui5-cb-group-item text="B"></ui5-cb-group-item>
            <ui5-cb-item text="Bahrain"></ui5-cb-item>
            <ui5-cb-item text="Belgium"></ui5-cb-item>
            <ui5-cb-item text="Brazil"></ui5-cb-item>
            <ui5-cb-group-item text="C"></ui5-cb-group-item>
            <ui5-cb-item text="Canada"></ui5-cb-item>
            <ui5-cb-item text="Chile"></ui5-cb-item>
        </ui5-combobox>
    </div>
\``,...(C=(B=u.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};const L=["Template0","Template1","Template2","Template3","Template4"];export{i as Template0,e as Template1,m as Template2,o as Template3,u as Template4,L as __namedExportsOrder,P as default};
//# sourceMappingURL=ComboBox.stories.0a9fcc14.js.map
