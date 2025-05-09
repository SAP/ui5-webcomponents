import Button from "@ui5/webcomponents/dist/Button.js";
import DynamicSideContent from "../../src/DynamicSideContent.js";
import SideContentFallDown from "../../src/types/SideContentFallDown.js";

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
			<DynamicSideContent sideContentPosition="End">
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-root > *")
			.first()
			.should("have.class", "ui5-dsc-main");
	});

	it("set to 'Start'", () => {
		cy.mount(
			<DynamicSideContent sideContentPosition="Start">
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-root > *")
			.first()
			.should("have.class", "ui5-dsc-side");
	});
});

describe("'equalSplit' property", () => {
	it("set to 'true'", () => {
		cy.mount(
			<DynamicSideContent equalSplit={true}>
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-6");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-6");
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

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-9");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-3");
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

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-8");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-4");
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

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		// set outer container width to > 960 and < 1024 (M1)
		cy.viewport(1020, 500);

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-fixed");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-fixed");

		// set outer container width to > 720 and < 960 (M2)
		cy.viewport(950, 500);

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-12");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-12");
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

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		// set outer container width to < 720 (S)
		cy.viewport(700, 500);

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-main")
			.should("have.class", "ui5-dsc-span-12");

		cy.get("@dynamicSideContent")
			.shadow()
			.find(".ui5-dsc-side")
			.should("have.class", "ui5-dsc-span-0");
	});
});

describe("'sideContentVisibility' property:", () => {
	it("'AlwaysShow' - side content is always visible", () => {
		cy.viewport(1600, 500);

		cy.mount(
			<DynamicSideContent sideContentVisibility="AlwaysShow">
				<div>
					<h1>Main Content</h1>
				</div>
				<div slot="sideContent">
					<h1>Side Content</h1>
				</div>
			</DynamicSideContent>
		);

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

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
			  setting: SideContentFallDown.BelowXL,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-12" },
				  { size: 1020, expected: "ui5-dsc-span-12" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.BelowL,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-12" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.BelowM,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-fixed" },
				  { size: 950, expected: "ui5-dsc-span-fixed" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.OnMinimumWidth,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-fixed" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
	];

	testCases.forEach(({ setting, widths }) => {
	  it(`'${setting}' - side content falls down at expected breakpoints`, () => {
			cy.mount(
				<DynamicSideContent sideContentFallDown={setting}>
					<div>
						<h1>Main Content</h1>
					</div>
					<div slot="sideContent">
						<h1>Side Content</h1>
					</div>
				</DynamicSideContent>
			);

			cy.get("[ui5-dynamic-side-content]")
				.as("dynamicSideContent");

			widths.forEach(({ size, expected }) => {
				cy.viewport(size, 500);

				cy.get("@dynamicSideContent")
					.shadow()
					.find(".ui5-dsc-side")
					.should("have.class", expected);
			});
	  });
	});
});

describe("'sideContentFallDown' property", () => {
	const testCases = [
		{
			  setting: SideContentFallDown.BelowXL,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-12" },
				  { size: 1020, expected: "ui5-dsc-span-12" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.BelowL,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-12" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.BelowM,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-fixed" },
				  { size: 950, expected: "ui5-dsc-span-fixed" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
		{
			  setting: SideContentFallDown.OnMinimumWidth,
			  widths: [
				  { size: 1600, expected: "ui5-dsc-span-3" },
				  { size: 1400, expected: "ui5-dsc-span-4" },
				  { size: 1020, expected: "ui5-dsc-span-fixed" },
				  { size: 950, expected: "ui5-dsc-span-12" },
				  { size: 700, expected: "ui5-dsc-span-0" },
			  ],
		},
	];

	testCases.forEach(({ setting, widths }) => {
	  it(`'${setting}' - side content falls down at expected breakpoints`, () => {
			cy.mount(
				<DynamicSideContent sideContentFallDown={setting}>
					<div>
						<h1>Main Content</h1>
					</div>
					<div slot="sideContent">
						<h1>Side Content</h1>
					</div>
				</DynamicSideContent>
			);

			cy.get("[ui5-dynamic-side-content]")
				.as("dynamicSideContent");

			widths.forEach(({ size, expected }) => {
				cy.viewport(size, 500);

				cy.get("@dynamicSideContent")
					.shadow()
					.find(".ui5-dsc-side")
					.should("have.class", expected);
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

		cy.get("[ui5-dynamic-side-content]")
			.as("dynamicSideContent");

		cy.get("@dynamicSideContent").then(dsc => {
			dsc.get(0).addEventListener("ui5-layout-change", cy.stub()
				.as("layoutChange"));
		});

		// Change to M
		cy.viewport(800, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "M",
					previousBreakpoint: "L",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});

		// Change to > 1024 and < 1440 (L)
		cy.viewport(1200, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "L",
					previousBreakpoint: "M",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});

		// Change to < 720 (S)
		cy.viewport(600, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "S",
					previousBreakpoint: "L",
					mainContentVisible: true,
					sideContentVisible: false
				},
			});

		// Change to > 1440 (XL)
		cy.viewport(1600, 500);

		cy.get("@layoutChange")
			.should("be.called")
			.should("be.calledWithMatch", {
				detail: {
					currentBreakpoint: "XL",
					previousBreakpoint: "S",
					mainContentVisible: true,
					sideContentVisible: true
				},
			});
	});
});
