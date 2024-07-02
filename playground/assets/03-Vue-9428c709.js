import{j as e}from"./jsx-runtime-670e1be8.js";import{M as s}from"./index-6087c063.js";import{B as r,F as a}from"./Banner-a1178143.js";import{u as o}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function i(t){const n=Object.assign({h1:"h1",p:"p",h2:"h2",h3:"h3",a:"a",pre:"pre",code:"code"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Docs/Frameworks/Vue"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"get-started-with-ui5-web-components--vuejs",children:"Get Started with UI5 Web Components & Vue.js"}),`
`,e.jsx(n.p,{children:"In this tutorial you will learn how to add UI5 Web Components to your application. You can add UI5 Web Components both to new Vue.js applications and to already existing ones."}),`
`,e.jsx(n.h2,{id:"setting-up-a-vite-and-vuejs-project-with-ui5-web-components",children:"Setting up a Vite and Vue.js project with UI5 Web Components"}),`
`,e.jsx("br",{}),`
`,e.jsx(n.h3,{id:"step-1-setup-a-vue-project-with-vite",children:"Step 1. Setup a Vue project with Vite."}),`
`,e.jsxs(n.p,{children:["To initialize a Vue project based on Vite, please follow the instructions provided in the ",e.jsx(n.a,{href:"https://vuejs.org/guide/quick-start.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"official Vue documentation."})]}),`
`,e.jsx(n.h3,{id:"step-2-add-ui5-web-components",children:"Step 2. Add UI5 Web Components"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm install @ui5/webcomponents
`})}),`
`,e.jsx(n.h3,{id:"step-3-instruct-the-compiler-to-treat-ui5-web-components-as-custom-elements",children:"Step 3. Instruct the compiler to treat UI5 Web Components as custom elements."}),`
`,e.jsxs(n.p,{children:["To avoid issues, it is recommended to exclude our custom elements from component resolution by specifying ",e.jsx(n.code,{children:"compilerOptions.isCustomElement"})," in our ",e.jsx(n.code,{children:"vite.config"})," file."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-ts",children:`// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a ui5- as custom elements
          isCustomElement: tag => tag.includes('ui5-')
        }
      }
    })
  ]
})
`})}),`
`,e.jsx(n.h3,{id:"step-4-import-the-components-that-you-are-going-to-use",children:"Step 4. Import the components that you are going to use."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js";
`})}),`
`,e.jsx(n.h3,{id:"step-5-use-the-imported-elements-in-your-application",children:"Step 5. Use the imported elements in your application."}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button>Hello world!</ui5-button>
`})}),`
`,e.jsx(n.h3,{id:"step-6-launch-the-application",children:"Step 6. Launch the application"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-bash",children:`npm run dev
`})}),`
`,e.jsx(n.h2,{id:"additional-info",children:"Additional Info"}),`
`,e.jsx(n.h3,{id:"two-way-data-binding",children:"Two-Way Data Binding"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.code,{children:"v-model"})," binding doesn't work for custom elements. In order to use two-way data binding, you need to bind and update the value yourself like this:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-input
	:value="inputValue"
	@input="inputValue = $event.target.value">
</ui5-input>
`})}),`
`,e.jsx(a,{})]})}function b(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(i,t)})):i(t)}export{b as default};
