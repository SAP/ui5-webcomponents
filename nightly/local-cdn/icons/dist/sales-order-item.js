import { isLegacyThemeFamilyAsync } from "@ui5/webcomponents-base/dist/config/Theme.js";
import { pathData as pathDatav4, ltr, accData } from "./v4/sales-order-item.js";
import { pathData as pathDatav5 } from "./v5/sales-order-item.js";

const getPathData = async() => {
	return await isLegacyThemeFamilyAsync() ? pathDatav4 : pathDatav5;
};

export default "sales-order-item";
export { getPathData, ltr, accData };