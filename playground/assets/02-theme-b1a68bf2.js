import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as r,F as h}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(s){const n=Object.assign({h1:"h1",p:"p",code:"code",a:"a",ol:"ol",li:"li",strong:"strong",ul:"ul",em:"em",pre:"pre",h2:"h2",h3:"h3"},i(),s.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Customizing/Theme"}),`
`,e.jsx(r,{}),`
`,e.jsx(n.h1,{id:"custom-theming-with-ui-theme-designer",children:"Custom Theming with UI Theme Designer"}),`
`,e.jsxs(n.p,{children:["UI5 Web Components are fully compatible with the ",e.jsx(n.code,{children:"UI Theme Designer"}),", a tool for building a custom theme. You can create your own theme and effortlessly integrate it in your UI5 Web Components project on HTML level. On top, this does not prevent you from switching to and from officially supported themes, while having your own."]}),`
`,e.jsxs(n.p,{children:[e.jsx("b",{children:"Note:"})," ",e.jsx(n.code,{children:"UI Theme Designer"})," is not an open-source tool and requires SAP BTP account and configuration in the SAP BTP Cockpit. In case you don't have access to the UI Theme Designer - follow the ",e.jsx(n.a,{href:"./?path=/docs/docs-customizing-theme_part2--docs",children:"Manually Building Custom Theme"})," article."]}),`
`,e.jsx(n.p,{children:"Follow this simple tutorial to build a custom theme running with UI5 Web Components in 5 minutes:"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Open ",e.jsx(n.strong,{children:"UI Theme Designer"}),"."]}),`
`,e.jsxs(n.p,{children:["Go to the ",e.jsx(n.a,{href:"https://help.sap.com/viewer/09f6818d8e064537973102d6289e2aca/Cloud/en-US/935325fb130d41449362181fb6020dd0.html",target:"_blank",rel:"nofollow noopener noreferrer",children:"official docs"})," and set up the Theme Designer."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Create your ",e.jsx(n.strong,{children:"custom theme"})," in ",e.jsx(n.code,{children:"UI Theme Designer"}),"."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Click the ",e.jsx(n.strong,{children:"Create a New Theme"})," button."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Choose which SAP stock theme will serve as the base of your custom theme and click the ",e.jsx(n.strong,{children:"Create Theme"})," button in the footer of the dialog."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsx(n.p,{children:"Proceed to change as many parameters as you wish."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Once you are done customizing, choose ",e.jsx(n.strong,{children:"Theme"})," -> ",e.jsx(n.strong,{children:"Export"}),` from the main menu on top. A dialog will appear,
asking for `,e.jsx(n.strong,{children:"Theme ID"})," (technical name of your new theme) and a title."]}),`
`,e.jsxs(n.p,{children:["The Theme ID you choose at this point will be the one you'll use in order to switch to your custom theme, for example if you choose ",e.jsx(n.code,{children:"mytheme"}),":"]}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"index.html?sap-ui-theme=mytheme"})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Important:"})," Before clicking the ",e.jsx(n.strong,{children:"Export"}),` button, thus dismissing the dialog and finishing theme creation,
it is `,e.jsx(n.em,{children:"mandatory"})," that you expand the ",e.jsx(n.strong,{children:"Optional Settings (for Experts)"})," panel, and select the ",e.jsx(n.strong,{children:"Source Files + CSS Resources"}),` option.
Otherwise, no CSS Variables will be generated.`]}),`
`]}),`
`]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Download the custom theme ",e.jsx(n.code,{children:".zip"})," file:"]}),`
`,e.jsxs(n.p,{children:["Your browser will then download a ",e.jsx(n.code,{children:".zip"})," file with the name of your new theme, e.g. ",e.jsx(n.code,{children:"mytheme.zip"}),"."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Copy the ",e.jsx(n.code,{children:"css_variables.css"})," file with all CSS Variables for your custom theme to your project."]}),`
`,e.jsxs(n.p,{children:["You can find this file inside the ",e.jsx(n.code,{children:".zip"})," in the ",e.jsx(n.code,{children:"\\Base\\baseLib\\<your theme name>\\"})," directory."]}),`
`,e.jsxs(n.p,{children:["For example: ",e.jsx(n.code,{children:"mytheme.zip\\Base\\baseLib\\mytheme\\css_variables.css"}),"."]}),`
`,e.jsx(n.p,{children:"Just copy this file to a directory in your project where it can be statically served."}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:["Include the file in your project ",e.jsx(n.code,{children:".html"})," page:"]}),`
`,e.jsxs(n.p,{children:["The simplest option would be to use a ",e.jsx(n.code,{children:"<link>"})," tag and point to where you copied the file:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/css_variables.css">
`})}),`
`,e.jsxs(n.p,{children:["but you could as well use a ",e.jsx(n.code,{children:"<style>"})," tag and paste the content of ",e.jsx(n.code,{children:"css_variables.css"}),` inside,
if that's what you prefer:`]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<style>
       /* Here goes the content of css_variables.css */
</style>
`})}),`
`]}),`
`]}),`
`,e.jsx(n.p,{children:`And that's it! Now you can use your custom theme by setting it either in the URL of your page,
or in your configuration script:`}),`
`,e.jsx(n.p,{children:e.jsx(n.code,{children:"index.html?sap-ui-theme=mytheme"})}),`
`,e.jsx(n.p,{children:"or"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<script data-ui5-config type="application/json">
{
	"theme": "mytheme"
}
<\/script>
`})}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Using a custom theme does not prevent you from using the official themes. You can freely switch to and from them."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_fiori_3");
...
setTheme("mytheme");
...
setTheme("sap_fiori_3_dark");
`})}),`
`,e.jsxs(n.p,{children:["For more on configuring themes, see ",e.jsx(n.a,{href:"./?path=/docs/docs-advanced-configuration--docs",children:"Configuration"}),"."]}),`
`,e.jsxs(n.h2,{id:"load-custom-theme-built-with-ui-theme-designer-via-url",children:["Load custom theme, built with ",e.jsx(n.code,{children:"UI Theme Designer"}),", via URL"]}),`
`,e.jsxs(n.p,{children:["The feature is specific to custom themes, created with the ",e.jsx(n.code,{children:"UI Theme Designer"})," and allows fetching a theme from external location, e.g theme root."]}),`
`,e.jsx(n.h3,{id:"using-url-parameter",children:"Using URL parameter"}),`
`,e.jsxs(n.p,{children:["To load a custom theme via URL, you can specify theme's location with the ",e.jsx(n.code,{children:"theme"})," URL parameter:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`index.html?sap-ui-theme=mytheme@https://my-example-host.com/
`})}),`
`,e.jsxs(n.p,{children:['In this example, "mytheme" theme will be applied and its resources (CSS variables specific to the theme) will be loaded from ',e.jsx(n.a,{href:"https://my-example-host.com/UI5/Base/baseLib/mytheme/css_variables.css",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://my-example-host.com/UI5/Base/baseLib/mytheme/css_variables.css"}),"."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use ",e.jsx(n.code,{children:'<meta name="sap-allowedThemeOrigins" content="https://my-example-host.com/">'})," tag inside the head of the page."]}),`
`,e.jsx(n.h3,{id:"using-js-api",children:"Using JS API"}),`
`,e.jsxs(n.p,{children:["To load a custom theme via URL, you can also use the available ",e.jsx(n.code,{children:"setThemeRoot"})," method. The specified theme root will be applied to the currently set theme."]}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Note:"})," Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use ",e.jsx(n.code,{children:'<meta name="sap-allowedThemeOrigins" content="https://my-example-host.com/">'})," tag inside the head of the page."]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`import { setThemeRoot } from "@ui5/webcomponents-base/dist/config/ThemeRoot.js";
setThemeRoot("https://my-example-host.com/");
`})}),`
`,e.jsx(h,{})]})}function y(s={}){const{wrapper:n}=Object.assign({},i(),s.components);return n?e.jsx(n,Object.assign({},s,{children:e.jsx(t,s)})):t(s)}export{y as default};
