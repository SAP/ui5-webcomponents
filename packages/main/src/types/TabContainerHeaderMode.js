import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

const TabContainerHeaderModes = {

	/**
	 * Standard. In this mode when the <code>count</code> and the <code>text</code> are set,
	 * they are displayed in two separate lines.
	 * @public
	 */
	Standard: "Standard",
	/**
	 * Inline. In this mode when the <code>count</code> and the <code>text</code> are set,
	 * they are displayed in one line.
	 * @public
	 */
	Inline: "Inline",
};

class TabContainerHeaderMode extends DataType {
	static isValid(value) {
		return !!TabContainerHeaderModes[value];
	}
}

TabContainerHeaderMode.generataTypeAcessors(TabContainerHeaderModes);

export default TabContainerHeaderMode;
