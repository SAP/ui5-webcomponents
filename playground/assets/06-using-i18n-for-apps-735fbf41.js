import{j as e}from"./jsx-runtime-670e1be8.js";import{M as o}from"./index-6087c063.js";import{B as i,F as d}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(n){const s=Object.assign({h1:"h1",p:"p",em:"em",code:"code",a:"a",h2:"h2",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre",ul:"ul",li:"li"},r(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Docs/Advanced/Using i18n for apps"}),`
`,e.jsx(i,{}),`
`,e.jsx(s.h1,{id:"ui5-web-components-i18n-for-apps",children:"UI5 Web Components i18n for Apps"}),`
`,e.jsx(s.p,{children:e.jsxs(s.em,{children:["This section explains how to use the UI5 Web Components ",e.jsx(s.code,{children:"i18n"}),` functionality for the purpose of your app's translatable texts.
None of the code below implies or requires the usage of UI5 Web Components, and can be used completely stand-alone.`]})}),`
`,e.jsxs(s.p,{children:["The ",e.jsx(s.code,{children:"@ui5/webcomponents-base"})," package allows the usage of ",e.jsx(s.code,{children:"i18n"}),` functionality not just for UI5 Web Components,
but for apps as well.`]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.em,{children:"Note:"})," This section is dedicated to apps. For information on how to set up ",e.jsx(s.code,{children:"i18n"})," for your custom components, please see ",e.jsx(s.a,{href:"./?path=/docs/docs-development-custom-ui5-web-components--docs",children:"Developing Web Components"}),"."]}),`
`,e.jsx(s.h2,{id:"step-by-step-tutorial",children:"Step-by-Step Tutorial"}),`
`,e.jsxs(s.p,{children:["This tutorial will show you how to use the UI5 Web Components ",e.jsx(s.code,{children:"i18n"})," functionality for the purpose of your apps."]}),`
`,e.jsxs(s.h3,{id:"1-start-by-creating-some-i18n-resources-in-properties-format-in-a-directory-that-can-be-served-for-example",children:["1. Start by creating some ",e.jsx(s.code,{children:"i18n"})," resources in ",e.jsx(s.code,{children:".properties"})," format in a directory that can be served, for example:"]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Content"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_de.properties"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"PLEASE_WAIT=Bitte warten"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_fr.properties"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"PLEASE_WAIT=Patientez."})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_es.properties"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"PLEASE_WAIT=Espere"})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_en.properties"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:"PLEASE_WAIT=Please wait"})})]})]})]}),`
`,e.jsx(s.p,{children:"(This example demonstrates just one translatable text per file for simplicity. You can have any number of texts per file, each on a new line.)"}),`
`,e.jsxs(s.h3,{id:"2-import-the-following-i18n-related-modules-to-your-app",children:["2. Import the following ",e.jsx(s.code,{children:"i18n"}),"-related modules to your app:"]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.jsxs(s.p,{children:["The first one provides support for ",e.jsx(s.code,{children:".properties"}),` files, as used in the example, and the second one - the functions
that will allow you to take advantage of the `,e.jsx(s.code,{children:"i18n"})," functionality."]}),`
`,e.jsx(s.h3,{id:"3-register-a-loader-function-that-can-retrieve-and-process-the-actual-content-of-your-message-bundles",children:"3. Register a loader function that can retrieve and process the actual content of your message bundles:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`const supportedLocales = ["en", "fr", "de", "es"];
supportedLocales.forEach(localeToRegister => {
	registerI18nLoader("myApp", localeToRegister, async (localeId) => {
		const props = await (await fetch(\`./assets/messagebundle_\${localeId}.properties\`)).text();
		return parseProperties(props);
	});
});
`})}),`
`,e.jsxs(s.p,{children:["The first argument to ",e.jsx(s.code,{children:"registerI18nLoader"})," is an ID that will be used to reference this message bundle, the second is the locale this loader can load, and the third is a function that can load and process the content for the specified package/locale combination."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.em,{children:"Note:"})," For more assets, a loop is used to register a loader for each package/locale combination. The same loader function can be registered and its parameter can be used to distinguish which locale resource is requested."]}),`
`,e.jsxs(s.p,{children:[e.jsx(s.em,{children:"Note:"})," This step takes care of registering assets only, no data will be fetched at this point."]}),`
`,e.jsx(s.h3,{id:"4-get-and-use-the-bundle",children:"4. Get and use the bundle:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`const bundle = await getI18nBundle("myApp");
const pleaseWait = bundle.getText("PLEASE_WAIT");
console.log("Please wait in the current language is: ", pleaseWait);
`})}),`
`,e.jsxs(s.p,{children:["You can pass multiple additional values to ",e.jsx(s.code,{children:"getText"})," for texts with placeholders."]}),`
`,e.jsx(s.p,{children:"If your text looks like this"}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:"CAROUSEL_DOT_TEXT=Item {0} of {1} displayed"})}),`
`,e.jsxs(s.p,{children:["you can call ",e.jsx(s.code,{children:"getText"})]}),`
`,e.jsx(s.p,{children:e.jsx(s.code,{children:'bundle.getText("CAROUSEL_DOT_TEXT", 5, 20);'})}),`
`,e.jsx(s.p,{children:"which will finally result in"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.code,{children:"Item 5 of 20 displayed"}),"."]}),`
`,e.jsxs(s.h3,{id:"5-test-your-page-using-different-languages-eg-set-sap-ui-languagede-in-the-url-or-change-the-configuration",children:["5. Test your page using different languages, e.g. set ",e.jsx(s.code,{children:"?sap-ui-language=de"})," in the URL or change the configuration."]}),`
`,e.jsx(s.h2,{id:"summary",children:"Summary"}),`
`,e.jsx(s.p,{children:"The whole code would look like this:"}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:`import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";

const supportedLocales = ["en", "fr", "de", "es"];
supportedLocales.forEach(localeToRegister => {
	registerI18nLoader("myApp", localeToRegister, async (localeId) => {
		const props = await (await fetch(\`./assets/messagebundle_\${localeId}.properties\`)).text();
		return parseProperties(props);
	});
});

const bundle = await getI18nBundle("myApp");

const pleaseWait = bundle.getText("PLEASE_WAIT");
console.log("Please wait in the current language is: ", pleaseWait);
`})}),`
`,e.jsxs(s.p,{children:[`You register your assets for all supported languages, then you fetch the data for the currently active language,
get a reference to the bundle and call the `,e.jsx(s.code,{children:"getText"})," method to get texts for your app."]}),`
`,e.jsx(s.h2,{id:"tips-and-tricks",children:"Tips and Tricks"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:["You can skip the ",e.jsx(s.code,{children:".properties"})," format support import"]}),`
`]}),`
`,e.jsx(s.pre,{children:e.jsx(s.code,{className:"language-js",children:"return await (await fetch(`./assets/messagebundle_${localeId}.json`)).json();\n"})}),`
`,e.jsxs(s.p,{children:["and return the data directly in ",e.jsx(s.code,{children:".json"})," format if you want to load a little bit less code in the runtime."]}),`
`,e.jsxs(s.table,{children:[e.jsx(s.thead,{children:e.jsxs(s.tr,{children:[e.jsx(s.th,{children:"File"}),e.jsx(s.th,{children:"Content"})]})}),e.jsxs(s.tbody,{children:[e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_de.json"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'{"PLEASE_WAIT": "Bitte warten"}'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_fr.json"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'{"PLEASE_WAIT": "Patientez."}'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_es.json"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'{"PLEASE_WAIT": "Espere"}'})})]}),e.jsxs(s.tr,{children:[e.jsx(s.td,{children:e.jsx(s.code,{children:"assets/messagebundle_en.json"})}),e.jsx(s.td,{children:e.jsx(s.code,{children:'{"PLEASE_WAIT": "Please wait"}'})})]})]})]}),`
`,e.jsx(d,{})]})}function b(n={}){const{wrapper:s}=Object.assign({},r(),n.components);return s?e.jsx(s,Object.assign({},n,{children:e.jsx(t,n)})):t(n)}export{b as default};
