import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as a,F as r}from"./Banner-a1178143.js";import{u as i}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(n){const s=Object.assign({h1:"h1",p:"p",code:"code",a:"a",h3:"h3",ul:"ul",li:"li",pre:"pre",strong:"strong"},i(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Customizing/Theme_part2"}),`
`,e.jsx(a,{}),`
`,e.jsx(s.h1,{id:"manually-building-a-custom-theme",children:"Manually Building a Custom Theme"}),`
`,e.jsx(s.p,{children:"The article describes the steps to manually create a custom theme for your UI5 Web Components project without any tools."}),`
`,e.jsxs(s.p,{children:[e.jsx("b",{children:"Note:"}),"  We recommend using the ",e.jsx(s.code,{children:"UI Theme Designer"})," tool to effortlessly create a custom theme for your UI5 Web Components project as described in the ",e.jsx(s.a,{href:"./?path=/docs/docs-customizing-theme--docs",children:"Custom Theming with UI Theme Designer"}),` article.
However, it requires SAP BTP account and configuration in the SAP BTP Cockpit. In case you don't have access to the UI Theme Designer, this article is for you.`]}),`
`,e.jsx(s.h1,{id:"preface",children:"Preface"}),`
`,e.jsx(s.p,{children:"The theming of the UI5 Web Components is based entirely on CSS variables. Switching between themes means changing the values of these CSS Variables. Applying a custom theme means setting custom values for these CSS Variables."}),`
`,e.jsxs(s.p,{children:["The CSS variables (used by the UI5 Web Components) are maintained in the ",e.jsx(s.a,{href:"https://github.com/SAP/theming-base-content",target:"_blank",rel:"nofollow noopener noreferrer",children:"theming-base-content"})," project and available also on NPM: ",e.jsx(s.a,{href:"https://www.npmjs.com/package/@sap-theming/theming-base-content",target:"_blank",rel:"nofollow noopener noreferrer",children:"@sap-theming/theming-base-content"}),`. The great thing is that they are backward compatible - new variables may be added, but old are kept and could be safely used.
For instance, you can explore the `,e.jsx(s.a,{href:"https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css",target:"_blank",rel:"nofollow noopener noreferrer",children:"Morning Horizon CSS Variables"}),'. These are exactly the CSS variables being applied when the theme is set to Morning Horizon("sap_horizon").']}),`
`,e.jsx(s.p,{children:"So far we have the ingredients - the CSS variables. Now, we need to learn what's the easiest way to change them."}),`
`,e.jsxs(s.p,{children:["At this point, you may ask, can't I just copy the ",e.jsx(s.a,{href:"https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css",target:"_blank",rel:"nofollow noopener noreferrer",children:"Morning Horizon CSS Variables"}),`,
change some of the values and finally include the CSS file in my app? And, the answer is yes - you can do that and it will work. Whatever CSS variables you change, the changes will take effect. However, this is not the most effective way.`]}),`
`,e.jsxs(s.p,{children:["Instead, it's best to change the source ",e.jsx(s.code,{children:".less"})," file (also available in ",e.jsx(s.a,{href:"https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.less",target:"_blank",rel:"nofollow noopener noreferrer",children:"theming-base-content"}),"), change some ",e.jsx(s.code,{children:"Less"})," variables and compile it to CSS. Let's see how this could be implemented."]}),`
`,e.jsx(s.h1,{id:"creating-a-custom-theme",children:"Creating a Custom Theme"}),`
`,e.jsx(s.h3,{id:"1-using-the-sap-themingtheming-base-content",children:'1. Using the "@sap-theming/theming-base-content"'}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Create a blank project."}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`mkdir create-custom-theme
cd create-custom-theme
npm init
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Install ",e.jsx(s.code,{children:"@sap-theming/theming-base-content"})," from NPM to get the source ",e.jsx(s.code,{children:".less"})," files of the themes we are going to extend."]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm install @sap-theming/theming-base-content
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Create a single less file ",e.jsx(s.code,{children:"src/mytheme.less"}),"."]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Import source less file of ",e.jsx(s.code,{children:"sap_horizon"}),"."]}),`
`]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-less",children:`// src/mytheme.less

@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";
`})}),`
`,e.jsx(s.h3,{id:"2-customizing-variables",children:"2. Customizing variables"}),`
`,e.jsxs(s.p,{children:[`You are free to change the values of as many variables as you want.
However, we mostly recommend changing the main ones `,e.jsx(s.code,{children:"sapPrimary1"})," - ",e.jsx(s.code,{children:"sapPrimary7"})," as most of the variables are derived from them."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-less",children:`// src/mytheme.less
@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";

