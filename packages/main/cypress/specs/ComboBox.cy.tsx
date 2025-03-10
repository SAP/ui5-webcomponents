import ValueState from "@ui5/webcomponents-base/dist/types/ValueState.js";
import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";

describe("Security", () => {
	it("tests setting malicious text to items", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="<script>alert('XSS')</script>"></ComboBoxItem>
				<ComboBoxItem text="<b onmouseover=alert('XSS')></b>"></ComboBoxItem>
				<ComboBoxItem text="Albania<button onClick='alert(1)'>alert</button>"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-cb-item").eq(0).shadow().find(".ui5-li-title")
			.should("have.text", "<script>alert('XSS')</script>");
		cy.get("ui5-cb-item").eq(1).shadow().find(".ui5-li-title")
			.should("have.text", "<b onmouseover=alert('XSS')></b>");
		cy.get("ui5-cb-item").eq(2).shadow().find(".ui5-li-title")
			.should("have.text", "Albania<button onClick='alert(1)'>alert</button>");
	});
});

describe("General interaction", () => {
	it("Should open/close popover when clicking on the arrow", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox").shadow().find("[ui5-icon]").realClick();
		cy.get("ui5-combobox").shadow().find("[ui5-responsive-popover]").should("have.attr", "open");

		cy.get("ui5-combobox").shadow().find("[ui5-icon]").realClick();
		cy.get("ui5-combobox").shadow().find("[ui5-responsive-popover]").should("not.have.attr", "open");
	});

	it("Items filtration", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox").shadow().find("[ui5-icon]").realClick();
		cy.get("ui5-combobox").find("[ui5-cb-item]").should("have.length", "3");

		cy.get("ui5-combobox").realPress("O");
		cy.get("ui5-combobox").find("[ui5-cb-item]").should("have.prop", "_isVisible", true);
		cy.get("ui5-combobox").find("[ui5-cb-item]").eq(1).should("not.have.prop", "_isVisible", true);
		cy.get("ui5-combobox").find("[ui5-cb-item]").eq(2).should("not.have.prop", "_isVisible", true);
	});

	it("Should open the popover when typing a value", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox").realClick();
		cy.get("ui5-combobox").realPress("O");
		cy.get("ui5-combobox").shadow().find("[ui5-responsive-popover]").should("have.prop", "open");

		cy.get("ui5-combobox").should("have.prop", "value", "One");
		cy.get("ui5-combobox").find("[ui5-cb-item]").should("have.prop", "selected", true);
		cy.window().then(window => {
			return window.getSelection()?.toString();
		}).should("contains", "ne");
	});

	it("Should filter items based on input with filter='None' and lazy loading", () => {
		cy.mount(
			<ComboBox filter="None"></ComboBox>
		);

		cy.get("ui5-combobox").then(() => {
			const cb: ComboBox = document.querySelector("ui5-combobox")!;
			let currentSearch: {
				cancel: () => void;
				items: Promise< string[] | undefined>;
			} | undefined;
			let debounce: number | undefined;

			cb.addEventListener("input", e => {
				// debounce by waiting till the user stops typing for more than 0.25 seconds
				const debounceTime = 250;
				if (debounce !== undefined) {
					clearTimeout(debounce);
				}
				debounce = setTimeout(async () => {
					debounce = undefined;
					const combobox = e.target as ComboBox;
					const value = combobox.value;

					if (currentSearch !== undefined) {
						// Cancel any current search that might already be happening
						currentSearch.cancel();
					}

					if (value) {
						currentSearch = fetchSearchResults(value)!;
						const items = await currentSearch.items;
						// if items is undefined it means canceled, so ignore
						if (items) {
							// do not reset until afterwards
							currentSearch = undefined;
							reset();
							items.forEach(text => {
								const item = document.createElement("ui5-cb-item");
								item.setAttribute("text", text);
								cb.appendChild(item);
							});
						}
					} else {
						reset();
					}
				}, debounceTime);
			});

			// remove all the existing ui5-cb-items to reset the list
			function reset() {
				[...cb.children].forEach(c => cb.removeChild(c));
			}

			// simulate a fetch call using a setTimeout
			function fetchSearchResults(text:string) {
				let cancel: () => void;
				return {
					cancel: () => cancel(),
					items: new Promise<string[] | undefined>(resolve => {
						const i = setTimeout(() => {
							const items = [];
							for (let i = 0; i < 5; i++) {
								items.push(`${text} #${i + 1}`);
							}
							resolve(items);
						}, 500);
						cancel = () => {
							clearTimeout(i);
							resolve(undefined);
						};
					})
				};
			}
		});

		cy.get("ui5-combobox").shadow().find("input").realClick();
		cy.get("ui5-combobox").shadow().find("input").realPress("I");

		cy.get("ui5-combobox").find("ui5-cb-item").should("have.length", 5);
		cy.get("ui5-combobox").find("ui5-cb-item").first().shadow()
			.find(".ui5-li-title")
			.should("have.text", "I #1");
	});

	it("Should filter items based on input", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" id="cbi"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox").shadow().find("[ui5-icon]").realClick();
		cy.get("ui5-combobox").find("ui5-cb-item").should("have.length", 3);

		cy.get("ui5-combobox").shadow().find("input").realPress("a");
		cy.get("ui5-combobox").find("ui5-cb-item").eq(0).should("have.prop", "_isVisible", true);
		cy.get("ui5-combobox").find("ui5-cb-item").eq(1).should("have.prop", "_isVisible", true);
		cy.get("ui5-combobox").find("ui5-cb-item").eq(2).should("not.have.prop", "_isVisible", true);

		cy.get("ui5-combobox").shadow().find("input").realPress("z");
		cy.get("ui5-combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("Should close popover on item click / change event", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One"></ComboBoxItem>
				<ComboBoxItem text="Two"></ComboBoxItem>
				<ComboBoxItem text="Three"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("ui5-combobox").shadow().find("input").click();
		cy.get("ui5-combobox").shadow().find("input").realPress("t");

		cy.get("ui5-combobox").shadow().find("ui5-responsive-popover").should("have.attr", "open");

		cy.get("ui5-combobox").shadow().find("input").realPress("Enter");
		cy.get("ui5-combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");

		cy.get("ui5-combobox").shadow().find("[ui5-icon]").click();
		cy.get("ui5-combobox").shadow().find("ui5-responsive-popover").should("have.attr", "open");

		cy.get("ui5-combobox").find("ui5-cb-item").first().shadow()
			.find("li")
			.click();
		cy.get("ui5-combobox").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("Tests change event", () => {
		let changeCount = 0;
		let changeItemText = "";
		cy.mount(
			<>
				<ComboBox id="combo">
					<ComboBoxItem text="Algeria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<ComboBox id="dummy-cb"></ComboBox>
			</>
		);

		cy.get("#combo").then(cb => {
			cb[0].addEventListener("change", () => {
				changeCount++;
				changeItemText = cb[0].getAttribute("value")!;
			});
		});

		cy.get("#combo").shadow().find("[inner-input]").click();
		cy.get("#combo").shadow().find("[inner-input]").realPress("a");

		cy.get("#dummy-cb").shadow().find("[inner-input]").click();
		cy.then(() => {
			expect(changeCount).to.equal(1);
			expect(changeItemText).to.equal("Algeria");
		});
	});

	it("Tests change event", () => {
		let changeCount = 0;
		let changeItemText = "";

		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]").then($cb => {
			$cb[0].addEventListener("change", () => {
				changeCount++;
				changeItemText = $cb[0].getAttribute("value")!;
			});
		});

		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").click();
		cy.get("[ui5-combobox]").find("ui5-cb-item").eq(0).click();

		cy.then(() => {
			expect(changeCount).to.equal(1);
			expect(changeItemText).to.equal("Algeria");
		});

		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").click();

		cy.then(() => {
			expect(changeCount).to.equal(1);
			expect(changeItemText).to.equal("Algeria");
		});

		cy.get("[ui5-combobox]").find("ui5-cb-item").eq(1).click();

		cy.then(() => {
			expect(changeCount).to.equal(2);
			expect(changeItemText).to.equal("Argentina");
		});
	});

	it("Tests change event after pressing enter key", () => {
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Algeria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<div id="change-count">0</div>
			</>
		);

		cy.get("[ui5-combobox]").then($cb => {
			$cb[0].addEventListener("change", () => {
				const changeCount = parseInt(document.getElementById("change-count")!.textContent!);
				document.getElementById("change-count")!.textContent = (changeCount + 1).toString();
			});
		});

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").click();
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Enter");
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Enter");

		cy.get("#change-count").should("have.text", "0");

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("a");
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Enter");
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Enter");

		cy.get("#change-count").should("have.text", "1");

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("b");
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Enter");

		cy.get("#change-count").should("have.text", "2");
	});

	it("should fire change event after the user has typed in value, but also selects it from the popover", () => {
		cy.mount(
			<>
				<ComboBox id="change-cb">
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<div id="change-placeholder"></div>
				<div id="change-count">0</div>
			</>
		);

		cy.get("#change-cb").then($cb => {
			$cb[0].addEventListener("change", () => {
				const changeCount = parseInt(document.getElementById("change-count")!.textContent!);
				document.getElementById("change-count")!.textContent = (changeCount + 1).toString();
				document.getElementById("change-placeholder")!.textContent = $cb[0].getAttribute("value")!;
			});
		});

		cy.get("#change-cb").shadow().find("[inner-input]").click();
		cy.get("#change-cb").shadow().find("[inner-input]").type("Bulgaria");
		cy.get("#change-cb").find("ui5-cb-item").first().click();

		cy.get("#change-count").should("have.text", "1");
		cy.get("#change-placeholder").should("have.text", "Bulgaria");
	});

	it("Value should be reset on ESC key", () => {
		cy.mount(
			<ComboBox id="combo2">
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Argentina"></ComboBoxItem>
				<ComboBoxItem text="Brazil"></ComboBoxItem>
			</ComboBox>
		);

		// Type initial text
		cy.get("#combo2").shadow().find("[inner-input]").click()
		cy.get("#combo2").shadow().find("[inner-input]").type("Al");

		// Close picker
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");

		// Reset value
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");
		cy.get("#combo2").should("have.prop", "value", "");

		// Type text and confirm
		cy.get("#combo2").shadow().find("[inner-input]").type("Al");
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Enter");

		// Clear current value
		cy.get("#combo2").shadow().find("[inner-input]").clear();

		// Enter another value, then reset it
		cy.get("#combo2").shadow().find("[inner-input]").type("Al");
		cy.get("#combo2").shadow().find("[inner-input]").realPress("Escape");
		cy.get("#combo2").should("have.prop", "value", "Algeria");
	});

	it("Tests change event on open picker and item navigation", () => {
		let changeCount = 0;
		cy.mount(
			<>
				<ComboBox id="change-cb">
					<ComboBoxItem text="Algeria"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<div id="change-count">0</div>
			</>
		);

		// Listen for the "change" event and update the counter
		cy.get("#change-cb").then($combo => {
			$combo[0].addEventListener("change", () => {
				changeCount++;
				cy.get("#change-count").invoke("text", changeCount.toString());
			});
		});

		// Open the picker
		cy.get("#change-cb").shadow().find("[ui5-icon]").realClick();
		// Navigate down
		cy.get("#change-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		// Check no change yet
		cy.get("#change-count").should("have.text", "0");
		// Select first item
		cy.get("#change-cb").find("ui5-cb-item").first().click();
		// Check change
		cy.get("#change-count").should("have.text", "1");
	});

	it("Tests change event on closed picker and item navigation", () => {
		let changeCount = 0;
		cy.mount(
			<>
				<ComboBox id="change-cb">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<div id="change-count">0</div>
			</>
		);

		cy.get("#change-cb").then($cb => {
			$cb[0].addEventListener("change", () => {
				changeCount++;
				cy.get("#change-count").invoke("text", changeCount.toString());
			});
		});

		cy.get("#change-cb").shadow().find("[inner-input]").click();
		cy.get("#change-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("#change-count").should("have.text", "0");

		cy.get("#change-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("#change-count").should("have.text", "0");

		cy.get("#change-cb").shadow().find("[inner-input]").realPress("Enter");
		cy.get("#change-count").should("have.text", "1");
	});

	it("Tests change event after type and item select", () => {
		let changeCount = 0;
		cy.mount(
			<>
				<ComboBox id="change-cb">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
				</ComboBox>
				<div id="change-placeholder"></div>
				<div id="change-count">0</div>
			</>
		);

		cy.get("#change-cb").then($cb => {
			$cb[0].addEventListener("change", () => {
				changeCount++;
				cy.get("#change-count").invoke("text", changeCount.toString());
				cy.get("#change-placeholder").invoke("text", $cb[0].getAttribute("value"));
			});
		});

		cy.get("#change-cb").scrollIntoView();
		cy.get("#change-cb").shadow().find("[inner-input]").click();
		cy.get("#change-cb").shadow().find("[inner-input]").type("a");
		cy.get("#change-cb").find("ui5-cb-item").first().click();

		cy.get("#change-placeholder").should("have.text", "Argentina");
		cy.get("#change-count").should("have.text", "1");
	});

	it("Tests input event", () => {
		cy.mount(
			<>
				<ComboBox id="input-cb">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Germany"></ComboBoxItem>
				</ComboBox>
				<div id="input-count">0</div>
				<div id="input-placeholder"></div>
			</>
		);

		let inputCount = 0;
		cy.get("#input-cb").then($combo => {
			$combo[0].addEventListener("input", () => {
				inputCount++;
				document.getElementById("input-count")!.textContent = inputCount.toString();
				document.getElementById("input-placeholder")!.textContent = $combo[0].getAttribute("value") ?? "";
			});
		});

		// Click and navigate with arrow keys
		cy.get("#input-cb").shadow().find("[inner-input]").click()
		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("#input-placeholder").should("have.text", "Argentina");
		cy.get("#input-count").should("have.text", "1");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowUp");
		cy.get("#input-placeholder").should("have.text", "Argentina");
		cy.get("#input-count").should("have.text", "1");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("#input-placeholder").should("have.text", "Germany");
		cy.get("#input-count").should("have.text", "2");

		cy.get("#input-cb").shadow().find("[inner-input]").realPress("ArrowDown");
		cy.get("#input-placeholder").should("have.text", "Germany");
		cy.get("#input-count").should("have.text", "2");
	});

	it("Tests Combo with contains filter", () => {
		cy.mount(
			<>
				<ComboBox id="contains-cb" filter="Contains">
					<ComboBoxItem text="Germany"></ComboBoxItem>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Bulgaria"></ComboBoxItem>
					<ComboBoxItem text="Canada"></ComboBoxItem>
				</ComboBox>
			</>
		);

		// Open the ComboBox
		cy.get("#contains-cb").shadow().find(".inputIcon").realClick();
		cy.get("#contains-cb").find("ui5-cb-item").should("have.length", 4);

		// Type "n" => expect 3 items
		cy.get("#contains-cb").shadow().find("[inner-input]").type("n");
		cy.get("#contains-cb")
			.find("ui5-cb-item")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 3);
		// Type "a" => expect 2 items
		cy.get("#contains-cb").shadow().find("[inner-input]").type("a");
		cy.get("#contains-cb").find("ui5-cb-item")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 2);

		// Type "d" => expect 1 item => "Canada"
		cy.get("#contains-cb").shadow().find("[inner-input]").type("d");
		cy.get("#contains-cb").find("ui5-cb-item")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1);

		cy.get("#contains-cb").find("ui5-cb-item")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.first()
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Canada");
	});

	it("Tests Combo with startswith filter", () => {
		cy.mount(
			<>
				<ComboBox filter="StartsWith">
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
					<ComboBoxItem text="Canada"></ComboBoxItem>
					<ComboBoxItem text="Germany"></ComboBoxItem>
				</ComboBox>
			</>
		);

		// Click the arrow icon to open the ComboBox
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-combobox]").find("ui5-cb-item").should("have.length", 4);

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").type("a");
		cy.get("[ui5-combobox]")
			.find("ui5-cb-item")
			.filter((_, el: Element & { _isVisible?: boolean }) => !!el._isVisible)
			.should("have.length", 1)
			.first()
			.shadow()
			.find(".ui5-li-title")
			.should("have.text", "Argentina");

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").type("a");
		cy.get("[ui5-combobox]").shadow().find("ui5-responsive-popover").should("not.have.attr", "open");
	});

	it("Tests selection-change event and its parameters", () => {
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Item 0"></ComboBoxItem>
					<ComboBoxItem text="Item 1"></ComboBoxItem>
					<ComboBoxItem text="Item 2"></ComboBoxItem>
					<ComboBoxItem text="Item 3"></ComboBoxItem>
					<ComboBoxItem text="Item 4"></ComboBoxItem>
					<ComboBoxItem text="Item 5"></ComboBoxItem>
					<ComboBoxItem text="Item 6"></ComboBoxItem>
					<ComboBoxItem text="Item 7"></ComboBoxItem>
				</ComboBox>
				<span id="selection-change-event-result"></span>
			</>
		);

		cy.get("[ui5-combobox]").then($cb => {
			$cb[0].addEventListener("ui5-selection-change", (e: Event) => {
				const detail = (e as CustomEvent).detail;
				const selectedText = detail.item.text || "";
				document.getElementById("selection-change-event-result")!.textContent = selectedText;
			});
		});

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-combobox]").find("ui5-cb-item").eq(7).as("targetItem");
		cy.get("@targetItem").shadow().find(".ui5-li-title").invoke("text")
			.as("targetText");

		cy.get("@targetItem").click();

		// Verify label text matches the selected item's text
		cy.get("@targetText").then(txt => {
			cy.get("#selection-change-event-result").should("have.text", txt);
		});
	});

	it("Tests selection-change event when type text after selection", () => {
		let eventResultText = "";
		cy.mount(
			<>
				<ComboBox>
					<ComboBoxItem text="Argentina"></ComboBoxItem>
					<ComboBoxItem text="Brazil"></ComboBoxItem>
					<ComboBoxItem text="Chile"></ComboBoxItem>
				</ComboBox>
				<span id="selection-change-event-result"></span>
			</>
		);

		// Listen for selection-change
		cy.get("[ui5-combobox]").then($cb => {
			$cb[0].addEventListener("selection-change", (e: Event) => {
				const detail = (e as CustomEvent).detail;
				eventResultText = detail.item.text;
				document.getElementById("selection-change-event-result")!.textContent = eventResultText;
			});
		});

		// Open the ComboBox and simulate "Backspace" + "A"
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realPress("Backspace");
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").type("A");

		// The first visible item is presumably "Argentina"
		cy.get("[ui5-combobox]").find("ui5-cb-item").first().as("firstItem");
		cy.get("@firstItem").shadow().find(".ui5-li-title").invoke("text")
			.as("expectedText");

		// Ensure the label text matches the typed item's text
		cy.get("@expectedText").then(text => {
			cy.get("#selection-change-event-result").should("have.text", text);
		});
	});

	it("Tests focused property when clicking on the arrow", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "focused", false);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "focused", true);
	});

	it("Tests focused property when clicking on the input", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="One" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "focused", false);
		cy.get("[ui5-combobox]").shadow().find("[inner-input]").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "focused", true);
	});

	it("Tests Combo with two-column layout", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem additionalText="DZ" text="Item 1" />
				<ComboBoxItem additionalText="US" text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();
		cy.get("[ui5-combobox]").find("ui5-cb-item").first().shadow()
			.find(".ui5-li-additional-text")
			.should("have.text", "DZ");
	});

	it("Should not open value state message when component is in readonly state", () => {
		cy.mount(
			<ComboBox id="readonly-value-state-cb" readonly value-state={ValueState.Negative}>
				<ComboBoxItem text="Item 1" />
				<ComboBoxItem text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").should("not.be.visible");
	});

	it("Should add items dynamically items to the picker", () => {
		cy.mount(
			<>
				<button id="add-items-btn" onClick={() => {
					setTimeout(() => {
						const combo: any = document.querySelector("[ui5-combobox]");
						const newItem = document.createElement("ui5-cb-item");
						newItem.setAttribute("text", `New item`);
						combo.appendChild(newItem);
					}, 1000);
				}}>
					Add items
				</button>
				<ComboBox>
					<ComboBoxItem text="Initial Item" />
				</ComboBox>
			</>
		);

		cy.get("button").click();
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-combobox]").find("ui5-cb-item").its("length").as("initialCount");
		cy.get("@initialCount").then(initialCount => {
			expect(initialCount).to.equal(1, "item count should be updated");
		});

		cy.wait(2000); /* eslint-disable-line cypress/no-unnecessary-waiting */
		cy.get("[ui5-combobox]").find("ui5-cb-item").its("length").as("updatedCount");

		cy.get("@updatedCount").then(updatedCount => {
			expect(updatedCount).to.equal(2, "item count should be updated");
		});
	});

	it("Should check clear icon availability", () => {
		cy.mount(
			<ComboBox value="initial" show-clear-icon>
				<ComboBoxItem text="Item 1" />
				<ComboBoxItem text="Item 2" />
			</ComboBox>
		);

		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", true);

		cy.get("[ui5-combobox]").shadow().find(".ui5-input-clear-icon-wrapper").realClick();
		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", false);

		cy.get("[ui5-combobox]").shadow().find("input").click();
		cy.get("[ui5-combobox]").shadow().find("input").type("c");
		cy.get("[ui5-combobox]").should("have.prop", "_effectiveShowClearIcon", true);
	});

	it("Should check clear icon events", () => {
		cy.mount(
			<>
				<span id="clear-icon-change-count">0</span>
				<span id="clear-icon-input-count">0</span>
				<ComboBox
					show-clear-icon
					onInput={() => {
						const span = document.getElementById("clear-icon-input-count")!;
						span.textContent = String(Number(span.textContent) + 1);
					}}
					onChange={() => {
						const span = document.getElementById("clear-icon-change-count")!;
						span.textContent = String(Number(span.textContent) + 1);
					}}
				>
				</ComboBox>
				<button>Dummy button</button>
			</>
		);

		cy.get("[ui5-combobox]").shadow().find("[inner-input]").type("a");
		cy.get("button").realClick();

		cy.get("[ui5-combobox]").shadow().find(".ui5-input-clear-icon-wrapper").realClick();
		cy.get("#clear-icon-input-count").should("have.text", "2"); // 1 input events for the typing + 1 for the clear	

		cy.get("button").realClick();
		cy.get("#clear-icon-change-count").should("have.text", "2"); // 1 change event for the typing + 1 for the clear
	});

	it("Should show all items if value does not match any item and arrow is pressed", () => {
		cy.mount(
			<ComboBox id="combo" value="">
				{Array.from({ length: 11 }, (_, i) => (
					<ComboBoxItem key={i} text={`Item ${i + 1}`} />
				))}
			</ComboBox>
		);

		cy.get("[ui5-combobox]").shadow().find("input").click();
		cy.get("[ui5-combobox]").shadow().find("input").type("z");
		cy.get("[ui5-combobox]").shadow().find(".inputIcon").realClick();

		cy.get("[ui5-combobox]").find("ui5-cb-item").should("have.length", 11);
	});
});
