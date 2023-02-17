import{j as e}from"./jsx-runtime.7897cedd.js";import{M as i}from"./index.8cb7a9d9.js";import{u as n}from"./index.ce731c38.js";import"./iframe.d5a3589f.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function f(r={}){const{wrapper:t}=Object.assign({},n(),r.components);return t?e.exports.jsx(t,Object.assign({},r,{children:e.exports.jsx(o,{})})):o();function o(){const s=Object.assign({h1:"h1",p:"p",ul:"ul",li:"li",code:"code",strong:"strong",h2:"h2",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",a:"a",h4:"h4",pre:"pre"},n(),r.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Development/Custom UI  Web Components Packages"}),`
`,e.exports.jsx(s.h1,{children:"Creating a Custom UI5 Web Components Package"}),`
`,e.exports.jsx(s.p,{children:"This tutorial explains how to:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:"Create an NPM package for your own UI5 Web Components."}),`
`,e.exports.jsxs(s.li,{children:["Use UI5 Web Components' standard build tools: ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-tools"}),"."]}),`
`,e.exports.jsxs(s.li,{children:["Gain all ",e.exports.jsx(s.code,{children:"@ui5/webcomponents"})," capabilities such as HBS template support, i18n, theming, test setup, etc."]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," Whether you use ",e.exports.jsx(s.code,{children:"npm"})," or ",e.exports.jsx(s.code,{children:"yarn"})," is a matter of preference."]}),`
`,e.exports.jsx(s.h2,{children:"Step 1. Create an NPM package."}),`
`,e.exports.jsx(s.h3,{children:"Run the init command."}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," The following command will ",e.exports.jsx(s.strong,{children:"create a new directory"}),` and initialize your package there.
Make sure you haven't created a directory yourself.`]}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[`
`,e.exports.jsxs(s.p,{children:["With ",e.exports.jsx(s.strong,{children:"npm"}),":"]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm init @ui5/webcomponents-package"})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm init @ui5/webcomponents-package <NEW-PACKAGE-NAME>"})}),`
`]}),`
`,e.exports.jsxs(s.li,{children:[`
`,e.exports.jsxs(s.p,{children:["With ",e.exports.jsx(s.strong,{children:"yarn"}),":"]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"yarn create @ui5/webcomponents-package"})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"yarn create @ui5/webcomponents-package <NEW-PACKAGE-NAME>"})}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.p,{children:["where ",e.exports.jsx(s.code,{children:"<NEW-PACKAGE-NAME>"})," is the name of your new package (and the name of the directory to be created), for example:"]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm init @ui5/webcomponents-package my-components"})}),`
`,e.exports.jsxs(s.p,{children:["will create a ",e.exports.jsx(s.code,{children:"my-components"})," directory and initialize the package there."]}),`
`,e.exports.jsx(s.h3,{children:"Follow the prompts."}),`
`,e.exports.jsx(s.p,{children:"The initialization script will ask you to choose:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.strong,{children:"name"})," of your package (if you did not already pass a name when running the command above);"]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.strong,{children:"port"})," for your dev server (",e.exports.jsx(s.code,{children:"8080"})," by default - just press Enter to select this);"]}),`
`,e.exports.jsxs(s.li,{children:["The ",e.exports.jsx(s.strong,{children:"tag"})," of the sample web component that will be created (",e.exports.jsx(s.code,{children:"my-first-component"})," by default - just press Enter to select this)."]}),`
`]}),`
`,e.exports.jsx(s.h3,{children:"Your package is ready!"}),`
`,e.exports.jsx(s.p,{children:"Just follow the instructions:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsx(s.li,{children:e.exports.jsx(s.code,{children:"cd <NEW-PACKAGE-NAME>"})}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"npm i"})," (or ",e.exports.jsx(s.code,{children:"yarn"})," if you prefer)"]}),`
`,e.exports.jsxs(s.li,{children:[e.exports.jsx(s.code,{children:"npm start"})," (or ",e.exports.jsx(s.code,{children:"yarn start"})," if you prefer)"]}),`
`]}),`
`,e.exports.jsx(s.h2,{children:"Step 2. Run the dev server and test the build."}),`
`,e.exports.jsx(s.p,{children:"To run the dev server, as instructed above:"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm run start"})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"yarn start"})}),`
`,e.exports.jsx(s.p,{children:"and once the project is built for the first time, the browser will automatically open the dev server URL."}),`
`,e.exports.jsx(s.p,{children:"You can also run the tests:"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm run test"})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"yarn test"})}),`
`,e.exports.jsx(s.p,{children:"and the production build:"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"npm run build"})}),`
`,e.exports.jsx(s.p,{children:"or"}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.code,{children:"yarn build"}),"."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," In order to run the tests for the first time, you must have built the project with either ",e.exports.jsx(s.code,{children:"start"})," or ",e.exports.jsx(s.code,{children:"build"}),"."]}),`
`,e.exports.jsx(s.p,{children:"That's it!"}),`
`,e.exports.jsx(s.h2,{children:"Understanding the Project Structure"}),`
`,e.exports.jsx(s.h3,{children:e.exports.jsx(s.code,{children:"package.json"})}),`
`,e.exports.jsxs(s.p,{children:[`The initialization script will add several packages as dependencies.
These three `,e.exports.jsx(s.code,{children:"@ui5/"})," packages will serve as the foundation of your own package and Web Components."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Package"}),e.exports.jsx(s.th,{children:"Type of Dependency"}),e.exports.jsx(s.th,{children:"Description"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-base"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"dependency"})}),e.exports.jsx(s.td,{children:"Base classes and framework"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-theming"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"dependency"})}),e.exports.jsx(s.td,{children:"Base theming assets"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"@ui5/webcomponents-tools"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"devDependency"})}),e.exports.jsx(s.td,{children:"Build tools and configuration assets"})]})]})]}),`
`,e.exports.jsxs(s.p,{children:["The initialization script will create several NPM scripts for you in ",e.exports.jsx(s.code,{children:"package.json"}),"."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"Task"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"clean"}),e.exports.jsxs(s.td,{children:["Delete the ",e.exports.jsx(s.code,{children:"dist/"})," directory with the build output."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"build"}),e.exports.jsxs(s.td,{children:["Production build to the ",e.exports.jsx(s.code,{children:"dist/"})," directory."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"lint"}),e.exports.jsxs(s.td,{children:["Run a static code scan with ",e.exports.jsx(s.code,{children:"eslint"}),"."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"start"}),e.exports.jsx(s.td,{children:"Build the project for development, run the dev server and watch for changes."})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"watch"}),e.exports.jsx(s.td,{children:"Watch for changes only."})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"serve"}),e.exports.jsx(s.td,{children:"Run the dev server only."})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"test"}),e.exports.jsxs(s.td,{children:["Run the dev server and execute the specs from the ",e.exports.jsx(s.code,{children:"test/specs/"})," directory."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"create-ui5-element"}),e.exports.jsx(s.td,{children:"Create an empty Web Component with the given name."})]})]})]}),`
`,e.exports.jsx(s.h3,{children:"Files in the main directory"}),`
`,e.exports.jsx(s.p,{children:"The initialization script will create several files in your package's main directory."}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:".eslintignore"}),e.exports.jsxs(s.td,{children:["Excludes the ",e.exports.jsx(s.code,{children:"dist/"})," and ",e.exports.jsx(s.code,{children:"test/"})," directories from static code scans."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"package-scripts.js"}),e.exports.jsxs(s.td,{children:["An ",e.exports.jsx(s.a,{href:"https://www.npmjs.com/package/nps",children:"nps"})," package scripts configuration file."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"bundle.js"}),e.exports.jsx(s.td,{children:"Entry point for the bundle used for development and tests."})]})]})]}),`
`,e.exports.jsxs(s.p,{children:["You'll likely only need to change ",e.exports.jsx(s.code,{children:"bundle.js"})," to import your new components there."]}),`
`,e.exports.jsxs(s.h3,{children:["The ",e.exports.jsx(s.code,{children:"config/"})," directory"]}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"config/"}),` directory serves as a central place for most build and test tools configuration assets. Normally, you
don't need to change any files there.`]}),`
`,e.exports.jsx(s.h4,{children:"Custom configuration"}),`
`,e.exports.jsxs(s.p,{children:["The files in the ",e.exports.jsx(s.code,{children:"config/"})," directory simply import UI5 Web Components default configuration for all tasks: ",e.exports.jsx(s.code,{children:"rollup"}),", ",e.exports.jsx(s.code,{children:"wdio"}),", ",e.exports.jsx(s.code,{children:"eslint"}),", etc."]}),`
`,e.exports.jsxs(s.p,{children:["If you need to customize any configuration, simply put your own content into the respective file in ",e.exports.jsx(s.code,{children:"config/"}),"."]}),`
`,e.exports.jsx(s.p,{children:"Examples:"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:[`
`,e.exports.jsxs(s.p,{children:["Modifying ",e.exports.jsx(s.code,{children:"eslint"})," settings."]}),`
`,e.exports.jsxs(s.p,{children:["Open ",e.exports.jsx(s.code,{children:"config/.eslintrc.js"}),". It should look like this:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`module.exports = require("@ui5/webcomponents-tools/components-package/eslint.js");
`})}),`
`,e.exports.jsx(s.p,{children:`As you can see, this is just a proxy to UI5 Web Components default configuration.
Put your own content instead:`}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`module.exports = {
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
`,e.exports.jsxs(s.li,{children:[`
`,e.exports.jsxs(s.p,{children:["Modifying ",e.exports.jsx(s.code,{children:"wdio"})," settings."]}),`
`,e.exports.jsxs(s.p,{children:["Open ",e.exports.jsx(s.code,{children:"config/wdio.conf.js"}),". It should look like this:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`module.exports = require("@ui5/webcomponents-tools/components-package/wdio.js");
`})}),`
`,e.exports.jsx(s.p,{children:"Again, this is a proxy to UI5 Web Components default configuration."}),`
`,e.exports.jsxs(s.p,{children:["You could just paste the content of ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-tools/components-package/wdio.js"})," here and modify at will."]}),`
`,e.exports.jsx(s.p,{children:"However, let's not replace the whole file by hand this time, but just modify the exported configuration object."}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`const result = require("@ui5/webcomponents-tools/components-package/wdio.js");
result.config.capabilities[0]["goog:chromeOptions"].args = ['--disable-gpu']; // From: ['--disable-gpu', '--headless']
module.exports = result;
`})}),`
`,e.exports.jsxs(s.p,{children:["In this example, what we did was simply replace one option in the configuration object to disable ",e.exports.jsx(s.code,{children:"headless"}),` mode
so that we can use `,e.exports.jsx(s.code,{children:"browser.debug()"})," in our ",e.exports.jsx(s.code,{children:"*.spec.js"})," files. For more on testing, see ",e.exports.jsx(s.a,{href:"../testing-ui5-web-components",children:"Testing Web Components"}),"."]}),`
`]}),`
`]}),`
`,e.exports.jsxs(s.h3,{children:["The ",e.exports.jsx(s.code,{children:"src/"})," directory"]}),`
`,e.exports.jsxs(s.p,{children:["This is where you'll do most of the development. Let's see the necessary files for a ",e.exports.jsx(s.code,{children:"my-first-component"})," component."]}),`
`,e.exports.jsx(s.h4,{children:"Class and template files"}),`
`,e.exports.jsx(s.p,{children:"The main files describing a Web Component are:"}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/MyFirstComponent.js"})}),e.exports.jsx(s.td,{children:"Web Component class"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/MyFirstComponent.hbs"})}),e.exports.jsx(s.td,{children:"Handlebars template"})]})]})]}),`
`,e.exports.jsxs(s.p,{children:[`In order to understand how a UI5 Web Component works and what lies behind these two files, make sure you check the
`,e.exports.jsx(s.a,{href:"../custom-ui5-web-components",children:"Developing Web Components"})," section of the documentation."]}),`
`,e.exports.jsx(s.p,{children:`For the purposes of this tutorial, however, you don't need to understand their internals, as they are automatically generated by the
script and are in a working state already.`}),`
`,e.exports.jsx(s.h4,{children:"Theming-related files"}),`
`,e.exports.jsxs(s.p,{children:[`A single set of CSS rules will be used for all themes. The only difference between themes may be the values of CSS Variables.
Some CSS Vars, such as `,e.exports.jsx(s.code,{children:"--sapBackgroundColor"})," and ",e.exports.jsx(s.code,{children:"--sapTextColor"}),` are standard and automatically managed by the framework.
In addition, you can define your own CSS Vars and provide different values for them for the different themes. Set these CSS Vars in the
`,e.exports.jsx(s.code,{children:"parameters-bundle.css"})," file for each theme. These files are the entry points for the styles build script."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/MyFirstComponent.css"})}),e.exports.jsx(s.td,{children:"All CSS rules for the Web Component, same for all themes; will be inserted in the shadow root."})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_belize/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_belize"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_belize_hcb/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_belize_hcb"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_belize_hcw/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_belize_hcw"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_fiori_3/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_fiori_3"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_fiori_3_dark/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_fiori_3_dark"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_fiori_3_hcb/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcb"})," theme"]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/themes/sap_fiori_3_hcw/parameters-bundle.css"})}),e.exports.jsxs(s.td,{children:["Values for the component-specific CSS Vars for the ",e.exports.jsx(s.code,{children:"sap_fiori_3_hcw"})," theme"]})]})]})]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," It's up to you whether to put the CSS Vars directly in the ",e.exports.jsx(s.code,{children:"parameters-bundle.css"}),` files for the different themes or
to import them from separate `,e.exports.jsx(s.code,{children:".css"})," files. You could have, for example, a ",e.exports.jsx(s.code,{children:"MyFirstComponent-params.css"}),` file for each theme
and import it into the `,e.exports.jsx(s.code,{children:"parameters-bundle.css"})," file: ",e.exports.jsx(s.code,{children:'@import "MyFirstComponent-params.css";'}),"."]}),`
`,e.exports.jsxs(s.p,{children:["Again, to know more about how these files work, you could have a look at the ",e.exports.jsx(s.a,{href:"../custom-ui5-web-components#css",children:"Developing Web Components"})," section of the documentation."]}),`
`,e.exports.jsx(s.h4,{children:"i18n files"}),`
`,e.exports.jsxs(s.p,{children:["You can define translatable texts as key-value pairs, separated by ",e.exports.jsx(s.code,{children:"="})," in the ",e.exports.jsx(s.code,{children:"messagebundle.properties"}),` file. Then you can provide translations for as many languages
as needed.`]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/i18n/messagebundle.properties"})}),e.exports.jsx(s.td,{children:"Source file for all translatable texts"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/i18n/messagebundle_de.properties"})}),e.exports.jsx(s.td,{children:"Translations in German"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/i18n/messagebundle_en.properties"})}),e.exports.jsx(s.td,{children:"Translations in English"})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:"etc."}),e.exports.jsx(s.td,{children:"etc."})]})]})]}),`
`,e.exports.jsxs(s.p,{children:["Let's have a look at the sample ",e.exports.jsx(s.code,{children:"messagebundle.properties"})," file, generated by the script."]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`#please wait text for the sample component
PLEASE_WAIT=wait
`})}),`
`,e.exports.jsxs(s.p,{children:["Here's where you define all i18n texts, optionally with comments for the translators (",e.exports.jsx(s.code,{children:"# Comment"}),")."]}),`
`,e.exports.jsxs(s.p,{children:["And now let's have a look at a sample file with translations, for example ",e.exports.jsx(s.code,{children:"messagebundle_es.properties"}),":"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`PLEASE_WAIT=Espere
`})}),`
`,e.exports.jsx(s.h4,{children:"Assets (additional themes, i18n texts, etc.)"}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsx(s.tbody,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/Assets.js"})}),e.exports.jsx(s.td,{children:"Entry point for your package assets."})]})})]}),`
`,e.exports.jsxs(s.p,{children:["This module imports all base assets (such as ",e.exports.jsx(s.code,{children:"CLDR"}),` and the base theme parameters), but also your own
package assets (i18n and package-specific theme parameters). Users of your package will have to import this module in their production applications in order to get additional themes support and i18n support.`]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.strong,{children:"Note:"})," For easier development and testing, ",e.exports.jsx(s.code,{children:"Assets.js"})," is also imported in the dev/test bundle ",e.exports.jsx(s.code,{children:"bundle.esm.js"})," by the initialization script."]}),`
`,e.exports.jsxs(s.h3,{children:["The ",e.exports.jsx(s.code,{children:"test/"})," directory"]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Purpose"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"test/pages/*"})}),e.exports.jsxs(s.td,{children:["Simple ",e.exports.jsx(s.code,{children:".html"})," pages used for development and tests."]})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"src/specs/*"})}),e.exports.jsxs(s.td,{children:["Test specs, based on ",e.exports.jsx(s.a,{href:"https://www.npmjs.com/package/wdio",children:"WDIO"}),". They use the test pages for setup."]})]})]})]}),`
`,e.exports.jsxs(s.p,{children:["You can execute all specs by running ",e.exports.jsx(s.code,{children:"yarn test"})," or ",e.exports.jsx(s.code,{children:"npm run test"}),"."]}),`
`,e.exports.jsxs(s.p,{children:["For more on testing, see our ",e.exports.jsx(s.a,{href:"../testing-ui5-web-components",children:"Testing Web Components"})," section."]}),`
`,e.exports.jsx(s.h2,{children:"Public Consumption of Your Custom UI5 Web Components Package"}),`
`,e.exports.jsxs(s.p,{children:["Once you've developed your package and published it to NPM, application developers can import from the ",e.exports.jsx(s.code,{children:"dist/"}),` directory
of your package any of your Web Components, and optionally the `,e.exports.jsx(s.code,{children:"Assets.js"})," module, if they want additional themes and i18n."]}),`
`,e.exports.jsxs(s.p,{children:["For example, if your package is called ",e.exports.jsx(s.code,{children:"my-ui5-webcomponents"}),", users will install it by:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{children:`npm i my-ui5-webcomponents --save
`})}),`
`,e.exports.jsx(s.p,{children:"and then use it by:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import "my-ui5-webcomponents/Assets.js"; // optional
import "my-ui5-webcomponents/dist/MyFirstComponent.js"; // for my-first-component from this tutorial
import "my-ui5-webcomponents/dist/SomeOtherComponent.js";
import "my-ui5-webcomponents/dist/YetAnotherComponent.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["Next: ",e.exports.jsx(s.a,{href:"./02-custom-UI5-Web-Components.md",children:"Developing Custom UI5 Web Components"})]})]})}}export{f as default};
//# sourceMappingURL=01-custom-UI5-Web-Components-Packages.17ecada7.js.map
