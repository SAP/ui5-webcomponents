import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/measuring-point.js";
import {pathData as pathDataV4} from "./v4/measuring-point.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "measuring-point";
export { pathData, ltr, accData };