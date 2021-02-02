![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/master/docs/images/UI5_logo_wide.png)

# UI5 Web Components - IE11

**DEPRECATED!** UI5 Web Components do not officially support Internet Explorer 11. While this package allows the project to
run on legacy browsers, future compatibility is not guaranteed. Use at your own risk!

[![Travis CI Build Status](https://travis-ci.org/SAP/ui5-webcomponents.svg?branch=master)](https://travis-ci.org/SAP/ui5-webcomponents)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Contains polyfills and adapter code for Internet Explorer 11

This package transparently integrates Internet Explorer 11 support whenever any of these modules is imported:
 - `import "@ui5/webcomponents-ie11/dist/features/IE11.js";`
 - `import "@ui5/webcomponents-ie11/dist/features/IE11WithWebComponentsPolyfill.js";`
 
## Running UI5 Web Components on Internet Explorer 11

Most modern browsers  - **Chrome, Firefox, Safari, Edge (Chromium-based)**, support Web Components natively.

If your app needs to run on **IE11**, you should import:

```js
import "@ui5/webcomponents-ie11/dist/features/IE11.js";
```

In addition, you should load the official Web Components polyfill in your index file, as described
[here](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs).

Please note that the aforementioned <code>webcomponents-loader.js</code> is not shipped as part of UI5 Web Components,
but should be imported separately.

Example:
```html
<script src="path/to/your/copy/of/webcomponents-loader.js"></script>
<script src="path/to/your/javasacript/app.js" type="module"></script>
```

As shown in the example above, it's recommended to load the Web Components Polyfill first, and the web components next.

Finally, there is an alternative to the `IE11.js` import:

```js
import "@ui5/webcomponents-ie11/dist/features/IE11WithWebComponentsPolyfill.js";
```

that includes the Web Components Polyfill too, so you don't have to import it manually.

This may be useful in certain use cases when your app has polyfills of its own and you need to guarantee the order of execution.
 
## Resources
- [UI5 Web Components - README.md](https://github.com/SAP/ui5-webcomponents/blob/master/README.md)
- [UI5 Web Components - Home Page](https://sap.github.io/ui5-webcomponents)
- [UI5 Web Components - Playground and API Reference](https://sap.github.io/ui5-webcomponents/playground/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://join-ui5-slack.herokuapp.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/CONTRIBUTING.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP/ui5-webcomponents/blob/master/LICENSE.txt) file.
