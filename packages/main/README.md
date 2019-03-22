![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/master/docs/images/UI5_logo_wide.png)

# UI5 Web Components

[![Travis CI Build Status](https://travis-ci.org/SAP/ui5-webcomponents.svg?branch=master)](https://travis-ci.org/SAP/ui5-webcomponents)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

The UI5 Web Components are the new offering of [UI5](https://openui5.org/) to provide a set of reusable UI elements to you which can be used for your static web sites or for web application using any web framework of your choice with a minimalistic footprint. They allow you to create a consistent user experience aligned to the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) and incorporate the Fiori 3 design.

## What are Web Components?

Web Components are a set of features which allow to enhance the HTML vocabulary with custom HTML elements when the standard HTML elements are not sufficient (for example, a Button with an icon or a DatePicker). The custom HTML elements allow to share those features and qualities in a standard way. The complexity of HTML, CSS and components behavior is encapsulated behind a custom HTML element. The interaction with the custom HTML elements is done using the standard DOM API.

## What is UI5/OpenUI5?

[OpenUI5](https://openui5.org/) is a JS framework that lets you build enterprise-ready web applications, responsive to all devices, running on almost any browser of your choice. It's based on JavaScript, using jQuery as its foundation and follows web standards. It eases your development with a client-side HTML5 rendering library including a rich set of controls and supports data binding to different data models (JSON, XML and OData).

## Classification of UI5 Web Components

UI5 Web Components…
* …are **not built on top** of UI5, but rather lightweight and independent UI elements
* …are **not a successor** of UI5, but rather a complementary offering
* …bring the relevant **UI5 qualities and SAP Fiori UX to the HTML level**, usable with any web framework

UI5 Web Components are good for…
* …**static web sites** built without web frameworks, to just add a few interactive UI elements
* …web applications which **already use a different web framework**

UI5 remains what it is: the best choice for…
* …building complete **enterprise-ready and responsive web applications**

## Resources
- [UI5 Web Components](https://sap.github.io/ui5-webcomponents)
- [UI5 Web Components - Playground and API Reference](https://sap.github.io/ui5-webcomponents/playground/)

## Requirements
- [Node.js](https://nodejs.org/) (**version 8.5 or higher** ⚠️)

## Download and Installation
To consume UI5 Web Components, first you need to install the NPM module:

```sh
npm install @ui5/webcomponents
```

Import the desired component(s) in your app to define the UI5 Web Component.

For example, to use ```ui5-button``` you need to import it:

```js
import "@ui5/webcomponents/dist/Button"; // loads ui5-button
```

Then, you can use the custom element in an HTML page:

```html
<ui5-button>Hello world!</ui5-button>
```

## Browser support

Currently only Chrome, Safari and Firefox support Web Components natively.

If your application should run on browsers without native Web Components support (Edge and/or IE11), import one the following modules before your first Web Component import: 

### Edge only

```js
import "@ui5/webcomponents-base/src/browsersupport/Edge";
```

### Edge and IE11

```js
import "@ui5/webcomponents-base/src/browsersupport/IE11";
```

*Note:* Importing the module for IE11 support automatically enables Edge support as well, so there is no need to import them both explicitly.

Example:

```js
import "@ui5/webcomponents-base/src/browsersupport/IE11"; // This will enable Edge and IE11 support for all Web Components below
import "@ui5/webcomponents/dist/Button"; // loads ui5-button
import "@ui5/webcomponents/dist/Label"; // loads ui5-label
```

## Configure
UI5 Web Components have built-in internalization and globalization support. Language, compact/cozy switch, date/time settings and theme can be changed with parameters.

To provide configuration settings, create a ```script``` tag having ```data-id="sap-ui-config"``` and ```type="application/json"```:

```html
<script data-id="sap-ui-config" type="application/json">
{
  "theme": "sap_belize",
  "language": "EN"
}
</script>

```

### Configure RTL
UI5 Web Components support right-to-left text direction (RTL). To enable RTL globally, provide the option ```rtl: true``` in the configuration ```script``` tag:

```html
<script data-id="sap-ui-config" type="application/json">
{
  "language": "EN",
  "rtl": true
}
</script>
```

### Configure Compact/Cozy setting
UI5 Web Components supports ```Compact``` and ```Cozy``` mode. It is set to ```Cozy``` by default. To enable ```Compact``` globally, provide the option ```compactSize: true``` in the configuration ```script``` tag:

```html
<script data-id="sap-ui-config" type="application/json">
{
  "compactSize": true
}
</script>
```

### Configure Calendar Type
UI5 Web Components support different calendar types (Gregorian, Islamic, Japanese, Buddhist and Persian). To change them, provide the option ```calendarType: "Islamic"``` in the configuration ```script``` tag:

```html
<script data-id="sap-ui-config" type="application/json">
{
  "calendarType": "Islamic"
}
</script>
```

## Develop

### Requirements
- [Yarn](https://yarnpkg.com/en)

You can clone the UI5 Web Components repository and start the Playground app with the following commands:

```sh
yarn # to install all dependencies
yarn start # to serve the project
```
This will open the Playground page in the browser!

## Production Build
To build the UI5 Web Components, just run the following commands:

```sh
yarn # to install all dependecies
yarn build # to build the project
```

Afterwards, you can find the static **UI5 Web Components - Playground** in the `dist` folder of the playground.

## FAQ
### What's the thing with Yarn?
In a couple of guides we refer to the [Yarn](https://yarnpkg.com/) node package manager. This is because it offers functionality that the otherwise preferred [npm](https://www.npmjs.com/) package manager is currently lacking. Namely, the [workspace](https://yarnpkg.com/lang/en/docs/workspaces/) setting which is currently used in the [OpenUI5 (mono-)repository](https://github.com/SAP/openui5). Note that npm [might add](https://github.com/npm/npm/pull/15900#issuecomment-315335381) this feature in the future.

Keep in mind that linking the same module with npm and Yarn may cause issues. Also, Yarn can't work with links created by npm and vice versa.

### Where are the npm packages?
- [UI5 Web Components](https://www.npmjs.com/package/@ui5/webcomponents)
- [UI5 Web Components Base](https://www.npmjs.com/package/@ui5/webcomponents-base)
- [UI5 Web Components Core](https://www.npmjs.com/package/@ui5/webcomponents-core)

## Limitations
- The ```ui5-table``` web component does not work on Internet Explorer 11
- All input web components (ui5-input, ui5-datepicker and ui5-textarea) do not support the ```placeholder``` attribute on Internet Explorer 11

## Known Issues
No major bugs known.

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://join-ui5-slack.herokuapp.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/CONTRIBUTING.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP/ui5-webcomponents/blob/master/LICENSE.txt) file.
