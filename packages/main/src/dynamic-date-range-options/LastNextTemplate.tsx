import type DynamicDateRange from "../DynamicDateRange.js";
import StepInput from "../StepInput.js";
import Label from "../Label.js";

export default function LastNextTemplate(this: DynamicDateRange) {
	const currentNumber = (this.currentValue?.values?.[0] as number) || 1;

	return (
		<div class="ui5-last-next-container" style={{ padding: "0 1rem 0.5rem 1rem" }}>
			<div class="ui5-ddr-input-container" style={{ textAlign: "right" }}>
				<Label style={{ margin: "1rem 0 0.5rem 0", textAlign: "left" }}>Value for X</Label>
				<StepInput
					value={currentNumber}
					min={1}
					max={999}
					onChange={this.handleSelectionChange}
				/>
			</div>
		</div>
	);
}
