import{x as n}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";const u={},w={package:"@ui5/webcomponents",since:"1.0.0-rc.11",tagName:"ui5-slider"},g={title:"Main/Slider",component:"Slider",argTypes:u},o=e=>n`
<ui5-slider
    value="${a(e.value)}"
    min="${a(e.min)}"
    max="${a(e.max)}"
    step="${a(e.step)}"
    ?show-tickmarks="${a(e.showTickmarks)}"
    label-interval="${a(e.labelInterval)}"
    ?show-tooltip="${a(e.showTooltip)}"
    ?disabled="${a(e.disabled)}"
    accessible-name="${a(e.accessibleName)}"
></ui5-slider>`,i=o.bind({});i.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];i.args={min:0,max:100,step:5,disabled:!1,showTooltip:!1,showTickmarks:!1,labelInterval:0};const r=o.bind({});r.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];r.args={min:0,max:20,showTooltip:!0,labelInterval:5};const s=o.bind({});s.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];s.args={min:-20,max:20,step:2,value:12,showTooltip:!0,labelInterval:2,showTickmarks:!0};s.storyName="Tooltip, Tickmarks and Labels";var l,t,d;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:'args => html`\n<ui5-slider\n    value="${ifDefined(args.value)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n></ui5-slider>`',...(d=(t=i.parameters)==null?void 0:t.docs)==null?void 0:d.source}}};var m,c,f;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:'args => html`\n<ui5-slider\n    value="${ifDefined(args.value)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n></ui5-slider>`',...(f=(c=r.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var p,$,b;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`\n<ui5-slider\n    value="${ifDefined(args.value)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n></ui5-slider>`',...(b=($=s.parameters)==null?void 0:$.docs)==null?void 0:b.source}}};const k=["Basic","Tooltip","TickmarksLabelTooltip"],h=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,TickmarksLabelTooltip:s,Tooltip:r,__namedExportsOrder:k,default:g},Symbol.toStringTag,{value:"Module"}));export{h as C,w as c};
