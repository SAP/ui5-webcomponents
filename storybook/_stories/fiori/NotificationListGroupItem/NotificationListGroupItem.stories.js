import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
export default {
    title: "Fiori/Notification List Group Item",
    component: "NotificationListGroupItem",
    parameters: {
        docs: {
            story: {
                // Opt-out of inline rendering
                inline: false,
            },
        },
    },
    argTypes,
};
const Template = (args) => {
    return html `<ui5-li-notification-group
	?collapsed="${ifDefined(args.collapsed)}"
	?show-counter="${ifDefined(args.showCounter)}"
	title-text="${ifDefined(args.titleText)}"
	priority="${ifDefined(args.priority)}"
	?show-close="${ifDefined(args.showClose)}"
	?read="${ifDefined(args.read)}"
	?busy="${ifDefined(args.busy)}"
	busy-delay="${ifDefined(args.busyDelay)}"
>
	${unsafeHTML(args.default)}
	${unsafeHTML(args.actions)}
</ui5-li-notification-group>`;
};
export const Basic = Template.bind({});
Basic.args = {
    showClose: true,
    showCounter: true,
    titleText: "Orders",
    priority: Priority.High,
    default: `<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
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
</ui5-li-notification>`,
    actions: `<ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>`,
};
const wrapInList = (story) => {
    return html `<ui5-list header-text="Notifications Grouped">
	${story()}
</ui5-list>

<script>
	var notificationList = document.querySelector("ui5-list");
	notificationList.addEventListener("item-close", e => {
		e.detail.item.hidden = true;
	});
</script>`;
};
Basic.decorators = [
    (story) => {
        return html `${story()}
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
</ui5-li-notification-group>`;
    },
    wrapInList,
];
export const InShellBar = Template.bind({});
InShellBar.args = {
    showClose: true,
    showCounter: true,
    titleText: "Orders",
    priority: Priority.High,
    default: `<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
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
</ui5-li-notification>`,
    actions: `<ui5-notification-action icon="accept" text="Accept All" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject All" slot="actions"></ui5-notification-action>`,
};
InShellBar.decorators = [
    (story) => {
        return html `<style>
		#popover-with-notifications::part(content) {
			padding: 0;
			max-width: 400px;
		}
	</style>
	${story()}
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
</ui5-li-notification-group>`;
    },
    (story) => {
        return html `<ui5-shellbar
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
	${wrapInList(story)}
</ui5-popover>

<script>
	var shellbar = document.querySelector("ui5-shellbar");
	var notificationsPopover = document.querySelector("ui5-popover");

	shellbar.addEventListener("notifications-click", e => {
		event.preventDefault();
		notificationsPopover.showAt(e.detail.targetRef);
	});
</script>`;
    },
];
InShellBar.parameters = {
    docs: {
        story: {
            iframeHeight: "700px",
        },
    },
};
//# sourceMappingURL=NotificationListGroupItem.stories.js.map