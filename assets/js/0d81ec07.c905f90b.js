"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[7869],{82463:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>a,frontMatter:()=>d,metadata:()=>l,toc:()=>h});var n=s(31085),i=s(71184);const d={slug:"../../Tab",ui5_tag_name:"ui5-tab"},r=void 0,l={id:"components/main/TabContainer/Tab",title:"Tab",description:"The ui5-tab represents a selectable item inside a ui5-tabcontainer.",source:"@site/docs/components/main/TabContainer/Tab.mdx",sourceDirName:"components/main/TabContainer",slug:"/components/Tab",permalink:"/ui5-webcomponents/components/Tab",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../../Tab",ui5_tag_name:"ui5-tab"},sidebar:"componentsSidebar",previous:{title:"Switch",permalink:"/ui5-webcomponents/components/Switch"},next:{title:"TabContainer",permalink:"/ui5-webcomponents/components/TabContainer"}},c={},h=[{value:"Properties",id:"properties",level:2},{value:"text",id:"text",level:3},{value:"disabled",id:"disabled",level:3},{value:"additionalText",id:"additionaltext",level:3},{value:"icon",id:"icon",level:3},{value:"design",id:"design",level:3},{value:"selected",id:"selected",level:3},{value:"Slots",id:"slots",level:2},{value:"default",id:"default",level:3},{value:"items",id:"items",level:3},{value:"Events",id:"events",level:2},{value:"Methods",id:"methods",level:2},{value:"getDomRefInStrip",id:"getdomrefinstrip",level:3},{value:"CSS Parts",id:"css-parts",level:2}];function o(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["The ",(0,n.jsx)(t.code,{children:"ui5-tab"})," represents a selectable item inside a ",(0,n.jsx)(t.code,{children:"ui5-tabcontainer"}),".\nIt defines both the item in the tab strip (top part of the ",(0,n.jsx)(t.code,{children:"ui5-tabcontainer"}),") and the\ncontent that is presented to the user once the tab is selected."]}),"\n",(0,n.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,n.jsx)(t.h3,{id:"text",children:"text"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"The text to be displayed for the item."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string | undefined"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"disabled",children:"disabled"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Disabled tabs can't be selected."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"boolean"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"additionaltext",children:"additionalText"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:'Represents the "additionalText" text, which is displayed in the tab. In the cases when in the same time there are tabs with icons and tabs without icons, if a tab has no icon the "additionalText" is displayed larger.'})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string | undefined"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsxs)(t.td,{children:["Defines the icon source URI to be displayed as graphical element within the component. The SAP-icons font provides numerous built-in icons. See all the available icons in the ",(0,n.jsx)(t.a,{href:"https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html",children:"Icon Explorer"}),"."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"string | undefined"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"design",children:"design"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsxs)(t.td,{children:["Defines the component's design color.",(0,n.jsx)("br",{}),"The design is applied to:",(0,n.jsx)("br",{}),"- the component icon",(0,n.jsx)("br",{}),"- the ",(0,n.jsx)(t.code,{children:"text"})," when the component overflows",(0,n.jsx)("br",{}),"- the tab selection line",(0,n.jsx)("br",{}),"Available designs are: ",(0,n.jsx)(t.code,{children:'"Default"'}),", ",(0,n.jsx)(t.code,{children:'"Neutral"'}),", ",(0,n.jsx)(t.code,{children:'"Positive"'}),", ",(0,n.jsx)(t.code,{children:'"Critical"'})," and ",(0,n.jsx)(t.code,{children:'"Negative"'}),".",(0,n.jsx)("br",{}),(0,n.jsx)(t.strong,{children:"Note:"})," The design depends on the current theme."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:'"Default" | "Positive" | "Negative" | "Critical" | "Neutral"'})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:'"Default"'})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"selected",children:"selected"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Specifies if the component is selected."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"boolean"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Default"}),(0,n.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,n.jsx)(t.h3,{id:"default",children:"default"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsx)(t.td,{children:"Holds the content associated with this tab."})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"Array<Node>"})})]})]})]}),"\n",(0,n.jsx)(t.h3,{id:"items",children:"items"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsxs)(t.td,{children:["Defines hierarchies with nested sub tabs.",(0,n.jsx)("br",{}),(0,n.jsx)(t.strong,{children:"Note:"})," Use ",(0,n.jsx)(t.code,{children:"ui5-tab"})," and ",(0,n.jsx)(t.code,{children:"ui5-tab-separator"})," for the intended design."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"Array<ITab>"})})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,n.jsx)(t.p,{children:"No events available for this component."}),"\n",(0,n.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,n.jsx)(t.h3,{id:"getdomrefinstrip",children:"getDomRefInStrip"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{}),(0,n.jsx)(t.th,{})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Description"}),(0,n.jsxs)(t.td,{children:["Returns the DOM reference of the tab that is placed in the header.",(0,n.jsx)("br",{}),(0,n.jsx)(t.strong,{children:"Note:"})," Tabs, placed in the ",(0,n.jsx)(t.code,{children:"items"})," slot of other tabs are not shown in the header. Calling this method on such tabs will return ",(0,n.jsx)(t.code,{children:"undefined"}),".",(0,n.jsx)("br",{}),(0,n.jsx)(t.strong,{children:"Note:"})," If you need a DOM ref to the tab content please use the ",(0,n.jsx)(t.code,{children:"getDomRef"})," method."]})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Return type"}),(0,n.jsx)(t.td,{children:(0,n.jsx)(t.code,{children:"HTMLElement | undefined"})})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{children:"Since"}),(0,n.jsx)(t.td,{children:"1.0.0-rc.16"})]})]})]}),"\n",(0,n.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,n.jsx)(t.p,{children:"No CSS parts available for this component."})]})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(o,{...e})}):o(e)}},71184:(e,t,s)=>{s.d(t,{R:()=>r,x:()=>l});var n=s(14041);const i={},d=n.createContext(i);function r(e){const t=n.useContext(d);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(d.Provider,{value:t},e.children)}}}]);