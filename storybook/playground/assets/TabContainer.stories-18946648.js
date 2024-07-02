import{x as $}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as k}from"./unsafe-html-0ddd83da.js";import{T as w}from"./TabLayout-8f6a62b3.js";const B={tabLayout:{control:"select",options:["Inline","Standard"]},overflowMode:{control:"select",options:["End","StartAndEnd"]},headerBackgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},contentBackgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},allItems:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<ITab>"}}},overflowButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},startOverflowButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},"tab-select":{description:"Fired when a tab is selected.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Tab",references:[{name:"Tab",package:"@ui5/webcomponents",module:"dist/Tab.js"}]},name:"tab",_ui5privacy:"public",description:"The selected `tab`."},{type:{text:"Integer",references:[{name:"Integer",package:"@ui5/webcomponents-base",module:"dist/types/Integer.js"}]},name:"tabIndex",_ui5privacy:"public",description:"The selected `tab` index in the flattened array of all tabs and their subTabs, provided by the `allItems` getter."}]}},"move-over":{description:"Fired when element is being moved over the tab container.\n\nIf the new position is valid, prevent the default action of the event using `preventDefault()`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"object"},name:"source",_ui5privacy:"public",description:"Contains information about the moved element under `element` property."},{type:{text:"object"},name:"destination",_ui5privacy:"public",description:"Contains information about the destination of the moved element. Has `element` and `placement` properties."}]}},move:{description:"Fired when element is moved to the tab container.\n\n**Note:** `move` event is fired only if there was a preceding `move-over` with prevented default action.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"object"},name:"source",_ui5privacy:"public",description:"Contains information about the moved element under `element` property."},{type:{text:"object"},name:"destination",_ui5privacy:"public",description:"Contains information about the destination of the moved element. Has `element` and `placement` properties."}]}}},_={package:"@ui5/webcomponents",tagName:"ui5-tabcontainer"},L={title:"Main/Tab Container",component:"TabContainer",argTypes:B},s=e=>$`<ui5-tabcontainer
    ?collapsed="${t(e.collapsed)}"
    tab-layout="${t(e.tabLayout)}"
    overflow-mode="${t(e.overflowMode)}"
    header-background-design="${t(e.headerBackgroundDesign)}"
    content-background-design="${t(e.contentBackgroundDesign)}"
    tabs-placement="${t(e.tabsPlacement)}"
>
    ${k(e.default)}
</ui5-tabcontainer>`,a=s.bind({});a.args={default:`<ui5-tab icon="menu" text="Tab 1">
    <ui5-label>Quibusdam, veniam! Architecto debitis iusto ad et, asperiores quisquam perferendis reprehenderit ipsa voluptate minus minima, perspiciatis cum. Totam harum necessitatibus numquam voluptatum.</ui5-label>
</ui5-tab>
<ui5-tab icon="activities" text="Tab 2" selected>
    <ui5-label>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga magni facere error dicta beatae optio repudiandae vero, quidem voluptatibus perferendis eum maiores rem tempore voluptates aperiam eos enim delectus unde.</ui5-label>
</ui5-tab>
<ui5-tab icon="add" text="Tab 3">
    <ui5-label>Dignissimos debitis architecto temporibus doloribus reiciendis libero rem nemo, nobis quidem dolor praesentium, beatae voluptatum iste eveniet, nam voluptatem obcaecati ducimus dolore.</ui5-label>
</ui5-tab>
<ui5-tab icon="calendar" text="Tab 4">
    <ui5-label>Possimus ipsa eos impedit aut nisi repellendus recusandae, temporibus ducimus, necessitatibus tenetur facere, minima vero fugit rem reiciendis natus ratione quia numquam?</ui5-label>
</ui5-tab>
<ui5-tab-separator></ui5-tab-separator>
<ui5-tab icon="action-settings" text="Tab 5">
    <ui5-label>Explicabo laboriosam ab consequuntur, qui dignissimos inventore sapiente ullam quaerat ratione libero vero, beatae laudantium! Aperiam numquam tempore, laudantium perferendis recusandae autem.</ui5-label>
</ui5-tab>`};const i=s.bind({});i.args={collapsed:!0,default:`<ui5-tab text="Home"></ui5-tab>
<ui5-tab text="What's new" selected></ui5-tab>
<ui5-tab text="Who are we"></ui5-tab>
<ui5-tab text="About"></ui5-tab>
<ui5-tab text="Contacts"></ui5-tab>`};const n=s.bind({});n.args={collapsed:!0,default:`<ui5-tab text="Tab 1"></ui5-tab>
<ui5-tab text="Tab 2"></ui5-tab>
<ui5-tab text="Tab 3"></ui5-tab>
<ui5-tab text="Tab 4"></ui5-tab>
<ui5-tab text="Tab 5"></ui5-tab>
<ui5-tab text="Tab 6"></ui5-tab>
<ui5-tab text="Tab 7"></ui5-tab>
<ui5-tab text="Tab 8"></ui5-tab>
<ui5-tab text="Tab 9"></ui5-tab>
<ui5-tab text="Tab 10"></ui5-tab>
<ui5-tab text="Tab 11"></ui5-tab>
<ui5-tab text="Tab 12"></ui5-tab>
<ui5-tab text="Tab 13" selected></ui5-tab>
<ui5-tab text="Tab 14"></ui5-tab>
<ui5-tab text="Tab 15"></ui5-tab>
<ui5-tab text="Tab 16"></ui5-tab>
<ui5-tab text="Tab 17"></ui5-tab>
<ui5-tab text="Tab 18"></ui5-tab>
<ui5-tab text="Tab 19"></ui5-tab>
<ui5-tab text="Tab 20"></ui5-tab>
<ui5-tab text="Tab 21"></ui5-tab>
<ui5-tab text="Tab 22"></ui5-tab>
<ui5-tab text="Tab 23"></ui5-tab>`};const o=s.bind({});o.args={tabLayout:w.Inline,collapsed:!0,default:`<ui5-tab icon="laptop" text="Monitors" additional-text="10"></ui5-tab>
<ui5-tab icon="video" text="Cameras" additional-text="2" selected></ui5-tab>
<ui5-tab icon="home" text="Rooms" additional-text="16"></ui5-tab>`};const r=s.bind({});r.args={default:`<ui5-tab text="Notes">
    Notes go here ...
</ui5-tab>
<ui5-tab text="Products">
    Products go here ...
    <ui5-tab slot="items" text="Computers">
        Computers go here ...
        <ui5-tab slot="items" text="Laptops" selected>
            Laptops go here ...
        </ui5-tab>
        <ui5-tab slot="items" text="Desktops">
            <ui5-tab slot="items" text="Work Stations">
                Work Stations go here ...
            </ui5-tab>
            <ui5-tab slot="items" text="Game Stations">
                Game Stations go here ...
            </ui5-tab>
            Desktops go here ...
        </ui5-tab>
    </ui5-tab>
    <ui5-tab text="Phones" slot="items">
        <ui5-tab text="Smartphones" slot="items">
            Smartphones go here ...
        </ui5-tab>
        <ui5-tab text="Tablets" slot="items">
            Tablets go here ...
        </ui5-tab>
        Phones go here ...
    </ui5-tab>
</ui5-tab>
<ui5-tab text="Orders">
    Orders go here ...
    <ui5-tab slot="items" text="Attachments">
        Order attachments go here ...
    </ui5-tab>
</ui5-tab>`};var u,b,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    overflow-mode="\${ifDefined(args.overflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(d=(b=a.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var c,l,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    overflow-mode="\${ifDefined(args.overflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,g,f;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    overflow-mode="\${ifDefined(args.overflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(f=(g=n.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var x,T,h;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    overflow-mode="\${ifDefined(args.overflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(h=(T=o.parameters)==null?void 0:T.docs)==null?void 0:h.source}}};var v,y,D;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    overflow-mode="\${ifDefined(args.overflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(D=(y=r.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};const I=["Basic","TextOnlyTabs","TextOnlyEndOverflow","InlineTabLayout","NestedTabs"],P=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,InlineTabLayout:o,NestedTabs:r,TextOnlyEndOverflow:n,TextOnlyTabs:i,__namedExportsOrder:I,default:L},Symbol.toStringTag,{value:"Module"}));export{P as C,_ as c};