@sapPrimary1: violet;
@sapPrimary2: violet;
`})}),`
`,e.jsx(s.h3,{id:"3-generating-the-custom-css-variables",children:"3. Generating the custom CSS variables"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Install ",e.jsx(s.code,{children:"less"})," to compile ",e.jsx(s.code,{children:"less"})," to ",e.jsx(s.code,{children:"css"}),"."]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm install less --save-dev
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Create a simple script in the project's root, called ",e.jsx(s.code,{children:"customtheme.js"})]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`const less = require('less');
const fs = require('fs');

const themeName =  "mytheme";
const baseThemeName = "sap_horizon";

const CUSTOM_THEME_METADATA = \`
.sapThemeMetaData-Base-baseLib {
	background-image: url('data:text/plain;utf-8, { "Path": "Base.baseLib.\${themeName}.css_variables", "Extends": ["\${baseThemeName}","baseTheme"]}');
}\`;

async function compileLess(inputFile, outputFile) {
	if (!fs.existsSync("dist")) {
		fs.mkdirSync("dist");
	}

    try {
      const lessData = await fs.promises.readFile(inputFile, 'utf-8');

      const { css } = await less.render(lessData, {
         filename: inputFile
      });
      const output = \`\${CUSTOM_THEME_METADATA} \${css}\`;

      await fs.promises.writeFile(outputFile, output, {encoding:'utf8',flag:'w'});
      console.log(\`Successfully compiled Less file \${inputFile} to CSS file \${outputFile}\`);

    } catch (error) {
      console.error('Error compiling Less:', error);
    }
}

compileLess('src/mytheme.less', 'dist/mytheme.css');
`})}),`
`,e.jsxs(s.p,{children:["The script runs the ",e.jsx(s.code,{children:"less"})," compiler over the ",e.jsx(s.code,{children:".less"})," file (",e.jsx(s.code,{children:"src/mytheme.less"}),") to produce a ",e.jsx(s.code,{children:".css"})," out of it (",e.jsx(s.code,{children:"dist/mytheme.css"}),`)
and adds a small piece of metadata (see `,e.jsx(s.code,{children:"CUSTOM_THEME_METADATA"})," variable), required by the UI5 Web Components framework to detect the custom theme."]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Create a task in the ",e.jsx(s.code,{children:"package.json"})," for convinience"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-json",children:`"scripts": {
    "build:theme": "node customtheme.js"
}
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Run the task"}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-bash",children:`npm run build:theme
`})}),`
`,e.jsx(s.p,{children:e.jsxs(s.strong,{children:["That's it! The task outputs the CSS variables into the ",e.jsx(s.code,{children:"dist/mytheme.css"})," file."]})}),`
`,e.jsx(s.h1,{id:"using-a-custom-theme",children:"Using a Custom Theme"}),`
`,e.jsx(s.h3,{id:"1-adding-the-custom-css",children:"1. Adding the custom CSS"}),`
`,e.jsx(s.p,{children:"Now that you have generated the custom CSS, you need to add it to your project."}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["The simplest option would be to use a ",e.jsx(s.code,{children:"<link>"})," tag and point to the file:"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/mytheme.css">
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Or, use ",e.jsx(s.code,{children:"<style>"})," tag and paste the content of ",e.jsx(s.code,{children:"mytheme.css"})," inside:"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-html",children:`<style>
         /* Here goes the content of mytheme.css */
</style>
`})}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["Most of the modern build tools know how to handle CSS imports and could add the imported CSS file content as ",e.jsx(s.code,{children:"style"})," tag for us:"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`import "<path-to-your-css-file>/mytheme.css";
`})}),`
`,e.jsx(s.h3,{id:"2-configuring-the-custom-theme",children:"2. Configuring the custom theme"}),`
`,e.jsx(s.p,{children:`In the previous step we loaded the CSS, now we only need to set it to the UI5 Web Components.
To do so, you can use one of the standard APIs for setting a theme:`}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["With URL parameter: ",e.jsx(s.code,{children:"index.html?sap-ui-theme=mytheme"})]}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsx(s.p,{children:"With JS API:"}),`
`]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-ts",children:`import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setTheme("mytheme");
`})}),`
`,e.jsx(s.h1,{id:"resources",children:"Resources"}),`
`,e.jsxs(s.p,{children:["Everything said so far is implemented in the following demo project - ",e.jsx(s.a,{href:"https://github.com/ilhan007/ui5-webcomponents-custom-theme/",target:"_blank",rel:"nofollow noopener noreferrer",children:"ui5-webcomponents-custom-theme"}),`.
The project implements the script for producing the custom CSS vars and provides a simple test page to demonstrate the custom theme usage.`]}),`
`,e.jsx(r,{})]})}function f(n={}){const{wrapper:s}=Object.assign({},i(),n.components);return s?e.jsx(s,Object.assign({},n,{children:e.jsx(t,n)})):t(n)}export{f as default};
