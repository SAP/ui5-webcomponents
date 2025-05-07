import Button from "../../src/Button.js";
import ButtonState from "../../src/ButtonState.js";

describe("Initial rendering", () => {
	it("tests no config provided", () => {
		cy.mount(
			<Button>
				<ButtonState name="generate" text="Generate" icon="ai">Click me</ButtonState>
				<ButtonState name="generating" text="Stop Generating" icon="stop">Click me</ButtonState>
				<ButtonState name="revise" text="Revise" icon="ai">Click me</ButtonState>
			</Button>
		);
	});
});
