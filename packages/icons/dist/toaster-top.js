import { isThemeFamily } from "@ui5/webcomponents-base/dist/config/Theme.js";
import {pathData as pathDataV5, ltr, accData} from "./v5/toaster-top.js";
import {pathData as pathDataV4} from "./v4/toaster-top.js";

const pathData = isThemeFamily("sap_horizon") ? pathDataV5 : pathDataV4;

export default "toaster-top";
export { pathData, ltr, accData };