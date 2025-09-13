import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav1, ltr, accData } from "./v1/expand-collapse-level-2.js";
import { pathData as pathDatav2 } from "./v2/expand-collapse-level-2.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "business-suite/expand-collapse-level-2";
export { getPathData, ltr, accData };