"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[1049],{2874:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>k,contentTitle:()=>B,default:()=>E,frontMatter:()=>g,metadata:()=>I,toc:()=>S});var i=t(1085),s=t(1184);const o='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-busy-indicator size="Medium" active></ui5-busy-indicator>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',d='import "@ui5/webcomponents/dist/BusyIndicator.js";\n';function r(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:o,js:d})}function l(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(r,{...e})}):r(e)}const c='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n    <link rel="stylesheet" href="./main.css">\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <div class="sample">\n        <ui5-button>Fetch List Data</ui5-button>\n        <ui5-busy-indicator size="Medium">\n            <ui5-list no-data-text="No Data" header-text="Available Items">\n            </ui5-list>\n        </ui5-busy-indicator>\n    </div>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',a='import "@ui5/webcomponents/dist/Button.js";\nimport "@ui5/webcomponents/dist/BusyIndicator.js";\nimport "@ui5/webcomponents/dist/List.js";\nimport "@ui5/webcomponents/dist/StandardListItem.js";\n\nvar busyIndicator = document.querySelector("ui5-busy-indicator");\nvar list = document.querySelector("ui5-list");\nvar fetchBtn = document.querySelector("ui5-button");\n\nfetchBtn.addEventListener("click", event => {\n    busyIndicator.active = true;\n\n    setTimeout(() => {\n        ["UI5", "Web", "Components"].forEach(title => {\n            const el = document.createElement("ui5-li");\n            el.textContent = title;\n            list.appendChild(el);\n        });\n\n        busyIndicator.active = false;\n    }, 3000);\n});',h=".sample {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}";function u(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:c,js:a,css:h})}function x(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(u,{...e})}):u(e)}const p='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-busy-indicator size="Small" active></ui5-busy-indicator>\n    <ui5-busy-indicator size="Medium" active></ui5-busy-indicator>\n    <ui5-busy-indicator size="Large" active></ui5-busy-indicator>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',m='import "@ui5/webcomponents/dist/BusyIndicator.js";\n';function j(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:p,js:m})}function y(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(j,{...e})}):j(e)}const b='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-busy-indicator text="Loading data from backend server.." active>\n        <div style="height: 200px; width: 200px;"></div>\n    </ui5-busy-indicator>\n    <ui5-busy-indicator text="Loading data from backend server..." text-placement="Top" active>\n        <div style="height: 200px; width: 200px;"></div>\n    </ui5-busy-indicator>\n\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',v='import "@ui5/webcomponents/dist/BusyIndicator.js";\n';function f(e){const{Editor:n}={...(0,s.R)(),...e.components};return n||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,i.jsx)(n,{html:b,js:v})}function w(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(f,{...e})}):f(e)}const g={slug:"../BusyIndicator"},B=void 0,I={id:"components/main/BusyIndicator",title:"BusyIndicator",description:"The ui5-busy-indicator signals that some operation is going on and that the",source:"@site/docs/components/main/BusyIndicator.mdx",sourceDirName:"components/main",slug:"/components/BusyIndicator",permalink:"/ui5-webcomponents/v1/components/BusyIndicator",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../BusyIndicator"},sidebar:"componentsSidebar",previous:{title:"BreadcrumbsItem",permalink:"/ui5-webcomponents/v1/components/BreadcrumbsItem"},next:{title:"Button",permalink:"/ui5-webcomponents/v1/components/Button"}},k={},S=[{value:"Usage",id:"usage",level:3},{value:"When to use:",id:"when-to-use",level:4},{value:"When not to use:",id:"when-not-to-use",level:4},{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Basic Sample",id:"basic-sample",level:2},{value:"Properties",id:"properties",level:2},{value:"text",id:"text",level:3},{value:"size",id:"size",level:3},{value:"active",id:"active",level:3},{value:"delay",id:"delay",level:3},{value:"textPlacement",id:"textplacement",level:3},{value:"Slots",id:"slots",level:2},{value:"default",id:"default",level:3},{value:"Events",id:"events",level:2},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"More Samples",id:"more-samples",level:2},{value:"Sizes",id:"sizes",level:3},{value:"Text Placement with display text",id:"text-placement-with-display-text",level:3},{value:"Busy component",id:"busy-component",level:3}];function T(e){const n={code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"ui5-busy-indicator"})," signals that some operation is going on and that the\nuser must wait. It does not block the current UI screen so other operations could be triggered in parallel.\nIt displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation."]}),"\n",(0,i.jsx)(n.h3,{id:"usage",children:"Usage"}),"\n",(0,i.jsxs)(n.p,{children:["For the ",(0,i.jsx)(n.code,{children:"ui5-busy-indicator"}),' you can define the size, the text and whether it is shown or hidden.\nIn order to hide it, use the "active" property.']}),"\n",(0,i.jsxs)(n.p,{children:["In order to show busy state over an HTML element, simply nest the HTML element in a ",(0,i.jsx)(n.code,{children:"ui5-busy-indicator"})," instance."]}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.strong,{children:"Note:"})," Since ",(0,i.jsx)(n.code,{children:"ui5-busy-indicator"})," has ",(0,i.jsx)(n.code,{children:"display: inline-block;"})," by default and no width of its own,\nwhenever you need to wrap a block-level element, you should set ",(0,i.jsx)(n.code,{children:"display: block"})," to the busy indicator as well."]}),"\n",(0,i.jsx)(n.h4,{id:"when-to-use",children:"When to use:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The user needs to be able to cancel the operation."}),"\n",(0,i.jsx)(n.li,{children:"Only part of the application or a particular component is affected."}),"\n"]}),"\n",(0,i.jsx)(n.h4,{id:"when-not-to-use",children:"When not to use:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The operation takes less than one second."}),"\n",(0,i.jsx)(n.li,{children:"You need to block the screen and prevent the user from starting another activity."}),"\n",(0,i.jsx)(n.li,{children:"Do not show multiple busy indicators at once."}),"\n"]}),"\n",(0,i.jsx)(n.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.code,{children:'import "@ui5/webcomponents/dist/BusyIndicator.js";'})}),"\n",(0,i.jsx)(n.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,i.jsx)(l,{}),"\n",(0,i.jsx)(n.h2,{id:"properties",children:"Properties"}),"\n",(0,i.jsx)(n.h3,{id:"text",children:"text"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines text to be displayed below the component. It can be used to inform the user of the current operation."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"string"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'""'})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Since"}),(0,i.jsx)(n.td,{children:"1.0.0-rc.7"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"size",children:"size"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines the size of the component."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:'"Small" | "Medium" | "Large"'})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"Medium"'})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"active",children:"active"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines if the busy indicator is visible on the screen. By default it is not."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"boolean"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"false"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"delay",children:"delay"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines the delay in milliseconds, after which the busy indicator will be visible on the screen."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"number"})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:"1000"})]})]})]}),"\n",(0,i.jsx)(n.h3,{id:"textplacement",children:"textPlacement"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Defines the placement of the text."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:'"Top" | "Bottom"'})})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Default"}),(0,i.jsx)(n.td,{children:'"Bottom"'})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"slots",children:"Slots"}),"\n",(0,i.jsx)(n.h3,{id:"default",children:"default"}),"\n",(0,i.jsxs)(n.table,{children:[(0,i.jsx)(n.thead,{children:(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.th,{}),(0,i.jsx)(n.th,{})]})}),(0,i.jsxs)(n.tbody,{children:[(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Description"}),(0,i.jsx)(n.td,{children:"Determines the content over which the component will appear."})]}),(0,i.jsxs)(n.tr,{children:[(0,i.jsx)(n.td,{children:"Type"}),(0,i.jsx)(n.td,{children:(0,i.jsx)(n.code,{children:"Array<Node>"})})]})]})]}),"\n",(0,i.jsx)(n.h2,{id:"events",children:"Events"}),"\n",(0,i.jsx)(n.p,{children:"No events available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"methods",children:"Methods"}),"\n",(0,i.jsx)(n.p,{children:"No methods available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,i.jsx)(n.p,{children:"No CSS parts available for this component."}),"\n",(0,i.jsx)(n.h2,{id:"more-samples",children:"More Samples"}),"\n",(0,i.jsx)(n.h3,{id:"sizes",children:"Sizes"}),"\n",(0,i.jsx)(n.p,{children:"The BusyIndicator comes in several sizes - Small, Medium and Large."}),"\n",(0,i.jsx)(y,{}),"\n",(0,i.jsx)(n.h3,{id:"text-placement-with-display-text",children:"Text Placement with display text"}),"\n",(0,i.jsx)(n.p,{children:'The BusyIndicator can display text either above (via text-placement="Top") or below the animated dots (by default).'}),"\n",(0,i.jsx)(w,{}),"\n",(0,i.jsx)(n.h3,{id:"busy-component",children:"Busy component"}),"\n",(0,i.jsx)(n.p,{children:"The BusyIndicator can be placed over another web component."}),"\n",(0,i.jsx)(x,{})]})}function E(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(T,{...e})}):T(e)}},1184:(e,n,t)=>{t.d(n,{R:()=>d,x:()=>r});var i=t(4041);const s={},o=i.createContext(s);function d(e){const n=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),i.createElement(o.Provider,{value:n},e.children)}}}]);