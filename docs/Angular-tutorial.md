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

1. Install Origami:

```bash
npm install @codebakery/origami
```

2. Import the OrigamiFormsModule from Origami

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

3. Use Origami in your template:

```html
<ui5-input [(ngModel)]="value" origami></ui5-input>
```

### Internet Explorer 11 Support

If you need your application to run on Internet Explorer 11, there are some additional steps you should to:

*Note* These steps have been tested with Angular 7. For other versions of Angular, there might be some differences.

1. Install all needed dependencies:
```bash
npm install --save @angular-builders/custom-webpack@7.5 @angular-builders/dev-server@7.3 @babel/core @babel/preset-env babel-loader
```

2. After that we need to make Angular use custom webpack configuration. In angular.json add the following configuration lines:

In architect object, about the build command:

```json
"architect": {
        "build": {
          "builder": "@angular-builders/custom-webpack:browser",
          "options": {
            "customWebpackConfig": {"path": "./custom-webpack.config.js"},
```

And about the serve command:
```json
       "serve": {
             "builder": "@angular-builders/dev-server:generic",
```

3. On root level create custom-webpack.config.js file with the following content(this is the config that Angular will use):
```js
const path = require('path');
const env = process.env.WEBPACK_ENV;
 
const OUTPUT_FILENAME = 'result';
const DEST_FOLDER = 'dist';
 
const OUTPUT_FILE = `${OUTPUT_FILENAME}.js`;
const OUTPUT_FILE_MIN = `${OUTPUT_FILENAME}.min.js`;
 
const { outputfile, mode } = env == 'build' 
    ? {
        outputfile: OUTPUT_FILE_MIN,
        mode: 'production'
    } 
    : {
        outputfile: OUTPUT_FILE,
        mode: 'development'
    };
 
module.exports = {
    mode,
    output: {
        path: path.join(__dirname, DEST_FOLDER),
        filename: outputfile,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
            // Only run `.js` files through Babel
            test: /\.m?js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }],
    },
    devtool: 'source-map',
};
```

4. Add the following import ```to app.module.ts``` file:
```js
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11WithWebComponentsPolyfill.js";
```

*Note*: The ```IE11WithWebComponentsPolyfill.js``` file includes the official webcomponents polyfill, so you don’t have to import it by yourself. (This file was released in our latest @next version. It will be shipped with our next stable release rc.6, so until then it would be available only with the @next tag)
