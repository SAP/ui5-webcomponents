import type ColorPaletteItem from "./ColorPaletteItem.js";

export default function (this: ColorPaletteItem) {
	return (
		<div
			class="ui5-cp-item"
			style={{
				"background-color": this.value,
			}}
			value={this.value}
			tabindex={parseInt(this.forcedTabIndex)}
			role="button"
			aria-label={`${this.colorLabel} - ${this.index}: ${this.value}`}
			title={`${this.colorLabel} - ${this.index}: ${this.value}`}
			disabled={this._disabled}
		></div>
	);
};
