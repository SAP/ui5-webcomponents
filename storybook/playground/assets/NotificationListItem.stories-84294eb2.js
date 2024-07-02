import{x as n}from"./lit-element-c5a2b594.js";import{l as i}from"./if-defined-c29cffe1.js";import{o}from"./unsafe-html-0ddd83da.js";import{o as w}from"./ValueState-8914436d.js";const x={wrappingType:{control:"select",options:["None","Normal"]},state:{control:"select",options:["None","Positive","Critical","Negative","Information"]},importance:{control:"select",options:["Standard","Important"]},avatar:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},menu:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},footnotes:{control:{type:"text"},table:{type:{summary:"Array<HTMLElement>"}}},default:{control:{type:"text"},table:{type:{summary:"Array<Node>"}}},close:{description:"Fired when the `Close` button is pressed.",control:{type:!1},table:{category:"events"},UI5CustomData:{parameters:[{type:{text:"HTMLElement"},name:"item",_ui5privacy:"public",description:"the closed item."}]}}},S={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8",tagName:"ui5-li-notification"};var l=Object.freeze,$=Object.defineProperty,h=(e,y)=>l($(e,"raw",{value:l(y||e.slice())})),u,c;const L={title:"Fiori/Notification List Item",component:"NotificationListItem",parameters:{docs:{story:{iframeHeight:"470px",inline:!1}}},argTypes:x},s=e=>n(u||(u=h([`<ui5-list header-text="Notifications">
	`,`
</ui5-list>

<script>
	var notificationList = document.querySelector("ui5-list");
	notificationList.addEventListener("item-close", e => {
		e.detail.item.hidden = true;
	});
<\/script>`])),e()),r=e=>n`<ui5-li-notification
    title-text="${i(e.titleText)}"
    state="${i(e.state)}"
    ?show-close="${i(e.showClose)}"
    ?read="${i(e.read)}"
    ?loading="${i(e.loading)}"
    loading-delay="${i(e.loadingDelay)}"
    wrappingType="${i(e.wrappingType)}"
>
    ${o(e.menu)}
    ${o(e.avatar)}
    ${o(e.footnotes)}
    ${o(e.default)}
</ui5-li-notification>`;r.decorators=[s];const a=r.bind({});a.args={titleText:"New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",default:"And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",showClose:!0,state:w.Negative,avatar:`<ui5-avatar size="XS" slot="avatar">
    <img src="../assets/images/avatars/woman_avatar_1.png">
</ui5-avatar>`,footnotes:`<span slot="footnotes">Monique Legrand</span>
<span slot="footnotes">2 Days</span>`};a.decorators=[e=>n`${e()}

<ui5-li-notification importance="Important" show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Negative">
    <ui5-avatar size="XS" slot="avatar">
        <img src="../assets/images/avatars/man_avatar_1.png">
    </ui5-avatar>
    <span slot="footnotes">Alain Chevalier</span>
    <span slot="footnotes">2 Days</span>
    And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification show-close title-text="New order (#2525) With a short title" state="Negative" read>
    <ui5-avatar size="XS" slot="avatar">
        <img src="../assets/images/avatars/man_avatar_2.png">
    </ui5-avatar>
    <span slot="footnotes">John Doe</span>
    <span slot="footnotes">2 Days</span>
    And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`,s];const t=r.bind({});t.args={showClose:!0,titleText:"New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",default:"And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",avatar:'<ui5-avatar initials="JD" size="XS" slot="avatar"></ui5-avatar>',footnotes:`<span slot="footnotes">John Doe</span>
<span slot="footnotes">2 Days</span>`,menu:'<ui5-menu slot="menu"><ui5-menu-item icon="accept" text="Accept"></ui5-menu-item><ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item></ui5-menu>'};t.decorators=[e=>n`<style>
        #popover-with-notifications::part(content) {
            padding: 0;
            max-height: 40rem;
            max-width: 27rem;
        }
    </style>
    ${e()}
<ui5-li-notification
    show-close
    title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
    state="Negative"
>
    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Office Notifications</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="accept" text="Accept"></ui5-menu-item>
    </ui5-menu>
    And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification
    title-text="New order (#2565) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
    state="Critical"
>
    <ui5-avatar initials="JS" size="XS" slot="avatar"></ui5-avatar>
    <span slot="footnotes">Patricia Clark</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="accept" text="Accept All Requested Information"></ui5-menu-item>
        <ui5-menu-item icon="accept" icon="decline" text="Reject All Requested Information"></ui5-menu-item>
        <ui5-menu-item text="View" starts-section></ui5-menu-item>
        <ui5-menu-item text="Clear" icon="message-error"></ui5-menu-item>
        <ui5-menu-item text="Unsubscribe" starts-section></ui5-menu-item>
        <ui5-menu-item text="Settings"></ui5-menu-item>
    </ui5-menu>
    Short description
</ui5-li-notification>

<ui5-li-notification title-text="New order (#2523)">
    <span slot="footnotes">John Smith</span>
    <span slot="footnotes">3 Days</span>
    <ui5-menu slot="menu">
        <ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item>
    </ui5-menu>
    With a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`,e=>n(c||(c=h([`<ui5-shellbar
	primary-title="Corporate Portal"
	logo="../assets/images/sap-logo-svg.svg"
	show-notifications
	notifications-count="4"
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
<\/script>`])),s(e))];t.parameters={docs:{story:{iframeHeight:"700px"}}};var p,m,d;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification
    title-text="\${ifDefined(args.titleText)}"
    state="\${ifDefined(args.state)}"
    ?show-close="\${ifDefined(args.showClose)}"
    ?read="\${ifDefined(args.read)}"
    ?loading="\${ifDefined(args.loading)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
    wrappingType="\${ifDefined(args.wrappingType)}"
>
    \${unsafeHTML(args.menu)}
    \${unsafeHTML(args.avatar)}
    \${unsafeHTML(args.footnotes)}
    \${unsafeHTML(args.default)}
</ui5-li-notification>\`;
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var f,g,v;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`args => {
  return html\`<ui5-li-notification
    title-text="\${ifDefined(args.titleText)}"
    state="\${ifDefined(args.state)}"
    ?show-close="\${ifDefined(args.showClose)}"
    ?read="\${ifDefined(args.read)}"
    ?loading="\${ifDefined(args.loading)}"
    loading-delay="\${ifDefined(args.loadingDelay)}"
    wrappingType="\${ifDefined(args.wrappingType)}"
>
    \${unsafeHTML(args.menu)}
    \${unsafeHTML(args.avatar)}
    \${unsafeHTML(args.footnotes)}
    \${unsafeHTML(args.default)}
</ui5-li-notification>\`;
}`,...(v=(g=t.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const D=["Basic","InShellBar"],P=Object.freeze(Object.defineProperty({__proto__:null,Basic:a,InShellBar:t,__namedExportsOrder:D,default:L},Symbol.toStringTag,{value:"Module"}));export{P as C,S as c};
