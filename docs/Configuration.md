# Configuration


## Configuration settings

There are several configuration settings that affect all UI5 Web Components globally.

  Setting    |                     Values                      | Default value |                          Description
------------ | ----------------------------------------------- | ------------- | -------------------------------------------------------------
theme        | sap_fiori_3, sap_belize, sap_belize_hcb         | sap_fiori_3   | Visual theme
language     | en, de, es, etc...                              | en            | Language to be used for translatable texts
[RTL](#rtl)          | true, false                                     | false         | When true, sets global text direction to right-to-left
compactSize  | true, false                                     | false         | When set, enforces compact density (smaller margins/paddings)
[animationMode](#animationMode)  | full, basic, minimal, none  | full          | Defines different animation scenarios or levels
calendarType | Gregorian, Islamic, Buddhist, Japanese, Persian | Gregorian     | Default calendar type for date-related web components
[noConflict](#noConflict)  | true, false | Object                            | false         | When set to true, all events will be fired with a "ui5-" prefix only
[formatSettings](#formatSettings)| See the [Format settings](#formatSettings) section below		| Empty object | Allows to override locale-specific configuration

<a name="rtl"></a>
### RTL
 
When the `rtl` setting is set to `true`, UI5 Web Components will adjust their styling accordingly.
However, you should also set the HTML attribute `dir` to `rtl` on the `body` or `html` or any other relevant region of your application
so that the rest of your application is also affected. 

<a name="animationMode"></a>
### Animation Mode

Animation modes allow to specify different animation scenarios or levels.
 - When `full` all animations run unrestricted.
 - When `basic` more light-weight set of animations would run.
 - When `minimal` animations of fundamental functionality are included.
 - When `none` all animations are completely suspended.

*Please note that each component determines which animations would run for a specific mode.*

<a name="noConflict"></a>
### No conflict

By default UI5 Web Components fire all custom events twice - once with the documented name (f.e. `change`), and once more with a `ui5-` prefix (f.e. `ui5-change`).
For example, when the `ui5-switch` is toggled, it fires a `change` event, but also a `ui5-change` event.

The `noConflict` configuration setting allows certain control over this behavior:
 - When `false` (default value) all custom events are fired with and without the `ui5-` prefix.
 - When `true` all custom events are fired with the `ui5-` prefix **only**. 
 This is handy for example if the name of some event happens to collide with the name of an event provided by a third-party library.
 - When an object is supplied, just the specified events will be fired with the `ui5-` prefix **only**.
 All other events will be fired normally - once with the prefix, and once without. 
 The format of this object is as follows:
 ```json
 {
	 "events": ["selectionChange", "headerClick"]
 }
 ```
 *Please note that other keys may be added to this object in the future for the purpose of name conflict resolution.*
 
 In the above example, only the `selectionChange` and `headerClick` events will not be fired without a prefix. 
 You can still use them by listening to `ui5-selectionChange` and `ui5-headerClick`, but the names `selectionChange` and `headerClick` will be
 free for use by other UI components and libraries without name collision.

<a name="formatSettings"></a>
### Format settings

For example, to force the first day of week to Sunday, no matter the locale:

```json
{
	"formatSettings": {
		"firstDayOfWeek": 0
	}
}
```

  Setting    |                     Values                      | Default value |                          Description
------------ | ----------------------------------------------- | ------------- | -------------------------------------------------------------
firstDayOfWeek | 0 (Sunday) through 6 (Saturday) | *depends on locale*     | When set, overrides the locale's default value


## Configuration script

In order to provide configuration settings, include the following ```<script>``` element in your HTML page:

```html
<script data-ui5-config type="application/json">
{
	"rtl": true,
	"compactSize": true,
	"language": "ja",
	"calendarType": "Japanese",
	"formatSettings": {
		"firstDayOfWeek": 0
	},
	"theme": "sap_belize_hcb",
	"noConflict": {
		"events": ["selectionChange", "headerClick"]
	}
}
</script>
```

and provide the desired options in the JSON object inside, as shown in the example.

## Configuration Module Imports

The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.

To do so, please import the desired functionality from the respective `"@ui5/webcomponents-base/dist/config/"` module.

```js
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { getNoConflict, setNoConflict } from "@ui5/webcomponents-base/dist/config/NoConflict.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/CompactSize.js";
import { getRTL } from "@ui5/webcomponents-base/dist/config/RTL.js";
import { getCompactSize } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";
import { getLanguage } from "@ui5/webcomponents-base/dist/config/Language.js";
import { getCalendarType } from "@ui5/webcomponents-base/dist/config/CalendarType.js";
import { getFirstDayOfWeek } from "@ui5/webcomponents-base/dist/config/FormatSettings.js";
```
