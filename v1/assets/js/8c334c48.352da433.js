"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[8749],{9532:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>c,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>l});var i=n(1085),r=n(1184),s=n(3492);const o={title:"Enums"},c=void 0,a={id:"components/fiori/enums/README",title:"Enums",description:"",source:"@site/docs/components/fiori/enums/README.mdx",sourceDirName:"components/fiori/enums",slug:"/components/fiori/enums/",permalink:"/ui5-webcomponents/v1/components/fiori/enums/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Enums"},sidebar:"componentsSidebar",previous:{title:"WizardStep",permalink:"/ui5-webcomponents/v1/components/fiori/WizardStep"},next:{title:"BarDesign",permalink:"/ui5-webcomponents/v1/components/fiori/enums/BarDesign"}},u={},l=[];function m(e){return(0,i.jsx)(s.A,{})}function d(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(m,{...e})}):m()}},3492:(e,t,n)=>{n.d(t,{A:()=>b});n(4041);var i=n(4357),r=n(5096),s=n(2436),o=n(5436),c=n(9082),a=n(4441);const u={cardContainer:"cardContainer_Shn5",cardTitle:"cardTitle_h48N",cardDescription:"cardDescription_CytT"};var l=n(1085);function m(e){let{href:t,children:n}=e;return(0,l.jsx)(s.A,{href:t,className:(0,i.A)("card padding--lg",u.cardContainer),children:n})}function d(e){let{href:t,icon:n,title:r,description:s}=e;return(0,l.jsxs)(m,{href:t,children:[(0,l.jsxs)(a.A,{as:"h2",className:(0,i.A)("text--truncate",u.cardTitle),title:r,children:[n," ",r]}),s&&(0,l.jsx)("p",{className:(0,i.A)("text--truncate",u.cardDescription),title:s,children:s})]})}function p(e){let{item:t}=e;const n=(0,r.Nr)(t);return n?(0,l.jsx)(d,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,c.T)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,o.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.cC)(t.docId??void 0);return(0,l.jsx)(d,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return(0,l.jsx)(f,{item:t});case"category":return(0,l.jsx)(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,r.$S)();return(0,l.jsx)(b,{items:n.items,className:t})}function b(e){const{items:t,className:n}=e;if(!t)return(0,l.jsx)(x,{...e});const s=(0,r.d1)(t);return(0,l.jsx)("section",{className:(0,i.A)("row",n),children:s.map(((e,t)=>(0,l.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,l.jsx)(h,{item:e})},t)))})}},1184:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>c});var i=n(4041);const r={},s=i.createContext(r);function o(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);