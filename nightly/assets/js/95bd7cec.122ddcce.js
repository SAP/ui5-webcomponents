"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[773],{25753:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>m,frontMatter:()=>c,metadata:()=>a,toc:()=>u});var i=n(31085),r=n(71184),s=n(53492);const c={title:"Interfaces"},o=void 0,a={id:"components/ai/interfaces/README",title:"Interfaces",description:"",source:"@site/docs/components/ai/interfaces/README.mdx",sourceDirName:"components/ai/interfaces",slug:"/components/ai/interfaces/",permalink:"/ui5-webcomponents/nightly/components/ai/interfaces/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{title:"Interfaces"},sidebar:"componentsSidebar",previous:{title:"Enums",permalink:"/ui5-webcomponents/nightly/components/ai/enums/"},next:{title:"Patterns",permalink:"/ui5-webcomponents/nightly/components/patterns"}},l={},u=[];function d(e){return(0,i.jsx)(s.A,{})}function m(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d()}},53492:(e,t,n)=>{n.d(t,{A:()=>g});n(14041);var i=n(54357),r=n(5096),s=n(42436),c=n(35436),o=n(49082),a=n(54441);const l={cardContainer:"cardContainer_Shn5",cardTitle:"cardTitle_h48N",cardDescription:"cardDescription_CytT"};var u=n(31085);function d(e){let{href:t,children:n}=e;return(0,u.jsx)(s.A,{href:t,className:(0,i.A)("card padding--lg",l.cardContainer),children:n})}function m(e){let{href:t,icon:n,title:r,description:s}=e;return(0,u.jsxs)(d,{href:t,children:[(0,u.jsxs)(a.A,{as:"h2",className:(0,i.A)("text--truncate",l.cardTitle),title:r,children:[n," ",r]}),s&&(0,u.jsx)("p",{className:(0,i.A)("text--truncate",l.cardDescription),title:s,children:s})]})}function p(e){let{item:t}=e;const n=(0,r.Nr)(t);return n?(0,u.jsx)(m,{href:n,icon:"\ud83d\uddc3\ufe0f",title:t.label,description:t.description??(0,o.T)({message:"{count} items",id:"theme.docs.DocCard.categoryDescription",description:"The default description for a category card in the generated index about how many items this category includes"},{count:t.items.length})}):null}function f(e){let{item:t}=e;const n=(0,c.A)(t.href)?"\ud83d\udcc4\ufe0f":"\ud83d\udd17",i=(0,r.cC)(t.docId??void 0);return(0,u.jsx)(m,{href:t.href,icon:n,title:t.label,description:t.description??i?.description})}function h(e){let{item:t}=e;switch(t.type){case"link":return(0,u.jsx)(f,{item:t});case"category":return(0,u.jsx)(p,{item:t});default:throw new Error(`unknown item type ${JSON.stringify(t)}`)}}function x(e){let{className:t}=e;const n=(0,r.$S)();return(0,u.jsx)(g,{items:n.items,className:t})}function g(e){const{items:t,className:n}=e;if(!t)return(0,u.jsx)(x,{...e});const s=(0,r.d1)(t);return(0,u.jsx)("section",{className:(0,i.A)("row",n),children:s.map(((e,t)=>(0,u.jsx)("article",{className:"col col--6 margin-bottom--lg",children:(0,u.jsx)(h,{item:e})},t)))})}},71184:(e,t,n)=>{n.d(t,{R:()=>c,x:()=>o});var i=n(14041);const r={},s=i.createContext(r);function c(e){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),i.createElement(s.Provider,{value:t},e.children)}}}]);