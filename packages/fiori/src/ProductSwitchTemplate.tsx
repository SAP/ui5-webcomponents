import type ProductSwitch from "./ProductSwitch.js";

export default function ProductSwitchTemplate(this: ProductSwitch) {
	return (
		<div
			role="list"
			class="ui5-product-switch-root"
			aria-label={this._ariaLabelText}
			onFocusIn={this._onfocusin}
			onKeyDown={this._onkeydown}
			onClick={this.handleProductSwitchItemClick}
		>
			<slot></slot>
		</div>
	);
}
