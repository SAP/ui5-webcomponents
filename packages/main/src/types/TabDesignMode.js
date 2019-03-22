import DataType from "@ui5/webcomponents-base/src/types/DataType";

const TabDesignModes = {
	/**
	 * A horizontally layouted design providing more space for texts.
	 * @public
	 */
	Horizontal: "Horizontal",

	/**
	 * A vertically layouted design using minimum horizontal space.
	 * @public
	 */
	Vertical: "Vertical",
};

class TabDesignMode extends DataType {
	static isValid(value) {
		return !!TabDesignModes[value];
	}
}

TabDesignMode.generataTypeAcessors(TabDesignModes);

export default TabDesignMode;
