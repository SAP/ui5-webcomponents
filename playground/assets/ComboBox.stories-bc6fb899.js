import{x as S}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o as u}from"./unsafe-html-0ddd83da.js";import{C as M}from"./ComboBoxFilter-4fbd0079.js";const B={valueState:{control:"select",options:["None","Success","Warning","Error","Information"]},filter:{control:"select",options:["StartsWithPerTerm","StartsWith","Contains","None"]},default:{control:{type:"text"},table:{type:{summary:"Array<IComboBoxItem>"}}},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}},"selection-change":{description:"Fired when selection is changed by user interaction",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"IComboBoxItem",references:[{name:"IComboBoxItem",package:"@ui5/webcomponents",module:"dist/ComboBox.js"}]},name:"item",_ui5privacy:"public",description:"item to be selected."}]}}},A={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-combobox"},C={title:"Main/Combo Box",component:"ComboBox",argTypes:B},o=e=>S`<ui5-combobox
        value="${a(e.value)}"
        ?no-typeahead="${a(e.noTypeahead)}"
        placeholder="${a(e.placeholder)}"
        ?disabled="${a(e.disabled)}"
        ?readonly="${a(e.readonly)}"
        ?required="${a(e.required)}"
        ?loading="${a(e.loading)}"
        filter="${a(e.filter)}"
        value-state="${a(e.valueState)}"
        accessible-name="${a(e.accessibleName)}"
        accessible-name-ref="${a(e.accessibleNameRef)}"
>
        ${u(e.default)}
        ${u(e.valueStateMessage)}
        ${u(e.icon)}
</ui5-combobox>`,i=o.bind({});i.args={placeholder:"Enter value",default:`
    <ui5-cb-item text="Austria"></ui5-cb-item>
    <ui5-cb-item text="Bulgaria"></ui5-cb-item>
    <ui5-cb-item text="Germany"></ui5-cb-item>
    <ui5-cb-item text="Italy"></ui5-cb-item>
    <ui5-cb-item text="Spain"></ui5-cb-item>
    `};const t=o.bind({});t.args={placeholder:"Contains Filtering",filter:M.Contains,default:`
        <ui5-cb-item text="Austria"></ui5-cb-item>
        <ui5-cb-item text="Bulgaria"></ui5-cb-item>
        <ui5-cb-item text="Germany"></ui5-cb-item>
        <ui5-cb-item text="Kazakhstan"></ui5-cb-item>
        <ui5-cb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-cb-item>
    `};const n=o.bind({});n.args={placeholder:"Two-column layout",default:`
        <ui5-cb-item text="Austria" additional-text="AT"></ui5-cb-item>
        <ui5-cb-item text="Belgium" additional-text="BE"></ui5-cb-item>
        <ui5-cb-item text="Brazil" additional-text="BR"></ui5-cb-item>
        <ui5-cb-item text="Bulgaria" additional-text="BG"></ui5-cb-item>
        <ui5-cb-item text="Canada" additional-text="CA"></ui5-cb-item>
        <ui5-cb-item text="The United Kingdom of Great Britain and Northern Ireland" additional-text="UK"></ui5-cb-item>
    `};const r=o.bind({});r.args={placeholder:"Grouping of items",default:`
        <ui5-cb-group-item text="A"></ui5-cb-group-item>
        <ui5-cb-item text="Argentina"></ui5-cb-item>
        <ui5-cb-item text="Australia"></ui5-cb-item>
        <ui5-cb-item text="Austria"></ui5-cb-item>
        <ui5-cb-group-item text="B"></ui5-cb-group-item>
        <ui5-cb-item text="Bahrain"></ui5-cb-item>
        <ui5-cb-item text="Belgium"></ui5-cb-item>
        <ui5-cb-item text="Brazil"></ui5-cb-item>
        <ui5-cb-group-item text="C"></ui5-cb-group-item>
        <ui5-cb-item text="Canada"></ui5-cb-item>
        <ui5-cb-item text="Chile"></ui5-cb-item>
    `};const s=o.bind({});s.args={placeholder:"Enter product",default:`
    <ui5-cb-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-cb-item>
    <ui5-cb-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-cb-item>
    <ui5-cb-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-cb-item>
    `};var d,l,c;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:'args => html`<ui5-combobox\n        value="${ifDefined(args.value)}"\n        ?no-typeahead="${ifDefined(args.noTypeahead)}"\n        placeholder="${ifDefined(args.placeholder)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?loading="${ifDefined(args.loading)}"\n        filter="${ifDefined(args.filter)}"\n        value-state="${ifDefined(args.valueState)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n        ${unsafeHTML(args.default)}\n        ${unsafeHTML(args.valueStateMessage)}\n        ${unsafeHTML(args.icon)}\n</ui5-combobox>`',...(c=(l=i.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var m,f,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:'args => html`<ui5-combobox\n        value="${ifDefined(args.value)}"\n        ?no-typeahead="${ifDefined(args.noTypeahead)}"\n        placeholder="${ifDefined(args.placeholder)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?loading="${ifDefined(args.loading)}"\n        filter="${ifDefined(args.filter)}"\n        value-state="${ifDefined(args.valueState)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n        ${unsafeHTML(args.default)}\n        ${unsafeHTML(args.valueStateMessage)}\n        ${unsafeHTML(args.icon)}\n</ui5-combobox>`',...(b=(f=t.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var g,p,$;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:'args => html`<ui5-combobox\n        value="${ifDefined(args.value)}"\n        ?no-typeahead="${ifDefined(args.noTypeahead)}"\n        placeholder="${ifDefined(args.placeholder)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?loading="${ifDefined(args.loading)}"\n        filter="${ifDefined(args.filter)}"\n        value-state="${ifDefined(args.valueState)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n        ${unsafeHTML(args.default)}\n        ${unsafeHTML(args.valueStateMessage)}\n        ${unsafeHTML(args.icon)}\n</ui5-combobox>`',...($=(p=n.parameters)==null?void 0:p.docs)==null?void 0:$.source}}};var x,D,y;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:'args => html`<ui5-combobox\n        value="${ifDefined(args.value)}"\n        ?no-typeahead="${ifDefined(args.noTypeahead)}"\n        placeholder="${ifDefined(args.placeholder)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?loading="${ifDefined(args.loading)}"\n        filter="${ifDefined(args.filter)}"\n        value-state="${ifDefined(args.valueState)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n        ${unsafeHTML(args.default)}\n        ${unsafeHTML(args.valueStateMessage)}\n        ${unsafeHTML(args.icon)}\n</ui5-combobox>`',...(y=(D=r.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var h,v,T;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:'args => html`<ui5-combobox\n        value="${ifDefined(args.value)}"\n        ?no-typeahead="${ifDefined(args.noTypeahead)}"\n        placeholder="${ifDefined(args.placeholder)}"\n        ?disabled="${ifDefined(args.disabled)}"\n        ?readonly="${ifDefined(args.readonly)}"\n        ?required="${ifDefined(args.required)}"\n        ?loading="${ifDefined(args.loading)}"\n        filter="${ifDefined(args.filter)}"\n        value-state="${ifDefined(args.valueState)}"\n        accessible-name="${ifDefined(args.accessibleName)}"\n        accessible-name-ref="${ifDefined(args.accessibleNameRef)}"\n>\n        ${unsafeHTML(args.default)}\n        ${unsafeHTML(args.valueStateMessage)}\n        ${unsafeHTML(args.icon)}\n</ui5-combobox>`',...(T=(v=s.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};const L=["Basic","Filters","TwoColumnsLayout","Grouping","SuggestionsWrapping"],R=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,Filters:t,Grouping:r,SuggestionsWrapping:s,TwoColumnsLayout:n,__namedExportsOrder:L,default:C},Symbol.toStringTag,{value:"Module"}));export{R as C,A as c};
