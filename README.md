![UI5 icon](/docs/images/UI5_logo_wide.png)

# UI5 Web Components

[![Travis CI Build Status](https://travis-ci.org/SAP/ui5-webcomponents.svg?branch=master)](https://travis-ci.org/SAP/ui5-webcomponents)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)
[![REUSE status](https://api.reuse.software/badge/github.com/SAP/ui5-webcomponents)](https://api.reuse.software/info/github.com/SAP/ui5-webcomponents)

## What are [UI5 Web Components](https://sap.github.io/ui5-webcomponents)?

 - A rich set of **enterprise-grade reusable UI elements** driven by a **lightweight framework** (~20K gzipped).
 - Suitable for building anything from **static web sites** to **complex web applications**.
 - Usable with any current or future **web development framework** (React, Angular, Vue, etc...).
 - Implement the [SAP Fiori design](https://experience.sap.com/fiori-design/) and follow the [SAP Fiori Design Guidelines](https://experience.sap.com/fiori-design-web/) for a consistent UX.
 - Created and maintained by [SAP](https://sap.com) as part of the [UI5](https://openui5.org/) product family.

## Why use web components?

 - **Future-proof**: being *web standards*, they are compatible with any version of any web development framework.
 - **Encapsulated**: the HTML/CSS in the *shadow DOM* are protected from interference by the web page and vice versa, making them stable in any environment and suitable not only for apps, but also for *libraries and micro-frontends*.
 - **Elegant**: being *custom HTML elements*, they hide implementation complexity behind a single HTML tag, making them easily usable with the standard DOM APIs.

## Where can I see them in action?
- [Playground and API Reference](https://sap.github.io/ui5-webcomponents/playground/)

## More resources
- [UI5 Web Components Home Page](https://sap.github.io/ui5-webcomponents)
- [List of all components and other public APIs](./docs/Public%20Module%20Imports.md)
- [Configuring UI5 Web Components](./docs/Configuration.md)
- [Creating a custom theme](./docs/CustomTheming.md)
- [Creating custom UI5 Web Components](./docs/dev/Developing%20Web%20Components.md)
- [Creating custom UI5 Web Components NPM packages](./docs/dev/Creating%20UI5%20Web%20Components%20Packages.md)
- [Micro-frontends and Custom elements scoping](./docs/Scoping.md)
- [F.A.Q.](./docs/FAQ.md)

## Related Projects

### OpenUI5

#### 1. What is UI5/OpenUI5?

[OpenUI5](https://openui5.org/) is an open source JS framework that lets you build enterprise-ready web applications, responsive to all devices, running on almost any browser of your choice. It's based on JavaScript, using jQuery as its foundation and follows web standards. It eases your development with a client-side HTML5 rendering library including a rich set of controls and supports data binding to different data models (JSON, XML and OData).

#### 2. How do UI5 Web Components relate to OpenUI5?

UI5 Web Components…
* …are **not built on top** of UI5, but rather lightweight and independent UI elements
* …are **not a successor** of UI5, but rather a complementary offering
* …bring the relevant **UI5 qualities and SAP Fiori UX to the HTML level**, usable with any web framework

UI5 Web Components are good for…
* …web applications which **already use a different web framework**
* …**static web sites** built without web frameworks, to just add a few interactive UI elements

UI5 remains what it is: the best choice for…
* …building complete **enterprise-ready and responsive web applications**

### UI5 Web Components for React

[UI5 Web Components for React](https://github.com/SAP/ui5-webcomponents-react) is a wrapper implementation around
UI5 Web Components which makes using them in React even more comfortable. The current version of React (`react 16`) has some
shortcomings when it comes to handling Custom Elements, namely the binding of `boolean` attributes as well as adding event listeners to custom event names like `selection-change`. With the help of UI5 Web Components for React, you can use the UI5 Web Components in React as if they were native React components. In addition to that, this library is also offering TypeScript definitions for all components, some complex layout components built on top of UI5 Web Components as well as Charting Components.


## How to use

1. Install the NPM module(s) that ship the desired UI5 Web Component(s), for example if you need `ui5-button`:

	```sh
	npm install @ui5/webcomponents
	```

2. Import the desired UI5 Web Component(s) to your app:

	```js
	import "@ui5/webcomponents/dist/Button.js"; // loads and defines ui5-button
	```

3. Use the UI5 Web Component(s) as you would use any HTML element:

	```html
	<ui5-button>Hello world!</ui5-button>
	```

	For more on using UI5 Web Components, click [here](./docs/How%20To%20Use.md).

*Note*: For a full list of the UI5 Web Components (and the respective NPM modules that ship them), see [Public module imports](https://github.com/SAP/ui5-webcomponents/blob/master/docs/Public%20Module%20Imports.md).

### Is there a CDN I can use?

No, you are expected to import only the components (or other public APIs) that you are going to use and bundle them along with the rest
of your application.

## Browser support

UI5 Web Components are supported by all major modern browsers.

Browser | Supported versions
--------|--------
Chrome | Latest
Firefox | Latest
Safari | Latest
Edge | Latest

## Project structure, development and build

This section might be of interest to you mainly if you need to run or build the project locally

### Requirements
- [Node.js](https://nodejs.org/) (**version 12 or higher**)
- [Yarn](https://yarnpkg.com/en)

**Note:** The UI5 Web Components project is set up with the [Yarn](https://yarnpkg.com/) node package manager.
This is because it offers functionality that the otherwise preferred [npm](https://www.npmjs.com/) package manager is currently lacking. Namely, the [workspace](https://yarnpkg.com/lang/en/docs/workspaces/) setting which is currently used in the [UI5 Web Components (mono-)repository](https://github.com/SAP/ui5-webcomponents). Note that npm [might add](https://github.com/npm/npm/pull/15900#issuecomment-315335381) this feature in the future.

### Structure

UI5 Web Components contains several projects (NPM packages):

Project | NPM Package | Description
-----------|-----------|------------
`main` | [UI5 Web Components](https://www.npmjs.com/package/@ui5/webcomponents) | Bread-and-butter components (buttons, inputs, popups, pickers, tables, etc...) that are generally found in web apps.
`fiori` | [UI5 Web Components Fiori](https://www.npmjs.com/package/@ui5/webcomponents-fiori) | More semantic components, specific to the Fiori UX (shell bar, side navigation, etc...) that are commonly found in SAP apps.
`icons` | [UI5 Web Components Icons](https://www.npmjs.com/package/@ui5/webcomponents-icons) | A rich icons collection (`SAP-icons`), suitable for enterprise-grade apps
`base` | [UI5 Web Components Base](https://www.npmjs.com/package/@ui5/webcomponents-base) | The UI5 Web Components framework itself
`theme-base` | [UI5 Web Components Theme Base](https://www.npmjs.com/package/@ui5/webcomponents-theme-base) | Theming assets (the default theme and additional accessibility themes)
`localization` | [UI5 Web Components Localization](https://www.npmjs.com/package/@ui5/webcomponents-localization) | `i18n` functionality and `CLDR` assets
`ie11` * | [UI5 Web Components IE11](https://www.npmjs.com/package/@ui5/webcomponents-ie11) | Internet Explorer 11 polyfills and adapter code
`playground` | N/A | The playground application

`*` This package is deprecated as Internet Explorer 11 is no longer supported by UI5 Web Components. While the `@ui5/webcomponents-ie11` package allows UI5 Web Components to run on old browsers (IE11, legacy Edge) today,
future compatibility is not guaranteed and the project may stop working on old browsers even with the aid of this package. Use at your own risk.

### How to run the project locally:

```sh
yarn # to install all dependencies
yarn start # to serve the project
```

You can then explore component test pages on:
 - http://localhost:8080/test-resources/pages/ for the `main` package
 - http://localhost:8081/test-resources/pages/ for the `fiori` package.

You can start the Playground app with the following commands:

```sh
# install palyground specific dependencies (one time only)
cd packages/playground
yarn install:dependencies

# start the playground from the project root
cd ../..
yarn start:playground

# open http://localhost:4000/
```

*Note: If you wish to manually install dependencies & run the Playground you can check out our [in depth tutorial](/docs/dev/Playground.md)*

### Production Build
To build the UI5 Web Components project, run the following commands:

```sh
yarn # to install all dependecies
yarn build # to build the project
```

Afterwards, you can find the build output in the `dist` folder of the corresponding package folder.
For example, to find the Button component (that belongs to the `main` package), look inside the `packages/main/dist` folder.

## Limitations
None as of 1.0.0-rc.8

## Known Issues
No major bugs known. To report an issue or view the currently open issues, click [here](https://github.com/SAP/ui5-webcomponents/issues).

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://ui5-slack-invite.cfapps.eu10.hana.ondemand.com/).

## Contribute
Please check our [Contribution Guidelines](/CONTRIBUTING.md).
