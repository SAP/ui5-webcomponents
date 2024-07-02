import{j as n}from"./jsx-runtime-670e1be8.js";import{M as s}from"./index-6087c063.js";import{B as a,F as l}from"./Banner-a1178143.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function t(o){const e=Object.assign({h1:"h1",p:"p",code:"code",strong:"strong",a:"a",h2:"h2",h3:"h3",pre:"pre",ul:"ul",li:"li"},r(),o.components);return n.jsxs(n.Fragment,{children:[n.jsx(s,{title:"Docs/Frameworks/Angular"}),`
`,n.jsx(a,{}),`
`,n.jsx(e.h1,{id:"get-started-with-ui5-web-components--angular",children:"Get Started with UI5 Web Components & Angular"}),`
`,n.jsxs(e.p,{children:["In this tutorial, you will learn how to use ",n.jsx(e.code,{children:"UI5 Web Components"})," in an Angular application. In the second part, we will introduce ",n.jsx(e.code,{children:"UI5 Web Components for Angular"})," - wrapper library for UI5 Web Components, improving their integration with Angular."]}),`
`,n.jsxs(e.p,{children:[n.jsx(e.strong,{children:"Note:"})," To get the best development experience, we recommend using the ",n.jsx(e.a,{href:"https://ui5-webcomponents-ngx.netlify.app",target:"_blank",rel:"nofollow noopener noreferrer",children:"UI5 Web Components for Angular"}),". The library removes the need for ",n.jsx(e.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," and ",n.jsx(e.code,{children:"NO_ERRORS_SCHEMA"})," schemas, and supports all Angular-specific features out-of-the-box."]}),`
`,n.jsx(e.h2,{id:"ui5-web-components",children:"UI5 Web Components"}),`
`,n.jsx(e.h3,{id:"step-1-install-angular-cli",children:"Step 1. Install Angular CLI."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install -g @angular/cli
`})}),`
`,n.jsx(e.h3,{id:"step-2-create-a-new-angular-application",children:"Step 2. Create a new Angular application."}),`
`,n.jsx(e.p,{children:"Use the standard path to setup a new Angular app."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`ng new ui5-web-components-application
cd ui5-web-components-application
`})}),`
`,n.jsx(e.h3,{id:"step-3-install-ui5-web-components",children:"Step 3. Install UI5 Web Components."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @ui5/webcomponents
`})}),`
`,n.jsx(e.h3,{id:"step-4-allow-custom-elements-in-angular",children:"Step 4. Allow Custom Elements in Angular."}),`
`,n.jsxs(e.p,{children:["Before using UI5 Web Components, you have to allow the use of custom elements via the ",n.jsx(e.code,{children:"CUSTOM_ELEMENTS_SCHEMA"}),". This allows an NgModule to contain Non-Angular elements named with dash."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Import ",n.jsx(e.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," in ",n.jsx(e.code,{children:"app.module.ts"}),":"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add ",n.jsx(e.code,{children:"CUSTOM_ELEMENTS_SCHEMA"})," to the schemas array:"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
`})}),`
`,n.jsx(e.h3,{id:"step-5-import-ui5-web-components",children:"Step 5. Import UI5 Web Components."}),`
`,n.jsx(e.p,{children:"Import the components you are going to use."}),`
`,n.jsxs(e.p,{children:["Let's import the Button in ",n.jsx(e.code,{children:"app.component.ts"}),":"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import { Component } from '@angular/core';

import '@ui5/webcomponents/dist/Button.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
}
`})}),`
`,n.jsx(e.h3,{id:"step-6-use-ui5-web-components",children:"Step 6. Use UI5 Web Components."}),`
`,n.jsx(e.p,{children:"Use the imported components in your application by their tag names - as any other HTML element."}),`
`,n.jsxs(e.p,{children:["Let's add the button into the ",n.jsx(e.code,{children:"app.component.html"})," template:"]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<ui5-button>Hello world!</ui5-button>
`})}),`
`,n.jsx(e.h3,{id:"step-7-launch-the-application",children:"Step 7. Launch the application."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`ng serve -o
`})}),`
`,n.jsx(e.p,{children:"After the development server starts, the UI5 Web Components Button will be rendered in the test page. Now that you've seen how easy it is to use the UI5 Web Components, you can continue with adding more components in the same manner."}),`
`,n.jsx(e.h2,{id:"ui5-web-components-for-angular",children:"UI5 Web Components For Angular"}),`
`,n.jsx(e.p,{children:"UI5 Web Components for Angular is a wrapper library for UI5 Web Components. This means that for every UI5 Web Component, there is a corresponding Angular wrapper component available."}),`
`,n.jsx(e.p,{children:n.jsx(e.strong,{children:"For Example:"})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:"The native Button web component"}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import '@ui5/webcomponents/dist/Button.js';
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsx(e.li,{children:'The "ngx" Button wrapper component'}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
`})}),`
`,n.jsxs(e.p,{children:["These wrappers supports all Angular-specific features out-of-the-box, f.e. two-way data binding with ",n.jsx(e.code,{children:"NgModel"}),", as they are native to Angular."]}),`
`,n.jsxs(e.h3,{id:"angular-form-with-ngmodel",children:["Angular Form with ",n.jsx(e.code,{children:"NgModel"})]}),`
`,n.jsxs(e.p,{children:["The following section demonstrates how to build template-driven Angular form (following the oficial ",n.jsx(e.a,{href:"https://angular.io/guide/forms",target:"_blank",rel:"nofollow noopener noreferrer",children:"Angular documentation"}),") with UI5 Web Components For Angular. It illustrates the usage of two-way data binding to update the data model in the component as changes are made in the template and vice versa."]}),`
`,n.jsx(e.h3,{id:"step-1-setup-angular-project",children:"Step 1. Setup Angular project"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install -g @angular/cli
ng new ui5-web-components-ngx-application
cd ui5-web-components-ngx-application
`})}),`
`,n.jsx(e.h3,{id:"step-2-install-ui5-web-components-for-angular",children:"Step 2. Install UI5 Web Components for Angular."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install @ui5/webcomponents-ngx
`})}),`
`,n.jsx(e.h3,{id:"step-3-build-angular-form",children:"Step 3. Build Angular form."}),`
`,n.jsxs(e.p,{children:["To build an Angular Form, we will include the required infrastructure such as the ",n.jsx(e.code,{children:"FormsModule"}),", track input validity and status using ",n.jsx(e.code,{children:"ngModel"})," and make use of some form components from ",n.jsx(e.code,{children:"@ui5/webcomponents-ngx"}),"."]}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Import ",n.jsx(e.code,{children:"FormsModule"})," in ",n.jsx(e.code,{children:"app.module.ts"})," and add it to the imports array."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
`})}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Import ",n.jsx(e.code,{children:"Label"}),", ",n.jsx(e.code,{children:"Input"})," and ",n.jsx(e.code,{children:"Button"})," components from ",n.jsx(e.code,{children:"@ui5/webcomponents-ngx"})," in ",n.jsx(e.code,{children:"app.module.ts"})," and add them to the imports array."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// UI5 Web Components For Angular
import { LabelComponent } from '@ui5/webcomponents-ngx/main/label';
import { ButtonComponent } from '@ui5/webcomponents-ngx/main/button';
import { InputComponent } from '@ui5/webcomponents-ngx/main/input';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LabelComponent,
    InputComponent,
    ButtonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
