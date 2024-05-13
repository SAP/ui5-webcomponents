# Using Additional Features

*Some UI5 Web Components packages offer **additional features**. This section explains what they are and how to make use of them.*

## What Are Additional Features

These are features that **logically belong** to a component but are not necessary for its most common uses, so they aren't included in the component's main code by default.

The goal of these features is to keep the components' code simple and let users have more choices over what to include.

If you want to use an additional feature of a component, you need to import it explicitly.

## Importing Additional Features

You can import the feature file from the respective NPM package:

`import "@ui5/<PACKAGE-NAME>/dist/features/<FEATURE-NAME>.js`

## Component Features

Currently, only a few components offer additional features:

| Package        | Affected Components                                | Feature Import                                                       | Description                                                                                             |
|----------------|---------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `main`         | `ui5-color-palette`                               | `@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js`         | Adds support for a "more colors" dialog in the color palette component allowing users to choose specific colors not present in the predefined range.                                   |
| `main`         | `ui5-input`                                       | `@ui5/webcomponents/dist/features/InputSuggestions.js`               | Adds support for input suggestions while typing                                                                  |
| `fiori`        | `ui5-shellbar`                                    | `@ui5/webcomponents-fiori/dist/features/CoPilotAnimation.js`         | Enhances the animation for the "co-pilot" button in the shellbar component (bigger file size)           |
| `localization` | Multiple (e.g., `ui5-date-picker`)                | `@ui5/webcomponents-localization/dist/features/calendar/Buddhist.js` | Adds support for the Buddhist calendars                                                                   |
| `localization` | Multiple (e.g., `ui5-date-picker`)                | `@ui5/webcomponents-localization/dist/features/calendar/Islamic.js`  | Adds support for the Islamic calendars                                                                    |
| `localization` | Multiple (e.g., `ui5-date-picker`)                | `@ui5/webcomponents-localization/dist/features/calendar/Japanese.js` | Adds support for the Japanese calendars                                                                   |
| `localization` | Multiple (e.g., `ui5-date-picker`)                | `@ui5/webcomponents-localization/dist/features/calendar/Persian.js`  | Adds support for the Persian calendars                                                                    |

**Note:** Features must be imported before all component modules to ensure the feature is enabled before to the components' definition. For example:

```js
import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js;";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Input.js";
```

## Framework Features

| Package        | Affects                                           | Feature Import                                                       | Description                                                                                             |
|----------------|---------------------------------------------------|----------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| `base`         | Framework                                         | `@ui5/webcomponents-base/dist/features/OpenUI5Support.js`            | Enables integration with the OpenUI5 framework, facilitating synchronization and resource re-use       |
| `base`         | Multiple components within all libraries          | `@ui5/webcomponents-base/dist/features/F6Navigation.js`              | Adds support for F6 fast groups navigation                                                              |
| `base`         | Date-related components                           | `@ui5/webcomponents-base/dist/features/LegacyDateFormats.js`         | Adds support for legacy date formats                                                                |

**Note:** Framework-level features must be imported before all component modules to ensure the feature is enabled upon framework boot, before the components' definition. For example:

```js
import "@ui5/webcomponents-base/dist/features/OpenUI5Support.js";
import "@ui5/webcomponents-base/dist/features/F6Navigation.js";

import "@ui5/webcomponents/dist/Button.js";
import "@ui5/webcomponents/dist/Link.js";
import "@ui5/webcomponents/dist/Input.js";
```


### F6 Navigation (fast navigation)

The F6 Navigation feature allows users to navigate quickly between groups of DOM elements using keyboard shortcuts. When the focus is on a DOM element within a group and the `F6` key is pressed, the focus goes to the first focusable element of the next group. This navigation also works with nested groups, moving through them until reaching a focusable element in a different group. Pressing `Shift + F6` moves the focus back to the previous group.

If the focus is in the last group, it goes back to the first group, allowing continuous navigation throughout the application.

Larger components like ui5-list, ui5-carousel, and ui5-tabcontainer create their own groups automatically.

Developers can create their own groups by marking UI5 web components or DOM elements as fast navigation groups using `data-sap-ui-fastnavgroup="true"`. This feature enhances accessibility and efficiency for users navigating through applications using UI5 Web Components.

**Note:** To use this feature, you need to import the `@ui5/webcomponents-base/dist/features/F6Navigation.js` module.