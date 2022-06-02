import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/business-objects-mobile.js";
import {pathData as pathDataV4} from "./v4/business-objects-mobile.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "business-objects-mobile";
export { pathData, ltr, accData };