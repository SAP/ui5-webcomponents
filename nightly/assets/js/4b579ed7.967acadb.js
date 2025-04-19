"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[4276],{87613:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>a,frontMatter:()=>r,metadata:()=>l,toc:()=>h});var n=s(31085),i=s(71184);const r={slug:"../SearchItem",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-search-item",ui5_since:"2.9.0"},d=void 0,l={id:"components/fiori/Search/SearchItem",title:"SearchItem",description:"The following entity is available under an experimental flag and its API and behavior are subject to change.",source:"@site/docs/components/fiori/Search/SearchItem.mdx",sourceDirName:"components/fiori/Search",slug:"/components/fiori/SearchItem",permalink:"/ui5-webcomponents/nightly/components/fiori/SearchItem",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../SearchItem",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-search-item",ui5_since:"2.9.0"},sidebar:"componentsSidebar",previous:{title:"Search",permalink:"/ui5-webcomponents/nightly/components/fiori/Search/"},next:{title:"SearchItemGroup",permalink:"/ui5-webcomponents/nightly/components/fiori/SearchItemGroup"}},c={},h=[{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Properties",id:"properties",level:2},{value:"text",id:"text",level:3},{value:"icon",id:"icon",level:3},{value:"selected",id:"selected",level:3},{value:"scopeName",id:"scopename",level:3},{value:"Slots",id:"slots",level:2},{value:"Events",id:"events",level:2},{value:"delete",id:"delete",level:3},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2}];function o(e){const t={admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsx)(t.p,{children:"The following entity is available under an experimental flag and its API and behavior are subject to change."})}),"\n",(0,n.jsxs)(t.p,{children:["A ",(0,n.jsx)(t.code,{children:"ui5-search-item"})," is a list item, used for displaying search suggestions"]}),"\n",(0,n.jsx)(t.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,n.jsx)(t.p,{children:(0,n.jsx)(t.code,{children:'import "@ui5/webcomponents/fiori/dist/SearchItem.js";'})}),"\n",(0,n.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(t.h3,{id:"text",children:"text"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Defines the heading text of the search item."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Defines the icon name of the search item."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"selected",children:"selected"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Defines whether the search item is selected."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"boolean"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"scopename",children:"scopeName"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Defines the scope of the search item"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string | undefined"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,n.jsx)(t.p,{children:"No slots available for this component."}),"\n",(0,n.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,n.jsx)(t.h3,{id:"delete",children:"delete"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Fired when delete button is pressed."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"CustomEvent"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Bubbles"}),(0,n.jsx)(t.td,{children:"No"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Cancelable"}),(0,n.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(t.p,{children:"No methods available for this component."}),"\n",(0,n.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,n.jsx)(t.p,{children:"No CSS parts available for this component."})]})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},71184:(e,t,s)=>{s.d(t,{R:()=>d,x:()=>l});var n=s(14041);const i={},r=n.createContext(i);function d(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:d(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);