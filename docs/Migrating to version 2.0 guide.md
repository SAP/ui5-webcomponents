# UI5 Web Components 2.0 migration guide

This documentation will assist you in seamlessly transitioning from UI5 Web Components v1.x to the latest version, UI5 Web Components 2.0.

## General and Framework


| Changed item       | Old                 | New                             | 
|--------------------|---------------------|---------------------------------|
| Method             | `UI5Element#render` | `UI5Element#renderer`           | 
| Method             | `Device#isIE`       | `N/A` (removed)                 | 
| Module             | `CSP.js`            | `N/A` (removed)                 | 
| `npm init` Option  | `JavaScript`        | `N/A` (removed)                 | 
| Code Documentation | `API.json`          | `custom-elements-manifest.json` | 
| Assets file        | `Assets-static.js`  | `Assets.js` (dynamic)           | 


 - Removed `UI5Element#render` method in favour of `UI5Element#renderer`. If you previously used "render"
```js
class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
```
start using "renderer"
```ts
class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
```
 - `Device#isIE` method has been removed and no longer available
 - Removed the `CSP.js` module and the creation of `<style>` and `<link>` tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:
```ts
import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
```

 - Removed the JavaScript template option from @ui5/create-webcomponents-package
   Previously `npm init @ui5/webcomponents-package` used to create JS-based project, however now it will be TypeScript-based project.
   If you previously used `npm init @ui5/webcomponents-package --enable-typescript` to create  TypeScript-based project, now it's by default, e.g `npm init @ui5/webcomponents-package` and `--enable-typescript` is removed.

 - The JSDoc plugin has been removed, and the generation of `api.json` has stopped. If you previously relied on the `ui5-package/dist/api.json file`, you can now use `ui5-package/dist/custom-elements.json`

 - All `Assets-static.js` modules are removed. If you previously imported any `Assets-static.js` module from any package:
```ts
import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
```
use the dynamic equivalent of it:
```ts
import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js"
```

## Main package (@ui5/webcomponents)

### ui5-badge

| Changed item                  | Old               | New          | 
|-------------------------------|-------------------|--------------|
| tag                      | `ui5-badge` | `ui5-tag` | 

- The Badge `ui5-badge` has been renamed to Tag `ui5-tag`. If you have previously used the `ui5-badge`:
```html
<ui5-badge></ui5-badge>
```
Now use `ui5-tag` instead:
```html
<ui5-tag></ui5-tag>
```


### ui5-breadcrumbs

| Changed item                  | Old               | New          | 
|-------------------------------|-------------------|--------------|
| Property                      | `separator-style` | `separators` | 
| `separators` type enumeration | `BreadcrumbsSeparatorStyle` | `BreadcrumbsSeparator` | 

- The `separator-style` property is renamed to  `separators` and the `BreadcrumbsSeparatorStyle` enum is renamed to `BreadcrumbsSeparator`.
  If you have previously used the `separator-style` property:
```html
<ui5-breadcrumbs separator-style="Slash">
```
Now use  `separators`  instead:
```html
<ui5-breadcrumbs separators="Slash">
```

### ui5-busy-indicator

| Changed item | Old    | New                                     | 
|--------------|--------|-----------------------------------------|
| Property     | `size` | values have changed, f.e. `Small` to `S` | 

- The `size` property now accepts different values. If you previously used it like:
```html
<ui5-busy-indicator size="Small"></ui5-busy-indicator>
```
Now use the new values instead:
```html
<ui5-busy-indicator size="S"></ui5-busy-indicator>
```

### ui5-calendar

| Changed item | Old                     | New                     | 
|--------------|-------------------------|-------------------------|
| Event        | `selected-dates-change` | `selection-change` | 

- The event `selected-dates-change ` is renamed to `selection-change`. In addition the event details
  `values` and `dates` are renamed to `selectedValues` and `selectedDateValues`. If you previously used the Calendar event as follows:
```ts
myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
```
Now you have to use the new event name and details:
```ts
myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
```

### ui5-card

| Changed item | Old       | New               | 
|--------------|-----------|-------------------|
| TS Interface | `ICardHeader`  | `CardHeader` type | 

 - Removed the `ICardHeader` interface. If you previously used the interface
