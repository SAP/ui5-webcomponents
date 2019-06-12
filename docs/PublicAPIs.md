# Public modules

## UI5 Web Components

Here's a comprehensive list of all UI5 Web Components and their respective modules



## Additional public modules

Apart from the Web Components themselves, there are a number of additional modules that can 
be imported in order to add new, or configure the existing functionality.

### Preface

One of the main ideas behind UI5 Web Components is to be as lightweight as possible. Therefore only the 
main features (such as behavior, accessibility), default configuration settings (for example theme, language) 
and modern browser support (Chrome, Firefox, Safari) are provided by just importing the Web Component module.

Additional features, configuration settings, or old browser support are opt-in only and you should import
(and configure) such manually, only if needed by your app. 

### Old browser support (Edge, IE11)

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

### Theming

```js
import "@ui5/webcomponents/dist/ThemePropertiesProvider.js";
```
(for additional themes support)

and 
```js
import { setTheme } from "@ui5/webcomponents-base/Theming.js";
```
(for changing the theme at runtime)

By default UI5 Web Components come with the SAP Quartz, a.k.a. Fiori 3 (techinical name: sap_fiori_3) theme.
By importing the first module, listed above, you also get support for the:
 - SAP Belize (sap_belize)
 - SAP Belize High Contrast Black (sap_belize_hcb) 
 
themes.

You can configure the theme by setting the <code>theme</code> key in the configuration object.

Example:
```html
<script id="sap-ui-config" type="application/json">
	{
		"theme": "sap_belize_hcb"
	}
</script>
```

By importing the second module, you get the:

<code>const setTheme = async theme => {...}</code>

method that allows you to change the theme during runtime, if necessary.
Example:
```js
import { setTheme } from "@ui5/webcomponents-base/Theming.js";
setTheme("sap_belize_hcb");
```

### Translation

```js
import "@ui5/webcomponents/dist/MessageBundleAssets.js";
```

Some UI5 Web Components contain texts (such as placeholders, tooltips, messages) that need translation.
All texts are in English by default. In order to get support for other languages, you should import the module above.

You can configure the language by setting the <code>language</code> key in the configuration object.

Example:
```html
<script id="sap-ui-config" type="application/json">
	{
		"language": "de"
	}
</script>
```

Note: importing the module above will produce the following warning message in the browser's console:
> Inefficient bundling detected: consider bundling i18n imports as URLs instead of inlining them. 
> See rollup-plugin-url or webpack file-loader for more information.
> Suggested pattern: "i18n\/.*\.json"

What this means is that it's recommended to instruct your source code bundling software 
(some of the most popular being Webpack and Rollup) not to include all the translation files
(files that match the <code>i18n\/.*\.json</code> pattern) in your applications's javascript bundle, 
but rather to leave them out. At runtime, they will be fetched on demand, if ever requested. 
Currently there are very few texts that need translation in UI5 Web Components, but these may grow over time
so it's always a good idea to implement the optimization, suggested above.

[How to do it with Webpack](https://github.com/webpack-contrib/file-loader)

[How to do it with Rollup](https://github.com/rollup/rollup-plugin-url)

Rollup example:

```js
import url from "rollup-plugin-url";
...
plugins.push(url({
	limit: 0,
	include: [
		/.*i18n\/.*\.json/,
	],
	emitFiles: true,
	fileName: "[name].[hash][extname]",
	publicPath: DEPLOY_PUBLIC_PATH + "/resources/sap/ui/webcomponents/main/",
}));
```

Please note that the code above is just sample snippet, taken from the UI5 Web Components playground app
rollup configuration file and will not work on its own.

### Form Support

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

### Input Suggestions

```js
import "@ui5/webcomponents/dist/InputSuggestions";
```

The ```<ui5-input>``` element acts as an ```<input>``` with the Fiori design and added functionality, such as for example value state.

An advanced feature is the so called "input suggestions", allowing the user to choose from a list of predefined options while typing.
Since input suggestions may not always be needed, they do not come as part of the ```<ui5-input>``` itself.

To enable the functionality, import the above module into your app.

### Advanced calendar types

```js
import Buddhist from "@ui5/webcomponents-core/dist/sap/ui/core/date/Buddhist.js";
import Islamic from "@ui5/webcomponents-core/dist/sap/ui/core/date/Islamic.js";
import Japanese from "@ui5/webcomponents-core/dist/sap/ui/core/date/Japanese.js";
import Persian from "@ui5/webcomponents-core/dist/sap/ui/core/date/Persian.js";
```

The <code>ui5-datepicker</code> web component supports Gregorian Calendar by default.

In order to to be able to use Buddhist, Islamic, Japanese or Persian calendar with this web component
(by setting its <code>primaryCalendarType</code> property), you should import one or more of the modules above.



