import IllustratedMessage from "../../src/IllustratedMessage.js";
import Label from "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents-fiori/dist/illustrations/AllIllustrations.js"
import Panel from "@ui5/webcomponents/dist/Panel.js";
import Title from "@ui5/webcomponents/dist/Title.js";

describe("Accessibility", () => {
	it("should add aria-hidden and role=presetation to the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" decorative>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "role", "presentation");

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("have.attr", "aria-hidden", "true");
	});

	it("should not have aria-label on the SVG when decorative is true", () => {
		cy.mount(
			<IllustratedMessage name="UnableToUpload" accessible-name-ref="lbl" decorative>
				<Label id="lbl">Text from aria-labelledby</Label>
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.shadow()
			.find("svg")
			.should("not.have.attr", "aria-label");

	});

	it("content with auto design shrinks to fit the parent container", () => {
		const newContainerHeight = 300;
		const expectedMedia = "dialog";

		cy.mount(
			<div id="container" style={{ border: "1px solid #ccc" }}>
				<IllustratedMessage id="illustratedMsg5" class="border contentBox">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#container")
			.invoke("css", "height", `${newContainerHeight}px`);

		cy.get("#illustratedMsg5")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;
				expect(scrollHeight).to.be.lessThan(newContainerHeight);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("#illustratedMsg5")
			.should("have.prop", "media", expectedMedia);
	});
});

describe("design", () => {
	it("Large design should evaluate to Scene media", () => {
		cy.mount(
			<IllustratedMessage design="Large" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SCENE);

	});
	it("Medium design should evaluate to Dialog media", () => {
		cy.mount(
			<IllustratedMessage design="Medium" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DIALOG);

	});
	it("Small design should evaluate to Spot media", () => {
		cy.mount(
			<IllustratedMessage design="Small" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.SPOT);

	});
	it("ExtraSmall design should evaluate to Dot media", () => {
		cy.mount(
			<IllustratedMessage design="ExtraSmall" name="UnableToUpload">
			</IllustratedMessage>
		);

		cy.get("[ui5-illustrated-message]")
			.should("have.attr", "media", IllustratedMessage.MEDIA.DOT);

	});

});

describe("IllustratedMessage 'design' property", () => {
	it("should show up properly, when in panel and it expand/collapse", () => {
		cy.mount(
			<Panel id="panel1" accessible-role="Complementary" no-animation>
				<div slot="header" className="header">
					<Title id="p1-title">Expandable panel title</Title>
				</div>
				<IllustratedMessage
					name="AddColumn"
					titleText="No milestones yet."
					id="illustratedMsg4"
				/>
			</Panel>
		);

		cy.get("#illustratedMsg4")
			.invoke("prop", "media")

		cy.get("#panel1")
			.invoke("prop", "collapsed", true);

		cy.get("#illustratedMsg4")
			.should("have.prop", "media", "base");

		cy.get("#panel1")
			.invoke("prop", "collapsed", false);

		cy.get("#illustratedMsg4")
			.invoke("prop", "media")
			.should("not.equal", "base");
	});
});

