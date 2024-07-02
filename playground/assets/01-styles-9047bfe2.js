import{j as e}from"./jsx-runtime-670e1be8.js";import{M as a}from"./index-6087c063.js";import{B as r,F as i}from"./Banner-a1178143.js";import{u as o}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(t){const n=Object.assign({h1:"h1",p:"p",h2:"h2",pre:"pre",code:"code",a:"a"},o(),t.components);return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Docs/Customizing/Styles"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"styling-ui5-web-components",children:"Styling UI5 Web Components"}),`
`,e.jsx(n.p,{children:"The current article describes general patterns to style the UI5 Web Components."}),`
`,e.jsx(n.p,{children:"One of the core principles of Web Components is the encapsulation. The HTML and styles are encapsulated in the Shadow DOM. This avoids clashes with any CSS brought by the rest of the application, but also makes customization harder. However, there are quite some options to apply custom styling."}),`
`,e.jsx(n.h2,{id:"styles-on-tag-level",children:"Styles on Tag Level"}),`
`,e.jsx(n.p,{children:"We designed some components such as Title, Label, Badge, Button, Input, and a few more in such a way that it is possible to set styles/classes on the custom elements that will take effect."}),`
`,e.jsx("b",{children:"For example:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`  ui5-input {
    width: 150px;
    color: yellow;
    background: purple;
  }
`})}),`
`,e.jsxs(n.p,{children:["You can try this yourself on the Input ",e.jsx(n.a,{href:"https://sap.github.io/ui5-webcomponents/main/playground/main/pages/Input/",target:"_blank",rel:"nofollow noopener noreferrer",children:"test page"}),"."]}),`
`,e.jsx(n.p,{children:"Unfortunately, this can't be done for all components because it depends on the complexity of the DOM structure."}),`
`,e.jsx(n.h2,{id:"usage-of-shadow-parts",children:"Usage of Shadow Parts"}),`
`,e.jsxs(n.p,{children:["For more complex components, the styling on the tag level is not possible, therefore we introduced shadow parts on specific elements in the components’ Shadow DOM that the user can restyle, using ",e.jsx(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/::part",target:"_blank",rel:"nofollow noopener noreferrer",children:"standard CSS syntax"})," for shadow parts."]}),`
`,e.jsxs(n.p,{children:[e.jsx("b",{children:"For example:"})," You can change the appearance of the CardHeader status with the CSS shadow parts syntax:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-card>
	<ui5-card-header
        title-text="Quick Links"
		status="4 of 10"
		slot="header">
	</ui5-card-header>
</ui5-card>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`ui5-card-header::part(status) {
  color: red;
}
`})}),`
`,e.jsxs(n.p,{children:[e.jsx("b",{children:"Note:"}),' All available shadow parts are described in the API reference as part of the "Overview" section of each component.']}),`
`,e.jsx(n.h2,{id:"changing-css-variables",children:"Changing CSS Variables"}),`
`,e.jsxs(n.p,{children:["The UI5 WebComponents leverage CSS variables, so if you inspect the elements inside the Shadow DOM, you will probably find which variable you need to change. Check the list of all ",e.jsx(n.a,{href:"https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css",target:"_blank",rel:"nofollow noopener noreferrer",children:"Global CSS Variables"})," that we use in the component. Altering them will change the component appearance."]}),`
`,e.jsxs(n.p,{children:[e.jsx("b",{children:"For example:"})," You can change the button text color by overriding the ",e.jsx(n.code,{children:"--sapButton_TextColor"})," CSS variable as follows."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<ui5-button>Press</ui5-button>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-css",children:`ui5-button {
  --sapButton_TextColor: purple;
}
`})}),`
`,e.jsx(n.h2,{id:"custom-theme-schema",children:"Custom Theme Schema"}),`
`,e.jsx(n.p,{children:`To change the entire colour scheme, users can create a custom theme.
For more information, see the next article.`}),`
`,e.jsx(i,{})]})}function f(t={}){const{wrapper:n}=Object.assign({},o(),t.components);return n?e.jsx(n,Object.assign({},t,{children:e.jsx(s,t)})):s(t)}export{f as default};