```ts
import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
```
Use the CardHeader type instead:
```ts
import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
```

### ui5-card-header

| Changed item    | Old      | New                    | 
|-----------------|----------|------------------------|
| Property        | `status` | `additional-text` | 
| CSS Shadow part | `status` | `additional-text` | 

- The `status` property and its shadow part have been renamed. If you previously used them:
```html
<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
```
Now use `additionalText` instead:
```html
<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
```

### ui5-carousel

| Changed item | Old       | New                      | 
|--------------|-----------|--------------------------|
| Property     | `pageIndicatorStyle`  | `pageIndicatorType` | 

- The `pageIndicatorStyle` no longer exists. If you previously used it like:
```html
<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
```
Now you should use `pageIndicatorType` instead:
```html
<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
```

### ui5-color-palette-popover

| Changed item | Old           | New           | 
|--------------|---------------|---------------|
| Method       | `openPopover` | N/A (removed) | 
| Method       | `showAt`      | N/A (removed) | 

- The `openPopover` and `showAt` methods are removed in favor of `open`  and `opener` properties. If you previously used the imperative API:
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
```
Now the declarative API should be used instead:
```html
<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
```
```js
button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
```

### ui5-color-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | `color` | `value` | 

- The property `color`  is renamed to `value`. If you previously used the change event of the ColorPicker as follows:
```html
<ui5-color-picker color="red"></ui5-color-picker>
```
Now you have to use it like this:
```html
<ui5-color-picker value="red"></ui5-color-picker>
```


### ui5-checkbox

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-checkbox value-state="Error"></ui5-checkbox>
<ui5-checkbox value-state="Warning"></ui5-checkbox>
<ui5-checkbox value-state="Success"></ui5-checkbox>
```
Now you have to use it like:
```html
<ui5-checkbox value-state="Negative"></ui5-checkbox>
<ui5-checkbox value-state="Critical"></ui5-checkbox>
<ui5-checkbox value-state="Positive"></ui5-checkbox>
```

### ui5-combobox

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-combobox value-state="Error"></ui5-combobox>
<ui5-combobox value-state="Warning"></ui5-combobox>
<ui5-combobox value-state="Success"></ui5-combobox>
```
Now you have to use it like:
```html
<ui5-combobox value-state="Negative"></ui5-combobox>
<ui5-combobox value-state="Critical"></ui5-combobox>
<ui5-combobox value-state="Success"></ui5-combobox>
```


### ui5-date-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-date-picker value-state="Error"></ui5-date-picker>
<ui5-date-picker value-state="Warning"></ui5-date-picker>
<ui5-date-picker value-state="Success"></ui5-date-picker>
```
Now you have to use it like:
```html
<ui5-date-picker value-state="Negative"></date-picker>
<ui5-date-picker value-state="Critical"></date-picker>
<ui5-date-picker value-state="Success"></ui5-date-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| method     | openPicker, closePicker, isOpen| open | 


 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const datePicker = document.getElementById("exampleID");
datePicker.openPicker();
datePicker.closePicker();
```

Now use the `open` property respectively: 
```ts
const datePicker = document.getElementById("exampleID");
datePicker.open = true;
datePicker.open = false;
```

### ui5-date-time-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-datetime-picker value-state="Error"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Warning"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
```
Now you have to use it like:
```html
<ui5-datetime-picker value-state="Negative"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Critical"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| method     | openPicker, closePicker, isOpen| open | 

 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const datetimePicker = document.getElementById("exampleID");
