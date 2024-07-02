import{x as D}from"./lit-element-c5a2b594.js";import{l as t}from"./if-defined-c29cffe1.js";import{o as i}from"./unsafe-html-0ddd83da.js";const I={logoDomRef:{control:{type:!1}},copilotDomRef:{control:{type:!1}},notificationsDomRef:{control:{type:!1}},overflowDomRef:{control:{type:!1}},profileDomRef:{control:{type:!1}},productSwitchDomRef:{control:{type:!1}},default:{control:{type:"text"},table:{type:{summary:"Array<ShellBarItem>"}}},profile:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},logo:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},menuItems:{control:{type:"text"},table:{type:{summary:"Array<ListItemBase>"}}},searchField:{control:{type:"text"},table:{type:{summary:"Array<Input>"}}},startButton:{control:{type:"text"},table:{type:{summary:"Array<IButton>"}}},closeOverflow:{description:`Closes the overflow area.
Useful to manually close the overflow after having suppressed automatic closing with preventDefault() of ShellbarItem's press event`,table:{category:"methods"},UI5CustomData:{returnValue:{type:{text:"void"}}}},"notifications-click":{description:"Fired, when the notification icon is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"dom ref of the activated element"}]}},"profile-click":{description:"Fired, when the profile slot is present.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"dom ref of the activated element"}]}},"product-switch-click":{description:"Fired, when the product switch icon is activated.\n\n**Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"dom ref of the activated element"}]}},"logo-click":{description:"Fired, when the logo is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"dom ref of the activated element"}]}},"co-pilot-click":{description:"Fired, when the co pilot is activated.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"targetRef",_ui5privacy:"public",description:"dom ref of the activated element"}]}},"menu-item-click":{description:"Fired, when a menu item is activated\n\n**Note:** You can prevent closing of overflow popover by calling `event.preventDefault()`.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"DOM ref of the activated list item"}]}}},S={package:"@ui5/webcomponents-fiori",since:"0.8.0",tagName:"ui5-shellbar"};var c=Object.freeze,x=Object.defineProperty,H=(e,A)=>c(x(e,"raw",{value:c(A||e.slice())})),u;const L={title:"Fiori/ShellBar",component:"ShellBar",argTypes:I},l=e=>D`<ui5-shellbar
    primary-title="${t(e.primaryTitle)}"
    secondary-title="${t(e.secondaryTitle)}"
    notifications-count="${t(e.notificationsCount)}"
    ?show-notifications="${t(e.showNotifications)}"
    ?show-co-pilot="${t(e.showCoPilot)}"
    ?show-search-field="${t(e.showSearchField)}"
    .accessibilityRoles="${t(e.accessibilityRoles)}"
    .accessibilityTexts="${t(e.accessibilityTexts)}"
    .accessibilityAttributes="${t(e.accessibilityAttributes)}"
>
    ${i(e.default)} 
    ${i(e.profile)}
    ${i(e.logo)} 
    ${i(e.menuItems)}
    ${i(e.searchField)} 
    ${i(e.startButton)}
</ui5-shellbar>`,o=l.bind({});o.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",profile:'<ui5-avatar slot="profile" icon="customer"></ui5-avatar>',logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />',startButton:'<ui5-button icon="nav-back" slot="startButton"></ui5-button>'};const n=l.bind({});n.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",showNotifications:!0,notificationsCount:"99+",profile:`
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>`,logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />',searchField:'<ui5-input slot="searchField" placeholder="Enter service..."></ui5-input>'};const s=l.bind({});s.args={primaryTitle:"Corporate Portal",secondaryTitle:"secondary title",showCoPilot:!0,profile:`
    <ui5-avatar slot="profile">
        <img src="../assets/images/avatars/woman_avatar_5.png" />
    </ui5-avatar>`,logo:'<img slot="logo" src="../assets/images/sap-logo-svg.svg" />'};let a=0;const r=()=>(a++,D(u||(u=H([`
        <ui5-shellbar
            id="shellbar-`,`"
            primary-title="Corporate Portal"
            secondary-title="secondary title"
            notifications-count="99+"
            show-notifications=""
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
        <ui5-popover id="action-popover-`,`" placement-type="Bottom">
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
            (function () {
                const shellbar = document.getElementById("shellbar-`,`");
                const actionPopover = document.getElementById(
                    "action-popover-`,`"
                );
                shellbar.addEventListener(
                    "ui5-profile-click",
                    function (event) {
                        actionPopover.showAt(event.detail.targetRef);
                    }
                );
            })();
        <\/script>
    `])),a,a,a,a));var p,m,f;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(f=(m=o.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};var d,g,y;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(y=(g=n.parameters)==null?void 0:g.docs)==null?void 0:y.source}}};var h,v,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:'args => html`<ui5-shellbar\n    primary-title="${ifDefined(args.primaryTitle)}"\n    secondary-title="${ifDefined(args.secondaryTitle)}"\n    notifications-count="${ifDefined(args.notificationsCount)}"\n    ?show-notifications="${ifDefined(args.showNotifications)}"\n    ?show-co-pilot="${ifDefined(args.showCoPilot)}"\n    ?show-search-field="${ifDefined(args.showSearchField)}"\n    .accessibilityRoles="${ifDefined(args.accessibilityRoles)}"\n    .accessibilityTexts="${ifDefined(args.accessibilityTexts)}"\n    .accessibilityAttributes="${ifDefined(args.accessibilityAttributes)}"\n>\n    ${unsafeHTML(args.default)} \n    ${unsafeHTML(args.profile)}\n    ${unsafeHTML(args.logo)} \n    ${unsafeHTML(args.menuItems)}\n    ${unsafeHTML(args.searchField)} \n    ${unsafeHTML(args.startButton)}\n</ui5-shellbar>`',...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var $,w,T;r.parameters={...r.parameters,docs:{...($=r.parameters)==null?void 0:$.docs,source:{originalSource:`() => {
  index++;
  return html\`
        <ui5-shellbar
            id="shellbar-\${index}"
            primary-title="Corporate Portal"
            secondary-title="secondary title"
            notifications-count="99+"
            show-notifications=""
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
        <ui5-popover id="action-popover-\${index}" placement-type="Bottom">
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
            (function () {
                const shellbar = document.getElementById("shellbar-\${index}");
                const actionPopover = document.getElementById(
                    "action-popover-\${index}"
                );
                shellbar.addEventListener(
                    "ui5-profile-click",
                    function (event) {
                        actionPopover.showAt(event.detail.targetRef);
                    }
                );
            })();
        <\/script>
    \`;
}`,...(T=(w=r.parameters)==null?void 0:w.docs)==null?void 0:T.source}}};const M=["Basic","Search","WithJoule","Advanced"],F=Object.freeze(Object.defineProperty({__proto__:null,Advanced:r,Basic:o,Search:n,WithJoule:s,__namedExportsOrder:M,default:L},Symbol.toStringTag,{value:"Module"}));export{F as C,S as c};
