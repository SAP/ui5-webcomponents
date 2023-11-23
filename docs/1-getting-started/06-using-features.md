# Using Additional Features

*Several UI5 Web Components packages offer **additional features**. This section explains what these are and how to use them.*

## What Are Additional Features

These are features that **logically belong** to a component, but are not needed for the component's most common use cases, thus not part of the component's code by default.

The goal of features is to keep the components' code base minimal and allow users greater flexibility over what code to bundle.

If you intend to use a component's additional feature, your app must import it explicitly.

## Importing Additional Features

Import the feature file from the respective NPM package:

`import "@ui5/<PACKAGE-NAME>/dist/features/<FEATURE-NAME>.js`

## Component features

Currently, only a few components offer additional features:

| Package        | Affects                                           | Feature Import                                                       | Description                                                                                             |
|----------------|---------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `main`         | `ui5-color-palette`                               | `@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js`         | Support for "more colors dialog" for the color palette component                                        |
| `main`         | `ui5-input`                                       | `@ui5/webcomponents/dist/features/InputSuggestions.js`               | Support for input suggestions while typing                                                              |
| `main`         | Multiple (`ui5-input`, `ui5-date-picker`, etc...) | `@ui5/webcomponents/dist/features/InputElementsFormSupport.js`       | Support for using input components in forms                                                             |
| `fiori`        | `ui5-shellbar`                                    | `@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js`         | Support for a better (but bigger in size) animation for the "co-pilot" button in the shellbar component |
 `localization` | Multiple (`ui5-date-picker`, etc...)              | `@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js` | Buddhist calendar support                                                                               |
| `localization` | Multiple (`ui5-date-picker`, etc...)              | `@ui5/webcomponents-localization/dist/features/calendar/Islamic.js`  | Islamic calendar support                                                                                |
| `localization` | Multiple (`ui5-date-picker`, etc...)              | `@ui5/webcomponents-localization/dist/features/calendar/Japanese.js` | Japanese calendar support                                                                               |
| `localization` | Multiple (`ui5-date-picker`, etc...)              | `@ui5/webcomponents-localization/dist/features/calendar/Persian.js`  | Persian calendar support                                                                                |

<b>Note:</b> Features must be imported before all components modules,
so that the feature is enabled before the components' definition.

For example:

```js
import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js;";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Input.js";
```

## Framework features

| Package        | Affects                                           | Feature Import                                                       | Description                                                                                             |
|----------------|---------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `base`         | Framework                                         | `@ui5/webcomponents-base/dist/features/OpenUI5Support.js`            | Integration with the OpenUI5 framework, allowing synchronization and resources re-use                   |
| `base`         | Multiple components within all libraries          | `@ui5/webcomponents-base/dist/features/F6Navigation.js`              | Support for F6 fast groups navigation                                                                   |
| `base`         | Date related components                           | `@ui5/webcomponents-base/dist/features/LegacyDateFormats.js`         | Support for legacy date formats                                                                         |

<b>Note:</b> Framework-level features must be imported before all components modules,
so that the feature is enabled upon framework boot, before the components' definition.

For example:

```js
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Input.js";
```

Next: [Typescript Support](./07-typescript-support)
