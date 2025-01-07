import type SegmentedButton from "./SegmentedButton.js";

export default function SegmentedButtonTemplate(this: SegmentedButton) {
	return (
		<ul
			role="listbox"
			class="ui5-segmented-button-root"
			onClick={this._onclick}
			onMouseDown={this._onmousedown}
			onKeyDown={this._onkeydown}
			onKeyUp={this._onkeyup}
			onFocusIn={this._onfocusin}
			aria-multiselectable="true"
			aria-describedby={`${this._id}-invisibleText`}
			aria-roledescription={this.ariaDescription}
			aria-label={this.accessibleName}
		>
			<slot></slot>
			<span id={`${this._id}-invisibleText`} class="ui5-hidden-text">{this.ariaDescribedBy}</span>
		</ul>
	);
}
