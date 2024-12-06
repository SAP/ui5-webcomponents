import type ColorPaletteItem from "./ColorPaletteItem.js";

export default function ColorPaletteItemTemplate(this: ColorPaletteItem) {
	return (
		<div
			class="ui5-cp-item"
			style={{
				"background-color": this.value,
			}}
			tabindex={parseInt(this.forcedTabIndex)}
			role="button"
			aria-label={`${this.colorLabel} - ${this.index}: ${this.value}`}
			title={`${this.colorLabel} - ${this.index}: ${this.value}`}
		></div>
	);
}
