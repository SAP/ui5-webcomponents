import Label from "../../src/Label.js";
import Panel from "../../src/Panel.js";
import Title from "../../src/Title.js";
import {
	PANEL_ICON,
} from "../../src/generated/i18n/i18n-defaults.js";
import PanelAccessibleRole from "../../src/types/PanelAccessibleRole.js";
import TitleLevel from "../../src/types/TitleLevel.js";

describe("API", () => {
	it("Change of header text", () => {
		const initialHeader = "Initial Header Text";
		const newHeader = "New Header Text";
		cy.mount(<Panel headerText={initialHeader}></Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-title")
			.as("header");

		cy.get("@header")
			.should("have.text", initialHeader);

		cy.get("[ui5-panel]")
			.invoke("prop", "headerText", newHeader);

		cy.get("@header")
			.should("have.text", newHeader);
	});
});

describe("Interaction", () => {
	it("Collapsing fixed panel is not possible", () => {
		const toggleEventStub = cy.stub();
		cy.mount(<Panel fixed={true} headerText="Fixed Panel" onToggle={toggleEventStub}>
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		cy.get("@content")
			.should("be.visible");

		cy.wrap(toggleEventStub)
			.should("not.have.been.called");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Space")

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");

		cy.wrap(toggleEventStub)
			.should("not.have.been.called");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Enter")

		cy.get("@content")
			.should("be.visible");

		cy.wrap(toggleEventStub)
			.should("not.have.been.called");

		cy.get("[ui5-panel]")
			.should("not.have.attr", "collapsed");
	});

	it("Collapsing fixed panel is possible when not fixed", () => {
		cy.mount(<Panel headerText="Fixed Panel">
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("@content")
			.should("be.visible");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("not.be.visible");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Space");
		
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("be.visible");

		cy.get("@header")
			.should("be.focused");

		cy.get("@header")
			.realPress("Enter");

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("@content")
			.should("not.be.visible");
	});

	it("Sticky header when scrolling inner content", () => {
		cy.document().then((doc) => {
			const style = doc.createElement('style');
			style.id = "panel-stickyHeader-style";
			style.innerHTML = `
				#panel-stickyHeader::part(content) {
					max-height: 70px;
				}
			`;
			doc.head.appendChild(style);
		  });
		cy.mount(<Panel headerText="Fixed Panel" stickyHeader={true} id="panel-stickyHeader">
			<Label wrappingType="Normal">Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
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
			</Label>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-content")
			.as("content");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@content")
					.scrollTo("bottom");
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});

		// Clean up the style attribute
		cy.window()
			.then($el => {
				const styleTag = $el.document.head.querySelector("style[id='panel-stickyHeader-style']");

				styleTag?.remove();
			})
	});

	it("Sticky header when scrolling outer container", () => {
		cy.document().then((doc) => {
			const style = doc.createElement('style');
			style.innerHTML = `
				#panel-stickyHeader::part(content) {
					max-height: 70px;
				}
			`;
			doc.head.appendChild(style);
		  });
		cy.mount(
		<div id="my-div" style={{ height: "1000px", overflow: "scroll" }}>
			<Panel headerText="Fixed Panel" stickyHeader={true} id="panel-stickyHeader">
				<Label wrappingType="Normal">Lorem ipsum dolor sit amet, tamquam invidunt cu sed, unum regione mel ea, quo ea alia novum. Ne qui illud zril
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
				</Label>
			</Panel>
			<div id="my-div" style={{ height: "1000px" }}></div>
		</div>);

		cy.get("#my-div")
			.as("container");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.then(($headerBefore) => {
				const headerTopBefore = $headerBefore[0].getBoundingClientRect().top;
	
				cy.get("@container")
					.scrollTo(0, 50);
	
				cy.get("@header")
					.should(($headerAfter) => {
						const headerTopAfter = $headerAfter[0].getBoundingClientRect().top;
						expect(headerTopAfter).to.eq(headerTopBefore);
					});
			});
	});

	it("Tests toggle expand/collapse animation", () => {
		cy.mount(<Panel headerText="Panel">
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.as("icon");

		cy.get("@icon")
			.should("have.class", "ui5-panel-header-button-animated");

		cy.get("[ui5-panel]")
			.invoke("prop", "noAnimation", true);

		cy.get("@icon")
			.should("not.have.class", "ui5-panel-header-button-animated");
	});
});

describe("Events", () => {
	it("Toggle Event upon header click", () => {
		const toggleEventStub = cy.stub();
		cy.mount(<Panel headerText="Fixed Panel" onToggle={toggleEventStub}>
			<Title level={TitleLevel.H2}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.realClick();

		cy.wrap(toggleEventStub)
			.should("have.been.calledOnce");
	});

	it("Toggle Event upon custom header", () => {
		const toggleEventStub = cy.stub();
		cy.mount(<Panel onToggle={toggleEventStub}>
			<div slot="header">
				<Title level={TitleLevel.H2}>Custom Header</Title>
            </div>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.as("icon");

		cy.get("@icon")
			.realClick();

		cy.wrap(toggleEventStub)
			.should("have.been.calledOnce");
	});
});

describe("Accessibility", () => {
	it("Aria attributes on default header", () => {
		cy.mount(<Panel headerText="Panel" headerLevel={TitleLevel.H3}>
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "role", "form");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.should("have.attr", "accessible-name", PANEL_ICON.defaultText)
			.and("match", "ui5-icon");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.should("have.attr", "role", "button")
			.and("have.attr", "aria-expanded", "true")
			.and("have.attr", "aria-controls");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-heading-wrapper")
			.should("have.attr", "aria-level", "3")
			.and("have.attr", "role", "heading");
	});

	it("Aria attributes on fixed header", () => {
			cy.mount(<Panel headerText="Panel" fixed={true}>
				<Title level={TitleLevel.H4}>Content</Title>
			</Panel>);
	
			cy.get("[ui5-panel]")
				.shadow()
				.find(".ui5-panel-header")
				.as("header");

			cy.get("@header")
				.should("not.have.attr", "role");

			cy.get("@header")
				.should("not.have.attr", "aria-expanded");
			
			cy.get("@header")
				.should("not.have.attr", "aria-controls");
	});

	it("Aria attributes on custom header", () => {
		const accessibleNamePanel = "Accessible Name";
		cy.mount(<Panel accessibleRole={PanelAccessibleRole.Region}>
			<div slot="header">
				<Title level={TitleLevel.H2}>Custom Header</Title>
            </div>
			<Title level={TitleLevel.H3}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "role", "region");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.as("header");

		cy.get("@header")
			.should("not.have.attr", "role");

		cy.get("@header")
			.should("not.have.attr", "aria-expanded");
		
		cy.get("@header")
			.should("not.have.attr", "aria-controls");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header-button")
			.shadow()
			.find(".ui5-button-root")
			.as("innerButton");

		cy.get("@innerButton")
			.should("have.attr", "title", PANEL_ICON.defaultText)
			.and("have.attr", "aria-expanded");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-heading-wrapper")
			.as("heading");

		cy.get("@heading")
			.should("not.have.attr", "aria-level");
		
		cy.get("@heading")
			.should("not.have.attr", "role", "heading");

		cy.get("[ui5-panel]")
			.invoke("prop", "accessibleName", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);
		
		cy.get("@innerButton")
			.should("not.have.attr", "aria-label", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.invoke("prop", "useAccessibleNameForToggleButton", true);

		cy.get("@innerButton")
			.should("have.attr", "aria-label", accessibleNamePanel);
	});

	it("Accessible Name", () => {
		const accessibleNamePanel = "Accessible Name";
		cy.mount(<Panel headerText="Panel" id="panelId">
			<Title level={TitleLevel.H4}>Content</Title>
		</Panel>);

		cy.get("[ui5-panel]")
			.then($panel => {
				const el = $panel[0];
				cy.get("[ui5-panel]")
					.shadow()
					.find(".ui5-panel-header")
					.should("have.attr", "aria-labelledby", `${el._id}-header-title`);
			});

		cy.get("[ui5-panel]")
			.invoke("prop", "accessibleName", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);

		cy.get("[ui5-panel]")
			.invoke("prop", "fixed", true);

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-header")
			.should("not.have.attr", "aria-labelledby");

		cy.get("[ui5-panel]")
			.shadow()
			.find(".ui5-panel-root")
			.should("have.attr", "aria-label", accessibleNamePanel);
	});
});
