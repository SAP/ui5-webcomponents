# Configuration

*This section explains how you can configure UI5 Web Components globally, and what configuration settings are available.*

## Configuration Settings

There are several configuration settings that affect all UI5 Web Components globally.

| Setting                                       | Values                                                                                                                                                                                                                                                                                         | Default Value | Description                                                          | Applies To                                                       |
|-----------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------|------------------------------------------------------------------|
| [theme](#theme)                               | `sap_fiori_3`, `sap_fiori_3_dark`, `sap_fiori_3_hcb`, `sap_fiori_3_hcw`, `sap_belize`, `sap_belize_hcb`, `sap_belize_hcw`, `sap_horizon`, `sap_horizon_dark`, `sap_horizon_hcb`, `sap_horizon_hcw`                                                                                                                                                                    | `sap_fiori_3` | Visual theme to be applied                                           | All components                                                   |
| [language](#language)                         | `ar`, `bg`, `ca`, `cs`, `cy`, `da`, `de`, `el`, `en`, `en_GB`, `es`, `es_MX`, `et`, `fi`, `fr`, `fr_CA`, `hi`, `hr`, `hu`, `in`, `it`, `iw`, `ja`, `kk`, `ko`, `lt`, `lv`, `ms`, `nl`, `no`, `pl`, `pt_PT`, `pt`, `ro`, `ru`, `sh`, `sk`, `sl`, `sv`, `th`, `tr`, `uk`, `vi`, `zh_CN`, `zh_TW` | N/A (`null`)  | Language to be used for translatable texts                           | Components and icons with translatable texts                     |
| [animationMode](#animationMode)               | `full`, `basic`, `minimal`, `none`                                                                                                                                                                                                                                                             | `full`        | Amount/intensity of animations to be played for some components      | Components with animations (`ui5-panel`, `ui5-carousel`, etc.) |
| [calendarType](#calendarType)                 | `Gregorian`, `Islamic`, `Buddhist`, `Japanese`, `Persian`                                                                                                                                                                                                                                      | `Gregorian`   | Default calendar type to be used for date-related components         | Date/time components (`ui5-date-picker`, etc.)                 |
| [noConflict](#noConflict)                     | `true`, `false`                                                                                                                                                                                                                                                                                | `false`       | When set to true, all events will be fired with a `ui5-` prefix only | Components that fire events (most do)                            |
| [formatSettings](#formatSettings)             | See the [Format settings](#formatSettings) section below                                                                                                                                                                                                                                       | `{}`          | Allows to override locale-specific configuration                     | Date/time components (`ui5-date-picker`, etc.)                 |
| [fetchDefaultLanguage](#fetchDefaultLanguage) | `true`, `false`                                                                                                                                                                                                                                                                                | `false`       | Whether to fetch assets even for the default language                | Framework                                                        |

### theme
<a name="theme"></a>

The `theme` setting values above are the technical names of the supported themes:
- The `sap_horizon` is known as `Morning Horizon` and it's the latest theme currently available as a preview version.
- The `sap_horizon_dark` is known as `Evening Horizon`.
- The `sap_horizon_hcb` is known as `High Contrast Black`.
- The `sap_horizon_hcw` is known as `High Contrast White`.
- The `sap_fiori_3` is known as `Quartz Light` and it`s the default theme.
- The `sap_fiori_3_dark` is known as `Quartz Dark`.
- The `sap_fiori_3_hcb` is known as `Quartz High Contrast Black`.
- The `sap_fiori_3_hcw` is known as `Quartz High Contrast White`.
- The `sap_belize` is known as `Belize`.
- The `sap_belize_hcb` is known as `High Contrast Black`.
- The `sap_belize_hcw` is known as `High Contrast White`.

The default theme (`sap_fiori_3`) is built in all UI5 Web Components. Thus, components are always themed.
Configuring another theme will additionally fetch and use that theme. Any theme is fetched just once.

To use additional themes (other than `sap_fiori_3`):
 - Import the `Assets.js` module of each component library you're using, for example:

```js
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
```

For more about assets, see the dedicated [Assets](../../getting-started/using-assets) section.

 - Configure the additional theme either via the [configuration script](#script) or [module imports](#imports).

Example:
```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_belize_hcb");
```
   

### language
<a name="language"></a>

The `language` configuration setting does not have a default value (the default value is technically `null`).

This is how the language to use is determined:
 - If a language is *configured*, it will be used.
 - If no language is configured (the setting is `null`), the user's *browser language* is checked, and if in the supported list, used.
 - If the user's browser language is not in the supported list, but is a variation of a supported language, this language will be used (e.g. `fr_**` -> `fr` ) 
 - The `en` language will be used.

The `en` language is built in all UI5 Web Components that have translatable texts. Thus, components are always translated.
Configuring another language will additionally fetch and use that language. Any language is fetched once.

To use additional languages (other than `en`):
- Import the `Assets.js` module of each component/icon library you're using (in general, each library that provides languages assets), 
  for example:

```js
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-fiori/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js";
```

For more about assets, see the dedicated [Assets](../../getting-started/using-assets) section.

- Configure the additional language either via the [configuration script](#script) or [module imports](#imports).

Example:
```js
import { setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
setLanguage("fr");
```


### animationMode
<a name="animationMode"></a>

This setting only applies to components that run animations.

Animation modes allow to specify different animation scenarios or levels.
- When `full`, all animations run unrestricted.
- When `basic`, more light-weight set of animations would run.
- When `minimal`, animations of fundamental functionalities are included.
- When `none`, all animations are completely suspended.

**Note:** Please, note that each component determines which animations would run for a specific mode.

### calendarType
<a name="calendarType"></a>

This setting determines the default calendar type for all date-related components such as `ui5-date-picker`, `ui5-datetime-picker`, etc.

You can always override the calendar type for each instance via component-specific properties. See the documentation of each component for details.

The `Gregorian` calendar type is built in all date-related UI5 Web Components.

Calendar types are opt-in features, see [Using Features](../../getting-started/using-features) for details.
Setting another calendar type via configuration or component properties requires that the respective calendar type be explicitly imported.

Example:

 - Make sure you've bundled the required calendar type:

  ```js
  import "@ui5/webcomponents-localization/dist/features/calendar/Islamic.js"; 
  ```

 - Configure this calendar:

  ```html
  <script data-ui5-config type="application/json">
  {
      "calendarType": "Islamic"
  }
  </script>
  ```

Now all date-related components will use the `Islamic` calendar type by default.

<a name="noConflict"></a>

### noConflict

By default, UI5 Web Components fire all custom events twice - once with the documented name (e.g. `change`), and once more with a `ui5-` prefix (e.g. `ui5-change`).
For example, when the `ui5-switch` is toggled, it fires a `change` event, but also a `ui5-change` event.

The `noConflict` configuration setting allows certain control over this behavior:
- When `false` (default value), all custom events are fired with and without the `ui5-` prefix.
- When `true`, all custom events are fired with the `ui5-` prefix **only**. Hence the `noConflict` semantic in the name of the setting.
  This is handy, for example, if the name of an event, fired by a component, happens to collide with the name of an event provided by a third-party library.
- When an object is supplied, just the specified events will be fired with the `ui5-` prefix **only**.
  All other events will be fired normally - once with the prefix, and once without it.
  The format of this object is as follows:
 ```json
 {
	 "events": ["selection-change", "header-click"]
 }
 ```
**Note:** Please, note that other keys may be added to this object in the future for the purpose of name conflict resolution.

In the above example, only the `selection-change` and `header-click` events will be fired with a prefix.
You can still use them by listening to `ui5-selection-change` and `ui5-header-click`, but the names `selection-change` and `header-click` will be
free for use by other UI components and libraries without name collision.

### formatSettings
<a name="formatSettings"></a>

This setting allows to override locale-specific settings for date-related controls. 

For example, to force the first day of week to Sunday, no matter the locale:

```json
{
	"formatSettings": {
		"firstDayOfWeek": 0
	}
}
```

Setting     |             Values              |    Default Value    |                  Description
-------------- | ------------------------------- | ------------------- | ----------------------------------------------
firstDayOfWeek | 0 (Sunday) through 6 (Saturday) | *Depends on locale* | When set, overrides the locale's default value

**Note:** Currently, only `firstDayOfWeek` is supported. More settings may be added in the future.

### fetchDefaultLanguage
<a name="fetchDefaultLanguage"></a>

As described in the `language` configuration option section, the `en` language is built in all components that have translatable texts.
All other languages are fetched as additional assets. 

Normally, you would never want to change that setting, but if for technical reasons you prefer even the default language to be fetched
over the network, although it's built-in, then set `fetchDefaultLanguage` this to `true`

Example:
```html
<script data-ui5-config type="application/json">
{
	"fetchDefaultLanguage": true
}
</script>
```

## Configuration Script
<a name="script"></a>

In order to provide configuration settings, include a ```<script>``` element in your HTML page with:
 - `data-ui5-config` attribute
 - `type="application/json"` attribute


Provide the desired configuration settings in a JSON object, as shown in the example below.

Example:

```html
<script data-ui5-config type="application/json">
{
	"theme": "sap_belize_hcb",
	"language": "ja",
	"animationMode": "none",
	"calendarType": "Japanese",
	"formatSettings": {
		"firstDayOfWeek": 0
	},
	"noConflict": {
		"events": ["selection-change", "header-click"]
	},
	"fetchDefaultLanguage": true
}
</script>
```

## Configuration Module Imports
<a name="imports"></a>

The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.

To do so, please import the desired functionality from the respective `"@ui5/webcomponents-base/dist/config/"` module.

 - `theme`

```js
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
```
 - `language`

```js
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
```
 - `animationMode`

```js
import { getAnimationMode, setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
```

 - `calendarType` - can only be set initially in the configuration script.

```js
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
```

 - `noConflict`

```js
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
```

 - `formatSettings` - can only be set initially in the configuration script.

```js
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
```

 - `fetchDefaultLanguage`

```js
import { getFetchDefaultLanguage, setFetchDefaultLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
```

Next: [Right-To-Left (RTL) And Compact Mode](../rtl-and-compact-mode)
