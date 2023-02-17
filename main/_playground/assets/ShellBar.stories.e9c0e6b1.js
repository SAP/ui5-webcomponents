import{y as D}from"./lit-html.9e2e9691.js";import{l as t}from"./if-defined.fd0de8da.js";import{o as e}from"./unsafe-html.9d6beac9.js";import{D as P}from"./docs.ac7cb078.js";import"./index.854754ad.js";import"./iframe.7e023a71.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.028c5fc4.js";import"./chunk-R4NKYYJA.15989c7a.js";const H={copilotDomRef:{control:{type:!1}},logoDomRef:{control:{type:!1}},notificationsDomRef:{control:{type:!1}},overflowDomRef:{control:{type:!1}},productSwitchDomRef:{control:{type:!1}},profileDomRef:{control:{type:!1}},default:{control:{type:"text"}},logo:{control:{type:"text"}},menuItems:{control:{type:"text"}},profile:{control:{type:"text"}},searchField:{control:{type:"text"}},startButton:{control:{type:"text"}},closeOverflow:{table:{category:"Methods"}}},S={package:"@ui5/webcomponents-fiori",since:"0.8.0"};var l=Object.freeze,I=Object.defineProperty,B=(i,A)=>l(I(i,"raw",{value:l(A||i.slice())})),c;const u="ui5-shellbar",W={title:"Fiori/ShellBar",component:u,subcomponents:{ShellBarItem:"ui5-shellbar-item"},parameters:{docs:{page:P({...S,component:u})}},argTypes:H},r=i=>D`<ui5-shellbar
    primary-title="${t(i.primaryTitle)}"
    secondary-title="${t(i.secondaryTitle)}"
    notifications-count="${t(i.notificationsCount)}"
    ?show-notifications="${t(i.showNotifications)}"
    ?show-product-switch="${t(i.showProductSwitch)}"
    ?show-co-pilot="${t(i.showCoPilot)}"
    ?show-search-field="${t(i.showSearchField)}"
    .accessibilityRoles="${t(i.accessibilityRoles)}"
    .accessibilityTexts="${t(i.accessibilityTexts)}"
    .accessibilityAttributes="${t(i.accessibilityAttributes)}"
>
    ${e(i.default)} 
    ${e(i.profile)}
    ${e(i.logo)} 
    ${e(i.menuItems)}
    ${e(i.searchField)} 
    ${e(i.startButton)}
</ui5-shellbar>`,o=r.bind({});o.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",profile:'<ui5-avatar slot="profile" icon="customer"></ui5-avatar>',logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />',startButton:'<ui5-button icon="nav-back" slot="startButton"></ui5-button>'};const s=r.bind({});s.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",showNotifications:!0,notificationsCount:"99+",profile:`
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>`,logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />',searchField:'<ui5-input slot="searchField" placeholder="Enter service..."></ui5-input>'};const n=r.bind({});n.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",showCoPilot:!0,profile:`
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>`,logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />'};const a=()=>D(c||(c=B([`
<ui5-shellbar
    id="shellbar"
    primary-title="Corporate Portal"
    secondary-title="secondary title"
    notifications-count="99+"
    show-notifications=""
    show-product-switch=""
    show-co-pilot=""
>
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>
    <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
    <ui5-button icon="nav-back" slot="startButton"></ui5-button>

    <ui5-input slot="searchField"></ui5-input>
    <ui5-li slot="menuItems">Application 1</ui5-li>
    <ui5-li slot="menuItems">Application 2</ui5-li>
    <ui5-li slot="menuItems">Application 3</ui5-li>
    <ui5-li slot="menuItems">Application 4</ui5-li>
    <ui5-li slot="menuItems">Application 5</ui5-li>
</ui5-shellbar>
<ui5-popover id="action-popover" placement-type="Bottom">
    <div class="action-popover-header">
        <ui5-title style="padding: 0.25rem 1rem 0rem 1rem"
            >An Kimura</ui5-title
        >
    </div>
    <div class="action-popover-content" style="margin-top: 1rem;">
        <ui5-list separators="None">
            <ui5-li icon="sys-find">App Finder</ui5-li>
            <ui5-li icon="settings">Settings</ui5-li>
            <ui5-li icon="edit">Edit Home Page</ui5-li>
            <ui5-li icon="sys-help">Help</ui5-li>
            <ui5-li icon="log">Sign out</ui5-li>
        </ui5-list>
    </div>
</ui5-popover>
<script>
    const shellbar = document.getElementById("shellbar");
    const actionPopover = document.getElementById("action-popover");
    shellbar.addEventListener("ui5-profile-click", function (event) {
        actionPopover.showAt(event.detail.targetRef);
    });
<\/script>
`])));var p,f,d;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-product-switch="${ifDefined(args.showProductSwitch)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(d=(f=o.parameters)==null?void 0:f.docs)==null?void 0:d.source}}};var m,g,h;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-product-switch="${ifDefined(args.showProductSwitch)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(h=(g=s.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var y,b,v;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-product-switch="${ifDefined(args.showProductSwitch)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(v=(b=n.parameters)==null?void 0:b.docs)==null?void 0:v.source}}};var $,w,T;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`() => html\`
<ui5-shellbar
    id="shellbar"
    primary-title="Corporate Portal"
    secondary-title="secondary title"
    notifications-count="99+"
    show-notifications=""
    show-product-switch=""
    show-co-pilot=""
>
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>
    <img slot="logo" src="../assets/images/sap-logo-svg.svg" />
    <ui5-button icon="nav-back" slot="startButton"></ui5-button>

    <ui5-input slot="searchField"></ui5-input>
    <ui5-li slot="menuItems">Application 1</ui5-li>
    <ui5-li slot="menuItems">Application 2</ui5-li>
    <ui5-li slot="menuItems">Application 3</ui5-li>
    <ui5-li slot="menuItems">Application 4</ui5-li>
    <ui5-li slot="menuItems">Application 5</ui5-li>
</ui5-shellbar>
<ui5-popover id="action-popover" placement-type="Bottom">
    <div class="action-popover-header">
        <ui5-title style="padding: 0.25rem 1rem 0rem 1rem"
            >An Kimura</ui5-title
        >
    </div>
    <div class="action-popover-content" style="margin-top: 1rem;">
        <ui5-list separators="None">
            <ui5-li icon="sys-find">App Finder</ui5-li>
            <ui5-li icon="settings">Settings</ui5-li>
            <ui5-li icon="edit">Edit Home Page</ui5-li>
            <ui5-li icon="sys-help">Help</ui5-li>
            <ui5-li icon="log">Sign out</ui5-li>
        </ui5-list>
    </div>
</ui5-popover>
<script>
    const shellbar = document.getElementById("shellbar");
    const actionPopover = document.getElementById("action-popover");
    shellbar.addEventListener("ui5-profile-click", function (event) {
        actionPopover.showAt(event.detail.targetRef);
    });
<\/script>
\``,...(T=(w=a.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const q=["Basic","SearchAndNotifications","WithCoPilot","Advanced"];export{a as Advanced,o as Basic,s as SearchAndNotifications,n as WithCoPilot,q as __namedExportsOrder,W as default};
//# sourceMappingURL=ShellBar.stories.e9c0e6b1.js.map
