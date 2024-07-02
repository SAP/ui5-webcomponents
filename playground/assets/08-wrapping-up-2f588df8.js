import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as r,F as l}from"./Banner-a1178143.js";import{u as o}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(s){const n=Object.assign({h1:"h1",p:"p",strong:"strong",em:"em",h2:"h2",code:"code",a:"a",ol:"ol",li:"li",pre:"pre"},o(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Getting started/Wrapping up"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"wrapping-up",children:"Wrapping Up"}),`
`,e.jsxs(n.p,{children:["In the previous chapters we covered ",e.jsx(n.strong,{children:"bundling"})," UI5 Web Components, using ",e.jsx(n.strong,{children:"components"}),", ",e.jsx(n.strong,{children:"icons"}),", additional ",e.jsx(n.strong,{children:"assets"})," and optional ",e.jsx(n.strong,{children:"features"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.em,{children:"This section illustrates how all these concepts combine"}),"."]}),`
`,e.jsxs(n.h2,{id:"applying-the-learnings-in-the-vite-app",children:["Applying the Learnings in the ",e.jsx(n.code,{children:"vite"})," App"]}),`
`,e.jsxs(n.p,{children:["If you created the test app, described in ",e.jsx(n.a,{href:"./?path=/docs/docs-getting-started-readme--docs",children:"Getting Started"}),", you can enhance it as follows:"]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:['In the "Getting Started" section you installed the ',e.jsx(n.code,{children:"@ui5/webcomponents"})," package."]}),`
`]}),`
`,e.jsxs(n.p,{children:["Now, let's do the same for ",e.jsx(n.code,{children:"@ui5/webcomponents-icons"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @ui5/webcomponents-icons
`})}),`
`,e.jsxs(n.ol,{start:"2",children:[`
`,e.jsxs(n.li,{children:["Change the ",e.jsx(n.code,{children:"main.js"})," file as follows:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Assets.js"; // Assets for the main package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Assets for the icons package

import "@ui5/webcomponents/dist/Button.js"; // ui5-button
import "@ui5/webcomponents/dist/ColorPalette.js"; // ui5-color-palette
import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js"; // the "more colors" feature
import "@ui5/webcomponents-icons/dist/add.js"; // the "add" icon, used inside the button
`})}),`
`,e.jsx(n.p,{children:"You now import assets, components, features and icons."}),`
`,e.jsxs(n.ol,{start:"3",children:[`
`,e.jsxs(n.li,{children:["Change the ",e.jsx(n.code,{children:"index.html"})," file as follows:"]}),`
`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<html>
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
`,e.jsxs(n.p,{children:["to use ",e.jsx(n.code,{children:"ui5-button"})," with the ",e.jsx(n.code,{children:"add"})," icon imported in ",e.jsx(n.code,{children:"main.js"})," and the ",e.jsx(n.code,{children:"ui5-color-palette"})," component with the ",e.jsx(n.code,{children:"show-more-colors"})," feature."]}),`
`,e.jsxs(n.ol,{start:"4",children:[`
`,e.jsx(n.li,{children:"Run the project."}),`
`]}),`
`,e.jsxs(n.p,{children:["If ",e.jsx(n.code,{children:"vite"})," is running, it will just refresh your browser, otherwise run the project again."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run dev
`})}),`
`,e.jsx(n.p,{children:"Go to your browser and observe the changes."}),`
`,e.jsxs(n.ol,{start:"5",children:[`
`,e.jsx(n.li,{children:"Test the assets."}),`
`]}),`
`,e.jsxs(n.p,{children:["Try running the test page with the following URL parameters: ",e.jsx(n.code,{children:"sap-ui-theme=sap_horizon_hcb&sap-ui-language=de"})]}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"http://localhost:3000/?sap-ui-theme=sap_horizon_hcb&sap-ui-language=de",target:"_blank",rel:"nofollow noopener noreferrer",children:"http://localhost:3000/?sap-ui-theme=sap_horizon_hcb&sap-ui-language=de"})}),`
`,e.jsx(n.p,{children:"You should be able to see the page with an accessibility theme, and in German language."}),`
`,e.jsx(l,{})]})}function w(s={}){const{wrapper:n}=Object.assign({},o(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{w as default};
