---
title: Custom Themes
---

# Creating Custom Theme

The article describes the steps to manually create a custom theme for your UI5 Web Components project without any tools.

<b>Note:</b>  We recommend using the `UI Theme Designer` tool to effortlessly create a custom theme for your UI5 Web Components project as described in the [Custom Theming with UI Theme Designer](12-theming.md) article.
However, it requires SAP BTP account and configuration in the SAP BTP Cockpit. In case you don't have access to the UI Theme Designer, this article is for you.


# Preface

The theming of the UI5 Web Components is based entirely on CSS variables. Switching between themes means changing the values of these CSS Variables. Applying a custom theme means setting custom values for these CSS Variables.

The CSS variables (used by the UI5 Web Components) are maintained in the [theming-base-content](https://github.com/SAP/theming-base-content) project and available also on NPM: [@sap-theming/theming-base-content](https://www.npmjs.com/package/@sap-theming/theming-base-content). The great thing is that they are backward compatible - new variables may be added, but old are kept and could be safely used.
For instance, you can explore the [Morning Horizon CSS Variables](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css). These are exactly the CSS variables being applied when the theme is set to Morning Horizon("sap_horizon").

So far we have the ingredients - the CSS variables. Now, we need to learn what's the easiest way to change them.

At this point, you may ask, can't I just copy the [Morning Horizon CSS Variables](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.css), 
change some of the values and finally include the CSS file in my app? And, the answer is yes - you can do that and it will work. Whatever CSS variables you change, the changes will take effect. However, this is not the most effective way.

Instead, it's best to change the source `.less` file (also available in [theming-base-content](https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/sap_horizon/css_variables.less)), change some `Less` variables and compile it to CSS. Let's see how this could be implemented.

## Creating a Custom Theme


### 1. Using the "@sap-theming/theming-base-content"

- Create a blank project.

```bash
mkdir create-custom-theme
cd create-custom-theme
npm init
```

- Install `@sap-theming/theming-base-content` from NPM to get the source `.less` files of the themes we are going to extend.
```bash
npm install @sap-theming/theming-base-content
```

- Create a single less file `src/mytheme.less`.

- Import source less file of `sap_horizon`.

```less
// src/mytheme.less

@import "../../node_modules/@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";
```

### 2. Customizing variables

You are free to change the values of as many variables as you want.
However, we mostly recommend changing the main ones `sapPrimary1` - `sapPrimary7` as most of the variables are derived from them.

```less
// src/mytheme.less
@import "@sap-theming/theming-base-content/content/Base/baseLib/sap_horizon/css_variables.less";

@sapPrimary1: violet;
@sapPrimary2: violet;
```

### 3. Generating the custom CSS variables

- Install `less` to compile `less` to `css`.

```bash
npm install less --save-dev
```

- Create a simple script in the project's root, called `customtheme.js`

```js
const less = require('less');
const fs = require('fs');

const themeName =  "mytheme";
const baseThemeName = "sap_horizon";

const CUSTOM_THEME_METADATA = `
.sapThemeMetaData-Base-baseLib {
	background-image: url('data:text/plain;utf-8, { "Path": "Base.baseLib.${themeName}.css_variables", "Extends": ["${baseThemeName}","baseTheme"]}');
}`;

async function compileLess(inputFile, outputFile) {
	if (!fs.existsSync("dist")) {
		fs.mkdirSync("dist");
	}

    try {
      const lessData = await fs.promises.readFile(inputFile, 'utf-8');

      const { css } = await less.render(lessData, {
         filename: inputFile
      });
      const output = `${CUSTOM_THEME_METADATA} ${css}`;

      await fs.promises.writeFile(outputFile, output, {encoding:'utf8',flag:'w'});
      console.log(`Successfully compiled Less file ${inputFile} to CSS file ${outputFile}`);

    } catch (error) {
      console.error('Error compiling Less:', error);
    }
}

compileLess('src/mytheme.less', 'dist/mytheme.css');
```


The script runs the `less` compiler over the `.less` file (`src/mytheme.less`) to produce a `.css` out of it (`dist/mytheme.css`)
and adds a small piece of metadata (see `CUSTOM_THEME_METADATA` variable), required by the UI5 Web Components framework to detect the custom theme.


- Create a task in the `package.json` for convenience
```json
"scripts": {
    "build:theme": "node customtheme.js"
}
```

- Run the task
```bash
npm run build:theme
```


**That's it! The task outputs the CSS variables into the `dist/mytheme.css` file.**


## Using a Custom Theme


### 1. Adding the custom CSS
Now that you have generated the custom CSS, you need to add it to your project.

- The simplest option would be to use a `<link>` tag and point to the file:

```html
<link rel="stylesheet" type="text/css" href="<path-to-your-css-file>/mytheme.css">
```

- Or, use `<style>` tag and paste the content of `mytheme.css` inside:
```html
<style>
         /* Here goes the content of mytheme.css */
</style>
```

- Most of the modern build tools know how to handle CSS imports and could add the imported CSS file content as `style` tag for us:

```ts
import "<path-to-your-css-file>/mytheme.css";
```


### 2. Configuring the custom theme

In the previous step we loaded the CSS, now we only need to set it to the UI5 Web Components.
To do so, you can use one of the standard APIs for setting a theme:

- With URL parameter: `index.html?sap-ui-theme=mytheme`

- With JS API:
```ts
import { getTheme, setTheme } from "@ui5/webcomponents-base/dist/config/Theme.js";

setTheme("mytheme");
```

# Resources

Everything said so far is implemented in the following demo project - [ui5-webcomponents-custom-theme](https://github.com/ilhan007/ui5-webcomponents-custom-theme/).
The project implements the script for producing the custom CSS vars and provides a simple test page to demonstrate the custom theme usage.
