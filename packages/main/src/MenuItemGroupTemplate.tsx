import type MenuItemGroup from "./MenuItemGroup.js";

export default function MenuItemGroupTemplate(this: MenuItemGroup) {
	return (
		<div
			role="group"
			onui5-check={this._handleItemCheck}
		>
			<slot></slot>
		</div>
	);
}