datetimePicker.openPicker();
datetimePicker.closePicker();
```

Now use the `open` property respectively: 
```ts
const datetimePicker = document.getElementById("exampleID");
datetimePicker.open = true;
datetimePicker.open = false;
```

### ui5-date-range-picker

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-date-range-picker value-state="Error"></ui5-date-range-picker>
<ui5-date-range-picker value-state="Warning"></ui5-date-range-picker>
<ui5-date-range-picker value-state="Success"></ui5-date-range-picker>
```
Now you have to use it like:
```html
<ui5-date-range-picker value-state="Negative"></ui5-date-range-picker>
<ui5-date-range-picker value-state="Critical"></ui5-date-range-picker>
<ui5-date-range-picker value-state="Success"></ui5-date-range-picker>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| method     | openPicker, closePicker, isOpen| open | 

 - The methods `openPicker()`, `closePicker()` and `isOpen()` are replaced by `open` property. 

If you previously used `openPicker()`, `closePicker()` or `isOpen`:
```ts
const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.openPicker();
dateRangePicker.closePicker();
```

Now use the `open` property respectively: 
```ts
const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.open = true;
dateRangePicker.open = false;
```

### ui5-dialog

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | state="Error/Warning/Success" | state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-dialog state="Error"></ui5-dialog>
<ui5-dialog state="Warning"></ui5-dialog>
<ui5-dialog state="Success"></ui5-dialog>
```
Now you have to use it like:
```html
<ui5-dialog state="Negative"></ui5-dialog>
<ui5-dialog state="Critical"></ui5-dialog>
<ui5-dialog state="Success"></ui5-dialog>
```

### ui5-file-uploader

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-file-uploader value-state="Error"></ui5-file-uploader>
<ui5-file-uploader value-state="Warning"></ui5-file-uploader>
<ui5-file-uploader value-state="Success"></ui5-file-uploader>
```
Now you have to use it like:
```html
<ui5-file-uploader value-state="Negative"></ui5-file-uploader>
<ui5-file-uploader value-state="Critical"></ui5-file-uploader>
<ui5-file-uploader value-state="Success"></ui5-file-uploader>
```

### ui5-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-input value-state="Error"></ui5-input>
<ui5-input value-state="Warning"></ui5-input>
<ui5-input value-state="Success"></ui5-input>
```
Now you have to use it like:
```html
<ui5-input value-state="Negative"></ui5-input>
<ui5-input value-state="Critical"></ui5-input>
<ui5-input value-state="Success"></ui5-input>
```

### ui5-multi-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-multi-input value-state="Error"></ui5-multi-input>
<ui5-multi-input value-state="Warning"></ui5-multi-input>
<ui5-multi-input value-state="Success"></ui5-multi-input>
```
Now you have to use it like:
```html
<ui5-multi-input value-state="Negative"></ui5-multi-input>
<ui5-multi-input value-state="Critical"></ui5-multi-input>
<ui5-multi-input value-state="Success"></ui5-multi-input>
```

### ui5-message-strip

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | design="Warning" | design="Critical" | 

- The property values `Warning`  are renamed to `Critical`. If you previously used it like:
```html
<ui5-message-strip design="Warning"></ui5-message-strip>
```
Now you have to use it like:
```html
<ui5-message-strip design="Critical"></ui5-message-strip>
```

### ui5-li

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | highlight="Error/Warning/Success" | highlight="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-li highlight="Warning"></ui5-li>
<ui5-li highlight="Warning"></ui5-li>
<ui5-li highlight="Success"></ui5-li>
```
Now you have to use it like:
```html
<ui5-li highlight="Critical"></ui5-li>
<ui5-li highlight="Critical"></ui5-li>
<ui5-li highlight="Success"></ui5-li>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | additionalTextState="Error/Warning/Success" | additional-text-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-li additional-text-state="Warning"></ui5-li>
<ui5-li additional-text-state="Warning"></ui5-li>
<ui5-li additional-text-state="Success"></ui5-li>
```
Now you have to use it like:
```html
<ui5-li additional-text-state="Critical"></ui5-li>
<ui5-li additional-text-state="Critical"></ui5-li>
<ui5-li additional-text-state="Success"></ui5-li>
```

### ui5-list

| Changed item | Old       | New                                                                  | 
|--------------|-----------|----------------------------------------------------------------------|
| Property     | `busy`      | `loading`                                                            | 
| Property     | `busyDelay` | `loadingDelay`                                                       |
| Property     | `mode`      | `selectionMode` + additionally the values of `ListMode` have changed |
 
 - If you have previously used the `busy`, `busyDelay` properties:
```html
<ui5-list busy busy-delay="500"></ui5-list>
```
now you must use  `loading` and `loadingDelay` properties:
```html
<ui5-list loading loading-delay="500"></ui5-list>
```

 - If you have previously used the `mode` property and the `ListMode` values:
