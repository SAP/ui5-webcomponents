import TimeSelectionClocks from "../../src/TimeSelectionClocks.js";

describe("TimeSelectionClocks Interactions", () => {
	it("switch active clock", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");
		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("@clocks").should("have.length", 3);

		// switch clocks by button
		cy.get("@buttons").eq(0).realClick();
		cy.wait(800);
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 0);

		cy.get("@buttons").eq(1).realClick();
		cy.wait(800);
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 1);

		cy.get("@buttons").eq(2).realClick();
		cy.wait(800);
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		// switch clock by pressing colon (:)
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{shift+:}");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 0);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{shift+:}");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 1);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{shift+:}");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		// switch clock by pressing space
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type(" ");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 0);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type(" ");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 1);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type(" ");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);
	});

	it("switch AM/PM", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocksAmPm"
					formatPattern="hh:mm:ss a"
					value="12:20:40 PM"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocksAmPm").shadow().find("ui5-segmented-button").as("segBtn");
		cy.get("@segBtn").find("ui5-segmented-button-item").eq(0).as("amBtn");
		cy.get("@segBtn").find("ui5-segmented-button-item").eq(1).as("pmBtn");
		cy.get("#myClocksAmPm").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("@buttons").eq(0).realClick();
		cy.get("@amBtn").should("not.have.attr", "selected");
		cy.get("@pmBtn").should("have.attr", "selected");

		cy.ui5TimeSelectionClocksInnerButton("#myClocksAmPm", 0).type("a");
		cy.get("@amBtn").should("have.attr", "selected");
		cy.get("@pmBtn").should("not.have.attr", "selected");

		cy.ui5TimeSelectionClocksInnerButton("#myClocksAmPm", 0).type("p");
		cy.get("@amBtn").should("not.have.attr", "selected");
		cy.get("@pmBtn").should("have.attr", "selected");
	});

	it("arrow keys", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");
		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("@buttons").eq(0).realClick();

		// change hours
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{downarrow}");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 11);
		cy.get("@buttons").eq(0).should("contain.text", "11");

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{uparrow}");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 12);
		cy.get("@buttons").eq(0).should("contain.text", "12");

		// change minutes
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{shift+:}");
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{downarrow}");
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 19);
		cy.get("@buttons").eq(1).should("contain.text", "19");

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{uparrow}");
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 20);
		cy.get("@buttons").eq(1).should("contain.text", "20");

		// change seconds
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{shift+:}");
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{downarrow}");
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 39);
		cy.get("@buttons").eq(2).should("contain.text", "39");

		cy.get("@buttons").eq(2).shadow().find("button").type("{uparrow}");
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 40);
		cy.get("@buttons").eq(2).should("contain.text", "40");
	});

	it("pageup/pagedown", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");
		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("@buttons").eq(0).realClick();

		// change hours
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{pagedown}");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 11);
		cy.get("@buttons").eq(0).should("contain.text", "11");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 0);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{pageup}");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 12);
		cy.get("@buttons").eq(0).should("contain.text", "12");

		// change minutes
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{shift}{pagedown}{shift}");
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 19);
		cy.get("@buttons").eq(1).should("contain.text", "19");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 1);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{shift}{pageup}{shift}");
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 20);
		cy.get("@buttons").eq(1).should("contain.text", "20");

		// change seconds
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{ctrl}{shift}{pagedown}{ctrl}{shift}");
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 39);
		cy.get("@buttons").eq(2).should("contain.text", "39");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{ctrl}{shift}{pageup}{ctrl}{shift}");
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 40);
		cy.get("@buttons").eq(2).should("contain.text", "40");
	});

	it("direct number typing", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");
		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("@buttons").eq(0).realClick();
		cy.wait(800);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("082413");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 8);
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 24);
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 13);
		cy.get("@buttons").eq(0).should("contain.text", "08");
		cy.get("@buttons").eq(1).should("contain.text", "24");
		cy.get("@buttons").eq(2).should("contain.text", "13");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{shift+:}");
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("368");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 3);
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 6);
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 8);
		cy.get("@buttons").eq(0).should("contain.text", "03");
		cy.get("@buttons").eq(1).should("contain.text", "06");
		cy.get("@buttons").eq(2).should("contain.text", "08");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{shift+:}");
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("118");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 11);
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 8);
		cy.get("@buttons").eq(0).should("contain.text", "11");
		cy.get("@buttons").eq(1).should("contain.text", "08");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{shift+:}");
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("25");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 2);
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 5);
		cy.get("@buttons").eq(0).should("contain.text", "02");
		cy.get("@buttons").eq(1).should("contain.text", "05");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 1);

		cy.wait(1500); // simulate cooldown wait

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("3210");
		cy.get("@clocks").eq(0).should("have.prop", "selectedValue", 2);
		cy.get("@clocks").eq(1).should("have.prop", "selectedValue", 32);
		cy.get("@clocks").eq(2).should("have.prop", "selectedValue", 10);
		cy.get("@buttons").eq(0).should("contain.text", "02");
		cy.get("@buttons").eq(1).should("contain.text", "32");
		cy.get("@buttons").eq(2).should("contain.text", "10");
		cy.ui5TimeSelectionClocksIsActiveClock("#myClocks", 2);
	});
});

