import{j as e}from"./jsx-runtime.d0876325.js";import{M as i}from"./index.854754ad.js";import{u as n}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function g(t={}){const{wrapper:r}=Object.assign({},n(),t.components);return r?e.exports.jsx(r,Object.assign({},t,{children:e.exports.jsx(o,{})})):o();function o(){const s=Object.assign({h1:"h1",p:"p",em:"em",code:"code",a:"a",h2:"h2",h3:"h3",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",pre:"pre",ul:"ul",li:"li"},n(),t.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(i,{title:"Docs/Advanced/Using i  n for apps"}),`
`,e.exports.jsx(s.h1,{children:"UI5 Web Components i18n for Apps"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsxs(s.em,{children:["This section explains how to use the UI5 Web Components ",e.exports.jsx(s.code,{children:"i18n"}),` functionality for the purpose of your app's translatable texts.
None of the code below implies or requires the usage of UI5 Web Components, and can be used completely stand-alone.`]})}),`
`,e.exports.jsxs(s.p,{children:["The ",e.exports.jsx(s.code,{children:"@ui5/webcomponents-base"})," package allows the usage of ",e.exports.jsx(s.code,{children:"i18n"}),` functionality not just for UI5 Web Components,
but for apps as well.`]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," This section is dedicated to apps. For information on how to set up ",e.exports.jsx(s.code,{children:"i18n"})," for your custom components, please see ",e.exports.jsx(s.a,{href:"./dev/Developing%20Web%20Components.md",children:"Developing Web Components"}),"."]}),`
`,e.exports.jsx(s.h2,{children:"Step-by-Step Tutorial"}),`
`,e.exports.jsxs(s.p,{children:["This tutorial will show you how to use the UI5 Web Components ",e.exports.jsx(s.code,{children:"i18n"})," functionality for the purpose of your apps."]}),`
`,e.exports.jsxs(s.h3,{children:["1. Start by creating some ",e.exports.jsx(s.code,{children:"i18n"})," resources in ",e.exports.jsx(s.code,{children:".properties"})," format in a directory that can be served, for example:"]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Content"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_de.properties"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"PLEASE_WAIT=Bitte warten"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_fr.properties"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"PLEASE_WAIT=Patientez."})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_es.properties"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"PLEASE_WAIT=Espere"})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_en.properties"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"PLEASE_WAIT=Please wait"})})]})]})]}),`
`,e.exports.jsx(s.p,{children:"(This example demonstrates just one translatable text per file for simplicity. You can have any number of texts per file, each on a new line.)"}),`
`,e.exports.jsxs(s.h3,{children:["2. Import the following ",e.exports.jsx(s.code,{children:"i18n"}),"-related modules to your app:"]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
import { registerI18nLoader, getI18nBundle } from "@ui5/webcomponents-base/dist/i18nBundle.js";
`})}),`
`,e.exports.jsxs(s.p,{children:["The first one provides support for ",e.exports.jsx(s.code,{children:".properties"}),` files, as used in the example, and the second one - the functions
that will allow you to take advantage of the `,e.exports.jsx(s.code,{children:"i18n"})," functionality."]}),`
`,e.exports.jsx(s.h3,{children:"3. Register a loader function that can retrieve and process the actual content of your message bundles:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`const supportedLocales = ["en", "fr", "de", "es"];
supportedLocales.forEach(localeToRegister => {
	registerI18nLoader("myApp", localeToRegister, async (localeId) => {
		const props = await (await fetch(\`./assets/messagebundle_\${localeId}.properties\`)).text();
		return parseProperties(props);
	});
});
`})}),`
`,e.exports.jsxs(s.p,{children:["The first argument to ",e.exports.jsx(s.code,{children:"registerI18nLoader"})," is an ID that will be used to reference this message bundle, the second is the locale this loader can load, and the third is a function that can load and process the content for the specified package/locale combination."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," For more assets, a loop is used to register a loader for each package/locale combination. The same loader function can be registered and its parameter can be used to distinguish which locale resource is requested."]}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.em,{children:"Note:"})," This step takes care of registering assets only, no data will be fetched at this point."]}),`
`,e.exports.jsx(s.h3,{children:"4. Get and use the bundle:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`const bundle = await getI18nBundle("myApp");
const pleaseWait = bundle.getText("PLEASE_WAIT");
console.log("Please wait in the current language is: ", pleaseWait);
`})}),`
`,e.exports.jsxs(s.p,{children:["You can pass multiple additional values to ",e.exports.jsx(s.code,{children:"getText"})," for texts with placeholders."]}),`
`,e.exports.jsx(s.p,{children:"If your text looks like this"}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:"CAROUSEL_DOT_TEXT=Item {0} of {1} displayed"})}),`
`,e.exports.jsxs(s.p,{children:["you can call ",e.exports.jsx(s.code,{children:"getText"})]}),`
`,e.exports.jsx(s.p,{children:e.exports.jsx(s.code,{children:'bundle.getText("CAROUSEL_DOT_TEXT", 5, 20);'})}),`
`,e.exports.jsx(s.p,{children:"which will finally result in"}),`
`,e.exports.jsxs(s.p,{children:[e.exports.jsx(s.code,{children:"Item 5 of 20 displayed"}),"."]}),`
`,e.exports.jsxs(s.h3,{children:["5. Test your page using different languages, e.g. set ",e.exports.jsx(s.code,{children:"?sap-ui-language=de"})," in the URL or change the configuration."]}),`
`,e.exports.jsx(s.h2,{children:"Summary"}),`
`,e.exports.jsx(s.p,{children:"The whole code would look like this:"}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:`import parseProperties from "@ui5/webcomponents-base/dist/PropertiesFileFormat.js";
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
`,e.exports.jsxs(s.p,{children:[`You register your assets for all supported languages, then you fetch the data for the currently active language,
get a reference to the bundle and call the `,e.exports.jsx(s.code,{children:"getText"})," method to get texts for your app."]}),`
`,e.exports.jsx(s.h2,{children:"Tips and Tricks"}),`
`,e.exports.jsxs(s.ul,{children:[`
`,e.exports.jsxs(s.li,{children:["You can skip the ",e.exports.jsx(s.code,{children:".properties"})," format support import"]}),`
`]}),`
`,e.exports.jsx(s.pre,{children:e.exports.jsx(s.code,{className:"language-js",children:"return await (await fetch(`./assets/messagebundle_${localeId}.json`)).json();\n"})}),`
`,e.exports.jsxs(s.p,{children:["and return the data directly in ",e.exports.jsx(s.code,{children:".json"})," format if you want to load a little bit less code in the runtime."]}),`
`,e.exports.jsxs(s.table,{children:[e.exports.jsx(s.thead,{children:e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.th,{children:"File"}),e.exports.jsx(s.th,{children:"Content"})]})}),e.exports.jsxs(s.tbody,{children:[e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_de.json"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:'{"PLEASE_WAIT": "Bitte warten"}'})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_fr.json"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:'{"PLEASE_WAIT": "Patientez."}'})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_es.json"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:'{"PLEASE_WAIT": "Espere"}'})})]}),e.exports.jsxs(s.tr,{children:[e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:"assets/messagebundle_en.json"})}),e.exports.jsx(s.td,{children:e.exports.jsx(s.code,{children:'{"PLEASE_WAIT": "Please wait"}'})})]})]})]}),`
`,e.exports.jsxs(s.p,{children:["Next: ",e.exports.jsx(s.a,{href:"../accessibility",children:"Accessibility"})]})]})}}export{g as default};
//# sourceMappingURL=06-using-i18n-for-apps.e40ccec9.js.map
