import ListItemGroupTemplate from "./ListItemGroupTemplate.js";
import type MultiComboBoxItemGroup from "./MultiComboBoxItemGroup.js";

export default function MultiComboBoxItemGroupTemplate(this: MultiComboBoxItemGroup) {
	return [ListItemGroupTemplate.call(this, { items })];
}

function items(this: MultiComboBoxItemGroup) {
	return this.items.filter(item => item._isVisible).map(item => <slot name={item._individualSlot}></slot>);
}
