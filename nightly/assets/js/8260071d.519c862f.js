"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[427],{86448:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>a,frontMatter:()=>d,metadata:()=>r,toc:()=>c});var s=n(31085),i=n(71184);const d={slug:"../ButtonState",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-ai-button-state",ui5_since:"2.0.0"},o=void 0,r={id:"components/ai/Button/ButtonState",title:"ButtonState",description:"The Button and ButtonState web components are available since 2.0 under an experimental flag and their API and behaviour are subject to change.",source:"@site/docs/components/ai/Button/ButtonState.mdx",sourceDirName:"components/ai/Button",slug:"/components/ai/ButtonState",permalink:"/ui5-webcomponents/nightly/components/ai/ButtonState",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../ButtonState",sidebar_class_name:"newComponentBadge expComponentBadge",ui5_tag_name:"ui5-ai-button-state",ui5_since:"2.0.0"},sidebar:"componentsSidebar",previous:{title:"Button",permalink:"/ui5-webcomponents/nightly/components/ai/Button"},next:{title:"PromptInput",permalink:"/ui5-webcomponents/nightly/components/ai/PromptInput"}},l={},c=[{value:"Usage",id:"usage",level:3},{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Properties",id:"properties",level:2},{value:"name",id:"name",level:3},{value:"text",id:"text",level:3},{value:"icon",id:"icon",level:3},{value:"endIcon",id:"endicon",level:3},{value:"showArrowButton",id:"showarrowbutton",level:3},{value:"Slots",id:"slots",level:2},{value:"Events",id:"events",level:2},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.admonition,{type:"info",children:(0,s.jsx)(t.p,{children:"The Button and ButtonState web components are available since 2.0 under an experimental flag and their API and behaviour are subject to change."})}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"ui5-ai-button-state"})," is the item to use for defining states of ",(0,s.jsx)(t.code,{children:"ui5-ai-button"})," components."]}),"\n",(0,s.jsx)(t.h3,{id:"usage",children:"Usage"}),"\n",(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:"ui5-ai-button-state"})," is an abstract element, representing a state of ",(0,s.jsx)(t.code,{children:"ui5-ai-button"}),". It is meant to be used in the ",(0,s.jsx)(t.code,{children:"default"})," slot\nof ",(0,s.jsx)(t.code,{children:"ui5-ai-button"})," and should not be used as standalone component."]}),"\n",(0,s.jsx)(t.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:'import "@ui5/webcomponents/dist/AiButtonState.js";'})}),"\n",(0,s.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(t.h3,{id:"name",children:"name"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the name of the button state."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"text",children:"text"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the text of the button in this state."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the icon to be displayed as graphical element within the component before the text. The SAP-icons font provides numerous options.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Example:"}),(0,s.jsx)("br",{}),"See all the available icons in the ",(0,s.jsx)(t.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"endicon",children:"endIcon"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the icon to be displayed as graphical element within the component after the text. The SAP-icons font provides numerous options.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Example:"}),(0,s.jsx)("br",{}),"See all the available icons in the ",(0,s.jsx)(t.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"showarrowbutton",children:"showArrowButton"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines if the component is in split button mode."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.6.0"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,s.jsx)(t.p,{children:"No slots available for this component."}),"\n",(0,s.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(t.p,{children:"No events available for this component."}),"\n",(0,s.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(t.p,{children:"No methods available for this component."}),"\n",(0,s.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,s.jsx)(t.p,{children:"No CSS parts available for this component."})]})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},71184:(e,t,n)=>{n.d(t,{R:()=>o,x:()=>r});var s=n(14041);const i={},d=s.createContext(i);function o(e){const t=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(d.Provider,{value:t},e.children)}}}]);