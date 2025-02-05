import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";

describe("Popover opener", () => {
	it("tests 'opener' set as string of abstract element's ID ", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete" id="clearCounter"></ToolbarButton>
					<ToolbarButton id="btnOpenMenu" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup" opener="btnOpenMenu">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		// act
		cy.get("#popup").invoke("prop", "open", "true");

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});

	it("tests 'opener' set as DOM ref of abstract element's DOM reference", () => {
		cy.mount(
			<>
				<Toolbar id="tb">
					<ToolbarButton text="Add"></ToolbarButton>
					<ToolbarButton text="Delete"></ToolbarButton>
					<ToolbarButton id="btnOpenPopover" text="Open Menu" preventOverflowClosing={true}></ToolbarButton>
				</Toolbar>
				<Popover id="popup">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("#btnOpenPopover").then($toolbarBtn => {
			cy.wrap($toolbarBtn.get(0)).as("toolbarBtn");
		});

		// act
		cy.get("@toolbarBtn").then($toolbarBtn => {
			cy.get("#popup").invoke("prop", "opener", $toolbarBtn.get(0));
		});
		cy.get("#popup").invoke("prop", "open", true);

		// assert - The button inside the popover is accessible => popover is opened properly.
		cy.get("#btnClosePopover").then($btnClosePopover => {
			$btnClosePopover.get(0).addEventListener("click", () => {
				cy.get("#popup").invoke("prop", "open", false);
			});
		});
		cy.get("#btnClosePopover").realClick();
	});
});

describe("Popover interaction", () => {
	describe("Automatic Closing", () => {
		it("tests clicking outside the popover", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get("#pop").should("be.visible");

			// act
			cy.get("body").realClick();

			// assert
			cy.get("#pop").should("not.be.visible");
		});

		it("tests clicking on the opener", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener">
						<Button id="btnClosePopover">Close</Button>
					</Popover>
				</>
			);

			cy.get("#pop").should("be.visible");

			// act
			cy.get("#opener").realClick();

			// assert
			cy.get("#pop").should("be.visible");
		});

		it("tests clicking on the opener, when popover and the opener are in a shadow root", () => {
			class OpenerShadowRootTest extends HTMLElement {
				_shadow: ShadowRoot | null = null;

				constructor() {
					super();
				}

				connectedCallback() {
					if (this._shadow) {
						return;
					}

					// Create a shadow root
					const shadow = this.attachShadow({ mode: "open" });
					this._shadow = shadow;

					const wrapper = document.createElement("div");

					const btn = document.createElement("button");
					btn.textContent = "Opener in Shadow Root";

					const pop = document.createElement("ui5-popover") as Popover;
					pop.opener = btn;
					// pop.open = true;

					wrapper.appendChild(btn);
					wrapper.appendChild(pop);
					shadow.appendChild(wrapper);
				}
			}

			cy.window().then(win => {
				win.customElements.define("opener-shadow-root-test", OpenerShadowRootTest);
			});

			cy.mount(
				<>
					{/* @ts-expect-error */}
					<opener-shadow-root-test id="openerShadowRooTest"></opener-shadow-root-test>
				</>
			);

			// act
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").invoke("prop", "open", true);

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").should("be.visible");

			// act
			cy.get("#openerShadowRooTest").shadow().find("button").realClick();

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").should("be.visible");
		});
	});
});