```html
<ui5-list mode="SingleSelect">
<ui5-list mode="MultiSelect">
```
Now use `selectionMode`  and `Single`, `Multiple` instead:
```html
<ui5-list selection-mode="Single">
<ui5-list selection-mode="Multiple">
```

### ui5-message-strip

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | design="Warning" | design="Critical" | 

- The property values `Warning`  are renamed to `Critical`. If you previously used it like:
```html
<ui5-message-strip design="Warning"></ui5-message-strip>
```
Now you have to use it like:
```html
<ui5-message-strip design="Critical"></ui5-message-strip>
```



### ui5-multi-combobox

| Changed item                 | Old        | New           | 
|------------------------------|------------|---------------|
| Property                     | `allowCustomValues` | `noValidation` | 

- The `allowCustomValues` property has been renamed to `noValidation`.
  If you have previously used the `allowCustomValues` property
  `<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>`
  Now use noValidation instead:
  `<ui5-multi-combobox no-validation></ui5-multi-combobox>`


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-multi-combobox value-state="Error"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Warning"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Success"></ui5-multi-combobox>
```
Now you have to use it like:
```html
<ui5-multi-combobox value-state="Negative"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Critical"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Success"></ui5-multi-combobox>
```


### ui5-option

| Changed item                 | Old        | New           | 
|------------------------------|------------|---------------|
| Property                     | `disabled` | N/A (removed) | 

 - The `disabled` property of the `ui5-option` is removed.
   If you have previously used the `disabled` property:
```html
<ui5-option disabled>Option</ui5-option>
```
it will no longer work for the component. Instead, do not render disabled options in the first place.

### ui5-popover

| Changed item                 | Old               | New                                     | 
|------------------------------|-------------------|-----------------------------------------|
| Property                     | `horizontalAlign` | values have changed, f.e. `Left` to `Start` | 
| Property                     | `placementType` | `placement` | 
| `placement` type enumeration | `PopoverPlacementType` | `PopoverPlacement` | 

- The `Left` and `Right` options have been renamed. If you previously used them to set the placement or the alignment of the popover:
```html
<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
```
Now use `Start` or `End` instead:
```html
<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
```

 - The `placementType` property and the `PopoverPlacementType` enum have been renamed.
   If you have previously used the `placementType` property and the `PopoverPlacementType`
```html
<ui5-popover placement-type="Bottom"></ui5-popover>
```
```js
import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
```
Now use `placement` instead:
```html
<ui5-placement="Bottom"></ui5-popover>
```
```js
import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
```

### ui5-progress-indicator

| Changed item | Old       | New          | 
|--------------|-----------|--------------|
| Property     | `disabled`  | N/A        | 

 - The `disabled` property of the `ui5-progress-indicator` is removed.
If you have previously used the `disabled` property, it won't take effect:
```html
<ui5-progress-indicator disabled value="60"></ui5-progress-indicator>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-rogress-indicator value-state="Error"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Warning"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Success"></ui5-rogress-indicator>
```
Now you have to use it like:
```html
<ui5-rogress-indicator value-state="Negative"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Critical"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Success"></ui5-rogress-indicator>
```

### ui5-radio-button


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-radio-button value-state="Error"></ui5-radio-button>
<ui5-radio-button value-state="Warning"></ui5-radio-button>
<ui5-radio-button value-state="Success"></ui5-radio-button>
```
Now you have to use it like:
```html
<ui5-radio-button value-state="Negative"></ui5-radio-button>
<ui5-radio-button value-state="Critical"></ui5-radio-button>
<ui5-radio-button value-state="Success"></ui5-radio-button>
```

