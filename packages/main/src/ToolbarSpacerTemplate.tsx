import type ToolbarSpacer from "./ToolbarSpacer.js";

export default function ToolbarSpacerTemplate(this: ToolbarSpacer) {
	return (
		<div
			class="ui5-tb-spacer ui5-tb-item"
			style={this.styles}
			role="separator"
			data-ui5-external-action-item-id={this._id}
		></div>
	);
}
