# Customizing fonts

## The `data-ui5-font-face` font-face `style` tag

Upon `boot`, the `UI5 Web Components` framework creates a `<style data-ui5-font-face>` tag in the `<head>` in order to load the necessary fonts.

It may look something like this:

```html
<style type="text/css" data-ui5-font-face="">
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),
			url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff?ui5-webcomponents) format("woff");
	}
	
	................
</style>
```

*Important: * Notice the `data-ui5-font-face` attribute. It is unique and recognized by `UI5 Web Components`.

## Customizing fonts

You might need to customize fonts for several reasons: 
 - In order to provide different paths for the fonts (e.g. no public internet connection on the server)
 - Provide additional declarations inside `@font-face`
 - Download additional fonts, such as f.e. `72-Light`
 - Not download any of the default fonts

In order to do that, just create a `<style type="text/css" data-ui5-font-face="">` tag in the `head` of your HTML page and 
provide arbitrary content for it.

Then, when the `UI5 Web Components` framework boots, it will detect the existence of this tag by the `data-ui5-font-face`
attribute, and will not create it. The one you provided will be ued instead.

## Example

In order to use the `72-Light` font in your app, and have an additional setting (`font-display`), you could add the following markup in the `<head>` of your HTML page:

```html
    <style type="text/css" data-ui5-font-face="">
        @font-face {
            font-family: "72";
            font-style: normal;
            font-weight: 200;
            font-display: swap;
            src: local("72-Light"),
            url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),
            url(https://ui5.sap.com/sdk/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff?ui5-webcomponents) format("woff");
        }
    </style>
```