### ui5-select


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-select value-state="Error"></ui5-select>
<ui5-select value-state="Warning"></ui5-select>
<ui5-select value-state="Success"></ui5-select>
```
Now you have to use it like:
```html
<ui5-select value-state="Negative"></ui5-select>
<ui5-select value-state="Critical"></ui5-select>
<ui5-select value-state="Success"></ui5-select>
```

### ui5-segmented-button


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | mode | selectionMode | 
| Readonly Property     | selectedItem | selectedItems | 

- The property `mode` has been renamed to `selectionMode`. The selection modes are renamed from `SingleSelect` and `MultiSelect` to `Single` and `Multiple`. 

If you previously used it as follows:
```html
<ui5-segmented-button mode="SingleSelect"></ui5-segmented-button>
<ui5-segmented-button mode="MultiSelect"></ui5-segmented-button>
```
Now you have to use:
```html
<ui5-segmented-button selection-mode="Single"></ui5-segmented-button>
<ui5-segmented-button selection-mode="Multiple"><ui5-segmented-button>
```
- The read-only getter `selectedItem` has been replaced by `selectedItems` as multiple items can be selected.

### ui5-segmented-button-item

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | pressed | selected | 
| Property     | design | ---- | 
| Property     | iconEnd | ---- | 
| Property     | submits | ---- | 
| Property     | type | ---- | 
| Property     | accessibilityAttributes | ---- | 
| Property     | accessibleRole | ---- | 

- The property `pressed` has been renamed to `selected`.

If you previously used it as follows:
```html
<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item pressed>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
```
Now you have to use it as follows:
```html
<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item selected>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
```

- The property `design` has been inherited but never had effect and it's now removed.
- The property `iconEnd` has been inherited but never had effect and it's now removed.
- The property `submits` has been inherited but never had effect and it's now removed.
- The property `type` has been inherited but never had effect and it's now removed.
- The property `accessibilityAttributes` has been inherited but never had effect and it's now removed.
- The property `accessibleRole` has been inherited but never had effect and it's now removed.

### ui5-step-input

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-step-input value-state="Error"></ui5-step-input>
<ui5-step-input value-state="Warning"></ui5-step-input>
<ui5-step-input value-state="Success"></ui5-step-input>
```
Now you have to use it like:
```html
<ui5-step-input value-state="Negative"></ui5-step-input>
<ui5-step-input value-state="Critical"></ui5-step-input>
<ui5-step-input value-state="Success"></ui5-step-input>
```

### ui5-time-picker


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-time-picker value-state="Error"></ui5-time-picker>
<ui5-time-picker value-state="Warning"></ui5-time-picker>
<ui5-time-picker value-state="Success"></ui5-time-picker>
```
Now you have to use it like:
```html
<ui5-time-picker value-state="Negative"></ui5-time-picker>
<ui5-time-picker value-state="Critical"></ui5-time-picker>
<ui5-time-picker value-state="Success"></ui5-time-picker>
```




### ui5-tab-container

| Changed item                | Old                            | New                   | 
|-----------------------------|--------------------------------|-----------------------|
| Property                    | `fixed`                        | N/A (removed)         |
| Property                    | `tabsOverflowMode`             | `overflowMode`        |
| Type for `backgroundDesign` | `TabContainerBackgroundDesign` | `BackgroundDesign`    |
| Property                    | `showOverflow`                 | `overflowButton` slot |
| TS interface                | `ITab`                         | N/A (removed)         |

 - Property "fixed" is removed and there is no alternative provided. The TabContainer is no longer expandable/collapsible via use interaction. You can still show the TabContainer collapsed via the "collapsed" property.

 - If you have previously used:
```html
<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
```
Now use:
```html
<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
```

 - If you previously imported `TabContainerBackgroundDesign`, use `BackgroundDesign` instead.

 - The `showOverflow` property is removed. If previously you have used:
```html
<ui5-tabcontainer show-overflow></ui5-tabcontainer>
```
now use the `overflowButton` slot:
```html
<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
```

 - You can no longer import and implement the `ITab` interface. TabContainer is designed to work only with Tab and TabSeparator classes, so the interface was obsolete.

### ui5-tab

| Changed item  | Old                   | New                | 
|---------------|-----------------------|--------------------|
| Public method | `getTabInStripDomRef` | `getDomRefInStrip` |
| Slot          | `subTabs`            | `items`            |

- If previously you have used:
```js
someTab.getTabInStripDomRef();
```
Now use:
```js
someTab.getDomRefInStrip();
```

 - If you have previously used:
```html
<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
```
Now use:
```html
<ui5-tab id="nestedTab" slot="items"></ui5-tab>
```

### ui5-tab-separator

| Changed item  | Old   | New | 
|---------------|-------|-----|
| Public method | `getTabInStripDomRef` | `getDomRefInStrip` |

- If previously you have used:
```js
someTabSeparator.getTabInStripDomRef();
```
Now use:
```js
someTabSeparator.getDomRefInStrip();
```

### ui5-textarea

| Changed item | Old       | New                                                                 | 
|--------------|-----------|---------------------------------------------------------------------|
| Property     | `growingMaxLines`      | `growingMaxRows` |

 - The `growingMaxLines` property has been renamed to `growingMaxRows`.

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | value-state="Error/Warning/Success" | value-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-textarea value-state="Error"></ui5-textarea>
<ui5-textarea value-state="Warning"></ui5-textarea>
<ui5-textarea value-state="Success"></ui5-textarea>
```
Now you have to use it like:
```html
<ui5-textarea value-state="Negative"></ui5-textarea>
<ui5-textarea value-state="Critical"></ui5-textarea>
<ui5-textarea value-state="Success"></ui5-textarea>
```

