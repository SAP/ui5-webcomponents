import { html } from "lit";
import "../../src/Dialog.js";
import "../../src/Button.js";
import "../../src/Input.js";

describe("Dialog", () => {
	describe("Dialog general interaction", () => {
		beforeEach(() => {
			cy.mount(html`
				<ui5-button id="btnOpenDialog">Open Stretched Dialog</ui5-button>
				<ui5-dialog id="dialog" header-text="Dialog">
					<span>Some content</span>
					<div slot="footer" class="dialogFooter">
						<ui5-button id="btnCloseDialog">Close</ui5-button>
					</div>
				</ui5-dialog>
			`);
		});

		it("tests dialog toggling", () => {
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});

			cy.get("#btnOpenDialog").realClick();
			cy.get("[ui5-dialog]").should("be.visible");

			cy.get("#btnCloseDialog").then($btnCloseDialog => {
				$btnCloseDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "open", false);
				});
			});

			cy.get("#btnCloseDialog").realClick();
			cy.get("[ui5-dialog]").should("not.be.visible");
		});

		it("tests dialog toggling with 'open' attribute", () => {
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "open", "''");
				});
			});

			cy.get("#btnOpenDialog").click();
			cy.get("[ui5-dialog]").should("be.visible");

			cy.get("#btnCloseDialog").then($btnCloseDialog => {
				$btnCloseDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("removeAttr", "open");
				});
			});

			cy.get("#btnCloseDialog").realClick();
			cy.get("[ui5-dialog]").should("not.be.visible");
		});

		it("dialog repositions after screen resize", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});

			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBeforeScreenResize = parseInt($dialog[0].style.top);
				const leftBeforeScreenResize = parseInt($dialog[0].style.left);

				// Act
				cy.viewport(600, 600).then(() => {
					// Assert
					cy.get("[ui5-dialog]").then($dialogRepositioned => {
						setTimeout(() => {
							const topAfterScreenResize = parseInt($dialogRepositioned[0].style.top);
							const leftAfterScreenResize = parseInt($dialogRepositioned[0].style.left);

							expect(topBeforeScreenResize).to.not.equal(topAfterScreenResize);
							expect(leftBeforeScreenResize).to.not.equal(leftAfterScreenResize);
						}, 1);
					});
				});

				// Clean-up
				cy.realPress("Escape");
				cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"));
			});
		});

		it("draggable and resizable dialog repositions after screen resize", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("mousedown", { which: 1 });
			cy.window().trigger("mousemove", { clientX: 50, clientY: 50 });
			cy.window().trigger("mouseup");

			cy.get("[ui5-dialog]").then($dialog => {
				const topBeforeScreenResize = parseInt($dialog[0].style.top);
				const leftBeforeScreenResize = parseInt($dialog[0].style.left);

				// Act
				cy.viewport(600, 600).then(() => {
					// Assert
					cy.get("[ui5-dialog]").then($dialogRepositioned => {
						setTimeout(() => {
							const topAfterScreenResize = parseInt($dialogRepositioned[0].style.top);
							const leftAfterScreenResize = parseInt($dialogRepositioned[0].style.left);

							expect(topBeforeScreenResize).to.not.equal(topAfterScreenResize);
							expect(leftBeforeScreenResize).to.not.equal(leftAfterScreenResize);
						}, 1);
					});
				});

				// Clean-up
				cy.realPress("Escape");
				cy.viewport(Cypress.config("viewportWidth"), Cypress.config("viewportHeight"));
			});
		});

		it("draggable - mouse support", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBefore = parseInt($dialog[0].style.top);
				const leftBefore = parseInt($dialog[0].style.left);

				// Act
				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("mousedown", { which: 1 });
				cy.window().trigger("mousemove", { clientX: 50, clientY: 50 });
				cy.window().trigger("mouseup");

				// Assert
				cy.get("[ui5-dialog]").then($dialogDragged => {
					setTimeout(() => {
						const topAfter = parseInt($dialogDragged[0].style.top);
						const leftAfter = parseInt($dialogDragged[0].style.left);

						expect(topBefore).to.not.equal(topAfter);
						expect(leftBefore).to.not.equal(leftAfter);
					}, 1);
				});
			});

			// Clean-up
			cy.realPress("Escape");
		});

		it("draggable - keyboard support - arrowUp", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBefore = parseInt($dialog[0].style.top);
				const leftBefore = parseInt($dialog[0].style.left);

				// Act
				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("keydown", { key: "ArrowUp" });

				// Assert
				cy.get("[ui5-dialog]").then($dialogUp => {
					setTimeout(() => {
						const topAfterUp = parseInt($dialogUp[0].style.top);
						const leftAfterUp = parseInt($dialogUp[0].style.left);

						expect(topBefore).to.not.equal(topAfterUp);
						expect(leftBefore).equals(leftAfterUp);
					}, 1);
				});

				// Act
				cy.realPress("Escape");
				cy.get("#btnOpenDialog").realClick();

				cy.get("[ui5-dialog]").then($dialogAfterReopen => {
					setTimeout(() => {
						const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
						const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);

						expect(topBefore).equals(topAfterReopen);
						expect(leftBefore).equals(leftAfterReopen);

						// eslint-disable-next-line cypress/no-unnecessary-waiting
						cy.wait(1);

						// Clean-up
						cy.realPress("Escape");
					}, 1);
				});
			});
		});

		it("draggable - keyboard support - arrowLeft", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "draggable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBefore = parseInt($dialog[0].style.top);
				const leftBefore = parseInt($dialog[0].style.left);

				// Act
				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").trigger("keydown", { key: "ArrowLeft" });

				// Assert
				cy.get("[ui5-dialog]").then($dialogLeft => {
					setTimeout(() => {
						const topAfter = parseInt($dialogLeft[0].style.top);
						const leftAfter = parseInt($dialogLeft[0].style.left);

						expect(topBefore).equals(topAfter);
						expect(leftBefore).to.not.equal(leftAfter);
					}, 1);
				});

				// Act
				cy.realPress("Escape");
				cy.get("#btnOpenDialog").realClick();

				cy.get("[ui5-dialog]").then($dialogAfterReopen => {
					setTimeout(() => {
						const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
						const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);

						expect(topBefore).equals(topAfterReopen);
						expect(leftBefore).equals(leftAfterReopen);

						// eslint-disable-next-line cypress/no-unnecessary-waiting
						cy.wait(1);

						// Clean-up
						cy.realPress("Escape");
					}, 1);
				});
			});
		});

		it("resizable - mouse support", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "resizable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBefore = parseInt($dialog[0].style.top);
				const leftBefore = parseInt($dialog[0].style.left);
				const widthBefore = $dialog.width();
				const heightBefore = $dialog.height();

				// Act
				cy.get("[ui5-dialog]").focus();
				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-resize-handle").realMouseDown();
				cy.window().trigger("mousemove", { clientX: 50, clientY: 50 });
				cy.window().trigger("mouseup");

				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(1);

				// Assert
				cy.get("[ui5-dialog]").then($dialogDragged => {
					setTimeout(() => {
						const topAfter = parseInt($dialogDragged[0].style.top);
						const leftAfter = parseInt($dialogDragged[0].style.left);
						const widthAfter = $dialog.width();
						const heightAfter = $dialog.height();

						expect(topBefore).equals(topAfter);
						expect(leftBefore).equals(leftAfter);
						expect(widthBefore).equals(widthAfter);
						expect(heightBefore).to.not.equal(heightAfter);
					}, 1);
				});

				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(1);

				// Act
				cy.realPress("Escape");
				cy.get("#btnOpenDialog").realClick();

				cy.get("[ui5-dialog]").then($dialogAfterReopen => {
					setTimeout(() => {
						const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
						const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);
						const widthAfterReopen = $dialogAfterReopen.width();
						const heightAfterReopen = $dialogAfterReopen.height();

						expect(topBefore).equals(topAfterReopen);
						expect(leftBefore).equals(leftAfterReopen);
						expect(widthBefore).equals(widthAfterReopen);
						expect(heightBefore).equals(heightAfterReopen);
					}, 1);
				});
			});

			// Clean-up
			cy.realPress("Escape");
		});

		it("resizable - keyboard support", () => {
			// Setup
			cy.get("#btnOpenDialog").then($btnOpenDialog => {
				$btnOpenDialog.get(0).addEventListener("click", () => {
					cy.get("[ui5-dialog]").invoke("prop", "resizable", true);
					cy.get("[ui5-dialog]").invoke("prop", "open", true);
				});
			});
			cy.get("#btnOpenDialog").realClick();

			cy.get("[ui5-dialog]").then($dialog => {
				const topBefore = parseInt($dialog[0].style.top);
				const leftBefore = parseInt($dialog[0].style.left);
				const widthBefore = $dialog.width();
				const heightBefore = $dialog.height();

				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realClick();
				cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realPress(["Shift", "ArrowDown"]);

				// eslint-disable-next-line cypress/no-unnecessary-waiting
				cy.wait(1);

				// Assert
				cy.get("[ui5-dialog]").then($dialogDragged => {
					setTimeout(() => {
						const topAfter = parseInt($dialogDragged[0].style.top);
						const leftAfter = parseInt($dialogDragged[0].style.left);
						const widthAfter = $dialog.width();
						const heightAfter = $dialog.height();

						expect(topBefore).equals(topAfter);
						expect(leftBefore).equals(leftAfter);
						expect(widthBefore).equals(widthAfter);
						expect(heightBefore).to.not.equal(heightAfter);
					}, 1);
				}).then(() => {
					cy.get("[ui5-dialog]").shadow().find(".ui5-popup-header-root").realPress(["Shift", "ArrowRight"]);

					// Assert
					cy.get("[ui5-dialog]").then($dialogDragged => {
						setTimeout(() => {
							const topAfter2 = parseInt($dialogDragged[0].style.top);
							const leftAfter2 = parseInt($dialogDragged[0].style.left);
							const widthAfter2 = $dialog.width();
							const heightAfter2 = $dialog.height();

							expect(topBefore).equals(topAfter2);
							expect(leftBefore).equals(leftAfter2);
							expect(widthBefore).to.not.equal(widthAfter2);
							expect(heightBefore).to.not.equal(heightAfter2);
						}, 1);
					});

					// eslint-disable-next-line cypress/no-unnecessary-waiting
					cy.wait(1);

					// Act
					cy.realPress("Escape");
					cy.get("#btnOpenDialog").realClick();

					cy.get("[ui5-dialog]").then($dialogAfterReopen => {
						setTimeout(() => {
							const topAfterReopen = parseInt($dialogAfterReopen[0].style.top);
							const leftAfterReopen = parseInt($dialogAfterReopen[0].style.left);
							const widthAfterReopen = $dialogAfterReopen.width();
							const heightAfterReopen = $dialogAfterReopen.height();

							expect(topBefore).equals(topAfterReopen);
							expect(leftBefore).equals(leftAfterReopen);
							expect(widthBefore).equals(widthAfterReopen);
							expect(heightBefore).equals(heightAfterReopen);

							// Clean-up
							cy.realPress("Escape");
						}, 1);
					});
				});
			});
		});
	});
});
