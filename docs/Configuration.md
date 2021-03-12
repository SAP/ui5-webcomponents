# Configuration


## Configuration settings

There are several configuration settings that affect all UI5 Web Components globally.

|                    Setting                    |                                                   Values                                                    | Default value |                                                                                   Description                                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [theme](#theme)                               | sap_fiori_3, sap_fiori_3_dark, sap_fiori_3_hcb, sap_fiori_3_hcw, sap_belize, sap_belize_hcb, sap_belize_hcw | sap_fiori_3   | Visual theme                                                                                                                                                                    |
| language                                      | en, de, es, etc...                                                                                          | en            | Language to be used for translatable texts                                                                                                                                      |
| [animationMode](#animationMode)               | full, basic, minimal, none                                                                                  | full          | Defines different animation scenarios or levels                                                                                                                                 |
| calendarType                                  | Gregorian, Islamic, Buddhist, Japanese, Persian                                                             | Gregorian     | Default calendar type for date-related web components                                                                                                                           |
| [noConflict](#noConflict)                     | true, false                                                                                                 | false         | When set to true, all events will be fired with a "ui5-" prefix only                                                                                                            |
| [formatSettings](#formatSettings)             | See the [Format settings](#formatSettings) section below                                                    | Empty object  | Allows to override locale-specific configuration                                                                                                                                |
| [fetchDefaultLanguage](#fetchDefaultLanguage) | true, false                                                                                                 | false         | The default language is inlined at build time and will be used. Change this to `true` if you want the i18n to be always fetched from the network even for the default language. |

### Content Density

UI5 Web Components contain different content densities for certain controls that allow your app to adapt to the device in question, allowing you to display larger controls for touch-enabled devices, and a smaller more compact design for devices that are operated by mouse. Cosy size is the default density for all components. Compact size could be set by adding a class `ui5-content-density-compact` to an html element. It cascades all the way down and enforces compact density (smaller margins/paddings, smaller touch areas, etc).

### Theme
<a name="theme"></a>
The `theme` setting values above are the technical names of our themes.
- The `sap_fiori_3` is known as `Quartz Light` and it`s the default theme.
- The `sap_fiori_3_dark` is known as `Quartz Dark`.
- The `sap_fiori_3_hcb` is known as `Quartz High Contrast Black`.
- The `sap_fiori_3_hcw` is known as `Quartz High Contrast White`.
- The `sap_belize` is known as `Belize`.
- The `sap_belize_hcb` is known as `High Contrast Black`.
- The `sap_belize_hcw` is known as `High Contrast White`.

<a name="rtl"></a>
### RTL
**Deprecated as of 1.0.0-rc.8**

In order to have RTL mode, just set the HTML attribute `dir` to `rtl` on the `body`, `html` or any other relevant region of your application.

The `RTL` configuration setting should not be used by applications. It is only internally used for specific integration scenarios.

*Note:* Whenever you change `dir` dynamically, make sure you call the `applyDirection` method to re-render the RTL-aware components.

Example:
```js
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

document.body.dir = "rtl";
applyDirection();
```


### Animation Mode
<a name="animationMode"></a>

Animation modes allow to specify different animation scenarios or levels.
 - When `full`, all animations run unrestricted.
 - When `basic`, more light-weight set of animations would run.
 - When `minimal`, animations of fundamental functionalities are included.
 - When `none`, all animations are completely suspended.

*Please note that each component determines which animations would run for a specific mode.*

<a name="noConflict"></a>
### No conflict

By default UI5 Web Components fire all custom events twice - once with the documented name (e.g. `change`), and once more with a `ui5-` prefix (e.g. `ui5-change`).
For example, when the `ui5-switch` is toggled, it fires a `change` event, but also a `ui5-change` event.

The `noConflict` configuration setting allows certain control over this behavior:
 - When `false` (default value) all custom events are fired with and without the `ui5-` prefix.
 - When `true` all custom events are fired with the `ui5-` prefix **only**.
 This is handy for example, if the name of an event happens to collide with the name of an event provided by a third-party library.
 - When an object is supplied, just the specified events will be fired with the `ui5-` prefix **only**.
 All other events will be fired normally - once with the prefix, and once without it.
 The format of this object is as follows:
 ```json
 {
	 "events": ["selection-change", "header-click"]
 }
 ```
 *Please note that other keys may be added to this object in the future for the purpose of name conflict resolution.*

 In the above example, only the `selection-change` and `header-click` events will be fired with a prefix.
 You can still use them by listening to `ui5-selection-change` and `ui5-header-click`, but the names `selection-change` and `header-click` will be
 free for use by other UI components and libraries without name collision.

### Format settings
<a name="formatSettings"></a>

For example, to force the first day of week to Sunday, no matter the locale:

```json
{
	"formatSettings": {
		"firstDayOfWeek": 0
	}
}
```

   Setting     |             Values              |    Default value    |                  Description
-------------- | ------------------------------- | ------------------- | ----------------------------------------------
firstDayOfWeek | 0 (Sunday) through 6 (Saturday) | *Depends on locale* | When set, overrides the locale's default value


### Fetching the default language
<a name="fetchDefaultLanguage"></a>

All texts used by components are inlined during build time so that components look and feel normally when prototyping. The inlined text is decided at build time (`en` unless configured otherwise).

Since the default language is inlined, it makes no sense to fetch it again from the network along with the normal assets for other locales, so the default behaviour is to use the inlined text.

If for some reason it is necessary to fetch the default language text from the network as well, use this setting.

Example:
```html
<script data-ui5-config type="application/json">
{
	"fetchDefaultLanguage": true
}
</script>
```

## Configuration script

In order to provide configuration settings, include the following ```<script>``` element in your HTML page:

```html
<script data-ui5-config type="application/json">
{
	"language": "ja",
	"calendarType": "Japanese",
	"formatSettings": {
		"firstDayOfWeek": 0
	},
	"theme": "sap_belize_hcb",
	"noConflict": {
		"events": ["selection-change", "header-click"]
	}
}
</script>
```

Provide the desired options in the JSON object, as shown in the example.

## Configuration Module Imports

The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.

To do so, please import the desired functionality from the respective `"@ui5/webcomponents-base/dist/config/"` module.

```js
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage, setLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
```
