import{x as l}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as u}from"./unsafe-html-0ddd83da.js";import{B as r}from"./BadgeDesign-c6b901ab.js";import{W as m}from"./WrappingType-b81e595a.js";const j={design:{control:"select",options:["Set1","Set2","Set3","Neutral","Information","Positive","Negative","Critical"]},wrappingType:{control:"select",options:["None","Normal"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}}},J={package:"@ui5/webcomponents",since:"0.12.0",tagName:"ui5-badge"},A={title:"Main/Badge",component:"Badge",argTypes:j},a=n=>l`
<ui5-badge
    design="${t(n.design)}"
    color-scheme="${t(n.colorScheme)}"
    ?interactive="${t(n.interactive)}"
    ?hide-state-icon="${t(n.hideStateIcon)}"
    wrapping-type="${t(n.wrappingType)}"
    style="${t(n.style)}"
>
    ${u(n.icon)}
    ${u(n.default)}
</ui5-badge>`,s=a.bind({});s.args={colorScheme:"6",default:"Badge Text"};const o=a.bind({});o.args={design:r.Positive,interactive:!0,default:"Success"};const d=a.bind({});d.decorators=[(n,{args:e})=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
    ${n({args:{...e,default:e.default||"This would truncate as it is too long",wrappingType:e.wrappingType||m.None,style:"width: 200px"}})}
    ${n({args:{...e,default:e.default||"This would wrap as it is too long",wrappingType:e.wrappingType||m.Normal,style:"width: 200px"}})}
</div>`];const c=a.bind({});c.decorators=[(n,e)=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
        ${[r.Neutral,r.Information,r.Positive,r.Negative,r.Critical,r.Set1,r.Set2,r.Set3].map(i=>n({args:{design:e.args.design||i,default:e.args.default||i}}))}
</div>`];const g=a.bind({});g.decorators=[(n,e)=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
        ${[1,2,3,4,5,6,7,8,9,10].map(i=>n({args:{design:e.args.design||r.Set1,colorScheme:e.args.colorScheme||i.toString(),default:e.args.default||"Color Scheme "+i}}))}
</div>`];const f=a.bind({});f.decorators=[(n,e)=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
        ${[1,2,3,4,5,6,7,8,9,10].map(i=>n({args:{design:e.args.design||r.Set2,colorScheme:e.args.colorScheme||i.toString(),default:e.args.default||"Color Scheme "+i}}))}
</div>`];const p=a.bind({});p.decorators=[(n,e)=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
        ${[1,2,3,4,5,6,7,8,9,10].map(i=>n({args:{design:e.args.design||r.Set3,colorScheme:e.args.colorScheme||i.toString(),default:e.args.default||"Color Scheme "+i}}))}
</div>`];var $,y,S;s.parameters={...s.parameters,docs:{...($=s.parameters)==null?void 0:$.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var h,D,T;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(T=(D=o.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var v,b,w;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(w=(b=d.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var M,I,H;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(H=(I=c.parameters)==null?void 0:I.docs)==null?void 0:H.source}}};var L,x,N;g.parameters={...g.parameters,docs:{...(L=g.parameters)==null?void 0:L.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(N=(x=g.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var B,C,_;f.parameters={...f.parameters,docs:{...(B=f.parameters)==null?void 0:B.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(_=(C=f.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var P,W,O;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`args => {
  return html\`
<ui5-badge
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-badge>\`;
}`,...(O=(W=p.parameters)==null?void 0:W.docs)==null?void 0:O.source}}};const k=["Basic","Interactive","WrappingTypes","Designs","Set1","Set2","Set3"],K=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,Designs:c,Interactive:o,Set1:g,Set2:f,Set3:p,WrappingTypes:d,__namedExportsOrder:k,default:A},Symbol.toStringTag,{value:"Module"}));export{K as C,J as c};
