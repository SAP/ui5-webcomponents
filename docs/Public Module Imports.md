# Public module imports

This is a comprehensive list of public module imports by package, intended for *App development*, i.e. consumption
of the UI5 Web Components. 

Modules, intended purely for developing your own UI5 Web Components, 
are therefore not listed here.   

Table of contents:
 - [Main package - @ui5/webcomponents](#main)
 - [Fiori package - @ui5/webcomponents-fiori](#fiori)
 - [Icons package - @ui5/webcomponents-icons](#icons)
 - [Base package - @ui5/webcomponents-base](#base)

<a name="main"></a>
## Main package (```@ui5/webcomponents```)

The `main` package provides general purpose UI building blocks such as buttons, labels, inputs and popups.

For API documentation and samples, please check the [UI5 Web Components Playground](https://sap.github.io/ui5-webcomponents/master/playground/components).

### 1. Web Components

|      Web Component       |       Tag name       |                       Module import                        |
| ------------------------ | -------------------- | ---------------------------------------------------------- |
| Avatar                   | `ui5-avatar`         | `import "@ui5/webcomponents/dist/Avatar.js";`              |
| Badge                    | `ui5-badge`          | `import "@ui5/webcomponents/dist/Badge.js";`               |
| Busy Indicator           | `ui5-busyindicator`  | `import "@ui5/webcomponents/dist/BusyIndicator.js";`       |
| Button                   | `ui5-button`         | `import "@ui5/webcomponents/dist/Button.js";`              |
| Card                     | `ui5-card`           | `import "@ui5/webcomponents/dist/Card.js";`                |
| Carousel                 | `ui5-carousel`       | `import "@ui5/webcomponents/dist/Carousel.js";`            |
| Checkbox                 | `ui5-checkbox`       | `import "@ui5/webcomponents/dist/CheckBox.js";`            |
| ComboBox                 | `ui5-combobox`       | `import "@ui5/webcomponents/dist/ComboBox.js";`            |
| ComboBox Item            | `ui5-cb-item`        | comes with `ui5-combobox`                                  |
| Date Picker              | `ui5-date-picker`     | `import "@ui5/webcomponents/dist/DatePicker.js";`         |
| Dialog                   | `ui5-dialog`         | `import "@ui5/webcomponents/dist/Dialog.js";`              |
| File Uploader            | `ui5-file-uploader`  | `import "@ui5/webcomponents/dist/FileUploader.js";`        |
| Icon                     | `ui5-icon`           | `import "@ui5/webcomponents/dist/Icon.js";`                |
| Input                    | `ui5-input`          | `import "@ui5/webcomponents/dist/Input.js";`               |
| Label                    | `ui5-label`          | `import "@ui5/webcomponents/dist/Label.js";`               |
| Link                     | `ui5-link`           | `import "@ui5/webcomponents/dist/Link.js";`                |
| List                     | `ui5-list`           | `import "@ui5/webcomponents/dist/List.js";`                |
| List - Standard Item     | `ui5-li`             | `import "@ui5/webcomponents/dist/StandardListItem.js";`    |
| List - Custom Item       | `ui5-li-custom`      | `import "@ui5/webcomponents/dist/CustomListItem.js";`      |
| List - Group Header Item | `ui5-li-groupheader` | `import "@ui5/webcomponents/dist/GroupHeaderListItem.js";` |
| Message Strip            | `ui5-messagestrip`   | `import "@ui5/webcomponents/dist/MessageStrip.js";`        |
| Multi ComboBox           | `ui5-multi-combobox` | `import "@ui5/webcomponents/dist/MultiComboBox.js";`       |
| Multi ComboBox Item      | `ui5-mcb-item`       | comes with `ui5-multi-combobox`                            |
| Panel                    | `ui5-panel`          | `import "@ui5/webcomponents/dist/Panel.js";`               |
| Popover                  | `ui5-popover`        | `import "@ui5/webcomponents/dist/Popover.js";`             |
| Radio Button             | `ui5-radiobutton`    | `import "@ui5/webcomponents/dist/RadioButton.js";`         |
| Responsive Popover       | `ui5-responsive-popover`| `import "@ui5/webcomponents/dist/ResponsivePopover.js";`|
| Select                   | `ui5-select`         | `import "@ui5/webcomponents/dist/Select.js";`              |
| Select Option            | `ui5-option`         | comes with `ui5-select `                                   |
| Segmented Button         | `ui5-segmentedbutton`|`import "@ui5/webcomponents/dist/SegmentedButton.js";`      |
| Suggestion Item          | `ui5-suggestion-item`|`import "@ui5/webcomponents/dist/SuggestionItem.js";`       |
| Switch                   | `ui5-switch`         | `import "@ui5/webcomponents/dist/Switch.js";`              |
| Tab Container            | `ui5-tabcontainer`   | `import "@ui5/webcomponents/dist/TabContainer.js";`        |
| Tab                      | `ui5-tab`            | `import "@ui5/webcomponents/dist/Tab.js";`                 |
| Tab Separator            | `ui5-tab-separator`  | `import "@ui5/webcomponents/dist/TabSeparator.js";`        |
| Table                    | `ui5-table`          | `import "@ui5/webcomponents/dist/Table.js";`               |
| Table Column             | `ui5-table-column`   | `import "@ui5/webcomponents/dist/TableColumn.js";`         |
| Table Row                | `ui5-table-row`      | `import "@ui5/webcomponents/dist/TableRow.js";`            |
| Table Cell               | `ui5-table-cell`     | `import "@ui5/webcomponents/dist/TableCell.js";`           |
| Textarea                 | `ui5-textarea`       | `import "@ui5/webcomponents/dist/TextArea.js";`            |
| TimePicker               | `ui5-time-picker`    | `import "@ui5/webcomponents/dist/TimePicker.js";`          |
| Timeline                 | `ui5-timeline`       | `import "@ui5/webcomponents/dist/Timeline.js";`            |
| Timeline Item            | `ui5-timeline-item`  | comes with `ui5-timeline`                                  |
| Title                    | `ui5-title`          | `import "@ui5/webcomponents/dist/Title.js";`               |
| Toast                    | `ui5-toast`          | `import "@ui5/webcomponents/dist/Toast.js";`               |
| Toggle Button            | `ui5-togglebutton`   | `import "@ui5/webcomponents/dist/ToggleButton.js";`        |
| Tree                     | `ui5-tree`           | `import "@ui5/webcomponents/dist/Tree.js";`                |
| Tree Item                | `ui5-tree-item`      | comes with `ui5-tree`                                      |

### 2. Assets

For additional `main` package assets (other themes, i18n and CLDR), use:

`import "@ui5/webcomponents/dist/Assets.js";`

### 3. Additional features

<a name="inputsuggestions"></a>
#### 3.1 Input Suggestions

```js
import "@ui5/webcomponents/dist/features/InputSuggestions.js";
```

The ```<ui5-input>``` element acts as an ```<input>``` with the Fiori design and added functionality, such as value state.

An advanced feature is the so called "input suggestions", allowing the user to choose from a list of predefined options while typing.
Since input suggestions may not always be needed, they do not come as part of the ```<ui5-input>``` itself.

To enable the functionality, import the above module into your app. This will also automatically import `ui5-suggestion-item`
for your convenience.

<a name="formsupport"></a>
#### 3.2 Form Support

```js
import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";
```

HTML ```<form>``` only submits a couple of standard HTML elements such as ```<input>``` and ```<textarea>``` to name a few.

Web Components that function as inputs, such as UI5's ```<ui5-input>```, ```<ui5-checkbox>```, ```<ui5-textarea>``` are therefore
not submitted by the form out of the box.

Generally this is not an issue, as very few modern applications submit forms in the classic way.

If you however need to submit forms, you can import the module above and it will enrich:
- `ui5-input`
- `ui5-textarea`
- `ui5-checkbox`
- `ui5-radiobutton`
- `ui5-date-picker`
- `ui5-select`

with functionality, allowing them to be submitted in forms (provided you set their <code>name</code> attribute) just as
any standard HTML input element would be.

In addition, the `ui5-button` element will be able to submit the closest ```form``` it's placed in, provided you set its `submits` attribute.

<a name="fiori"></a>
## Fiori package (```@ui5/webcomponents-fiori```)

The `fiori` package provides essential building blocks, necessary to implement the Fiori UX concept, 
such as a common header (`ShellBar`).

For API documentation and samples, please check the [UI5 Web Components Playground](https://sap.github.io/ui5-webcomponents/playground/).

### 1. Web Components

|      Web Component           |       Tag name                     |                       Module import                                    |
| ------------------------     | ---------------------------------- | ---------------------------------------------------------------------- |
| Flexible Column Layout       | `ui5-flexible-column-layout`       | `import "@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js";`      |
| Side Navigation              | `ui5-side-navigation`              | `import "@ui5/webcomponents-fiori/dist/SideNavigation.js";`            |
| Side Navigation Item         | `ui5-side-navigation-item`         | `import "@ui5/webcomponents-fiori/dist/SideNavigationItem.js";`        |
| Side Navigation Sub Item     | `ui5-side-navigation-sub-item`     | `import "@ui5/webcomponents-fiori/dist/SideNavigationSubItem.js";`     |
| Shell Bar                    | `ui5-shellbar`                     | `import "@ui5/webcomponents-fiori/dist/ShellBar.js";`                  |
| Shell Bar Item               | `ui5-shellbar-item`                | `import "@ui5/webcomponents-fiori/dist/ShellBarItem.js";`              |
| Product Switch               | `ui5-product-switch`               | `import "@ui5/webcomponents-fiori/dist/ProductSwitch.js";`             |
| Product Switch Item          | `ui5-product-switch-item`          | `import "@ui5/webcomponents-fiori/dist/ProductSwitchItem.js";`         |
| Notification List Item       | `ui5-li-notifcation`               | `import "@ui5/webcomponents-fiori/dist/NotifcationListItem.js";`       |
| Notification Group List Item | `ui5-li-notification-group`        | `import "@ui5/webcomponents-fiori/dist/NotifcationListGroupItem.js";`  |
| Notification Overflow Action | `ui5-notification-overflow-action` | `import "@ui5/webcomponents-fiori/dist/NotificationOverflowAction.js";`|
| Upload Collection            | `ui5-upload-collection`            | `import "@ui5/webcomponents-fiori/dist/UploadCollection.js";`          |
| Upload Collection Item       | `ui5-upload-collection-item`       | `import "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js";`      |
| Wizard                       | `ui5-wizard`                       | `import "@ui5/webcomponents-fiori/dist/Wizard.js";`                    |
| Wizard Step                  | `ui5-wizard-step`                  | comes with `ui5-wizard`                                                |

### 2. Assets

For additional `fiori` package assets (other themes, i18n), use:

`import "@ui5/webcomponents-fiori/dist/Assets.js";`

### 3. Additional features

#### 3.1 Co-pilot animation for `ui5-shellbar`

```js
`import "@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js";`
```

By default the `ui5-shellbar` Co-pilot button ships with a simple animation for better performance. 
Importing the module above enables the detailed but more resource intensive animation instead.

<a name="icons"></a>
## Icons package (```@ui5/webcomponents-icons```)

The `icons` package provides assets for the rich `SAP-icons` icon collection.

*Note:* The `@ui5/webcomponents-icons` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import 
just the ones that your app will actually use.

### 1. Individual icon imports

|      Icon asset       |                           Module import                        |
| ------------------------ |  ---------------------------------------------------------- |
| Accelerated icon           |  `import "@ui5/webcomponents-icons/dist/icons/accelerated.js";`  |
| Accept icon           |  `import "@ui5/webcomponents-icons/dist/icons/accept.js";`  |
| ...           |  ...  |
| Zoom out icon           |  `import "@ui5/webcomponents-icons/dist/icons/zoom-out.js";`  |

For a complete list of the icons in the `SAP-icons` collection, click [here](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).

### 2. Assets

For additional `icons` package assets (i18n, all icons JSON), use:

`import "@ui5/webcomponents-icons/dist/Assets.js";`  

*Note:* 
Apart from i18n assets, the above import also provides the JSON, containing all icons definitions (~115KB zipped).
**Therefore, if you use an icon which you did not import individually, the JSON will be fetched.**

<a name="base"></a>
## Base package (```@ui5/webcomponents-base```)

The `base` package provides not only the UI5 Web Components framework, but also some features, relevant to
all UI5 Web Components.

<a name="oldbrowsersupport"></a>
### 1. Old browser support (Edge, IE11)

Most modern browsers  - **Chrome, Firefox, Safari, Edge (Chromium-based)**, support Web Components natively.

If your app needs to be able to run additionally on the old **Edge (EdgeHTML-based)**, you should import the following module:

```js
import "@ui5/webcomponents-base/dist/features/browsersupport/Edge.js";
```

And if your app needs to run on both **Edge** and **IE11**, you should instead import:

```js
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11.js";
```
(this also includes Edge support).

In addition, you should load the official Web Components polyfill in your index file, as described
[here](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).

Please note that the aforementioned <code>webcomponents-loader.js</code> is not shipped as part of UI5 Web Components,
but should be imported separately.

Example:
```html
<script src="path/to/your/copy/of/webcomponents-loader.js"></script>
<script src="path/to/your/javasacript/app.js" type="module"></script>
```

As shown in the example above, it's recommended to load the Web Components Polyfill first, and the web components next.

Finally, there is an alternative to the `IE11.js` import:

```js
import "@ui5/webcomponents-base/dist/features/browsersupport/IE11WithWebComponentsPolyfill.js";
```

that includes the Web Components Polyfill too, so you don't have to import it manually.

This may be useful in certain use cases when your app has polyfills of its own and you need to guarantee the order of exectution.

The three old browser support options are summarized below:

| |`Edge.js` | `IE11.js` | `IE11WithWebComponentsPolyfill.js` |
|---|----------|-----------|------------------------------------|
|Browsers supported| Edge | Edge & IE11 | Edge & IE11 |
|Includes Web Components Polyfill | No* | No* | Yes|

`* You must include the Web Components Polyfill manually`

<a name="theming"></a>
### 2. Theming

UI5 Web Components ship with the default theme only out of the box.

As mentioned above, you can get additional themes by importing the `Assets.js` module of the respective library, for example:

```js
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
```

You can configure the theme by setting the `theme` key in the configuration object.

Example:
```html
<script id="sap-ui-config" type="application/json">
	{
		"theme": "sap_belize_hcb"
	}
</script>
```

By importing:
 
```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
```

you get the

```js
const setTheme = async theme => {...}
```

method that allows you to change the theme during runtime, if necessary.

Example:
```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_belize_hcb");
```

For more general information on assets, click [here](https://sap.github.io/ui5-webcomponents/playground/docs/assets/).

Find out how you can bundle your themes more efficiently [here](Assets.md#bundling).

<a name="internationalization"></a>
### 3. Internationalization

The `base` project provides i18n support. 

Some UI5 Web Components contain texts (such as placeholders, tooltips, messages) that need translation.
All texts are in English by default. In order to get support for other languages, you should import the `Assets.js` module(s) of the packages:

```js
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js"; // Only if using the @ui5/webcomponents-fiori package
import "@ui5/webcomponents-icons/dist/Assets.js"; // Only if using the @ui5/webcomponents-icons package
```

You can configure the language by setting the <code>language</code> key in the configuration object.

Example:
```html
<script id="sap-ui-config" type="application/json">
	{
		"language": "de"
	}
</script>
```

For more general information on assets, click [here](https://sap.github.io/ui5-webcomponents/playground/docs/assets/).

Find out how you can bundle your i18n texts more efficiently [here](Assets.md#bundling).

### 4. Advanced calendar types

```js
import "@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Japanese.js";
import "@ui5/webcomponents-localization/dist/features/calendar/Persian.js";
```

The `ui5-date-picker` web component supports Gregorian Calendar by default.

In order to be able to use Buddhist, Islamic, Japanese, or Persian calendar with this web component
(by setting its `primaryCalendarType` property), you should import one or more of the modules above.

<a name="config"></a>
### 5. Configuration

```js
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
```

For more details, please check [Configuration](https://sap.github.io/ui5-webcomponents/playground/docs/configuration/).

### 6. OpenUI5 integration

```js
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
```

If your app uses both OpenUI5 and UI5 Web Components, UI5 Web Components can benefit
from OpenUI5 configuration and resources.

When you import the above module:
 1. OpenUI5 configuration takes precedence over UI5 Web Components configuration
 for all common entities (theme, language, etc...). In addition, changing the theme
 in OpenUI5 will also change the theme in UI5 Web Components.
 2. Fonts will not be loaded twice (just once by OpenUI5, and reused).
 3. Locale Data assets will not be fetched twice (just once by OpenUI5, and reused).

Therefore, if you intend to run both frameworks in the same browser window,
it is highly recommended to enable OpenUI5 support and benefit from these optimizations.

*Note:* In general the order in which OpenUI5 and UI5 Web Components are loaded does not matter.
However, if your app needs to support Internet Explorer 11, either load OpenUI5 first, or load
UI5 Web Components deferred.

### 7. Support for registering `i18n` resources in `.properties` format

```js
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
```

By default, all `i18n` resources are in `JSON` format. Registering such a resource does not require any additional code:

```js
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
registerI18nBundle("@ui5/webcomponents", {
	fr: "./lang/fr.json",
});
```

However, in order to use `.properties` files for `i18n` registration, you must also import this feature.

```js
import "@ui5/webcomponents-base/dist/features/PropertiesFormatSupport.js";
import { registerI18nBundle } from "@ui5/webcomponents-base/dist/asset-registries/i18n.js";
registerI18nBundle("@ui5/webcomponents", {
	bg: "./lang/messagebundle_bg.properties",
});
```

### 8. Custom elements scoping

```js
import { setCustomElementsScopingSuffix, setCustomElementsScopingRules } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
```

The `scoping` feature lets you add an arbitrary suffix to the names of all, or some, UI5 Web Components' custom elements:

Example:

```html
import { setCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js";
setCustomElementsScopingSuffix("demo");
setCustomElementsScopingRules({include: [/^ui5-/], exclude: [/^ui5-my-/, /-test-/]});
``` 

and then use them with the suffix:

```html
<ui5-button-demo>Click me</ui5-button-demo>
```

For more information on scoping and its use cases, see [Micro-frontends and Custom elements scoping](./Scoping.md).
