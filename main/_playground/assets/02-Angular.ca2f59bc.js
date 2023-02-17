import{j as e}from"./jsx-runtime.d0876325.js";import{M as a}from"./index.854754ad.js";import{u as s}from"./index.cae18a49.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";function j(o={}){const{wrapper:r}=Object.assign({},s(),o.components);return r?e.exports.jsx(r,Object.assign({},o,{children:e.exports.jsx(t,{})})):t();function t(){const n=Object.assign({h1:"h1",p:"p",h3:"h3",pre:"pre",code:"code",h2:"h2",a:"a",h4:"h4"},s(),o.components);return e.exports.jsxs(e.exports.Fragment,{children:[e.exports.jsx(a,{title:"Docs/Frameworks/Angular"}),`
`,e.exports.jsx(n.h1,{children:"Get Started with UI5 Web Components & Angular"}),`
`,e.exports.jsx(n.p,{children:"In this tutorial, you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new Angular applications and to already existing ones."}),`
`,e.exports.jsx(n.h3,{children:"Step 1. Install Angular CLI."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`npm install -g @angular/cli
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 2. Create a new Angular application."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`ng new ui5-web-components-application
cd ui5-web-components-application
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 3. Add UI5 Web Components."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`npm install @ui5/webcomponents --save
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 4. Allow the use of custom elements in Angular."}),`
`,e.exports.jsxs(n.p,{children:["Before using UI5 Web Components, you have to allow the use of custom elements in Angular. To do so, import CUSTOM_ELEMENTS_SCHEMA in ",e.exports.jsx(n.code,{children:"app.module.ts"})," :"]}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
`})}),`
`,e.exports.jsx(n.p,{children:"After importing it, add it to the schemas array:"}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 5. Import the components you are going to use."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`import "@ui5/webcomponents/dist/Button.js";
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 6. Use the imported elements in your application."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-html",children:`<ui5-button>Hello world!</ui5-button>
`})}),`
`,e.exports.jsx(n.h3,{children:"Step 7. Launch the application."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`ng serve -o
`})}),`
`,e.exports.jsx(n.h2,{children:"Additional Info"}),`
`,e.exports.jsx(n.h3,{children:"Two-Way Data Binding"}),`
`,e.exports.jsxs(n.p,{children:[`You can use two-way data binding with the following components: CheckBox, RadioButton, Input, DatePicker, Switch, TextArea.
In order to use it, you have to use a library called `,e.exports.jsx(n.a,{href:"https://github.com/hotforfeature/origami",children:"Origami"})," that provides advanced support for two-way data binding of custom elements."]}),`
`,e.exports.jsx(n.p,{children:"Example:"}),`
`,e.exports.jsx(n.h4,{children:"1. Install Origami."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-bash",children:`npm install @codebakery/origami
`})}),`
`,e.exports.jsx(n.h4,{children:"2. Import the OrigamiFormsModule from Origami."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrigamiFormsModule } from '@codebakery/origami/forms';
import { AppComponent } from './app.component';

@NgModule({
  imports: [BrowserModule, OrigamiFormsModule],
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
`})}),`
`,e.exports.jsx(n.h4,{children:"3. Use Origami in your template."}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-html",children:`<ui5-input [(ngModel)]="value" origami></ui5-input>
`})}),`
`,e.exports.jsx(n.h4,{children:"4. Make Angular boot after UI5 Web Components are defined."}),`
`,e.exports.jsxs(n.p,{children:["Add the ",e.exports.jsx(n.code,{children:"APP_INITIALIZER"})," provider to the module where you are using UI5 Web Components. In order to do so, import ",e.exports.jsx(n.code,{children:"APP_INITIALIZER"})," and add it to the providers array like this (in this example we will add it to the ",e.exports.jsx(n.code,{children:"app.module.ts"}),"):"]}),`
`,e.exports.jsx(n.pre,{children:e.exports.jsx(n.code,{className:"language-js",children:`import { ..., APP_INITIALIZER  } from '@angular/core';

import CheckBox from "@ui5/webcomponents/dist/CheckBox";

function onAppInit(): () => Promise<any> {
  return (): Promise<any> => {
    return CheckBox.define();
  };
}

@NgModule({
  declarations: [
        ...
  ],
  imports: [
        ...
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: onAppInit,
        multi: true
    },
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
`})})]})}}export{j as default};
//# sourceMappingURL=02-Angular.ca2f59bc.js.map
