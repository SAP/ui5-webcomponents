import{x as n}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o as a}from"./unsafe-html-0ddd83da.js";import{P as g}from"./Priority-ed61c98b.js";const b={priority:{control:"select",options:["High","Medium","Low","None"]},default:{control:{type:"text"},table:{type:{summary:"Array<NotificationListItemBase>"}}},actions:{control:{type:"text"},table:{type:{summary:"Array<NotificationAction>"}}},close:{description:"Fired when the `Close` button is pressed.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the closed item."}]}}},q={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-li-notification-group"};var s=Object.freeze,x=Object.defineProperty,h=(t,w)=>s(x(t,"raw",{value:s(w||t.slice())})),r,c;const L={title:"Fiori/Notification List Group Item",component:"NotificationListGroupItem",parameters:{docs:{story:{inline:!1}}},argTypes:b},v=t=>n`<ui5-li-notification-group
    ?collapsed="${i(t.collapsed)}"
    ?show-counter="${i(t.showCounter)}"
    title-text="${i(t.titleText)}"
    priority="${i(t.priority)}"
    ?show-close="${i(t.showClose)}"
    ?read="${i(t.read)}"
    ?busy="${i(t.busy)}"
    busy-delay="${i(t.busyDelay)}"
>
    ${a(t.default)}
    ${a(t.actions)}
</ui5-li-notification-group>`,o=v.bind({});o.args={showClose:!0,showCounter:!0,titleText:"Orders",priority:g.High,default:`<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>
<ui5-li-notification show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`,actions:`<ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>`};const y=t=>n(r||(r=h([`<ui5-list header-text="Notifications Grouped">
	`,`
</ui5-list>

<script>
	var notificationList = document.querySelector("ui5-list");
	notificationList.addEventListener("item-close", e => {
		e.detail.item.hidden = true;
	});
<\/script>`])),t());o.decorators=[t=>n`${t()}
<ui5-li-notification-group
    show-close
    show-counter
    title-text="Deliveries"
    priority="Medium"
    collapsed
>
    <ui5-li-notification show-close title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
</ui5-li-notification-group>

<ui5-li-notification-group
    show-close
    show-counter
    priority="Low"
    collapsed
    title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
>
    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" priority="Low" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" priority="Low" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-li-notification-group>`,y];const e=v.bind({});e.args={showClose:!0,showCounter:!0,titleText:"Orders",priority:g.High,default:`<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`,actions:`<ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>`};e.decorators=[t=>n`<style>
        #popover-with-notifications::part(content) {
            padding: 0;
            max-width: 400px;
        }
    </style>
    ${t()}
<ui5-li-notification-group show-close show-counter title-text="Deliveries" priority="Medium" collapsed>
    <ui5-li-notification show-close title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
</ui5-li-notification-group>

<ui5-li-notification-group show-close show-counter priority="High" collapsed title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" priority="High" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>

    <ui5-li-notification show-close title-text="New meeting at Building (#35001)" priority="High" read>
        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
        <span slot="footnotes">Office Notifications</span>
        <span slot="footnotes">3 Days</span>
        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-li-notification-group>`,t=>n(c||(c=h([`<ui5-shellbar
	primary-title="Corporate Portal"
	logo="../assets/images/sap-logo-svg.svg"
	show-notifications
	notifications-count="6"
></ui5-shellbar>
<ui5-popover
	placement-type="Bottom"
	horizontal-align="Right"
	id="popover-with-notifications"
>
	`,`
</ui5-popover>

<script>
	var shellbar = document.querySelector("ui5-shellbar");
	var notificationsPopover = document.querySelector("ui5-popover");

	shellbar.addEventListener("notifications-click", e => {
		event.preventDefault();
		notificationsPopover.showAt(e.detail.targetRef);
	});
<\/script>`])),y(t))];e.parameters={docs:{story:{iframeHeight:"700px"}}};var l,u,p;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification-group
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?show-counter="\${ifDefined(args.showCounter)}"
    title-text="\${ifDefined(args.titleText)}"
    priority="\${ifDefined(args.priority)}"
    ?show-close="\${ifDefined(args.showClose)}"
    ?read="\${ifDefined(args.read)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.actions)}
</ui5-li-notification-group>\`;
}`,...(p=(u=o.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var f,d,m;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification-group
    ?collapsed="\${ifDefined(args.collapsed)}"
    ?show-counter="\${ifDefined(args.showCounter)}"
    title-text="\${ifDefined(args.titleText)}"
    priority="\${ifDefined(args.priority)}"
    ?show-close="\${ifDefined(args.showClose)}"
    ?read="\${ifDefined(args.read)}"
    ?busy="\${ifDefined(args.busy)}"
    busy-delay="\${ifDefined(args.busyDelay)}"
>
    \${unsafeHTML(args.default)}
    \${unsafeHTML(args.actions)}
</ui5-li-notification-group>\`;
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};const D=["Basic","InShellBar"],S=Object.freeze(Object.defineProperty({__proto__:null,Basic:o,InShellBar:e,__namedExportsOrder:D,default:L},Symbol.toStringTag,{value:"Module"}));export{S as C,q as c};
