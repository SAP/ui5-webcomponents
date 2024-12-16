import type ToggleSpinButton from "./ToggleSpinButton.js";
import buttonTemplate from "./ButtonTemplate.js";

export default function ToggleSpinButtonTemplate(this: ToggleSpinButton) {
	return (<>
		{ buttonTemplate.call(this, {
			ariaPressed: this.pressed,
			ariaValueMax: this.valueMax,
			ariaValueMin: this.valueMin,
			ariaValueNow: this.valueNow,
			ariaValueText: this.valueText,
		})}
	</>);
}
