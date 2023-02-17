import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as r}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(t={}){const{wrapper:o}=Object.assign({},r(),t.components);return o?e.exports.jsx(o,Object.assign({},t,{children:e.exports.jsx(n,{})})):n();function n(){const s=Object.assign({h1:"h1",p:"p",strong:"strong",em:"em",h2:"h2",code:"code",a:"a",ol:"ol",li:"li",pre:"pre"},r(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Getting started/Wrapping up"}),`
`,e.exports.jsx(s.h1,{children:"Wrapping Up"}),`
`,e.exports.jsxs(s.p,{children:["In the previous chapters we covered ",e.exports.jsx(s.strong,{children:"bundling"})," UI5 Web Components, using ",e.exports.jsx(s.strong,{children:"components"}),", ",e.exports.jsx(s.strong,{children:"icons"}),", additional ",e.exports.jsx(s.strong,{children:"assets"})," and optional ",e.exports.jsx(s.strong,{children:"features"}),"."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"This section illustrates how all these concepts combine"}),"."]}),`
`,e.exports.jsxs(s.h2,{children:["Applying the Learnings in the ",e.exports.jsx(s.code,{children:"vite"})," App"]}),`
`,e.exports.jsxs(s.p,{children:["If you created the test app, described in ",e.exports.jsx(s.a,{href:"./01.%20Getting%20Started.md",children:"Getting Started"}),", you can enhance it as follows:"]}),`
`,e.exports.jsxs(s.ol,{children:[`
`,e.exports.jsxs(s.li,{children:['In the "Getting Started" section you installed the ',e.exports.jsx(s.code,{children:"@ui5/webcomponents"})," package."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["Now, let's do the same for ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-icons"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-bash",children:`npm install @ui5/webcomponents-icons
`})}),`
`,e.exports.jsxs(s.ol,{start:"2",children:[`
`,e.exports.jsxs(s.li,{children:["Change the ",e.exports.jsx(s.code,{children:"main.js"})," file as follows:"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js"; // Assets for the main package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Assets for the icons package

import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/ColorPalette.js"; // ui5-color-palette
import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"; // the "more colors" feature
import "@ui5/webcomponents-icons/dist/add.js"; // the "add" icon, used inside the button
`})}),`
`,e.exports.jsx(s.p,{children:"You now import assets, components, features and icons."}),`
`,e.exports.jsxs(s.ol,{start:"3",children:[`
`,e.exports.jsxs(s.li,{children:["Change the ",e.exports.jsx(s.code,{children:"index.html"})," file as follows:"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-html",children:`<html>
    <body>
        <script type="module" src="/main.js"><\/script>
        <ui5-button icon="add">Button with icon</ui5-button>
        <ui5-color-palette show-more-colors>
             <ui5-color-palette-item value="red"></ui5-color-palette-item>
             <ui5-color-palette-item value="green"></ui5-color-palette-item>
             <ui5-color-palette-item value="blue"></ui5-color-palette-item>
        </ui5-color-palette>
    </body>
</html>
`})}),`
`,e.exports.jsxs(s.p,{children:["to use ",e.exports.jsx(s.code,{children:"ui5-button"})," with the ",e.exports.jsx(s.code,{children:"add"})," icon imported in ",e.exports.jsx(s.code,{children:"main.js"})," and the ",e.exports.jsx(s.code,{children:"ui5-color-palette"})," component with the ",e.exports.jsx(s.code,{children:"show-more-colors"})," feature."]}),`
`,e.exports.jsxs(s.ol,{start:"4",children:[`
`,e.exports.jsx(s.li,{children:"Run the project."}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["If ",e.exports.jsx(s.code,{children:"vite"})," is running, it will just refresh your browser, otherwise run the project again."]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-bash",children:`npm run dev
`})}),`
`,e.exports.jsx(s.p,{children:"Go to your browser and observe the changes."}),`
`,e.exports.jsxs(s.ol,{start:"5",children:[`
`,e.exports.jsx(s.li,{children:"Test the assets."}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["Try running the test page with the following URL parameters: ",e.exports.jsx(s.code,{children:"sap-ui-theme=sap_belize_hcb&sap-ui-language=de"})]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.a,{href:"http://localhost:3000/?sap-ui-theme=sap_belize_hcb&sap-ui-language=de",children:"http://localhost:3000/?sap-ui-theme=sap_belize_hcb&sap-ui-language=de"})}),`
`,e.exports.jsx(s.p,{children:"You should be able to see the page with an accessibility theme, and in German language."})]})}}export{g as default};
//# sourceMappingURL=07-wrapping-up.a9483f53.js.map
