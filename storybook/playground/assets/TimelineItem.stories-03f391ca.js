import{x as a}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as m}from"./unsafe-html-0ddd83da.js";const r={default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},b={package:"@ui5/webcomponents-fiori",tagName:"ui5-timeline-item",showDefaultStoryOnly:!0},s={title:"Fiori/Timeline/Timeline Item",component:"TimelineItem",argTypes:r},c=t=>a`
<ui5-timeline>
    <ui5-timeline-item
        title-text="${i(t.titleText)}"
        subtitle-text="${i(t.subtitleText)}"
        icon="${i(t.icon)}"
        name="${i(t.name)}"
        ?name-clickable="${i(t.nameClickable)}"
        >
        ${m(t.default)}
    </ui5-timeline-item>
</ui5-timeline>`,e=c.bind({});e.tags=["_hidden_"];e.args={icon:"calendar",titleText:"Weekly Sync - CP Design",subtitleText:"27.07.2017 (11:00 - 12:30)",default:"<div>MR SOF02 2.43</div>"};var n,l,o;e.parameters={...e.parameters,docs:{...(n=e.parameters)==null?void 0:n.docs,source:{originalSource:`args => html\`
<ui5-timeline>
    <ui5-timeline-item
        title-text="\${ifDefined(args.titleText)}"
        subtitle-text="\${ifDefined(args.subtitleText)}"
        icon="\${ifDefined(args.icon)}"
        name="\${ifDefined(args.name)}"
        ?name-clickable="\${ifDefined(args.nameClickable)}"
        >
        \${unsafeHTML(args.default)}
    </ui5-timeline-item>
</ui5-timeline>\``,...(o=(l=e.parameters)==null?void 0:l.docs)==null?void 0:o.source}}};const u=["Basic"],x=Object.freeze(Object.defineProperty({__proto__:null,Basic:e,__namedExportsOrder:u,default:s},Symbol.toStringTag,{value:"Module"}));export{x as C,b as c};
