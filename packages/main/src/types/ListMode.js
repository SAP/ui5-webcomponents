import DataType from "@ui5/webcomponents-base/src/types/DataType.js";

const ListModes = {
	/**
	 * Default mode (no selection).
	 * @public
	 */
	None: "None",

	/**
	 * Right-positioned single selection mode (only one list item can be selected).
	 * @public
	 */
	SingleSelect: "SingleSelect",

	/**
	 * Left-positioned single selection mode (only one list item can be selected).
	 * @public
	 */
	SingleSelectBegin: "SingleSelectBegin",

	/**
	 * Selected item is highlighted but no selection control is visible
	 * (only one list item can be selected).
	 * @public
	 */
	SingleSelectEnd: "SingleSelectEnd",

	/**
	 * Multi selection mode (more than one list item can be selected).
	 * @public
	 */
	MultiSelect: "MultiSelect",

	/**
	 * Delete mode (only one list item can be deleted via provided delete button)
	 * @public
	 */
	Delete: "Delete",
};

class ListMode extends DataType {
	static isValid(value) {
		return !!ListModes[value];
	}
}

ListMode.generataTypeAcessors(ListModes);

export default ListMode;
