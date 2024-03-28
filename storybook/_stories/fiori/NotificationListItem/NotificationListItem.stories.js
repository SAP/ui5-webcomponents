import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import Priority from "@ui5/webcomponents/dist/types/Priority.js";
export default {
    title: "Fiori/Notification List Item",
    component: "NotificationListItem",
    parameters: {
        docs: {
            story: {
                iframeHeight: "470px",
                inline: false,
            },
        },
    },
    argTypes,
};
const wrapInList = (story) => {
    return html `<ui5-list header-text="Notifications">
	${story()}
</ui5-list>

<script>
	var notificationList = document.querySelector("ui5-list");
	notificationList.addEventListener("item-close", e => {
		e.detail.item.hidden = true;
	});
</script>`;
};
const Template = (args) => {
    return html `<ui5-li-notification
	title-text="${ifDefined(args.titleText)}"
	priority="${ifDefined(args.priority)}"
	?show-close="${ifDefined(args.showClose)}"
	?read="${ifDefined(args.read)}"
	?busy="${ifDefined(args.busy)}"
	busy-delay="${ifDefined(args.busyDelay)}"
	wrappingType="${ifDefined(args.wrappingType)}"
>
	${unsafeHTML(args.actions)}
	${unsafeHTML(args.avatar)}
	${unsafeHTML(args.footnotes)}
	${unsafeHTML(args.default)}
</ui5-li-notification>`;
};
Template.decorators = [wrapInList];
export const Basic = Template.bind({});
Basic.args = {
    titleText: "New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    default: "And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    showClose: true,
    priority: Priority.High,
    avatar: `<ui5-avatar size="XS" slot="avatar">
	<img src="../assets/images/avatars/woman_avatar_1.png">
</ui5-avatar>`,
    footnotes: `<span slot="footnotes">Monique Legrand</span>
<span slot="footnotes">2 Days</span>`,
};
Basic.decorators = [
    (story) => {
        return html `${story()}

<ui5-li-notification show-close title-text="New order (#2526) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc." priority="High">
	<ui5-avatar size="XS" slot="avatar">
		<img src="../assets/images/avatars/man_avatar_1.png">
	</ui5-avatar>
	<span slot="footnotes">Alain Chevalier</span>
	<span slot="footnotes">2 Days</span>
	And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification show-close title-text="New order (#2525) With a short title" priority="High" read>
	<ui5-avatar size="XS" slot="avatar">
		<img src="../assets/images/avatars/man_avatar_2.png">
	</ui5-avatar>
	<span slot="footnotes">John Doe</span>
	<span slot="footnotes">2 Days</span>
	And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`;
    },
    wrapInList,
];
export const Actions = Template.bind({});
Actions.args = {
    titleText: "New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    default: "And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    showClose: true,
    priority: Priority.Low,
    actions: `<ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>`,
    avatar: `<ui5-avatar size="XS" slot="avatar">
	<img src="../assets/images/avatars/woman_avatar_1.png">
</ui5-avatar>`,
    footnotes: `<span slot="footnotes">Monique Legrand</span>
<span slot="footnotes">2 Days</span>`,
};
Actions.decorators = [
    (story) => {
        return html `${story()}

<ui5-li-notification priority="Low" show-close title-text="And with a very long description and only one action - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.">
	<ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
	<ui5-avatar size="XS" icon="employee" slot="avatar">
		<img src="../assets/images/avatars/woman_avatar_1.png">
	</ui5-avatar>
	<span slot="footnotes-1">Monique Legrand</span>
	<span slot="footnotes-2">2 Days</span>
	And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification read show-close priority="Low" title-text="New order (#2525) With a short title">
	<ui5-notification-action icon="accept" text="Accept All Requested Information" slot="actions"></ui5-notification-action>
	<ui5-notification-action icon="decline" text="Reject All Requested Information" slot="actions"></ui5-notification-action>
	<ui5-avatar size="XS" icon="employee" slot="avatar">
		<img src="../assets/images/avatars/woman_avatar_1.png">
	</ui5-avatar>
	<span slot="footnotes-1">Monique Legrand</span>
	<span slot="footnotes-2">2 Days</span>
	And with a very long description and long labels of the actions - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`;
    },
    wrapInList,
];
export const InShellBar = Template.bind({});
InShellBar.args = {
    showClose: true,
    titleText: "New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    default: "And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    avatar: `<ui5-avatar initials="JD" size="XS" slot="avatar"></ui5-avatar>`,
    footnotes: `<span slot="footnotes">John Doe</span>
<span slot="footnotes">2 Days</span>`,
    actions: `<ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
<ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>`,
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
<ui5-li-notification
	show-close
	title-text="New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
	priority="High"
>
	<ui5-avatar icon="employee" size="XS" slot="avatar"></ui5-avatar>
	<span slot="footnotes">Office Notifications</span>
	<span slot="footnotes">3 Days</span>
	<ui5-notification-action icon="accept" text="Accept" slot="actions"></ui5-notification-action>
	And with a very long description and long labels of the action buttons - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>

<ui5-li-notification
	title-text="New order (#2565) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc."
	priority="Medium"
>
	<ui5-avatar initials="JS" size="XS" slot="avatar"></ui5-avatar>
	<span slot="footnotes">Patricia Clark</span>
	<span slot="footnotes">3 Days</span>
	<ui5-notification-action icon="accept" text="Accept All Requested Information" slot="actions"></ui5-notification-action>
	<ui5-notification-action icon="decline" text="Reject All Requested Information" slot="actions"></ui5-notification-action>
	Short description
</ui5-li-notification>

<ui5-li-notification title-text="New order (#2523)">
	<span slot="footnotes">John Smith</span>
	<span slot="footnotes">3 Days</span>
	<ui5-notification-action icon="message-error" text="Reject" slot="actions"></ui5-notification-action>
	With a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.
</ui5-li-notification>`;
    },
    (story) => {
        return html `<ui5-shellbar
	primary-title="Corporate Portal"
	logo="../assets/images/sap-logo-svg.svg"
	show-notifications
	notifications-count="4"
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
//# sourceMappingURL=NotificationListItem.stories.js.map