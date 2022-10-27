# Get Started with UI5 Web Components & Angular

In this tutorial, you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new Angular applications and to already existing ones.

### Step 1. Install Angular CLI.

```bash
npm install -g @angular/cli
```

### Step 2. Create a new Angular application.

```bash
ng new ui5-web-components-application
cd ui5-web-components-application
```

### Step 3. Add UI5 Web Components.

```bash
npm install @ui5/webcomponents --save
```

### Step 4. Allow the use of custom elements in Angular.

Before using UI5 Web Components, you have to allow the use of custom elements in Angular. To do so, import CUSTOM_ELEMENTS_SCHEMA in ```app.module.ts``` :

```js
import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```

After importing it, add it to the schemas array:

```js
imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
```

### Step 5. Import the components you are going to use.

```js
import "@ui5/webcomponents/dist/Button.js";
```

### Step 6. Use the imported elements in your application.

```html
<ui5-button>Hello world!</ui5-button>
```

### Step 7. Launch the application.

```bash
ng serve -o
```

## Two-Way Data Binding

As the offical [Angular documentation](https://angular.io/guide/two-way-binding#adding-two-way-data-binding) suggests, we can use combination of property and event bindings to implement two-way data binding. Let's explore the following example, that creates a "SizerComponent".

Example:

First, we create the "SizerComponent" class and make use of the "@Input" and "@Output" decorators to mark the only "size" class field as an input/output property and a single method "inc" to increment the "size" field, but more imporant - emits "sizeChange" event (following the framework recommendations to use "inputChange" pattern for an event name).

```js
import { Component, Input, Output, EventEmitter } from '@angular/core';
import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Label.js";

@Component({
  selector: 'app-sizer',
  templateUrl: './sizer.component.html',
})
export class SizerComponent {
  @Input()  size: number = 16;
  @Output() sizeChange = new EventEmitter<number>();

  inc() {
    this.sizeChange.emit(++this.size);
  };
}
```

Then, in the template we have a Label to display the "size" value and also it's "font-size" style, bound to it. And, a Button that upon click calls the "inc" method to change the "size" value.
```html
<section>
  <ui5-label [style.font-size.px]="size">FontSize: {{size}}px</ui5-label>
  <ui5-button type="button" (click)="inc()">Inc Size</ui5-button>
</section>
```

After we created the "SizerComponent", it's time to use it.
For the purpose, we have "AppComponent" with a single "fontSizePx" class filed.
```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fontSizePx = 16;
}

```

The "AppComponent" has a simple template. It uses the "SizerComponent" and the "fontSizePx" is two-way bound to the "SizerComponent".

```html
<app-sizer [(size)]="fontSizePx"></app-sizer>
<ui5-label [style.font-size.px]="fontSizePx">FontSize: {{fontSizePx}}px</ui5-label>
```

How it works:
- In the "AppComponent", "fontSizePx" establishes the initial "SizerComponent.size" value by setting the value to 16.

- Clicking the button of the "SizerComponent" updates the "AppComponent.fontSizePx".

- The revised "AppComponent.fontSizePx" value updates the style binding, which makes the displayed texts both in "AppComponent" and "SizerComponent" larger.

## Two-Way Data Binding with Form components

Two-way binding with form components ("CheckBox", "RadioButton", "Input", "DatePicker", "Switch", "TextArea") requires the usage of "NgModel" directive. However, custom elements does not work with "NgModel" out of the box as with native HTML elements. To make it work, you can use a library called [Origami](https://github.com/hotforfeature/origami) that provides advanced support for two-way data binding of custom elements.

Example:

#### 1. Install Origami.

```bash
npm install @codebakery/origami
```

#### 2. Import the OrigamiFormsModule from Origami.

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

#### 3. Use Origami in your template.

```html
<ui5-input [(ngModel)]="value" origami></ui5-input>
```

#### 4. Make Angular boot after UI5 Web Components are defined.

Add the ```APP_INITIALIZER``` provider to the module where you are using UI5 Web Components. In order to do so, import ```APP_INITIALIZER``` and add it to the providers array like this (in this example we will add it to the ```app.module.ts```):
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
