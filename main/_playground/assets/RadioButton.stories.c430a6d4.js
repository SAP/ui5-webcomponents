import{y as a}from"./lit-html.9e2e9691.js";import{D as c}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const x={valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},wrappingType:{control:"select",options:["None","Normal"]}},G={package:"@ui5/webcomponents"},e="ui5-radio-button",R={title:"Main/RadioButton",component:e,parameters:{docs:{page:c({...G,component:e})}},argTypes:x},t=()=>a`
<h3>Basic RadioButton Types</h3>
    <div class="snippet">
        <ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
    </div>
`,o=()=>a`
<h3>RadioButton in group - navigate via [UP/Right] and [DOWN/Left] arrow keys</h3>
    <div class="snippet" style="display: flex; flex-wrap: wrap; justify-content: space-around;">
        <div aria-labelledby="radioGroupTitle1" role="radiogroup" id="radioGroup" class="radio-button-group">
            <ui5-title id="radioGroupTitle1">Group of states</ui5-title>
            <ui5-label id="lblRadioGroup">Selected radio: None</ui5-label>
            <ui5-radio-button text="None" value-state="None" checked="" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Warning" value-state="Warning" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Error" value-state="Error" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Success" value-state="Success" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Information" value-state="Information" name="GroupB"></ui5-radio-button>
        </div>
        <div aria-labelledby="radioGroupTitle2" role="radiogroup" id="radioGroup2" class="radio-button-group">
            <ui5-title id="radioGroupTitle2">Group of options</ui5-title>
            <ui5-label id="lblRadioGroup2">Selected radio: Option A</ui5-label>
            <ui5-radio-button text="Option A" checked="" name="GroupC"></ui5-radio-button>
            <ui5-radio-button text="Option B" value-state="None" name="GroupC"></ui5-radio-button>
            <ui5-radio-button text="Option C" value-state="None" name="GroupC"></ui5-radio-button>
        </div>
    </div>
`,i=()=>a`
<h3>RadioButton with Text Wrapping</h3>
    <div class="snippet">
        <ui5-radio-button text="ui5-radio-button with 'wrapping-type=Normal' set and some long text" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
        <ui5-radio-button text="Another ui5-radio-button with very long text here" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
    </div>
`;var r,u,n;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`() => html\`
<h3>Basic RadioButton Types</h3>
    <div class="snippet">
        <ui5-radio-button text="Option A" checked="" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option B" value-state="None" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option C" value-state="Warning" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option D" value-state="Error" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option C" value-state="Success" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option D" value-state="Information" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option E" disabled="" name="GroupA"></ui5-radio-button>
        <ui5-radio-button text="Option F" readonly="" name="GroupA"></ui5-radio-button>
    </div>
\``,...(n=(u=t.parameters)==null?void 0:u.docs)==null?void 0:n.source}}};var d,p,s;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>RadioButton in group - navigate via [UP/Right] and [DOWN/Left] arrow keys</h3>
    <div class="snippet" style="display: flex; flex-wrap: wrap; justify-content: space-around;">
        <div aria-labelledby="radioGroupTitle1" role="radiogroup" id="radioGroup" class="radio-button-group">
            <ui5-title id="radioGroupTitle1">Group of states</ui5-title>
            <ui5-label id="lblRadioGroup">Selected radio: None</ui5-label>
            <ui5-radio-button text="None" value-state="None" checked="" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Warning" value-state="Warning" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Error" value-state="Error" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Success" value-state="Success" name="GroupB"></ui5-radio-button>
            <ui5-radio-button text="Information" value-state="Information" name="GroupB"></ui5-radio-button>
        </div>
        <div aria-labelledby="radioGroupTitle2" role="radiogroup" id="radioGroup2" class="radio-button-group">
            <ui5-title id="radioGroupTitle2">Group of options</ui5-title>
            <ui5-label id="lblRadioGroup2">Selected radio: Option A</ui5-label>
            <ui5-radio-button text="Option A" checked="" name="GroupC"></ui5-radio-button>
            <ui5-radio-button text="Option B" value-state="None" name="GroupC"></ui5-radio-button>
            <ui5-radio-button text="Option C" value-state="None" name="GroupC"></ui5-radio-button>
        </div>
    </div>
\``,...(s=(p=o.parameters)==null?void 0:p.docs)==null?void 0:s.source}}};var l,b,m;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`() => html\`
<h3>RadioButton with Text Wrapping</h3>
    <div class="snippet">
        <ui5-radio-button text="ui5-radio-button with 'wrapping-type=Normal' set and some long text" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
        <ui5-radio-button text="Another ui5-radio-button with very long text here" wrapping-type="Normal" style="width:200px"></ui5-radio-button>
    </div>
\``,...(m=(b=i.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};const C=["Template0","Template1","Template2"];export{t as Template0,o as Template1,i as Template2,C as __namedExportsOrder,R as default};
//# sourceMappingURL=RadioButton.stories.c430a6d4.js.map
