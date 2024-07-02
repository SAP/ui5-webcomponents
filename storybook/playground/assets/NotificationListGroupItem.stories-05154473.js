import{x as n}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";import{o as y}from"./unsafe-html-0ddd83da.js";const w={default:{control:{type:"text"},table:{type:{summary:"Array<NotificationListItemBase>"}}}},q={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-li-notification-group"};var a=Object.freeze,x=Object.defineProperty,f=(e,h)=>a(x(e,"raw",{value:a(h||e.slice())})),s,l;const b={title:"Fiori/Notification List Group Item",component:"NotificationListGroupItem",parameters:{docs:{story:{inline:!1}}},argTypes:w},g=e=>n`<ui5-li-notification-group
    ?collapsed="${o(e.collapsed)}"
    title-text="${o(e.titleText)}"
    ?read="${o(e.read)}"
    ?loading="${o(e.loading)}"
    loading-delay="${o(e.loadingDelay)}"
>
    ${y(e.default)}
</ui5-li-notification-group>`,i=g.bind({});i.args={titleText:"Orders",default:`<ui5-li-notification importance="Important" show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."  state="Negative">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
    </ui5-menu>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>
<ui5-li-notification show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Negative">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
        <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
    </ui5-menu>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`};const v=e=>n(s||(s=f([`<ui5-list accessible-name="Notifications">
	`,`
</ui5-list>

<script>
	var notificationList = document.querySelector("ui5-list");
	notificationList.addEventListener("item-close", e => {
		e.detail.item.hidden = true;
	});
<\/script>`])),e());i.decorators=[e=>n`${e()}
<ui5-li-notification-group
    show-close
    show-counter
    title-text="Deliveries"
    collapsed
>
    <ui5-li-notification show-close title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Critical">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-menu slot="menu">
            <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        </ui5-menu>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Critical">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-menu slot="menu">
            <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        </ui5-menu>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

</ui5-li-notification-group>

<ui5-li-notification-group
    show-close
    show-counter
    collapsed
    title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
>
    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" state="Information" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" state="Information" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-li-notification-group>`,v];const t=g.bind({});t.args={titleText:"Orders",default:`<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Negative">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
    </ui5-menu>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Negative">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
        <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
    </ui5-menu>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`};t.decorators=[e=>n`<style>
        #popover-with-notifications::part(content) {
            padding: 0;
            max-height: 40rem;
            max-width: 27rem;
        }
    </style>
    ${e()}
<ui5-li-notification-group show-close show-counter title-text="Deliveries" collapsed>
    <ui5-li-notification show-close title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Critical">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-menu slot="menu">
            <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        </ui5-menu>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."  state="Critical">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-menu slot="menu">
            <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
        </ui5-menu>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

</ui5-li-notification-group>

<ui5-li-notification-group show-close show-counter collapsed title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
    <ui5-li-notification show-close title-text="New meeting at Building (#35001)"  state="Negative" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" state="Negative" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-li-notification-group>`,e=>n(l||(l=f([`<ui5-shellbar
	primary-title="Corporate Portal"
	logo="../assets/images/sap-logo-svg.svg"
	show-notifications
	notifications-count="6"
></ui5-shellbar>
<ui5-popover
	placement="Bottom"
	horizontal-align="End"
	id="popover-with-notifications"
>
	`,`
</ui5-popover>

<script>
	var shellbar = document.querySelector("ui5-shellbar");
	var notificationsPopover = document.querySelector("ui5-popover");

	shellbar.addEventListener("notifications-click", e => {
		event.preventDefault();
		notificationsPopover.opener = e.detail.targetRef;
		notificationsPopover.open = true;
	});
<\/script>`])),v(e))];t.parameters={docs:{story:{iframeHeight:"700px"}}};var r,u,c;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification-group
    ?collapsed="\${ifDefined(args.collapsed)}"
    title-text="\${ifDefined(args.titleText)}"
    ?read="\${ifDefined(args.read)}"
    ?loading="\${ifDefined(args.loading)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
>
    \${unsafeHTML(args.default)}
</ui5-li-notification-group>\`;
}`,...(c=(u=i.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};var p,m,d;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification-group
    ?collapsed="\${ifDefined(args.collapsed)}"
    title-text="\${ifDefined(args.titleText)}"
    ?read="\${ifDefined(args.read)}"
    ?loading="\${ifDefined(args.loading)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
>
    \${unsafeHTML(args.default)}
</ui5-li-notification-group>\`;
}`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};const N=["Basic","InShellBar"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,InShellBar:t,__namedExportsOrder:N,default:b},Symbol.toStringTag,{value:"Module"}));export{S as C,q as c};
