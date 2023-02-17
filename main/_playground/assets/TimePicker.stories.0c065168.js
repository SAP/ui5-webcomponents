import{y as a}from"./lit-html.9e2e9691.js";import{D as T}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const f={dateValue:{control:{type:!1}},valueState:{control:"select",options:["Error","Information","None","Success","Warning"]},valueStateMessage:{control:{type:"text"}},closePicker:{table:{category:"Methods"}},formatValue:{table:{category:"Methods"}},isOpen:{table:{category:"Methods"}},isValid:{table:{category:"Methods"}},openPicker:{table:{category:"Methods"}}},P={package:"@ui5/webcomponents",since:"1.0.0-rc.6"},s="ui5-time-picker",O={title:"Main/TimePicker",component:s,parameters:{docs:{page:T({...P,component:s})}},argTypes:f},e=()=>a`
<h3>Basic TimePicker</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1"></ui5-time-picker>
    </div>
`,i=()=>a`
<h3>TimePicker in twelve hours format</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1" format-pattern="hh:mm:ss a"></ui5-time-picker>
    </div>
`,t=()=>a`
<h3>TimePicker with only minutes and seconds</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1" format-pattern="mm:ss"></ui5-time-picker>
    </div>
`,r=()=>a`
<h3>TimePicker with value-state and valueStateMessage</h3>
    <div class="snippet">
        <ui5-time-picker id="timepicker3" format-pattern="mm:ss" value-state="Error">
            <div slot="valueStateMessage">Please provide valid value</div>
        </ui5-time-picker>
    </div>
`;var o,m,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`() => html\`
<h3>Basic TimePicker</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1"></ui5-time-picker>
    </div>
\``,...(c=(m=e.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,n,l;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`() => html\`
<h3>TimePicker in twelve hours format</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1" format-pattern="hh:mm:ss a"></ui5-time-picker>
    </div>
\``,...(l=(n=i.parameters)==null?void 0:n.docs)==null?void 0:l.source}}};var d,u,k;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => html\`
<h3>TimePicker with only minutes and seconds</h3>
    <div class="snippet">
            <ui5-time-picker id="timepicker1" format-pattern="mm:ss"></ui5-time-picker>
    </div>
\``,...(k=(u=t.parameters)==null?void 0:u.docs)==null?void 0:k.source}}};var v,h,g;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`() => html\`
<h3>TimePicker with value-state and valueStateMessage</h3>
    <div class="snippet">
        <ui5-time-picker id="timepicker3" format-pattern="mm:ss" value-state="Error">
            <div slot="valueStateMessage">Please provide valid value</div>
        </ui5-time-picker>
    </div>
\``,...(g=(h=r.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};const N=["Template0","Template1","Template2","Template3"];export{e as Template0,i as Template1,t as Template2,r as Template3,N as __namedExportsOrder,O as default};
//# sourceMappingURL=TimePicker.stories.0c065168.js.map
