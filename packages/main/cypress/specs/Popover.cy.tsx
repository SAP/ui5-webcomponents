import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";
import List from "../../src/List.js";
import ListItemStandard from "../../src/ListItemStandard.js";

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

		it("tests clicking on the opener if both the popover and the opener are located in a shadow root", () => {
			class OpenerShadowRootTest extends HTMLElement {
				_shadow: ShadowRoot | null = null;

				constructor() {
					super();
				}

				connectedCallback() {
					if (this._shadow) {
						return;
					}

					this._shadow = this.attachShadow({ mode: "open" });

					const btn = document.createElement("button");
					btn.textContent = "Opener in Shadow Root";
					btn.setAttribute("id", "opener");

					const pop = document.createElement("ui5-popover") as Popover;
					pop.opener = "opener";
					pop.open = true;

					this._shadow.appendChild(btn);
					this._shadow.appendChild(pop);
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

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").should("be.visible");

			// act
			cy.get("#openerShadowRooTest").shadow().find("button").realClick();

			// assert
			cy.get("#openerShadowRooTest").shadow().find("[ui5-popover]").should("be.visible");
		});
	});

	describe("Scrolling", () => {
		it("tests disabled scrolling in popover", () => {
			cy.mount(
				<>
					<button id="opener1">Open</button>
					<Popover id="popNoScroll" style="height:200px;" open={true} no-scrolling opener="opener1">
						<List>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard id="txt1"> Text 1 </ListItemStandard>
						</List>
					</Popover>
				</>
			);

			cy.get("#popNoScroll")
				.shadow()
				.find(".ui5-popup-content")
				.should("have.css", "overflow", "hidden");
		});

		it("tests scrolling in popover", () => {
			cy.mount(
				<>
					<button id="opener1">Open</button>
					<Popover id="popNoScroll" style="height:200px;" open={true} opener="opener1">
						<List>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard> Text </ListItemStandard>
							<ListItemStandard id="txt1"> Text </ListItemStandard>
						</List>
					</Popover>
				</>
			);

			cy.get("#popNoScroll")
				.shadow()
				.find(".ui5-popup-content")
				.scrollTo("bottom");

			cy.get("#txt1")
				.should("be.visible");
		});
	});
});
