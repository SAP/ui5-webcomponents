"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[1388],{6353:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>u,contentTitle:()=>l,default:()=>b,frontMatter:()=>p,metadata:()=>c,toc:()=>m});var o=e(31085),i=e(71184);const r='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<html lang="en">\n\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<link rel="stylesheet" href="./main.css">\n\t<title>Sample</title>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor); height: fit-content;">\n\n\t<div id="app">\n \n\t\t<ui5-title>AI Pattern / Level 2</ui5-title>\n\t\t\n\t\t<ui5-panel id="myPanel" fixed>\n\t\t\t<div id="panelContent">\n\t\t\t\t<div id="panelContentFirstRow">\n\t\t\t\t\t<ui5-avatar size="XS">\n\t\t\t\t\t\t<img src="../assets/images/avatars/woman_avatar_1.png" alt="Woman image">\n\t\t\t\t\t</ui5-avatar>\n\t\t\t\t\t<ui5-ai-prompt-input id="promptInput" show-clear-icon placeholder="Ask me anything..." label="User prompt:" show-exceeded-text></ui5-ai-prompt-input>\n\t\t\t\t</div>\n\t\n\t\t\t\t<ui5-toolbar align-content="Start">\n\t\t\t\t\t<ui5-toolbar-button icon="doc-attachment" text="Attach file"></ui5-toolbar-button>\n\t\t\t\t\t<ui5-toolbar-button icon="background" text="Add image"></ui5-toolbar-button>\n\t\t\t\t\t<ui5-toolbar-button icon="sound-loud" text="Insert audio"></ui5-toolbar-button>\n\t\t\t\t\t<ui5-toolbar-separator></ui5-toolbar-separator>\n\t\t\t\t\t<ui5-toolbar-button icon="history" text="History"></ui5-toolbar-button>\n\t\t\t\t\t<ui5-toolbar-button icon="favorite" text="Favorite prompts"></ui5-toolbar-button>\n\t\t\t\t</ui5-toolbar>\n\t\t\t</div>\n\t\t</ui5-panel>\n\t\n\t</div>\n\n\t\x3c!-- playground-fold --\x3e\n\t<script type="module" src="main.js"><\/script>\n</body>\n\t\n</html>\n\x3c!-- playground-fold-end --\x3e',s="body {\n\tbackground-color: var(--sapBackgroundColor)\n}\n\n#panelContent,\n#panelContentFirstRow {\n\tdisplay: flex;\n\tflex: 1;\n\twidth: 100%;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n#panelContentFirstRow {\n\tflex-direction: row;\n\tgap: .5rem;\n}",a="import '@ui5/webcomponents/dist/Avatar.js';\nimport '@ui5/webcomponents-icons/dist/background.js';\nimport '@ui5/webcomponents-icons/dist/doc-attachment.js';\nimport '@ui5/webcomponents-icons/dist/sound-loud.js';\nimport '@ui5/webcomponents-icons/dist/history.js';\nimport '@ui5/webcomponents-icons/dist/favorite.js';\nimport '@ui5/webcomponents-ai/dist/PromptInput.js';\nimport '@ui5/webcomponents/dist/Toolbar.js';\nimport '@ui5/webcomponents/dist/ToolbarButton.js';\nimport '@ui5/webcomponents/dist/ToolbarSeparator.js';\nimport '@ui5/webcomponents/dist/Panel.js';\n",p={},l=void 0,c={id:"components/patterns/AI CustomPrompt/Level 2/Level 2",title:"Level 2",description:"Overview",source:"@site/docs/components/patterns/AI CustomPrompt/Level 2/Level 2.md",sourceDirName:"components/patterns/AI CustomPrompt/Level 2",slug:"/components/patterns/AI CustomPrompt/Level 2/",permalink:"/ui5-webcomponents/components/patterns/AI CustomPrompt/Level 2/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"componentsSidebar",previous:{title:"Level 1",permalink:"/ui5-webcomponents/components/patterns/AI CustomPrompt/Level 1/"},next:{title:"Level 3",permalink:"/ui5-webcomponents/components/patterns/AI CustomPrompt/Level 3/"}},u={},m=[{value:"Overview",id:"overview",level:3}];function d(t){const n={h3:"h3",p:"p",...(0,i.R)(),...t.components},{Editor:e}=n;return e||function(t,n){throw new Error("Expected "+(n?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h3,{id:"overview",children:"Overview"}),"\n",(0,o.jsx)(n.p,{children:"On top of Level 1, different actions are added in a Toolbar below the Prompt input."}),"\n",(0,o.jsx)(e,{html:r,js:a,css:s})]})}function b(t={}){const{wrapper:n}={...(0,i.R)(),...t.components};return n?(0,o.jsx)(n,{...t,children:(0,o.jsx)(d,{...t})}):d(t)}},71184:(t,n,e)=>{e.d(n,{R:()=>s,x:()=>a});var o=e(14041);const i={},r=o.createContext(i);function s(t){const n=o.useContext(r);return o.useMemo((function(){return"function"==typeof t?t(n):{...n,...t}}),[n,t])}function a(t){let n;return n=t.disableParentContext?"function"==typeof t.components?t.components(i):t.components||i:s(t.components),o.createElement(r.Provider,{value:n},t.children)}}}]);