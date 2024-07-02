import{j as e}from"./jsx-runtime-670e1be8.js";import{M as d}from"./index-2d5b4761.js";import{F as l}from"./Footer-3006da85.js";import{u as r}from"./index-bd2d4f36.js";import"./index-4e9ba9b8.js";import"./_commonjsHelpers-725317a4.js";import"./iframe-c68ca0b6.js";import"../sb-preview/runtime.js";import"./index-11d98b33.js";import"./index-d38538b0.js";import"./index-356e4a49.js";function s(n){const i=Object.assign({h1:"h1",p:"p",h2:"h2",table:"table",thead:"thead",tr:"tr",th:"th",tbody:"tbody",td:"td",code:"code",ul:"ul",li:"li",pre:"pre",h3:"h3"},r(),n.components);return e.jsxs(e.Fragment,{children:[e.jsx(d,{title:"Docs/Migrating to version 2.0 guide"}),`
`,e.jsx(i.h1,{id:"ui5-web-components-20-migration-guide",children:"UI5 Web Components 2.0 migration guide"}),`
`,e.jsx(i.p,{children:"This documentation will assist you in seamlessly transitioning from UI5 Web Components v1.x to the latest version, UI5 Web Components 2.0."}),`
`,e.jsx(i.h2,{id:"general-and-framework",children:"General and Framework"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"UI5Element#render"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"UI5Element#renderer"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"Device#isIE"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"N/A"})," (removed)"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Module"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"CSP.js"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"N/A"})," (removed)"]})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(i.code,{children:"npm init"})," Option"]}),e.jsx(i.td,{children:e.jsx(i.code,{children:"JavaScript"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"N/A"})," (removed)"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Code Documentation"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"API.json"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"custom-elements-manifest.json"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Assets file"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"Assets-static.js"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"Assets.js"})," (dynamic)"]})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Removed ",e.jsx(i.code,{children:"UI5Element#render"})," method in favour of ",e.jsx(i.code,{children:"UI5Element#renderer"}),'. If you previously used "render"']}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`class MyClass extends UI5Element {
    static get render() {
        return litRenderer;
    }
}
`})}),`
`,e.jsx(i.p,{children:'start using "renderer"'}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`class MyClass extends UI5Element {
    static get renderer() {
        return litRenderer;
    }
}
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[e.jsx(i.code,{children:"Device#isIE"})," method has been removed and no longer available"]}),`
`,e.jsxs(i.li,{children:["Removed the ",e.jsx(i.code,{children:"CSP.js"})," module and the creation of ",e.jsx(i.code,{children:"<style>"})," and ",e.jsx(i.code,{children:"<link>"})," tags, as all browsers now support adoptedStyleSheets. The following APIs are not available any more and should not be used:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import { setUseLinks } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPackageCSSRoot } from "@ui5/webcomponents-base/dist/CSP.js"
import { setPreloadLinks } from "@ui5/webcomponents-base/dist/CSP.js"
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:[`Removed the JavaScript template option from @ui5/create-webcomponents-package
Previously `,e.jsx(i.code,{children:"npm init @ui5/webcomponents-package"}),` used to create JS-based project, however now it will be TypeScript-based project.
If you previously used `,e.jsx(i.code,{children:"npm init @ui5/webcomponents-package --enable-typescript"})," to create  TypeScript-based project, now it's by default, e.g ",e.jsx(i.code,{children:"npm init @ui5/webcomponents-package"})," and ",e.jsx(i.code,{children:"--enable-typescript"})," is removed."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["The JSDoc plugin has been removed, and the generation of ",e.jsx(i.code,{children:"api.json"})," has stopped. If you previously relied on the ",e.jsx(i.code,{children:"ui5-package/dist/api.json file"}),", you can now use ",e.jsx(i.code,{children:"ui5-package/dist/custom-elements.json"})]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["All ",e.jsx(i.code,{children:"Assets-static.js"})," modules are removed. If you previously imported any ",e.jsx(i.code,{children:"Assets-static.js"})," module from any package:"]}),`
`]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import "@ui5/webcomponents/dist/Assets-static.js";
import "@ui5/webcomponents-icons/dist/Assets-static.js"
`})}),`
`,e.jsx(i.p,{children:"use the dynamic equivalent of it:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import "@ui5/webcomponents/dist/Assets.js";
import "@ui5/webcomponents-icons/dist/Assets.js"
`})}),`
`,e.jsx(i.h2,{id:"main-package-ui5webcomponents",children:"Main package (@ui5/webcomponents)"}),`
`,e.jsx(i.h3,{id:"ui5-badge",children:"ui5-badge"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"tag"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"ui5-badge"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"ui5-tag"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The Badge ",e.jsx(i.code,{children:"ui5-badge"})," has been renamed to Tag ",e.jsx(i.code,{children:"ui5-tag"}),". If you have previously used the ",e.jsx(i.code,{children:"ui5-badge"}),":"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-badge></ui5-badge>
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"ui5-tag"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tag></ui5-tag>
`})}),`
`,e.jsx(i.h3,{id:"ui5-breadcrumbs",children:"ui5-breadcrumbs"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"separator-style"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"separators"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(i.code,{children:"separators"})," type enumeration"]}),e.jsx(i.td,{children:e.jsx(i.code,{children:"BreadcrumbsSeparatorStyle"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"BreadcrumbsSeparator"})})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"separator-style"})," property is renamed to  ",e.jsx(i.code,{children:"separators"})," and the ",e.jsx(i.code,{children:"BreadcrumbsSeparatorStyle"})," enum is renamed to ",e.jsx(i.code,{children:"BreadcrumbsSeparator"}),`.
If you have previously used the `,e.jsx(i.code,{children:"separator-style"})," property:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-breadcrumbs separator-style="Slash">
`})}),`
`,e.jsxs(i.p,{children:["Now use  ",e.jsx(i.code,{children:"separators"}),"  instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-breadcrumbs separators="Slash">
`})}),`
`,e.jsx(i.h3,{id:"ui5-busy-indicator",children:"ui5-busy-indicator"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"size"})}),e.jsxs(i.td,{children:["values have changed, f.e. ",e.jsx(i.code,{children:"Small"})," to ",e.jsx(i.code,{children:"S"})]})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"size"})," property now accepts different values. If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-busy-indicator size="Small"></ui5-busy-indicator>
`})}),`
`,e.jsx(i.p,{children:"Now use the new values instead:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-busy-indicator size="S"></ui5-busy-indicator>
`})}),`
`,e.jsx(i.h3,{id:"ui5-calendar",children:"ui5-calendar"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Event"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"selected-dates-change"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"selection-change"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The event ",e.jsx(i.code,{children:"selected-dates-change "})," is renamed to ",e.jsx(i.code,{children:"selection-change"}),`. In addition the event details
`,e.jsx(i.code,{children:"values"})," and ",e.jsx(i.code,{children:"dates"})," are renamed to ",e.jsx(i.code,{children:"selectedValues"})," and ",e.jsx(i.code,{children:"selectedDateValues"}),". If you previously used the Calendar event as follows:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`myCalendar.addEventListener("selected-dates-change", () => {
    const values = e.detail.values;
    const dates = e.detail.dates;
})
`})}),`
`,e.jsx(i.p,{children:"Now you have to use the new event name and details:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`myCalendar.addEventListener("selection-change", () => {
   const values = event.detail.selectedValues;
   const dates = event.detail.selectedDateValues;
})
`})}),`
`,e.jsx(i.h3,{id:"ui5-card",children:"ui5-card"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"TS Interface"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"ICardHeader"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"CardHeader"})," type"]})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Removed the ",e.jsx(i.code,{children:"ICardHeader"})," interface. If you previously used the interface"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import type { ICardHeader } from "@ui5/webcomponents-base/dist/Card.js"
`})}),`
`,e.jsx(i.p,{children:"Use the CardHeader type instead:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import type CardHeader from "@ui5/webcomponents-base/dist/CardHeader.js"
`})}),`
`,e.jsx(i.h3,{id:"ui5-card-header",children:"ui5-card-header"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"status"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"additional-text"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"CSS Shadow part"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"status"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"additional-text"})})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"status"})," property and its shadow part have been renamed. If you previously used them:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<style>
    .cardHeader::part(status) { ... }
</style>
<ui5-card-header status="3 of 10"></ui5-popover>
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"additionalText"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<style>
       .cardHeader::part(additional-text) { ... }
</style>
<ui5-card-header class="cardHeader" additional-text="3 of 10"></ui5-card-header>
`})}),`
`,e.jsx(i.h3,{id:"ui5-carousel",children:"ui5-carousel"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"pageIndicatorStyle"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"pageIndicatorType"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"pageIndicatorStyle"})," no longer exists. If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-carousel page-indicator-style="Numeric"></ui5-carousel>
`})}),`
`,e.jsxs(i.p,{children:["Now you should use ",e.jsx(i.code,{children:"pageIndicatorType"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-carousel page-indicator-type="Numeric"></ui5-carousel>
`})}),`
`,e.jsx(i.h3,{id:"ui5-color-palette-popover",children:"ui5-color-palette-popover"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"openPopover"})}),e.jsx(i.td,{children:"N/A (removed)"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"showAt"})}),e.jsx(i.td,{children:"N/A (removed)"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"openPopover"})," and ",e.jsx(i.code,{children:"showAt"})," methods are removed in favor of ",e.jsx(i.code,{children:"open"}),"  and ",e.jsx(i.code,{children:"opener"})," properties. If you previously used the imperative API:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`button.addEventListener("click", function(event) {
	colorPalettePopover.showAt(this);
});
`})}),`
`,e.jsx(i.p,{children:"Now the declarative API should be used instead:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-button id="opener">Open</ui5-button>
<ui5-color-palette-popover opener="opener">
`})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`button.addEventListener("click", function(event) {
	colorPalettePopover.open = !colorPalettePopover.open;
});
`})}),`
`,e.jsx(i.h3,{id:"ui5-color-picker",children:"ui5-color-picker"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"color"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"value"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"color"}),"  is renamed to ",e.jsx(i.code,{children:"value"}),". If you previously used the change event of the ColorPicker as follows:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-color-picker color="red"></ui5-color-picker>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like this:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-color-picker value="red"></ui5-color-picker>
`})}),`
`,e.jsx(i.h3,{id:"ui5-checkbox",children:"ui5-checkbox"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-checkbox value-state="Error"></ui5-checkbox>
<ui5-checkbox value-state="Warning"></ui5-checkbox>
<ui5-checkbox value-state="Success"></ui5-checkbox>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-checkbox value-state="Negative"></ui5-checkbox>
<ui5-checkbox value-state="Critical"></ui5-checkbox>
<ui5-checkbox value-state="Positive"></ui5-checkbox>
`})}),`
`,e.jsx(i.h3,{id:"ui5-combobox",children:"ui5-combobox"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-combobox value-state="Error"></ui5-combobox>
<ui5-combobox value-state="Warning"></ui5-combobox>
<ui5-combobox value-state="Success"></ui5-combobox>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-combobox value-state="Negative"></ui5-combobox>
<ui5-combobox value-state="Critical"></ui5-combobox>
<ui5-combobox value-state="Success"></ui5-combobox>
`})}),`
`,e.jsx(i.h3,{id:"ui5-date-picker",children:"ui5-date-picker"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-date-picker value-state="Error"></ui5-date-picker>
<ui5-date-picker value-state="Warning"></ui5-date-picker>
<ui5-date-picker value-state="Success"></ui5-date-picker>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-date-picker value-state="Negative"></date-picker>
<ui5-date-picker value-state="Critical"></date-picker>
<ui5-date-picker value-state="Success"></ui5-date-picker>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"method"}),e.jsx(i.td,{children:"openPicker, closePicker, isOpen"}),e.jsx(i.td,{children:"open"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The methods ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," and ",e.jsx(i.code,{children:"isOpen()"})," are replaced by ",e.jsx(i.code,{children:"open"})," property."]}),`
`]}),`
`,e.jsxs(i.p,{children:["If you previously used ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," or ",e.jsx(i.code,{children:"isOpen"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const datePicker = document.getElementById("exampleID");
datePicker.openPicker();
datePicker.closePicker();
`})}),`
`,e.jsxs(i.p,{children:["Now use the ",e.jsx(i.code,{children:"open"})," property respectively:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const datePicker = document.getElementById("exampleID");
datePicker.open = true;
datePicker.open = false;
`})}),`
`,e.jsx(i.h3,{id:"ui5-date-time-picker",children:"ui5-date-time-picker"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-datetime-picker value-state="Error"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Warning"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-datetime-picker value-state="Negative"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Critical"></ui5-datetime-picker>
<ui5-datetime-picker value-state="Success"></ui5-datetime-picker>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"method"}),e.jsx(i.td,{children:"openPicker, closePicker, isOpen"}),e.jsx(i.td,{children:"open"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The methods ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," and ",e.jsx(i.code,{children:"isOpen()"})," are replaced by ",e.jsx(i.code,{children:"open"})," property."]}),`
`]}),`
`,e.jsxs(i.p,{children:["If you previously used ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," or ",e.jsx(i.code,{children:"isOpen"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const datetimePicker = document.getElementById("exampleID");
datetimePicker.openPicker();
datetimePicker.closePicker();
`})}),`
`,e.jsxs(i.p,{children:["Now use the ",e.jsx(i.code,{children:"open"})," property respectively:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const datetimePicker = document.getElementById("exampleID");
datetimePicker.open = true;
datetimePicker.open = false;
`})}),`
`,e.jsx(i.h3,{id:"ui5-daterange-picker",children:"ui5-daterange-picker"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-daterange-picker value-state="Error"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Warning"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Success"></ui5-daterange-picker>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-daterange-picker value-state="Negative"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Critical"></ui5-daterange-picker>
<ui5-daterange-picker value-state="Success"></ui5-daterange-picker>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"method"}),e.jsx(i.td,{children:"openPicker, closePicker, isOpen"}),e.jsx(i.td,{children:"open"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The methods ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," and ",e.jsx(i.code,{children:"isOpen()"})," are replaced by ",e.jsx(i.code,{children:"open"})," property."]}),`
`]}),`
`,e.jsxs(i.p,{children:["If you previously used ",e.jsx(i.code,{children:"openPicker()"}),", ",e.jsx(i.code,{children:"closePicker()"})," or ",e.jsx(i.code,{children:"isOpen"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.openPicker();
dateRangePicker.closePicker();
`})}),`
`,e.jsxs(i.p,{children:["Now use the ",e.jsx(i.code,{children:"open"})," property respectively:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`const dateRangePicker = document.getElementById("exampleID");
dateRangePicker.open = true;
dateRangePicker.open = false;
`})}),`
`,e.jsx(i.h3,{id:"ui5-dialog",children:"ui5-dialog"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'state="Error/Warning/Success"'}),e.jsx(i.td,{children:'state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-dialog state="Error"></ui5-dialog>
<ui5-dialog state="Warning"></ui5-dialog>
<ui5-dialog state="Success"></ui5-dialog>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-dialog state="Negative"></ui5-dialog>
<ui5-dialog state="Critical"></ui5-dialog>
<ui5-dialog state="Success"></ui5-dialog>
`})}),`
`,e.jsx(i.h3,{id:"ui5-file-uploader",children:"ui5-file-uploader"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-file-uploader value-state="Error"></ui5-file-uploader>
<ui5-file-uploader value-state="Warning"></ui5-file-uploader>
<ui5-file-uploader value-state="Success"></ui5-file-uploader>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-file-uploader value-state="Negative"></ui5-file-uploader>
<ui5-file-uploader value-state="Critical"></ui5-file-uploader>
<ui5-file-uploader value-state="Success"></ui5-file-uploader>
`})}),`
`,e.jsx(i.h3,{id:"ui5-input",children:"ui5-input"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-input value-state="Error"></ui5-input>
<ui5-input value-state="Warning"></ui5-input>
<ui5-input value-state="Success"></ui5-input>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-input value-state="Negative"></ui5-input>
<ui5-input value-state="Critical"></ui5-input>
<ui5-input value-state="Success"></ui5-input>
`})}),`
`,e.jsx(i.h3,{id:"ui5-multi-input",children:"ui5-multi-input"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-multi-input value-state="Error"></ui5-multi-input>
<ui5-multi-input value-state="Warning"></ui5-multi-input>
<ui5-multi-input value-state="Success"></ui5-multi-input>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-multi-input value-state="Negative"></ui5-multi-input>
<ui5-multi-input value-state="Critical"></ui5-multi-input>
<ui5-multi-input value-state="Success"></ui5-multi-input>
`})}),`
`,e.jsx(i.h3,{id:"ui5-message-strip",children:"ui5-message-strip"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'design="Warning"'}),e.jsx(i.td,{children:'design="Critical"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Warning"}),"  are renamed to ",e.jsx(i.code,{children:"Critical"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-message-strip design="Warning"></ui5-message-strip>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-message-strip design="Critical"></ui5-message-strip>
`})}),`
`,e.jsx(i.h3,{id:"ui5-li",children:"ui5-li"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'highlight="Error/Warning/Success"'}),e.jsx(i.td,{children:'highlight="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-li highlight="Warning"></ui5-li>
<ui5-li highlight="Warning"></ui5-li>
<ui5-li highlight="Success"></ui5-li>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-li highlight="Critical"></ui5-li>
<ui5-li highlight="Critical"></ui5-li>
<ui5-li highlight="Success"></ui5-li>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'additionalTextState="Error/Warning/Success"'}),e.jsx(i.td,{children:'additional-text-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-li additional-text-state="Warning"></ui5-li>
<ui5-li additional-text-state="Warning"></ui5-li>
<ui5-li additional-text-state="Success"></ui5-li>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-li additional-text-state="Critical"></ui5-li>
<ui5-li additional-text-state="Critical"></ui5-li>
<ui5-li additional-text-state="Success"></ui5-li>
`})}),`
`,e.jsx(i.h3,{id:"ui5-list",children:"ui5-list"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"busy"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"loading"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"busyDelay"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"loadingDelay"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"mode"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"selectionMode"})," + additionally the values of ",e.jsx(i.code,{children:"ListMode"})," have changed"]})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If you have previously used the ",e.jsx(i.code,{children:"busy"}),", ",e.jsx(i.code,{children:"busyDelay"})," properties:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-list busy busy-delay="500"></ui5-list>
`})}),`
`,e.jsxs(i.p,{children:["now you must use  ",e.jsx(i.code,{children:"loading"})," and ",e.jsx(i.code,{children:"loadingDelay"})," properties:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-list loading loading-delay="500"></ui5-list>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If you have previously used the ",e.jsx(i.code,{children:"mode"})," property and the ",e.jsx(i.code,{children:"ListMode"})," values:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-list mode="SingleSelect">
<ui5-list mode="MultiSelect">
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"selectionMode"}),"  and ",e.jsx(i.code,{children:"Single"}),", ",e.jsx(i.code,{children:"Multiple"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-list selection-mode="Single">
<ui5-list selection-mode="Multiple">
`})}),`
`,e.jsx(i.h3,{id:"ui5-message-strip-1",children:"ui5-message-strip"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'design="Warning"'}),e.jsx(i.td,{children:'design="Critical"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Warning"}),"  are renamed to ",e.jsx(i.code,{children:"Critical"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-message-strip design="Warning"></ui5-message-strip>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-message-strip design="Critical"></ui5-message-strip>
`})}),`
`,e.jsx(i.h3,{id:"ui5-multi-combobox",children:"ui5-multi-combobox"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"allowCustomValues"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"noValidation"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"allowCustomValues"})," property has been renamed to ",e.jsx(i.code,{children:"noValidation"}),`.
If you have previously used the `,e.jsx(i.code,{children:"allowCustomValues"}),` property
`,e.jsx(i.code,{children:"<ui5-multi-combobox allow-custom-values></ui5-multi-combobox>"}),`
Now use noValidation instead:
`,e.jsx(i.code,{children:"<ui5-multi-combobox no-validation></ui5-multi-combobox>"})]}),`
`]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-multi-combobox value-state="Error"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Warning"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Success"></ui5-multi-combobox>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-multi-combobox value-state="Negative"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Critical"></ui5-multi-combobox>
<ui5-multi-combobox value-state="Success"></ui5-multi-combobox>
`})}),`
`,e.jsx(i.h3,{id:"ui5-option",children:"ui5-option"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"disabled"})}),e.jsx(i.td,{children:"N/A (removed)"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"disabled"})," property of the ",e.jsx(i.code,{children:"ui5-option"}),` is removed.
If you have previously used the `,e.jsx(i.code,{children:"disabled"})," property:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-option disabled>Option</ui5-option>
`})}),`
`,e.jsx(i.p,{children:"it will no longer work for the component. Instead, do not render disabled options in the first place."}),`
`,e.jsx(i.h3,{id:"ui5-popover",children:"ui5-popover"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"horizontalAlign"})}),e.jsxs(i.td,{children:["values have changed, f.e. ",e.jsx(i.code,{children:"Left"})," to ",e.jsx(i.code,{children:"Start"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"placementType"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"placement"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(i.code,{children:"placement"})," type enumeration"]}),e.jsx(i.td,{children:e.jsx(i.code,{children:"PopoverPlacementType"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"PopoverPlacement"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Event"}),e.jsx(i.td,{children:"after-open"}),e.jsx(i.td,{children:"open"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Event"}),e.jsx(i.td,{children:"after-close"}),e.jsx(i.td,{children:"close"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"Left"})," and ",e.jsx(i.code,{children:"Right"})," options have been renamed. If you previously used them to set the placement or the alignment of the popover:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-popover horizontal-align="Left" placement-type="Left"></ui5-popover>
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"Start"})," or ",e.jsx(i.code,{children:"End"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-popover horizontal-align="Start" placement-type="Start"></ui5-popover>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"placementType"})," property and the ",e.jsx(i.code,{children:"PopoverPlacementType"}),` enum have been renamed.
If you have previously used the `,e.jsx(i.code,{children:"placementType"})," property and the ",e.jsx(i.code,{children:"PopoverPlacementType"})]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-popover placement-type="Bottom"></ui5-popover>
`})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`import PopoverPlacementType from "@ui5/webcomponents/dist/types/PopoverPlacementType.js";
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"placement"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-placement="Bottom"></ui5-popover>
`})}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`import PopoverPlacement from "@ui5/webcomponents/dist/types/PopoverPlacement.js";
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The events ",e.jsx(i.code,{children:"after-close"})," and ",e.jsx(i.code,{children:"after-open"}),"  have been renamed to ",e.jsx(i.code,{children:"open"})," and ",e.jsx(i.code,{children:"close"}),` respectively.
If you previously used the events like:`]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`poover.addEventListener("after-open", (event) => {
});
poover.addEventListener("after-close", (event) => {
});
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`poover.addEventListener("open", (event) => {
});
poover.addEventListener("close", (event) => {
});
`})}),`
`,e.jsx(i.h3,{id:"ui5-progress-indicator",children:"ui5-progress-indicator"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"disabled"})}),e.jsx(i.td,{children:"N/A"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"disabled"})," property of the ",e.jsx(i.code,{children:"ui5-progress-indicator"}),` is removed.
If you have previously used the `,e.jsx(i.code,{children:"disabled"})," property, it won't take effect:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-progress-indicator disabled value="60"></ui5-progress-indicator>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-rogress-indicator value-state="Error"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Warning"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Success"></ui5-rogress-indicator>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-rogress-indicator value-state="Negative"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Critical"></ui5-rogress-indicator>
<ui5-rogress-indicator value-state="Success"></ui5-rogress-indicator>
`})}),`
`,e.jsx(i.h3,{id:"ui5-radio-button",children:"ui5-radio-button"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-radio-button value-state="Error"></ui5-radio-button>
<ui5-radio-button value-state="Warning"></ui5-radio-button>
<ui5-radio-button value-state="Success"></ui5-radio-button>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-radio-button value-state="Negative"></ui5-radio-button>
<ui5-radio-button value-state="Critical"></ui5-radio-button>
<ui5-radio-button value-state="Success"></ui5-radio-button>
`})}),`
`,e.jsx(i.h3,{id:"ui5-select",children:"ui5-select"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-select value-state="Error"></ui5-select>
<ui5-select value-state="Warning"></ui5-select>
<ui5-select value-state="Success"></ui5-select>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-select value-state="Negative"></ui5-select>
<ui5-select value-state="Critical"></ui5-select>
<ui5-select value-state="Success"></ui5-select>
`})}),`
`,e.jsx(i.h3,{id:"ui5-segmented-button",children:"ui5-segmented-button"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"mode"}),e.jsx(i.td,{children:"selectionMode"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Readonly Property"}),e.jsx(i.td,{children:"selectedItem"}),e.jsx(i.td,{children:"selectedItems"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"mode"})," has been renamed to ",e.jsx(i.code,{children:"selectionMode"}),". The selection modes are renamed from ",e.jsx(i.code,{children:"SingleSelect"})," and ",e.jsx(i.code,{children:"MultiSelect"})," to ",e.jsx(i.code,{children:"Single"})," and ",e.jsx(i.code,{children:"Multiple"}),"."]}),`
`]}),`
`,e.jsx(i.p,{children:"If you previously used it as follows:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-segmented-button mode="SingleSelect"></ui5-segmented-button>
<ui5-segmented-button mode="MultiSelect"></ui5-segmented-button>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-segmented-button selection-mode="Single"></ui5-segmented-button>
<ui5-segmented-button selection-mode="Multiple"><ui5-segmented-button>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The read-only getter ",e.jsx(i.code,{children:"selectedItem"})," has been replaced by ",e.jsx(i.code,{children:"selectedItems"})," as multiple items can be selected."]}),`
`]}),`
`,e.jsx(i.h3,{id:"ui5-segmented-button-item",children:"ui5-segmented-button-item"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"pressed"}),e.jsx(i.td,{children:"selected"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"design"}),e.jsx(i.td,{children:"----"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"iconEnd"}),e.jsx(i.td,{children:"----"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"submits"}),e.jsx(i.td,{children:"----"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"type"}),e.jsx(i.td,{children:"----"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"accessibilityAttributes"}),e.jsx(i.td,{children:"----"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:"accessibleRole"}),e.jsx(i.td,{children:"----"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"pressed"})," has been renamed to ",e.jsx(i.code,{children:"selected"}),"."]}),`
`]}),`
`,e.jsx(i.p,{children:"If you previously used it as follows:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item pressed>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it as follows:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-segmented-button id="segButton1">
	  <ui5-segmented-button-item>Item 1</ui5-segmented-button-item>
	  <ui5-segmented-button-item selected>Item 2</ui5-segmented-button-item>
</ui5-segmented-button>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"design"})," has been inherited but never had effect and it's now removed."]}),`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"iconEnd"})," has been inherited but never had effect and it's now removed."]}),`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"submits"})," has been inherited but never had effect and it's now removed."]}),`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"type"})," has been inherited but never had effect and it's now removed."]}),`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"accessibilityAttributes"})," has been inherited but never had effect and it's now removed."]}),`
`,e.jsxs(i.li,{children:["The property ",e.jsx(i.code,{children:"accessibleRole"})," has been inherited but never had effect and it's now removed."]}),`
`]}),`
`,e.jsx(i.h3,{id:"ui5-step-input",children:"ui5-step-input"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-step-input value-state="Error"></ui5-step-input>
<ui5-step-input value-state="Warning"></ui5-step-input>
<ui5-step-input value-state="Success"></ui5-step-input>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-step-input value-state="Negative"></ui5-step-input>
<ui5-step-input value-state="Critical"></ui5-step-input>
<ui5-step-input value-state="Success"></ui5-step-input>
`})}),`
`,e.jsx(i.h3,{id:"ui5-time-picker",children:"ui5-time-picker"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-time-picker value-state="Error"></ui5-time-picker>
<ui5-time-picker value-state="Warning"></ui5-time-picker>
<ui5-time-picker value-state="Success"></ui5-time-picker>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-time-picker value-state="Negative"></ui5-time-picker>
<ui5-time-picker value-state="Critical"></ui5-time-picker>
<ui5-time-picker value-state="Success"></ui5-time-picker>
`})}),`
`,e.jsx(i.h3,{id:"ui5-tab-container",children:"ui5-tab-container"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"fixed"})}),e.jsx(i.td,{children:"N/A (removed)"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"tabsOverflowMode"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"overflowMode"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:["Type for ",e.jsx(i.code,{children:"backgroundDesign"})]}),e.jsx(i.td,{children:e.jsx(i.code,{children:"TabContainerBackgroundDesign"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"BackgroundDesign"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"showOverflow"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"overflowButton"})," slot"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"TS interface"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"ITab"})}),e.jsx(i.td,{children:"N/A (removed)"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:'Property "fixed" is removed and there is no alternative provided. The TabContainer is no longer expandable/collapsible via use interaction. You can still show the TabContainer collapsed via the "collapsed" property.'}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsx(i.p,{children:"If you have previously used:"}),`
`]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tabcontainer tabs-overflow-mode="StartAndEnd"></ui5-tabcontainer>
`})}),`
`,e.jsx(i.p,{children:"Now use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tabcontainer overflow-mode="StartAndEnd"></ui5-tabcontainer>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["If you previously imported ",e.jsx(i.code,{children:"TabContainerBackgroundDesign"}),", use ",e.jsx(i.code,{children:"BackgroundDesign"})," instead."]}),`
`]}),`
`,e.jsxs(i.li,{children:[`
`,e.jsxs(i.p,{children:["The ",e.jsx(i.code,{children:"showOverflow"})," property is removed. If previously you have used:"]}),`
`]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tabcontainer show-overflow></ui5-tabcontainer>
`})}),`
`,e.jsxs(i.p,{children:["now use the ",e.jsx(i.code,{children:"overflowButton"})," slot:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tabcontainer>
	<ui5-button slot="startOverflowButton" id="startOverflowButton">Start</ui5-button>
	<ui5-button slot="overflowButton" id="endOverflowButton">End</ui5-button>
</ui5-tabcontainer>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["You can no longer import and implement the ",e.jsx(i.code,{children:"ITab"})," interface. TabContainer is designed to work only with Tab and TabSeparator classes, so the interface was obsolete."]}),`
`]}),`
`,e.jsx(i.h3,{id:"ui5-tab",children:"ui5-tab"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Public method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"getTabInStripDomRef"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"getDomRefInStrip"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Slot"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"subTabs"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"items"})})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"If previously you have used:"}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`someTab.getTabInStripDomRef();
`})}),`
`,e.jsx(i.p,{children:"Now use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`someTab.getDomRefInStrip();
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"If you have previously used:"}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tab id="nestedTab" slot="subTabs"></ui5-tab>
`})}),`
`,e.jsx(i.p,{children:"Now use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tab id="nestedTab" slot="items"></ui5-tab>
`})}),`
`,e.jsx(i.h3,{id:"ui5-tab-separator",children:"ui5-tab-separator"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Public method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"getTabInStripDomRef"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"getDomRefInStrip"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsx(i.li,{children:"If previously you have used:"}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`someTabSeparator.getTabInStripDomRef();
`})}),`
`,e.jsx(i.p,{children:"Now use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`someTabSeparator.getDomRefInStrip();
`})}),`
`,e.jsx(i.h3,{id:"ui5-textarea",children:"ui5-textarea"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"growingMaxLines"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"growingMaxRows"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"growingMaxLines"})," property has been renamed to ",e.jsx(i.code,{children:"growingMaxRows"}),"."]}),`
`]}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'value-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'value-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-textarea value-state="Error"></ui5-textarea>
<ui5-textarea value-state="Warning"></ui5-textarea>
<ui5-textarea value-state="Success"></ui5-textarea>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-textarea value-state="Negative"></ui5-textarea>
<ui5-textarea value-state="Critical"></ui5-textarea>
<ui5-textarea value-state="Success"></ui5-textarea>
`})}),`
`,e.jsx(i.h3,{id:"ui5-title",children:"ui5-title"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(i.code,{children:"wrappingType"})," default value"]}),e.jsx(i.td,{children:e.jsx(i.code,{children:"None"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"Normal"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The defualt value of the wrappingType property has been changed from ",e.jsx(i.code,{children:"None"})," to ",e.jsx(i.code,{children:"Normal"}),"."]}),`
`]}),`
`,e.jsx(i.p,{children:"Previously long texts would truncate if there is not enough space:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-title>some very very very long title</ui5-title> <!-- text will truncate if there is not enough space -->
`})}),`
`,e.jsx(i.p,{children:"Now, long texts would wrap:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-title>some very very very long title</ui5-title> <!-- text will wrap if there is not enough space -->
`})}),`
`,e.jsxs(i.p,{children:["And you need to set ",e.jsx(i.code,{children:'wrapping-type="None"'})," explicitly to make it truncate as before:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-title wrapping-type="None">some very very very long title</ui5-title> <!-- will truncate the text -->
`})}),`
`,e.jsx(i.h3,{id:"ui5-tree",children:"ui5-tree"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"mode"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"selectionMode"})," + additionally the values of ",e.jsx(i.code,{children:"ListMode"})," have changed"]})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If you have previously used the ",e.jsx(i.code,{children:"mode"})," property and the ",e.jsx(i.code,{children:"ListMode"})," values:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree mode="SingleSelect">
<ui5-tree mode="MultiSelect">
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"selectionMode"}),"  and ",e.jsx(i.code,{children:"Single"}),", ",e.jsx(i.code,{children:"Multiple"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree selection-mode="Single">
<ui5-tree selection-mode="Multiple">

`})}),`
`,e.jsx(i.h3,{id:"ui5-tree-item",children:"ui5-tree-item"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'highlight="Error/Warning/Success"'}),e.jsx(i.td,{children:'highlight="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree-item highlight="Error"></ui5-tree-item>
<ui5-tree-item highlight="Warning"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree-item highlight="Negative"></ui5-tree-item>
<ui5-tree-item highlight="Critical"></ui5-tree-item>
<ui5-tree-item highlight="Success"></ui5-tree-item>
`})}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:'additional-text-state="Error/Warning/Success"'}),e.jsx(i.td,{children:'additional-text-state="Negative/Critical/Positive"'})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The property values ",e.jsx(i.code,{children:"Error/Warning/Success"}),"  are renamed to ",e.jsx(i.code,{children:"Negative/Critical/Positive"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree-item additional-text-state="Error"></ui5-tree-item>
<ui5-tree-item additional-text-state="Warning"></ui5-tree-item>
<ui5-tree-item additional-text-state="Success"></ui5-tree-item>
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-tree-item additional-text-state="Negative"></ui5-tree-item>
<ui5-tree-item additional-text-state="Critical"></ui5-tree-item>
<ui5-tree-item additional-text-state="Success"></ui5-tree-item>
`})}),`
`,e.jsx(i.h3,{id:"ui5-toast",children:"ui5-toast"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Event"}),e.jsx(i.td,{children:"after-close"}),e.jsx(i.td,{children:"close"})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The event ",e.jsx(i.code,{children:"after-close"}),"  has been renamed to ",e.jsx(i.code,{children:"close"}),". If you previously used it like:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`toast.addEventListener("after-close", (event) => {
});
`})}),`
`,e.jsx(i.p,{children:"Now you have to use it like:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`toast.addEventListener("close", (event) => {
});
`})}),`
`,e.jsx(i.h2,{id:"fiori-package-ui5webcomponents-fiori",children:"Fiori package (@ui5/webcomponents-fiori)"}),`
`,e.jsx(i.h3,{id:"ui5-bar",children:"ui5-bar"}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"ui5-bar"})," component is now in ",e.jsx(i.code,{children:"main"})," library. If you previously imported  the ",e.jsx(i.code,{children:"ui5-bar"})," from ",e.jsx(i.code,{children:"fiori"}),":"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import "@ui5/webcomponents-fiori/dist/Bar.js;
`})}),`
`,e.jsxs(i.p,{children:["Now, import the ",e.jsx(i.code,{children:"ui5-bar"})," from ",e.jsx(i.code,{children:"main"}),":"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-ts",children:`import "@ui5/webcomponents/dist/Bar.js";
`})}),`
`,e.jsx(i.h3,{id:"ui5-barcode-scanner-dialog",children:"ui5-barcode-scanner-dialog"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Public method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"show()"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"open"})," property"]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Public method"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"close()"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"open"})," property"]})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"show"})," and ",e.jsx(i.code,{children:"close"})," public methods have been removed. Use the public property ",e.jsx(i.code,{children:"open"})," instead."]}),`
`]}),`
`,e.jsx(i.p,{children:"For example, if you used:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`d.show();
...
d.close();
`})}),`
`,e.jsx(i.p,{children:"use:"}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`d.open = true;
...
d.open = false;
`})}),`
`,e.jsx(i.p,{children:"instead."}),`
`,e.jsx(i.h3,{id:"ui5-flexible-column-layout",children:"ui5-flexible-column-layout"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"accessibilityTexts"})}),e.jsx(i.td,{children:"removed"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"accessibilityRoles"})}),e.jsx(i.td,{children:"removed"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"accessibilityTexts"})," and ",e.jsx(i.code,{children:"accessibilityRoles"})," properties of the ",e.jsx(i.code,{children:"ui5-flexible-column-layout"})," are removed. If you have previously used the ",e.jsx(i.code,{children:"accessibilityTexts"})," or ",e.jsx(i.code,{children:"accessibilityRoles"})," properties:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`fcl.accessibilityTexts = {
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
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"accessibilityAttributes"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`fcl.accessibilityAttributes = {
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
`})}),`
`,e.jsx(i.h3,{id:"ui5-illustrated-message",children:"ui5-illustrated-message"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsx(i.tbody,{children:e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"size"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"design"})})]})})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"size"})," property of the ",e.jsx(i.code,{children:"ui5-illustrated-message"})," is renamed to ",e.jsx(i.code,{children:"design"}),`.
If you have previously used the `,e.jsx(i.code,{children:"size"})," property:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-illustrated-message size="Dialog">
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"design"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-illustrated-message design="Dialog">
`})}),`
`,e.jsx(i.h3,{id:"ui5-shellbar",children:"ui5-shellbar"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"accessibilityTexts"})}),e.jsx(i.td,{children:"removed"})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"accessibilityRoles"})}),e.jsx(i.td,{children:"removed"})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"accessibilityTexts"})," and ",e.jsx(i.code,{children:"accessibilityRoles"})," properties of the ",e.jsx(i.code,{children:"ui5-shellbar"})," are removed. If you have previously used the ",e.jsx(i.code,{children:"accessibilityTexts"})," or ",e.jsx(i.code,{children:"accessibilityRoles"})," properties:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`shellbar.accessibilityTexts = {
    profileButtonTitle: "John Dow",
    logoTitle: "Custom logo title",
}

