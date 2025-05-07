import type Label from "./Label.js";

export default function LabelTemplate(this: Label) {
	return (
		<label
			class="ui5-label-root"
			onClick={this._onclick}
		>
			<span class="ui5-label-text-wrapper">
				<slot></slot>
			</span>
			<span
				aria-hidden="true"
				class="ui5-label-required-colon"
				data-ui5-colon={this._colonSymbol}
			>
			</span>
		</label>
	);
}
