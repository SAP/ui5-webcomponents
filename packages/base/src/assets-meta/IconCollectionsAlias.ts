/**
 * Supported icon collection aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 *
 * - "SAP-icons/accept" and "SAP-icons-v4/accept"
 * - "horizon/accept" and "SAP-icons-v5/accept"
 * - "SAP-icons-TNT/actor" and "tnt/actor"
 * - "BusinessSuiteInAppSymbols/3d" and "business-suite/3d"
 */
enum IconCollectionsAlias {
	"SAP-icons" = "SAP-icons-v4",
	"horizon" = "SAP-icons-v5",
	"SAP-icons-TNT" = "tnt",
	"BusinessSuiteInAppSymbols" = "business-suite",
}

/**
 * Returns the mapped collection name for a given alias.
 *
 * <b>For example</b>:
 * - "SAP-icons-TNT"resolves to "tnt"
 * - "BusinessSuiteInAppSymbols" resolves to "business-suite"
 * - "horizon" resolves to "SAP-icons-v5"
 *
 * @param { string } collectionName
 * @return { string } the normalized collection name
 */
const getIconCollectionByAlias = (collectionName: string) => {
	if (IconCollectionsAlias[collectionName as keyof typeof IconCollectionsAlias]) {
		return IconCollectionsAlias[collectionName as keyof typeof IconCollectionsAlias];
	}

	return collectionName;
};

export default IconCollectionsAlias;
export {
	getIconCollectionByAlias,
};
