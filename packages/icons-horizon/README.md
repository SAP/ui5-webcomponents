![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/master/docs/images/UI5_logo_wide.png)

# UI5 Web Components - Fiori Next (Horizon) Icons

[![Travis CI Build Status](https://travis-ci.org/SAP/ui5-webcomponents.svg?branch=master)](https://travis-ci.org/SAP/ui5-webcomponents)
[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for `SAP-icons-horizon` collection icon collection, that is based on the `SAPIcons-5.0` font face.

## Provided icons

| Icon asset                | Module import                                            |
|---------------------------|----------------------------------------------------------|
| All icons (~115KB zipped) | `import "@ui5/webcomponents-icons-horizon/dist/AllIcons.js";`    |
| Accelerated icon          | `import "@ui5/webcomponents-icons-horizon/dist/accelerated.js";` |
| Accept icon               | `import "@ui5/webcomponents-icons-horizon/dist/accept.js";`      |
| ...                       | ...                                                      |
| Zoom out icon             | `import "@ui5/webcomponents-icons-horizon/dist/zoom-out.js";`    |

*Note:* The `@ui5/webcomponents-icons-horizon` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import 
just the ones that your app will actually use.

The icons within the `SAP-icons-horizon` collection have the same names as the icons in `SAP-icons` collection (@ui5/webcomponents-icon)
but viusally different as based on different font faces.

And, if you don't specify a collection name, but only the icon name (as in the example below), the collection in use depends on the current theme - `SAP-icons` for SAP Quartz Light, SAP Quartz Dark, SAP Quartz HCB and SAP Quartz HCW themes, or from `SAP-icons-horizon` in SAP Horizon theme.
```html
<ui5-icon name="accept">
```

To enforce the collection in use, no matter the current theme, you have to specify the collection within the Icon's name:
```html
<ui5-icon name="SAP-icons/accept">
```
```html
<ui5-icon name="SAP-icons-horizon/accept">
```

For a full list of the icons in the `SAP-icons-horizon` collection, click [here](https://openui5.hana.ondemand.com/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons).



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
