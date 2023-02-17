import{y as s}from"./lit-html.9e2e9691.js";import{D as f}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const w={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},valueStateMessage:{control:{type:"text"}}},T={package:"@ui5/webcomponents",since:"1.0.0-rc.13"},n="ui5-step-input",O={title:"Main/StepInput",component:n,parameters:{docs:{page:f({...T,component:n})}},argTypes:w},e=()=>s`
<h3>Basic Step Input</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" readonly="" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" disabled="" value="5"></ui5-step-input>
        </div>
    </div>
`,t=()=>s`
<h3>Step Input with alignment</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: center"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: right"></ui5-step-input>
        </div>
    </div>
`,i=()=>s`
<h3>Step Input with min, max, step and valuePrecision</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" min="0" max="10" step="1"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="0" min="-100" max="100" step="10"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="10" min="0" max="20" step="0.5" value-precision="1"></ui5-step-input>
        </div>
    </div>
`,p=()=>s`
<h3>Step Input with Value State</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Success"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Warning"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Error"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Information"></ui5-step-input>
        </div>
    </div>
`,a=()=>s`
<h3>Step Input with Label</h3>
    <div class="snippet">
        <div class="flex-column samples-margin">
            <div class="shorter">
                <ui5-label class="samples-big-margin-right" for="myStepInput" required="" show-colon="">Number</ui5-label>
                <ui5-step-input id="myStepInput" placeholder="Enter your Number" required=""></ui5-step-input>
            </div>
        </div>
    </div>
`;var r,m,u;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Basic Step Input</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" readonly="" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" disabled="" value="5"></ui5-step-input>
        </div>
    </div>
\``,...(u=(m=e.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var l,o,c;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`() => html\`
<h3>Step Input with alignment</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: center"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" style="text-align: right"></ui5-step-input>
        </div>
    </div>
\``,...(c=(o=t.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var v,g,d;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`() => html\`
<h3>Step Input with min, max, step and valuePrecision</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="5" min="0" max="10" step="1"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="0" min="-100" max="100" step="10"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value="10" min="0" max="20" step="0.5" value-precision="1"></ui5-step-input>
        </div>
    </div>
\``,...(d=(g=i.parameters)==null?void 0:g.docs)==null?void 0:d.source}}};var h,b,S;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`() => html\`
<h3>Step Input with Value State</h3>
    <div class="snippet">
        <div class="shorter">
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Success"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Warning"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Error"></ui5-step-input>
            <ui5-step-input class="samples-margin samples-responsive-margin-bottom" value-state="Information"></ui5-step-input>
        </div>
    </div>
\``,...(S=(b=p.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var I,x,y;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`() => html\`
<h3>Step Input with Label</h3>
    <div class="snippet">
        <div class="flex-column samples-margin">
            <div class="shorter">
                <ui5-label class="samples-big-margin-right" for="myStepInput" required="" show-colon="">Number</ui5-label>
                <ui5-step-input id="myStepInput" placeholder="Enter your Number" required=""></ui5-step-input>
            </div>
        </div>
    </div>
\``,...(y=(x=a.parameters)==null?void 0:x.docs)==null?void 0:y.source}}};const j=["Template0","Template1","Template2","Template3","Template4"];export{e as Template0,t as Template1,i as Template2,p as Template3,a as Template4,j as __namedExportsOrder,O as default};
//# sourceMappingURL=StepInput.stories.c4f7f081.js.map
