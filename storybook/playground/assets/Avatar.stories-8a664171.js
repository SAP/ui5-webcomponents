import{x as p}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as f}from"./unsafe-html-0ddd83da.js";import{A as m,a as u}from"./AvatarShape-e8dfc172.js";const b={shape:{control:"select",options:["Circle","Square"]},size:{control:"select",options:["XS","S","M","L","XL"]},colorScheme:{control:"select",options:["Accent1","Accent2","Accent3","Accent4","Accent5","Accent6","Accent7","Accent8","Accent9","Accent10","Placeholder"]},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},badge:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}}},z={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-avatar"},v=()=>p`
<ui5-avatar fallback-icon="employee" size="S" disabled="true">
  <img alt="Woman 1" src="../assets/images/avatars/man_avatar_1.png" />
</ui5-avatar>
(ui5-avatar size="S" disabled="true")

</br>

<ui5-avatar fallback-icon="employee" size="M">
  <img alt="Woman 1" src="../assets/images/avatars/man_avatar_1.png" />
</ui5-avatar> (ui5-avatar size="M")

</br>

<ui5-avatar size="L" disabled="true" initials="AB" color-scheme="Accent1"> </ui5-avatar> (ui5-avatar size="L" disabled="true" color-scheme="Accent1")

</br>

<ui5-avatar size="XL" initials="CD" color-scheme="Accent2"></ui5-avatar> (ui5-avatar size="XL" color-scheme="Accent2")
`,$={title:"Main/Avatar",component:"Avatar",argTypes:b},d=e=>p`<ui5-avatar
    icon="${a(e.icon)}"
    size="${a(e.size)}"
    shape="${a(e.shape)}"
    style="${a(e.style)}"
    initials="${a(e.initials)}"
    color-scheme="${a(e.colorScheme)}"
    ?interactive="${a(e.interactive)}"
    ?disabled="${a(e.disabled)}"
    aria-haspopup="${a(e.ariaHaspopup)}"
    accessible-name="${a(e.accessibleName)}"
    fallback-icon="${a(e.fallbackIcon)}"
  >
    ${f(e.default)}
  </ui5-avatar>`,i=d.bind({});i.args={initials:"FJ",interactive:!0,accessibleName:"Avatar with accessible name"};const g=v.bind({}),s=d.bind({});s.args={size:m.XL,shape:u.Square,style:"width: 250px; height:250px; border: 1px solid var(--sapField_BorderColor)",default:`<img
    src="../assets/images/avatars/Lamp_avatar_01.jpg"
    alt="Lamp"
    style="object-fit: contain"
/>`};var t,n,r;i.parameters={...i.parameters,docs:{...(t=i.parameters)==null?void 0:t.docs,source:{originalSource:'args => html`<ui5-avatar\n    icon="${ifDefined(args.icon)}"\n    size="${ifDefined(args.size)}"\n    shape="${ifDefined(args.shape)}"\n    style="${ifDefined(args.style)}"\n    initials="${ifDefined(args.initials)}"\n    color-scheme="${ifDefined(args.colorScheme)}"\n    ?interactive="${ifDefined(args.interactive)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    aria-haspopup="${ifDefined(args.ariaHaspopup)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    fallback-icon="${ifDefined(args.fallbackIcon)}"\n  >\n    ${unsafeHTML(args.default)}\n  </ui5-avatar>`',...(r=(n=i.parameters)==null?void 0:n.docs)==null?void 0:r.source}}};var c,o,l;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:'args => html`<ui5-avatar\n    icon="${ifDefined(args.icon)}"\n    size="${ifDefined(args.size)}"\n    shape="${ifDefined(args.shape)}"\n    style="${ifDefined(args.style)}"\n    initials="${ifDefined(args.initials)}"\n    color-scheme="${ifDefined(args.colorScheme)}"\n    ?interactive="${ifDefined(args.interactive)}"\n    ?disabled="${ifDefined(args.disabled)}"\n    aria-haspopup="${ifDefined(args.ariaHaspopup)}"\n    accessible-name="${ifDefined(args.accessibleName)}"\n    fallback-icon="${ifDefined(args.fallbackIcon)}"\n  >\n    ${unsafeHTML(args.default)}\n  </ui5-avatar>`',...(l=(o=s.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};const h=["Basic","TypesAndSizes","Styles"],_=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,Styles:s,TypesAndSizes:g,__namedExportsOrder:h,default:$},Symbol.toStringTag,{value:"Module"}));export{_ as C,z as c};
