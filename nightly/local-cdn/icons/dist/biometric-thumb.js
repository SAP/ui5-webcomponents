import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/biometric-thumb.js";
import { pathData as pathDatav5 } from "./v5/biometric-thumb.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "biometric-thumb";
export { getPathData, ltr, accData };