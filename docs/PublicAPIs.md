# Public modules

Apart from the Web Components themselves, there are a number of additional modules that can 
be imported in order to add new, or configure the existing functionality.

## Form Support

```js
import InputElementsFormSupport from "@ui5/webcomponents/dist/InputElementsFormSupport.js";
```

HTML ```<form>``` only submits a couple of standard HTML elements such as ```<input>``` and ```<textarea>``` to name a few.

Web Components that function as inputs, such as UI5's ```<ui5-input>```, ```<ui5-checkbox>```, ```<ui5-textarea>``` are therefore
not submitted by the form out of the box.

Generally this is not an issue, as very few modern applications submit forms in the classic way. 

If you however need to submit forms, you can import the module above and it will enrich:
- ui5-input
- ui5-textarea
- ui5-checkbox
- ui5-radiobutton
- ui5-datepicker

with functionality, allowing them to be submitted in forms (provided you set their <code>name</code> attribute) just as 
any standard HTML input element would be.

In addition, the:
- ui5-button

element will be able to submit the closest ```form``` it's placed in, provided you set its <code>submits</code> attribute.

## Input Suggestions

```js
import "@ui5/webcomponents/dist/InputSuggestions";
```

The ```<ui5-input>``` element acts as an ```<input>``` with the Fiori design and added functionality, such as for example value state.

An advanced feature is the so called "input suggestions", allowing the user to choose from a list of predefined options while typing.
Since input suggestions may not always be needed, they do not come as part of the ```<ui5-input>``` itself.

To enable the functionality, import the above module into your app.

## Old browser support (Edge, IE11)

Most modern browsers (**Chrome, Firefox, Safari**) support Web Components natively.

If your app needs to be able to run additionally on **Edge**, you should import the following module: 

```js
import "@ui5/webcomponents-base/src/browsersupport/Edge.js";
```

and if your app needs to run on both **Edge** and **IE11**, you should instead import:

```js
import "@ui5/webcomponents-base/src/browsersupport/IE11.js";
```
(this also includes Edge support).

In addition, you should load the official Web Components polyfill in your index file, as described in:
[https://github.com/webcomponents/webcomponentsjs](https://github.com/webcomponents/webcomponentsjs).

See the "Using webcomponents-loader.js" section for more details.

Please note that the aforementioned <code>webcomponents-loader.js</code> is not shipped as part of UI5 Web Components,
but should be imported separately.

Example:
```html
<script src="path/to/your/copy/of/webcomponents-loader.js"></script>
<script src="path/to/your/app/javasacript/bundle.js" type="module"></script>
```

As shown in the example above, it's recommended to load the webcomponents polyfill first, and the web components next.

## Theming

```js
import "@ui5/webcomponents/dist/ThemePropertiesProvider.js";
```
(for additional themes support)

and 
```js
import { setTheme } from "@ui5/webcomponents-base/Theming.js";
```
(for changing the theme)

By default UI5 Web Components come with the SAP Quartz, a.k.a. Fiori 3 (techinical name: sap_fiori_3) theme.
By importing the first module, listed above, you also get support for the:
 - SAP Belize (sap_belize)
 - SAP Belize High Contrast Black (sap_belize_hcb) 
 
themes.

By importing the second module, you get the:

<code>const setTheme = async theme => {...}</code>

method that allows you to change the theme during runtime, if necessary.
