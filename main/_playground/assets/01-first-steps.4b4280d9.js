import{j as e}from"./jsx-runtime.68de865e.js";import{M as i}from"./index.766d49cf.js";import{u as r}from"./index.59e09c5d.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function b(s={}){const{wrapper:o}=Object.assign({},r(),s.components);return o?e.exports.jsx(o,Object.assign({},s,{children:e.exports.jsx(t,{})})):t();function t(){const n=Object.assign({h1:"h1",p:"p",em:"em",h2:"h2",strong:"strong",ul:"ul",li:"li",code:"code",a:"a",h3:"h3",pre:"pre",h4:"h4"},r(),s.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Getting started/First steps"}),`
`,e.exports.jsx(n.h1,{children:"First Steps"}),`
`,e.exports.jsx(n.p,{children:e.exports.jsx(n.em,{children:"This section explains how to get started with UI5 Web Components."})}),`
`,e.exports.jsx(n.h2,{children:"Distribution Model"}),`
`,e.exports.jsxs(n.p,{children:["UI5 Web Components are distributed as ",e.exports.jsx(n.strong,{children:"ES6 modules"})," across several ",e.exports.jsx(n.strong,{children:"NPM packages"}),":"]}),`
`,e.exports.jsx(n.p,{children:"The most commonly used ones are:"}),`
`,e.exports.jsxs(n.ul,{children:[`
`,e.exports.jsxs(n.li,{children:[e.exports.jsx(n.code,{children:"@ui5/webcomponents"})," - components library, containing bread-and-butter components (buttons, inputs, pickers, etc.);"]}),`
`,e.exports.jsxs(n.li,{children:[e.exports.jsx(n.code,{children:"@ui5/webcomponents-fiori"})," - components library, containing semantic, higher-order components;"]}),`
`,e.exports.jsxs(n.li,{children:[e.exports.jsx(n.code,{children:"@ui5/webcomponents-icons"})," - icons collection, containing general-purpose and business-oriented icons."]}),`
`]}),`
`,e.exports.jsxs(n.p,{children:[e.exports.jsx(n.strong,{children:"Important: There is no CDN for UI5 Web Components"}),". Each application is expected to ",e.exports.jsx(n.strong,{children:"import"})," and ",e.exports.jsx(n.strong,{children:"bundle"})," only the components (and any other resources) it is going to use."]}),`
`,e.exports.jsx(n.h2,{children:"Bundling UI5 Web Components"}),`
`,e.exports.jsx(n.p,{children:"To build your UI5 Web Components project you can use any bundling tool that supports the following features:"}),`
`,e.exports.jsxs(n.ul,{children:[`
`,e.exports.jsxs(n.li,{children:[e.exports.jsx(n.code,{children:".json"})," imports;"]}),`
`,e.exports.jsx(n.li,{children:"dynamic ES6 imports."}),`
`]}),`
`,e.exports.jsx(n.p,{children:"This is true of all modern bundlers."}),`
`,e.exports.jsxs(n.p,{children:["UI5 Web Components are shipped as ES6 modules and published on NPM. If you are already using a framework that handles bundling of ES6 modules, skip forward to ",e.exports.jsx(n.a,{href:"#installation",children:"Installation"})," or check the Tutorials section."]}),`
`,e.exports.jsx(n.h3,{children:"Creating a Project"}),`
`,e.exports.jsxs(n.p,{children:["You can use any ES6 module-capable front-end tooling, but in case you don\u2019t have a preference yet, you can start a new project using ",e.exports.jsx(n.a,{href:"https://vitejs.dev",children:"Vite"}),". The only prerequisite is to have ",e.exports.jsx(n.a,{href:"https://nodejs.org/",children:"Node.js"})," installed."]}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-console",children:`npm init vite
`})}),`
`,e.exports.jsxs(n.ul,{children:[`
`,e.exports.jsxs(n.li,{children:["Select a project name: ",e.exports.jsx(n.code,{children:"my-webcomponents-app"})]}),`
`,e.exports.jsxs(n.li,{children:["Select a framework: ",e.exports.jsx(n.code,{children:"vanilla"})]}),`
`,e.exports.jsxs(n.li,{children:["Select a variant: ",e.exports.jsx(n.code,{children:"JavaScript"})]}),`
`]}),`
`,e.exports.jsxs(n.p,{children:["This command will create a project structure under ",e.exports.jsx(n.code,{children:"my-webcomponents-app"}),". Follow the instructions on the screen to install the initial depenednecies and start a dev server."]}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{children:`cd my-webcomponents-app
npm install
npm run dev\u200B
`})}),`
`,e.exports.jsxs(n.p,{children:["You should see a message that a server is running on ",e.exports.jsx(n.code,{children:"Local: http://localhost:3000/"}),". Launch your favourite IDE and change some code, the browser page will be automatically refreshed."]}),`
`,e.exports.jsx(n.h3,{children:"Installation"}),`
`,e.exports.jsx("a",{name:"installation"}),`
`,e.exports.jsxs(n.p,{children:["Install ",e.exports.jsx(n.code,{children:"@ui5/webcomponents"})]}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`npm install @ui5/webcomponents
`})}),`
`,e.exports.jsxs(n.p,{children:["This command downloads the published source code of the UI5 Web Components to the ",e.exports.jsx(n.code,{children:"node_modules"})," folder. Now, you can add them to your code to get them on the web page."]}),`
`,e.exports.jsx(n.h3,{children:"Documentation"}),`
`,e.exports.jsxs(n.p,{children:["Take a look at the available UI5 Web Components documentation in the ",e.exports.jsx(n.a,{href:"./playground/docs/",children:"playground"}),"."]}),`
`,e.exports.jsx(n.h3,{children:"Usage"}),`
`,e.exports.jsx(n.h4,{children:"1. Import the needed Web Component."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`// src/main.js
import "@ui5/webcomponents/dist/Button.js";
`})}),`
`,e.exports.jsxs(n.p,{children:["This line runs the code that registers the ",e.exports.jsx(n.code,{children:"<ui5-button>"})," tag with the browser. Now, when the browser sees such a tag, it knows how to render it."]}),`
`,e.exports.jsx(n.h4,{children:"2. Instantiate the Web Component."}),`
`,e.exports.jsx(n.p,{children:"Next, change the application markup in the same file to display the button on the page:"}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`// src/main.js
...
document.querySelector('#app').innerHTML = \`
  <ui5-button>Hello UI5 Web Components</ui5-button>
\`
`})}),`
`,e.exports.jsx(n.p,{children:"Check the browser to see the displayed button. You can now use UI5 Web Components just like normal HTML elements - set attributes on them, attach events, and more as described in the documentation."}),`
`,e.exports.jsx(n.h4,{children:"3. Run a production build."}),`
`,e.exports.jsx(n.p,{children:"If you want to deploy your project on a static hosting or in a Node.js project, run:"}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-console",children:`npm run build
`})}),`
`,e.exports.jsx(n.p,{children:"The output will show what files were created along with their sizes:"}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-console",children:`vite v2.3.4 building for production...
\u2713 99 modules transformed.
dist/assets/favicon.17e50649.svg 1.49kb
dist/index.html 0.51kb
dist/assets/index.ccce2ca3.css 0.16kb / brotli: 0.10kb
dist/assets/index.4116dceb.js 0.12kb / brotli: 0.09kb
dist/assets/vendor.c05c7785.js 114.92kb / brotli: 24.30kb
`})}),`
`,e.exports.jsxs(n.p,{children:["The contents of the ",e.exports.jsx(n.code,{children:"dist"})," folder is ready to be deployed for productive usage. The hashes in the file names make them safe for caching and the produced bundle is optimized for production."]}),`
`,e.exports.jsx(n.h4,{children:"4. Enjoy UI5 Web Components."}),`
`,e.exports.jsxs(n.p,{children:["Next: ",e.exports.jsx(n.a,{href:"../importing-components",children:"Importing UI5 Web Components"})]})]})}}export{b as default};
//# sourceMappingURL=01-first-steps.4b4280d9.js.map