shellbar.accessibilityRoles = {
		logoRole: "link"
};
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"accessibilityAttributes"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`shellbar.accessibilityAttributes = {
    profile: {
      name:  "John Dow",
    },
    logo: {
      role: "link"
      name: "Custom logo title"
    },
};
`})}),`
`,e.jsx(i.h3,{id:"ui5-upload-collection",children:"ui5-upload-collection"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"mode"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"selectionMode"})})]}),e.jsxs(i.tr,{children:[e.jsxs(i.td,{children:[e.jsx(i.code,{children:"mode"})," type enumeration"]}),e.jsxs(i.td,{children:["values: ",e.jsx(i.code,{children:"SingleSelect"}),", ",e.jsx(i.code,{children:"MultiSelect"}),", etc."]}),e.jsxs(i.td,{children:["values: ",e.jsx(i.code,{children:"Single"}),", ",e.jsx(i.code,{children:"Multiple"}),", etc."]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Property"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"selectionMode"})}),e.jsxs(i.td,{children:["no longer accepts ",e.jsx(i.code,{children:"Delete"})," as value in favor of ",e.jsx(i.code,{children:"hide-delete-button"})]})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"TS Interface"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"IUploadCollectionItem"})}),e.jsxs(i.td,{children:[e.jsx(i.code,{children:"UploadCollectionItem"})," type"]})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["If you have previously used the ",e.jsx(i.code,{children:"mode"})," property and the ",e.jsx(i.code,{children:"ListMode"})," values:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-upload-collection mode="SingleSelect">
<ui5-upload-collection mode="MultiSelect">
`})}),`
`,e.jsxs(i.p,{children:["Now use ",e.jsx(i.code,{children:"selectionMode"}),"  and ",e.jsx(i.code,{children:"Single"}),", ",e.jsx(i.code,{children:"Multiple"})," instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-upload-collection selection-mode="Single">
<ui5-upload-collection selection-mode="Multiple">

`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["The ",e.jsx(i.code,{children:"selectionMode"}),` property no longer accepts "Delete" as value.
If you have previously used it:`]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-upload-collection selection-mode="Delete"></ui5-upload-collection>
`})}),`
`,e.jsxs(i.p,{children:["Now omit it completely and use ",e.jsx(i.code,{children:"hide-delete-button"})," onto the ui5-upload-collection:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-html",children:`<ui5-upload-collection>
   <ui5-upload-collection-item hide-delete-button>  </ui5-upload-collection-item>
</ui5-upload-collection>
`})}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Removed the ",e.jsx(i.code,{children:"IUploadCollectionItem"})," interface. If you previously used the interface:"]}),`
`]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`import type { IUploadCollectionItem} from "@ui5/webcomponents-fiori/dist/UploadCollection.js"
`})}),`
`,e.jsxs(i.p,{children:["Use the ",e.jsx(i.code,{children:"UploadCollectionItem"})," type instead:"]}),`
`,e.jsx(i.pre,{children:e.jsx(i.code,{className:"language-js",children:`import type UploadCollectionItem from "@ui5/webcomponents-fiori/dist/UploadCollectionItem.js"
`})}),`
`,e.jsx(i.h2,{id:"icons-packages",children:"Icons packages"}),`
`,e.jsxs(i.table,{children:[e.jsx(i.thead,{children:e.jsxs(i.tr,{children:[e.jsx(i.th,{children:"Changed item"}),e.jsx(i.th,{children:"Old"}),e.jsx(i.th,{children:"New"})]})}),e.jsxs(i.tbody,{children:[e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Icon"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"soccor"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"soccer"})})]}),e.jsxs(i.tr,{children:[e.jsx(i.td,{children:"Icon"}),e.jsx(i.td,{children:e.jsx(i.code,{children:"add-polygone"})}),e.jsx(i.td,{children:e.jsx(i.code,{children:"add-polygon"})})]})]})]}),`
`,e.jsxs(i.ul,{children:[`
`,e.jsxs(i.li,{children:["Removed ",e.jsx(i.code,{children:"soccor"})," icon. Use ",e.jsx(i.code,{children:"soccer"})," instead."]}),`
`,e.jsxs(i.li,{children:["Removed ",e.jsx(i.code,{children:"add-polygone"})," icon. Use ",e.jsx(i.code,{children:"add-polygon"})," instead."]}),`
`]}),`
`,e.jsx(l,{})]})}function v(n={}){const{wrapper:i}=Object.assign({},r(),n.components);return i?e.jsx(i,Object.assign({},n,{children:e.jsx(s,n)})):s(n)}export{v as default};
