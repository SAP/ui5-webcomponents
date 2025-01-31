import "@ui5/webcomponents-base/dist/features/F6Navigation.js";
import Dialog from "../../src/Dialog.js";
import Button from "../../src/Button.js";

describe("Keyboard", () => {
	it("F6 navigation", () => {
		cy.mount(
			<>
				<button data-sap-ui-fastnavgroup="true" id="test"></button>
				<Dialog open={true}>
					<div data-sap-ui-fastnavgroup="true">
						<button id="first">First group focusable</button>
					</div>
					<div data-sap-ui-fastnavgroup="true">
						<button id="second">Second group focusable</button>
					</div>
				</Dialog>
				<button data-sap-ui-fastnavgroup="true"></button>
			</>
		);

		cy.get("#first")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#second")
			.should("be.focused");

		cy.realPress(["Shift", "F6"]);

		cy.get("#first")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#second")
			.should("be.focused");

		cy.realPress("F6");

		cy.get("#first")
			.should("be.focused");
	});
});

describe("Dialog", () => {
	describe("Dialog general interaction", () => {
		beforeEach(() => {
			cy.mount(
				<Dialog id="dialog" headerText={Dialog}>
					<span>Some content</span>
					<div slot="footer" class="dialogFooter">
						<Button id="btnCloseDialog">Close</Button>
					</div>
				</Dialog>
			);
		});

		// it("dialog repositions after screen resize", () => {
		// 	// Setup
		// 	cy.get("[ui5-dialog]").invoke("prop", "open", true);

		// 	cy.get("#btnOpenDialog").realClick();

		// 	cy.get("[ui5-dialog]").then($dialog => {
		// 		const topBeforeScreenResize = parseInt($dialog[0].style.top);
		// 		const leftBeforeScreenResize = parseInt($dialog[0].style.left);

		// 		// Act
		// 		cy.viewport(600, 600).then(() => {
		// 			// Assert
		// 			cy.get("[ui5-dialog]").then($dialogRepositioned => {
		// 				const topAfterScreenResize = parseInt($dialogRepositioned[0].style.top);
		// 				const leftAfterScreenResize = parseInt($dialogRepositioned[0].style.left);

		// 				expect(topBeforeScreenResize).to.not.equal(topAfterScreenResize);
		// 				expect(leftBeforeScreenResize).to.not.equal(leftAfterScreenResize);
		// 			});
		// 		});

		// 		// Clean-up
		// 		cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"));
		// 	});
		// });

		it("draggable and resizable dialog repositions after screen resize", () => {
			// Setup
			cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
			cy.get("[ui5-dialog]").invoke("prop", "open", true);

			let topBeforeScreenResize: number;
			let leftBeforeScreenResize: number;

			cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("mousedown", { which: 1 });
			cy.window().trigger("mousemove", { clientX: 50, clientY: 50 });
			cy.window().trigger("mouseup");

			cy.get("[ui5-dialog]")
				.then($dialog => {
					topBeforeScreenResize = parseInt($dialog[0].style.top);
					leftBeforeScreenResize = parseInt($dialog[0].style.left);

					cy.viewport(600, 600)
						.then(() => {
							cy.get("[ui5-dialog]")
								.should("have.css", "top", "230px")
								.and("not.have.css", "top", `${topBeforeScreenResize}px`)
								.and("have.css", "left", "140px")
								.and("not.have.css", "left", `${leftBeforeScreenResize}px`);
						});

					// Clean-up
					cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"));
				});
		});

		it("draggable - mouse support", () => {
			// Setup
			cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
			cy.get("[ui5-dialog]").invoke("prop", "open", true);

			let topBeforeScreenResize: number;
			let leftBeforeScreenResize: number;

			cy.get("[ui5-dialog]")
				.then($dialog => {
					topBeforeScreenResize = parseInt($dialog[0].style.top);
					leftBeforeScreenResize = parseInt($dialog[0].style.left);

					// Act
					cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realMouseDown();
					cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realMouseMove(50, 50);
					cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realMouseUp();

					// Assert
					cy.get("[ui5-dialog]")
						.should("not.have.css", "top", `${topBeforeScreenResize}px`)
						.and("not.have.css", "left", `${leftBeforeScreenResize}px`);

					// Act
					cy.get("[ui5-dialog]").invoke("prop", "open", false);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);

					// Assert
					cy.get("[ui5-dialog]")
						.should("have.css", "top", `${topBeforeScreenResize}px`)
						.and("have.css", "left", `${leftBeforeScreenResize}px`);
				});
		});

		it.only("draggable - keyboard support - arrowUp", () => {
			// Setup
			cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
			cy.get("[ui5-dialog]").invoke("prop", "open", true);

			let topBeforeScreenResize: number;
			let leftBeforeScreenResize: number;

			cy.get("[ui5-dialog]")
				.then($dialog => {
					topBeforeScreenResize = parseInt($dialog[0].style.top);
					leftBeforeScreenResize = parseInt($dialog[0].style.left);

					// Act
					cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realPress("ArrowUp");

					// Assert
					cy.get("[ui5-dialog]")
						.should("not.have.css", "top", `${topBeforeScreenResize}px`)
						.and("have.css", "left", `${leftBeforeScreenResize}px`);

					// Act
					cy.get("[ui5-dialog]").invoke("prop", "open", false);
					cy.get("[ui5-dialog]").should("not.be.visible");
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
					cy.get("[ui5-dialog]").should("be.visible");

					// Assert
					cy.get("[ui5-dialog]")
						.should("have.css", "top", `${topBeforeScreenResize}px`)
						.and("have.css", "left", `${leftBeforeScreenResize}px`);
				});
		});

		// it("draggable - keyboard support - arrowLeft", () => {
		// 	// Setup
		// 	cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
		// 	cy.get("[ui5-dialog]").invoke("prop", "open", true);

		// 	cy.get("[ui5-dialog]").then($dialog => {
		// 		const topBefore = parseInt($dialog[0].style.top);
		// 		const leftBefore = parseInt($dialog[0].style.left);

		// 		// Act
		// 		cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("keydown", { key: "ArrowLeft" });

		// 		// Assert
		// 		cy.get("[ui5-dialog]").then($dialogLeft => {
		// 			const topAfter = parseInt($dialogLeft[0].style.top);
		// 			const leftAfter = parseInt($dialogLeft[0].style.left);

		// 			expect(topBefore).equals(topAfter);
		// 			expect(leftBefore).to.not.equal(leftAfter);
		// 		});

		// 		// Act
		// 		cy.realPress("Escape");
		// 		cy.get("#btnOpenDialog").realClick();

		// 		cy.get("[ui5-dialog]").then($dialogAfterReopen => {
		// 			const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
		// 			const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);

		// 			expect(topBefore).equals(topAfterReopen);
		// 			expect(leftBefore).equals(leftAfterReopen);
		// 		});
		// 	});
		// });

		// it("resizable - mouse support", () => {
		// 	// Setup
		// 	cy.get("[ui5-dialog]").invoke("prop", "resizable", true);
		// 	cy.get("[ui5-dialog]").invoke("prop", "open", true);

		// 	cy.get("[ui5-dialog]").then($dialog => {
		// 		const topBefore = parseInt($dialog[0].style.top);
		// 		const leftBefore = parseInt($dialog[0].style.left);
		// 		const widthBefore = $dialog.width();
		// 		const heightBefore = $dialog.height();

		// 		// Act
		// 		cy.get("[ui5-dialog]").focus();
		// 		cy.get("[ui5-dialog]").shadow().find(".ui5-popup-resize-handle").realMouseDown();
		// 		cy.window().trigger("mousemove", { clientX: 50, clientY: 50 });
		// 		cy.window().trigger("mouseup");

		// 		// Assert
		// 		cy.get("[ui5-dialog]").then($dialogDragged => {
		// 			const topAfter = parseInt($dialogDragged[0].style.top);
		// 			const leftAfter = parseInt($dialogDragged[0].style.left);
		// 			const widthAfter = $dialog.width();
		// 			const heightAfter = $dialog.height();

		// 			expect(topBefore).equals(topAfter);
		// 			expect(leftBefore).equals(leftAfter);
		// 			expect(widthBefore).equals(widthAfter);
		// 			expect(heightBefore).to.not.equal(heightAfter);
		// 		});

		// 		// Act
		// 		cy.realPress("Escape");
		// 		cy.get("#btnOpenDialog").realClick();

		// 		cy.get("[ui5-dialog]").then($dialogAfterReopen => {
		// 			const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
		// 			const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);
		// 			const widthAfterReopen = $dialogAfterReopen.width();
		// 			const heightAfterReopen = $dialogAfterReopen.height();

		// 			expect(topBefore).equals(topAfterReopen);
		// 			expect(leftBefore).equals(leftAfterReopen);
		// 			expect(widthBefore).equals(widthAfterReopen);
		// 			expect(heightBefore).equals(heightAfterReopen);
		// 		});
		// 	});
		// });

		// it("resizable - keyboard support", () => {
		// 	// Setup
		// 	cy.get("[ui5-dialog]").invoke("prop", "resizable", true);
		// 	cy.get("[ui5-dialog]").invoke("prop", "open", true);

		// 	cy.get("[ui5-dialog]").then($dialog => {
		// 		const topBefore = parseInt($dialog[0].style.top);
		// 		const leftBefore = parseInt($dialog[0].style.left);
		// 		const widthBefore = $dialog.width();
		// 		const heightBefore = $dialog.height();

		// 		cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realClick();
		// 		cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realPress(["Shift", "ArrowDown"]);

		// 		// Assert
		// 		cy.get("[ui5-dialog]").then($dialogDragged => {
		// 			const topAfter = parseInt($dialogDragged[0].style.top);
		// 			const leftAfter = parseInt($dialogDragged[0].style.left);
		// 			const widthAfter = $dialog.width();
		// 			const heightAfter = $dialog.height();

		// 			expect(topBefore).equals(topAfter);
		// 			expect(leftBefore).equals(leftAfter);
		// 			expect(widthBefore).equals(widthAfter);
		// 			expect(heightBefore).to.not.equal(heightAfter);
		// 		}).then(() => {
		// 			cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realPress(["Shift", "ArrowRight"]);

		// 			// Assert
		// 			cy.get("[ui5-dialog]").then($dialogDragged => {
		// 				const topAfter2 = parseInt($dialogDragged[0].style.top);
		// 				const leftAfter2 = parseInt($dialogDragged[0].style.left);
		// 				const widthAfter2 = $dialog.width();
		// 				const heightAfter2 = $dialog.height();

		// 				expect(topBefore).equals(topAfter2);
		// 				expect(leftBefore).equals(leftAfter2);
		// 				expect(widthBefore).to.not.equal(widthAfter2);
		// 				expect(heightBefore).to.not.equal(heightAfter2);
		// 			});

		// 			// Act
		// 			cy.realPress("Escape");
		// 			cy.get("#btnOpenDialog").realClick();

		// 			cy.get("[ui5-dialog]").then($dialogAfterReopen => {
		// 				const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
		// 				const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);
		// 				const widthAfterReopen = $dialogAfterReopen.width();
		// 				const heightAfterReopen = $dialogAfterReopen.height();

		// 				expect(topBefore).equals(topAfterReopen);
		// 				expect(leftBefore).equals(leftAfterReopen);
		// 				expect(widthBefore).equals(widthAfterReopen);
		// 				expect(heightBefore).equals(heightAfterReopen);
		// 			});
		// 		});
		// 	});
		// });
	});
});

