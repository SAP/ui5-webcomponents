import{y as e}from"./lit-html.9e2e9691.js";import{D as S}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const k={wrappingType:{control:"select",options:["None","Normal"]},default:{control:{type:"text"}}},R={package:"@ui5/webcomponents"},s="ui5-label",F={title:"Main/Label",component:s,parameters:{docs:{page:S({...R,component:s})}},argTypes:k},i=()=>e`
<h3>Basic Label</h3>
    <div class="snippet">
        <ui5-label>The quick brown fox jumps over the lazy dog.</ui5-label>
    </div>
`,r=()=>e`
<h3>Required Label</h3>
    <div class="snippet">
        <ui5-label required="">Required Label</ui5-label>
    </div>
`,a=()=>e`
<h3>Required Label With Colon</h3>
    <div class="snippet">
        <ui5-label required="" show-colon="">Required Label</ui5-label>
    </div>
`,l=()=>e`
<h3>Truncated Label</h3>
    <div class="snippet">
        <ui5-label style="width:200px">Long labels are truncated by default.</ui5-label>
    </div>
`,o=()=>e`
<h3>Wrapped Label</h3>
    <div class="snippet">
        <ui5-label style="width:200px" wrapping-type="Normal">Long labels can wrap if the 'wrapping-type="Normal"' property is set.</ui5-label>
    </div>
`,t=()=>e`
<h3>Label 'for'</h3>
    <div class="snippet" style="display: flex;flex-direction: column;">
        <ui5-label id="myLabel" for="myInput" required="" show-colon="">First name</ui5-label>
        <ui5-input id="myInput" required="" placeholder="Enter your name"></ui5-input>
        <br/>
        <ui5-label id="myLabel2" for="myDP" required="" show-colon="">Date of birth</ui5-label>
        <ui5-date-picker id="myDP" required=""></ui5-date-picker>
        <br/>
        <ui5-label id="myLabel3" for="mySelect" required="" show-colon="">Job</ui5-label>
        <ui5-select id="mySelect" required="">
            <ui5-option>Manager</ui5-option>
            <ui5-option>Sales</ui5-option>
            <ui5-option selected="">Developer</ui5-option>
        </ui5-select>
        <br/>
        <ui5-label id="myLabel4" for="myTextArea" required="" show-colon="">Description label test</ui5-label>
        <ui5-textarea id="myTextArea" required="" placeholder="Type as much text as you wish"></ui5-textarea>
        <br/>
        <div style="display: flex; align-items: center;">
            <ui5-label for="myCB" required="" show-colon="">Accept terms of use</ui5-label>
            <ui5-checkbox id="myCB" required=""></ui5-checkbox>
        </div>
</div>
`;var n,p,u;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`() => html\`
<h3>Basic Label</h3>
    <div class="snippet">
        <ui5-label>The quick brown fox jumps over the lazy dog.</ui5-label>
    </div>
\``,...(u=(p=i.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,c,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>Required Label</h3>
    <div class="snippet">
        <ui5-label required="">Required Label</ui5-label>
    </div>
\``,...(m=(c=r.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var b,h,y;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`() => html\`
<h3>Required Label With Colon</h3>
    <div class="snippet">
        <ui5-label required="" show-colon="">Required Label</ui5-label>
    </div>
\``,...(y=(h=a.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};var q,f,v;l.parameters={...l.parameters,docs:{...(q=l.parameters)==null?void 0:q.docs,source:{originalSource:`() => html\`
<h3>Truncated Label</h3>
    <div class="snippet">
        <ui5-label style="width:200px">Long labels are truncated by default.</ui5-label>
    </div>
\``,...(v=(f=l.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var L,x,w;o.parameters={...o.parameters,docs:{...(L=o.parameters)==null?void 0:L.docs,source:{originalSource:`() => html\`
<h3>Wrapped Label</h3>
    <div class="snippet">
        <ui5-label style="width:200px" wrapping-type="Normal">Long labels can wrap if the 'wrapping-type="Normal"' property is set.</ui5-label>
    </div>
\``,...(w=(x=o.parameters)==null?void 0:x.docs)==null?void 0:w.source}}};var g,T,D;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`() => html\`
<h3>Label 'for'</h3>
    <div class="snippet" style="display: flex;flex-direction: column;">
        <ui5-label id="myLabel" for="myInput" required="" show-colon="">First name</ui5-label>
        <ui5-input id="myInput" required="" placeholder="Enter your name"></ui5-input>
        <br/>
        <ui5-label id="myLabel2" for="myDP" required="" show-colon="">Date of birth</ui5-label>
        <ui5-date-picker id="myDP" required=""></ui5-date-picker>
        <br/>
        <ui5-label id="myLabel3" for="mySelect" required="" show-colon="">Job</ui5-label>
        <ui5-select id="mySelect" required="">
            <ui5-option>Manager</ui5-option>
            <ui5-option>Sales</ui5-option>
            <ui5-option selected="">Developer</ui5-option>
        </ui5-select>
        <br/>
        <ui5-label id="myLabel4" for="myTextArea" required="" show-colon="">Description label test</ui5-label>
        <ui5-textarea id="myTextArea" required="" placeholder="Type as much text as you wish"></ui5-textarea>
        <br/>
        <div style="display: flex; align-items: center;">
            <ui5-label for="myCB" required="" show-colon="">Accept terms of use</ui5-label>
            <ui5-checkbox id="myCB" required=""></ui5-checkbox>
        </div>
</div>
\``,...(D=(T=t.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};const J=["Template0","Template1","Template2","Template3","Template4","Template5"];export{i as Template0,r as Template1,a as Template2,l as Template3,o as Template4,t as Template5,J as __namedExportsOrder,F as default};
//# sourceMappingURL=Label.stories.a10a2161.js.map
