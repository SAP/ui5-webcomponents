import buttonTemplate from "./ButtonTemplate.js";
import type ToggleButton from "./ToggleButton.js";

export default (props: ToggleButton) => {
	return (<>
		{ buttonTemplate(props, { ariaPressed: props.pressed }) }
	</>);
};

