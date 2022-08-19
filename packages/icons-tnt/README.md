![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/main/docs/images/UI5_logo_wide.png)

# UI5 Web Components - SAP Fiori Tools Icons

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Provides assets for the rich `tnt` icon collection.

| Icon asset               | Module import                                                    |
|--------------------------|------------------------------------------------------------------|
| All icons (~31KB zipped) | `import "@ui5/webcomponents-icons-tnt/dist/AllIcons.js";`        |
| Actor icon               | `import "@ui5/webcomponents-icons-tnt/dist/actor.js";`           |
| Ad hoc actor icon        | `import "@ui5/webcomponents-icons-tnt/dist/ad-hoc-actor.js";`    |
| ...                      | ...                                                              |
| Workflow editor icon     | `import "@ui5/webcomponents-icons-tnt/dist/workflow-editor.js";` |

*Note:* The `@ui5/webcomponents-icons-tnt` package does not provide any web components per se, but rather icon assets,
usable by other web components such as `ui5-icon`. You could import all icons, but it's recommended to import
just the ones that your app will actually use.

## Usage

Since this is a non-default icon collection, all names have to be prefixed with the collection name and a `/` separator when used by web components.

Example usage with `<ui5-icon>` web component:

```html
<ui5-icon name="tnt/actor"></ui5-icon>
```

For a full list of the icons in the `tnt` collection, click [here](https://sdk.openui5.org/test-resources/sap/m/demokit/iconExplorer/webapp/index.html#/overview/SAP-icons-TNT).

## Resources
- [UI5 Web Components - README.md](https://github.com/SAP/ui5-webcomponents/blob/main/README.md)
- [UI5 Web Components - Home Page](https://sap.github.io/ui5-webcomponents)
- [UI5 Web Components - Playground and API Reference](https://sap.github.io/ui5-webcomponents/playground/)

## Support
We welcome all comments, suggestions, questions, and bug reports. Please follow our [Support Guidelines](https://github.com/SAP/ui5-webcomponents/blob/main/SUPPORT.md#-content) on how to report an issue, or chat with us in the `#webcomponents` channel of the [OpenUI5 Community Slack](https://join-ui5-slack.herokuapp.com/).

## Contribute
Please check our [Contribution Guidelines](https://github.com/SAP/ui5-webcomponents/blob/main/docs/6-contributing/02-conventions-and-guidelines.md).

## License
Copyright (c) 2019 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, Version 2.0 except as noted otherwise in the [LICENSE](https://github.com/SAP/ui5-webcomponents/blob/main/LICENSE.txt) file.
