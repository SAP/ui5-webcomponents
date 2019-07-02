# Public module imports

## UI5 Web Components

Here's a comprehensive list of all UI5 Web Components, their tags, and their respective module imports:

For API documentation and samples, please check the [UI5 Web Components Playground](https://sap.github.io/ui5-webcomponents/playground/)

|      Web Component       |       Tag name       |                       Module import                        |
| ------------------------ | -------------------- | ---------------------------------------------------------- |
| Badge                    | `ui5-badge`          | `import "@ui5/webcomponents/dist/Badge.js";`               |
| Busy Indicator           | `ui5-busyindicator`  | `import "@ui5/webcomponents/dist/BusyIndicator.js";`       |
| Button                   | `ui5-button`         | `import "@ui5/webcomponents/dist/Button.js";`              |
| Card                     | `ui5-card`           | `import "@ui5/webcomponents/dist/Card.js";`                |
| Checkbox                 | `ui5-checkbox`       | `import "@ui5/webcomponents/dist/CheckBox.js";`            |
| Date Picker              | `ui5-datepicker`     | `import "@ui5/webcomponents/dist/DatePicker.js";`          |
| Dialog                   | `ui5-dialog`         | `import "@ui5/webcomponents/dist/Dialog.js";`              |
| Icon                     | `ui5-icon`           | `import "@ui5/webcomponents/dist/Icon.js";`                |
| Input                    | `ui5-input`          | `import "@ui5/webcomponents/dist/Input.js";`               |
| Label                    | `ui5-label`          | `import "@ui5/webcomponents/dist/Label.js";`               |
| Link                     | `ui5-link`           | `import "@ui5/webcomponents/dist/Link.js";`                |
| List                     | `ui5-list`           | `import "@ui5/webcomponents/dist/List.js";`                |
| List - Standard Item     | `ui5-li`             | `import S"@ui5/webcomponents/dist/StandardListItem.js";`   |
| List - Custom Item       | `ui5-li-custom`      | `import "@ui5/webcomponents/dist/CustomListItem.js";`      |
| List - Group Header Item | `ui5-li-groupheader` | `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` |
| Message Strip            | `ui5-messagestrip`   | `import "@ui5/webcomponents/dist/MessageStrip.js";`        |
| Multi Combo Box          | `ui5-multicombobox`  | `import "@ui5/webcomponents/dist/MultiComboBox.js";`       |
| Panel                    | `ui5-panel`          | `import "@ui5/webcomponents/dist/Panel.js";`               |
| Popover                  | `ui5-popover`        | `import "@ui5/webcomponents/dist/Popover.js";`             |
| Radio Button             | `ui5-radiobutton`    | `import "@ui5/webcomponents/dist/RadioButton.js";`         |
| Select                   | `ui5-select`         | `import "@ui5/webcomponents/dist/Select.js";`              |
| Select Option            | `ui5-option`         | comes with ui5-select              |
| Shell Bar (Fiori 3)      | `ui5-shellbar`       | `import "@ui5/webcomponents/dist/ShellBar.js";`            |
| Shell Bar Item           | `ui5-shellbar-item`  | `import "@ui5/webcomponents/dist/ShellBarItem.js";`        |
| Switch                   | `ui5-switch`         | `import "@ui5/webcomponents/dist/Switch.js";`              |
| Tab Container            | `ui5-tabcontainer`   | `import "@ui5/webcomponents/dist/TabContainer.js";`        |
| Tab                      | `ui5-tab`            | `import "@ui5/webcomponents/dist/Tab.js";`                 |
| Tab Separator            | `ui5-tab-separator`  | `import "@ui5/webcomponents/dist/TabSeparator.js";`        |
| Table                    | `ui5-table`          | `import "@ui5/webcomponents/dist/Table.js";`               |
| Table Column             | `ui5-table-column`   | comes with ui5-table                                       |
| Table Row                | `ui5-table-row`      | comes with ui5-table                                       |
| Table Cell               | `ui5-table-cell`     | comes with ui5-table                                       |
| Textarea                 | `ui5-textarea`       | `import "@ui5/webcomponents/dist/TextArea.js";`            |
| Timeline                 | `ui5-timeline`       | `import "@ui5/webcomponents/dist/Timeline.js";`            |
| Timeline Item            | `ui5-timeline-item`  | comes with ui5-timeline                                    |
| Title                    | `ui5-title`          | `import "@ui5/webcomponents/dist/Title.js";`               |
| Toggle Button            | `ui5-togglebutton`   | `import "@ui5/webcomponents/dist/ToggleButton.js";`        |


## Additional public modules

Apart from the Web Components themselves, there are a number of additional modules that can
be imported in order to add new, or configure the existing functionality.

Table of contents:

- [Preface](#preface)
- [Old browser support (Edge, IE11)](#oldbrowsersupport)
- [Theming](#theming)
- [Internationalization](#internationalization)
- [Form Support](#formsupport)
- [Input Suggestions](#inputsuggestions)
- [Advanced Calendar Types](#advancedcalendartypes)

<a name="preface"></a>
### Preface

One of the main ideas behind UI5 Web Components is to be as lightweight as possible. Therefore only the
main features (such as behavior, accessibility), default configuration settings (for example theme, language)
and modern browser support (Chrome, Firefox, Safari) are provided by just importing the Web Component module.

Additional features, configuration settings, or old browser support are opt-in only and you should import
(and configure) such manually, only if needed by your app.

<a name="oldbrowsersupport"></a>
### 1. Old browser support (Edge, IE11)

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

In addition, you should load the official Web Components polyfill in your index file, as described
[here](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).

See the "Using webcomponents-loader.js" section for more details.

Please note that the aforementioned <code>webcomponents-loader.js</code> is not shipped as part of UI5 Web Components,
but should be imported separately.

Example:
```html
<script src="path/to/your/copy/of/webcomponents-loader.js"></script>
<script src="path/to/your/javasacript/app.js" type="module"></script>
```

As shown in the example above, it's recommended to load the webcomponents polyfill first, and the web components next.

<a name="theming"></a>
### 2. Theming

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

<a name="internationalization"></a>
### 3. Internationalization

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
(some of the most popular being Webpack and Rollup) not to include all the internationalization files
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

<a name="formsupport"></a>
### 4. Form Support

```js
import "@ui5/webcomponents/dist/InputElementsFormSupport.js";
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
- ui5-select

with functionality, allowing them to be submitted in forms (provided you set their <code>name</code> attribute) just as
any standard HTML input element would be.

In addition, the:
- ui5-button

element will be able to submit the closest ```form``` it's placed in, provided you set its <code>submits</code> attribute.

<a name="inputsuggestions"></a>
### 5. Input Suggestions

```js
import "@ui5/webcomponents/dist/InputSuggestions";
```

The ```<ui5-input>``` element acts as an ```<input>``` with the Fiori design and added functionality, such as for example value state.

An advanced feature is the so called "input suggestions", allowing the user to choose from a list of predefined options while typing.
Since input suggestions may not always be needed, they do not come as part of the ```<ui5-input>``` itself.

To enable the functionality, import the above module into your app.

<a name="advancedcalendartypes"></a>
### 6. Advanced calendar types

```js
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Buddhist.js";
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Islamic.js";
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Japanese.js";
import "@ui5/webcomponents-core/dist/sap/ui/core/date/Persian.js";
```

The <code>ui5-datepicker</code> web component supports Gregorian Calendar by default.

In order to to be able to use Buddhist, Islamic, Japanese or Persian calendar with this web component
(by setting its <code>primaryCalendarType</code> property), you should import one or more of the modules above.



