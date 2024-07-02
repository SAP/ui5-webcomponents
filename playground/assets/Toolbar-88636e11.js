import{j as e}from"./jsx-runtime-670e1be8.js";import{M as i}from"./index-6087c063.js";import{B as r,F as a}from"./Banner-a1178143.js";import{u as s}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-ec263bb9.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function o(n){const t=Object.assign({h1:"h1",p:"p",em:"em",code:"code",ol:"ol",li:"li",h2:"h2",h3:"h3",a:"a",pre:"pre",strong:"strong"},s(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Internal/Toolbar"}),`
`,e.jsx(r,{}),`
`,e.jsx(t.h1,{id:"creating-a-web-component-abstract-item-to-be-used-inside-toolbar",children:"Creating a web component abstract item to be used inside Toolbar"}),`
`,e.jsxs(t.p,{children:[e.jsx(t.em,{children:"This section explains how to build abstract items in order to be compatible with UI5 Toolbar."}),`
`,e.jsxs(t.em,{children:["It will guide you through the process of how we created ",e.jsx(t.code,{children:"ui5-toolbar-button"}),`, to be
compatible with `,e.jsx(t.code,{children:"ui5-toolbar"}),". Currently developed items can be used without those efforts. They are:"]})]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"ui5-toolbar-button"}),`
`,e.jsx(t.li,{children:"ui5-toolbar-select"}),`
`,e.jsx(t.li,{children:"ui5-toolbar-separator"}),`
`,e.jsx(t.li,{children:"ui5-toolbar-spacer"}),`
`]}),`
`,e.jsx(t.h2,{id:"abstract-items",children:"Abstract items"}),`
`,e.jsx(t.p,{children:" "}),`
`,e.jsx(t.h3,{id:"why-are-abstract-items-needed",children:"Why are abstract items needed?"}),`
`,e.jsxs(t.p,{children:[` 
When the toolbar renders its slotted items within a popover in the static area, simply relocating the actual DOM nodes within its slots can lead to reference issues, causing the slotted nodes to lose their parent reference (e.g., the toolbar). This is the reason why the toolbar must operate with abstract items. Abstract items are not rendered directly within the DOM; instead, they function as data used by the toolbar to produce corresponding physical web components. On the other hand, useful modifications detected by the toolbar on the physical items are synchronised with the abstract ones. (see step `,e.jsx(t.a,{href:"#events",children:"Events"}),`)
 
The `,e.jsx(t.code,{children:"ui5-toolbar"}),` is a composite web component, that slots different UI5 components, designing them as abstract items. They can contain
properties, slots and events, and they can match the API of already existing component.
In order to be suitable for usage inside `,e.jsx(t.code,{children:"ui5-toolbar"}),", each component should adhere to following guidelines:"]}),`
`,e.jsxs(t.ol,{children:[`
`,e.jsx(t.li,{children:"The component needs to implement a class with component name of the following type:"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`ToolbarButton.ts
`})}),`
`,e.jsxs(t.ol,{start:"2",children:[`
`,e.jsx(t.li,{children:"The new component needs to implement two template files with name of the following type:"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`ToolbarButton.hbs and ToolbarPopoverButton.hbs
`})}),`
`,e.jsxs(t.ol,{start:"3",children:[`
`,e.jsxs(t.li,{children:["It needs to implement ",e.jsx(t.strong,{children:"customElement"})," decorator, which is good to contain custom tag name:"]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`@customElement({
    tag: "ui5-toolbar-button"
})
`})}),`
`,e.jsxs(t.ol,{start:"4",children:[`
`,e.jsxs(t.li,{children:["The class should extend ",e.jsx(t.strong,{children:"ToolbarItem"})," base class, which should also be added as a dependency."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`class ToolbarButton extends ToolbarItem
`})}),`
`,e.jsxs(t.ol,{start:"5",children:[`
`,e.jsx(t.li,{children:"Inside the module there should be two template getters: for toolbar and popover representation."}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`static get toolbarTemplate() {
    return ToolbarButtonTemplate;
}

static get toolbarPopoverTemplate() {
    return ToolbarPopoverButtonTemplate;
}
`})}),`
`,e.jsxs(t.ol,{start:"6",children:[`
`,e.jsxs(t.li,{children:["After the class declaration there should be a registry call for the item inside the toolbar. ",e.jsx(t.strong,{children:"registerToolbarItem"})," helper should be added as a dependency."]}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`import { registerToolbarItem } from "./ToolbarRegistry.js";
`})}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`registerToolbarItem(ToolbarButton);
`})}),`
`,e.jsxs(t.ol,{start:"7",children:[`
`,e.jsx(t.li,{children:"In the templates there should be mapping of the properties that need to be used in the component inside Toolbar."}),`
`]}),`
`,e.jsx(t.p,{children:`Inside ToolbarButton.ts:
 `}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-typescript",children:`@property()
text!: string;
 
@property({ type: Boolean })
disabled!: boolean;
`})}),`
`,e.jsx(t.p,{children:` 
Inside ToolbarButtonTemplate.hbs:
 `}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<ui5-button
  class="ui5-tb-item"
  ?disabled="{{this.disabled}}"
  data-ui5-external-action-item-id="{{this._id}}"
  data-ui5-stable="{{this.stableDomRef}}"
>
  {{this.text}}
</ui5-button>
`})}),`
`,e.jsxs(t.ol,{start:"8",children:[`
`,e.jsxs(t.li,{children:["The new component's DOM root element needs to have ",e.jsx(t.code,{children:'"ui5-tb-item"'})," CSS class in order to get default styles for item (margins etc.)."]}),`
`,e.jsx(t.li,{children:"The new class needs to be added to the bundle file in the corresponding library."}),`
`]}),`
`,e.jsx(t.p,{children:"Inside bundle.common.js:"}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`import ToolbarButton from "./dist/ToolbarButton.js";
`})}),`
`,e.jsxs(t.ol,{start:"10",children:[`
`,e.jsx(t.li,{children:"Use your newly created component inside the ui5-toolbar like this:"}),`
`]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-html",children:`<ui5-toolbar>
  <ui5-toolbar-button text="Button 1" disabled></ui5-toolbar-button>
  <ui5-toolbar-button text="Button 2"></ui5-toolbar-button>
</ui5-toolbar>
`})}),`
`,e.jsx(t.h2,{id:"events",children:"Events"}),`
`,e.jsxs(t.p,{children:[` 
Abstract items can provide a map of events through the `,e.jsx(t.code,{children:"subscribedEvents"})," getter. The toolbar will actively monitor these events on the physical items, and when triggered, it will also fire the information to the corresponding abstract item. This mechanism proves useful when the abstract item requires synchronization of changes or interactions with the physical items. Importantly, events described as public offer benefits to consumers of the abstract items informing them about interactions with the physical elements. Additionally, the map contains information about the popover, such as ",e.jsx(t.code,{children:"preventClosing: true"}),`, which ensures that the popover remains open when this event is triggered by the physical item.
 
A good example is the Map of the `,e.jsx(t.code,{children:"ui5-toolbar-select"}),`:
 `]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-javascript",children:`get subscribedEvents() {
  const map = new Map();
 
  map.set("click", { preventClosing: true });
  map.set("change", { preventClosing: false });
  map.set("open", { preventClosing: true });
  map.set("close", { preventClosing: true });
 
  return map;
}
`})}),`
`,e.jsxs(t.p,{children:[` 
The `,e.jsx(t.code,{children:"ui5-toolbar-select"})," then waits for the toolbar to fire the ",e.jsx(t.code,{children:"change"})," event, in order to notify (synchronize) its ",e.jsx(t.code,{children:"options"}),` slots:
 `]}),`
`,e.jsx(t.pre,{children:e.jsx(t.code,{className:"language-ts",children:`_onEventHandler(e: Event): void {
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
`})}),`
`,e.jsx(a,{})]})}function f(n={}){const{wrapper:t}=Object.assign({},s(),n.components);return t?e.jsx(t,Object.assign({},n,{children:e.jsx(o,n)})):o(n)}export{f as default};
