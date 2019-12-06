#Creating a package

This tutorial explains how to:
 - create an NPM package for your own UI5 Web Components
 - use UI5 Web Components' standard build tools: `@ui5/webcomponents-tools`
 - gain all `@ui5/webcomponents` capabilities such as HBS template support, i18n, theming, test setup, etc... 
 
*Note:* Whether you use `npm` or `yarn` is a matter of preference.
 
## Step 1 - create an empty NPM package

`npm init`

or

`yarn init`

The name that you give to your package will be used by the UI5 Web Components tools as the default namespace for resource registration.

## Step 2 - add the UI5 Web Components packages as dependencies

`npm i --save @ui5/webcomponents-base @ui5/webcomponents-theme-base @ui5/webcomponents-tools`

or

`yarn add @ui5/webcomponents-base @ui5/webcomponents-theme-base @ui5/webcomponents-tools` 

These 3 will serve as foundation for your own package and web components.

Package | Description
----------------|-----------------------
`@ui5/webcomponents-base` | Base classes and Framework
`@ui5/webcomponents-theme-base` | Base theming assets
`@ui5/webcomponents-tools` | Build and configuration assets

## Step 3 - run the package initialization script

First, install [npx](https://www.npmjs.com/package/npx) if you don't have it:

`npm i -g npx`

and then execute the initialization script, optionally with parameters from the following table:

Parameter | Description | Default value
----------|-------------|--------------
name | Resource registration namespace | The `name` property from `package.json`
port | Dev server port | 8080
tag | The sample web component's tag name | ui5-demo

For example: 

`npx wc-init-ui5-package`

to get all the default values, or:

`npx wc-init-ui5-package --port=8081 --tag=ui5-my-new-component`

to change the port and the tag of the sample web component that will be created in the empty package.

## Step 4 - run the dev server and test the build

To run the dev server:

`npm run start`

or 

`yarn start`

and once the project is built for the first time, open in your browser:

`http://localhost:8080/test-resources/pages/index.html`

*Note:* If you chose a different port earlier, change 8080 ot its value.

You can also run the tests:

`npm run test`

or

`yarn test`

and the production build:

`npm run build`

or

`yarn build`.

That's it!

## Understanding the project structure

### package.json

The initialization script will create several NPM scripts for you in `package.json`.

Task | Purpose
-----|-------
clean | Deletes the `dist/` directory with the build output
build | Production build to the `dist/` directory
lint | Run a static code scan with `eslint`
start | Build the project for development and run the dev server
test | Run the test specs from the `test/specs/` directory
create-ui5-element | Creates an empty web component with the given name

### Files in the main directory

The initialization script will create several files in yout package's main directory.

File | Purpose
------|-------
.eslintignore | Excludes the `dist/` directory from static code scans
package-scripts.js | An [nps](https://www.npmjs.com/package/nps) package scripts configuration file
bundle.esm.js | Entry point for the ES6 bundle, used for development and tests. Intended for modern browsers.
bundle.es5.js | Entry point for the ES5 bundle, used for development and tests. Intended for IE11 only.

You'll likely only need to change `bundle.esm.js` to import your new components there.

### The `config/` directory

The `config/` directory serves as a central place for most build and test tools' configuration assets. Normally you 
wouldn't need to change any files there.

### The `src/` directory

This is where you'll do most of the development. 
Let's see the necessary files for a `ui5-demo` component.

#### Class and template files

The main files describing a web component are:

File | Purpose
------------|-------------
`src/Demo.js` | Web component class
`src/Demo.hbs` | Handlebars template

#### Theming-related files

A single set of CSS rules will be used for all themes. The only difference between themes may be the values of CSS Variables.
Some CSS Vars, such as `--sapBackgroundColor` and `--sapTextColor` are standard and automatically managed by the framework.
In addition, you can define your own CSS Vars and provide different values for them for the different themes. Set these CSS Vars in the
`parameters-bundle.css` file for each theme. These files are the entry points for the styles build script.

File | Purpose
------------|-------------
`src/DefaultTheme.js` | This file is automatically used by the framework. It imports assets for the default theme. It is a central file for the whole package and normally you don't need to modify it.
`src/themes/Demo.css` | All CSS rules for the web component, same for all themes. Will be inserted in the shadow root.
`src/themes/sap_belize/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_belize` theme *
`src/themes/sap_belize_hcb/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_belize_hcb` theme *
`src/themes/sap_fiori_3/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_fiori_3` theme *
`src/themes/sap_fiori_3_dark/parameters-bundle.css` | Values for the component-specific CSS Vars for the `sap_fiori_3_dark` theme *

*Note:* It's up to you whether to put the CSS Vars directly in the `parameters-bundle.css` files for the different themes or to 
import them from separate `.css` files. You could have for example a `Demo-params.css` file for each theme and
import it into the `parameters-bundle.css` file: `@import "Demo-params.css";`.

#### i18n files

You can define translatable texts as key-value pairs, separated by `=` in the `messagebundle.properties` file. Then you can provide translations for as many languages
as needed.

File | Purpose
------------|-------------
`src/i18n/messagebundle.properties` | Source file for all translatable texts
`src/i18n/messagebundle_de.properties` | Translations in German
`src/i18n/messagebundle_en.properties` | Translations in English
etc... | etc...

#### JSON imports

These files are generated by the initialization script for you and serve as convenient entry points for your theming assets
and i18n assets respectively. Import these files in your production applications in order to provide additional themes support
and i18n support. These files are also included in the dev/test bundle `bundle.esm.js`

File | Purpose
------------|-------------
`src/json-imports/i18n.js` | Import here all translation files: `messagebundle_*.properties`
`src/json-imports/Themes.js` | Import here the CSS Vars for all themes

*Note:* The build script generates `.json` files for all i18n and theming resources in `dist/assets/`, hence the import paths. 

### The `test/` directory

File | Purpose
------------|-------------
`test/pages/*` | Simple `.html` pages used for development and tests
`src/specs/*` | Test specs, based on [WDIO](https://www.npmjs.com/package/wdio). They use the test pages for setup.

You can execute all specs by running `yarn test` or `npm run test`.
