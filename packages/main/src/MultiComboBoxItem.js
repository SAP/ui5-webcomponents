import ComboBoxItem from "./ComboBoxItem.js";

class MultiComboBoxItem extends ComboBoxItem {
	static get metadata() {
		return {
			tag: "ui5-multi-combobox-item",
			properties: {
				selected: { type: Boolean },
			},
		};
	}
}

MultiComboBoxItem.define();

export default MultiComboBoxItem;