describe("Vertical responsiveness", () => {
	it("content with auto design shrinks to fit the parent container", () => {
		const newContainerHeight = 300;
		const expectedMedia = "dialog";

		cy.mount(
			<div id="container" style={{ border: "1px solid #ccc" }}>
				<IllustratedMessage id="illustratedMsg5" class="border contentBox">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#container")
			.invoke("css", "height", `${newContainerHeight}px`);

		cy.get("#illustratedMsg5")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;

				expect(scrollHeight).to.be.lessThan(newContainerHeight);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("#illustratedMsg5")
			.should("have.prop", "media", expectedMedia);
	});

	it("content with auto design expands to fit the parent container", () => {
		const newContainerHeight = 500;
		const expectedMedia = "scene";

		cy.mount(
			<div id="container" style={{ border: "1px solid #ccc" }}>
				<IllustratedMessage id="illustratedMsg5" class="border contentBox">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#container")
			.invoke("css", "height", `${newContainerHeight}px`);

		cy.get("#illustratedMsg5")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;
				expect(scrollHeight).to.be.lessThan(newContainerHeight);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("#illustratedMsg5")
			.should("have.prop", "media", expectedMedia);
	});

	it("content with fixed design fits the parent container", () => {
		const newContainerHeight = 250;
		const expectedMedia = "dialog";

		cy.mount(
			<div id="container" style={{ border: "1px solid #ccc" }}>
				<IllustratedMessage id="illustratedMsg5" class="border contentBox">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#illustratedMsg5")
			.invoke("prop", "design", "Dialog");

		cy.get("#container")
			.invoke("css", "height", `${newContainerHeight}px`);

		cy.get("#illustratedMsg5")
			.shadow()
			.find(".ui5-illustrated-message-root")
			.should(($contents) => {
				const scrollHeight = $contents[0].scrollHeight;
				const offsetHeight = $contents[0].offsetHeight;
				expect(scrollHeight).to.be.lessThan(newContainerHeight);
				expect(scrollHeight).to.equal(offsetHeight);
			});

		cy.get("#illustratedMsg5")
			.should("have.prop", "media", expectedMedia);
	});

	it("shows image with unconstrained height when container has auto height", () => {
		const newContainerHeight = "auto";

		cy.mount(
			<div id="container" style={{ border: "1px solid #ccc" }}>
				<IllustratedMessage id="illustratedMsg5" class="border contentBox">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#container")
			.invoke("css", "height", newContainerHeight);

		cy.get("#illustratedMsg5")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.css", "height", "240px");
	});

	it("Illustration visible, when container fit content height", () => {
		cy.mount(
			<div className="illustratedmessage1auto">
				<IllustratedMessage id="illustratedMsg1" class="border">
					<button>Action 1</button>
				</IllustratedMessage>
			</div>
		);

		cy.get("#illustratedMsg1")
			.invoke("prop", "design", "Scene");

		cy.get(".illustratedmessage1auto")
			.invoke("attr", "style", "height: 440px");

		cy.get("#illustratedMsg1")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should(($illustration) => {
				const scrollHeight = $illustration[0].scrollHeight;
				expect(scrollHeight).to.not.equal(0);
			});

		cy.get(".illustratedmessage1auto")
			.invoke("attr", "style", "");
	});

	it("Illustration visible, when IM slotted and container has fixed height", () => {
		cy.mount(
			<Panel id="panel1" accessible-role="Complementary" no-animation>
				<div slot="header" className="header">
					<Title id="p1-title">Expandable panel title</Title>
				</div>
				<IllustratedMessage
					name="AddColumn"
					titleText="No milestones yet."
					id="illustratedMsg4"
				/>
			</Panel>
		);

		cy.get("#panel1")
			.invoke("attr", "style", "height: 19rem");

		cy.get("#illustratedMsg4")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should(($illustration) => {
				const scrollHeight = $illustration[0].scrollHeight;
				expect(scrollHeight).to.not.equal(0);
			});

		cy.get("#panel1")
			.invoke("attr", "style", "");
	});
});

describe("Dot design resource handling", () => {
	it("uses substitute Spot illustration", () => {
		cy.mount(
			<IllustratedMessage id="illustratedMsg1" class="border">
				<button>Action 1</button>
			</IllustratedMessage>
		);

		cy.get("#illustratedMsg1")
			.invoke("prop", "name", "TntUnableToLoad");

		cy.get("#illustratedMsg1")
			.invoke("prop", "design", "Dot");

		cy.get("#illustratedMsg1")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.id", "tnt-Spot-UnableToLoad");
	});

	it("uses original Dot illustration", () => {
		cy.mount(
			<IllustratedMessage id="illustratedMsg1" class="border">
				<button>Action 1</button>
			</IllustratedMessage>
		);

		cy.get("#illustratedMsg1")
			.invoke("prop", "name", "AddPeople");

		cy.get("#illustratedMsg1")
			.invoke("prop", "design", "Dot");

		cy.get("#illustratedMsg1")
			.shadow()
			.find(".ui5-illustrated-message-illustration svg")
			.should("have.id", "sapIllus-Dot-AddPeople");
	});
});