import{y as d}from"./lit-html.9e2e9691.js";import{D as h}from"./docs.9716d2dc.js";import"./index.766d49cf.js";import"./iframe.8d816ebf.js";import"../sb-preview/runtime.mjs";import"./_commonjsHelpers.b8add541.js";import"./index.5ca63ce8.js";import"./_getTag.ec397a63.js";import"./index.bc622db0.js";import"./index.b38f6aa4.js";import"./chunk-MA2MUXQN.2cfeaebe.js";import"./chunk-R4NKYYJA.15989c7a.js";const v={default:{control:{type:"text"}},actions:{control:{type:"text"}}},y={package:"@ui5/webcomponents-fiori",since:"1.0.0-rc.8"};var o=Object.freeze,w=Object.defineProperty,m=(e,g)=>o(w(e,"raw",{value:o(g||e.slice())})),n,a;const s="ui5-li-notification-group",R={title:"Fiori/NotificationListGroupItem",component:s,subcomponents:{NotificationAction:"ui5-notification-action"},parameters:{docs:{page:h({...y,component:s})}},argTypes:v},t=()=>d(n||(n=m([`
<h3>NotificationListGroupItem</h3>
    <div class="snippet">
        <ui5-list id="myList" header-text="Notifications grouped">
            <ui5-li-notification-group show-close="" show-counter="" title-text="Orders" priority="High">
                <ui5-li-notification show-close="" title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
            </ui5-li-notification-group>
            <ui5-li-notification-group show-close="" show-counter="" title-text="Deliveries" priority="Medium" collapsed="">
                <ui5-li-notification show-close="" title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
            </ui5-li-notification-group>
            <ui5-li-notification-group show-close="" show-counter="" priority="Low" collapsed="" title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
                <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="Low" read="">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="Low" read="">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                </ui5-li-notification>
            </ui5-li-notification-group>
        </ui5-list>
        <script>
            myList.addEventListener("item-close", function(e) {
                e.detail.item.hidden = true;
            });
        <\/script>
    </div>
`])));t.parameters={docs:{story:{inline:!1}}};const i=()=>d(a||(a=m([`
<h3>NotificationListGroupItem In ShellBar</h3>
    <div class="snippet">
        <ui5-shellbar id="shellbar" primary-title="Corporate Portal" logo="../assets/images/sap-logo-svg.svg" show-notifications="" notifications-count="6">
        </ui5-shellbar>
        <ui5-popover id="notificationsPopover" style="max-width: 400px" placement-type="Bottom" horizontal-align="Right">
            <ui5-list id="notificationListTop" header-text="Notifications grouped">
                <ui5-li-notification-group show-close="" show-counter="" title-text="Orders" priority="High">
                    <ui5-li-notification show-close="" title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                        <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
                </ui5-li-notification-group>
                <ui5-li-notification-group show-close="" show-counter="" title-text="Deliveries" priority="Medium" collapsed="">
                    <ui5-li-notification show-close="" title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
                </ui5-li-notification-group>
                <ui5-li-notification-group show-close="" show-counter="" priority="High" collapsed="" title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
                    <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="High" read="">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="High" read="">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                    </ui5-li-notification>
                </ui5-li-notification-group>
            </ui5-list>
        </ui5-popover>
        <script>
            shellbar.addEventListener("notifications-click", function(event) {
                event.preventDefault();
                notificationsPopover.showAt(event.detail.targetRef);
            });
            notificationListTop.addEventListener("item-close", function (e) {
                e.detail.item.hidden = true;
            });
        <\/script>
    </div>
`])));i.parameters={docs:{story:{inline:!1}}};var c,l,r;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`() => html\`
<h3>NotificationListGroupItem</h3>
    <div class="snippet">
        <ui5-list id="myList" header-text="Notifications grouped">
            <ui5-li-notification-group show-close="" show-counter="" title-text="Orders" priority="High">
                <ui5-li-notification show-close="" title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
            </ui5-li-notification-group>
            <ui5-li-notification-group show-close="" show-counter="" title-text="Deliveries" priority="Medium" collapsed="">
                <ui5-li-notification show-close="" title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                    <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                </ui5-li-notification>
                <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
            </ui5-li-notification-group>
            <ui5-li-notification-group show-close="" show-counter="" priority="Low" collapsed="" title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
                <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="Low" read="">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                </ui5-li-notification>
                <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="Low" read="">
                    And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                    <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                    <span slot="footnotes">Office Notifications</span>
                    <span slot="footnotes">3 Days</span>
                </ui5-li-notification>
            </ui5-li-notification-group>
        </ui5-list>
        <script>
            myList.addEventListener("item-close", function(e) {
                e.detail.item.hidden = true;
            });
        <\/script>
    </div>
\``,...(r=(l=t.parameters)==null?void 0:l.docs)==null?void 0:r.source}}};var u,p,f;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => html\`
<h3>NotificationListGroupItem In ShellBar</h3>
    <div class="snippet">
        <ui5-shellbar id="shellbar" primary-title="Corporate Portal" logo="../assets/images/sap-logo-svg.svg" show-notifications="" notifications-count="6">
        </ui5-shellbar>
        <ui5-popover id="notificationsPopover" style="max-width: 400px" placement-type="Bottom" horizontal-align="Right">
            <ui5-list id="notificationListTop" header-text="Notifications grouped">
                <ui5-li-notification-group show-close="" show-counter="" title-text="Orders" priority="High">
                    <ui5-li-notification show-close="" title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                        <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
                </ui5-li-notification-group>
                <ui5-li-notification-group show-close="" show-counter="" title-text="Deliveries" priority="Medium" collapsed="">
                    <ui5-li-notification show-close="" title-text="New Delivery (#2900) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New Delivery (#29001) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="Medium">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                        <ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
                    </ui5-li-notification>
                    <ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
                    <ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>
                </ui5-li-notification-group>
                <ui5-li-notification-group show-close="" show-counter="" priority="High" collapsed="" title-text="Meetings With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
                    <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="High" read="">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                    </ui5-li-notification>
                    <ui5-li-notification show-close="" title-text="New meeting at Building (#35001)" priority="High" read="">
                        And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
                        <ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
                        <span slot="footnotes">Office Notifications</span>
                        <span slot="footnotes">3 Days</span>
                    </ui5-li-notification>
                </ui5-li-notification-group>
            </ui5-list>
        </ui5-popover>
        <script>
            shellbar.addEventListener("notifications-click", function(event) {
                event.preventDefault();
                notificationsPopover.showAt(event.detail.targetRef);
            });
            notificationListTop.addEventListener("item-close", function (e) {
                e.detail.item.hidden = true;
            });
        <\/script>
    </div>
\``,...(f=(p=i.parameters)==null?void 0:p.docs)==null?void 0:f.source}}};const W=["Template0","Template1"];export{t as Template0,i as Template1,W as __namedExportsOrder,R as default};
//# sourceMappingURL=NotificationListGroupItem.stories.bdc1bf86.js.map
