# Custom Fonts

## The `data-ui5-font-face` Font-Face `style` Tag

Upon `boot`, the UI5 Web Components framework creates a `<style data-ui5-font-face>` tag in the `<head>` in order to load the necessary fonts.

For example:

```html
<style type="text/css" data-ui5-font-face="">
	@font-face {
		font-family: "72";
		font-style: normal;
		font-weight: 400;
		src: local("72"),
			url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2");
	}
	
	................
</style>
```

**Important:** Notice the `data-ui5-font-face` attribute. It is unique and recognized by UI5 Web Components.

## Customizing Fonts

You might need to customize fonts for several reasons: 
 - To provide different paths for the fonts (e.g. no public internet connection on the server).
 - To provide additional declarations inside `@font-face`.
 - To download additional fonts, such as e.g. `72-Light`.
 - Not to download any of the default fonts.

To do that, just create a `<style type="text/css" data-ui5-font-face="">` tag in the `head` of your HTML page and 
provide arbitrary content for it.

Then, when the UI5 Web Components framework boots, it will detect the existence of this tag by the `data-ui5-font-face`
attribute, and will not create it. The one you provided will be used instead.

## Example

In order to use the `72-Light` font in your app and have an additional setting (`font-display`), you could add the following markup in the `<head>` of your HTML page:

```html
    <style type="text/css" data-ui5-font-face="">
        @font-face {
            font-family: "72";
            font-style: normal;
            font-weight: 200;
            font-display: swap;
            src: local("72-Light"),
            url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_fiori_3/fonts/72-Light.woff2?ui5-webcomponents) format("woff2");
        }
    </style>
```
