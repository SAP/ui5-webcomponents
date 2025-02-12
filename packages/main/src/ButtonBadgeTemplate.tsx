import type ButtonBadge from "./ButtonBadge.js";
import Tag from "./Tag.js";

export default function ButtonTemplate(this: ButtonBadge) {
	return <Tag design="Critical" hide-state-icon>{this.effectiveText}</Tag>;
}
