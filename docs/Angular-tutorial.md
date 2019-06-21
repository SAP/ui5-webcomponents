# Get started with UI5 Web Components & Angular

In this tutorial you will learn how to add UI5 Web Components to your application. The UI5 Web Components can be added both to new Angular applications, as well as already existing ones.

## Step 1: Install Angular CLI: 
```
npm install -g @angular/cli
```

## Step 2: Create New Angular Application:
```
ng new ui5-web-components-application
cd ui5-web-components-application
```

## Step 3: Add UI5 Web Components:
```
npm install @ui5/webcomponents --save
```

## Step 4. Allow the Use of Custom Elements in Angular
Before using UI5 Web Components, you have to allow the use of custom elements in Angular. To do so, you have to import CUSTOM_ELEMENTS_SCHEMA in ```app.module.ts``` :
```js
import { ..., CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
```
After importing it, you have to add it to the schemas array:

```
imports: [
    ...
],
schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
```

## Step 5. Import the Components That You Are Going to Use:
```js
import "@ui5/webcomponents/dist/Button";
```

## Step 6. Use the Imported Elements in Your Application:
```html
<ui5-button>Hello world!</ui5-button>
```

## Step 7. Launch the Application:
```
ng serve -o
```

## Additional:

### Two-Way Data Binding:

You can use two-way data binding with the following components: CheckBox, RadioButton, Input, DatePicker, Switch, TextArea.
In order to use it, you have to use a library called Origami, that provides advanced support for two-way data binding of custom elements.

Example:
1. Install Origami: 
```
npm install @codebakery/origami
```
2. Use Origami in your template:
```html
<ui5-input [(ngModel)]="value" origami></ui5-input>
```