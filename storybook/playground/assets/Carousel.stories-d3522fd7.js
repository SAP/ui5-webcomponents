import{x as r}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as u}from"./unsafe-html-0ddd83da.js";import{C as p}from"./CarouselArrowsPlacement-f6f55791.js";const g={pageIndicatorType:{control:"select",options:["Default","Numeric"]},backgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},pageIndicatorBackgroundDesign:{control:"select",options:["Solid","Transparent","Translucent"]},pageIndicatorBorderDesign:{control:"select",options:["Solid","None"]},arrowsPlacement:{control:"select",options:["Content","Navigation"]},visibleItemsIndices:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},navigateTo:{description:"Changes the currently displayed page.",table:{category:"methods"},UI5CustomData:{parameters:[{name:"itemIndex",type:{text:"number"},description:"The index of the target page",_ui5privacy:"public"}],returnValue:{type:{text:"void"}}}},navigate:{description:"Fired whenever the page changes due to user interaction,\nwhen the user clicks on the navigation arrows or while resizing,\nbased on the `items-per-page` property.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"Integer",references:[{name:"Integer",package:"@ui5/webcomponents-base",module:"dist/types/Integer.js"}]},name:"selectedIndex",_ui5privacy:"public",description:"the current selected index"}]}}},D={package:"@ui5/webcomponents",since:"1.0.0-rc.6",tagName:"ui5-carousel"},h={title:"Main/Carousel",component:"Carousel",argTypes:g},m=e=>r`
<ui5-carousel
    ?cyclic="${t(e.cyclic)}"
    items-per-page="${t(e.itemsPerPage)}"
    ?hide-navigation-arrows="${t(e.hideNavigationArrows)}"
    ?hide-page-indicator="${t(e.hidePageIndicator)}"
    page-indicator-type="${t(e.pageIndicatorType)}"
    arrows-placement="${t(e.arrowsPlacement)}"
>
    ${u(e.default)}
</ui5-carousel>`,a=m.bind({});a.args={cyclic:!0,default:`<img src="../assets/images/sample1.jpg" alt="Landscape 1">
    <img src="../assets/images/sample2.jpg" alt="Landscape 2">
    <img src="../assets/images/sample3.jpg" alt="Bulb">`};a.decorators=[e=>r`<style>
    img {
        max-height: 30rem;
    }
</style>
${e()}`];const i=m.bind({});i.args={itemsPerPage:"S1 M2 L2",arrowsPlacement:p.Navigation,default:`<ui5-card class="medium">
    <ui5-card-header slot="header" title-text="Activities" subtitle-text="For Today"></ui5-card-header>
    <ui5-timeline>
        <ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
        <ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">MR SOF02 2.43</ui5-timeline-item>
        <ui5-timeline-item title-text="Video Conference Call - UI5" timestamp="1485813600000" icon="calendar">Online meeting</ui5-timeline-item>
    </ui5-timeline>
</ui5-card>
<ui5-card class="small">
    <ui5-card-header slot="header" title-text="David Williams" subtitle-text="Sales Manager">
        <img src="../assets/images/avatars/man_avatar_1.png" alt="" slot="avatar">
    </ui5-card-header>
    <ui5-list separators="Inner">
        <ui5-li icon="competitor" icon-end>Personal Development</ui5-li>
        <ui5-li icon="wallet" icon-end>Finance</ui5-li>
        <ui5-li icon="collaborate" icon-end>Communications Skills</ui5-li>
    </ui5-list>
</ui5-card>
<ui5-card class="medium">
    <ui5-card-header slot="header" title-text="Team Dolphins" subtitle-text="Direct Reports" status="1 of 2">
        <ui5-icon name="group" slot="avatar"></ui5-icon>
    </ui5-card-header>
    <ui5-list separators="None">
        <ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
        <ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
        <ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Michael Adams</ui5-li>
    </ui5-list>
</ui5-card>
<ui5-card class="medium">
    <ui5-card-header slot="header" title-text="Team Bears" subtitle-text="Direct Reports" interactive="" status="2 of 2">
        <ui5-icon name="group" slot="avatar"></ui5-icon>
    </ui5-card-header>
    <ui5-list separators="None">
        <ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
        <ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
        <ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
    </ui5-list>
</ui5-card>`};i.decorators=[e=>r`<style>
    ui5-carousel::part(content) {
        padding-block: 0.75rem;
    }

    ui5-card {
        min-width: 18rem;
    }

    ui5-card ui5-list:last-child {
        margin-block-end: 0.75rem;
    }

    ui5-li::part(icon) {
        padding-inline-end: 0;
    }
</style>
${e()}`];var s,n,o;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`args => {
  return html\`
<ui5-carousel
    ?cyclic="\${ifDefined(args.cyclic)}"
    items-per-page="\${ifDefined(args.itemsPerPage)}"
    ?hide-navigation-arrows="\${ifDefined(args.hideNavigationArrows)}"
    ?hide-page-indicator="\${ifDefined(args.hidePageIndicator)}"
    page-indicator-type="\${ifDefined(args.pageIndicatorType)}"
    arrows-placement="\${ifDefined(args.arrowsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-carousel>\`;
}`,...(o=(n=a.parameters)==null?void 0:n.docs)==null?void 0:o.source}}};var c,l,d;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`args => {
  return html\`
<ui5-carousel
    ?cyclic="\${ifDefined(args.cyclic)}"
    items-per-page="\${ifDefined(args.itemsPerPage)}"
    ?hide-navigation-arrows="\${ifDefined(args.hideNavigationArrows)}"
    ?hide-page-indicator="\${ifDefined(args.hidePageIndicator)}"
    page-indicator-type="\${ifDefined(args.pageIndicatorType)}"
    arrows-placement="\${ifDefined(args.arrowsPlacement)}"
>
    \${unsafeHTML(args.default)}
</ui5-carousel>\`;
}`,...(d=(l=i.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};const f=["Basic","MultipleItemsPerPage"],P=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,MultipleItemsPerPage:i,__namedExportsOrder:f,default:h},Symbol.toStringTag,{value:"Module"}));export{P as C,D as c};
