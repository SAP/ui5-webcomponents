import{x as l}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as m}from"./unsafe-html-0ddd83da.js";import{T as s}from"./TimelineLayout-651ea8a4.js";const r={layout:{control:"select",options:["Vertical","Horizontal"]},default:{control:{type:"text"},table:{type:{summary:"Array<ITimelineItem>"}}}},g={package:"@ui5/webcomponents-fiori",since:"0.8.0",tagName:"ui5-timeline"},c={title:"Fiori/Timeline",component:"Timeline",argTypes:r},u=t=>l`<ui5-timeline
    layout="${i(t.layout)}"
    accessible-name="${i(t.accessibleName)}"
>
    ${m(t.default)}
</ui5-timeline>`,e=u.bind({});e.storyName="With Items and Layout";e.args={layout:s.Vertical,default:`<ui5-timeline-item id="test-item" title-text="called" subtitle-text="20.02.2017 11:30" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
<ui5-timeline-item title-text="Weekly Sync - CP Design" subtitle-text="27.07.2017 (11:00 - 12:30)" icon="calendar">
    <div>MR SOF02 2.43</div>
</ui5-timeline-item>
<ui5-timeline-item title-text="Video Converence Call - UI5" subtitle-text="31.01.2018 (12:00 - 13:00)" icon="calendar">
    <div>Online meeting</div>
</ui5-timeline-item>`};var n,o,a;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:'args => html`<ui5-timeline\n    layout="${ifDefined(args.layout)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n>\n    ${unsafeHTML(args.default)}\n</ui5-timeline>`',...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const d=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:d,default:c},Symbol.toStringTag,{value:"Module"}));export{x as C,g as c};
