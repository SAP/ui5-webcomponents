import{x as l}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as m}from"./unsafe-html-0ddd83da.js";import{T as r}from"./TagDesign-5b4f57f6.js";import{W as u}from"./WrappingType-b81e595a.js";const z={design:{control:"select",options:["Set1","Set2","Set3","Neutral","Information","Positive","Negative","Critical"]},wrappingType:{control:"select",options:["None","Normal"]},size:{control:"select",options:["S","L"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}}},J={package:"@ui5/webcomponents",since:"2.0.0",tagName:"ui5-tag"},A={title:"Main/Tag",component:"Tag",argTypes:z},a=n=>l`
<ui5-tag
    design="${t(n.design)}"
    color-scheme="${t(n.colorScheme)}"
    ?interactive="${t(n.interactive)}"
    ?hide-state-icon="${t(n.hideStateIcon)}"
    wrapping-type="${t(n.wrappingType)}"
    style="${t(n.style)}"
>
    ${m(n.icon)}
    ${m(n.default)}
</ui5-tag>`,s=a.bind({});s.args={colorScheme:"6",default:"Tag Text"};const o=a.bind({});o.args={design:r.Positive,interactive:!0,default:"Positive"};const c=a.bind({});c.decorators=[(n,{args:e})=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
    ${n({args:{...e,default:e.default||"This would truncate as it is too long",wrappingType:e.wrappingType||u.None,style:"width: 200px"}})}
    ${n({args:{...e,default:e.default||"This would wrap as it is too long",wrappingType:e.wrappingType||u.Normal,style:"width: 200px"}})}
</div>`];const g=a.bind({});g.decorators=[(n,e)=>l`
<div style="display: flex; flex-direction: column; align-items: start; gap: 1rem">
        ${[r.Neutral,r.Information,r.Positive,r.Negative,r.Critical,r.Set1,r.Set2,r.Set3].map(i=>n({args:{design:e.args.design||i,default:e.args.default||i}}))}
</div>`];const d=a.bind({});d.decorators=[(n,e)=>l`
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
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(S=(y=s.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var h,D,T;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(T=(D=o.parameters)==null?void 0:D.docs)==null?void 0:T.source}}};var v,w,M;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(M=(w=c.parameters)==null?void 0:w.docs)==null?void 0:M.source}}};var I,L,H;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(H=(L=g.parameters)==null?void 0:L.docs)==null?void 0:H.source}}};var b,x,N;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(N=(x=d.parameters)==null?void 0:x.docs)==null?void 0:N.source}}};var C,_,P;f.parameters={...f.parameters,docs:{...(C=f.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(P=(_=f.parameters)==null?void 0:_.docs)==null?void 0:P.source}}};var W,O,j;p.parameters={...p.parameters,docs:{...(W=p.parameters)==null?void 0:W.docs,source:{originalSource:`args => {
  return html\`
<ui5-tag
    design="\${ifDefined(args.design)}"
    color-scheme="\${ifDefined(args.colorScheme)}"
    ?interactive="\${ifDefined(args.interactive)}"
    ?hide-state-icon="\${ifDefined(args.hideStateIcon)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
    style="\${ifDefined(args.style)}"
>
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.default)}
</ui5-tag>\`;
}`,...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const B=["Basic","Interactive","WrappingTypes","Designs","Set1","Set2","Set3"],K=Object.freeze(Object.defineProperty({__proto__:null,Basic:s,Designs:g,Interactive:o,Set1:d,Set2:f,Set3:p,WrappingTypes:c,__namedExportsOrder:B,default:A},Symbol.toStringTag,{value:"Module"}));export{K as C,J as c};