### ui5-tree

| Changed item | Old       | New                                                                  | 
|--------------|-----------|----------------------------------------------------------------------|
| Property     | `mode`      | `selectionMode` + additionally the values of `ListMode` have changed |


- If you have previously used the `mode` property and the `ListMode` values:
```html
<ui5-tree mode="SingleSelect">
<ui5-tree mode="MultiSelect">
```
Now use `selectionMode`  and `Single`, `Multiple` instead:
```html
<ui5-tree selection-mode="Single">
<ui5-tree selection-mode="Multiple">

```

### ui5-tree-item


| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | highlight="Error/Warning/Success" | highlight="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-tree-item highlight="Error"></ui5-tree-item>
<ui5-tree-item highlight="Warning"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
```
Now you have to use it like:
```html
<ui5-tree-item highlight="Negative"></ui5-tree-item>
<ui5-tree-item highlight="Critical"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
```

| Changed item | Old     | New     | 
|--------------|---------|---------|
| Property     | additional-text-state="Error/Warning/Success" | additional-text-state="Negative/Critical/Positive" | 

- The property values `Error/Warning/Success`  are renamed to `Negative/Critical/Positive`. If you previously used it like:
```html
<ui5-tree-item additional-text-state="Error"></ui5-tree-item>
<ui5-tree-item additional-text-state="Warning"></ui5-tree-item>
<ui5-tree-item additional-text-state="Success"></ui5-tree-item>
```
Now you have to use it like:
```html
<ui5-tree-item additional-text-state="Negative"></ui5-tree-item>
<ui5-tree-item additional-text-state="Critical"></ui5-tree-item>
<ui5-tree-item additional-text-state="Success"></ui5-tree-item>
```


## Fiori package (@ui5/webcomponents-fiori)

### ui5-bar

- The `ui5-bar` component is now in `main` library. If you previously imported  the `ui5-bar` from `fiori`:
```ts
import "@ui5/webcomponents-fiori/dist/Bar.js;
```
Now, import the `ui5-bar` from `main`:
```ts 
import "@ui5/webcomponents/dist/Bar.js";
```

### ui5-barcode-scanner-dialog

| Changed item  | Old       | New             | 
|---------------|-----------|-----------------|
| Public method | `show()`  | `open` property |
| Public method | `close()` | `open` property |

- The `show` and `close` public methods have been removed. Use the public property `open` instead.

For example, if you used:

```js
d.show();
...
d.close();
```

use:

```js
d.open = true;
...
d.open = false;
```

instead.



### ui5-flexible-column-layout
| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `accessibilityTexts` | removed |
| Property     | `accessibilityRoles` | removed |

- The `accessibilityTexts` and `accessibilityRoles` properties of the `ui5-flexible-column-layout` are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
fcl.accessibilityTexts = {
    startColumnAccessibleName: "Products list",
    midColumnAccessibleName: "Product information",
    endColumnAccessibleName: "Product detailed information",
    startArrowLeftText: "Collapse products list",
    startArrowRightText: "Expand products list",
    endArrowLeftText: "Expand product detailed information",
    endArrowRightText: "Collapse product detailed information",
    startArrowContainerAccessibleName: "Start Arrow Container",
    endArrowContainerAccessibleName: "End Arrow Container",
}

fclAccRoles.accessibilityRoles = {
    startColumnRole: "complementary",
    startArrowContainerRole: "navigation",
    midColumnRole: "main",
    endArrowContainerRole: "navigation",
    endColumnRole: "complementary".
}
```

