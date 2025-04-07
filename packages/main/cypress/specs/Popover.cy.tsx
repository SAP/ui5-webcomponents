import ToolbarButton from "../../src/ToolbarButton.js";
import Toolbar from "../../src/Toolbar.js";
import Popover from "../../src/Popover.js";
import Button from "../../src/Button.js";

describe("Rendering", () => {
	it("tests arrow positioning", () => {
		cy.mount(
			<>
				<div id="icon1" tabindex="0" style="width: 10px; height: 10px; background:red;"></div>
				<Popover id="popup"
						 opener="icon1"
						 header-text="Newsletter subscription"
						 placement="End"
						 vertical-align="Top">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		// act
		cy.get("#popup")
			.invoke("prop", "open", "true");

		cy.get("#popup")
			.should("be.visible");

		cy.get("#popup")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("be.visible");

		cy.get("#popup")
			.shadow()
			.find(".ui5-popover-arrow")
			.should("have.css", "transform", "matrix(1, 0, 0, 1, 0, -43)");
	});
});

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

	it("tests calling _showOutsideViewport method", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popover" opener="btnOpen">
					<Button id="btnClosePopover">Close</Button>
				</Popover>
			</>
		);

		cy.get("#popover").then(el => {
			cy.spy<Popover>((el.get(0) as Popover), "_showOutsideViewport").as("showOutsideViewport");
		});

		// act
		cy.get("#popover").invoke("prop", "open", "true");

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
	});

	it("tests calling _showOutsideViewport method, when popover is created dynamically", () => {
		cy.mount(
			<>
				<div id="container"></div>
				<Button id="btnOpen">Open</Button>
			</>
		);

		cy.get("#container").then(container => {
			const popover = document.createElement("ui5-popover");

			cy.spy<Popover>((popover as Popover), "_showOutsideViewport").as("showOutsideViewport");

			popover.id = "popover";
			popover.headerText = "Popover Header";
			popover.opener = "btnOpen";
			popover.open = true;

			const content = document.createElement("div");
			content.innerHTML = "<button id='popoverBtn'>button</button>";
			popover.appendChild(content);

			container.get(0).appendChild(popover);
		});

		cy.get("#popover")
			.should("be.visible");

		cy.get("@showOutsideViewport")
			.should("have.been.calledOnce");
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

		it("tests clicking outside the popover when 'mousedown' event propagation is stopped", () => {
			cy.mount(
				<>
					<button id="opener">Open</button>
					<Popover id="pop" open={true} opener="opener" placement="Bottom">
						<span>popover content</span>
					</Popover>
					<button id="btn">Stops mousedown propagation</button>
				</>
			);

			cy.get("#pop").should("be.visible");
			cy.get("#btn").then(btn => {
				btn.get(0).addEventListener("mousedown", event => {
					event.stopPropagation();
				});
			});

			// act
			cy.get("#btn").realMouseDown();

			// assert
			cy.get("#pop").should("not.be.visible");
		});
	});
});

describe("Focusing", () => {
	it("tests no focusable elements, but content is scrolling", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
							 style="width: 10rem; height: 10rem;"
							 opener="btnOpen">
					<div>
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
				</Popover>
			</>
		);

		// act
		cy.get("#popoverId").invoke("prop", "open", "true");

		cy.get("#popoverId")
			.shadow()
			.find(".ui5-popup-content")
			.should("be.focused");
	});

	it("tests first element is keyboard focusable scroll container", () => {
		cy.mount(
			<>
				<Button id="btnOpen">Open</Button>
				<Popover id="popoverId"
						 opener="btnOpen">
					<div id="innerContent" style="width: 10rem; height: 10rem; overflow-y: auto;">
						Note: The content of the prop will be rendered into a by assigning the
						respective slot attribute (slot="footer"). Since you can't change the
						DOM order of slots when declaring them within a prop, it might prove
						beneficial to manually mount them as part of the component's children,
						especially when facing problems with the reading order of screen
						readers. Note: When passing a custom React component to this prop, you
						have to make sure your component reads the slot prop and appends it to
						the most outer element of your component. Learn more about it here.
					</div>
					<Button>Button</Button>
				</Popover>
			</>
		);

		// act
		cy.get("#popoverId").invoke("prop", "open", "true");

		cy.get("#innerContent")
			.should("be.focused");
	});
});

describe("Events", () => {
	it("before-open", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.should("not.be.visible");

		const preventDefault = (e : Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($dialog => {
			$dialog.get(0).addEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("not.be.visible");

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-open", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("be.visible");
	});

	it("before-close", () => {
		cy.mount(
			<>
				<Button id="btnOpenPopover">Open</Button>
				<Popover id="popoverId" opener="btnOpenPopover">
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Popover>
			</>
		);

		cy.get("#popoverId")
			.invoke("prop", "open", true);

		cy.get("#popoverId")
			.should("be.visible");

		const preventDefault = (e : Event) => {
			e.preventDefault();
		};

		cy.get("#popoverId").then($popover => {
			$popover.get(0).addEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get("#popoverId")
			.should("be.visible");

		cy.get("#popoverId").then($popover => {
			$popover.get(0).removeEventListener("before-close", preventDefault);
		});

		cy.get("#popoverId")
			.invoke("prop", "open", false);

		cy.get("#popoverId")
			.should("not.be.visible");
	});
});
