# Custom Theming with `SAP Theme Designer`

UI5 Web Components are fully compatible with `SAP Theme Designer`. You can create your own theme and effortlessly 
integrate it in your UI5 Web Components project on HTML level! On top, this does not prevent you from switching to
and from officially supported themes, while having your own.  

Follow this simple tutorial to get a custom theme running with UI5 Web Components in 5 minutes:

1. Open **SAP Theme Designer**.

	Go to [ui5.sap.com](https://ui5.sap.com) and select `Tools` -> `UI Theme Designer` from the menu, or just follow the
	[direct link](https://themedesigner-themedesigner.dispatcher.hanatrial.ondemand.com/index.html).

2. Create your **custom theme**.

	Give your theme a **name** and change a couple of parameters. The name you chose will be the one you'll use in order to 
	switch to your custom theme, for example if you call it `mytheme`:

	`index.html?sap-ui-theme=mytheme`

3. Export the custom theme:

	Make sure you click the `export parameters` option. 
	
	Your browser will then download a `.zip` file with the name of your new theme, e.g. `mytheme.zip`.
	
4. Copy the `css_variables.css` file with all CSS Variables for your custom theme to your project.

	You can find this file inside the `.zip` in the `\Base\baseLib\<your theme name>\` directory. 
	
	For example: `mytheme.zip\Base\baseLib\mytheme\css_variables.css`.
	
	Just copy this file to a directory in your project where it can be statically served.
	
5. Include the file in your project's `.html` page:

	The simplest option would be to use a `<link>` tag and point to where you copied the file: 

	```html
	<link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/css_variables.css">
	```
	
	but you could as well use a `<style>` tag and paste the content of `css_variables.css` inside, 
	if that's what you prefer:
	
	```html
    <style>
   		/* Here goes the content of css_variables.css */
    </style>
    ```
	
And that's it! Now you can use your custom theme by setting it either in the URL of your page,
or in your configuration script:

`index.html?sap-ui-theme=mytheme`

or

```html
<script data-ui5-config type="application/json">
{
	"theme": "mytheme"
}
</script>
```

*Note:* Using a custom theme does not prevent you from using the official themes. You can freely switch to and from them.

```js
import { setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";
setTheme("sap_fiori_3");
...
setTheme("mytheme");
...
setTheme("sap_fiori_3_dark");
```

For more on configuring themes, see [Configuration](Configuration.md).
 	