`})}),`
`,n.jsx(e.h3,{id:"step-4-define-a-data-model",children:"Step 4. Define a Data Model."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add the following object, that will serve as a data model, to the ",n.jsx(e.code,{children:"AppComponent"}),":"]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`// app.component.ts
import { Component } from '@angular/core';

export class AppComponent {
  model = {
    firstName: "",
    lastName: ""
  };
}
`})}),`
`,n.jsx(e.h3,{id:"step-5-create-the-form-ui",children:"Step 5. Create the Form UI."}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Add the following inline template to the ",n.jsx(e.code,{children:"AppComponent"}),"."]}),`
`,n.jsxs(e.li,{children:["Bind form components to data properties using the ",n.jsx(e.code,{children:"ngModel"})," directive and two-way data-binding syntax."]}),`
`,n.jsxs(e.li,{children:["Name form controls (e.g. add ",n.jsx(e.code,{children:"name"})," attribute) to make them accessible to ",n.jsx(e.code,{children:"ngModel"}),"."]}),`
`]}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`<h1>Form Works!</h1>

  <form #heroForm="ngForm">
    <div>
      <ui5-label for="inp1">First Name:</ui5-label>
      <ui5-input id="inp1" [(ngModel)]="model.firstName" name="firstName" [required]="true"></ui5-input>
    </div>

    <div>
      <ui5-label for="inp2">Last Name:</ui5-label>
      <input id="inp2" type="text" [(ngModel)]="model.lastName" name="lastName" required/>
    </div>
    
    <ui5-button [submits]="true">Submit</ui5-button> 

    Form Value: {{heroForm.value | json}}
    Form Status: {{heroForm.status}}
  </form>\`,
})
export class AppComponent {
  model = {
    firstName: "",
    lastName: ""
  };
}
`})}),`
`,n.jsx(e.h3,{id:"step-5-launch-the-application",children:"Step 5. Launch the application."}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`ng serve -o
`})}),`
`,n.jsx(e.p,{children:"After the development server starts, a simple form will be rendered in the test page."}),`
`,n.jsx(e.p,{children:"Initially, the model is empty and the form is invalid:"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`// Form Value: { "firstName": "", "lastName": "" }
// Form Status: "Invalid"
`})}),`
`,n.jsx(e.p,{children:"Start typing in the input fields and you will notice how the form model and form status are updated."}),`
`,n.jsx(e.p,{children:"Good job, the Form works!"}),`
`,n.jsx(e.h2,{id:"summary",children:"Summary"}),`
`,n.jsxs(e.p,{children:["Angular provides good support of web components and ",n.jsx(e.code,{children:"UI5 Web Components"})," are working perfectly in the majority of use-cases. However, for an enhanced development experience and better support for both template-driven and Reactive forms,  the ",n.jsx(e.code,{children:"UI5 Web Components for Angular"})," is the recommended choice."]}),`
`,n.jsx(l,{})]})}function f(o={}){const{wrapper:e}=Object.assign({},r(),o.components);return e?n.jsx(e,Object.assign({},o,{children:n.jsx(t,o)})):t(o)}export{f as default};