Now use `accessibilityAttributes` instead:
```js
fcl.accessibilityAttributes = {
    startColumn: {
      role: "complementary"
      name: "Products list",
    },
    midColumn: {
      role: "complementary"
      name: "Product information",
    },
    endColumn: {
      role: "complementary"
      name: "Product detailed information",
    },
    startArrowLeft:  {
      name: "Collapse products list",
    },
    startArrowRight: {
      name: "Expand products list",
    },
    endArrowLeft: {
      name: "Expand product detailed information",
    },
    endArrowRight:  {
      name: "Collapse product detailed information",
    },
    startArrowContainer: {
      role: "navigation"
      name: "Start Arrow Container",
    },
    endArrowContainer: {
      role: "navigation"
      name: "End Arrow Container",
    },
};
```

### ui5-illustrated-message

| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `size` | `design` |

- The `size` property of the `ui5-illustrated-message` is renamed to `design`.
  If you have previously used the `size` property:
```html
<ui5-illustrated-message size="Dialog">
```
Now use `design` instead:
```html
<ui5-illustrated-message design="Dialog">
```


### ui5-shellbar
| Changed item | Old    | New                                                           | 
|--------------|--------|---------------------------------------------------------------|
| Property     | `accessibilityTexts` | removed |
| Property     | `accessibilityRoles` | removed |

- The `accessibilityTexts` and `accessibilityRoles` properties of the `ui5-shellbar` are removed. If you have previously used the `accessibilityTexts` or `accessibilityRoles` properties:
```js
shellbar.accessibilityTexts = {
    profileButtonTitle: "John Dow",
    logoTitle: "Custom logo title",
}

shellbar.accessibilityRoles = {
		logoRole: "link"
};
```
Now use `accessibilityAttributes` instead:
```js
shellbar.accessibilityAttributes = {
    profile: {
      name:  "John Dow",
    },
    logo: {
      role: "link"
      name: "Custom logo title"
    },
};
```


### ui5-upload-collection

| Changed item            | Old                                         | New                                                                  | 
|-------------------------|---------------------------------------------|----------------------------------------------------------------------|
| Property                | `mode`                                      | `selectionMode`                                                      |
| `mode` type enumeration | values: `SingleSelect`, `MultiSelect`, etc. | values: `Single`, `Multiple`, etc.                                    |
| Property                | `selectionMode`                             | no longer accepts `Delete` as value in favor of `hide-delete-button` |
| TS Interface            | `IUploadCollectionItem`                     | `UploadCollectionItem` type                                          |

- If you have previously used the `mode` property and the `ListMode` values:
```html
<ui5-upload-collection mode="SingleSelect">
<ui5-upload-collection mode="MultiSelect">
```
Now use `selectionMode`  and `Single`, `Multiple` instead:
```html
<ui5-upload-collection selection-mode="Single">
<ui5-upload-collection selection-mode="Multiple">

```

- The `selectionMode` property no longer accepts "Delete" as value.
  If you have previously used it:
```html
<ui5-upload-collection selection-mode="Delete"></ui5-upload-collection>
```
Now omit it completely and use `hide-delete-button` onto the ui5-upload-collection:
```html
<ui5-upload-collection>
   <ui5-upload-collection-item hide-delete-button>  </ui5-upload-collection-item>
</ui5-upload-collection>
```

- Removed the `IUploadCollectionItem` interface. If you previously used the interface:
```js
import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
```
Use the `UploadCollectionItem` type instead:
```js
import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
```

## Icons packages

| Changed item | Old            | New           | 
|--------------|----------------|---------------|
| Icon         | `soccor`       | `soccer`      | 
| Icon         | `add-polygone` | `add-polygon` | 

 - Removed `soccor` icon. Use `soccer` instead.
 - Removed `add-polygone` icon. Use `add-polygon` instead.
