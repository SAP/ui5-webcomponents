import{x as s}from"./lit-element-c5a2b594.js";import{l as e}from"./if-defined-c29cffe1.js";const r={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]}},d={package:"@ui5/webcomponents-fiori",tagName:"ui5-notification-action",showDefaultStoryOnly:!0},c={title:"Fiori/Notification List Item/Notification Action",component:"NotificationAction",parameters:{docs:{story:{iframeHeight:"470px",inline:!1}}},argTypes:r},l=i=>s`<ui5-list header-text="Notifications">
    <ui5-li-notification
        title-text="New order (#2525)"
        priority="High">
        <ui5-notification-action
            icon="${e(i.icon)}"
            text="${e(i.text)}"
            slot="actions">
        </ui5-notification-action>
        <ui5-avatar size="XS" slot="avatar">
            <img src="../assets/images/avatars/woman_avatar_1.png">
        </ui5-avatar>
        And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-list>
`,t=l.bind({});t.tags=["_hidden_"];t.args={text:"Accept",icon:"accept"};var o,n,a;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`args => {
  return html\`<ui5-list header-text="Notifications">
    <ui5-li-notification
        title-text="New order (#2525)"
        priority="High">
        <ui5-notification-action
            icon="\${ifDefined(args.icon)}"
            text="\${ifDefined(args.text)}"
            slot="actions">
        </ui5-notification-action>
        <ui5-avatar size="XS" slot="avatar">
            <img src="../assets/images/avatars/woman_avatar_1.png">
        </ui5-avatar>
        And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
    </ui5-li-notification>
</ui5-list>
\`;
}`,...(a=(n=t.parameters)==null?void 0:n.docs)==null?void 0:a.source}}};const u=["Basic"],f=Object.freeze(Object.defineProperty({__proto__:null,Basic:t,__namedExportsOrder:u,default:c},Symbol.toStringTag,{value:"Module"}));export{f as C,d as c};
