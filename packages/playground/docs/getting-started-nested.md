---
layout: default
title: Getting Started
nav_exclude: true
permalink: /playground/
---

# Getting Started

UI5 Web Components are framework-independent UI elements incorporating the SAP Fiori design. UI5 Web Components share the fundamental enterprise-grade features of UI5 such as stability, accessibility and theming support.
The UI5 Web Components project aims to achieve easier consumption of UI5 controls, lower entry barrier to UI5 controls use for own applications and less complexity of the UI5 rendering-stack by making the utilization of the full-stack UI5 optional. UI5 Web Components target web developers who want to have more flexibility to use just HTML tags or arbitrary JS frameworks.

UI5 Web Components are shipped as ES6 modules and published on NPM. If you are already using a framework that handles bundling of ES6 modules, skip forward to [Installation](#installation) or check the Tutorials section.

## Creating a project

Any ES6 module-capable front-end tooling can be used, but in case you don’t already have a preference, you can start a new project using [Vite](https://vitejs.dev). The only prerequisite is to have [Node.js](https://nodejs.org/) installed.

```console
npm init @vitejs/app
```

- Select a project name: `my-webcomponents-app`
- Select a framework: `vanilla`
- Select a variant: `JavaScript`

This command will create a project structure under `my-webcomponents-app`. Follow the instructions on the screen to install the initial depenednecies and start a dev server.

```
cd my-webcomponents-app
npm install
npm run dev​
```

You should see a message that a server is running on `Local: http://localhost:3000/`. Launch your favourite IDE and change some code, the browser page will be automatically refreshed.

## Installation
<a name="installation"></a>

Install ```@ui5/webcomponents```

```bash
npm install @ui5/webcomponents
```

This command downloads the published source code of the UI5 Web Components to the `node_modules` folder. Now you can add them to your code to get them on the web page.
## Documentation

Take a look at the available UI5 Web Components documentation in the [playground](./playground/docs/).

## Usage

### 1. Import the needed Web Component.

```js
// src/main.js
import "@ui5/webcomponents/dist/Button.js";
```

This line runs the code that registers the `<ui5-button>` tag with the browser. Now when the browser sees such a tag, it knows how to render it.

### 2. Instantiate the Web Component.

Next, change the application markup in the same file to display the button on the page:
```js
// src/main.js
...
document.querySelector('#app').innerHTML = `
  <ui5-button>Hello UI5 Web Components</ui5-button>
`
```

Check the browser to see the displayed button. You can now use UI5 Web Components just like normal HTML elements - set attributes on them, attach events, and more as described in the documentation.

### 3. Run a Production Build

If you want to deploy your project on a static hosting or in a Node.js project, run:

```console
npm run build
```

The output will show what files were created along with their sizes:

```console
vite v2.3.4 building for production...
✓ 99 modules transformed.
dist/assets/favicon.17e50649.svg 1.49kb
dist/index.html 0.51kb
dist/assets/index.ccce2ca3.css 0.16kb / brotli: 0.10kb
dist/assets/index.4116dceb.js 0.12kb / brotli: 0.09kb
dist/assets/vendor.c05c7785.js 114.92kb / brotli: 24.30kb
```

The contents of the `dist` folder is ready to be deployed for productive usage. The hashes in the file names make them safe for caching and the produced bundle is optimized for production.

### 4. Enjoy UI5 Web Components.

