import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import argTypes from "./argTypes.js";
import PanelAccessibleRole from "@ui5/webcomponents/dist/types/PanelAccessibleRole.js";
let index = 0;
export default {
    title: "Main/Panel",
    component: "Panel",
    argTypes,
};
const Template = (args) => html `
<ui5-panel
	id="panel-${++index}"
	accessible-role="${ifDefined(args.accessibleRole)}"
	header-text="${ifDefined(args.headerText)}"
	?fixed="${ifDefined(args.fixed)}"
	?collapsed="${ifDefined(args.collapsed)}"
	?no-animation="${ifDefined(args.noAnimation)}"
	header-level="${ifDefined(args.headerLevel)}"
	accessible-name="${ifDefined(args.accessibleName)}"
	?sticky-header="${ifDefined(args.stickyHeader)}"
>
	${unsafeHTML(args.header)}
	${unsafeHTML(args.default)}
</ui5-panel>`;
export const Basic = Template.bind({});
Basic.decorators = [
    (story) => {
        return html `
			<style>
				.content-color {
					color: var(--sapField_TextColor);
				}
			</style>
			${story()}`;
    }
];
Basic.args = {
    headerText: "Both expandable and expanded",
    default: `
	<ui5-title level="H1"> I am a heading! </ui5-title>
	<ui5-label wrapping-type="Normal">Short text.</ui5-label>
	<br/>
	<ui5-label wrapping-type="Normal">Another text.</ui5-label>
	<p class="content-color">Aute ullamco officia fugiat culpa do tempor tempor aute excepteur magna.
		Quis velit adipisicing excepteur do eu duis elit. Sunt ea pariatur nulla est laborum proident sunt labore
		commodo Lorem laboris nisi Lorem.
	</p>`
};
export const Fixed = Template.bind({});
Fixed.args = {
    headerText: "Country Of Birth",
    accessibleRole: PanelAccessibleRole.Complementary,
    fixed: true,
    default: `
	<ui5-list mode="SingleSelectBegin">
		<ui5-li key="country1">Argentina</ui5-li>
		<ui5-li key="country2">Bulgaria</ui5-li>
		<ui5-li key="country3">China</ui5-li>
		<ui5-li key="country4">Germany</ui5-li>
	</ui5-list>`,
};
export const StickyHeader = Template.bind({});
StickyHeader.decorators = [
    (story) => {
        return html `
			<style>
				#panel-${index + 1} {
					width: 90%;
					margin: 0 auto 0 auto;
				}
				.content-color {
					color: var(--sapField_TextColor);
				}
			</style>
			<div style="height: 250px; overflow: scroll;">
				${story()}
			</div>`;
    }
];
StickyHeader.args = {
    headerText: "Sticky header",
    stickyHeader: true,
    default: `
	<ui5-title>Lorem ipsum!</ui5-title>
	<p class="content-color">
		Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
		nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
		Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
		soluta incorrupte ex his.
		Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
		democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
		elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
		Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
		no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
		dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
		persecuti cotidieque id eos, id ius omnesque vituperata.
		Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
		nostrum, vel ea sint dicant postea. Vel ne facete tritani, neglegentur concludaturque sed te. His animal dolorum ut.
		Aeterno appareat ei mei, cu sed elit scripserit, an quodsi oportere accusamus quo. Pri ea probo corpora rationibus,
		soluta incorrupte ex his.
		Mei ei brute cetero, id duo magna aeque torquatos. Quodsi erroribus mediocritatem his ut, ad pri legere iracundia
		democritum. Menandri intellegam in mea, ex vero movet qualisque sed. Maiorum verterem perfecto nec ea, est velit
		elaboraret consequuntur eu, eam ad reque postea admodum. Ne inimicus convenire pri, doctus vidisse te ius.
		Percipitur contentiones in vis, cu vim propriae phaedrum. Has ad magna errem honestatis, duo vero graeco epicurei
		no, populo semper sit ne. Vulputate dissentiunt interpretaris ea vis, nec civibus moderatius at. Cu vim stet
		dissentias, no vidit saperet indoctum nec, et pro magna prima nobis. Vis consul feugiat qualisque in, regione
		persecuti cotidieque id eos, id ius omnesque vituperata.
	</p>`,
};
export const CustomHeader = Template.bind({});
CustomHeader.decorators = [
    (story) => {
        return html `
<style>
	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
</style>
	${story()}`;
    }
];
CustomHeader.args = {
    accessibleRole: PanelAccessibleRole.Complementary,
    header: `
	<div slot="header" class="header">
		<ui5-title>Countries</ui5-title>
		<div>
			<ui5-button design="Emphasized">Add</ui5-button>
			<ui5-button design="Negative">Remove</ui5-button>
			<ui5-button>Edit</ui5-button>
		</div>
	</div>`,
    default: `
	<ui5-list mode="MultiSelect">
		<ui5-li key="country1">Argentina</ui5-li>
		<ui5-li key="country2">Bulgaria</ui5-li>
		<ui5-li key="country3">China</ui5-li>
	</ui5-list>`
};
//# sourceMappingURL=Panel.stories.js.map