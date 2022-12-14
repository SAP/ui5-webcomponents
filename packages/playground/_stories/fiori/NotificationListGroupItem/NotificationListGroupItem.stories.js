import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/NotificationListGroupItem",
    component: "ui5-li-notification-group",
    subcomponents: {'NotificationAction' : 'ui5-notification-action'},
    argTypes,
};


export const Template0 = () => html`
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
		</script>
	</div>
`;

export const Template1 = () => html`
<h3>NotificationListGroupItem In ShellBar</h3>
	<div class="snippet">
		<ui5-shellbar id="shellbar" primary-title="Corporate Portal" logo="../../../assets/images/sap-logo-svg.svg" show-notifications="" notifications-count="6">
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
		</script>
	</div>
`;