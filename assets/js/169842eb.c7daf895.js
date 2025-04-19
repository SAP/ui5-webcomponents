"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[894],{15398:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>h,toc:()=>l});var s=t(31085),i=t(71184);const o={title:"UI Theme Designer"},r="Creating Custom Theme with UI Theme Designer",h={id:"docs/advanced/theming",title:"UI Theme Designer",description:"UI5 Web Components are fully compatible with the UI Theme Designer, a tool for building a custom theme. You can create your own theme and effortlessly integrate it in your UI5 Web Components project on HTML level. On top, this does not prevent you from switching to and from officially supported themes, while having your own.",source:"@site/docs/docs/2-advanced/12-theming.md",sourceDirName:"docs/2-advanced",slug:"/docs/advanced/theming",permalink:"/ui5-webcomponents/docs/advanced/theming",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:12,frontMatter:{title:"UI Theme Designer"},sidebar:"documentationSidebar",previous:{title:"Styling",permalink:"/ui5-webcomponents/docs/advanced/styles"},next:{title:"Custom Themes",permalink:"/ui5-webcomponents/docs/advanced/theming-part2"}},c={},l=[{value:"Load custom theme, built with <code>UI Theme Designer</code>, via URL",id:"load-custom-theme-built-with-ui-theme-designer-via-url",level:2},{value:"Using URL parameter",id:"using-url-parameter",level:3},{value:"Using JS API",id:"using-js-api",level:3}];function a(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h1,{id:"creating-custom-theme-with-ui-theme-designer",children:"Creating Custom Theme with UI Theme Designer"}),"\n",(0,s.jsxs)(n.p,{children:["UI5 Web Components are fully compatible with the ",(0,s.jsx)(n.code,{children:"UI Theme Designer"}),", a tool for building a custom theme. You can create your own theme and effortlessly integrate it in your UI5 Web Components project on HTML level. On top, this does not prevent you from switching to and from officially supported themes, while having your own."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)("b",{children:"Note:"})," ",(0,s.jsx)(n.code,{children:"UI Theme Designer"})," is not an open-source tool and requires SAP BTP account and configuration in the SAP BTP Cockpit. In case you don't have access to the UI Theme Designer - follow the ",(0,s.jsx)(n.a,{href:"/ui5-webcomponents/docs/advanced/theming-part2",children:"Manually Building Custom Theme"})," article."]}),"\n",(0,s.jsx)(n.p,{children:"Follow this simple tutorial to build a custom theme running with UI5 Web Components in 5 minutes:"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Open ",(0,s.jsx)(n.strong,{children:"UI Theme Designer"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Go to the ",(0,s.jsx)(n.a,{href:"https://help.sap.com/viewer/09f6818d8e064537973102d6289e2aca/Cloud/en-US/935325fb130d41449362181fb6020dd0.html",children:"official docs"})," and set up the Theme Designer."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Create your ",(0,s.jsx)(n.strong,{children:"custom theme"})," in ",(0,s.jsx)(n.code,{children:"UI Theme Designer"}),"."]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Click the ",(0,s.jsx)(n.strong,{children:"Create a New Theme"})," button."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Choose which SAP stock theme will serve as the base of your custom theme and click the ",(0,s.jsx)(n.strong,{children:"Create Theme"})," button in the footer of the dialog."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Proceed to change as many parameters as you wish."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Once you are done customizing, choose ",(0,s.jsx)(n.strong,{children:"Theme"})," -> ",(0,s.jsx)(n.strong,{children:"Export"})," from the main menu on top. A dialog will appear,\nasking for ",(0,s.jsx)(n.strong,{children:"Theme ID"})," (technical name of your new theme) and a title."]}),"\n",(0,s.jsxs)(n.p,{children:["The Theme ID you choose at this point will be the one you'll use in order to switch to your custom theme, for example if you choose ",(0,s.jsx)(n.code,{children:"mytheme"}),":"]}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"index.html?sap-ui-theme=mytheme"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Important:"})," Before clicking the ",(0,s.jsx)(n.strong,{children:"Export"})," button, thus dismissing the dialog and finishing theme creation,\nit is ",(0,s.jsx)(n.em,{children:"mandatory"})," that you expand the ",(0,s.jsx)(n.strong,{children:"Optional Settings (for Experts)"})," panel, and select the ",(0,s.jsx)(n.strong,{children:"Source Files + CSS Resources"})," option.\nOtherwise, no CSS Variables will be generated."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Download the custom theme ",(0,s.jsx)(n.code,{children:".zip"})," file:"]}),"\n",(0,s.jsxs)(n.p,{children:["Your browser will then download a ",(0,s.jsx)(n.code,{children:".zip"})," file with the name of your new theme, e.g. ",(0,s.jsx)(n.code,{children:"mytheme.zip"}),"."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Copy the ",(0,s.jsx)(n.code,{children:"css_variables.css"})," file with all CSS Variables for your custom theme to your project."]}),"\n",(0,s.jsxs)(n.p,{children:["You can find this file inside the ",(0,s.jsx)(n.code,{children:".zip"})," in the ",(0,s.jsx)(n.code,{children:"\\Base\\baseLib\\<your theme name>\\"})," directory."]}),"\n",(0,s.jsxs)(n.p,{children:["For example: ",(0,s.jsx)(n.code,{children:"mytheme.zip\\Base\\baseLib\\mytheme\\css_variables.css"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Just copy this file to a directory in your project where it can be statically served."}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:["Include the file in your project ",(0,s.jsx)(n.code,{children:".html"})," page:"]}),"\n",(0,s.jsxs)(n.p,{children:["The simplest option would be to use a ",(0,s.jsx)(n.code,{children:"<link>"})," tag and point to where you copied the file:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/css_variables.css">\n'})}),"\n",(0,s.jsxs)(n.p,{children:["but you could as well use a ",(0,s.jsx)(n.code,{children:"<style>"})," tag and paste the content of ",(0,s.jsx)(n.code,{children:"css_variables.css"})," inside,\nif that's what you prefer:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:"<style>\n       /* Here goes the content of css_variables.css */\n</style>\n"})}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"And that's it! Now you can use your custom theme by setting it either in the URL of your page,\nor in your configuration script:"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.code,{children:"index.html?sap-ui-theme=mytheme"})}),"\n",(0,s.jsx)(n.p,{children:"or"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-html",children:'<script data-ui5-config type="application/json">\n{\n\t"theme": "mytheme"\n}\n<\/script>\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," Using a custom theme does not prevent you from using the official themes. You can freely switch to and from them."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";\nsetTheme("sap_fiori_3");\n...\nsetTheme("mytheme");\n...\nsetTheme("sap_fiori_3_dark");\n'})}),"\n",(0,s.jsxs)(n.p,{children:["For more on configuring themes, see ",(0,s.jsx)(n.a,{href:"/ui5-webcomponents/docs/advanced/configuration",children:"Configuration"}),"."]}),"\n",(0,s.jsxs)(n.h2,{id:"load-custom-theme-built-with-ui-theme-designer-via-url",children:["Load custom theme, built with ",(0,s.jsx)(n.code,{children:"UI Theme Designer"}),", via URL"]}),"\n",(0,s.jsxs)(n.p,{children:["The feature is specific to custom themes, created with the ",(0,s.jsx)(n.code,{children:"UI Theme Designer"})," and allows fetching a theme from external location, e.g theme root."]}),"\n",(0,s.jsx)(n.h3,{id:"using-url-parameter",children:"Using URL parameter"}),"\n",(0,s.jsxs)(n.p,{children:["To load a custom theme via URL, you can specify theme's location with the ",(0,s.jsx)(n.code,{children:"theme"})," URL parameter:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"index.html?sap-ui-theme=mytheme@https://my-example-host.com/\n"})}),"\n",(0,s.jsxs)(n.p,{children:['In this example, "mytheme" theme will be applied and its resources (CSS variables specific to the theme) will be loaded from ',(0,s.jsx)(n.a,{href:"https://my-example-host.com/UI5/Base/baseLib/mytheme/css_variables.css",children:"https://my-example-host.com/UI5/Base/baseLib/mytheme/css_variables.css"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use ",(0,s.jsx)(n.code,{children:'<meta name="sap-allowedThemeOrigins" content="https://my-example-host.com/">'})," tag inside the head of the page."]}),"\n",(0,s.jsx)(n.h3,{id:"using-js-api",children:"Using JS API"}),"\n",(0,s.jsxs)(n.p,{children:["To load a custom theme via URL, you can also use the available ",(0,s.jsx)(n.code,{children:"setThemeRoot"})," method. The specified theme root will be applied to the currently set theme."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Note:"})," Certain security restrictions will apply before loading the custom theme. Absolute URLs to a different origin than the current page will return the current page as an origin. To allow certain origins, you have to use ",(0,s.jsx)(n.code,{children:'<meta name="sap-allowedThemeOrigins" content="https://my-example-host.com/">'})," tag inside the head of the page."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:'import { setThemeRoot } from "@ui5/webcomponents-base/dist/config/ThemeRoot.js";\nsetThemeRoot("https://my-example-host.com/");\n'})})]})}function d(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},71184:(e,n,t)=>{t.d(n,{R:()=>r,x:()=>h});var s=t(14041);const i={},o=s.createContext(i);function r(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function h(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);