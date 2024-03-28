import{x as n}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";const $={},D={package:"@ui5/webcomponents",since:"1.0.0-rc.11",tagName:"ui5-range-slider"},k={title:"Main/Range Slider",component:"RangeSlider",argTypes:$},t=e=>n`
<ui5-range-slider
    start-value="${a(e.startValue)}"
    end-value="${a(e.endValue)}"
    min="${a(e.min)}"
    max="${a(e.max)}"
    step="${a(e.step)}"
    ?show-tickmarks="${a(e.showTickmarks)}"
    label-interval="${a(e.labelInterval)}"
    ?show-tooltip="${a(e.showTooltip)}"
></ui5-range-slider>`,s=t.bind({});s.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];s.args={min:0,max:100,step:5,disabled:!1,showTooltip:!1,showTickmarks:!1,labelInterval:0,startValue:0,endValue:20};const i=t.bind({});i.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];i.args={startValue:3,endValue:13,showTooltip:!0};const r=t.bind({});r.decorators=[e=>n`
            <div class="wrapper" style="margin-top:1rem;">
                ${e()}
            </div>
        `];r.args={min:0,max:112,step:2,startValue:4,endValue:12,labelInterval:2,showTickmarks:!0,showTooltip:!0};r.storyName="Tooltips, Tickmarks and Labels";var o,l,d;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:'args => html`\n<ui5-range-slider\n    start-value="${ifDefined(args.startValue)}"\n    end-value="${ifDefined(args.endValue)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n></ui5-range-slider>`',...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var m,p,c;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:'args => html`\n<ui5-range-slider\n    start-value="${ifDefined(args.startValue)}"\n    end-value="${ifDefined(args.endValue)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n></ui5-range-slider>`',...(c=(p=i.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var f,u,g;r.parameters={...r.parameters,docs:{...(f=r.parameters)==null?void 0:f.docs,source:{originalSource:'args => html`\n<ui5-range-slider\n    start-value="${ifDefined(args.startValue)}"\n    end-value="${ifDefined(args.endValue)}"\n    min="${ifDefined(args.min)}"\n    max="${ifDefined(args.max)}"\n    step="${ifDefined(args.step)}"\n    ?show-tickmarks="${ifDefined(args.showTickmarks)}"\n    label-interval="${ifDefined(args.labelInterval)}"\n    ?show-tooltip="${ifDefined(args.showTooltip)}"\n></ui5-range-slider>`',...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};const v=["Basic","Tooltips","RangeSliderTickmarksTooltipLabel"],T=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,RangeSliderTickmarksTooltipLabel:r,Tooltips:i,__namedExportsOrder:v,default:k},Symbol.toStringTag,{value:"Module"}));export{T as C,D as c};
