import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/heart-2.js";
import {pathData as pathDataV4} from "./v4/heart-2.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "heart-2";
export { pathData, ltr, accData };