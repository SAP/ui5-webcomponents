import{x as v}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as k}from"./unsafe-html-0ddd83da.js";import{T as w}from"./TabLayout-8f6a62b3.js";const B={tabLayout:{control:"select",options:["Inline","Standard"]},tabsOverflowMode:{control:"select",options:["End","StartAndEnd"]},headerBackgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},contentBackgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},allItems:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<ITab>"}}},overflowButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},startOverflowButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},"tab-select":{description:"Fired when a tab is selected.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"ITab",references:[{name:"ITab",package:"@ui5/webcomponents",module:"dist/TabContainer.js"}]},name:"tab",_ui5privacy:"public",description:"The selected `tab`."},{type:{text:"Integer",references:[{name:"Integer",package:"@ui5/webcomponents-base",module:"dist/types/Integer.js"}]},name:"tabIndex",_ui5privacy:"public",description:"The selected `tab` index in the flattened array of all tabs and their subTabs, provided by the `allItems` getter."}]}}},q={package:"@ui5/webcomponents",tagName:"ui5-tabcontainer"},O={title:"Main/Tab Container",component:"TabContainer",argTypes:B},r=e=>v`<ui5-tabcontainer
    ?fixed="${t(e.fixed)}"
    ?collapsed="${t(e.collapsed)}"
    tab-layout="${t(e.tabLayout)}"
    tabs-overflow-mode="${t(e.tabsOverflowMode)}"
    header-background-design="${t(e.headerBackgroundDesign)}"
    content-background-design="${t(e.contentBackgroundDesign)}"
    tabs-placement="${t(e.tabsPlacement)}"
>
    ${k(e.default)}
</ui5-tabcontainer>`,a=r.bind({});a.args={default:`<ui5-tab icon="menu" text="Tab 1">
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
</ui5-tab>`};const i=r.bind({});i.args={collapsed:!0,fixed:!0,default:`<ui5-tab text="Home"></ui5-tab>
<ui5-tab text="What's new" selected></ui5-tab>
<ui5-tab text="Who are we"></ui5-tab>
<ui5-tab text="About"></ui5-tab>
<ui5-tab text="Contacts"></ui5-tab>`};const n=r.bind({});n.args={collapsed:!0,fixed:!0,default:`<ui5-tab text="Tab 1"></ui5-tab>
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
<ui5-tab text="Tab 23"></ui5-tab>`};const o=r.bind({});o.args={tabLayout:w.Inline,collapsed:!0,fixed:!0,default:`<ui5-tab icon="laptop" text="Monitors" additional-text="10"></ui5-tab>
<ui5-tab icon="video" text="Cameras" additional-text="2" selected></ui5-tab>
<ui5-tab icon="home" text="Rooms" additional-text="16"></ui5-tab>`};const s=r.bind({});s.args={default:`<ui5-tab text="Notes">
    Notes go here ...
</ui5-tab>
<ui5-tab text="Products">
    Products go here ...
    <ui5-tab slot="subTabs" text="Computers">
        Computers go here ...
        <ui5-tab slot="subTabs" text="Laptops" selected>
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
    </ui5-tab>
    <ui5-tab text="Phones" slot="subTabs">
        <ui5-tab text="Smartphones" slot="subTabs">
            Smartphones go here ...
        </ui5-tab>
        <ui5-tab text="Tablets" slot="subTabs">
            Tablets go here ...
        </ui5-tab>
        Phones go here ...
    </ui5-tab>
</ui5-tab>
<ui5-tab text="Orders">
    Orders go here ...
    <ui5-tab slot="subTabs" text="Attachments">
        Order attachments go here ...
    </ui5-tab>
</ui5-tab>`};var u,b,d;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    tabs-overflow-mode="\${ifDefined(args.tabsOverflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(d=(b=a.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var c,l,m;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    tabs-overflow-mode="\${ifDefined(args.tabsOverflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(m=(l=i.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var f,g,p;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    tabs-overflow-mode="\${ifDefined(args.tabsOverflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(p=(g=n.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};var x,T,D;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    tabs-overflow-mode="\${ifDefined(args.tabsOverflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(D=(T=o.parameters)==null?void 0:T.docs)==null?void 0:D.source}}};var h,$,y;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  return html\`<ui5-tabcontainer
    ?fixed="\${ifDefined(args.fixed)}"
    ?collapsed="\${ifDefined(args.collapsed)}"
    tab-layout="\${ifDefined(args.tabLayout)}"
    tabs-overflow-mode="\${ifDefined(args.tabsOverflowMode)}"
    header-background-design="\${ifDefined(args.headerBackgroundDesign)}"
    content-background-design="\${ifDefined(args.contentBackgroundDesign)}"
    tabs-placement="\${ifDefined(args.tabsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-tabcontainer>\`;
}`,...(y=($=s.parameters)==null?void 0:$.docs)==null?void 0:y.source}}};const L=["Basic","TextOnlyTabs","TextOnlyEndOverflow","InlineTabLayout","NestedTabs"],C=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,InlineTabLayout:o,NestedTabs:s,TextOnlyEndOverflow:n,TextOnlyTabs:i,__namedExportsOrder:L,default:O},Symbol.toStringTag,{value:"Module"}));export{C,q as c};
