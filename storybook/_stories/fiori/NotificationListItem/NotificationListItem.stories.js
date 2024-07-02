import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
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
	state="${ifDefined(args.state)}"
	?show-close="${ifDefined(args.showClose)}"
	?read="${ifDefined(args.read)}"
	?loading="${ifDefined(args.loading)}"
	loading-delay="${ifDefined(args.loadingDelay)}"
	wrappingType="${ifDefined(args.wrappingType)}"
>
	${unsafeHTML(args.menu)}
	${unsafeHTML(args.avatar)}
	${unsafeHTML(args.footnotes)}
	${unsafeHTML(args.default)}
</ui5-li-notification>`;
};
Template.decorators = [wrapInList];
export const Basic = Template.bind({});
Basic.args = {
    titleText: "New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    default: "And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    showClose: true,
    state: ValueState.Negative,
    avatar: `<ui5-avatar size="XS" slot="avatar">
	<img src="../assets/images/avatars/woman_avatar_1.png">
</ui5-avatar>`,
    footnotes: `<span slot="footnotes">Monique Legrand</span>
<span slot="footnotes">2 Days</span>`,
};
Basic.decorators = [
    (story) => {
        return html `${story()}

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
</ui5-li-notification>`;
    },
    wrapInList,
];
export const InShellBar = Template.bind({});
InShellBar.args = {
    showClose: true,
    titleText: "New order (#2525) With a very long title - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    default: "And with a very long description - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent feugiat, turpis vel scelerisque pharetra, tellus odio vehicula dolor, nec elementum lectus turpis at nunc.",
    avatar: `<ui5-avatar initials="JD" size="XS" slot="avatar"></ui5-avatar>`,
    footnotes: `<span slot="footnotes">John Doe</span>
<span slot="footnotes">2 Days</span>`,
    menu: `<ui5-menu slot="menu"><ui5-menu-item icon="accept" text="Accept"></ui5-menu-item><ui5-menu-item icon="message-error" text="Reject"></ui5-menu-item></ui5-menu>`,
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
//# sourceMappingURL=NotificationListItem.stories.js.map