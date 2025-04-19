"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[8601],{42184:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>p,contentTitle:()=>d,default:()=>b,frontMatter:()=>l,metadata:()=>u,toc:()=>a});var o=t(31085),r=t(71184);const s='\x3c!-- playground-fold --\x3e\n<!DOCTYPE html>\n<head>\n</head>\n\n<body style="background-color: var(--sapBackgroundColor)">\n  \x3c!-- playground-fold-end --\x3e\n\n  <my-element>\n    <h1>UI5 Web Components</h1>\n  </my-element>\n  \x3c!-- playground-fold --\x3e\n  <script type="module" src="main.js"><\/script>\n</body>\n\n\x3c!-- playground-fold-end --\x3e\n',c='import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";\nimport litRender, { html } from "@ui5/webcomponents-base/dist/renderer/LitRenderer.js";\nimport customElement from "@ui5/webcomponents-base/dist/decorators/customElement.js";\nimport property from "@ui5/webcomponents-base/dist/decorators/property.js";\n\nconst styles = `\n    button {\n        padding: 1rem;\n        border-radius: 1rem;\n    }\n`;\n\n@customElement({\n    tag: "my-element",\n    styles,\n    renderer: litRender,\n})\nexport class MyElement extends UI5Element {\n    @property({ type: Number })\n    count = 0;\n\n    render() {\n        return html `\n            <slot></slot>\n            <div class="card">\n                <button @click=${this._onClick} part="button">\n                Count is ${this.count}\n                </button>\n            </div>`\n    }\n\n    _onClick() {\n        this.count += 2;\n    }\n}\n\nMyElement.define();';function i(n){const{Editor:e}={...(0,r.R)(),...n.components};return e||function(n,e){throw new Error("Expected "+(e?"component":"object")+" `"+n+"` to be defined: you likely forgot to import, pass, or provide it.")}("Editor",!0),(0,o.jsx)(e,{html:s,js:c,mainFile:"main.ts"})}function m(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(i,{...n})}):i(n)}const l={},d=void 0,u={id:"UI5Element",title:"UI5Element",description:"",source:"@site/docs/UI5Element.md",sourceDirName:".",slug:"/UI5Element",permalink:"/ui5-webcomponents/UI5Element",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{}},p={},a=[];function f(n){return(0,o.jsx)(m,{})}function b(n={}){const{wrapper:e}={...(0,r.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(f,{...n})}):f()}},71184:(n,e,t)=>{t.d(e,{R:()=>c,x:()=>i});var o=t(14041);const r={},s=o.createContext(r);function c(n){const e=o.useContext(s);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:c(n.components),o.createElement(s.Provider,{value:e},n.children)}}}]);