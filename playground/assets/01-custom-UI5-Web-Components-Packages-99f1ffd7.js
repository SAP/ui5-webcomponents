import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as d,F as c}from"./Banner-a1178143.js";import{u as t}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function r(n){const s=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code",strong:"strong",h2:"h2",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",h4:"h4",pre:"pre"},t(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Development/Custom UI5 Web Components Packages"}),`
`,e.jsx(d,{}),`
`,e.jsx(s.h1,{id:"creating-a-custom-ui5-web-components-package",children:"Creating a Custom UI5 Web Components Package"}),`
`,e.jsx(s.p,{children:"This tutorial explains how to:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Create an NPM package for your own UI5 Web Components."}),`
`,e.jsxs(s.li,{children:["Use UI5 Web Components' standard build tools: ",e.jsx(s.code,{children:"@ui5/webcomponents-tools"}),"."]}),`
`,e.jsxs(s.li,{children:["Gain all ",e.jsx(s.code,{children:"@ui5/webcomponents"})," capabilities such as HBS template support, i18n, theming, test setup, etc."]}),`
`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"})," Whether you use ",e.jsx(s.code,{children:"npm"})," or ",e.jsx(s.code,{children:"yarn"})," is a matter of preference."]}),`
`,e.jsx(s.h2,{id:"step-1-create-an-npm-package",children:"Step 1. Create an NPM package."}),`
`,e.jsx(s.h3,{id:"run-the-init-command",children:"Run the init command."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"})," The following command will ",e.jsx(s.strong,{children:"create a new directory"}),` and initialize your package there.
Make sure you haven't created a directory yourself.`]}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["With ",e.jsx(s.strong,{children:"npm"}),":"]}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm init @ui5/webcomponents-package"})}),`
`,e.jsx(s.p,{children:"or"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm init @ui5/webcomponents-package <NEW-PACKAGE-NAME>"})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["With ",e.jsx(s.strong,{children:"yarn"}),":"]}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"yarn create @ui5/webcomponents-package"})}),`
`,e.jsx(s.p,{children:"or"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"yarn create @ui5/webcomponents-package <NEW-PACKAGE-NAME>"})}),`
`]}),`
`]}),`
`,e.jsxs(s.p,{children:["where ",e.jsx(s.code,{children:"<NEW-PACKAGE-NAME>"})," is the name of your new package (and the name of the directory to be created), for example:"]}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm init @ui5/webcomponents-package my-components"})}),`
`,e.jsxs(s.p,{children:["will create a ",e.jsx(s.code,{children:"my-components"})," directory and initialize the package there."]}),`
`,e.jsx(s.h3,{id:"follow-the-prompts",children:"Follow the prompts."}),`
`,e.jsx(s.p,{children:"The initialization script will ask you to choose:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["The ",e.jsx(s.strong,{children:"name"})," of your package (if you did not already pass a name when running the command above);"]}),`
`,e.jsxs(s.li,{children:["The ",e.jsx(s.strong,{children:"port"})," for your dev server (",e.jsx(s.code,{children:"8080"})," by default - just press Enter to select this);"]}),`
`,e.jsxs(s.li,{children:["The ",e.jsx(s.strong,{children:"tag"})," of the sample web component that will be created (",e.jsx(s.code,{children:"my-first-component"})," by default - just press Enter to select this)."]}),`
`]}),`
`,e.jsx(s.h3,{id:"your-package-is-ready",children:"Your package is ready!"}),`
`,e.jsx(s.p,{children:"Just follow the instructions:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.code,{children:"cd <NEW-PACKAGE-NAME>"})}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"npm i"})," (or ",e.jsx(s.code,{children:"yarn"})," if you prefer)"]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.code,{children:"npm start"})," (or ",e.jsx(s.code,{children:"yarn start"})," if you prefer)"]}),`
`]}),`
`,e.jsx(s.h2,{id:"step-2-run-the-dev-server-and-test-the-build",children:"Step 2. Run the dev server and test the build."}),`
`,e.jsx(s.p,{children:"To run the dev server, as instructed above:"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm run start"})}),`
`,e.jsx(s.p,{children:"or"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"yarn start"})}),`
`,e.jsx(s.p,{children:"and once the project is built for the first time, the browser will automatically open the dev server URL."}),`
`,e.jsx(s.p,{children:"You can also run the tests:"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm run test"})}),`
`,e.jsx(s.p,{children:"or"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"yarn test"})}),`
`,e.jsx(s.p,{children:"and the production build:"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"npm run build"})}),`
`,e.jsx(s.p,{children:"or"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"yarn build"}),"."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"})," In order to run the tests for the first time, you must have built the project with either ",e.jsx(s.code,{children:"start"})," or ",e.jsx(s.code,{children:"build"}),"."]}),`
`,e.jsx(s.p,{children:"That's it!"}),`
`,e.jsx(s.h2,{id:"understanding-the-project-structure",children:"Understanding the Project Structure"}),`
`,e.jsx(s.h3,{id:"packagejson",children:e.jsx(s.code,{children:"package.json"})}),`
`,e.jsxs(s.p,{children:[`The initialization script will add several packages as dependencies.
These three `,e.jsx(s.code,{children:"@ui5/"})," packages will serve as the foundation of your own package and Web Components."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Package"}),e.jsx(s.th,{children:"Type of Dependency"}),e.jsx(s.th,{children:"Description"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"@ui5/webcomponents-base"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"dependency"})}),e.jsx(s.td,{children:"Base classes and framework"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"@ui5/webcomponents-theming"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"dependency"})}),e.jsx(s.td,{children:"Base theming assets"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"@ui5/webcomponents-tools"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"devDependency"})}),e.jsx(s.td,{children:"Build tools and configuration assets"})]})]})]}),`
`,e.jsxs(s.p,{children:["The initialization script will create several NPM scripts for you in ",e.jsx(s.code,{children:"package.json"}),"."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"Task"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"clean"}),e.jsxs(s.td,{children:["Delete the ",e.jsx(s.code,{children:"dist/"})," directory with the build output."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"build"}),e.jsxs(s.td,{children:["Production build to the ",e.jsx(s.code,{children:"dist/"})," directory."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"lint"}),e.jsxs(s.td,{children:["Run a static code scan with ",e.jsx(s.code,{children:"eslint"}),"."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"start"}),e.jsx(s.td,{children:"Build the project for development, run the dev server and watch for changes."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"watch"}),e.jsx(s.td,{children:"Watch for changes only."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"serve"}),e.jsx(s.td,{children:"Run the dev server only."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"test"}),e.jsxs(s.td,{children:["Run the dev server and execute the specs from the ",e.jsx(s.code,{children:"test/specs/"})," directory."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"create-ui5-element"}),e.jsx(s.td,{children:"Create an empty Web Component with the given name."})]})]})]}),`
`,e.jsx(s.h3,{id:"files-in-the-main-directory",children:"Files in the main directory"}),`
`,e.jsx(s.p,{children:"The initialization script will create several files in your package's main directory."}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:".eslintignore"}),e.jsxs(s.td,{children:["Excludes the ",e.jsx(s.code,{children:"dist/"})," and ",e.jsx(s.code,{children:"test/"})," directories from static code scans."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"package-scripts.js"}),e.jsxs(s.td,{children:["An ",e.jsx(s.a,{href:"https://www.npmjs.com/package/nps",target:"_blank",rel:"nofollow noopener noreferrer",children:"nps"})," package scripts configuration file."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"bundle.js"}),e.jsx(s.td,{children:"Entry point for the bundle used for development and tests."})]})]})]}),`
`,e.jsxs(s.p,{children:["You'll likely only need to change ",e.jsx(s.code,{children:"bundle.js"})," to import your new components there."]}),`
`,e.jsxs(s.h3,{id:"the-config-directory",children:["The ",e.jsx(s.code,{children:"config/"})," directory"]}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"config/"}),` directory serves as a central place for most build and test tools configuration assets. Normally, you
don't need to change any files there.`]}),`
`,e.jsx(s.h4,{id:"custom-configuration",children:"Custom configuration"}),`
`,e.jsxs(s.p,{children:["The files in the ",e.jsx(s.code,{children:"config/"})," directory simply import UI5 Web Components default configuration for all tasks: ",e.jsx(s.code,{children:"rollup"}),", ",e.jsx(s.code,{children:"wdio"}),", ",e.jsx(s.code,{children:"eslint"}),", etc."]}),`
`,e.jsxs(s.p,{children:["If you need to customize any configuration, simply put your own content into the respective file in ",e.jsx(s.code,{children:"config/"}),"."]}),`
`,e.jsx(s.p,{children:"Examples:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Modifying ",e.jsx(s.code,{children:"eslint"})," settings."]}),`
`,e.jsxs(s.p,{children:["Open ",e.jsx(s.code,{children:"config/.eslintrc.js"}),". It should look like this:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`module.exports = require("@ui5/webcomponents-tools/components-package/eslint.js");
`})}),`
`,e.jsx(s.p,{children:`As you can see, this is just a proxy to UI5 Web Components default configuration.
Put your own content instead:`}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"root": true,
	"extends": "airbnb-base",
	.............
}
`})}),`
`]}),`
`,e.jsxs(s.li,{children:[`
`,e.jsxs(s.p,{children:["Modifying ",e.jsx(s.code,{children:"wdio"})," settings."]}),`
`,e.jsxs(s.p,{children:["Open ",e.jsx(s.code,{children:"config/wdio.conf.js"}),". It should look like this:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`module.exports = require("@ui5/webcomponents-tools/components-package/wdio.js");
`})}),`
`,e.jsx(s.p,{children:"Again, this is a proxy to UI5 Web Components default configuration."}),`
`,e.jsxs(s.p,{children:["You could just paste the content of ",e.jsx(s.code,{children:"@ui5/webcomponents-tools/components-package/wdio.js"})," here and modify at will."]}),`
`,e.jsx(s.p,{children:"However, let's not replace the whole file by hand this time, but just modify the exported configuration object."}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`const result = require("@ui5/webcomponents-tools/components-package/wdio.js");
result.config.capabilities[0]["goog:chromeOptions"].args = ['--disable-gpu']; // From: ['--disable-gpu', '--headless']
module.exports = result;
`})}),`
`,e.jsxs(s.p,{children:["In this example, what we did was simply replace one option in the configuration object to disable ",e.jsx(s.code,{children:"headless"}),` mode
so that we can use `,e.jsx(s.code,{children:"browser.debug()"})," in our ",e.jsx(s.code,{children:"*.spec.js"})," files. For more on testing, see ",e.jsx(s.a,{href:"./?path=/docs/docs-development-testing-ui5-web-components--docs",children:"Testing Web Components"}),"."]}),`
`]}),`
`]}),`
`,e.jsxs(s.h3,{id:"the-src-directory",children:["The ",e.jsx(s.code,{children:"src/"})," directory"]}),`
`,e.jsxs(s.p,{children:["This is where you'll do most of the development. Let's see the necessary files for a ",e.jsx(s.code,{children:"my-first-component"})," component."]}),`
`,e.jsx(s.h4,{id:"class-and-template-files",children:"Class and template files"}),`
`,e.jsx(s.p,{children:"The main files describing a Web Component are:"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/MyFirstComponent.js"})}),e.jsx(s.td,{children:"Web Component class"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/MyFirstComponent.hbs"})}),e.jsx(s.td,{children:"Handlebars template"})]})]})]}),`
`,e.jsxs(s.p,{children:[`In order to understand how a UI5 Web Component works and what lies behind these two files, make sure you check the
`,e.jsx(s.a,{href:"./?path=/docs/docs-development-custom-ui5-web-components--docs",children:"Developing Web Components"})," section of the documentation."]}),`
`,e.jsx(s.p,{children:`For the purposes of this tutorial, however, you don't need to understand their internals, as they are automatically generated by the
script and are in a working state already.`}),`
`,e.jsx(s.h4,{id:"theming-related-files",children:"Theming-related files"}),`
`,e.jsxs(s.p,{children:[`A single set of CSS rules will be used for all themes. The only difference between themes may be the values of CSS Variables.
Some CSS Vars, such as `,e.jsx(s.code,{children:"--sapBackgroundColor"})," and ",e.jsx(s.code,{children:"--sapTextColor"}),` are standard and automatically managed by the framework.
In addition, you can define your own CSS Vars and provide different values for them for the different themes. Set these CSS Vars in the
`,e.jsx(s.code,{children:"parameters-bundle.css"})," file for each theme. These files are the entry points for the styles build script."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/MyFirstComponent.css"})}),e.jsx(s.td,{children:"All CSS rules for the Web Component, same for all themes; will be inserted in the shadow root."})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_horizon/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_horizon"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_horizon_dark/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_horizon_dark"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_horizon_hcb/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_horizon_hcb"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_horizon_hcw/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_horizon_hcw"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_fiori_3/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_fiori_3"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_fiori_3_dark/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_fiori_3_dark"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_fiori_3_hcb/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_fiori_3_hcb"})," theme"]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/themes/sap_fiori_3_hcw/parameters-bundle.css"})}),e.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.jsx(s.code,{children:"sap_fiori_3_hcw"})," theme"]})]})]})]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"})," It's up to you whether to put the CSS Vars directly in the ",e.jsx(s.code,{children:"parameters-bundle.css"}),` files for the different themes or
to import them from separate `,e.jsx(s.code,{children:".css"})," files. You could have, for example, a ",e.jsx(s.code,{children:"MyFirstComponent-params.css"}),` file for each theme
and import it into the `,e.jsx(s.code,{children:"parameters-bundle.css"})," file: ",e.jsx(s.code,{children:'@import "MyFirstComponent-params.css";'}),"."]}),`
`,e.jsxs(s.p,{children:["Again, to know more about how these files work, you could have a look at the ",e.jsx(s.a,{href:"#css",children:"Developing Web Components"})," section of the documentation."]}),`
`,e.jsx(s.h4,{id:"i18n-files",children:"i18n files"}),`
`,e.jsxs(s.p,{children:["You can define translatable texts as key-value pairs, separated by ",e.jsx(s.code,{children:"="})," in the ",e.jsx(s.code,{children:"messagebundle.properties"}),` file. Then you can provide translations for as many languages
as needed.`]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/i18n/messagebundle.properties"})}),e.jsx(s.td,{children:"Source file for all translatable texts"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/i18n/messagebundle_de.properties"})}),e.jsx(s.td,{children:"Translations in German"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/i18n/messagebundle_en.properties"})}),e.jsx(s.td,{children:"Translations in English"})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:"etc."}),e.jsx(s.td,{children:"etc."})]})]})]}),`
`,e.jsxs(s.p,{children:["Let's have a look at the sample ",e.jsx(s.code,{children:"messagebundle.properties"})," file, generated by the script."]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`#please wait text for the sample component
PLEASE_WAIT=wait
`})}),`
`,e.jsxs(s.p,{children:["Here's where you define all i18n texts, optionally with comments for the translators (",e.jsx(s.code,{children:"# Comment"}),")."]}),`
`,e.jsxs(s.p,{children:["And now let's have a look at a sample file with translations, for example ",e.jsx(s.code,{children:"messagebundle_es.properties"}),":"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`PLEASE_WAIT=Espere
`})}),`
`,e.jsx(s.h4,{id:"assets-additional-themes-i18n-texts-etc",children:"Assets (additional themes, i18n texts, etc.)"}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsx(s.tbody,{children:e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/Assets.js"})}),e.jsx(s.td,{children:"Entry point for your package assets."})]})})]}),`
`,e.jsxs(s.p,{children:["This module imports all base assets (such as ",e.jsx(s.code,{children:"CLDR"}),` and the base theme parameters), but also your own
package assets (i18n and package-specific theme parameters). Users of your package will have to import this module in their production applications in order to get additional themes support and i18n support.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.strong,{children:"Note:"})," For easier development and testing, ",e.jsx(s.code,{children:"Assets.js"})," is also imported in the dev/test bundle ",e.jsx(s.code,{children:"bundle.esm.js"})," by the initialization script."]}),`
`,e.jsxs(s.h3,{id:"the-test-directory",children:["The ",e.jsx(s.code,{children:"test/"})," directory"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Purpose"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"test/pages/*"})}),e.jsxs(s.td,{children:["Simple ",e.jsx(s.code,{children:".html"})," pages used for development and tests."]})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"src/specs/*"})}),e.jsxs(s.td,{children:["Test specs, based on ",e.jsx(s.a,{href:"https://www.npmjs.com/package/wdio",target:"_blank",rel:"nofollow noopener noreferrer",children:"WDIO"}),". They use the test pages for setup."]})]})]})]}),`
`,e.jsxs(s.p,{children:["You can execute all specs by running ",e.jsx(s.code,{children:"yarn test"})," or ",e.jsx(s.code,{children:"npm run test"}),"."]}),`
`,e.jsxs(s.p,{children:["For more on testing, see our ",e.jsx(s.a,{href:"./?path=/docs/docs-development-testing-ui5-web-components--docs",children:"Testing Web Components"})," section."]}),`
`,e.jsx(s.h2,{id:"public-consumption-of-your-custom-ui5-web-components-package",children:"Public Consumption of Your Custom UI5 Web Components Package"}),`
`,e.jsxs(s.p,{children:["Once you've developed your package and published it to NPM, application developers can import from the ",e.jsx(s.code,{children:"dist/"}),` directory
of your package any of your Web Components, and optionally the `,e.jsx(s.code,{children:"Assets.js"})," module, if they want additional themes and i18n."]}),`
`,e.jsxs(s.p,{children:["For example, if your package is called ",e.jsx(s.code,{children:"my-ui5-webcomponents"}),", users will install it by:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{children:`npm i my-ui5-webcomponents --save
`})}),`
`,e.jsx(s.p,{children:"and then use it by:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import "my-ui5-webcomponents/Assets.js"; // optional
import "my-ui5-webcomponents/dist/MyFirstComponent.js"; // for my-first-component from this tutorial
import "my-ui5-webcomponents/dist/SomeOtherComponent.js";
import "my-ui5-webcomponents/dist/YetAnotherComponent.js";
`})}),`
`,e.jsx(c,{})]})}function y(n={}){const{wrapper:s}=Object.assign({},t(),n.components);return s?e.jsx(s,Object.assign({},n,{children:e.jsx(r,n)})):r(n)}export{y as default};
