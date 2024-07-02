import{x as r}from"./lit-element-c5a2b594.js";import{l as a}from"./if-defined-c29cffe1.js";import{o}from"./unsafe-html-0ddd83da.js";const u={design:{control:"select",options:["Default","Positive","Negative","Critical","Neutral"]},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},subTabs:{control:{type:"text"},table:{type:{summary:"Array<ITab>"}}},getTabInStripDomRef:{description:"Returns the DOM reference of the tab that is placed in the header.\n\n**Note:** Tabs, placed in the `subTabs` slot of other tabs are not shown in the header. Calling this method on such tabs will return `null`.\n\n**Note:** If you need a DOM ref to the tab content please use the `getDomRef` method.",table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"ITab | null",references:[{name:"ITab",package:"@ui5/webcomponents",module:"dist/TabContainer.js"}]}}}}},f={package:"@ui5/webcomponents",tagName:"ui5-tab",showDefaultStoryOnly:!0},b={title:"Main/Tab Container/Tab",component:"Tab",argTypes:u},d=e=>r`
<ui5-tabcontainer>
    <ui5-tab
    additional-text="${a(e.additionalText)}"
    design="${a(e.design)}"
    ?disabled="${a(e.disabled)}"
    icon="${a(e.icon)}"
    ?selected="${a(e.selected)}"
    text="${a(e.text)}"
    >
        ${o(e.default)}	
        ${o(e.subTabs)}	
    </ui5-tab>
</ui5-tabcontainer>`,t=d.bind({});t.tags=["_hidden_"];t.args={text:"Products",default:"Products go here",subTabs:`	<ui5-tab slot="subTabs" text="Computers">
    Computers go here ...
    <ui5-tab slot="subTabs" text="Laptops">
        Laptops go here ...
    </ui5-tab>
    <ui5-tab slot="subTabs" text="Desktops">
        <ui5-tab slot="subTabs" text="Work Stations">
            Work Stations go here ...
        </ui5-tab>
        <ui5-tab slot="subTabs" text="Game Stations">
            Game Stations go here ...
        </ui5-tab>
        Desktops go here ...
    </ui5-tab>
</ui5-tab>`};var n,s,i;t.parameters={...t.parameters,docs:{...(n=t.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`
<ui5-tabcontainer>
    <ui5-tab
    additional-text="\${ifDefined(args.additionalText)}"
    design="\${ifDefined(args.design)}"
    ?disabled="\${ifDefined(args.disabled)}"
    icon="\${ifDefined(args.icon)}"
    ?selected="\${ifDefined(args.selected)}"
    text="\${ifDefined(args.text)}"
    >
        \${unsafeHTML(args.default)}	
        \${unsafeHTML(args.subTabs)}	
    </ui5-tab>
</ui5-tabcontainer>\`;
}`,...(i=(s=t.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const l=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:l,default:b},Symbol.toStringTag,{value:"Module"}));export{g as C,f as c};
