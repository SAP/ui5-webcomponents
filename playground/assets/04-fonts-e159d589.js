import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as r,F as a}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(n){const t=Object.assign({h1:"h1",h2:"h2",p:"p",code:"code",pre:"pre",strong:"strong",ul:"ul",li:"li"},s(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Customizing/Fonts"}),`
`,e.jsx(r,{}),`
`,e.jsx(t.h1,{id:"custom-fonts",children:"Custom Fonts"}),`
`,e.jsx(t.h2,{id:"the-data-ui5-font-face-style-tag",children:"The data-ui5-font-face style tag"}),`
`,e.jsxs(t.p,{children:["Upon ",e.jsx(t.code,{children:"boot"}),", the UI5 Web Components framework creates a ",e.jsx(t.code,{children:"<style data-ui5-font-face>"})," tag in the ",e.jsx(t.code,{children:"<head>"})," in order to load the necessary fonts."]}),`
`,e.jsx(t.p,{children:"For example:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<style type="text/css" data-ui5-font-face="">
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2");
	}
	
	................
</style>
`})}),`
`,e.jsxs(t.p,{children:[e.jsx(t.strong,{children:"Important:"})," Notice the ",e.jsx(t.code,{children:"data-ui5-font-face"})," attribute. It is unique and recognized by UI5 Web Components."]}),`
`,e.jsx(t.h2,{id:"customizing-fonts",children:"Customizing Fonts"}),`
`,e.jsx(t.p,{children:"You might need to customize fonts for several reasons:"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:"To provide different paths for the fonts (e.g. no public internet connection on the server)."}),`
`,e.jsxs(t.li,{children:["To provide additional declarations inside ",e.jsx(t.code,{children:"@font-face"}),"."]}),`
`,e.jsxs(t.li,{children:["To download additional fonts, such as e.g. ",e.jsx(t.code,{children:"72-Light"}),"."]}),`
`,e.jsx(t.li,{children:"Not to download any of the default fonts."}),`
`]}),`
`,e.jsxs(t.p,{children:["To do that, just create a ",e.jsx(t.code,{children:'<style type="text/css" data-ui5-font-face="">'})," tag in the ",e.jsx(t.code,{children:"head"}),` of your HTML page and
provide arbitrary content for it.`]}),`
`,e.jsxs(t.p,{children:["Then, when the UI5 Web Components framework boots, it will detect the existence of this tag by the ",e.jsx(t.code,{children:"data-ui5-font-face"}),`
attribute, and will not create it. The one you provided will be used instead.`]}),`
`,e.jsx(t.h2,{id:"example",children:"Example"}),`
`,e.jsxs(t.p,{children:["In order to use the ",e.jsx(t.code,{children:"72-Light"})," font in your app and have an additional setting (",e.jsx(t.code,{children:"font-display"}),"), you could add the following markup in the ",e.jsx(t.code,{children:"<head>"})," of your HTML page:"]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`    <style type="text/css" data-ui5-font-face="">
        @font-face {
            font-family: "72";
            font-style: normal;
            font-weight: 200;
            font-display: swap;
            src: local("72-Light"),
            url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2");
        }
    </style>
`})}),`
`,e.jsx(a,{})]})}function y(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o(n)}export{y as default};
