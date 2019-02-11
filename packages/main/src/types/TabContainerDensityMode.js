import DataType from "@ui5/webcomponents-base/src/sap/ui/webcomponents/base/types/DataType";

const TabContainerDensityModes = {

	/**
	 * Inherit. In this mode the global configuration of the density mode will be applied.
	 */
	Inherit: "Inherit",
	/**
	 * Compact. In this mode the tabs will be set explicitly to compact mode independent
	 * of what mode is applied globally.
	 */
	Compact: "Compact",
	/**
	 * Cozy. In this mode the tabs will be set explicitly to compact mode independent
	 * of what mode is applied globally.
	 */
	Cozy: "Cozy",
};

class TabContainerDensityMode extends DataType {
	static isValid(value) {
		return !!TabContainerDensityModes[value];
	}
}

TabContainerDensityMode.generataTypeAcessors(TabContainerDensityModes);

export default TabContainerDensityMode;
