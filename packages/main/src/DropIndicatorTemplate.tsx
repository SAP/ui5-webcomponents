import MovePlacement from "@ui5/webcomponents-base/dist/types/MovePlacement.js";
import type DropIndicator from "./DropIndicator.js";

export default function DropIndicatorTemplate(this: DropIndicator) {
	return <div class={{
		"ui5-di-rect": this.placement === MovePlacement.On,
		"ui5-di-needle": this.placement !== MovePlacement.On,
	}}></div>;
}
