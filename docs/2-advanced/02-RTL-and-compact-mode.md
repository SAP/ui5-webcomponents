# Right-To-Left (RTL) and Compact Mode

*This section explains how to make UI5 Web Components render in **RTL** and **compact mode**.*

**Note:** Both of these settings are not properties of the components per se, but rather markers you set on some part of the HTML page that affect all components inside.

## RTL Support

Some UI5 Web Components are RTL-aware, meaning they render differently when placed in an RTL-designated part of the DOM tree.

### Setting RTL

To have the components render in RTL mode, just set the HTML attribute `dir` to `rtl` on the component itself, the `body`, `html` or any other relevant region of your application.

Example 1: 
```html
<body dir="rtl">
    ...
</body>
```
(RTL will be set for all UI5 Web Components on the page.)

Example 2:
```html
<body>
    <ui5-button>Button 1</ui5-button>
    <div dir="rtl">
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button dir="rtl">Button 3</ui5-button>
</body>
```
(RTL will be set for Button 2 and Button 3.)

### Changing RTL Dynamically

The first time UI5 Web Components are rendered, they will take into account the `dir` attribute  of the respective part of the DOM tree they are placed in.

However, if you change `dir` dynamically afterwards, you must call the `applyDirection` method to re-render all RTL-aware components.

Example:
```js
import applyDirection from "@ui5/webcomponents-base/dist/locale/applyDirection.js";

document.body.dir = "rtl";
applyDirection();
```

*Technical Note:* Whenever you change the `dir` attribute, the browser will automatically re-render that part of the DOM tree (including any Web Components) by default.
The `applyDirection` call is only needed to adjust paddings, margins and other CSS selectors that are not affected by `dir`. As more advanced CSS
features become available in the near future, `applyDirection` will not be needed and will eventually be deprecated.

## Compact Mode

Some UI5 Web Components support compact mode, meaning they can be rendered with smaller sizes, margins and paddings in order to preserve as much space as possible.

To enable compact mode, use any of the following markers on the component itself, the `body`, `html` or any other relevant region of your application:
 - `data-ui5-compact-size` **attribute**
 - `ui5-content-density-compact` **class**

Example 1:

```html
<body data-ui5-compact-size>
...
</body>
```
(Compact mode is set for all UI5 Web Components on the page.)

Example 2:
```html
<body>
    <ui5-button>Button 1</ui5-button>
    <div data-ui5-compact-size>
        <ui5-button>Button 2</ui5-button>
    </div>

    <ui5-button class="ui5-content-density-compact">Button 3</ui5-button>
</body>
```
(Compact mode will be set for Button 2 and Button 3.)

Unlike RTL, compact mode does not require additional APIs when its markers are changed dynamically.

Next: [Micro-Frontends and Custom Elements Scoping](./03-scoping.md)
