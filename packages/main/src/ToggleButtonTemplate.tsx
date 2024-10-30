import buttonTemplate from "./ButtonTemplate.js";
import type ToggleButton from "./ToggleButton.js";

export default function (this: ToggleButton) {
	return (<>
		{ buttonTemplate.call(this, { ariaPressed: this.pressed }) }
	</>);
};
