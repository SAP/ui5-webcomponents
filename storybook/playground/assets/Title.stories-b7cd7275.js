import{x as o}from"./lit-element-c5a2b594.js";import{o as v}from"./unsafe-html-0ddd83da.js";import{l as s}from"./if-defined-c29cffe1.js";import{T as l}from"./TitleLevel-6629a879.js";import{W as y}from"./WrappingType-b81e595a.js";const H={wrappingType:{control:"select",options:["None","Normal"]},level:{control:"select",options:["H1","H2","H3","H4","H5","H6"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}}},_={package:"@ui5/webcomponents",tagName:"ui5-title"},w={title:"Main/Title",component:"Title",argTypes:H},i=e=>o`
<ui5-title
    level="${s(e.level)}"
    wrapping-type="${s(e.wrappingType)}"
>${v(e.default)}</ui5-title>`;i.decorators=[(e,{args:n})=>o`
${e({args:{...n,level:l.H1}})}
${e({args:{...n,level:l.H2}})}
${e({args:{...n,level:l.H3}})}
${e({args:{...n,level:l.H4}})}
${e({args:{...n,level:l.H5}})}
${e({args:{...n,level:l.H6}})}`];const t=i.bind({});t.args={default:"Title Text"};t.decorators=[...i.decorators];const r=i.bind({});r.args={default:"Long Title Text Text Text Which Wraps",wrappingType:y.Normal};r.decorators=[...i.decorators,e=>o`
<style>
    ui5-title {
        width: 15ch;
    }
</style>
${e()}`];const a=i.bind({});a.args={default:'<ui5-link design="Default">With Default Link (57)</ui5-link>'};a.decorators=[...i.decorators];var p,c,u;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return html\`
<ui5-title
    level="\${ifDefined(args.level)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
>\${unsafeHTML(args.default)}</ui5-title>\`;
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var d,g,m;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`args => {
  return html\`
<ui5-title
    level="\${ifDefined(args.level)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
>\${unsafeHTML(args.default)}</ui5-title>\`;
}`,...(m=(g=r.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var f,T,$;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  return html\`
<ui5-title
    level="\${ifDefined(args.level)}"
    wrapping-type="\${ifDefined(args.wrappingType)}"
>\${unsafeHTML(args.default)}</ui5-title>\`;
}`,...($=(T=a.parameters)==null?void 0:T.docs)==null?void 0:$.source}}};const h=["Basic","Wrapping","WithLink"],k=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,WithLink:a,Wrapping:r,__namedExportsOrder:h,default:w},Symbol.toStringTag,{value:"Module"}));export{k as C,_ as c};
