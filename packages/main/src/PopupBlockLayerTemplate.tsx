import type Popup from "./Popup.js";

export default function PopubBlockLayerTemplate(this: Popup) {
	return (
		<div class="ui5-block-layer"
			onKeyDown={this._preventBlockLayerFocus}
			onMouseDown={this._preventBlockLayerFocus}
		></div>
	);
}
