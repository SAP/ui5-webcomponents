# Public module imports

## UI5 Web Components

Here's a comprehensive list of all UI5 Web Components, their tags, and their respective module imports:

For API documentation and samples, please check the [UI5 Web Components Playground](https://sap.github.io/ui5-webcomponents/playground/)

### Main package (```@ui5/webcomponents```)

The `main` package provides general purpose UI building blocks such as buttons, labels, inputs and popups.

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
| List - Standard Item     | `ui5-li`             | `import "@ui5/webcomponents/dist/StandardListItem.js";`   |
| List - Custom Item       | `ui5-li-custom`      | `import "@ui5/webcomponents/dist/CustomListItem.js";`      |
| List - Group Header Item | `ui5-li-groupheader` | `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` |
| Message Strip            | `ui5-messagestrip`   | `import "@ui5/webcomponents/dist/MessageStrip.js";`        |
| Multi Combo Box          | `ui5-multicombobox`  | `import "@ui5/webcomponents/dist/MultiComboBox.js";`       |
| Panel                    | `ui5-panel`          | `import "@ui5/webcomponents/dist/Panel.js";`               |
| Popover                  | `ui5-popover`        | `import "@ui5/webcomponents/dist/Popover.js";`             |
| Radio Button             | `ui5-radiobutton`    | `import "@ui5/webcomponents/dist/RadioButton.js";`         |
| Select                   | `ui5-select`         | `import "@ui5/webcomponents/dist/Select.js";`              |
| Select Option            | `ui5-option`         | comes with ui5-select              |
| Switch                   | `ui5-switch`         | `import "@ui5/webcomponents/dist/Switch.js";`              |
| Tab Container            | `ui5-tabcontainer`   | `import "@ui5/webcomponents/dist/TabContainer.js";`        |
| Tab                      | `ui5-tab`            | `import "@ui5/webcomponents/dist/Tab.js";`                 |
| Tab Separator            | `ui5-tab-separator`  | `import "@ui5/webcomponents/dist/TabSeparator.js";`        |
| Table                    | `ui5-table`          | `import "@ui5/webcomponents/dist/Table.js";`               |
| Table Column             | `ui5-table-column`   | `import "@ui5/webcomponents/dist/TableColumn.js";`               |
| Table Row                | `ui5-table-row`      | `import "@ui5/webcomponents/dist/TableRow.js";`               |
| Table Cell               | `ui5-table-cell`     | `import "@ui5/webcomponents/dist/TableCell.js";`               |
| Textarea                 | `ui5-textarea`       | `import "@ui5/webcomponents/dist/TextArea.js";`            |
| Timeline                 | `ui5-timeline`       | `import "@ui5/webcomponents/dist/Timeline.js";`            |
| Timeline Item            | `ui5-timeline-item`  | comes with ui5-timeline                                    |
| Title                    | `ui5-title`          | `import "@ui5/webcomponents/dist/Title.js";`               |
| Toggle Button            | `ui5-togglebutton`   | `import "@ui5/webcomponents/dist/ToggleButton.js";`        |

### Fiori package (```@ui5/webcomponents-fiori```)

The `fiori` package provide essential building blocks, necessary to implement the Fiori UX concept, 
such as a common header (ShellBar).

|      Web Component       |       Tag name       |                       Module import                        |
| ------------------------ | -------------------- | ---------------------------------------------------------- |
| Shell Bar                | `ui5-shellbar`       | `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`      |
| Shell Bar Item           | `ui5-shellbar-item`  | `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`  |
| Product Switch           | `ui5-product-switch`       | `import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";`      |
| Product Switch Item      | `ui5-product-switch-item`  | `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`  |

### Icons package (```@ui5/webcomponents-icons```)

The `icons` package provides assets for the rich `SAP-icons` icon collection.

|      Icon asset       |                           Module import                        |
| ------------------------ |  ---------------------------------------------------------- |
| All icons (~115KB zipped)       |  `import "@ui5/webcomponents-icons/dist/json-imports/Icons.js";`      |
| Accelerated icon           |  `import "@ui5/webcomponents-fiori/dist/icons/accelerated.js";`  |
| Accept icon           |  `import "@ui5/webcomponents-fiori/dist/icons/accept.js";`  |
| ...           |  ...  |
| Zoom out icon           |  `import "@ui5/webcomponents-fiori/dist/icons/zoom-out.js";`  |

*Note:* The `@ui5/webcomponents-icons` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import 
just the ones that your app will actually use.

For a full list of the icons in the `SAP-icons` collection, click [here](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).

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
- [Configuration](#conf)

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
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";
```

and if your app needs to run on both **Edge** and **IE11**, you should instead import:

```js
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";
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
import "@ui5/webcomponents/dist/json-imports/Themes.js";
import "@ui5/webcomponents-fiori/dist/json-imports/Themes.js"; // Only if using the @ui5/webcomponents-fiori package
```
(for additional themes support)

and
```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
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
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_belize_hcb");
```

For more general information on assets and JSON imports, click [here](Assets.md).

Find out how you can bundle your themes more efficiently [here](Assets.md#bundling).

<a name="internationalization"></a>
### 3. Internationalization

```js
import "@ui5/webcomponents/dist/json-imports/i18n.js";
import "@ui5/webcomponents-fiori/dist/json-imports/i18n.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/json-imports/i18n.js"; // Only if using the @ui5/webcomponents-icons package
```

Some UI5 Web Components contain texts (such as placeholders, tooltips, messages) that need translation.
All texts are in English by default. In order to get support for other languages, you should import the module(s) above.

You can configure the language by setting the <code>language</code> key in the configuration object.

Example:
```html
<script id="sap-ui-config" type="application/json">
	{
		"language": "de"
	}
</script>
```

For more general information on assets and JSON imports, click [here](Assets.md).

Find out how you can bundle your i18n texts more efficiently [here](Assets.md#bundling).

<a name="formsupport"></a>
### 4. Form Support

```js
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
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
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
```

The ```<ui5-input>``` element acts as an ```<input>``` with the Fiori design and added functionality, such as for example value state.

An advanced feature is the so called "input suggestions", allowing the user to choose from a list of predefined options while typing.
Since input suggestions may not always be needed, they do not come as part of the ```<ui5-input>``` itself.

To enable the functionality, import the above module into your app.

<a name="advancedcalendartypes"></a>
### 6. Advanced calendar types

```js
import "@ui5/webcomponents-base/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-base/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-base/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-base/dist/features/calendar/Persian.js";
```

The <code>ui5-datepicker</code> web component supports Gregorian Calendar by default.

In order to to be able to use Buddhist, Islamic, Japanese or Persian calendar with this web component
(by setting its <code>primaryCalendarType</code> property), you should import one or more of the modules above.

<a name="config"></a>
### 7. Configuration

```js
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
```

For more details, please check [Configuration](Configuration.md)
