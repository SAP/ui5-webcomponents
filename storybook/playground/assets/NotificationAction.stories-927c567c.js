import{x as r}from"./lit-element-c5a2b594.js";import{l as o}from"./if-defined-c29cffe1.js";const s={design:{control:"select",options:["Default","Positive","Negative","Transparent","Emphasized","Attention"]}},m={package:"@ui5/webcomponents-fiori",tagName:"ui5-notification-action",showDefaultStoryOnly:!0},c={title:"Fiori/Notification List Group Item/Notification Action",component:"NotificationAction",parameters:{docs:{story:{iframeHeight:"470px",inline:!1}}},argTypes:s},l=t=>r`<ui5-list header-text="Notifications">
    <ui5-li-notification-group title-text="Orders (2)" priority="High" show-close>
        <ui5-li-notification
            title-text="New order (#2525)"
            priority="High">
            <ui5-avatar size="XS" slot="avatar">
                <img src="../assets/images/avatars/woman_avatar_1.png">
            </ui5-avatar>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ui5-li-notification>
        <ui5-notification-action
            icon="${o(t.icon)}"
            text="${o(t.text)}"
            slot="actions">
        </ui5-notification-action>
    </ui5-li-notification-group>
</ui5-list>
`,i=l.bind({});i.tags=["_hidden_"];i.args={text:"Accept",icon:"accept"};var n,e,a;i.parameters={...i.parameters,docs:{...(n=i.parameters)==null?void 0:n.docs,source:{originalSource:`args => {
  return html\`<ui5-list header-text="Notifications">
    <ui5-li-notification-group title-text="Orders (2)" priority="High" show-close>
        <ui5-li-notification
            title-text="New order (#2525)"
            priority="High">
            <ui5-avatar size="XS" slot="avatar">
                <img src="../assets/images/avatars/woman_avatar_1.png">
            </ui5-avatar>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ui5-li-notification>
        <ui5-notification-action
            icon="\${ifDefined(args.icon)}"
            text="\${ifDefined(args.text)}"
            slot="actions">
        </ui5-notification-action>
    </ui5-li-notification-group>
</ui5-list>
\`;
}`,...(a=(e=i.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};const u=["Basic"],g=Object.freeze(Object.defineProperty({__proto__:null,Basic:i,__namedExportsOrder:u,default:c},Symbol.toStringTag,{value:"Module"}));export{g as C,m as c};
