![UI5 icon](https://raw.githubusercontent.com/SAP/ui5-webcomponents/main/docs/images/UI5_logo_wide.png)

# UI5 Web Components - Base

[![npm Package Version](https://badge.fury.io/js/%40ui5%2Fwebcomponents.svg)](https://www.npmjs.com/package/@ui5/webcomponents)

Contains the base files for all Web Components, most notably `@ui5/webcomponents-base/dist/UI5Element.js`.

## Provided APIs for applications

| Affects      | Import                                                    | Description                                                                                         |
|--------------|---------------------------------------------------------- |-----------------------------------------------------------------------------------------------------|
 Configuration | `@ui5/webcomponents-base/dist/config/Theme.js`            | Sets Theme Configuration                                                                            |
 Configuration | `@ui5/webcomponents-base/dist/config/Language.js`         | Sets Language Configuration                                                                         |
 Configuration | `@ui5/webcomponents-base/dist/config/AnimationMode.js`    | Sets Animation Mode Configuration                                                                   |
 Configuration | `@ui5/webcomponents-base/dist/config/NoConflict.js`       | Sets "NoConflict" Mode Configuration - if enabled all custom events are fired with the `ui5-` prefix|
 Framework     | `@ui5/webcomponents-base/dist/features/OpenUI5Support.js` | Adds integration with the OpenUI5 framework for resources re-use                                    |
 Components    | `@ui5/webcomponents-base/dist/features/F6Navigation.js`   | Adds support for F6 fast group navigation                                                           |
 Components    | `import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js"`| Applies direction ("ltr"/"rtl") - re-renders all RTL-aware components     |
 Components    | `import { setCustomElementsScopingSuffix } from "@ui5/webcomponents-base/dist/CustomElementsScope.js"`| Adds suffix to the tag names of all components          |
 Components    | `@ui5/webcomponents-base/dist/util/InvisibleMessage.js`   | Provides a way to expose dynamic content changes that can be announced by screen readers   |
 CSP compliance| `import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"`| Sets directory path where the CSS resources for given package will be served from    |
 CSP compliance| `import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"`      | Enables or disables the usage of `<link>` tags instead of `<style>` tags             |
 CSP compliance| `import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"`  | Enables or disables the preloading of `<link>` tags                                  |

### `applyDirection.js`
- `applyDirection`

### `Boot.js`

 - `attachBoot`

### `CustomElementsScope.js`

 - `setCustomElementsScopingSuffix`
 - `getCustomElementsScopingSuffix`
 - `setCustomElementsScopingRules`
 - `getCustomElementsScopingRules`

###  `CSP.js`
 - `setPackageCSSRoot` 
 - `setUseLinks`
 - `setPreloadLinks`

### `i18nBundle.js`

 - `registerI18nLoader`
 - `getI18nBundle`

### `PropertiesFileFormat.js`

 - `parseProperties`

### `Render.js`

 - `renderFinished`

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
