import type ToolbarSeparator from "./ToolbarSeparator.js";

export default function ToolbarSeparatorTemplate(this: ToolbarSeparator) {
	return (
		<div
			class="ui5-tb-separator ui5-tb-item"
			data-ui5-external-action-item-id={this._id}
		></div>
	);
}
