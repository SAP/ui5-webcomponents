import Toast from "../../src/Toast.js";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";

describe("Toast - test popover API", () => {
	it("Should verify the toast has the popover attribute set to manual", () => {
		cy.mount(
			<Toast id="toast" open={true} placement="TopStart">TopStart</Toast>
		);
		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");
	});

	it("Toast should stay on top of list after scroll", () => {
		cy.mount(
			<>
				<Toast id="toast" open duration={999999} placement="TopStart">TopStart</Toast>
				<List id="list" headerText="List with ListItemStandard" style={{ opacity: "0.7" }}>
					<ListItemStandard additionalText="3">List Item 1</ListItemStandard>
					<ListItemStandard additionalText="2">List Item 2</ListItemStandard>
					<ListItemStandard additionalText="1">List Item 3</ListItemStandard>
				</List>
			</>
		);

		cy.get<Toast>("[ui5-toast]")
			.should("have.attr", "popover", "manual")
			.should("be.visible");

		cy.get("#toast")
			.then($toast => {
				const toastRect = $toast[0].getBoundingClientRect();
				cy.get("#list")
					.should($list => {
						const listRect = $list[0].getBoundingClientRect();
						const isOverlapping = toastRect.right > listRect.left
							&& toastRect.left < listRect.right
							&& toastRect.bottom > listRect.top
							&& toastRect.top < listRect.bottom;
						expect(isOverlapping).to.be.true;
					});
			});
	});

	it("Should open toast from popover and only toast should fire close event", () => {
		cy.mount(
			<>
				<Button id="openResponsivePopoverBtn">Open Popover</Button>
				<ResponsivePopover
					id="responsivePopover"
					opener="openResponsivePopoverBtn">
					<Button id="openToastBtn">Open Toast</Button>
				</ResponsivePopover>
				<Toast open id="toast" duration={-1} placement="BottomCenter">Toast Text</Toast>
			</>
		);

		cy.get("[ui5-responsive-popover]").then(popover => {
			popover[0].addEventListener("close", cy.stub().as("popoverClose"));
		});

		cy.get("#openResponsivePopoverBtn").then($button => {
			$button[0].addEventListener("click", () => {
				cy.get("[ui5-responsive-popover]").then($popover => {
					const popover = $popover[0] as ResponsivePopover;
					popover.setAttribute("open", "true");
				});
			});
		});

		cy.get("#openToastBtn").then($button => {
			$button[0].addEventListener("click", () => {
				cy.get("[ui5-toast]").then($toast => {
					const toast = $toast[0] as Toast;
					toast.setAttribute("open", "true");
				});
			});
		});

		cy.get("[ui5-toast]").should("exist").then(($toast) => {
			$toast[0].addEventListener("close", cy.stub().as("toastClose"));
		});

		cy.get("#openResponsivePopoverBtn")
			.realClick();

		cy.get("#openToastBtn")
			.realClick();

		cy.get("@toastClose")
			.should("be.calledOnce");

		cy.get("@popoverClose")
			.should("not.have.been.called");
	});
});
