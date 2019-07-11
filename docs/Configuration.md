# Configuration


## Configuration settings

There are several configuration settings that affect all UI5 Web Components globally.

  Setting    |                     Values                      | Default value |                          Description
------------ | ----------------------------------------------- | ------------- | -------------------------------------------------------------
theme        | sap_fiori_3, sap_belize, sap_belize_hcb         | sap_fiori_3   | Visual theme
language     | en, de, es, etc...                              | en            | Language to be used for translatable texts
RTL*         | true, false                                     | false         | When true, sets global text direction to right-to-left
compactSize  | true, false                                     | false         | When set, enforces compact density (smaller margins/paddings)
calendarType | Gregorian, Islamic, Buddhist, Japanese, Persian | Gregorian     | Default calendar type for date-related web components
noConflict** | true, false | Object                            | false         | When set to true, all events will be fired with a "ui5-" prefix only

`*` When the `rtl` setting is set to `true`, UI5 Web Components will adjust their styling accordingly.
However, you should also set the HTML attribute `dir` to `rtl` on the `body` or `html` or any other relevant region of your application
so that the rest of your application is also affected. 

`**` By default UI5 Web Components fire all custom events twice - once with the documented name (f.e. `change`), and once more with a `ui5-` prefix (f.e. `ui5-change`).
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

## Configuration script

In order to provide configuration settings, include the following ```<script>``` element in your HTML page:

```html
<script data-ui5-config type="application/json">
{
	"rtl": true,
	"compactSize": true,
	"language": "ja",
	"calendarType": "Japanese",
	"theme": "sap_belize_hcb",
	"noConflict": {
		"events": ["selectionChange", "headerClick"]
	}
}
</script>
```

and provide the desired options in the JSON object inside, as shown in the example.

## Configuration Module Import

The configuration script is used to set the initial configuration in a declarative manner.
However, reading/modifying the configuration reliably can only be done programmatically.

To do so, please import the desired functionality from the `"@ui5/webcomponents-base/dist/Configuration.js"` module.

For example:
```js
import { getTheme, setTheme, getCompactSize } from "@ui5/webcomponents-base/dist/Configuration.js";
``` 

Here is a full list of the public functions, exported by `Configuration.js`

Setting | Getter | Setter
--------|--------|-------
theme   | getTheme() | setTheme(theme)
RTL   | getRTL() | *N/A*
language   | getLanguage() | *N/A*
compactSize   | getCompactSize() | *N/A*
calendarType   | getCalendarType() | *N/A*
noConflict | getNoConflict() | SetNoConflict(noConflictData)

