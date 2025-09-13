import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav2, ltr, accData } from "./v2/requirement-containment-relationship.js";
import { pathData as pathDatav3 } from "./v3/requirement-containment-relationship.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "tnt/requirement-containment-relationship";
export { getPathData, ltr, accData };