import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
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
	title-text="${ifDefined(args.titleText)}"
	?read="${ifDefined(args.read)}"
	?loading="${ifDefined(args.loading)}"
	loading-delay="${ifDefined(args.loadingDelay)}"
>
	${unsafeHTML(args.default)}
</ui5-li-notification-group>`;
};
export const Basic = Template.bind({});
Basic.args = {
    titleText: "Orders",
    default: `<ui5-li-notification importance="Important" show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."  state="Negative">
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
</ui5-li-notification>`,
};
const wrapInList = (story) => {
    return html `<ui5-list accessible-name="Notifications">
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
</ui5-li-notification-group>`;
    },
    wrapInList,
];
export const InShellBar = Template.bind({});
InShellBar.args = {
    titleText: "Orders",
    default: `<ui5-li-notification show-close title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." state="Negative">
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
</ui5-li-notification>`,
};
InShellBar.decorators = [
    (story) => {
        return html `<style>
		#popover-with-notifications::part(content) {
			padding: 0;
			max-height: 40rem;
			max-width: 27rem;
		}
	</style>
	${story()}
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
	placement="Bottom"
	horizontal-align="End"
	id="popover-with-notifications"
>
	${wrapInList(story)}
</ui5-popover>

<script>
	var shellbar = document.querySelector("ui5-shellbar");
	var notificationsPopover = document.querySelector("ui5-popover");

	shellbar.addEventListener("notifications-click", e => {
		event.preventDefault();
		notificationsPopover.opener = e.detail.targetRef;
		notificationsPopover.open = true;
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