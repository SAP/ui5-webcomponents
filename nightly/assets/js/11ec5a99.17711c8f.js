"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[2765],{13952:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>f,contentTitle:()=>b,default:()=>k,frontMatter:()=>g,metadata:()=>v,toc:()=>y});var s=n(31085),i=n(71184);const d='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: 350px">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-multi-input id="multi-input">\n        <ui5-token slot="tokens" text="Argentina"></ui5-token>\n        <ui5-token slot="tokens" text="Mexico"></ui5-token>\n        <ui5-token slot="tokens" text="Philippines"></ui5-token>\n        <ui5-token slot="tokens" text="Sweden"></ui5-token>\n        <ui5-token slot="tokens" text="USA"></ui5-token>\n    </ui5-multi-input>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',r='import "@ui5/webcomponents/dist/MultiInput.js";\nimport "@ui5/webcomponents/dist/Token.js";\n\ndocument.getElementById("multi-input").addEventListener("token-delete", function (event) {\n\tconst tokens = event.detail?.tokens;\n\n\tif (tokens) {\n\t\ttokens.forEach(token => token.remove());\n\t}\n});';function l(e){const{Editor:t}={...(0,i.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:d,js:r})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}const h='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: 350px;">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-multi-input id="multi-input" placeholder="Start typing country name" show-suggestions>\n        <ui5-suggestion-item text="Argentina"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Bulgaria"></ui5-suggestion-item>\n        <ui5-suggestion-item text="England"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Finland"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Germany"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Hungary"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Italy"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Luxembourg"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Mexico"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Philippines"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Sweden"></ui5-suggestion-item>\n        <ui5-suggestion-item text="USA"></ui5-suggestion-item>\n        <div slot="valueStateMessage">Token is already in the list</div>\n    </ui5-multi-input>\n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',o='import "@ui5/webcomponents/dist/MultiInput.js";\nimport "@ui5/webcomponents/dist/Token.js";\nimport "@ui5/webcomponents/dist/SuggestionItem.js";\nimport "@ui5/webcomponents/dist/features/InputSuggestions.js";\n\nconst createTokenFromText = function (text) {\n    let token = document.createElement("ui5-token");\n    token.setAttribute("text", text);\n    token.setAttribute("slot", "tokens");\n    return token;\n};\n\ndocument.getElementById("multi-input").addEventListener("token-delete", function (event) {\n\tconst tokens = event.detail?.tokens;\n\n\tif (tokens) {\n\t\ttokens.forEach(token => token.remove());\n\t}\n});\n\ndocument.getElementById("multi-input").addEventListener("paste", function (event) {\n    event.preventDefault();\n    let pastedText = (event.clipboardData || window.clipboardData).getData(\'text/plain\');;\n    if (!pastedText) {\n        return;\n    }\n    let separatedTexts = pastedText.split(/\\r\\n|\\r|\\n|\\t/g).filter(t => !!t);\n    if (separatedTexts.length === 1) {\n        event.target.value += separatedTexts[0];\n        return;\n    }\n    separatedTexts.forEach((tokenText) => {\n        if (tokenText) {\n            event.target.appendChild(createTokenFromText(tokenText));\n        }\n    })\n});\n\ndocument.getElementById("multi-input").addEventListener("change", function (event) {\n    if (!event.target.value) {\n        return;\n    }\n    let isDuplicate = event.target.tokens.some(function(token) {\n        return token.text === event.target.value\n    });\n    if (isDuplicate) {\n        event.target.valueState = "Negative";\n        setTimeout(function () {\n            event.target.valueState = "None";\n        }, 2000);\n        return;\n    }\n    event.target.appendChild(createTokenFromText(event.target.value));\n    event.target.value = "";\n});';function x(e){const{Editor:t}={...(0,i.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:h,js:o})}function a(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}const j='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: 350px;">\n    \x3c!-- playground-fold-end --\x3e\n\n    <ui5-multi-input placeholder="Type anything" show-suggestions>\n        <ui5-suggestion-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-suggestion-item>\n        <ui5-suggestion-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-suggestion-item>\n        <ui5-suggestion-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-suggestion-item>\n        <div slot="valueStateMessage">Token is already in the list</div>\n    </ui5-multi-input>\n    \n    \x3c!-- playground-fold --\x3e\n    <script type="module" src="main.js"><\/script>\n</body>\n\n</html>\n\x3c!-- playground-fold-end --\x3e\n',u='import "@ui5/webcomponents/dist/MultiInput.js";\nimport "@ui5/webcomponents/dist/SuggestionItem.js";\nimport "@ui5/webcomponents/dist/features/InputSuggestions.js";';function p(e){const{Editor:t}={...(0,i.R)(),...e.components};return t||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,s.jsx)(t,{html:j,js:u})}function m(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(p,{...e})}):p(e)}const g={slug:"../MultiInput",ui5_tag_name:"ui5-multi-input",ui5_since:"1.0.0-rc.9"},b=void 0,v={id:"components/main/MultiInput",title:"MultiInput",description:"A ui5-multi-input field allows the user to enter multiple values, which are displayed as ui5-token.",source:"@site/docs/components/main/MultiInput.mdx",sourceDirName:"components/main",slug:"/components/MultiInput",permalink:"/ui5-webcomponents/nightly/components/MultiInput",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{slug:"../MultiInput",ui5_tag_name:"ui5-multi-input",ui5_since:"1.0.0-rc.9"},sidebar:"componentsSidebar",previous:{title:"MultiComboBoxItemGroup",permalink:"/ui5-webcomponents/nightly/components/MultiComboBoxItemGroup"},next:{title:"Panel",permalink:"/ui5-webcomponents/nightly/components/Panel"}},f={},y=[{value:"ES6 Module Import",id:"es6-module-import",level:3},{value:"Basic Sample",id:"basic-sample",level:2},{value:"Properties",id:"properties",level:2},{value:"showValueHelpIcon",id:"showvaluehelpicon",level:3},{value:"name",id:"name",level:3},{value:"disabled",id:"disabled",level:3},{value:"placeholder",id:"placeholder",level:3},{value:"readonly",id:"readonly",level:3},{value:"required",id:"required",level:3},{value:"noTypeahead",id:"notypeahead",level:3},{value:"type",id:"type",level:3},{value:"value",id:"value",level:3},{value:"valueState",id:"valuestate",level:3},{value:"showSuggestions",id:"showsuggestions",level:3},{value:"maxlength",id:"maxlength",level:3},{value:"accessibleName",id:"accessiblename",level:3},{value:"accessibleNameRef",id:"accessiblenameref",level:3},{value:"accessibleDescription",id:"accessibledescription",level:3},{value:"accessibleDescriptionRef",id:"accessibledescriptionref",level:3},{value:"showClearIcon",id:"showclearicon",level:3},{value:"open",id:"open",level:3},{value:"Slots",id:"slots",level:2},{value:"tokens",id:"tokens",level:3},{value:"default",id:"default",level:3},{value:"icon",id:"icon",level:3},{value:"valueStateMessage",id:"valuestatemessage",level:3},{value:"Events",id:"events",level:2},{value:"value-help-trigger",id:"value-help-trigger",level:3},{value:"token-delete",id:"token-delete",level:3},{value:"change",id:"change",level:3},{value:"input",id:"input",level:3},{value:"select",id:"select",level:3},{value:"selection-change",id:"selection-change",level:3},{value:"open",id:"open-1",level:3},{value:"close",id:"close",level:3},{value:"Methods",id:"methods",level:2},{value:"CSS Parts",id:"css-parts",level:2},{value:"More Samples",id:"more-samples",level:2},{value:"Add/Remove Tokens",id:"addremove-tokens",level:3},{value:"Items Text Wrapping",id:"items-text-wrapping",level:3}];function w(e){const t={code:"code",h2:"h2",h3:"h3",li:"li",p:"p",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["A ",(0,s.jsx)(t.code,{children:"ui5-multi-input"})," field allows the user to enter multiple values, which are displayed as ",(0,s.jsx)(t.code,{children:"ui5-token"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"User can choose interaction for creating tokens.\nFiori Guidelines say that user should create tokens when:"}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsxs)(t.li,{children:["Type a value in the input and press enter or focus out the input field (",(0,s.jsx)(t.code,{children:"change"})," event is fired)"]}),"\n",(0,s.jsxs)(t.li,{children:["Move between suggestion items (",(0,s.jsx)(t.code,{children:"selection-change"})," event is fired)"]}),"\n",(0,s.jsxs)(t.li,{children:["Clicking on a suggestion item (",(0,s.jsx)(t.code,{children:"selection-change"})," event is fired if the clicked item is different than the current value. Also ",(0,s.jsx)(t.code,{children:"change"})," event is fired )"]}),"\n"]}),"\n",(0,s.jsx)(t.h3,{id:"es6-module-import",children:"ES6 Module Import"}),"\n",(0,s.jsx)(t.p,{children:(0,s.jsx)(t.code,{children:'import "@ui5/webcomponents/dist/MultiInput.js";'})}),"\n",(0,s.jsx)(t.h2,{id:"basic-sample",children:"Basic Sample"}),"\n",(0,s.jsx)(c,{}),"\n",(0,s.jsx)(t.h2,{id:"properties",children:"Properties"}),"\n",(0,s.jsx)(t.h3,{id:"showvaluehelpicon",children:"showValueHelpIcon"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Determines whether a value help icon will be visualized in the end of the input. Pressing the icon will fire ",(0,s.jsx)(t.code,{children:"value-help-trigger"})," event."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"name",children:"name"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Determines the name by which the component will be identified upon submission in an HTML form.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," This property is only applicable within the context of an HTML Form element. ",(0,s.jsx)(t.strong,{children:"Note:"})," When the component is used inside a form element, the value is sent as the first element in the form data, even if it's empty."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"disabled",children:"disabled"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines whether the component is in disabled state.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," A disabled component is completely noninteractive."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"placeholder",children:"placeholder"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines a short hint intended to aid the user with data entry when the component has no value."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"readonly",children:"readonly"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines whether the component is read-only.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," A read-only component is not editable, but still provides visual feedback upon user interaction."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"required",children:"required"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines whether the component is required."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.3"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"notypeahead",children:"noTypeahead"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines whether the value will be autcompleted to match an item"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.4.0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"type",children:"type"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the HTML type of the component.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Notes:"}),(0,s.jsx)("br",{}),"- The particular effect of this property differs depending on the browser and the current language settings, especially for type ",(0,s.jsx)(t.code,{children:"Number"}),".",(0,s.jsx)("br",{}),"- The property is mostly intended to be used with touch devices that use different soft keyboard layouts depending on the given input type."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:'"Text" | "Email" | "Number" | "Password" | "Tel" | "URL" | "Search"'})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:'"Text"'})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"value",children:"value"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the value of the component.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," The property is updated upon typing."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:'""'})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"valuestate",children:"valueState"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the value state of the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:'"None" | "Positive" | "Critical" | "Negative" | "Information"'})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:'"None"'})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"showsuggestions",children:"showSuggestions"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines whether the component should show suggestions, if such are present."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"maxlength",children:"maxlength"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Sets the maximum number of characters available in the input field.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," This property is not compatible with the ui5-input type InputType.Number. If the ui5-input type is set to Number, the maxlength value is ignored."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"number | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.5"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessiblename",children:"accessibleName"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the accessible ARIA name of the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.15"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessiblenameref",children:"accessibleNameRef"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Receives id(or many ids) of the elements that label the input."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.15"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessibledescription",children:"accessibleDescription"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the accessible description of the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.9.0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"accessibledescriptionref",children:"accessibleDescriptionRef"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Receives id(or many ids) of the elements that describe the input."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"string | undefined"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"undefined"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.9.0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"showclearicon",children:"showClearIcon"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines whether the clear icon of the input will be shown."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.2.0"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"open",children:"open"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines whether the suggestions picker is open. The picker will not open if the ",(0,s.jsx)(t.code,{children:"showSuggestions"})," property is set to ",(0,s.jsx)(t.code,{children:"false"}),", the input is disabled or the input is readonly. The picker will close automatically and ",(0,s.jsx)(t.code,{children:"close"})," event will be fired if the input is not in the viewport."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"boolean"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Default"}),(0,s.jsx)(t.td,{children:"false"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.0.0"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"slots",children:"Slots"}),"\n",(0,s.jsx)(t.h3,{id:"tokens",children:"tokens"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the component tokens."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Array<IToken>"})})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"default",children:"default"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the suggestion items.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," The suggestions would be displayed only if the ",(0,s.jsx)(t.code,{children:"showSuggestions"})," property is set to ",(0,s.jsx)(t.code,{children:"true"}),".",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," The ",(0,s.jsx)(t.code,{children:"<ui5-suggestion-item>"}),", ",(0,s.jsx)(t.code,{children:"<ui5-suggestion-item-group>"})," and ",(0,s.jsx)(t.code,{children:"ui5-suggestion-item-custom"})," are recommended to be used as suggestion items."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Array<IInputSuggestionItem>"})})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"icon",children:"icon"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Defines the icon to be displayed in the component."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Array<IIcon>"})})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"valuestatemessage",children:"valueStateMessage"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsxs)(t.td,{children:["Defines the value state message that will be displayed as pop up under the component. The value state message slot should contain only one root element.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," If not specified, a default text (in the respective language) will be displayed.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," The ",(0,s.jsx)(t.code,{children:"valueStateMessage"})," would be displayed, when the component is in ",(0,s.jsx)(t.code,{children:"Information"}),", ",(0,s.jsx)(t.code,{children:"Critical"})," or ",(0,s.jsx)(t.code,{children:"Negative"})," value state.",(0,s.jsx)("br",{}),(0,s.jsx)(t.strong,{children:"Note:"})," If the component has ",(0,s.jsx)(t.code,{children:"suggestionItems"}),", the ",(0,s.jsx)(t.code,{children:"valueStateMessage"})," would be displayed as part of the same popover, if used on desktop, or dialog - on phone."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"Array<HTMLElement>"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"1.0.0-rc.6"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"events",children:"Events"}),"\n",(0,s.jsx)(t.h3,{id:"value-help-trigger",children:"value-help-trigger"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the value help icon is pressed and F4 or ALT/OPTION + ARROW_UP/ARROW_DOWN keyboard keys are used."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"token-delete",children:"token-delete"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when tokens are being deleted."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent<MultiInputTokenDeleteEventDetail>"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Parameters"}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.strong,{children:"tokens"}),": ",(0,s.jsx)(t.code,{children:"Array"}),(0,s.jsx)("br",{}),"An array containing the deleted tokens."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"change",children:"change"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the input operation has finished by pressing Enter or on focusout."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"input",children:"input"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the value of the component changes at each keystroke, and when a suggestion item has been selected."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsxs)(t.td,{children:["Yes - via ",(0,s.jsx)("code",{children:"preventDefault()"})]})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"select",children:"select"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when some text has been selected."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.0.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"selection-change",children:"selection-change"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the user navigates to a suggestion item via the ARROW keys, as a preview, before the final selection."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent<InputSelectionChangeEventDetail>"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Parameters"}),(0,s.jsxs)(t.td,{children:[(0,s.jsx)(t.strong,{children:"item"}),": ",(0,s.jsx)(t.code,{children:"HTMLElement"}),(0,s.jsx)("br",{}),"The previewed suggestion item."]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.0.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"open-1",children:"open"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the suggestions picker is open."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.0.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"Yes"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h3,{id:"close",children:"close"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{}),(0,s.jsx)(t.th,{})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Description"}),(0,s.jsx)(t.td,{children:"Fired when the suggestions picker is closed."})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Type"}),(0,s.jsx)(t.td,{children:(0,s.jsx)(t.code,{children:"CustomEvent"})})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Since"}),(0,s.jsx)(t.td,{children:"2.0.0"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Bubbles"}),(0,s.jsx)(t.td,{children:"No"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"Cancelable"}),(0,s.jsx)(t.td,{children:"No"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"methods",children:"Methods"}),"\n",(0,s.jsx)(t.p,{children:"No methods available for this component."}),"\n",(0,s.jsx)(t.h2,{id:"css-parts",children:"CSS Parts"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{children:"Name"}),(0,s.jsx)(t.th,{children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"root"}),(0,s.jsx)(t.td,{children:"Used to style the root DOM element of the Input component"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"input"}),(0,s.jsx)(t.td,{children:"Used to style the native input element"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{children:"clear-icon"}),(0,s.jsx)(t.td,{children:"Used to style the clear icon, which can be pressed to clear user input text"})]})]})]}),"\n",(0,s.jsx)(t.h2,{id:"more-samples",children:"More Samples"}),"\n",(0,s.jsx)(t.h3,{id:"addremove-tokens",children:"Add/Remove Tokens"}),"\n",(0,s.jsx)(a,{}),"\n",(0,s.jsx)(t.h3,{id:"items-text-wrapping",children:"Items Text Wrapping"}),"\n",(0,s.jsx)(t.p,{children:"The sample demonstrates how the text of the items wrap when too long."}),"\n",(0,s.jsx)(m,{})]})}function k(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(w,{...e})}):w(e)}},71184:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>l});var s=n(14041);const i={},d=s.createContext(i);function r(e){const t=s.useContext(d);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(d.Provider,{value:t},e.children)}}}]);