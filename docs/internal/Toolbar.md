# Creating a web component abstract item to be used inside Toolbar

*This section explains how to build abstract items in order to be compatible with UI5 Toolbar.*
*It will guide you through the process of how we created `ui5-toolbar-button`, to be
compatible with `ui5-toolbar`. Currently developed items can be used without those efforts. They are:*
1. ui5-toolbar-button
2. ui5-toolbar-select
3. ui5-toolbar-separator
4. ui5-toolbar-spacer

## Abstract items
 
### Why are abstract items needed?
 
When the toolbar renders its slotted items within a popover in the static area, simply relocating the actual DOM nodes within its slots can lead to reference issues, causing the slotted nodes to lose their parent reference (e.g., the toolbar). This is the reason why the toolbar must operate with abstract items. Abstract items are not rendered directly within the DOM; instead, they function as data used by the toolbar to produce corresponding physical web components. On the other hand, useful modifications detected by the toolbar on the physical items are synchronised with the abstract ones. (see step [Events](#events))
 
The `ui5-toolbar` is a composite web component, that slots different UI5 components, designing them as abstract items. They can contain
properties, slots and events, and they can match the API of already existing component.
In order to be suitable for usage inside `ui5-toolbar`, each component should adhere to following guidelines:


1. The component needs to implement a class with component name of the following type:

```javascript
ToolbarButton.ts
```

2. The new component needs to implement two template files with name of the following type:

```javascript
ToolbarButton.hbs and ToolbarPopoverButton.hbs
```

3. It needs to implement **customElement** decorator, which is good to contain custom tag name:

```javascript
@customElement({
    tag: "ui5-toolbar-button"
})
```

4. The class should extend **ToolbarItem** base class, which should also be added as a dependency.

```javascript
class ToolbarButton extends ToolbarItem
```

5. Inside the module there should be two template getters: for toolbar and popover representation.

```javascript
static get toolbarTemplate() {
    return ToolbarButtonTemplate;
}

static get toolbarPopoverTemplate() {
    return ToolbarPopoverButtonTemplate;
}
```

6. After the class declaration there should be a registry call for the item inside the toolbar. **registerToolbarItem** helper should be added as a dependency.

```javascript
import { registerToolbarItem } from "./ToolbarRegistry.js";
```

```javascript
registerToolbarItem(ToolbarButton);
```

7. In the templates there should be mapping of the properties that need to be used in the component inside Toolbar.

Inside ToolbarButton.ts:
 
```typescript
@property()
text!: string;
 
@property({ type: Boolean })
disabled!: boolean;
```
 
Inside ToolbarButtonTemplate.hbs:
 
```html
<ui5-button
  class="ui5-tb-item"
  ?disabled="{{this.disabled}}"
  data-ui5-external-action-item-id="{{this._id}}"
  data-ui5-stable="{{this.stableDomRef}}"
>
  {{this.text}}
</ui5-button>
```
8. The new component's DOM root element needs to have `"ui5-tb-item"` CSS class in order to get default styles for item (margins etc.).
9. The new class needs to be added to the bundle file in the corresponding library.

Inside bundle.common.js:
```javascript
import ToolbarButton from "./dist/ToolbarButton.js";
```
10. Use your newly created component inside the ui5-toolbar like this:

```html
<ui5-toolbar>
  <ui5-toolbar-button text="Button 1" disabled></ui5-toolbar-button>
  <ui5-toolbar-button text="Button 2"></ui5-toolbar-button>
</ui5-toolbar>
```

## Events
 
Abstract items can provide a map of events through the `subscribedEvents` getter. The toolbar will actively monitor these events on the physical items, and when triggered, it will also fire the information to the corresponding abstract item. This mechanism proves useful when the abstract item requires synchronization of changes or interactions with the physical items. Importantly, events described as public offer benefits to consumers of the abstract items informing them about interactions with the physical elements. Additionally, the map contains information about the popover, such as `preventClosing: true`, which ensures that the popover remains open when this event is triggered by the physical item.
 
A good example is the Map of the `ui5-toolbar-select`:
 
```javascript
get subscribedEvents() {
  const map = new Map();
 
  map.set("click", { preventClosing: true });
  map.set("change", { preventClosing: false });
  map.set("open", { preventClosing: true });
  map.set("close", { preventClosing: true });
 
  return map;
}
```
 
The `ui5-toolbar-select` then waits for the toolbar to fire the `change` event, in order to notify (synchronize) its `options` slots:
 
```ts
_onEventHandler(e: Event): void {
  if (e.type === "change") {
    // update options
    const selectedOption = (e as CustomEvent<ToolbarSelectChangeEventDetail>).detail.selectedOption;
    const selectedOptionIndex = Number(selectedOption?.getAttribute("data-ui5-external-action-item-index"));
    this.options.forEach((option: Option, index: number) => {
      if (index === selectedOptionIndex) {
        option.setAttribute("selected", "");
      } else {
        option.removeAttribute("selected");
      }
    });
  }
}
```