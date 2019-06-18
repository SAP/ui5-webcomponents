# Angular
## 1. Install Angular CLI: 
```
npm install -g @angular/cli
```

## 2. Create new Angular application:
```
ng new ui5-web-components-application
cd ui5-web-components-application
```

## 3. Add UI5 Web Components:
```
npm install @ui5/webcomponents --save
```

## 4. Before using UI5 Web Components, you have to allow the use of custom elements in Angular
In the module, that you wish to use UI5 Web Components, you have to import CUSTOM_ELEMENTS_SCHEMA:
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

## 5. Import the components that you are going to use:
```js
import "@ui5/webcomponents/dist/Button";
```

## 6. Use the imported elements in your application:
```html
<ui5-button>Hello world!</ui5-button>
```

## 7. Launch the app:
```
ng serve -o
```

## Additional:

### Two Way Data Binding:

You can use two way data binding with the following components: CheckBox, RadioButton, Input, DatePicker, Switch, TextArea.
In order to use it, you have to use a library called Origami, that provides advanced support for two way data binding of custom elements.

Example:
1. Install Origami: 
```
npm install @codebakery/origami
```
2. Use origami in your template:
```html
<ui5-input [(ngModel)]="value" origami></ui5-input>
```