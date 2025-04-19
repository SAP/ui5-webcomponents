"use strict";(self.webpackChunk_ui5_webcomponents_website=self.webpackChunk_ui5_webcomponents_website||[]).push([[6498],{90035:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var t=s(31085),o=s(71184);const i={},r="Styles",l={id:"docs/development/styling",title:"Styles",description:"The article guides you through defining and structuring your styles for creating themeable web components with the UI5 Web Components framework and tools.",source:"@site/docs/docs/4-development/07-styling.md",sourceDirName:"docs/4-development",slug:"/docs/development/styling",permalink:"/ui5-webcomponents/nightly/docs/development/styling",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:7,frontMatter:{},sidebar:"documentationSidebar",previous:{title:"Lifecycle Methods",permalink:"/ui5-webcomponents/nightly/docs/development/lifecycle-hooks"},next:{title:"Templates",permalink:"/ui5-webcomponents/nightly/docs/development/templates"}},a={},c=[{value:"CSS Variables",id:"css-variables",level:2},{value:"Themes",id:"themes",level:2},{value:"Themeable Web Components",id:"themeable-web-components",level:2},{value:"RTL",id:"rtl",level:2},{value:"CSS Logical Properties",id:"css-logical-properties",level:3},{value:"Content Density",id:"content-density",level:2},{value:"Theming Assets",id:"theming-assets",level:2}];function d(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,o.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"styles",children:"Styles"}),"\n",(0,t.jsx)(n.p,{children:"The article guides you through defining and structuring your styles for creating themeable web components with the UI5 Web Components framework and tools."}),"\n",(0,t.jsx)(n.h2,{id:"css-variables",children:"CSS Variables"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties",children:"CSS variables"})," (also known as Custom properties) are entities that represent specific values to be reused throughout a document."]}),"\n",(0,t.jsx)(n.p,{children:"They are particularly beneficial for implementing theming in web design due to their reusability nature.\nUnsurprisingly, UI5 Web Components theming relies entirely on CSS Variables."}),"\n",(0,t.jsx)(n.h2,{id:"themes",children:"Themes"}),"\n",(0,t.jsx)(n.p,{children:"A theme is a collection of CSS Variables, each representing a specific design property such as color, font size, or spacing. Switching between themes simply involves updating the values of these variables. The underlying CSS rules or styles remain the same, but they reference different variable values depending on the active theme, allowing for a seamless transition between different visual styles."}),"\n",(0,t.jsx)(n.p,{children:"UI5 Web Components comes with several built-in themes:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Quartz themes:"})," Quartz Light, Quartz Dark, Quartz High Contrast Black and  Quartz High Contrast White"]}),"\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Horizon themes:"})," Horizon Morning, Horizon Evening,  Horizon High Contrast Black and  Horizon High Contrast White"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["To implement these themes, the UI5 Web Components uses and depends on the ",(0,t.jsx)(n.code,{children:"SAP CSS variables"}),", available in the ",(0,t.jsx)(n.a,{href:"https://www.npmjs.com/package/@sap-theming/theming-base-content",children:"@sap-theming/theming-base-content"})," package."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," The ",(0,t.jsx)(n.a,{href:"https://github.com/SAP/theming-base-content/",children:"theming-base-content"})," project is developed by SAP and provides color, font, and metric definitions of SAP themes to be used by application UIs and UI frameworks."]}),"\n",(0,t.jsxs)(n.p,{children:["The package provides collections of CSS variables per theme - one for ",(0,t.jsx)(n.code,{children:"Morning Horizon"}),", one for ",(0,t.jsx)(n.code,{children:"Quartz Light"})," and so on.\nLet's exlore a small part of these collections. You will notice that both collections include the same set of variables, but with different values:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* Horizon */\nroot {\n\t--sapBrandColor: #0070f2;\n\t--sapHighlightColor: #0064d9;\n\t--sapBaseColor: #fff;\n\t--sapShellColor: #fff;\n\t--sapBackgroundColor: #f5f6f7;\n\t--sapTextColor: #1d2d3e;\n"})}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* Quartz */\n:root {\n\t--sapBrandColor: #0a6ed1;\n\t--sapTextColor: #32363a;\n\t--sapHighlightColor: #0854a0;\n\t--sapBaseColor: #fff;\n\t--sapShellColor: #354a5f;\n\t--sapBackgroundColor: #f7f7f7\n"})}),"\n",(0,t.jsx)(n.p,{children:"So, to make the UI5 Web Components themeable, internally, in the styles of all our web components we use these CSS Variables:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* ui5-text web component */\n:host {\n\tfont-size: var(--sapFontSize);\n\tfont-family: var(--sapFontFamily);\n\tcolor: var(--sapTextColor);\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"Instead of having multiple CSS files per theme, we create a single web components CSS file used in all themes and apply one or the other CSS variables collection for the respective theme."}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," It's highly likely that when developing web components for SAP applications, it's often necessary to implement and support the same SAP themes. ",(0,t.jsx)(n.strong,{children:"Here comes the UI5 Web Components framework and tools providing out-of-the-box theming setup"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"themeable-web-components",children:"Themeable Web Components"}),"\n",(0,t.jsx)(n.p,{children:"Now that we've explained the essential ingredients for theming, let's explore the practical steps involved."}),"\n",(0,t.jsxs)(n.p,{children:["If you already went through the ",(0,t.jsx)(n.a,{href:"/ui5-webcomponents/nightly/docs/development/package",children:"Create Web Components Project"})," article at the beginning of the ",(0,t.jsx)(n.code,{children:"Development"})," section and kickstarted a project, you probably noticed many theming-related files in the ",(0,t.jsx)(n.code,{children:"src/themes"})," folder."]}),"\n",(0,t.jsxs)(n.p,{children:["These CSS files are part of the theming setup that's in place after the project initialization is done via ",(0,t.jsx)(n.code,{children:"npm init @ui5/create-webcomponents-package"})," (as explained ",(0,t.jsx)(n.a,{href:"/ui5-webcomponents/nightly/docs/development/package",children:"here"}),")."]}),"\n",(0,t.jsxs)(n.p,{children:["The theming setup is based on having a single web component CSS file, containing all CSS rules, that will be used for all themes. Some CSS Variables are global, such as ",(0,t.jsx)(n.code,{children:"--sapBrandColor"}),", ",(0,t.jsx)(n.code,{children:"--sapBackgroundColor"}),", and ",(0,t.jsx)(n.code,{children:"--sapTextColor"}),", and automatically included by the framework and available for usage (as explained in the previous section). Furthermore, they are required to implement the standard SAP themes."]}),"\n",(0,t.jsxs)(n.p,{children:["In addition, you can define your own CSS Variables and provide different values for them for the different themes. Set these CSS Variables in the ",(0,t.jsx)(n.code,{children:"parameters-bundle.css"})," file for each theme. These files are the entry points for the styles build. Once you define them, the framework will be responsible for applying the respective CSS Variables according to the configured theme."]}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"File"}),(0,t.jsx)(n.th,{children:"Purpose"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/MyComponent.css"})}),(0,t.jsx)(n.td,{children:"The web component CSS file with all CSS rules, used in all themes and inserted in the shadow root."})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/sap_horizon/parameters-bundle.css"})}),(0,t.jsxs)(n.td,{children:["Values for the component-specific CSS Variables for the ",(0,t.jsx)(n.code,{children:"sap_horizon"})," theme"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/sap_horizon_dark/parameters-bundle.css"})}),(0,t.jsxs)(n.td,{children:["Values for the component-specific CSS Variables for the ",(0,t.jsx)(n.code,{children:"sap_horizon_dark"})," theme"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/sap_horizon_hcb/parameters-bundle.css"})}),(0,t.jsxs)(n.td,{children:["Values for the component-specific CSS Variables for the ",(0,t.jsx)(n.code,{children:"sap_horizon_hcb"})," theme"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/sap_horizon_hcw/parameters-bundle.css"})}),(0,t.jsxs)(n.td,{children:["Values for the component-specific CSS Variables for the ",(0,t.jsx)(n.code,{children:"sap_horizon_hcw"})," theme"]})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:"src/themes/sap_fiori_3/parameters-bundle.css"})}),(0,t.jsxs)(n.td,{children:["Values for the component-specific CSS Variables for the ",(0,t.jsx)(n.code,{children:"sap_fiori_3"})," theme"]})]})]})]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," It's up to you whether to put the CSS Variables directly in the ",(0,t.jsx)(n.code,{children:"parameters-bundle.css"})," files for the different themes or to import them from separate ",(0,t.jsx)(n.code,{children:".css"})," files."]}),"\n",(0,t.jsx)(n.p,{children:"Practically speaking, the theming setup appears as follows:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"The web component styles:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* src/themes/MyComponent.css */\n:host {\n\tcolor: var(--sapTextColor); /* using global vars */\n\tborder-color: var(--my-component-border-color); /* using component-specific vars */\n}\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Component-specific variables (for example ",(0,t.jsx)(n.code,{children:"sap_horizon"}),"):"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* src/themes/sap_horizon/parameters-bundle.css */\n:root {\n    --my-component-border-color: blue;\n}\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Component-specific variables (for example ",(0,t.jsx)(n.code,{children:"sap_horizon_dark"}),"):"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"/* src/themes/sap_horizon_dark/parameters-bundle.css */\n:root {\n    --my-component-border-color: lightblue;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The last piece is to connect the web component styles (the main file used in all themes) via the ",(0,t.jsx)(n.a,{href:"/ui5-webcomponents/nightly/docs/development/component",children:"@customElement"})," decorator:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import UI5Element from "@ui5/webcomponents-base/dist/UI5Element.js";\n\n// Styles\nimport myStyles from "./generated/themes/MyComponent.css.js";\n\n@customElement({\n\ttag: "my-component",\n\tstyles: myStyles,\n})\nclass MyComponent extends UI5Element {\n}\n'})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsxs)(n.strong,{children:["That's it! The framework will connect the styles with the web component and automatically apply the appropriate CSS variables for the ",(0,t.jsx)(n.code,{children:"sap_horizon"})," and ",(0,t.jsx)(n.code,{children:"sap_horizon_dark"})," themes"]}),". This allows developers to focus on writing CSS without worrying about building, fetching, or loading these styles."]}),"\n",(0,t.jsx)(n.h2,{id:"rtl",children:"RTL"}),"\n",(0,t.jsx)(n.p,{children:'RTL stands for "Right-to-Left" and refers to languages and scripts written and read from right to left, such as Arabic, Hebrew, and Persian.'}),"\n",(0,t.jsx)(n.p,{children:"In RTL layouts, elements like text alignment, margins, paddings, and even the flow of elements on the page are reversed compared to LTR layouts and web components must adapt to appear correctly for users who are accustomed to reading from right to left."}),"\n",(0,t.jsx)(n.h3,{id:"css-logical-properties",children:"CSS Logical Properties"}),"\n",(0,t.jsxs)(n.p,{children:["CSS provides the ",(0,t.jsx)(n.a,{href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values",children:"CSS logical properties"}),", such as ",(0,t.jsx)(n.code,{children:"margin-inline-start"}),", ",(0,t.jsx)(n.code,{children:"padding-inline-end"}),", and others that adapt to both ",(0,t.jsx)(n.code,{children:"LTR"})," and ",(0,t.jsx)(n.code,{children:"RTL"})," layouts automatically."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.strong,{children:"For Example:"})}),"\n",(0,t.jsxs)(n.p,{children:["If you use ",(0,t.jsx)(n.code,{children:"padding-left"})," it may look good in ",(0,t.jsx)(n.code,{children:"LTR"}),", but incorrect in ",(0,t.jsx)(n.code,{children:"RTL"})," layouts, because what is ",(0,t.jsx)(n.code,{children:"padding-left"})," in ",(0,t.jsx)(n.code,{children:"LTR"}),", becomes ",(0,t.jsx)(n.code,{children:"padding-left"})," in RTL, which is actually the right side of the element."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:":host {\n\tpadding-left: 1rem; /* not RTL-friendly */\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["To avoid these issues, you must use the CSS logical properties whenever possible. If you use ",(0,t.jsx)(n.code,{children:"padding-inline-start"})," it will look as expected in ",(0,t.jsx)(n.code,{children:"LTR"})," and will be automatically mirrored by the browser in RTL layouts - what is ",(0,t.jsx)(n.code,{children:"padding-left"})," in LTR will become ",(0,t.jsx)(n.code,{children:"padding-right"})," in RTL."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:":host {\n\tpadding-inline-start: 1rem; /* RTL-friendly */\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Of course, this applies only to asymmetric paddings, margins, and borders.\nIf your styles are symmetric, the same from both sides, the result will be the same in both ",(0,t.jsx)(n.code,{children:"LTR"})," and ",(0,t.jsx)(n.code,{children:"RTL"}),"."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:":host {\n\tpadding-left: 1rem;\n\tpadding-right: 1rem;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Conclusion"}),": To support the ",(0,t.jsx)(n.code,{children:"RTL"})," text direction, use the CSS logical properties as they are automatically mirrored by the browser, based on the text direction (LTR or RTL)."]}),"\n",(0,t.jsx)(n.h2,{id:"content-density",children:"Content Density"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"Content Density"})," is a concept in SAP Design that primarily defines the spacing and sizing of web components to optimize usability and visual appeal based on the user's device and preferences."]}),"\n",(0,t.jsx)(n.p,{children:"There are two main content density modes:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Cozy:"})," This mode provides more spacing around, making them larger and more comfortable to interact with. It's suited for touch-based devices or scenarios where users need a clear distinction between different UI components."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Compact:"})," In this mode, UI elements are more tightly packed with less spacing between them. It's ideal for scenarios where maximizing the amount of visible content is crucial, such as desktop applications or complex dashboards."]}),"\n"]}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["By default, when writing web component styles and defining CSS variables, they are considered as ",(0,t.jsx)(n.code,{children:"Cozy"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"If you defined the following variables:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:":root {\n\t--my-component-width: 2.75rem;\n\t--my-component-padding: 1rem;\n}\n"})}),"\n",(0,t.jsx)(n.p,{children:"And, your web component is used normally:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:"<body>\n\t<my-component></my-component>\n</body>\n"})}),"\n",(0,t.jsxs)(n.p,{children:["As expected, the ",(0,t.jsx)(n.code,{children:"--my-component-width"})," variable will be ",(0,t.jsx)(n.code,{children:"2.75rem"})," and the ",(0,t.jsx)(n.code,{children:"--my-component-padding"})," variable  will be ",(0,t.jsx)(n.code,{children:"1rem"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["To write ",(0,t.jsx)(n.code,{children:"Compact"})," styles and define ",(0,t.jsx)(n.code,{children:"Compact"})," CSS variables, you must target the ",(0,t.jsx)(n.code,{children:"data-ui5-compact-size"})," attribute and the ",(0,t.jsx)(n.code,{children:".ui5-content-density-compact"})," class:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-css",children:"[data-ui5-compact-size],\n.ui5-content-density-compact {\n\t--my-component-width: 1rem;\n\t--my-component-padding: 0.5rem;\n}\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"data-ui5-compact-size"})," attribute and ",(0,t.jsx)(n.code,{children:".ui5-content-density-compact"})," class are the UI5 Web Components contract with consumers.\nTo enable ",(0,t.jsx)(n.code,{children:"Compact"})," content density mode, consumers or app developers can use the CSS class:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:'<body class="ui5-content-density-compact">\n\t<my-component></my-component>\n</body>\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Then, ",(0,t.jsx)(n.code,{children:"--my-component-width"})," will have ",(0,t.jsx)(n.code,{children:"1rem"})," and ",(0,t.jsx)(n.code,{children:"--my-component-padding"})," will be ",(0,t.jsx)(n.code,{children:"0.5rem"}),", making the ",(0,t.jsx)(n.code,{children:"my-component"})," appear smaller, e.g compact."]}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Conclusion"}),": To support the ",(0,t.jsx)(n.code,{children:"Compact"})," density mode, define CSS variables, targeting the ",(0,t.jsx)(n.code,{children:"data-ui5-compact-size"})," attribute and the ",(0,t.jsx)(n.code,{children:".ui5-content-density-compact"})," class."]}),"\n",(0,t.jsx)(n.h2,{id:"theming-assets",children:"Theming Assets"}),"\n",(0,t.jsxs)(n.p,{children:["Once your web component implementation is ready and published on NPM, there's one more detail to consider: the ",(0,t.jsx)(n.code,{children:"src/Assets.ts"})," file generated during project initialization.\nThis file is an entry point for your ",(0,t.jsx)(n.code,{children:"package's assets"}),", including theming and translations.\nThese assets are not included in the components by default but need to be imported separately.\nThis approach helps minimize the package size since users may require multiple themes, while others may not."]}),"\n",(0,t.jsx)(n.p,{children:"To use the web component, one will:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"install the NPM package:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"npm install {PACKAGE-NAME}\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"import the web component:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import "{PACKAGE-NAME}/dist/MyComponent.js`\n'})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"use it in his/her application:"}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-html",children:"<body>\n\t<my-component></my-component>\n</body>\n"})}),"\n",(0,t.jsx)(n.p,{children:"At this point, the web component can be used in the default theme only (Morning Horizon at the time of writing). Even though we coded everything perfectly, following the previous recommendations, the web component won't be displayed as expected in other themes, because the theming assets are not included by default."}),"\n",(0,t.jsx)(n.p,{children:"To use the web component with another theme:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";\nsetTheme("sap_horizon_dark");\n'})}),"\n",(0,t.jsxs)(n.p,{children:["the consumers or the application developers must import the package ",(0,t.jsx)(n.code,{children:"Assets"})," explicitly:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-ts",children:'import "{PACKAGE-NAME}/dist/Assets.js`\n'})})]})}function h(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(d,{...e})}):d(e)}},71184:(e,n,s)=>{s.d(n,{R:()=>r,x:()=>l});var t=s(14041);const o={},i=t.createContext(o);function r(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);