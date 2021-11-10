# Accessibility in UI5 Web Components

Accessibility refers to the possibility for everyone, including and especially people with disabilities, to access and use IT products. Making software work for more people should be of high priority. All users should be able to operate our software without loss of meaningful content, functionality, and efficiency when using assistive technologies.

Following those principles in an ongoing approach, we at UI5 Web Components aim to bring accessibility to life by providing the appropriate accessibility features, and following precise accessibility requirements and processes. 


## Web Components & Accessibility

Web Components allow developers to make their own custom components with native HTML and JavaScript with the usage of custom elements, shadow DOM, and templates. In HTML you can define an element using a role.  When you use semantic elements, you don’t need to define a role as these elements receive all relevant aria mappings out of the box. However, this is not the case when you use custom elements where you should add all relevant accessibility attributes yourselves.

This is not needed in UI5 Web Components, because when using our elements, all relevant accessibility attributes for a certain component will be applied in the shadow DOM, without further setup. Additionally, many accessibility-related APIs are available. They can be used to enhance the accessibility in the context of each application.

As the Web Components are a new standard, there are still some gaps in regard to accessibility. For example - setting IDRef relationships is currently not possible due to the nature of the custom elements and their shadow DOM. This is a limitation in the ARIA support and there is a draft of a new [AOM (Accessibility Object Model)](https://github.com/WICG/aom), which addresses this issue and many more, and aims at a better JS-based accessibility support for all web elements. We are continuously working on improving the existing limitations. For example, in order to create a Label-Input relationship, you could simply use the `accessible-name` or `accessible-name-ref` properties of the input components in order to set the accessible name for the desired input.


## Accessibility Features

Many accessibility features are built into the core design elements upfront and are available to app teams out of the box. Keyboard navigation and interaction, tab and reading order, as well as screen reader support are fundamental features enabled in UI5 Web Components. Visualization features like high contrast themes, consistency of icons, keyboard focus visualization, layout adaptation, and support for text resizing are also available.


### **Screen Reader Support**

UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards support in order to aid people using screen reader software.

Navigation with the keyboard and screen reader should work properly together. In order for this to happen, you need to use the correct ARIA attributes and to map them to their HTML counterparts. With UI5 Web Components you will receive ARIA mapped elements out of the box. For example let's add a `ui5-combobox` component:

```html
<ui5-combobox>
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
```

By doing so, you receive an input element with `role="combobox"` with all aria attributes relevant for this role in the shadow DOM. Also, if you set the `disabled` property, this will automatically add `aria-disabled="true"` to the shadow `combobox` element. Attribute mapping is available for all relevant properties - `required`, `disabled`, `readonly`, and more.

In order to ease the setting of aria attributes, we have introduced properties that are available for developers to extend the accessibility support in the context of the application. More information about the available properties could be found in the Accessibility APIs section below.


### **Keyboard Handling**

All standard UI elements and controls are designed to be keyboard-enabled. All suitable input channels (such as mouse, keyboard, or touch) are treated equally according to the capabilities of the device or the individual preferences of the user. For example, some users may prefer using the keyboard instead of a mouse, which lets them work faster.

Support for standard keystrokes, based on the role of the component element is available. Complex components also provide advanced keyboard handling, which is described in the Overview section of each component.


### **Theming**

Theming is an important aspect when it comes to a UI5 Web Components application. The different colors shown on the UI need to have a good contrast to each other in order to be easily distinguishable. We ensure that the requirements for color contrast are fulfilled in all themes. High Contrast White and High Contrast Black themes are also available to support people with visual impairments.

For more information regarding the available themes and how to use them, see the [Configuration](01-configuration.md) section.


## Accessibility APIs

The mapping of the accessibility APIs to ARIA attributes is described in the following table:


| UI5 Web Components Property               | HTML attribute  | Description                                                                                                                                                                      |
| ----------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `accessibleName`                            | `aria-label`      | Defines the text alternative of the component. If not provided a default text alternative will be set, if present.                                                                |
| `accessibleNameRef`                         | `aria-label`      | Alternative for `aria-labelledby`. Receives id (or many ids) of the elements that serve as labels of the component. Those labels are passed as a concatenated string to the `aria-label` attribute.                                                    |
| `accessibleRole`                            | `role`            | Sets the accessible aria role of the component.                                                                                                                                  |
| `accessibilityTexts` (FlexibleColumnLayout) | `aria-label`      | An object of strings that define several additional accessibility texts for even further customization.                                                                         |
| `required`                                  | `aria-required`  | Defines whether the component is required.                                                                                                                                       |
| `readonly`                                  | `aria-readonly`   | Defines whether the component is read-only.                                                                                                                                       |
| `disabled`                                  | `aria-disabled`   | Defines whether the component is disabled.                                                                                                                                       |
| `checked`                                   | `aria-checked`    | Defines whether the component is checked.                                                                                                                                        |
| `level`, `headerLevel`                        | `aria-level`      | Defines the heading level of a title. Available options are: "H6" to "H1".                                                                                                   |
| `interactive`                               | `tabindex`        | Defines if the component is interactive (focusable and pressable).                                                                                                                |


### accessibleName

Setting the property on the custom element as:
```html
<ui5-combobox accessible-name="Enter Value">
    <ui5-cb-item text="Item 1"></ui5-cb-item>
</ui5-combobox>
```

Will result in the shadow DOM as: 
```html
<input role="combobox" aria-label="Enter value" ... >
```

The `accessible-name` property is currently supported in:
* Popups: [Dialog](https://sap.github.io/ui5-webcomponents/playground/components/Dialog), [Popover](https://sap.github.io/ui5-webcomponents/playground/components/Popover)
* User input components (e.g. [Input](https://sap.github.io/ui5-webcomponents/playground/components/Input), [RadioButton](https://sap.github.io/ui5-webcomponents/playground/components/RadioButton))
* [Panel](https://sap.github.io/ui5-webcomponents/playground/components/Panel) 
* [Breadcrumbs](https://sap.github.io/ui5-webcomponents/playground/components/Breadcrumbs) 
* [Button](https://sap.github.io/ui5-webcomponents/playground/components/Button)
* [Icon](https://sap.github.io/ui5-webcomponents/playground/components/Icon) 
* [List](https://sap.github.io/ui5-webcomponents/playground/components/List) 

---

### accessibleNameRef

Setting the property on the custom element as:
```html
<ui5-label id="myLabel" for="myInput">Date of birth</ui5-label>
<ui5-input id="myInput" accessible-name-ref="myLabel"></ui5-input>
```

Will result in the shadow DOM as: 
```html
<input aria-label="Date of birth" ... >
```

The `accessible-name-ref` property is currently supported in:
* User input components (e.g. [Input](https://sap.github.io/ui5-webcomponents/playground/components/Input), [RadioButton](https://sap.github.io/ui5-webcomponents/playground/components/RadioButton))
* [Link](https://sap.github.io/ui5-webcomponents/playground/components/Link) 
* [Button](https://sap.github.io/ui5-webcomponents/playground/components/Button)
* [List](https://sap.github.io/ui5-webcomponents/playground/components/List) 

---

### accessibilityTexts

This property accepts `object` with properties values for different parts of the FlexibleColumnLayout elements. For more detailed information on every object property, read the API description in [FlexibleColumnLayout](https://sap.github.io/ui5-webcomponents/playground/components/FlexibleColumnLayout). 

Setting the property on the custom element as:
```html
<ui5-flexible-column-layout id="component">...</ui5-flexible-column-layout>

<script>
    const component = document.getElemetnById("component");
    component.accessibilityTexts = {
        startColumnAccessibleName: "Products list",
    };
</script>
```

Will result in the shadow DOM as: 
```html
<div role="region" aria-labelledby="component-startColumnText" ... >
    ...
    <span id="component-startColumnText" class="ui5-hidden-text" ... >
        Products list
    </span>
    ...
</div>
```

---

### accessibleRole

Setting the property on the custom element as:
```html
<ui5-panel accessible-role="Complementary">
    ...
</ui5-panel>
```

Will result in the shadow DOM as: 
```html
<div role="complementary" ... >
    ...
</div>
```

The `accessible-role` property is currently supported in:
* User input components (e.g. [Input](https://sap.github.io/ui5-webcomponents/playground/components/Input), [RadioButton](https://sap.github.io/ui5-webcomponents/playground/components/RadioButton))
* [Panel](https://sap.github.io/ui5-webcomponents/playground/components/Panel)
* [List](https://sap.github.io/ui5-webcomponents/playground/components/List) 

---

### level, headerLevel

Setting the property on the custom element as:
```html
<ui5-title level="H3">Title</ui5-title>
...
<ui5-panel header-text="Panel Header" header-level="H3">
</ui5-panel>
```

Will result in the shadow DOM as: 
```html
<h3 class="ui5-title-root" ... >...</h3>
...
<div class="ui5-panel-root" ... >
    ...
    <div role="heading" aria-level="3" ...>
        Panel Header
    </div>
    ...
</div>
```
The `level` property is currently supported in:
 * [Title](https://sap.github.io/ui5-webcomponents/playground/components/Title)

The `header-level` property is currently supported in:
 * [Panel](https://sap.github.io/ui5-webcomponents/playground/components/Panel)

---

### interactive

Setting the property on the custom element as:
```html
<ui5-icon interactive></ui5-icon>
```

Will result in the shadow DOM as: 
```html
<svg tabindex="0" role="button" ... ></svg>
```

The `interactive` property is currently supported in:
* [Avatar](https://sap.github.io/ui5-webcomponents/playground/components/Avatar)
* [Icon](https://sap.github.io/ui5-webcomponents/playground/components/Icon)

---

## Testing Accessibility


UI5 Web Components provide the prerequisites for screen reader support based on the HTML, ARIA, and WCAG standards. All screen readers that follow those standards should work fine. Nevertheless, there are deviations in the interpretation depending on the combination of browser and screen reader. UI5 Web Components focus on compliance with the standards by performing automated checks for accessibility and manual tests with reference testing environments.

For Screen Reader Support, we recommend using JAWS 2021 + Chrome (latest), and for HTML/ARIA validation the recommended testing tool is Access Assistant. UI5 Web Components support other environments to the extent of providing a valid HTML and ARIA implementation following the WCAG standards.

Please note that reference testing environments may change over time to reflect changes in the usage of different browsers, their maintenance period, and increased accessibility compliance.

When reporting issues with different testing environments, please ensure that the issue is not false positive, a real accessibility concern is present, and there is an impact over the users. Therefore, we recommend to retest the issue using the mentioned reference testing tools and additionally with plain HTML.

In order to process the issues correctly, we would like to have the following information provided:

•	Issue description

•	Reference to the suspected violated accessibility requirement (e.g. Web Content Accessibility Guidelines, WCAG 2.0, BITV 2.0, EN 301 549)

•	Isolated example

•	Steps to reproduce

•	UI5 Web Components version

•	OS/Platform: {...}

•	Browser: {...}

•	Testing Tool

Next: [CSP](../csp)
