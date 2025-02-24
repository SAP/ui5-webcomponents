import Button from "@ui5/webcomponents/dist/Button.js";
import DynamicSideContent from "../../src/DynamicSideContent.js";

describe("Accessibility", () => {
	it("tests main and side content roles", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "role", "main");

		   cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "role", "complementary");
	});

	it("tests main and side content aria-label values", () => {
		const customMainContentLabel = "Custom Main Content Label";
		const customSideContentLabel = "Custom Side Content Label";

		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
					<Button>Set Custom ARIA Labels</Button>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dsc");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", "Main Content");

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", "Side Content");

		cy.get<DynamicSideContent>("@dsc")
			.then($dsc => {
				$dsc.get(0).accessibilityAttributes = {
					"mainContent": {
						"ariaLabel": customMainContentLabel,
					},
					"sideContent": {
						"ariaLabel": customSideContentLabel,
					},
				};
			});

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.attr", "aria-label", customMainContentLabel);

		cy.get("@dsc")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.attr", "aria-label", customSideContentLabel);
	});
});

describe("'sideContentPosition' property", () => {
	it("set to 'End'", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");

		cy.get("@dynamicSideContent").invoke("attr", "side-content-position", "End");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-root > *").first()
			.should("have.class", "ui5-dsc-main");
	});

	it("set to 'Start'", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
	  cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");

	  cy.get("@dynamicSideContent").invoke("attr", "side-content-position", "Start");
	  cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-root > *").first()
			.should("have.class", "ui5-dsc-side");
	});
});

describe("'equalSplit' property", () => {
	it("set to 'true'", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("@dynamicSideContent").invoke("attr", "equal-split", "");

		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-main").should("have.class", "ui5-dsc-span-6");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-side").should("have.class", "ui5-dsc-span-6");
	});
});

describe("containers widths on XL size", () => {
	it("check for proper width", () => {
		cy.viewport(1600, 500);
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-main").should("have.class", "ui5-dsc-span-9");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-side").should("have.class", "ui5-dsc-span-3");
	});
});

describe("containers widths on L size", () => {
	it("check for proper width", () => {
		cy.viewport(1400, 500);
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-main").should("have.class", "ui5-dsc-span-8");
		cy.get("@dynamicSideContent").shadow().find(".ui5-dsc-side").should("have.class", "ui5-dsc-span-4");
	});
});

describe("containers widths on M size:", () => {
	it("check for proper width", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("ui5-dynamic-side-content").then(dynamicSideContent => {
			// set outer container width to > 960 and < 1024 (M1)
			cy.viewport(1020, 500);
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-main")
				.should("have.class", "ui5-dsc-span-fixed");
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-side")
				.should("have.class", "ui5-dsc-span-fixed");
			// set outer container width to > 720 and < 960 (M2)
			cy.viewport(950, 500);
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-main")
				.should("have.class", "ui5-dsc-span-12");
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-side")
				.should("have.class", "ui5-dsc-span-12");
		});
	});
});

describe("containers widths on S size:", () => {
	it("check for proper width", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("ui5-dynamic-side-content").then(dynamicSideContent => {
		// set outer container width to < 720 (S)
			cy.viewport(700, 500);
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-main")
				.should("have.class", "ui5-dsc-span-12");
			cy.wrap(dynamicSideContent)
				.shadow()
				.find(".ui5-dsc-side")
				.should("have.class", "ui5-dsc-span-0");
	  });
	});
});

describe("'sideContentVisibility' property:", () => {
	it("'AlwaysShow' - side content is always visible", () => {
		cy.viewport(1600, 500);
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");
		cy.get("ui5-dynamic-side-content").invoke("attr", "side-content-visibility", "AlwaysShow");

		const viewports = [
			{ width: 1600, expectedClass: "ui5-dsc-span-3" },
			{ width: 1400, expectedClass: "ui5-dsc-span-4" },
			{ width: 1020, expectedClass: "ui5-dsc-span-fixed" },
			{ width: 950, expectedClass: "ui5-dsc-span-12" },
			{ width: 700, expectedClass: "ui5-dsc-span-12" },
		];

		viewports.forEach(({ width, expectedClass }) => {
			cy.viewport(width, 500);
			cy.get("ui5-dynamic-side-content")
				.shadow()
				.find(".ui5-dsc-side")
				.should("have.class", expectedClass);
		});
	});
});

