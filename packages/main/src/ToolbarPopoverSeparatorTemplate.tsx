import type ToolbarSeparator from "./ToolbarSeparator.js";

export default function ToolbarPopoverSeparator(this: ToolbarSeparator) {
	return (
		<div
			class="ui5-tb-separator-in-overflow ui5-tb-popover-item"
			data-ui5-external-action-item-id={this._id}
		></div>
	);
}
