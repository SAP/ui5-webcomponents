/**
 * Supported icon collection aliases.
 *
 * Users might specify a collection, using both the key and the value in the following key-value pairs,
 * e.g the following pairs are completely exchangeable:
 *
 * - "SAP-icons/accept" and "SAP-icons-v4/accept".
 * - "SAP-icons-v5/accept" and "horizon/accept".
 * - "SAP-icons-TNT/actor" and "tnt/actor",
 * - "BusinessSuiteInAppSymbols/3d" and "business-suite/3d",
 */
enum IconCollectionsAlias {
	"SAP-icons" = "SAP-icons-v4",
	"horizon" = "SAP-icons-v5",
	"SAP-icons-TNT" = "tnt",
	"BusinessSuiteInAppSymbols" = "business-suite",
}

export default IconCollectionsAlias;
