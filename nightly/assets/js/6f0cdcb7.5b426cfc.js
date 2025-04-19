"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[5470],{75112:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=o(31085),i=o(71184);const s={title:"Popover API in UI5 Web Components 2.0",tags:["release","v2","popover API"],slug:"/releases/popover-api-in-v2",date:"2024-04-19T10:00"},r=void 0,a={permalink:"/ui5-webcomponents/nightly/blog/releases/popover-api-in-v2",source:"@site/blog/releases/popover-api-in-v2.mdx",title:"Popover API in UI5 Web Components 2.0",description:"UI5 Web Components 2.0 will provide greatly improved popups by taking advantage of the native browser popover API.",date:"2024-04-19T10:00:00.000Z",formattedDate:"April 19, 2024",tags:[{label:"release",permalink:"/ui5-webcomponents/nightly/blog/tags/release"},{label:"v2",permalink:"/ui5-webcomponents/nightly/blog/tags/v-2"},{label:"popover API",permalink:"/ui5-webcomponents/nightly/blog/tags/popover-api"}],readingTime:4.85,hasTruncateMarker:!1,authors:[],frontMatter:{title:"Popover API in UI5 Web Components 2.0",tags:["release","v2","popover API"],slug:"/releases/popover-api-in-v2",date:"2024-04-19T10:00"},unlisted:!1,prevItem:{title:"Announcing UI5 Web Components 2.0! A New Era Begins!",permalink:"/ui5-webcomponents/nightly/blog/releases/announcing-v2"},nextItem:{title:"UI5 Web Components 2.0 Release Candidate is out!",permalink:"/ui5-webcomponents/nightly/blog/releases/announcing-rc-v2"}},p={authorsImageUrls:[]},l=[{value:"What is the popover API?",id:"what-is-the-popover-api",level:2},{value:"Popups in <strong>version 1.x</strong>",id:"popups-in-version-1x",level:2},{value:"Popups in <strong>version 2.x</strong>",id:"popups-in-version-2x",level:2},{value:"The <strong>practical</strong> benefits",id:"the-practical-benefits",level:2},{value:"Simpler and more robust components",id:"simpler-and-more-robust-components",level:3},{value:"Enhanced overstyling capabilities for apps",id:"enhanced-overstyling-capabilities-for-apps",level:3},{value:"Components with popups can now have physical children",id:"components-with-popups-can-now-have-physical-children",level:3},{value:"Easier testing for both apps and component package authors",id:"easier-testing-for-both-apps-and-component-package-authors",level:3},{value:"Cross-framework popup compatibility for the future",id:"cross-framework-popup-compatibility-for-the-future",level:3},{value:"When can I start using it?",id:"when-can-i-start-using-it",level:2}];function c(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["UI5 Web Components 2.0 will provide greatly improved popups by taking advantage of the ",(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",children:"native browser popover API"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"what-is-the-popover-api",children:"What is the popover API?"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",children:"popover API"})," is a browser-native solution to displaying popup-like components (Popovers, Dialogs, etc.).\nabove all other content, regardless of its HTML structure and CSS applied."]}),"\n",(0,t.jsxs)(n.h2,{id:"popups-in-version-1x",children:["Popups in ",(0,t.jsx)(n.strong,{children:"version 1.x"})]}),"\n",(0,t.jsxs)(n.p,{children:['There used to be a so-called "static area" (',(0,t.jsx)(n.code,{children:"<ui5-static-area>"}),") - a DOM element directly in the ",(0,t.jsx)(n.code,{children:"<body>"})," where the popups of all components were placed.\nThis guaranteed that even if the HTML document had ",(0,t.jsx)(n.code,{children:"overflow: hidden"}),", ",(0,t.jsx)(n.code,{children:"transform"}),", or similar CSS rules applied, or the component was in a ",(0,t.jsx)(n.em,{children:"stacking context"}),", its popup would still be positioned correctly."]}),"\n",(0,t.jsxs)(n.p,{children:["Example of ",(0,t.jsx)(n.code,{children:"ui5-date-picker"}),"'s DOM structure in ",(0,t.jsx)(n.strong,{children:"v1.24"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body>\n    <ui5-static-area>\n        <ui5-static-area-item> \x3c!-- A static area item, associated with the DatePicker component --\x3e\n            #shadow-root\n                <ui5-responsive-popover></ui5-responsive-popover> \x3c!-- here goes the Popover part of the DatePicker component --\x3e\n        </ui5-static-area-item>\n    </ui5-static-area>\n\n    .........\n\n    <div style="transform: translate(12rem, 12rem)"> \x3c!-- a parent node has CSS that normally breaks popup positioning --\x3e\n        <ui5-date-picker>\n            #shadow-root\n                <ui5-input></ui5-input> \x3c!-- The date Input part of the DatePicker component --\x3e\n        </ui5-date-picker>\n    </div>\n</body>\n'})}),"\n",(0,t.jsx)(n.p,{children:"As you can see, the component used to be physically divided in two parts:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:['The "main" part (the ',(0,t.jsx)(n.code,{children:"ui5-date-picker"})," tag itself) containing the date selection input"]}),"\n",(0,t.jsxs)(n.li,{children:['The "popover" part (the ',(0,t.jsx)(n.code,{children:"ui5-static-area-item"})," tag, associated with the said date picker) containing the picker (calendar with years/months/days)."]}),"\n"]}),"\n",(0,t.jsxs)(n.h2,{id:"popups-in-version-2x",children:["Popups in ",(0,t.jsx)(n.strong,{children:"version 2.x"})]}),"\n",(0,t.jsx)(n.p,{children:'There is no longer need for a "static area" since the browser now ensures the correct positioning of popups thanks to the popover API.'}),"\n",(0,t.jsxs)(n.p,{children:["Example of ",(0,t.jsx)(n.code,{children:"ui5-date-picker"}),"'s DOM structure in ",(0,t.jsx)(n.strong,{children:"v2.0"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body>\n    <div style="transform: translate(12rem, 12rem)"> \x3c!-- a parent node has CSS that normally breaks popup positioning --\x3e\n        <ui5-date-picker>\n            #shadow-root\n                <ui5-input></ui5-input> \x3c!-- The date Input part of the DatePicker component --\x3e\n                <ui5-responsive-popover popover="manual"></ui5-responsive-popover> \x3c!-- the Popover part of the DatePicker component --\x3e\n        </ui5-date-picker>\n    </div>\n</body>\n'})}),"\n",(0,t.jsx)(n.p,{children:"The component is no longer physically divided in two parts:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Both the input and the popover are inside the ",(0,t.jsx)(n.code,{children:"ui5-date-picker"})," itself"]}),"\n",(0,t.jsxs)(n.li,{children:["The popover has the ",(0,t.jsx)(n.strong,{children:'popover="manual"'})," attribute (introduced with the popover API) that ensures it will be displayed above anything else on the HTML page."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"It's that simple!"}),"\n",(0,t.jsxs)(n.h2,{id:"the-practical-benefits",children:["The ",(0,t.jsx)(n.strong,{children:"practical"})," benefits"]}),"\n",(0,t.jsx)(n.h3,{id:"simpler-and-more-robust-components",children:"Simpler and more robust components"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Easier to develop and maintain."}),"\n",(0,t.jsx)(n.li,{children:"Everything belonging to a component is now in one place! This includes code logic, HTML and CSS."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"enhanced-overstyling-capabilities-for-apps",children:"Enhanced overstyling capabilities for apps"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["We can now provide ",(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_shadow_parts",children:"CSS Shadow Parts"}),' also for the "popup part", not just in the "main part" of the component!']}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",children:"CSS Custom Properties"}),' set on the component will also have effect for its "popup part"!']}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"Consider the following example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body>\n    <style>\n        #mc::part(root) {\n            background: blue;\n        }\n        #mc::part(list) {\n            margin: 0.5rem;\n        }\n    </style>\n\n    <my-component id="mc">\n        #shadow-root\n            <div part="root"></div>\n            <ui5-popover>\n                <ui5-list part="list"></ui5-list>\n            </ui5-popover>\n    </my-component>\n</body>\n'})}),"\n",(0,t.jsx)(n.p,{children:"Since the popover is now part of the component, component authors can provide CSS Shadow Parts for elements in the popover, in addition to the existing CSS Shadow Parts."}),"\n",(0,t.jsx)(n.h3,{id:"components-with-popups-can-now-have-physical-children",children:"Components with popups can now have physical children"}),"\n",(0,t.jsxs)(n.p,{children:["Web components with popups had a ",(0,t.jsx)(n.strong,{children:"hard limitation"})," of not being able to slot children to the popup."]}),"\n",(0,t.jsxs)(n.p,{children:["Example of ",(0,t.jsx)(n.code,{children:"ui5-select"}),"'s (simplified) DOM structure in ",(0,t.jsx)(n.strong,{children:"v1.24"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body>\n    <ui5-static-area>\n        <ui5-static-area-item> \x3c!-- static area item of the ui5-select --\x3e\n            #shadow-root\n                <ui5-responsive-popover> \x3c!-- the "dropdown" part of the ui5-select --\x3e\n                    <ui5-list> \x3c!-- the list inside ui5-select\'s dropdown --\x3e\n                        <ui5-li text="Option 1"></ui5-li> \x3c!-- list item for the 1st ui5-option --\x3e\n                        <ui5-li text="Option 2"></ui5-li> \x3c!-- list item for the 2nd ui5-option --\x3e\n                        <ui5-li text="Option 3"></ui5-li> \x3c!-- list item for the 3rd ui5-option --\x3e\n                    </ui5-list>\n                </ui5-responsive-popover>\n        </ui5-static-area-item>\n    </ui5-static-area>\n\n    .........\n\n    <ui5-select>\n        #shadow-root\n            <div></div> \x3c!-- The "box" part of the select --\x3e\n\n        <ui5-option>Option 1</ui5-option>\n        <ui5-option>Option 2</ui5-option>\n        <ui5-option>Option 3</ui5-option>\n    </ui5-select>\n\n</body>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["As you can clearly see from the example, there is no way to ",(0,t.jsx)(n.strong,{children:"slot"})," the ",(0,t.jsx)(n.code,{children:"ui5-option"})," components into the ",(0,t.jsx)(n.code,{children:"ui5-list"})," as it is in a completely different part of the DOM, due to the need for a static area.\nInstead, we can only provide ",(0,t.jsx)(n.strong,{children:"logical"})," ",(0,t.jsx)(n.code,{children:"ui5-option"})," components and just use their ",(0,t.jsx)(n.strong,{children:"text content"})," for the ",(0,t.jsx)(n.code,{children:"text"})," property of the list items (",(0,t.jsx)(n.code,{children:"ui5-li"}),") in the static area."]}),"\n",(0,t.jsxs)(n.p,{children:["Example of ",(0,t.jsx)(n.code,{children:"ui5-select"}),"'s (simplified) DOM structure in ",(0,t.jsx)(n.strong,{children:"v2.0"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body>\n    <ui5-select>\n        #shadow-root\n            <div></div> \x3c!-- The "box" part of the select --\x3e\n            <ui5-responsive-popover> \x3c!-- the "dropdown" part of the ui5-select --\x3e\n                <ui5-list> \x3c!-- the list inside ui5-select\'s dropdown --\x3e\n                    <slot></slot>\n                </ui5-list>\n            </ui5-responsive-popover>\n\n        <ui5-option><strong>Option</strong> 1</ui5-option>\n        <ui5-option><ui5-icon name="accept"></ui5-icon> Option 2</ui5-option>\n        <ui5-option><i>Option 3</i></ui5-option>\n    </ui5-select>\n\n</body>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Now that the popover is part of the ",(0,t.jsx)(n.code,{children:"ui5-select"})," itself, it's possible to have ",(0,t.jsx)(n.strong,{children:"physical"})," ",(0,t.jsx)(n.code,{children:"ui5-option"}),"s and slot their content directly into the popover or its children (",(0,t.jsx)(n.code,{children:"ui5-list"})," in this example)."]}),"\n",(0,t.jsxs)(n.p,{children:["This allows us to provide support for ",(0,t.jsx)(n.strong,{children:"custom user content"})," for components that had strict predefined APIs in the past!"]}),"\n",(0,t.jsx)(n.h3,{id:"easier-testing-for-both-apps-and-component-package-authors",children:"Easier testing for both apps and component package authors"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"Tests no longer need to know how to find the static area item, associated with a given component - everything is directly in the shadow root!"}),"\n",(0,t.jsx)(n.li,{children:"Writing tests is much simplified."}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"cross-framework-popup-compatibility-for-the-future",children:"Cross-framework popup compatibility for the future"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Frameworks who use the native browser popover API no longer need to synchronize themselves (negotiate ",(0,t.jsx)(n.code,{children:"z-index"})," values, etc.)."]}),"\n",(0,t.jsx)(n.li,{children:"The last popup to be opened will always be on top (guarnateed by the browser)!"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"when-can-i-start-using-it",children:"When can I start using it?"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The current versions of all supported browsers (Chrome, Safari, Edge, and now also Firefox as of version 125) fully support the popover API. ",(0,t.jsx)(n.a,{href:"https://caniuse.com/?search=popover",children:"See Can I Use report"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["By the time ",(0,t.jsx)(n.strong,{children:"v2.0"})," is officially released (we are at ",(0,t.jsx)(n.strong,{children:"v2.0-r.c.2"})," as of writing this blog post) we expect that each major browser will have already released at least 3 stable versions since the introduction of the popover API."]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["Make sure to check our blog for future announcements, including the official release date of ",(0,t.jsx)(n.strong,{children:"UI5 Web Components 2.0"}),"!"]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},71184:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>a});var t=o(14041);const i={},s=t.createContext(i);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);