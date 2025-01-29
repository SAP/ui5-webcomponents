import type Button from "./Button.js";
import Tag from "./Tag.js";

export default function ButtonTemplate(this: Button) {
	return (<>
		<Tag design="Critical" hide-state-icon>{this.text}</Tag>
	</>);
}
