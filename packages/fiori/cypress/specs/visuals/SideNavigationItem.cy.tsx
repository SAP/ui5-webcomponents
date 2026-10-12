import SideNavigation from "../../../src/SideNavigation.js";
import SideNavigationItem from "../../../src/SideNavigationItem.js";
import SideNavigationSubItem from "../../../src/SideNavigationSubItem.js";
import Tag from "@ui5/webcomponents/dist/Tag.js";
import home from "@ui5/webcomponents-icons/dist/home.js";
import calendar from "@ui5/webcomponents-icons/dist/calendar.js";
import settings from "@ui5/webcomponents-icons/dist/settings.js";

describe("SideNavigationItem visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" />
				<SideNavigationItem text="Calendar" />
				<SideNavigationItem text="Settings" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("selected", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} disabled />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with sub-items — collapsed", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar}>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with sub-items — expanded", () => {
		cy.mount(
			<SideNavigation style={{ height: "400px" }}>
				<SideNavigationItem text="Home" icon={home} />
				<SideNavigationItem text="Calendar" icon={calendar} expanded>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" selected />
					<SideNavigationSubItem text="Monthly" />
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("design — Action", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Add New" icon={calendar} design="Action" unselectable />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with tag", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar}>
					<Tag slot="tag" design="Set2" colorScheme="6" hideStateIcon>New</Tag>
				</SideNavigationItem>
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("collapsed side navigation", () => {
		cy.mount(
			<SideNavigation collapsed style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Settings" icon={settings} />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("with fixed items", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem text="Home" icon={home} selected />
				<SideNavigationItem text="Calendar" icon={calendar} />
				<SideNavigationItem text="Legal" icon={settings} slot="fixedItems" />
				<SideNavigationItem text="Help" icon={home} slot="fixedItems" />
			</SideNavigation>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SideNavigation style={{ height: "300px" }}>
					<SideNavigationItem text="Home" icon={home} selected />
					<SideNavigationItem text="Calendar" icon={calendar} />
					<SideNavigationItem text="Settings" icon={settings} />
				</SideNavigation>
			</div>
		);
		cy.screenshot();
	});

	it("focus ring is drawn on the content span and encloses the trailing toggle icon", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem id="item" text="Calendar" icon={calendar}>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// focus stays on the anchor (.ui5-sn-item), the ::after ring is suppressed on it
		cy.get("#item").shadow().find(".ui5-sn-item").focus();
		cy.get("#item").shadow().find(".ui5-sn-item").should("have.focus");

		// the content span must wrap the anchor and the toggle icon as siblings
		cy.get("#item").shadow().find(".ui5-sn-item-content > .ui5-sn-item").should("exist");
		cy.get("#item").shadow().find(".ui5-sn-item-content > .ui5-sn-item-toggle-icon").should("exist");

		// the visible focus ring must span the full row (anchor + toggle icon)
		cy.get("#item").shadow().find(".ui5-sn-item-content").then($span => {
			const span = $span[0].getBoundingClientRect();
			cy.get("#item").shadow().find(".ui5-sn-item-toggle-icon").then($icon => {
				const icon = $icon[0].getBoundingClientRect();
				expect(icon.right).to.be.at.most(span.right + 1);
				expect(icon.left).to.be.at.least(span.left - 1);
			});
		});

		cy.screenshot();
	});

	it("selected highlight covers the trailing toggle icon", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem id="item" text="Calendar" icon={calendar} selected>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
				</SideNavigationItem>
			</SideNavigation>
		);

		// the selected background is carried by the content span so the toggle icon sits on it too
		cy.get("#item").shadow().find(".ui5-sn-item-content").then($span => {
			const bg = getComputedStyle($span[0]).backgroundColor;
			expect(bg).not.to.equal("rgba(0, 0, 0, 0)");
			expect(bg).not.to.equal("transparent");
		});

		cy.screenshot();
	});

	it("external link icon is a sibling of the anchor inside the content span", () => {
		cy.mount(
			<SideNavigation style={{ height: "300px" }}>
				<SideNavigationItem id="item" text="Docs" icon={home} href="https://sap.com" target="_blank" />
			</SideNavigation>
		);

		cy.get("#item").shadow().find(".ui5-sn-item-content > a.ui5-sn-item").should("exist");
		cy.get("#item").shadow().find(".ui5-sn-item-content > .ui5-sn-item-external-link-icon").should("exist");
		cy.get("#item").shadow().find(".ui5-sn-item .ui5-sn-item-external-link-icon").should("not.exist");

		cy.screenshot();
	});

	it("collapsed — toggle icon revealed on focus is positioned within the expanded flyout", () => {
		cy.mount(
			<SideNavigation collapsed style={{ height: "300px" }}>
				<SideNavigationItem id="item" text="Calendar" icon={calendar}>
					<SideNavigationSubItem text="Daily" />
					<SideNavigationSubItem text="Weekly" />
				</SideNavigationItem>
			</SideNavigation>
		);

		cy.get("#item").shadow().find(".ui5-sn-item").focus();

		cy.get("#item").shadow().find(".ui5-sn-item-content").then($span => {
			const span = $span[0].getBoundingClientRect();
			cy.get("#item").shadow().find(".ui5-sn-item-toggle-icon").then($icon => {
				const icon = $icon[0].getBoundingClientRect();
				expect(icon.right).to.be.at.most(span.right + 1);
			});
		});

		cy.screenshot();
	});
});
