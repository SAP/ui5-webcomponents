import{x as S}from"./lit-element-c5a2b594.js";import{o as m}from"./unsafe-html-0ddd83da.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as T}from"./ValueState-8914436d.js";const C={valueState:{control:"select",options:["None","Positive","Critical","Negative","Information"]},filter:{control:"select",options:["StartsWithPerTerm","StartsWith","Contains","None"]},open:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<IMultiComboBoxItem>"}}},icon:{control:{type:"text"},table:{type:{summary:"Array<IIcon>"}}},valueStateMessage:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},"selection-change":{description:"Fired when selection is changed by user interaction.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Array<IMultiComboBoxItem>",references:[{name:"IMultiComboBoxItem",package:"@ui5/webcomponents",module:"dist/MultiComboBox.js"}]},name:"items",_ui5privacy:"public",description:"an array of the selected items."}]}}},P={package:"@ui5/webcomponents",since:"0.11.0",tagName:"ui5-multi-combobox"},N={title:"Main/Multi-Combo Box",component:"MultiComboBox",argTypes:C},s=e=>S`
<ui5-multi-combobox
    value="${i(e.value)}"
    ?no-typeahead="${i(e.noTypeahead)}"
    placeholder="${i(e.placeholder)}"
    ?no-validation="${i(e.noValidation)}"
    ?disabled="${i(e.disabled)}"
    value-state="${i(e.valueState)}"
    ?readonly="${i(e.readonly)}"
    ?required="${i(e.required)}"
    filter="${i(e.filter)}"
    ?open="${i(e.open)}"
    accessible-name="${i(e.accessibleName)}"
    accessible-name-ref="${i(e.accessibleNameRef)}"
>
    ${m(e.default)}
    ${m(e.icon)}
    ${m(e.valueStateMessage)}
</ui5-multi-combobox>`,o=s.bind({});o.args={placeholder:"Type your value",default:`
    <ui5-mcb-item text="Albania"></ui5-mcb-item>
    <ui5-mcb-item selected="" text="Argentina"></ui5-mcb-item>
    <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
    <ui5-mcb-item text="Denmark"></ui5-mcb-item>
    <ui5-mcb-item text="England"></ui5-mcb-item>
    <ui5-mcb-item text="Germany"></ui5-mcb-item>
    <ui5-mcb-item text="Philippines"></ui5-mcb-item>
    <ui5-mcb-item text="Portugal"></ui5-mcb-item>
    <ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
    `};const a=s.bind({});a.args={placeholder:"Choose your state",valueState:T.Positive,noValidation:!0,default:`
    <ui5-mcb-item text="Fortune"></ui5-mcb-item>
    <ui5-mcb-item text="Luck"></ui5-mcb-item>
    <ui5-mcb-item selected="" text="Positive"></ui5-mcb-item>
    <ui5-mcb-item text="Attention"></ui5-mcb-item>
    <ui5-mcb-item text="Caution"></ui5-mcb-item>
    <ui5-mcb-item text="Critical"></ui5-mcb-item>
    <ui5-mcb-item text="Fault"></ui5-mcb-item>
    <ui5-mcb-item text="Negative"></ui5-mcb-item>
    <ui5-mcb-item text="Mistake"></ui5-mcb-item>`};a.storyName="Custom Value";const t=s.bind({});t.args={placeholder:"Select a country",default:`
    <ui5-mcb-group-item text="Asia"></ui5-mcb-group-item>
    <ui5-mcb-item text="Afghanistan"></ui5-mcb-item>
    <ui5-mcb-item text="China"></ui5-mcb-item>
    <ui5-mcb-item text="India"></ui5-mcb-item>
    <ui5-mcb-item text="Indonesia"></ui5-mcb-item>
    <ui5-mcb-group-item text="Europe"></ui5-mcb-group-item>
    <ui5-mcb-item text="Austria"></ui5-mcb-item>
    <ui5-mcb-item text="Bulgaria"></ui5-mcb-item>
    <ui5-mcb-item text="Germany"></ui5-mcb-item>
    <ui5-mcb-item text="Italy"></ui5-mcb-item>
    <ui5-mcb-item text="The United Kingdom of Great Britain and Northern Ireland"></ui5-mcb-item>
    <ui5-mcb-group-item text="North America"></ui5-mcb-group-item>
    <ui5-mcb-item text="Canada"></ui5-mcb-item>
    <ui5-mcb-item text="Granada"></ui5-mcb-item>
    <ui5-mcb-item text="Haiti"></ui5-mcb-item>
    <ui5-mcb-item text="United States"></ui5-mcb-item>`};t.storyName="Grouping";const n=s.bind({});n.args={placeholder:"MultiComboBox with single long token",default:'<ui5-mcb-item selected="" text="Very long long long long long long long text"></ui5-mcb-item>'};n.storyName="Single Long Token";const r=s.bind({});r.args={placeholder:"Enter product",default:`
    <ui5-mcb-item text="Wireless DSL/ Repeater and Print Server Lorem ipsum dolar st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor incidunt ut labore et dolore magna aliquyam erat, diam nonumy eirmod tempor individunt ut labore et dolore magna aliquyam erat, sed justo et ea rebum."></ui5-mcb-item>
    <ui5-mcb-item text="Widescreen Portable DVD Player w MP3, consetetur sadipscing, sed diam nonumy eirmod tempor invidunt ut labore et dolore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergen, no sea takimata. Tortor pretium viverra suspendisse potenti nullam. Congue quisque egestas diam in arcu cursus.Rutrum tellus pellentesque eu tincidunt tortor. Nec tincidunt praesent semper feugiat nibh sed"></ui5-mcb-item>
    <ui5-mcb-item text="Portable DVD Player with 9 inches LCD Monitor"></ui5-mcb-item>`};var u,l,c;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox
    value="\${ifDefined(args.value)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?no-validation="\${ifDefined(args.noValidation)}"
    ?disabled="\${ifDefined(args.disabled)}"
    value-state="\${ifDefined(args.valueState)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    filter="\${ifDefined(args.filter)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>\``,...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var d,f,b;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox
    value="\${ifDefined(args.value)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?no-validation="\${ifDefined(args.noValidation)}"
    ?disabled="\${ifDefined(args.disabled)}"
    value-state="\${ifDefined(args.valueState)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    filter="\${ifDefined(args.filter)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>\``,...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var g,p,$;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox
    value="\${ifDefined(args.value)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?no-validation="\${ifDefined(args.noValidation)}"
    ?disabled="\${ifDefined(args.disabled)}"
    value-state="\${ifDefined(args.valueState)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    filter="\${ifDefined(args.filter)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>\``,...($=(p=t.parameters)==null?void 0:p.docs)==null?void 0:$.source}}};var x,D,y;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox
    value="\${ifDefined(args.value)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?no-validation="\${ifDefined(args.noValidation)}"
    ?disabled="\${ifDefined(args.disabled)}"
    value-state="\${ifDefined(args.valueState)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    filter="\${ifDefined(args.filter)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>\``,...(y=(D=n.parameters)==null?void 0:D.docs)==null?void 0:y.source}}};var v,h,M;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`args => html\`
<ui5-multi-combobox
    value="\${ifDefined(args.value)}"
    ?no-typeahead="\${ifDefined(args.noTypeahead)}"
    placeholder="\${ifDefined(args.placeholder)}"
    ?no-validation="\${ifDefined(args.noValidation)}"
    ?disabled="\${ifDefined(args.disabled)}"
    value-state="\${ifDefined(args.valueState)}"
    ?readonly="\${ifDefined(args.readonly)}"
    ?required="\${ifDefined(args.required)}"
    filter="\${ifDefined(args.filter)}"
    ?open="\${ifDefined(args.open)}"
    accessible-name="\${ifDefined(args.accessibleName)}"
    accessible-name-ref="\${ifDefined(args.accessibleNameRef)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.icon)}
    \${unsafeHTML(args.valueStateMessage)}
</ui5-multi-combobox>\``,...(M=(h=r.parameters)==null?void 0:h.docs)==null?void 0:M.source}}};const L=["Basic","MultiComboBoxCustomValue","MultiComboBoxGrouping","MultiComboBoxLongToken","SuggestionsWrapping"],V=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,MultiComboBoxCustomValue:a,MultiComboBoxGrouping:t,MultiComboBoxLongToken:n,SuggestionsWrapping:r,__namedExportsOrder:L,default:N},Symbol.toStringTag,{value:"Module"}));export{V as C,P as c};
