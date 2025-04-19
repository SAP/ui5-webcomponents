"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[5943],{55888:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>D,contentTitle:()=>w,default:()=>C,frontMatter:()=>y,metadata:()=>T,toc:()=>E});var s=n(31085),r=n(71184);const d='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n<body style="background-color: var(--sapBackgroundColor);">\n\x3c!-- playground-fold-end --\x3e\n\n<ui5-textarea placeholder="Type message..."></ui5-textarea>\n\x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n</html>\n\x3c!-- playground-fold-end --\x3e\n\n',i='import "@ui5/webcomponents/dist/TextArea.js";';function l(e){const{Editor:t}={...(0,r.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:d,js:i})}function c(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}const h='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n<body style="background-color: var(--sapBackgroundColor);">\n\x3c!-- playground-fold-end --\x3e\n\n<ui5-textarea growing growing-max-rows="5" placeholder="Enter new rows..."></ui5-textarea>\n\x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n</html>\n\x3c!-- playground-fold-end --\x3e\n\n',o='import "@ui5/webcomponents/dist/TextArea.js";';function a(e){const{Editor:t}={...(0,r.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:h,js:o})}function x(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}const j='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n<body style="background-color: var(--sapBackgroundColor); height: 100px;">\n\x3c!-- playground-fold-end --\x3e\n\n<ui5-textarea maxlength="10" placeholder="Enter more than 10 characters" show-exceeded-text></ui5-textarea>\n\x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n</html>\n\x3c!-- playground-fold-end --\x3e\n\n',p='import "@ui5/webcomponents/dist/TextArea.js"\n\nconst textArea = [...document.getElementsByTagName("ui5-textarea")][0];\n\ntextArea.addEventListener("input", () => {\n\tconst value = textArea.value;\n\tconst maxlength = textArea.maxlength;\n\n\ttextArea.valueState = value.length > maxlength ? "Critical" : "None";\t\n});';function u(e){const{Editor:t}={...(0,r.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:j,js:p})}function m(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}const b='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n<body style="background-color: var(--sapBackgroundColor);">\n\x3c!-- playground-fold-end --\x3e\n\n<ui5-textarea disabled></ui5-textarea>\n<ui5-textarea readonly></ui5-textarea>\n<ui5-textarea value-state="Positive" placeholder="Positive"></ui5-textarea>\n<ui5-textarea value-state="Information" placeholder="Information"></ui5-textarea>\n<ui5-textarea value-state="Critical" placeholder="Critical"></ui5-textarea>\n<ui5-textarea value-state="Negative" placeholder="Negative"></ui5-textarea>\n<ui5-textarea value-state="Negative" placeholder="Custom value-state message">\n    <div slot="valueStateMessage">Please provide valid value</div>\n</ui5-textarea>\n\x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n</html>\n\x3c!-- playground-fold-end --\x3e\n\n',v='import "@ui5/webcomponents/dist/TextArea.js";';function g(e){const{Editor:t}={...(0,r.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:b,js:v})}function f(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(g,{...e})}):g(e)}const y={slug:"../TextArea",ui5_tag_name:"ui5-textarea"},w=void 0,T={id:"components/main/TextArea",title:"TextArea",description:"The ui5-textarea component is used to enter multiple rows of text.",source:"@site/docs/components/main/TextArea.mdx",sourceDirName:"components/main",slug:"/components/TextArea",permalink:"/ui5-webcomponents/nightly/components/TextArea",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../TextArea",ui5_tag_name:"ui5-textarea"},sidebar:"componentsSidebar",previous:{title:"Text",permalink:"/ui5-webcomponents/nightly/components/Text"},next:{title:"TimePicker",permalink:"/ui5-webcomponents/nightly/components/TimePicker"}},D={},E=[{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Basic Sample",id:"basic-sample",level:2},{value:"Properties",id:"properties",level:2},{value:"value",id:"value",level:3},{value:"disabled",id:"disabled",level:3},{value:"readonly",id:"readonly",level:3},{value:"required",id:"required",level:3},{value:"placeholder",id:"placeholder",level:3},{value:"valueState",id:"valuestate",level:3},{value:"rows",id:"rows",level:3},{value:"maxlength",id:"maxlength",level:3},{value:"showExceededText",id:"showexceededtext",level:3},{value:"growing",id:"growing",level:3},{value:"growingMaxRows",id:"growingmaxrows",level:3},{value:"name",id:"name",level:3},{value:"accessibleName",id:"accessiblename",level:3},{value:"accessibleNameRef",id:"accessiblenameref",level:3},{value:"Slots",id:"slots",level:2},{value:"valueStateMessage",id:"valuestatemessage",level:3},{value:"Events",id:"events",level:2},{value:"change",id:"change",level:3},{value:"input",id:"input",level:3},{value:"select",id:"select",level:3},{value:"scroll",id:"scroll",level:3},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"More Samples",id:"more-samples",level:2},{value:"Growing",id:"growing-1",level:3},{value:"Max Length",id:"max-length",level:3},{value:"States",id:"states",level:3}];function S(e){const t={code:"code",h2:"h2",h3:"h3",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["The ",(0,s.jsx)(t.code,{children:"ui5-textarea"})," component is used to enter multiple rows of text."]}),"\n",(0,s.jsxs)(t.p,{children:["When empty, it can hold a placeholder similar to a ",(0,s.jsx)(t.code,{children:"ui5-input"}),".\nYou can define the rows of the ",(0,s.jsx)(t.code,{children:"ui5-textarea"})," and also determine specific behavior when handling long texts."]}),"\n",(0,s.jsx)(t.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:'import "@ui5/webcomponents/dist/TextArea.js";'})}),"\n",(0,s.jsx)(t.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,s.jsx)(c,{}),"\n",(0,s.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(t.h3,{id:"value",children:"value"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the value of the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"disabled",children:"disabled"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Indicates whether the user can interact with the component or not.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," A disabled component is completely noninteractive."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"readonly",children:"readonly"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines whether the component is read-only.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," A read-only component is not editable, but still provides visual feedback upon user interaction."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"required",children:"required"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines whether the component is required."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.3"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"placeholder",children:"placeholder"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines a short hint intended to aid the user with data entry when the component has no value."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"valuestate",children:"valueState"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the value state of the component.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," If ",(0,s.jsx)(t.code,{children:"maxlength"}),' property is set, the component turns into "Critical" state once the characters exceeds the limit. In this case, only the "Negative" state is considered and can be applied.']})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:'"None" | "Positive" | "Critical" | "Negative" | "Information"'})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:'"None"'})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.7"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"rows",children:"rows"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the number of visible text rows for the component.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Notes:"}),(0,s.jsx)("br",{}),"- If the ",(0,s.jsx)(t.code,{children:"growing"})," property is enabled, this property defines the minimum rows to be displayed in the textarea.",(0,s.jsx)("br",{}),"- The CSS ",(0,s.jsx)(t.code,{children:"height"})," property wins over the ",(0,s.jsx)(t.code,{children:"rows"})," property, if both are set."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"number"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"maxlength",children:"maxlength"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the maximum number of characters that the ",(0,s.jsx)(t.code,{children:"value"})," can have."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"number | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"showexceededtext",children:"showExceededText"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Determines whether the characters exceeding the maximum allowed character count are visible in the component.",(0,s.jsx)("br",{}),"If set to ",(0,s.jsx)(t.code,{children:"false"}),", the user is not allowed to enter more characters than what is set in the ",(0,s.jsx)(t.code,{children:"maxlength"})," property. If set to ",(0,s.jsx)(t.code,{children:"true"})," the characters exceeding the ",(0,s.jsx)(t.code,{children:"maxlength"})," value are selected on paste and the counter below the component displays their number."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"growing",children:"growing"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Enables the component to automatically grow and shrink dynamically with its content."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"growingmaxrows",children:"growingMaxRows"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the maximum number of rows that the component can grow."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"number"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"name",children:"name"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Determines the name by which the component will be identified upon submission in an HTML form.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," This property is only applicable within the context of an HTML Form element."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessiblename",children:"accessibleName"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the accessible ARIA name of the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.15"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessiblenameref",children:"accessibleNameRef"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Receives id(or many ids) of the elements that label the textarea."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.15"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,s.jsx)(t.h3,{id:"valuestatemessage",children:"valueStateMessage"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the value state message that will be displayed as pop up under the component. The value state message slot should contain only one root element.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," If not specified, a default text (in the respective language) will be displayed.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," The ",(0,s.jsx)(t.code,{children:"valueStateMessage"})," would be displayed if the component has ",(0,s.jsx)(t.code,{children:"valueState"})," of type ",(0,s.jsx)(t.code,{children:"Information"}),", ",(0,s.jsx)(t.code,{children:"Critical"})," or ",(0,s.jsx)(t.code,{children:"Negative"}),"."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Array<HTMLElement>"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.7"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(t.h3,{id:"change",children:"change"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the text has changed and the focus leaves the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"input",children:"input"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the value of the component changes at each keystroke or when something is pasted."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.5"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"select",children:"select"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when some text has been selected."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.23.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"scroll",children:"scroll"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when textarea is scrolled."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.23.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(t.p,{children:"No methods available for this component."}),"\n",(0,s.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsx)(t.tbody,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"textarea"}),(0,s.jsx)(t.td,{children:"Used to style the native textarea"})]})})]}),"\n",(0,s.jsx)(t.h2,{id:"more-samples",children:"More Samples"}),"\n",(0,s.jsx)(t.h3,{id:"growing-1",children:"Growing"}),"\n",(0,s.jsx)(t.p,{children:"The TextArea can grow when entering new lines."}),"\n",(0,s.jsx)(x,{}),"\n",(0,s.jsx)(t.h3,{id:"max-length",children:"Max Length"}),"\n",(0,s.jsxs)(t.p,{children:["You can use the ",(0,s.jsx)("b",{children:"maxlength"})," and ",(0,s.jsx)("b",{children:"showExceededText"})," properties to define characters limit\nand to indicates how many characters are remaining before the limit or exceeding after the limit."]}),"\n",(0,s.jsx)(m,{}),"\n",(0,s.jsx)(t.h3,{id:"states",children:"States"}),"\n",(0,s.jsx)(t.p,{children:"TextArea supports several semantic value states, readonly, disabled, etc."}),"\n",(0,s.jsx)(f,{})]})}function C(e={}){const{wrapper:t}={...(0,r.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(S,{...e})}):S(e)}},71184:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>l});var s=n(14041);const r={},d=s.createContext(r);function i(e){const t=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(d.Provider,{value:t},e.children)}}}]);