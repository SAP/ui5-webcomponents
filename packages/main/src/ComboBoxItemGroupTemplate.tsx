import ListItemGroupTemplate from "./ListItemGroupTemplate.js";
import type ComboBoxItemGroup from "./ComboBoxItemGroup.js";

export default function ComboBoxItemGroupTemplate(this: ComboBoxItemGroup) {
	return [ListItemGroupTemplate.call(this, { items })];
}

function items(this: ComboBoxItemGroup) {
	return this.items.filter(item => item._isVisible).map(item => <slot name={item._individualSlot}></slot>);
}
