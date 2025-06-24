import Toast from "../../src/Toast.js";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import Button from "../../src/Button.js";

describe("Toast general interaction", () => {
	beforeEach(() => {
		cy.mount(
			<>
				<Button id="wcBtnShowToastME">Show MiddleEnd Toast</Button>
				<Toast id="wcToastME" placement="MiddleEnd">MiddleEnd</Toast>
			</>
		);

		cy.get("[ui5-button]")
			.then(($button) => {
				$button[0].addEventListener("click", () => {
					cy.get("[ui5-toast]")
						.then($toast => {
							($toast[0] as Toast).open = true;
						});
				});
			});

	});
	it("tests open attribute before show", () => {
		cy.get("[ui5-toast]")
			.should("not.have.attr", "open");
	});

	it("tests open attribute after show", () => {

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("be.visible");
	});

	it("tests open property", () => {
		cy.get("[ui5-toast]")
			.should("not.be.visible");

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("have.attr", "open");

		cy.get("[ui5-toast]")
			.should("be.visible");
	});

	it("tests duration property", () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("be.visible");

		cy.get("[ui5-toast]")
			.should("have.attr", "duration", 3000);
	});

	it("tests placement property", () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("be.visible")
			.and("have.attr", "placement", "MiddleEnd");
	});

	it("tests shadow content div role", () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.shadow()
			.find(".ui5-toast-root")
			.should("have.attr", "role", "alert");
	});

	it("tests shadow content div inline styles with default duration", () => {
		const EXPECTED_STYLES = "transition-duration: 1000ms; transition-delay: 2000ms; opacity: 0;";
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("have.attr", "style", EXPECTED_STYLES);
	});

	it("tests shadow content div inline styles with long duration", () => {
		const maximumAllowedTransition = 1000;
		let durationProperty;
		let calculatedDelay;

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast")
			.then($toast => {
				$toast[0].setAttribute("duration", "10000");
				durationProperty = ($toast[0] as Toast).duration;
				calculatedDelay = `${durationProperty - maximumAllowedTransition}ms`;

				const EXPECTED_STYLES = `transition-duration: ${maximumAllowedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

				cy.get("[ui5-toast]")
					.should("have.attr", "style", EXPECTED_STYLES);
			});
	});

	it("tests shadow content div inline styles with short duration", () => {
		let calculatedTransition, calculatedDelay, durationProperty;

		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.then($toast => {
				$toast[0].setAttribute("duration", "1500");
				durationProperty = ($toast[0] as Toast).duration;
				calculatedTransition = durationProperty / 3;
				calculatedDelay = `${durationProperty - calculatedTransition}ms`;
				const EXPECTED_STYLES = `transition-duration: ${calculatedTransition}ms; transition-delay: ${calculatedDelay}; opacity: 0;`;

				cy.get("[ui5-toast]")
					.should("have.attr", "style", EXPECTED_STYLES);
			});
	});

	it("tests closing of toast", () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.and("be.visible");

		cy.get("[ui5-toast]")
			.should("have.attr", "open");

		//waiting the duration of the toast
		cy.wait(3000);

		cy.get("[ui5-toast]")
			.should("not.be.visible");

		cy.get("[ui5-toast]")
			.should("not.have.attr", "open");
	});

	it("tests minimum allowed duration", () => {
		cy.get("[ui5-toast]")
			.then($toast => {
				$toast[0].setAttribute("duration", "-1");
				let effectiveDuration = ($toast[0] as Toast).effectiveDuration;

				//Duration property is forced to be 500, when -1 is passed for duration attribute
				expect(effectiveDuration).to.equal(500);
			});
	});
});

describe("Keyboard handling", () => {
	beforeEach(() => {
		cy.mount(
			<>
				<Button id="wcBtnShowToastME">Show MiddleEnd Toast</Button>
				<Toast id="wcToastME" placement="MiddleEnd">MiddleEnd</Toast>
			</>
		);

		cy.get("[ui5-button]")
			.then(($button) => {
				$button[0].addEventListener("click", () => {
					cy.get("[ui5-toast]")
						.then($toast => {
							($toast[0] as Toast).open = true;
						});
				});
			});
	});

	it("focus should be correct toggling keyboard combination ctrl/command + shift + m and return the focus to the opener", () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.realPress(["Control", "Shift", "m"]);

		cy.get("[ui5-toast]")
			.should("be.focused");

		cy.realPress(["Control", "Shift", "m"]);

		cy.get("[ui5-button]")
			.should("be.focused");
	});

	it("toast should be closed on pressing esc key", async () => {
		cy.get("[ui5-button]")
			.realClick();

		cy.get("[ui5-toast]")
			.should("be.visible");

		cy.get("[ui5-toast]")
			.should("have.attr", "open");

		cy.realPress(["Control", "Shift", "m"]);

		cy.get("[ui5-toast]")
			.should("be.focused");

		cy.get("[ui5-toast]")
			.realPress("Escape");

		//should wait for the duration of the toast
		cy.wait(3000);

		cy.get("[ui5-toast]")
			.should("not.have.attr", "open");
	});

	it("Opens two toasts in a row and focuses the last open", async () => {
		cy.mount(
			<>
				<Button id="wcBtnShowToastTS">Show Toast TS</Button>
				<Toast id="wcToastTS" placement="TopStart">TopStart</Toast>

				<Button id="wcBtnShowToastTC">Show Toast TC</Button>
				<Toast id="wcToastTC" placement="TopCenter">TopCenter</Toast>
			</>
		);

		cy.get("#wcBtnShowToastTS").then(($button) => {
			$button[0].addEventListener("click", () => {
				cy.get("#wcToastTS").then(($toast) => {
					($toast[0] as any).open = true;
				});
			});
		});

		cy.get("#wcBtnShowToastTC").then(($button) => {
			$button[0].addEventListener("click", () => {
				cy.get("#wcToastTC").then(($toast) => {
					($toast[0] as any).open = true;
				});
			});
		});

		cy.get("#wcBtnShowToastTS")
			.realClick();

		cy.get("#wcBtnShowToastTC")
			.realClick();

		cy.realPress(["Control", "Shift", "m"]);

		//should wait for the duration of the toast
		cy.wait(3000);

		cy.get("#wcToastTC")
			.should("be.visible");

		cy.get("#wcToastTC")
			.should("have.attr", "open");

		cy.get("#wcToastTS")
			.should("not.be.visible");

		cy.get("#wcToastTS")
			.should("not.have.attr", "open");
	});
});

describe("Customization", () => {
	it("should check sizes to the toast", () => {
		cy.mount(
			<>
				<Button id="wcBtnShowToastStyled">Show Styled Toast</Button>
				<Toast id="wcToastStyled" duration={100000} style={{ width: "300px", height: "64px", maxWidth: "300px" }} placement="BottomCenter">
					<div tabindex={-1}>
						<span>Styled Toast</span>
						<div class="actions">
							<Button design="Transparent">UNDO</Button>
							<Button design="Transparent">DISMISS</Button>
						</div>
					</div>
				</Toast>
			</>
		);

		cy.get("[ui5-button]")
			.then(($button) => {
				$button[0].addEventListener("click", () => {
					cy.get("[ui5-toast]")
						.then($toast => {
							($toast[0] as Toast).open = true;
						});
				});
			});

		cy.get("[ui5-button]")
			.realClick();

		cy.get("#wcToastStyled").should(($toast) => {
			const rect = $toast[0].getBoundingClientRect();
			expect(Math.round(rect.width)).to.equal(300);
			expect(Math.round(rect.height)).to.equal(64);
		});
	});
});

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
