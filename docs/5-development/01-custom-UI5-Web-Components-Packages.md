# Creating a Custom UI5 Web Components Package

This tutorial explains how to:
 - Create an NPM package for your own UI5 Web Components.
 - Use UI5 Web Components' standard build tools: `@ui5/webcomponents-tools`.
 - Gain all `@ui5/webcomponents` capabilities such as HBS template support, i18n, theming, test setup, etc.

**Note:** Whether you use `npm` or `yarn` is a matter of preference.

## Step 1. Create an NPM package.

### Run the init command.

**Note:** The following command will **create a new directory** and initialize your package there.
Make sure you haven't created a directory yourself.

 - With **npm**:

	`npm init @ui5/webcomponents-package`
   
	or
   
    `npm init @ui5/webcomponents-package <NEW-PACKAGE-NAME>`


 - With **yarn**:

	`yarn create @ui5/webcomponents-package`

    or

    `yarn create @ui5/webcomponents-package <NEW-PACKAGE-NAME>`

where `<NEW-PACKAGE-NAME>` is the name of your new package (and the name of the directory to be created), for example:

`npm init @ui5/webcomponents-package my-components`

will create a `my-components` directory and initialize the package there.

### Follow the prompts.

The initialization script will ask you to choose:
 - The **name** of your package (if you did not already pass a name when running the command above);
 - The **port** for your dev server (`8080` by default - just press Enter to select this);
 - The **tag** of the sample web component that will be created (`my-first-component` by default - just press Enter to select this).

### Your package is ready!

Just follow the instructions:

 - `cd <NEW-PACKAGE-NAME>`
 - `npm i` (or `yarn` if you prefer)
 - `npm start` (or `yarn start` if you prefer)

## Step 2. Run the dev server and test the build.

To run the dev server, as instructed above:

`npm run start`

or

`yarn start`

and once the project is built for the first time, the browser will automatically open the dev server URL.

You can also run the tests:

`npm run test`

or

`yarn test`

and the production build:

`npm run build`

or

`yarn build`.

**Note:** In order to run the tests for the first time, you must have built the project with either `start` or `build`.

That's it!

## Understanding the Project Structure

### `package.json`

The initialization script will add several packages as dependencies.
These three `@ui5/` packages will serve as the foundation of your own package and Web Components.

| Package                         | Type of Dependency | Description                          |
|---------------------------------|--------------------|--------------------------------------|
| `@ui5/webcomponents-base`       | `dependency`       | Base classes and framework           |
| `@ui5/webcomponents-theming` | `dependency`       | Base theming assets                  |
| `@ui5/webcomponents-tools`      | `devDependency`    | Build tools and configuration assets |

The initialization script will create several NPM scripts for you in `package.json`.

| Task               | Purpose                                                                      |
|--------------------|------------------------------------------------------------------------------|
| clean              | Delete the `dist/` directory with the build output.                          |
| build              | Production build to the `dist/` directory.                                   |
| lint               | Run a static code scan with `eslint`.                                        |
| start              | Build the project for development, run the dev server and watch for changes. |
| watch              | Watch for changes only.                                                      |
| serve              | Run the dev server only.                                                     |
| test               | Run the dev server and execute the specs from the `test/specs/` directory.   |
| create-ui5-element | Create an empty Web Component with the given name.                           |

### Files in the main directory

The initialization script will create several files in your package's main directory.

