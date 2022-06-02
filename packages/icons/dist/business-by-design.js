import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/business-by-design.js";
import {pathData as pathDataV4} from "./v4/business-by-design.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "business-by-design";
export { pathData, ltr, accData };