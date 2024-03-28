import { html } from "lit";
import argTypes from "./argTypes.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
export default {
    title: "Main/Card",
    component: "Card",
    parameters: {
        docs: {
            story: {
                iframeHeight: "370px",
                inline: false,
            },
        },
    },
    argTypes,
};
const Template = (args) => {
    return html `
<ui5-card
	accessible-name="${ifDefined(args.accessibleName)}"
	accessible-name-ref="${ifDefined(args.accessibleNameRef)}"
>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
</ui5-card>
	`;
};
const header = (titleText, subtitleText, status, actions, avatar, interactive) => {
    return `<ui5-card-header
	slot="header"
	title-text="${titleText}"
	subtitle-text="${subtitleText}"
	${status ? `status="${status}"` : ""}
	${interactive ? "interactive" : ""}
>
	${avatar ? avatar : ""}
	${actions ? actions.map(a => `<ui5-button design="Transparent" slot="action">${a}</ui5-button>`) : ""}
</ui5-card-header>`;
};
const setWidth = (width) => {
    const style = html `
		<style>
			ui5-card {
				width: ${width};
			}
		</style>`;
    return (story) => html `
		${style}
		${story()}`;
};
export const InteractiveHeader = Template.bind({});
InteractiveHeader.args = {
    header: header("This header is interactive", "Click, press Enter or Space", "3 of 6", [], `<ui5-icon name="group" slot="avatar"></ui5-icon>`, true),
    default: `<ui5-list separators="None" style="margin-block-end: 0.75rem;">
	<ui5-li image="../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
	<ui5-li image="../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
	<ui5-li image="../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
</ui5-list>`
};
InteractiveHeader.decorators = [setWidth("22rem")];
export const WithList = Template.bind({});
WithList.args = {
    header: header("Team Space", "Direct Reports", "3 of 10", ["View All"], `<ui5-icon name="group" slot="avatar"></ui5-icon>`),
    default: `<ui5-list separators="None" style="margin-block-end: 0.75rem;">
	<ui5-li image="../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
	<ui5-li image="../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
	<ui5-li image="../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella Adams</ui5-li>
</ui5-list>`,
};
WithList.decorators = [setWidth("22rem")];
export const WithTable = Template.bind({});
WithTable.args = {
    header: header("New Purchase Orders", "Today", "3 of 15"),
    default: `<style>
	.status-error { color: #b00; }
	.status-warning { color: #e9730c; }
	.status-success { color: #107e3e; }
</style>

<ui5-table style="margin-block-end: 0.75rem;">
	<ui5-table-column slot="columns">
		<ui5-label>Sales Order</ui5-label>
	</ui5-table-column>
	<ui5-table-column slot="columns">
		<ui5-label>Customer</ui5-label>
	</ui5-table-column>
	<ui5-table-column slot="columns">
		<ui5-label>Net Amount</ui5-label>
	</ui5-table-column>
	<ui5-table-column slot="columns" min-width="450" popin-text="Status" demand-popin>
		<ui5-label>Status</ui5-label>
	</ui5-table-column>

	<ui5-table-row>
		<ui5-table-cell>
			<ui5-label>5000010050</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>Entertainment Argentina</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>6k USD</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<span class="status-success">Approved</span>
		</ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell>
			<ui5-label>5000010051</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>Brazil Technologies</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>2k USD</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<span class="status-error">Rejected</span>
		</ui5-table-cell>
	</ui5-table-row>
	<ui5-table-row>
		<ui5-table-cell>
			<ui5-label>5000010052</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>Robert Brown Ent.</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<ui5-label>17k USD</ui5-label>
		</ui5-table-cell>
		<ui5-table-cell>
			<span class="status-warning">Pending</span>
		</ui5-table-cell>
	</ui5-table-row>
</ui5-table>`
};
WithTable.decorators = [setWidth("40rem")];
WithTable.parameters = {
    docs: {
        story: {
            iframeHeight: "250px",
            inline: false,
        },
    },
};
export const WithTimeline = Template.bind({});
WithTimeline.args = {
    header: header("Upcoming Activities", "Today"),
    default: `<ui5-timeline>
	<ui5-timeline-item title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable></ui5-timeline-item>
	<ui5-timeline-item title-text="Weekly Sync - BTP Design" timestamp="1517349600000" icon="calendar">
		MR SOF02 2.43
	</ui5-timeline-item>
	<ui5-timeline-item title-text="Video Conference Call - UI5" timestamp="1485813600000" icon="calendar">
		Online meeting
	</ui5-timeline-item>
</ui5-timeline>`
};
WithTimeline.decorators = [setWidth("22rem")];
export const More = Template.bind({});
const MoreCards = [{
        header: header("David Williams", "Sales Manager"),
        default: `<ui5-list separators="Inner" style="margin-block-end: 0.75rem;">
	<ui5-li icon="competitor" icon-end>Personal Development</ui5-li>
	<ui5-li icon="wallet" icon-end>Finance</ui5-li>
	<ui5-li icon="collaborate" icon-end>Communications Skills</ui5-li>
</ui5-list>`
    }, {
        header: header("Project Cloud Transformation", "Revenue per Product | EUR", "3 of 3"),
        default: `<ui5-list separators="None" style="margin-block-end: 0.75rem;">
	<ui5-li description="ID234522566-D44" additional-text="27.25K EUR" additional-text-state="Success">Avantel</ui5-li>
	<ui5-li description="ID7125852785-A51" additional-text="22.89K EUR" additional-text-state="Warning">Telecomunicaciones Star</ui5-li>
	<ui5-li description="ID123555587-I05" additional-text="7.85K EUR" additional-text-state="Error">Talpa</ui5-li>
</ui5-list>`
    }, {
        header: header("Donna Maria Moore", "Senior Sales Executive", undefined, undefined, `<img src="../assets/images/avatars/man_avatar_1.png" slot="avatar">`),
        default: `<style>
	.content,
	.content-group {
		display: flex;
		flex-direction: column;
		padding-block-end: 1rem;
	}
	.content-padding {
		padding: 0.5rem 1rem 0 1rem;
		box-sizing: border-box;
	}
</style>
<div class="content content-padding">
	<ui5-title level="H5" style="padding-block-end: 1rem;">Contact details</ui5-title>
	<div class="content-group">
		<ui5-label show-colon>Company Name</ui5-label>
		<span>Company A</span>
	</div>
	<div class="content-group">
		<ui5-label show-colon>Address</ui5-label>
		<span>481 West Street, Anytown 45066, USA</span>
	</div>
	<div class="content-group">
		<ui5-label show-colon>Website</ui5-label>
		<ui5-link target="_blank">www.company_a.example.com</ui5-link>
	</div>
</div>`
    }];
More.decorators = [
    (story) => {
        return html `
			<style>
				.grid-container {
					display: grid;
					grid-template-columns: repeat(auto-fill, 22rem);
					grid-auto-rows: 1fr;
					gap: 1rem;
				}
			</style>
			<div class="grid-container">
				${MoreCards.map(c => story({ args: { ...c } }))}
			</div>`;
    },
];
More.parameters = {
    docs: {
        story: {
            iframeHeight: "680px",
            inline: false,
        },
    },
};
//# sourceMappingURL=Card.stories.js.map