| File               | Purpose                                                                         |
|--------------------|---------------------------------------------------------------------------------|
| .eslintignore      | Excludes the `dist/` and `test/` directories from static code scans.            |
| package-scripts.js | An [nps](https://www.npmjs.com/package/nps) package scripts configuration file. |
| bundle.js          | Entry point for the bundle used for development and tests.                      |

You'll likely only need to change `bundle.js` to import your new components there.

### The `config/` directory

The `config/` directory serves as a central place for most build and test tools configuration assets. Normally, you
don't need to change any files there.

#### Custom configuration

The files in the `config/` directory simply import UI5 Web Components default configuration for all tasks: `rollup`, `wdio`, `eslint`, etc.

If you need to customize any configuration, simply put your own content into the respective file in `config/`.

Examples:
 - Modifying `eslint` settings.

    Open `config/.eslintrc.js`. It should look like this:
	 ```js
	module.exports = require("@ui5/webcomponents-tools/components-package/eslint.js");
	```
	As you can see, this is just a proxy to UI5 Web Components default configuration.
	Put your own content instead:
	```js
	module.exports = {
    	"env": {
    		"browser": true,
    		"es6": true
    	},
    	"root": true,
    	"extends": "airbnb-base",
   		.............
  	}
	```

 - Modifying `wdio` settings.

    Open `config/wdio.conf.js`. It should look like this:

    ```js
	module.exports = require("@ui5/webcomponents-tools/components-package/wdio.js");
	```

	Again, this is a proxy to UI5 Web Components default configuration.

	You could just paste the content of `@ui5/webcomponents-tools/components-package/wdio.js` here and modify at will.

	However, let's not replace the whole file by hand this time, but just modify the exported configuration object.

	```js
	const result = require("@ui5/webcomponents-tools/components-package/wdio.js");
	result.config.capabilities[0]["goog:chromeOptions"].args = ['--disable-gpu']; // From: ['--disable-gpu', '--headless']
	module.exports = result;
	```

	In this example, what we did was simply replace one option in the configuration object to disable `headless` mode
	so that we can use `browser.debug()` in our `*.spec.js` files. For more on testing, see [Testing Web Components](../testing-ui5-web-components).

### The `src/` directory

This is where you'll do most of the development. Let's see the necessary files for a `my-first-component` component.

#### Class and template files

The main files describing a Web Component are:

| File                       | Purpose             |
|----------------------------|---------------------|
| `src/MyFirstComponent.js`  | Web Component class |
| `src/MyFirstComponent.hbs` | Handlebars template |

In order to understand how a UI5 Web Component works and what lies behind these two files, make sure you check the
[Developing Web Components](../custom-ui5-web-components) section of the documentation.

For the purposes of this tutorial, however, you don't need to understand their internals, as they are automatically generated by the
script and are in a working state already.

#### Theming-related files

A single set of CSS rules will be used for all themes. The only difference between themes may be the values of CSS Variables.
Some CSS Vars, such as `--sapBackgroundColor` and `--sapTextColor` are standard and automatically managed by the framework.
In addition, you can define your own CSS Vars and provide different values for them for the different themes. Set these CSS Vars in the
`parameters-bundle.css` file for each theme. These files are the entry points for the styles build script.

| File                                                | Purpose                                                                                        |
|-----------------------------------------------------|------------------------------------------------------------------------------------------------|
| `src/themes/MyFirstComponent.css`                   | All CSS rules for the Web Component, same for all themes; will be inserted in the shadow root. |
| `src/themes/sap_belize/parameters-bundle.css`       | Values for the component-specific CSS Vars for the `sap_belize` theme                          |
| `src/themes/sap_belize_hcb/parameters-bundle.css`   | Values for the component-specific CSS Vars for the `sap_belize_hcb` theme                      |
| `src/themes/sap_belize_hcw/parameters-bundle.css`   | Values for the component-specific CSS Vars for the `sap_belize_hcw` theme                      |
| `src/themes/sap_fiori_3/parameters-bundle.css`      | Values for the component-specific CSS Vars for the `sap_fiori_3` theme                         |
| `src/themes/sap_fiori_3_dark/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_fiori_3_dark` theme                    |
| `src/themes/sap_fiori_3_hcb/parameters-bundle.css`  | Values for the component-specific CSS Vars for the `sap_fiori_3_hcb` theme                     |
| `src/themes/sap_fiori_3_hcw/parameters-bundle.css`  | Values for the component-specific CSS Vars for the `sap_fiori_3_hcw` theme                     |

**Note:** It's up to you whether to put the CSS Vars directly in the `parameters-bundle.css` files for the different themes or to
import them from separate `.css` files. You could have, for example, a `MyFirstComponent-params.css` file for each theme and
import it into the `parameters-bundle.css` file: `@import "MyFirstComponent-params.css";`.

Again, to know more about how these files work, you could have a look at the [Developing Web Components](../custom-ui5-web-components#css) section of the documentation.

#### i18n files

You can define translatable texts as key-value pairs, separated by `=` in the `messagebundle.properties` file. Then you can provide translations for as many languages
as needed.

| File                                   | Purpose                                |
|----------------------------------------|----------------------------------------|
| `src/i18n/messagebundle.properties`    | Source file for all translatable texts |
| `src/i18n/messagebundle_de.properties` | Translations in German                 |
| `src/i18n/messagebundle_en.properties` | Translations in English                |
| etc.                                   | etc.                                   |

Let's have a look at the sample `messagebundle.properties` file, generated by the script.

```
#please wait text for the sample component
PLEASE_WAIT=wait
```

Here's where you define all i18n texts, optionally with comments for the translators (`# Comment`).

And now let's have a look at a sample file with translations, for example `messagebundle_es.properties`:

```
PLEASE_WAIT=Espere
```

#### Assets (additional themes, i18n texts, etc.)

| File            | Purpose                              |
|-----------------|--------------------------------------|
| `src/Assets.js` | Entry point for your package assets. |


This module imports all base assets (such as `CLDR` and the base theme parameters), but also your own
package assets (i18n and package-specific theme parameters). Users of your package will have to import this module in their production applications in order to get additional themes support and i18n support.

**Note:** For easier development and testing, `Assets.js` is also imported in the dev/test bundle `bundle.esm.js` by the initialization script.

### The `test/` directory

| File           | Purpose                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------|
| `test/pages/*` | Simple `.html` pages used for development and tests.                                                |
| `src/specs/*`  | Test specs, based on [WDIO](https://www.npmjs.com/package/wdio). They use the test pages for setup. |

You can execute all specs by running `yarn test` or `npm run test`.

For more on testing, see our [Testing Web Components](../testing-ui5-web-components) section.

## Public Consumption of Your Custom UI5 Web Components Package

Once you've developed your package and published it to NPM, application developers can import from the `dist/` directory
of your package any of your Web Components, and optionally the `Assets.js` module, if they want additional themes and i18n.

For example, if your package is called `my-ui5-webcomponents`, users will install it by:

```
npm i my-ui5-webcomponents --save
```

and then use it by:

```js
import "my-ui5-webcomponents/Assets.js"; // optional
import "my-ui5-webcomponents/dist/MyFirstComponent.js"; // for my-first-component from this tutorial
import "my-ui5-webcomponents/dist/SomeOtherComponent.js";
import "my-ui5-webcomponents/dist/YetAnotherComponent.js";
```

Next: [Developing Custom UI5 Web Components](../custom-ui5-web-components)
