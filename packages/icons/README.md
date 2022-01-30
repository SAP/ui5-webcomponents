![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/master/docs/images/UI5_logo_wide.png)

# UI5 Web Components - Icons

[![Travis CI Build Status](https://travis-ci.org/SAP/ui5-webcomponents.svg?branch=master)](https://travis-ci.org/SAP/ui5-webcomponents)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for the rich `SAP-icons` icon collection.

## Provided icons

| Icon asset                | Module import                                            |
|---------------------------|----------------------------------------------------------|
| All icons (~115KB zipped) | `import "@ui5/webcomponents-icons/dist/AllIcons.js";`    |
| Accelerated icon          | `import "@ui5/webcomponents-icons/dist/accelerated.js";` |
| Accept icon               | `import "@ui5/webcomponents-icons/dist/accept.js";`      |
| ...                       | ...                                                      |
| Zoom out icon             | `import "@ui5/webcomponents-icons/dist/zoom-out.js";`    |

*Note:* The `@ui5/webcomponents-icons` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import 
just the ones that your app will actually use.

For a full list of the icons in the `SAP-icons` collection, click [here](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).

## Provided assets

```js
import "@ui5/webcomponents-fiori/dist/Assets.js";
```

| Assets           | Module                                           | Notes                                                                                                                                                                                                            |
|------------------|--------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `i18n`           | `@ui5/webcomponents-icons/dist/Assets.js`        | Translations for the tooltips / "aria labels" of several icons                                                                                                                                                   |
## SAP-icons4.0 and SAP-icons5.0
The package provides two versions of each icon. If you don't specify a collection name, for example:
```html
<ui5-icon name="accept"></ui5-icon>
```

the framework will detect the current theme and render the corresponding icon - SAP-icons5.0 for Fiori Next (sap_horizon) theme, and SAP-icons4.0 for all the rest (sap_fiori_3, sap_fiori_3_hcb...).

In case you want to display the SAP-icons5.0 icons, no matter what theme is set,
you need to use the "horizon" collection name:

```html
<ui5-icon name="horizon/accept"></ui5-icon>
```

## Resources
- [UI5 Web Components - README.md](https://github.com/SAP/ui5-webcomponents/blob/master/README.md)
- [UI5 Web Components - Home Page](https://sap.github.io/ui5-webcomponents)
- [UI5 Web Components - Playground and API Reference](https://sap.github.io/ui5-webcomponents/playground/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://join-ui5-slack.herokuapp.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/SAP/ui5-webcomponents/blob/master/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP/ui5-webcomponents/blob/master/LICENSE.txt) file.
