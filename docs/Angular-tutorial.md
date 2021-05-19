# Get started with UI5 Web Components & Angular

In this tutorial you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new Angular applications, as well as already existing ones.

## Step 1: Install Angular CLI

```bash
npm install -g @angular/cli
```

## Step 2: Create New Angular Application

```bash
ng new ui5-web-components-application
cd ui5-web-components-application
```

## Step 3: Add UI5 Web Components

```bash
npm install @ui5/webcomponents --save
```

## Step 4. Allow the Use of Custom Elements in Angular

Before using UI5 Web Components, you have to allow the use of custom elements in Angular. To do so, you have to import CUSTOM_ELEMENTS_SCHEMA in ```app.module.ts``` :

```js
import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

After importing it, you have to add it to the schemas array:

```js
imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
```

## Step 5. Import the Components That You Are Going to Use

```js
import "@ui5/webcomponents/dist/Button";
```

## Step 6. Use the Imported Elements in Your Application

```html
<ui5-button>Hello world!</ui5-button>
```

## Step 7. Launch the Application

```bash
ng serve -o
```

## Additional

### Two-Way Data Binding

You can use two-way data binding with the following components: CheckBox, RadioButton, Input, DatePicker, Switch, TextArea.
In order to use it, you have to use a library called [Origami](https://github.com/hotforfeature/origami), that provides advanced support for two-way data binding of custom elements.

Example:

#### 1. Install Origami:

```bash
npm install @codebakery/origami
```

#### 2. Import the OrigamiFormsModule from Origami

```js
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
```

#### 3. Use Origami in your template:

```html
<ui5-input [(ngModel)]="value" origami></ui5-input>
```

#### 4. Make Angular boot after UI5 Web Components are defined:

In the module, where you are using UI5 Web Components, you should add the ```APP_INITIALIZER``` provider. In order to do so, import ```APP_INITIALIZER``` and add it to the providers array like this (In this example we will add it in the ```app.module.ts```):
```js
import { ..., APP_INITIALIZER  } from '@angular/core';

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
```