describe("TimeSelectionClocks Accessibility", () => {
	it("accessibility-related attributes", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find(".ui5-time-picker-tsc-clocks").should("have.attr", "role", "img");
		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");
		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");

		// Hours button
		cy.get("@buttons").eq(0).should("have.attr", "value-min", "0");
		cy.get("@buttons").eq(0).should("have.attr", "value-max", "23");
		cy.get("@buttons").eq(0).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(0).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(0).should("have.attr", "accessible-name");
		cy.get("@buttons").eq(0).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(0).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(0).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		// Minutes button
		cy.get("@buttons").eq(1).should("have.attr", "value-min", "0");
		cy.get("@buttons").eq(1).should("have.attr", "value-max", "59");
		cy.get("@buttons").eq(1).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(1).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(1).should("have.attr", "accessible-name");
		cy.get("@buttons").eq(1).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(1).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(1).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		// Seconds button
		cy.get("@buttons").eq(2).should("have.attr", "value-min", "0");
		cy.get("@buttons").eq(2).should("have.attr", "value-max", "59");
		cy.get("@buttons").eq(2).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(2).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(2).should("have.attr", "accessible-name");
		cy.get("@buttons").eq(2).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(2).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(2).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);
	});

	it("change of accessibility-related attributes during interactions", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="HH:mm:ss"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");
		cy.get("#myClocks").shadow().find("ui5-time-picker-clock").as("clocks");

		cy.get("@buttons").eq(0).realClick();

		// Hours button
		cy.get("@buttons").eq(0).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(0).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(0).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(0).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(0).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{downarrow}");
		cy.get("@buttons").eq(0).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(0).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(0).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(0).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(0).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		// Minutes button
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{shift+:}");
		cy.get("@buttons").eq(1).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(1).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(1).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(1).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(1).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{downarrow}");
		cy.get("@buttons").eq(1).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(1).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(1).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(1).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(1).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		// Seconds button
		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{shift+:}");
		cy.get("@buttons").eq(2).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(2).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(2).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(2).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(2).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 2).type("{downarrow}");
		cy.get("@buttons").eq(2).invoke("attr", "value-now").then(val =>
			cy.get("@clocks").eq(2).should("have.prop", "selectedValue", Number(val))
		);
		cy.get("@buttons").eq(2).invoke("attr", "value-text").then(val =>
			cy.get("@buttons").eq(2).invoke("attr", "value-now").then(now =>
				cy.get("@buttons").eq(2).invoke("attr", "accessible-name").then(name =>
					expect(val).to.eq(`${now} ${name}`)
				)
			)
		);
	});
});

describe("TimeSelectionClocks Events", () => {
	it("'change' event", () => {
		cy.mount(<>
			<div style="display: inline-block; text-align: center; width: 18rem; height: 18rem; touch-action:">
				<TimeSelectionClocks
					id="myClocks"
					formatPattern="hh:mm:ss a"
					value="12:20:40"
				></TimeSelectionClocks>
			</div>
		</>);

		cy.get("#myClocks").shadow().find("ui5-toggle-spin-button").as("buttons");

		cy.get("#myClocks").then(tpc => {
			tpc.get(0).addEventListener("ui5-change", cy.stub().as("changed"));
		});

		cy.get("@buttons").eq(0).realClick();

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{pagedown}");
		cy.get("@changed")
			.should("have.been.calledOnce");

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 0).type("{shift}{pagedown}{shift}");
		cy.get("@changed")
			.should("have.been.calledTwice");

		cy.ui5TimeSelectionClocksInnerButton("#myClocks", 1).type("{ctrl}{shift}{pagedown}{ctrl}{shift}");
		cy.get("@changed")
			.should("have.been.calledThrice");
	});
});