describe("'sideContentFallDown' property", () => {
	const testCases = [
	  {
			setting: "BelowXL",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 1020, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "BelowL",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "BelowM",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 950, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "OnMinimumWidth",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	];

	testCases.forEach(({ setting, widths }) => {
	  it(`'${setting}' - side content falls down at expected breakpoints`, () => {
			cy.mount(
				<DynamicSideContent>
					<div>
						<h1>Main Content</h1>
					</div>
					<div slot="sideContent">
						<h1>Side Content</h1>
					</div>
				</DynamicSideContent>
			);
			cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");

			cy.get("@dynamicSideContent").invoke("attr", "side-content-fall-down", setting);

			widths.forEach(({ size, expected, message }) => {
				cy.viewport(size, 500);
				cy.get("@dynamicSideContent")
					.shadow()
					.find(".ui5-dsc-side")
					.invoke("attr", "class")
					.should("include", expected, message);
			});
	  });
	});
});

describe("'sideContentFallDown' property", () => {
	const testCases = [
	  {
			setting: "BelowXL",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 1020, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "BelowL",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "BelowM",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 950, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	  {
			setting: "OnMinimumWidth",
			widths: [
				{ size: 1600, expected: "ui5-dsc-span-3", message: "The side content does not fall down" },
				{ size: 1400, expected: "ui5-dsc-span-4", message: "The side content does not fall down" },
				{ size: 1020, expected: "ui5-dsc-span-fixed", message: "The side content does not fall down" },
				{ size: 950, expected: "ui5-dsc-span-12", message: "The side content falls down" },
				{ size: 700, expected: "ui5-dsc-span-0", message: "The side content is not visible" },
			],
	  },
	];

	testCases.forEach(({ setting, widths }) => {
	  it(`'${setting}' - side content falls down at expected breakpoints`, () => {
			cy.mount(
				<DynamicSideContent>
					<div>
						<h1>Main Content</h1>
					</div>
					<div slot="sideContent">
						<h1>Side Content</h1>
					</div>
				</DynamicSideContent>
			);
			cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");

			cy.get("@dynamicSideContent").invoke("attr", "side-content-fall-down", setting);

			widths.forEach(({ size, expected, message }) => {
				cy.viewport(size, 500);
				cy.get("@dynamicSideContent")
					.shadow()
					.find(".ui5-dsc-side")
					.invoke("attr", "class")
					.should("include", expected, message);
			});
	  });
	});
});

describe("'layout-change' event:", () => {
	it("fires when changing the breakpoint", () => {
		cy.mount(
			<DynamicSideContent>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);
		cy.get("[ui5-dynamic-side-content]").as("dynamicSideContent");

		cy.get("@dynamicSideContent").then(dsc => {
			dsc.get(0).addEventListener("ui5-layout-change", cy.stub().as("layoutChange"));
		});

		// Set to XL
		cy.viewport(1600, 500);

		cy.viewport(800, 500);
		//not worknig
		cy.get("@layoutChange").should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "M",
					previousBreakpoint: "XL",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});

		//working option
		// cy.get("@layoutChangeSpy").then(spy => {
		// 	const event = spy.args.find(([e]) => e.type === "ui5-layout-change")[0];
		// 	expect(event.detail.currentBreakpoint).to.equal("M");
		// 	expect(event.detail.previousBreakpoint).to.equal("L");
		// 	expect(event.detail.mainContentVisible).to.be.true;
		// 	expect(event.detail.sideContentVisible).to.be.true;
		// });

		// // Change to > 720 and < 1024 (M)
		cy.viewport(800, 500);
		// cy.get("@currentBreakpoint").should("have.value", "M");
		// cy.get("@previousBreakpoint").should("have.value", "XL");
		// cy.get("@mainVisible").should("have.value", "1");
		// cy.get("@sideVisible").should("have.value", "1");

		// Change to > 1024 and < 1440 (L)
		cy.viewport(1200, 500);
		// cy.get("@eventSpy").should("have.been.calledTwice");
		// cy.get("@eventSpy").should("have.been.calledWith", {});]
		// cy.get("@currentBreakpoint").should("have.value", "L");
		// cy.get("@previousBreakpoint").should("have.value", "M");
		// cy.get("@mainVisible").should("have.value", "1");
		// cy.get("@sideVisible").should("have.value", "1");

		// // Change to < 720 (S)
		// cy.viewport(600, 500);
		// cy.get("@currentBreakpoint").should("have.value", "S");
		// cy.get("@previousBreakpoint").should("have.value", "M");
		// cy.get("@mainVisible").should("have.value", "1");
		// cy.get("@sideVisible").should("have.value", "0");

		// // Change back to > 1440 (XL)
		// cy.viewport(1600, 500);
		// cy.get("@currentBreakpoint").should("have.value", "XL");
		// cy.get("@previousBreakpoint").should("have.value", "S");
		// cy.get("@mainVisible").should("have.value", "1");
		// cy.get("@sideVisible").should("have.value", "1");
	});
});
