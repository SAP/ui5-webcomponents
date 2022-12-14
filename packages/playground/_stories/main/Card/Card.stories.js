import { action } from "@storybook/addon-actions";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import argTypes from "./argTypes.js";

export default {
    title: "Components/Card",
    component: "ui5-card",
    subcomponents: {'CardHeader' : 'ui5-card-header'},
    argTypes,
};


export const Template0 = () => html`
<h3>Card with List</h3>
	<div class="snippet card-container">
		<ui5-card class="medium">
			<ui5-card-header slot="header" title-text="Team Space" subtitle-text="Direct Reports" status="3 of 10">
				<ui5-icon name="group" slot="avatar"></ui5-icon>
				<ui5-button design="Transparent" slot="action">View All</ui5-button>
			</ui5-card-header>
			<div class="card-content">
				<ui5-list separators="None" class="card-content-child" style="width: 100%; margin-bottom: 0.75rem;">
					<ui5-li image="../../../assets/images/avatars/man_avatar_1.png" description="User Researcher">Alain Chevalier</ui5-li>
					<ui5-li image="../../../assets/images/avatars/woman_avatar_1.png" description="Artist">Monique Legrand</ui5-li>
					<ui5-li image="../../../assets/images/avatars/woman_avatar_2.png" description="UX Specialist">Isabella Adams</ui5-li>
				</ui5-list>
			</div>
		</ui5-card>
		<ui5-card class="medium">
			<ui5-card-header slot="header" title-text="This header is interactive" interactive="" subtitle-text="Click, press Enter or Space" status="3 of 6">
				<ui5-icon name="group" slot="avatar"></ui5-icon>
			</ui5-card-header>
			<div class="card-content">
				<ui5-list separators="None" class="card-content-child" style="width: 100%; margin-bottom: 0.75rem;">
					<ui5-li image="../../../assets/images/avatars/man_avatar_2.png" description="Software Architect">Richard Wilson</ui5-li>
					<ui5-li image="../../../assets/images/avatars/woman_avatar_3.png" description="Visual Designer">Elena Petrova</ui5-li>
					<ui5-li image="../../../assets/images/avatars/man_avatar_3.png" description="Quality Specialist">John Miller</ui5-li>
				</ui5-list>
			</div>
		</ui5-card>
	</div>
`;

export const Template1 = () => html`
<h3>Card with Table</h3>
	<div class="snippet snippet-no-padding card-container">
		<ui5-card>
			<ui5-card-header slot="header" title-text="New Purchase Orders" subtitle-text="Today" status="3 of 15">
			</ui5-card-header>
			<ui5-table class="demo-table">
				<!-- Columns -->
				<ui5-table-column slot="columns">
					<ui5-label>Sales Order</ui5-label>
				</ui5-table-column>
				<ui5-table-column slot="columns">
					<ui5-label>Customer</ui5-label>
				</ui5-table-column>
				<ui5-table-column slot="columns">
					<ui5-label>Net Amount</ui5-label>
				</ui5-table-column>
				<ui5-table-column slot="columns" min-width="450" popin-text="Status" demand-popin="">
					<ui5-label>Status</ui5-label>
				</ui5-table-column>
				<ui5-table-row>
					<ui5-table-cell>
						<ui5-label>5000010050</ui5-label>
					</ui5-table-cell>
					<ui5-table-cell>
						<ui5-label>Entertainment Argentinia</ui5-label>
					</ui5-table-cell>
					<ui5-table-cell>
							<ui5-label>6k USD</ui5-label>
					</ui5-table-cell>
					<ui5-table-cell>
						<span class="status-success">Aproved</span>
					</ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row>
					<ui5-table-cell>
						<ui5-label>5000010051</ui5-label>
					</ui5-table-cell>
					<ui5-table-cell>
						<ui5-label>Brazil Techologies</ui5-label>
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
			</ui5-table>
		</ui5-card>
	</div>
`;

export const Template2 = () => html`
<h3>Card with Timeline</h3>
	<div class="snippet card-container">
		<ui5-card class="medium">
			<ui5-card-header slot="header" title-text="Upcoming Activities" subtitle-text="For Today">
			</ui5-card-header>
			<ui5-timeline>
				<ui5-timeline-item id="test-item" title-text="called" timestamp="1487583000000" icon="phone" name="John Smith" name-clickable=""></ui5-timeline-item>
				<ui5-timeline-item title-text="Weekly Sync - CP Design" timestamp="1517349600000" icon="calendar">
					MR SOF02 2.43
				</ui5-timeline-item>
				<ui5-timeline-item title-text="Video Converence Call - UI5" timestamp="1485813600000" icon="calendar">
					Online meeting
				</ui5-timeline-item>
			</ui5-timeline>
		</ui5-card>
	</div>
`;

export const Template3 = () => html`
<h3>More Cards</h3>
	<div class="snippet card-container">
		<ui5-card class="small">
			<ui5-card-header slot="header" title-text="David Williams" subtitle-text="Sales Manager">
				<img src="../../../assets/images/avatars/man_avatar_1.png" slot="avatar">
			</ui5-card-header>
			<ui5-list separators="Inner">
				<ui5-li icon="competitor" icon-end="">Personal Development</ui5-li>
				<ui5-li icon="wallet" icon-end="">Finance</ui5-li>
				<ui5-li icon="collaborate" icon-end="">Communications Skills</ui5-li>
			</ui5-list>
		</ui5-card>
		<ui5-card class="small">
			<ui5-card-header slot="header" title-text="Project Cloud Transformation" subtitle-text="Revenue per Product | EUR" status="3 of 3"></ui5-card-header>
			<ui5-list separators="None">
				<ui5-li description="ID234522566-D44" additional-text="27.25K EUR" additional-text-state="Success">Avantel</ui5-li>
				<ui5-li description="ID7125852785-A51" additional-text="22.89K EUR" additional-text-state="Warning">Telecomunicaciones Star</ui5-li>
				<ui5-li description="ID123555587-I05" additional-text="7.85K EUR" additional-text-state="Error">Talpa</ui5-li>
			</ui5-list>
		</ui5-card>
		<ui5-card class="small">
			<ui5-card-header slot="header" title-text="Dona Maria Moore" subtitle-text="Senior Sales Executive">
				<img src="../../../assets/images/avatars/man_avatar_1.png" slot="avatar">
			</ui5-card-header>
			<div class="content content-padding">
				<ui5-title level="H5" style="padding-bottom: 1rem;">Contact details</ui5-title>
				<div class="content-group">
					<ui5-label>Company Name</ui5-label>
					<ui5-title level="H6">Company A</ui5-title>
				</div>
				<div class="content-group">
					<ui5-label>Address</ui5-label>
					<ui5-title level="H6">481 West Street, Anytown 45066, USA</ui5-title>
				</div>
				<div class="content-group">
					<ui5-label>Website</ui5-label>
					<ui5-link target="_blank">www.company_a.example.com</ui5-link>
				</div>
			</div>
		</ui5-card>
	</div>
`;