# Configuration


## Configuration settings

There are several configuration settings that affect all UI5 Web Components globally.

  Setting    |                     Values                      | Default value |                          Description
------------ | ----------------------------------------------- | ------------- | -------------------------------------------------------------
theme        | sap_fiori_3, sap_belize, sap_belize_hcb         | sap_fiori_3   | Visual theme
language     | en, de, es, etc...                              | en            | Language to be used for translatable texts
rtl          | true, false                                     | false         | When true, sets global text direction to right-to-left
compactSize  | true, false                                     | false         | When set, enforces compact density (smaller margins/paddings)
calendarType | Gregorian, Islamic, Buddhist, Japanese, Persian | Gregorian     | Default calendar type for date-related web components

## Configuration script

In order to provide configuration settings, include the following ```<script>``` element in your HTML page:

```html
<script data-id="sap-ui-config" type="application/json">
{
	"rtl": true,
	"compactSize": true,
	"language": "ja",
	"calendarType": "Japanese",
	"theme": "sap_belize_hcb"
}
</script>
```

and provide the desired options in the JSON object inside, as shown in the example.
